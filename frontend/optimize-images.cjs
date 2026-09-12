const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'src', 'assets');
const files = fs.readdirSync(assetsDir);

async function run() {
  console.log('Optimizing images...');
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const name = path.basename(file, ext);
    const inputPath = path.join(assetsDir, file);

    // Skip if it's already a WebP or we already converted it
    if (ext === '.webp') continue;

    if (ext === '.png') {
      const outputPath = path.join(assetsDir, `${name}.webp`);
      console.log(`Converting ${file} -> ${name}.webp`);
      await sharp(inputPath)
        .webp({ quality: 85, effort: 6 })
        .toFile(outputPath);
    } else if (ext === '.jpg' || ext === '.jpeg') {
      const outputPath = path.join(assetsDir, `${name}.webp`);
      console.log(`Converting ${file} -> ${name}.webp`);
      await sharp(inputPath)
        .webp({ quality: 80, effort: 6 })
        .toFile(outputPath);
    }
  }
  console.log('Image optimization finished!');
}

run().catch(console.error);
