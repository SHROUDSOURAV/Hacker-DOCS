import fs from 'fs';
import path from 'path';

export interface FileNode {
  name: string;
  path: string;
  type: 'file' | 'directory';
  children?: FileNode[];
}

// Ignore typical non-content directories
const IGNORE_DIRS = ['.git', '.next', 'node_modules', '.obsidian', 'app', 'components', 'lib', 'public'];
const ROOT_DIR = process.cwd();

export function getSidebarTree(dir = ROOT_DIR, basePath = ''): FileNode[] {
  let nodes: FileNode[] = [];
  try {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      if (file.startsWith('.') || IGNORE_DIRS.includes(file)) continue;

      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        const children = getSidebarTree(fullPath, `${basePath}/${file}`);
        if (children.length > 0) {
          nodes.push({
            name: file,
            path: `${basePath}/${file}`,
            type: 'directory',
            children,
          });
        }
      } else if ((file.endsWith('.md') || file.endsWith('.mdx')) && file.toLowerCase() !== 'readme.md') {
        const slug = file.replace(/\.(md|mdx)$/, '');
        nodes.push({
          name: slug,
          path: `${basePath}/${slug}`,
          type: 'file',
        });
      }
    }
  } catch (err) {
    console.error('Error reading directory:', err);
  }
  return nodes;
}

export function getAllMarkdownSlugs(dir = ROOT_DIR, basePath = ''): string[][] {
  let slugs: string[][] = [];
  try {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      if (file.startsWith('.') || IGNORE_DIRS.includes(file)) continue;

      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        slugs = slugs.concat(getAllMarkdownSlugs(fullPath, `${basePath}/${file}`));
      } else if ((file.endsWith('.md') || file.endsWith('.mdx')) && file.toLowerCase() !== 'readme.md') {
        const slug = file.replace(/\.(md|mdx)$/, '');
        // Break down path into array of slugs
        const parts = `${basePath}/${slug}`.split('/').filter(Boolean);
        slugs.push(parts);
      }
    }
  } catch (err) {
    console.error('Error reading directory for slugs:', err);
  }
  return slugs;
}

export function getMarkdownContent(slugParts: string[]): string {
  const relPath = slugParts.join('/');
  const fullPathMd = path.join(ROOT_DIR, relPath + '.md');
  const fullPathMdx = path.join(ROOT_DIR, relPath + '.mdx');
  try {
    if (fs.existsSync(fullPathMd)) {
      return fs.readFileSync(fullPathMd, 'utf-8');
    } else if (fs.existsSync(fullPathMdx)) {
      return fs.readFileSync(fullPathMdx, 'utf-8');
    }
    return '';
  } catch (err) {
    return '';
  }
}
