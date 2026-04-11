import fs from 'fs';
import path from 'path';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

export default function Home() {
  const readmePath = path.join(process.cwd(), 'README.md');
  let content = '';
  try {
    content = fs.readFileSync(readmePath, 'utf8');
  } catch (e) {
    content = '# Welcome to Hacker Docs\n\nNo README.md found in the root directory. Start by adding a `.md` file or navigating from the sidebar.';
  }

  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
      >
        {content}
      </Markdown>
    </div>
  );
}
