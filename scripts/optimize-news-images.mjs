#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT_DIR = process.cwd();
const RECRUITMENT_SRC_DIR = process.env.RECRUITMENT_SRC_DIR || path.resolve(ROOT_DIR, 'public/images/recruitment-raw');
const NEWS_SRC_DIR = path.resolve(ROOT_DIR, 'public/images/news');
const NEWS_WEB_DIR = path.resolve(ROOT_DIR, 'public/images/news-web');
const RECRUITMENT_DEST_DIR = path.resolve(NEWS_WEB_DIR, 'recruitment');
const PROJECTS_WEB_DIR = path.resolve(ROOT_DIR, 'public/images/projects-web');

const SUBSTATION_CARD_SRC = path.resolve(
  PROJECTS_WEB_DIR,
  'thi-cong-xay-lap-tram-bien-ap-750-kva-may-phat-dien-du-phong-100-kva-va-tuyen-c-6/1-card.webp'
);
const SUBSTATION_FULL_SRC = path.resolve(
  PROJECTS_WEB_DIR,
  'thi-cong-xay-lap-tram-bien-ap-750-kva-may-phat-dien-du-phong-100-kva-va-tuyen-c-6/1-full.webp'
);

const LAODONG_ARTICLES = [
  {
    name: 'laodong-tet-2024.webp',
    url: 'https://media-cdn-v2.laodong.vn/storage/newsportal/2023/12/29/1286192/Tim-Viec-5.jpg?w=660',
    title: 'Sôi động thị trường việc làm dịp Tết (Báo Lao Động)',
  },
  {
    name: 'laodong-nhan-su-2024.webp',
    url: 'https://media-cdn-v2.laodong.vn/storage/newsportal/2024/1/5/1288723/Vieclam.jpg?w=660',
    title: 'Khó tuyển dụng nhân sự dịp cận Tết Nguyên đán 2024 (Báo Lao Động)',
  },
];

const RECRUITMENT_IMAGES = [
  { file: 'team-photo.jpg', target: 'team-photo.webp', orientation: 'landscape' },
  { file: 'interview.jpg', target: 'interview.webp', orientation: 'landscape' },
  { file: 'construction-1.jpg', target: 'construction-1.webp', orientation: 'portrait' },
  { file: 'construction-2.jpg', target: 'construction-2.webp', orientation: 'portrait' },
  { file: 'construction-3.jpg', target: 'construction-3.webp', orientation: 'portrait' },
  { file: 'recruitment-sign.jpg', target: 'recruitment-sign.webp', orientation: 'portrait' },
];

const NEWS_HERO_IMAGES = [
  'news-featured-hero.jpg',
  'news-mep.jpg',
  'news-green-building.jpg',
];

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

async function fetchWithTimeout(url, timeoutMs = 15000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });
    clearTimeout(id);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }
    const arrayBuffer = await res.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

async function optimizeImage(input, outputPath, options = {}) {
  const { width, quality = 80 } = options;
  let pipeline = sharp(input).rotate();
  if (width) {
    pipeline = pipeline.resize({
      width,
      fit: 'inside',
      withoutEnlargement: true,
    });
  }
  await pipeline.webp({ quality }).toFile(outputPath);
}

async function verifyImage(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Verification failed: file missing at ${filePath}`);
  }
  const stat = fs.statSync(filePath);
  if (stat.size === 0) {
    throw new Error(`Verification failed: 0 bytes file at ${filePath}`);
  }
  const metadata = await sharp(filePath).metadata();
  if (metadata.format !== 'webp') {
    throw new Error(`Verification failed: expected webp format but got ${metadata.format} for ${filePath}`);
  }
  return {
    size: stat.size,
    width: metadata.width,
    height: metadata.height,
    format: metadata.format,
  };
}

async function run() {
  console.log('='.repeat(70));
  console.log('BT DECOM — News & Recruitment Image Optimizer');
  console.log('='.repeat(70));

  // 1. Ensure target directories exist
  if (!fs.existsSync(NEWS_WEB_DIR)) {
    fs.mkdirSync(NEWS_WEB_DIR, { recursive: true });
    console.log(`[DIR] Created: ${NEWS_WEB_DIR}`);
  }
  if (!fs.existsSync(RECRUITMENT_DEST_DIR)) {
    fs.mkdirSync(RECRUITMENT_DEST_DIR, { recursive: true });
    console.log(`[DIR] Created: ${RECRUITMENT_DEST_DIR}`);
  }

  const results = [];

  // 2. Process 6 recruitment images from scratch repo
  console.log('\n--- 1. Processing 6 Recruitment Images ---');
  for (const item of RECRUITMENT_IMAGES) {
    const srcPath = path.join(RECRUITMENT_SRC_DIR, item.file);
    const destPath = path.join(RECRUITMENT_DEST_DIR, item.target);

    if (!fs.existsSync(srcPath)) {
      if (fs.existsSync(destPath)) {
        const meta = await verifyImage(destPath);
        results.push({ name: `recruitment/${item.target}`, ...meta });
        console.log(`  ✓ ${item.target} (existing WebP verified: ${meta.width}x${meta.height}, ${formatBytes(meta.size)})`);
        continue;
      }
      throw new Error(`Recruitment source image missing: ${srcPath}`);
    }

    await optimizeImage(srcPath, destPath, { quality: 80 });
    const meta = await verifyImage(destPath);
    results.push({ name: `recruitment/${item.target}`, ...meta });
    console.log(`  ✓ ${item.target} (${meta.width}x${meta.height}, ${formatBytes(meta.size)})`);
  }

  // 3. Process 2 Lao Dong newspaper images
  console.log('\n--- 2. Processing 2 Lao Dong Newspaper Images ---');
  for (const item of LAODONG_ARTICLES) {
    const destPath = path.join(RECRUITMENT_DEST_DIR, item.name);

    try {
      console.log(`  Downloading ${item.title}...`);
      const buffer = await fetchWithTimeout(item.url, 15000);
      await sharp(buffer)
        .rotate()
        .resize({ width: 800, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(destPath);
      console.log(`  ✓ Successfully downloaded and optimized: ${item.name}`);
    } catch (err) {
      console.warn(`  [WARN] Download failed for ${item.name} (${err.message}). Using local high-res recruitment fallback.`);
      const fallbackSrc = path.join(RECRUITMENT_DEST_DIR, 'interview.webp');
      if (fs.existsSync(fallbackSrc)) {
        fs.copyFileSync(fallbackSrc, destPath);
      } else {
        throw new Error(`Neither download nor fallback could create ${item.name}`);
      }
    }

    const meta = await verifyImage(destPath);
    results.push({ name: `recruitment/${item.name}`, ...meta });
    console.log(`  ✓ ${item.name} (${meta.width}x${meta.height}, ${formatBytes(meta.size)})`);
  }

  // 4. Process News images (hero, mep, green-building)
  console.log('\n--- 3. Processing News Images to WebP ---');
  for (const file of NEWS_HERO_IMAGES) {
    const srcPath = path.join(NEWS_SRC_DIR, file);
    if (!fs.existsSync(srcPath)) {
      console.warn(`[WARN] News image not found: ${srcPath}`);
      continue;
    }
    const stem = path.parse(file).name;

    // Default WebP
    const destDefault = path.join(NEWS_WEB_DIR, `${stem}.webp`);
    await optimizeImage(srcPath, destDefault, { quality: 85 });
    const metaDefault = await verifyImage(destDefault);
    results.push({ name: `${stem}.webp`, ...metaDefault });

    // Card WebP (width 800)
    const destCard = path.join(NEWS_WEB_DIR, `${stem}-card.webp`);
    await optimizeImage(srcPath, destCard, { width: 800, quality: 75 });
    const metaCard = await verifyImage(destCard);
    results.push({ name: `${stem}-card.webp`, ...metaCard });

    // Full WebP (width 1600)
    const destFull = path.join(NEWS_WEB_DIR, `${stem}-full.webp`);
    await optimizeImage(srcPath, destFull, { width: 1600, quality: 85 });
    const metaFull = await verifyImage(destFull);
    results.push({ name: `${stem}-full.webp`, ...metaFull });

    console.log(`  ✓ ${stem}:`);
    console.log(`    - default: ${metaDefault.width}x${metaDefault.height}, ${formatBytes(metaDefault.size)}`);
    console.log(`    - card:    ${metaCard.width}x${metaCard.height}, ${formatBytes(metaCard.size)}`);
    console.log(`    - full:    ${metaFull.width}x${metaFull.height}, ${formatBytes(metaFull.size)}`);
  }

  // 5. Provide substation aliases in news-web for Article 6
  console.log('\n--- 4. Setting Up Substation Images for Article 6 ---');
  if (fs.existsSync(SUBSTATION_CARD_SRC)) {
    const destCard = path.join(NEWS_WEB_DIR, 'tram-bien-ap-110kv-card.webp');
    fs.copyFileSync(SUBSTATION_CARD_SRC, destCard);
    const metaCard = await verifyImage(destCard);
    results.push({ name: 'tram-bien-ap-110kv-card.webp', ...metaCard });
    console.log(`  ✓ tram-bien-ap-110kv-card.webp (${metaCard.width}x${metaCard.height}, ${formatBytes(metaCard.size)})`);
  } else {
    console.warn(`[WARN] Substation card source not found: ${SUBSTATION_CARD_SRC}`);
  }

  if (fs.existsSync(SUBSTATION_FULL_SRC)) {
    const destFull = path.join(NEWS_WEB_DIR, 'tram-bien-ap-110kv-full.webp');
    fs.copyFileSync(SUBSTATION_FULL_SRC, destFull);
    const metaFull = await verifyImage(destFull);
    results.push({ name: 'tram-bien-ap-110kv-full.webp', ...metaFull });
    console.log(`  ✓ tram-bien-ap-110kv-full.webp (${metaFull.width}x${metaFull.height}, ${formatBytes(metaFull.size)})`);
  }

  // 6. Final Summary
  console.log('\n' + '='.repeat(70));
  console.log(`Optimization Completed: ${results.length} WebP files generated and verified.`);
  console.log('='.repeat(70));
  console.table(
    results.map(r => ({
      File: r.name,
      Dimensions: `${r.width}x${r.height}`,
      Size: formatBytes(r.size),
      Format: r.format,
    }))
  );
}

run().catch(err => {
  console.error('\n[ERROR] Optimization failed:', err);
  process.exit(1);
});
