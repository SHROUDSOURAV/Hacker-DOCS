import fs from 'fs';
import path from 'path';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css';
import { CodeBlock } from '@/components/CodeBlock';
import { Terminal } from 'lucide-react';
import remarkAngleBracketPlaceholders from '@/lib/remarkAngleBracketPlaceholders';

export default function Home() {
  const readmePath = path.join(process.cwd(), 'README.md');
  let content = '';
  try {
    content = fs.readFileSync(readmePath, 'utf8');
  } catch (e) {
    content = '';
  }

  return (
    <div className="w-full flex flex-col pt-8">
      {/* Hacker style header for the Home page */}
      <div className="mb-12 border border-border bg-[#0a0a0a] rounded-lg p-8 shadow-[0_0_30px_hsl(133_100%_45%_/_0.1)] relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-secondary rounded-md border border-primary/20 shadow-[0_0_15px_hsl(133_100%_45%_/_0.2)]">
            <Terminal className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground m-0 tracking-tight" style={{ fontFamily: 'var(--font-fira-code)' }}>System/Docs_Root</h1>
            <p className="text-primary font-mono text-sm mt-1">status: ONLINE & SECURE</p>
          </div>
        </div>
        <p className="text-muted-foreground text-sm max-w-2xl leading-relaxed">
          Welcome to the central documentation repository. Select a module from the sidebar to initialize learning protocols or view the standard readout below.
        </p>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        {content ? (
          <Markdown
            remarkPlugins={[remarkGfm, remarkAngleBracketPlaceholders]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              pre: ({ node, ...props }) => <CodeBlock {...props} />,
              code: ({ className, children, ...props }) => {
                const value = String(children ?? '').trim();
                const isPlaceholder = /^<[^<>\n]+>$/.test(value);
                return (
                  <code
                    {...props}
                    className={`${className ?? ''} ${isPlaceholder ? 'text-primary bg-primary/10 px-1.5 py-0.5 rounded border border-primary/30' : ''}`.trim()}
                  >
                    {children}
                  </code>
                );
              },
              table: ({ node, ...props }) => (
                <div className="w-full overflow-x-auto my-6 border border-border rounded-lg shadow-sm">
                  <table className="w-full min-w-full border-collapse text-sm text-left m-0" {...props} />
                </div>
              ),
              th: ({ node, ...props }) => <th className="border border-border bg-secondary text-primary px-3 py-2 font-mono" {...props} />,
              td: ({ node, ...props }) => <td className="border border-border px-3 py-2 text-foreground" {...props} />
            }}
          >
            {content}
          </Markdown>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center opacity-50 border border-dashed border-border rounded-lg">
            <Terminal className="w-12 h-12 mb-4 text-muted-foreground" />
            <h2 className="text-xl font-mono mb-2">NO_README_FOUND</h2>
            <p className="text-sm">Create a README.md in the root directory to populate this dashboard.</p>
          </div>
        )}
      </div>
    </div>
  );
}
