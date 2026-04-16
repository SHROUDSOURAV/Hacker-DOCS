import fs from 'fs';
import path from 'path';

const SRC_DIR = process.cwd();
const DEST_DIR = path.join(process.cwd(), 'public', 'assets');

// Define dirs to ignore based on standard Next.js and dev setups
const IGNORE_DIRS = ['.git', '.next', 'node_modules', '.obsidian', 'app', 'components', 'lib', 'public', 'scripts'];
const IMAGE_EXTS = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'];

function handleFile(fullPath) {
  const file = path.basename(fullPath);
  const ext = path.extname(file).toLowerCase();
  
  if (IMAGE_EXTS.includes(ext)) {
    const relativePath = path.relative(SRC_DIR, fullPath);
    
    // Check if any part of the path is in IGNORE_DIRS
    const pathParts = relativePath.split(path.sep);
    if (pathParts.some(part => IGNORE_DIRS.includes(part))) return;
    if (pathParts.some(part => part.startsWith('.') && part !== '.obsidian')) return;

    const destPath = path.join(DEST_DIR, relativePath);

    // Ensure dest dir exists
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    
    // Copy file
    fs.copyFileSync(fullPath, destPath);
    console.log(`[SYNC] Copied ${relativePath} to public/assets`);
  }
}

function copyImages(currentDir) {
  const files = fs.readdirSync(currentDir);
  for (const file of files) {
    if (file.startsWith('.') && file !== '.obsidian') continue;
    if (IGNORE_DIRS.includes(file)) continue;

    const fullPath = path.join(currentDir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      copyImages(fullPath);
    } else {
      handleFile(fullPath);
    }
  }
}

const args = process.argv.slice(2);
const watchMode = args.includes('--watch');

console.log('Copying documentation images to public/assets...');
copyImages(SRC_DIR);
console.log('Initial sync complete.');

if (watchMode) {
  console.log('Watching for changes...');
  fs.watch(SRC_DIR, { recursive: true }, (eventType, filename) => {
    if (filename) {
      const fullPath = path.join(SRC_DIR, filename);
      if (fs.existsSync(fullPath) && !fs.statSync(fullPath).isDirectory()) {
        handleFile(fullPath);
      }
    }
  });
}
