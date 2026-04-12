import fs from 'fs';
import path from 'path';

const SRC_DIR = process.cwd();
const DEST_DIR = path.join(process.cwd(), 'public', 'assets');

// Define dirs to ignore based on standard Next.js and dev setups
const IGNORE_DIRS = ['.git', '.next', 'node_modules', '.obsidian', 'app', 'components', 'lib', 'public', 'scripts'];
const IMAGE_EXTS = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'];

function copyImages(currentDir) {
  const files = fs.readdirSync(currentDir);
  for (const file of files) {
    if (file.startsWith('.') && file !== '.obsidian') continue; // Skip hidden dirs/files except obsidian if someone else needs it, wait, we ignore .obsidian anyway above. Let's just skip all hidden except root. Actually skipping hidden is fine.
    if (IGNORE_DIRS.includes(file)) continue;

    const fullPath = path.join(currentDir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      copyImages(fullPath);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (IMAGE_EXTS.includes(ext)) {
        // Compute relative path from the root
        const relativePath = path.relative(SRC_DIR, fullPath);
        const destPath = path.join(DEST_DIR, relativePath);

        // Ensure dest dir exists
        fs.mkdirSync(path.dirname(destPath), { recursive: true });
        
        // Copy file
        fs.copyFileSync(fullPath, destPath);
        console.log(`Copied ${relativePath} to public/assets`);
      }
    }
  }
}

console.log('Copying documentation images to public/assets...');
copyImages(SRC_DIR);
console.log('Done copying images.');
