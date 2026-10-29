import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { spawn } from 'node:child_process';
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
const phase = process.argv[2] || 'production';
const output = path.join(process.cwd(), 'docs', 'design-audit', phase);
fs.mkdirSync(output, { recursive: true });
const staticMode = phase === 'baseline' || phase === 'production' || phase === 'cta' || phase === 'hero' || phase === 'projects';
const port = staticMode ? 9400 : 3000;
let server;
if (staticMode) {
  const root = path.resolve('out');
  server = http.createServer((request, response) => {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    let file = path.resolve(root, '.' + pathname);
    if (!file.startsWith(root + path.sep) && file !== root) { response.writeHead(403); response.end(); return; }
    if (pathname.endsWith('/')) file = path.join(file, 'index.html');
    else if (!path.extname(file)) file += '.html';
    if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) { response.writeHead(404); response.end(); return; }
    const types = {'.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.png':'image/png', '.jpg':'image/jpeg', '.webp':'image/webp', '.svg':'image/svg+xml', '.woff2':'font/woff2', '.mp4':'video/mp4', '.txt':'text/plain'};
    response.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
    fs.createReadStream(file).pipe(response);
  }).listen(port, '127.0.0.1');
}
async function main() {
  const profile = path.join(process.cwd(), 'tmp', 'audit-browser-' + phase);
  spawn(process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check', '--disable-background-timer-throttling', '--remote-debugging-port=9334', '--remote-debugging-address=127.0.0.1', '--user-data-dir=' + profile, 'about:blank'], { windowsHide: true, stdio: 'ignore' });
  let targets;
  for (let i = 0; i < 60; i++) { try { targets = await (await fetch('http://127.0.0.1:9334/json')).json(); break; } catch { await wait(200); } }
  if (!targets) throw Error('Browser did not start');
  const ws = new WebSocket(targets.find(target => target.type === 'page').webSocketDebuggerUrl);
  await new Promise(resolve => ws.addEventListener('open', resolve, {once:true}));
  const pending = new Map(); let seq = 0;
  const errors = [];
  ws.addEventListener('message', event => {
    const data = JSON.parse(event.data);
    if (data.method === 'Runtime.exceptionThrown') errors.push(data.params.exceptionDetails);
    if (data.id) {
      const promise = pending.get(data.id);
      pending.delete(data.id);
      if (data.error) promise.reject(Error(JSON.stringify(data.error)));
      else promise.resolve(data.result);
    }
  });
  const call = (method, params={}) => new Promise((resolve,reject) => { const id=++seq; pending.set(id,{resolve,reject}); ws.send(JSON.stringify({id,method,params})); });
  const evaluate = async expression => { const result = await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true}); if(result.exceptionDetails) throw Error(JSON.stringify(result.exceptionDetails)); return result.result.value; };
  const screenshot = async (name, full=false) => {
    if (full) {
      const height = await evaluate('document.documentElement.scrollHeight');
      const viewport = await evaluate('innerHeight');
      for(let y=0;y<height;y+=viewport){await evaluate('window.scrollTo({top:'+y+',behavior:"instant"})');await wait(120);}
      await wait(300); await evaluate('window.scrollTo({top:0,behavior:"instant"})');await wait(200);
    }
    const metrics = await call('Page.getLayoutMetrics');
    const result = await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:full,...(full ? {clip:{x:0,y:0,width:metrics.cssContentSize.width,height:metrics.cssContentSize.height,scale:1}} : {})});
    fs.writeFileSync(path.join(output,name+'.png'),Buffer.from(result.data,'base64'));
  };
  await call('Page.enable'); await call('Runtime.enable'); await call('Network.enable'); await call('Network.setCacheDisabled',{cacheDisabled:true}); await call('Page.bringToFront');
  await call('Page.addScriptToEvaluateOnNewDocument',{source:`window.auditLCP=0; new PerformanceObserver(list=>{for(const item of list.getEntries())window.auditLCP=item.startTime}).observe({type:'largest-contentful-paint',buffered:true});`});
  const results={phase,staticMode,checks:[],errors};
  const check=(name,value)=>{results.checks.push({name,pass:Boolean(value)}); console.log(name,Boolean(value));};
  const visit=async(route,width=1440,height=900)=>{
    await call('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:false});
    await call('Page.navigate',{url:'http://localhost:'+port+route});
    for (let attempt=0; attempt<80; attempt++) {
      await wait(250);
      if (await evaluate('document.readyState==="complete" && location.pathname===' + JSON.stringify(route.split('?')[0]) + ' && !!document.querySelector("header")')) break;
    }
    await evaluate('document.fonts.ready'); await wait(staticMode?1000:1500);
  };
  if (phase === 'projects') {
    const viewports = [360, 390, 768, 1024, 1440];

    // ── 1. Viewport & Layout Checks on /projects ──
    for (const width of viewports) {
      const height = width === 1440 ? 900 : width === 1024 ? 768 : width === 768 ? 1024 : 844;
      await visit('/projects', width, height);

      const facts = await evaluate(`({
        scrollWidth: document.documentElement.scrollWidth,
        viewportWidth: innerWidth,
        firstCardTop: (() => {
          const card = document.querySelector('main article') || document.querySelector('article') || document.querySelector('a[href^="/projects/"]');
          if (!card) return 9999;
          const rect = card.getBoundingClientRect();
          return Math.round(rect.top + window.scrollY);
        })(),
        totalCards: document.querySelectorAll('main article, article').length,
        hasHeader: !!document.querySelector('header'),
        hasFooter: !!document.querySelector('footer')
      })`);

      results['width' + width] = facts;
      await screenshot('projects-' + width);
      if (width === 390 || width === 1440) {
        await screenshot('projects-' + width + '-full', true);
      }

      check(`No horizontal overflow ${width}`, facts.scrollWidth <= width);
      check(`Layout structure valid ${width}`, facts.hasHeader && facts.hasFooter && facts.totalCards > 0);

      if (width === 390) {
        // Mobile 390px viewport: first project card starts before 650px from top
        console.log(`Mobile 390px first card top position: ${facts.firstCardTop}px (target: < 650px)`);
        check('Mobile 390px first project card starts before 650px', facts.firstCardTop < 650);

        // Touch targets >= 44px on mobile
        const touchTargetsFacts = await evaluate(`(() => {
          const filterButtons = Array.from(document.querySelectorAll('button[aria-pressed]'));
          if (filterButtons.length === 0) return { valid: false, count: 0 };
          const undersized = filterButtons.filter(btn => {
            const rect = btn.getBoundingClientRect();
            return rect.height < 44;
          });
          return {
            valid: undersized.length === 0,
            count: filterButtons.length,
            undersized: undersized.map(b => ({ text: b.innerText, height: b.getBoundingClientRect().height }))
          };
        })()`);
        check('Touch targets >= 44px on mobile', touchTargetsFacts.valid);
      }
    }

    // ── 2. Performance: Image Download Budget on /projects (< 4 MB) ──
    await visit('/projects', 1440, 900);
    const scrollHeight = await evaluate('document.documentElement.scrollHeight');
    for (let y = 0; y < scrollHeight; y += 800) {
      await evaluate('window.scrollTo({top:' + y + ',behavior:"instant"})');
      await wait(100);
    }
    await wait(600);
    await evaluate('window.scrollTo({top:0,behavior:"instant"})');
    await wait(200);

    const imageBudget = await evaluate(`(() => {
      const resources = performance.getEntriesByType('resource');
      const imageEntries = resources.filter(r =>
        r.initiatorType === 'img' ||
        /\\.(webp|png|jpe?g|svg|gif|avif)(\\?.*)?$/i.test(r.name)
      );
      const totalBytes = imageEntries.reduce((sum, r) => sum + (r.encodedBodySize || r.transferSize || 0), 0);
      return {
        totalBytes,
        totalMB: (totalBytes / (1024 * 1024)).toFixed(2),
        imageCount: imageEntries.length,
        images: imageEntries.map(r => ({ name: r.name, size: r.encodedBodySize || r.transferSize || 0 }))
      };
    })()`);
    results.imageBudget = imageBudget;
    console.log(`Image download budget on /projects: ${imageBudget.totalMB} MB across ${imageBudget.imageCount} images (budget: < 4 MB)`);
    check('Image budget < 4 MB on /projects', imageBudget.totalBytes < 4 * 1024 * 1024);

    // Check no broken images
    const brokenImages = await evaluate(`Array.from(document.images).filter(i => i.complete && i.naturalWidth === 0).map(i => i.src)`);
    check('No broken images on /projects', brokenImages.length === 0);

    // ── 3. Category Filter Chips & Count Verification ──
    // 4 categories present with exact counts (5, 2, 5, 14) and total 26, verify aria-pressed attribute
    const chipFacts = await evaluate(`(() => {
      const buttons = Array.from(document.querySelectorAll('button[aria-pressed]'));
      return buttons.map(b => ({
        text: b.innerText.replace(/\\s+/g, ' ').trim(),
        ariaPressed: b.getAttribute('aria-pressed')
      }));
    })()`);
    results.categoryChips = chipFacts;

    const allChip = chipFacts.find(c => /tất cả/i.test(c.text));
    const lightingChip = chipFacts.find(c => /chiếu sáng/i.test(c.text));
    const substationChip = chipFacts.find(c => /trạm biến áp/i.test(c.text));
    const electricalChip = chipFacts.find(c => /hệ thống điện/i.test(c.text));
    const meChip = chipFacts.find(c => /cơ điện/i.test(c.text));

    check('Category chip Tất cả present with count 26', Boolean(allChip && /\b26\b/.test(allChip.text)));
    check('Category chip Chiếu sáng present with count 5', Boolean(lightingChip && /\b5\b/.test(lightingChip.text)));
    check('Category chip Trạm biến áp & lưới điện present with count 2', Boolean(substationChip && /\b2\b/.test(substationChip.text)));
    check('Category chip Hệ thống điện present with count 5', Boolean(electricalChip && /\b5\b/.test(electricalChip.text)));
    check('Category chip Cơ điện M&E present with count 14', Boolean(meChip && /\b14\b/.test(meChip.text)));

    check('Initial aria-pressed attribute state correct', Boolean(
      allChip && allChip.ariaPressed === 'true' &&
      lightingChip && lightingChip.ariaPressed === 'false' &&
      substationChip && substationChip.ariaPressed === 'false' &&
      electricalChip && electricalChip.ariaPressed === 'false' &&
      meChip && meChip.ariaPressed === 'false'
    ));

    // ── 4. URL Query Param ?cat= Sync and Filtering ──
    const filterTests = [
      { key: 'lighting', namePattern: /chiếu sáng/i, expectedCount: 5, label: 'Chiếu sáng' },
      { key: 'substation', namePattern: /trạm biến áp/i, expectedCount: 2, label: 'Trạm biến áp & lưới điện' },
      { key: 'electrical', namePattern: /hệ thống điện/i, expectedCount: 5, label: 'Hệ thống điện' },
      { key: 'me', namePattern: /cơ điện/i, expectedCount: 14, label: 'Cơ điện M&E' }
    ];

    for (const ft of filterTests) {
      await evaluate(`(() => {
        const buttons = Array.from(document.querySelectorAll('button[aria-pressed]'));
        const target = buttons.find(b => ${ft.namePattern.toString()}.test(b.innerText));
        if (target) target.click();
      })()`);
      await wait(400);

      const filterState = await evaluate(`(() => {
        const currentSearch = window.location.search;
        const buttons = Array.from(document.querySelectorAll('button[aria-pressed]'));
        const activeBtn = buttons.find(b => ${ft.namePattern.toString()}.test(b.innerText));
        const cards = document.querySelectorAll('main article, article');
        return {
          search: currentSearch,
          ariaPressed: activeBtn ? activeBtn.getAttribute('aria-pressed') : null,
          cardCount: cards.length
        };
      })()`);

      check(`Filter click ${ft.label} updates URL ?cat=${ft.key}`, filterState.search.includes(`cat=${ft.key}`));
      check(`Filter click ${ft.label} sets aria-pressed=true`, filterState.ariaPressed === 'true');
      check(`Filter click ${ft.label} displays exact card count (${ft.expectedCount})`, filterState.cardCount === ft.expectedCount);
      await screenshot(`projects-filter-${ft.key}`);
    }

    // Reset back to "Tất cả"
    await evaluate(`(() => {
      const buttons = Array.from(document.querySelectorAll('button[aria-pressed]'));
      const allBtn = buttons.find(b => /tất cả/i.test(b.innerText));
      if (allBtn) allBtn.click();
    })()`);
    await wait(400);

    const resetState = await evaluate(`({
      search: window.location.search,
      cardCount: document.querySelectorAll('main article, article').length,
      allAriaPressed: document.querySelector('button[aria-pressed]')?.getAttribute('aria-pressed')
    })`);
    check('Reset filter to Tất cả restores 26 cards', resetState.cardCount === 26);

    // Direct navigation with ?cat=substation
    await visit('/projects?cat=substation', 1440, 900);
    const directNavState = await evaluate(`(() => {
      const cards = document.querySelectorAll('main article, article');
      const buttons = Array.from(document.querySelectorAll('button[aria-pressed]'));
      const subBtn = buttons.find(b => /trạm biến áp/i.test(b.innerText));
      return {
        search: window.location.search,
        cardCount: cards.length,
        ariaPressed: subBtn ? subBtn.getAttribute('aria-pressed') : null
      };
    })()`);
    check('Direct URL navigation /projects?cat=substation filters 2 cards', directNavState.cardCount === 2);
    check('Direct URL navigation ?cat=substation sets aria-pressed=true', directNavState.ariaPressed === 'true');

    // ── 5. Sample Detail Pages Audit (3 sample slugs) ──
    const sampleDetailPages = [
      {
        slug: 'thi-cong-xay-lap-hang-muc-chieu-sang-1',
        name: 'Chiếu sáng kiến trúc cầu vượt Chùa Bộc - Thái Hà',
        expectedTitle: 'Chiếu sáng kiến trúc cầu vượt Chùa Bộc - Thái Hà | BT DECOM',
        isFirst: true
      },
      {
        slug: 'he-thong-dien-du-an-t1',
        name: 'Hệ thống điện - Dự án T1',
        expectedTitle: 'Hệ thống điện - Dự án T1 | BT DECOM',
        isFirst: false
      },
      {
        slug: 'thi-cong-cap-ngam-35kv-yen-vien',
        name: 'Tuyến cáp ngầm trung thế 35KV và Trạm biến áp nhà máy Yên Viên',
        expectedTitle: 'Tuyến cáp ngầm trung thế 35KV và Trạm biến áp nhà máy Yên Viên | BT DECOM',
        isFirst: false
      }
    ];

    const observedTitles = [];
    for (const sample of sampleDetailPages) {
      await visit('/projects/' + sample.slug, 1440, 900);
      await screenshot('detail-' + sample.slug);

      const detailFacts = await evaluate(`(() => {
        const title = document.title;

        // Hero image
        const heroImg = document.querySelector('section img');
        const heroSrc = heroImg ? (heroImg.getAttribute('src') || heroImg.src) : '';

        // Section 01 image: first section inside article
        const firstSection = document.querySelector('article section');
        const firstSectionImg = firstSection ? firstSection.querySelector('img') : null;
        const firstSectionSrc = firstSectionImg ? (firstSectionImg.getAttribute('src') || firstSectionImg.src) : '';

        // Related projects block (3 cards)
        const headings = Array.from(document.querySelectorAll('h2, h3'));
        const relatedHeading = headings.find(h => /cùng lĩnh vực|liên quan/i.test(h.innerText));
        const relatedSection = relatedHeading ? relatedHeading.closest('section') : null;
        const relatedCards = relatedSection
          ? (relatedSection.querySelectorAll('article').length > 0
              ? relatedSection.querySelectorAll('article')
              : relatedSection.querySelectorAll('a[href^="/projects/"]'))
          : document.querySelectorAll('article ~ section article, main > section article');

        // Adjacent navigation links (prev/next)
        const allProjectLinks = Array.from(document.querySelectorAll('a[href^="/projects/"]'));
        const prevLink = allProjectLinks.find(a => /trước|prev/i.test(a.innerText) || /trước|prev/i.test(a.getAttribute('aria-label') || ''));
        const nextLink = allProjectLinks.find(a => /sau|next/i.test(a.innerText) || /sau|next/i.test(a.getAttribute('aria-label') || ''));

        return {
          title,
          heroSrc,
          firstSectionSrc,
          repeatsHero: Boolean(heroSrc && firstSectionSrc && heroSrc === firstSectionSrc),
          relatedCardCount: relatedCards.length,
          hasPrev: Boolean(prevLink),
          hasNext: Boolean(nextLink)
        };
      })()`);

      observedTitles.push(detailFacts.title.trim());
      results['detail_' + sample.slug] = detailFacts;

      // Assertion 1: Unique <title> matching `${project.name} | BT DECOM`
      check(`Unique <title> matching "\${name} | BT DECOM": ${sample.slug}`, detailFacts.title.trim() === sample.expectedTitle);

      // Assertion 2: Section 01 does not repeat hero image
      check(`Section 01 does not repeat hero image: ${sample.slug}`, !detailFacts.repeatsHero);

      // Assertion 3: Related projects block has 3 cards
      check(`Related projects block has 3 cards: ${sample.slug}`, detailFacts.relatedCardCount === 3);

      // Assertion 4: Adjacent navigation links (prev/next) present
      if (sample.isFirst) {
        check(`Adjacent navigation links (prev/next) present: ${sample.slug}`, detailFacts.hasNext);
      } else {
        check(`Adjacent navigation links (prev/next) present: ${sample.slug}`, detailFacts.hasPrev && detailFacts.hasNext);
      }
    }

    check('Detail page titles are distinct and unique', new Set(observedTitles).size === sampleDetailPages.length);
    check('No runtime exceptions during projects audit', errors.length === 0);
  } else if (phase === 'hero') {
    for (const width of [390,1024,1280,1366,1440,1536,1920]) {
      await visit('/',width,width===390?844:width<=1366?768:900);
      await screenshot('hero-'+width);
      results['width'+width]=await evaluate(`(() => {
        const hero=document.querySelector('section[aria-labelledby=hero-heading]');
        const grid=hero.querySelector('.grid');
        const heading=hero.querySelector('h1');
        const firstLine=document.createRange();firstLine.selectNodeContents(heading.firstChild);
        return {viewport:innerWidth,scrollWidth:document.documentElement.scrollWidth,contentWidth:grid.parentElement.getBoundingClientRect().width,gridWidth:grid.getBoundingClientRect().width,headingFirstLineRects:Array.from(firstLine.getClientRects()).map(rect=>({left:rect.left,right:rect.right,top:rect.top})),headingColumnRight:heading.parentElement.parentElement.getBoundingClientRect().right,controls:Array.from(hero.querySelectorAll('button[aria-label^="Trang"]')).map(button=>({label:button.getAttribute('aria-label'),left:button.getBoundingClientRect().left,right:button.getBoundingClientRect().right}))};
      })()`);
    }
  } else if (phase === 'cta') {
    for (const width of [390,1440]) {
      await visit('/',width,width===1440?900:844);
      await evaluate('document.querySelector("section[aria-labelledby=contact-heading]").scrollIntoView({behavior:"instant",block:"center"})');
      await wait(1500);
      await screenshot('cta-'+width);
    }
  } else if (phase === 'stage3') {
    for (const width of [390,1440]) {
      await visit('/',width,width===1440?900:844);
      await screenshot('home-'+width);
      check('Hero actions visible '+width,await evaluate(`!!document.querySelector('section a[href="/contact"]') && !!document.querySelector('section a[href="/projects"]')`));
      check('Three curated projects '+width,await evaluate('document.querySelectorAll("section[aria-labelledby=projects-heading] article").length===3'));
      check('Projects follow services '+width,await evaluate('document.querySelector("section[aria-labelledby=services-heading]").nextElementSibling.getAttribute("aria-labelledby")==="projects-heading"'));
      check('No horizontal overflow '+width,await evaluate('document.documentElement.scrollWidth<=innerWidth'));
    }
  } else if (phase === 'stage2') {
    await visit('/contact',390,844); await screenshot('contact-mobile');
    check('Contact has no simulated form', await evaluate('document.querySelectorAll("form").length===0 && document.body.innerText.includes("Gửi email tư vấn")'));
    check('Contact uses real phone',await evaluate('!!document.querySelector(\'a[href="tel:0936189292"]\')'));
    await evaluate('document.querySelector("button[aria-controls=mobile-navigation]").click()'); await wait(300); await screenshot('mobile-menu');
    check('Menu expanded and scroll locked',await evaluate('document.querySelector("button[aria-controls=mobile-navigation]").getAttribute("aria-expanded")==="true" && document.body.style.overflow==="hidden"'));
    await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27}); await wait(200);
    check('Escape restores focus',await evaluate('!document.querySelector("#mobile-navigation") && document.activeElement===document.querySelector("button[aria-controls=mobile-navigation]") && document.body.style.overflow!=="hidden"'));
    await visit('/services'); await screenshot('services-desktop');
    check('Zoom removed',await evaluate('getComputedStyle(document.documentElement).zoom==="1"'));
  } else {
    for(const width of (phase==='baseline'?[1440,390]:[360,390,768,1024,1440])) {
      await visit('/',width,width===1440?900:844);
      const facts=await evaluate(`({width:innerWidth,height:innerHeight,pageHeight:document.documentElement.scrollHeight,scrollWidth:document.documentElement.scrollWidth,heading:document.querySelector('h1')?.innerText,sections:Array.from(document.querySelectorAll('main > section')).map(s=>({heading:s.querySelector('h1,h2')?.innerText,top:Math.round(s.getBoundingClientRect().top+scrollY),height:Math.round(s.getBoundingClientRect().height)})),video:document.querySelectorAll('video').length,videoSource:document.querySelector('video source')?.getAttribute('src'),videoPlaying:!!document.querySelector('video') && !document.querySelector('video').paused && document.querySelector('video').readyState>=2,deadLinks:document.querySelectorAll('a[href="#"],a[href*="XXXXXXXX"]').length,brokenImages:Array.from(document.images).filter(i=>i.complete&&i.naturalWidth===0).map(i=>i.src),performance:{lcpMs:window.auditLCP,domContentLoadedMs:performance.getEntriesByType('navigation')[0].domContentLoadedEventEnd,resourceBytes:performance.getEntriesByType('resource').reduce((s,r)=>s+r.encodedBodySize,0),videoRequests:performance.getEntriesByType('resource').filter(r=>r.name.includes('.mp4')).map(r=>r.name)}})`);
      results['width'+width]=facts;
      await screenshot('home-'+width); if(width===390||width===1440) await screenshot('home-'+width+'-full',true);
      if(phase!=='baseline' && (width===390||width===1440)) {
        await evaluate('document.querySelector("section[aria-labelledby=news-heading]").scrollIntoView({behavior:"instant",block:"start"})');
        await wait(1200);
        await screenshot('news-'+width);
        await evaluate('document.querySelector("section[aria-labelledby=contact-heading]").scrollIntoView({behavior:"instant",block:"center"})');
        await wait(1200);
        await screenshot('cta-'+width);
        await evaluate('window.scrollTo({top:0,behavior:"instant"})');
        await wait(200);
      }
      if(phase!=='baseline') {
        check('Montserrat headings '+width,await evaluate('getComputedStyle(document.querySelector("h1")).fontFamily.includes("Montserrat")'));
        check('Inter body '+width,await evaluate('getComputedStyle(document.body).fontFamily.includes("Inter")'));
        if(width===390||width===1440) check('All homepage images loaded '+width,await evaluate('Array.from(document.images).every(image=>image.complete&&image.naturalWidth>0)'));
        check('No horizontal overflow '+width,facts.scrollWidth<=width);
        check('No dead links '+width,facts.deadLinks===0);
        check('No broken local images '+width,facts.brokenImages.length===0);
        check('Original hero video '+width,facts.video===1 && facts.videoSource==='/videos/hero_bgr.mp4' && facts.videoPlaying);
        check('Original hero heading '+width,facts.heading.replace(/\s+/g,' ').trim()==='Chúng tôi sống vì thử thách');
        if(width<1024) check('Original mobile hero CTA visible '+width,await evaluate(`Array.from(document.querySelectorAll('section[aria-labelledby="hero-heading"] a[href="/projects"]')).some(a=>a.getBoundingClientRect().height>0&&a.getBoundingClientRect().bottom<=innerHeight)`));
      }
    }
    if(phase!=='baseline'){
      await visit('/',1440,900);
      const beforeSlide=await evaluate('document.querySelector("section[aria-labelledby=hero-heading] h3").innerText');
      await evaluate('document.querySelector("button[aria-label=\\"Trang sau\\"]").click()');await wait(1900);
      check('Original hero slider advances',await evaluate('document.querySelector("section[aria-labelledby=hero-heading] h3").innerText')!==beforeSlide);
      check('Desktop slider controls fit viewport',await evaluate('Array.from(document.querySelectorAll("section[aria-labelledby=hero-heading] button[aria-label^=Trang]")).every(button=>{const rect=button.getBoundingClientRect();return rect.left>=0&&rect.right<=innerWidth})'));
      await evaluate('window.scrollTo({top:200,behavior:"instant"})');await wait(500);
      check('Header becomes white on scroll',await evaluate('scrollY>50 && document.querySelector("header").classList.contains("bg-white") && document.querySelector("header").classList.contains("text-brand-dark")'));
      await visit('/',390,844);
      await evaluate('document.querySelector("button[aria-controls=mobile-navigation]").click()'); await wait(200);
      await screenshot('mobile-menu');
      check('Menu focuses first link',await evaluate('document.activeElement===document.querySelector("#mobile-navigation a")'));
      await evaluate('Array.from(document.querySelectorAll("#mobile-navigation a")).at(-1).focus()');
      await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Tab',code:'Tab',windowsVirtualKeyCode:9});
      check('Menu traps forward Tab',await evaluate('document.activeElement===document.querySelector("button[aria-controls=mobile-navigation]")'));
      await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});await wait(200);
      check('Escape closes menu and restores focus',await evaluate('!document.querySelector("#mobile-navigation") && document.activeElement===document.querySelector("button[aria-controls=mobile-navigation]")'));
      await evaluate('document.querySelector(".skip-link").focus()');
      await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});await wait(200);
      check('Skip link focuses content after navigation',await evaluate('document.activeElement.id==="main-content"'));
      await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Tab',code:'Tab',windowsVirtualKeyCode:9});
      check('Skip link bypasses header links',await evaluate('document.activeElement.closest("section")?.getAttribute("aria-labelledby")==="hero-heading"'));
      await evaluate('document.documentElement.style.fontSize="20px"');
      check('Enlarged text fits mobile',await evaluate('document.documentElement.scrollWidth<=innerWidth'));
      await evaluate('document.documentElement.style.fontSize=""');
      await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
      check('Reduced motion disables smooth scrolling',await evaluate('getComputedStyle(document.documentElement).scrollBehavior==="auto"'));
      await call('Emulation.setEmulatedMedia',{features:[]});
      const routes=['/about','/services','/projects','/news','/contact','/services/thi-cong-xay-lap-dien','/projects/thi-cong-xay-lap-hang-muc-chieu-sang-1','/news/bt-decom-trien-khai-giai-doan-moi-du-an-khu-phuc-hop-ha-noi'];
      for(const route of routes){await visit(route,390,844);check('Route '+route,await evaluate('!!document.querySelector("h1,h2") && !!document.querySelector("header") && !!document.querySelector("footer") && !document.body.innerText.includes("This page could not be found")'));check('Route fits mobile '+route,await evaluate('document.documentElement.scrollWidth<=innerWidth'));}
      await visit('/contact',390,844); await screenshot('contact-mobile');
      check('Contact no form',await evaluate('document.querySelectorAll("form").length===0'));
      await visit('/');
      await evaluate('document.querySelector(".animate-marquee").closest("section").scrollIntoView({behavior:"instant",block:"center"})');
      await wait(1500);
      await screenshot('partners-1440');
      const links=await evaluate(`Array.from(document.querySelectorAll('a[href^="/"]')).map(a=>a.getAttribute('href'))`);
      for(const href of [...new Set(links)]) {const response=await fetch('http://localhost:'+port+href);check('Link '+href,response.status===200);}
      check('No runtime exceptions',errors.length===0);
    }
  }
  fs.writeFileSync(path.join(output,'results.json'),JSON.stringify(results,null,2));
  console.log('Saved',output);
  call('Browser.close').catch(()=>{}); ws.close(); if(server)server.close(); await wait(300); process.exit(results.checks.some(check=>!check.pass)?1:0);
}
main().catch(error=>{console.error(error);if(server)server.close();process.exit(1)});
