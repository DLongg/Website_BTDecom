#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT_DIR = process.cwd();
const SRC_DIR = path.resolve(ROOT_DIR, 'public/images/projects');
const DEST_DIR = path.resolve(ROOT_DIR, 'public/images/projects-web');

const CARD_WIDTH = 800;
const CARD_QUALITY = 72;
const FULL_WIDTH = 1600;
const FULL_QUALITY = 80;

const FORCE = process.argv.includes('--force');

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

function sanitizeStem(filename) {
  const name = path.parse(filename).name;
  return name.trim().replace(/\s+/g, '-');
}

function shouldConvert(srcPath, destPath) {
  if (FORCE) return true;
  if (!fs.existsSync(destPath)) return true;
  const srcStat = fs.statSync(srcPath);
  const destStat = fs.statSync(destPath);
  return srcStat.mtimeMs > destStat.mtimeMs;
}

async function convertFile(srcPath, destPath, options) {
  const { width, quality } = options;
  await sharp(srcPath)
    .rotate()
    .resize({
      width,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality })
    .toFile(destPath);
}

async function run() {
  console.log('='.repeat(60));
  console.log('BT DECOM - Project Images WebP Optimizer');
  console.log(`Source:      ${SRC_DIR}`);
  console.log(`Destination: ${DEST_DIR}`);
  console.log(`Card WebP:   max width ${CARD_WIDTH}px, quality ${CARD_QUALITY}`);
  console.log(`Full WebP:   max width ${FULL_WIDTH}px, quality ${FULL_QUALITY}`);
  console.log(`Force mode:  ${FORCE}`);
  console.log('='.repeat(60));

  if (!fs.existsSync(SRC_DIR)) {
    throw new Error(`Source directory does not exist: ${SRC_DIR}`);
  }

  if (!fs.existsSync(DEST_DIR)) {
    fs.mkdirSync(DEST_DIR, { recursive: true });
  }

  const entries = fs.readdirSync(SRC_DIR, { withFileTypes: true });
  const projectDirs = entries
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
    .sort((a, b) => a.localeCompare(b));

  console.log(`Found ${projectDirs.length} project directories.\n`);

  let totalInputFiles = 0;
  let totalConvertedFiles = 0;
  let totalSkippedFiles = 0;
  let totalInputBytes = 0;
  let totalCardBytes = 0;
  let totalFullBytes = 0;
  let totalPrimaryCardBytes = 0;

  for (const slug of projectDirs) {
    const projectSrcDir = path.join(SRC_DIR, slug);
    const projectDestDir = path.join(DEST_DIR, slug);

    if (!fs.existsSync(projectDestDir)) {
      fs.mkdirSync(projectDestDir, { recursive: true });
    }

    const files = fs.readdirSync(projectSrcDir);
    const imageFiles = files
      .filter(f => /\.(png|jpg|jpeg|webp)$/i.test(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

    if (imageFiles.length === 0) {
      console.warn(`[WARN] No images found in ${slug}`);
      continue;
    }

    console.log(`📁 ${slug} (${imageFiles.length} file${imageFiles.length > 1 ? 's' : ''})`);

    let isFirstInProject = true;

    for (const file of imageFiles) {
      totalInputFiles += 1;
      const srcPath = path.join(projectSrcDir, file);
      const srcStat = fs.statSync(srcPath);
      totalInputBytes += srcStat.size;

      const stem = sanitizeStem(file);
      const cardDestPath = path.join(projectDestDir, `${stem}-card.webp`);
      const fullDestPath = path.join(projectDestDir, `${stem}-full.webp`);

      const needCard = shouldConvert(srcPath, cardDestPath);
      const needFull = shouldConvert(srcPath, fullDestPath);

      if (needCard) {
        await convertFile(srcPath, cardDestPath, {
          width: CARD_WIDTH,
          quality: CARD_QUALITY,
        });
        totalConvertedFiles += 1;
      } else {
        totalSkippedFiles += 1;
      }

      if (needFull) {
        await convertFile(srcPath, fullDestPath, {
          width: FULL_WIDTH,
          quality: FULL_QUALITY,
        });
        totalConvertedFiles += 1;
      } else {
        totalSkippedFiles += 1;
      }

      const cardStat = fs.statSync(cardDestPath);
      const fullStat = fs.statSync(fullDestPath);
      totalCardBytes += cardStat.size;
      totalFullBytes += fullStat.size;

      if (isFirstInProject) {
        totalPrimaryCardBytes += cardStat.size;
        isFirstInProject = false;
      }

      const cardAction = needCard ? 'converted' : 'cached';
      const fullAction = needFull ? 'converted' : 'cached';
      console.log(
        `   ↳ ${file} (${formatBytes(srcStat.size)}) -> card: ${formatBytes(cardStat.size)} [${cardAction}], full: ${formatBytes(fullStat.size)} [${fullAction}]`
      );
    }
  }

  const totalOutputBytes = totalCardBytes + totalFullBytes;
  const overallSavingsBytes = totalInputBytes - totalOutputBytes;
  const overallSavingsPercent = totalInputBytes > 0
    ? ((overallSavingsBytes / totalInputBytes) * 100).toFixed(1)
    : '0';

  console.log('\n' + '='.repeat(60));
  console.log('OPTIMIZATION SUMMARY');
  console.log('='.repeat(60));
  console.log(`Project directories processed:   ${projectDirs.length}`);
  console.log(`Input image files:              ${totalInputFiles}`);
  console.log(`Output files converted:         ${totalConvertedFiles}`);
  console.log(`Output files skipped (cached):   ${totalSkippedFiles}`);
  console.log(`Total input size:               ${formatBytes(totalInputBytes)} (${totalInputBytes.toLocaleString()} bytes)`);
  console.log(`Total card WebP size (all 45):  ${formatBytes(totalCardBytes)} (${totalCardBytes.toLocaleString()} bytes)`);
  console.log(`Total full WebP size (all 45):  ${formatBytes(totalFullBytes)} (${totalFullBytes.toLocaleString()} bytes)`);
  console.log(`Total output size:              ${formatBytes(totalOutputBytes)} (${totalOutputBytes.toLocaleString()} bytes)`);
  console.log(`Primary 24 card images size:    ${formatBytes(totalPrimaryCardBytes)} (${totalPrimaryCardBytes.toLocaleString()} bytes)`);
  console.log(`Overall space saved:            ${formatBytes(overallSavingsBytes)} (${overallSavingsPercent}%)`);
  console.log('='.repeat(60));

  if (totalPrimaryCardBytes > 4 * 1024 * 1024) {
    throw new Error(
      `Primary card images total size exceeds 4 MB: ${formatBytes(totalPrimaryCardBytes)}`
    );
  }
}

run().catch((err) => {
  console.error('\n❌ Optimization failed:', err);
  process.exit(1);
});
