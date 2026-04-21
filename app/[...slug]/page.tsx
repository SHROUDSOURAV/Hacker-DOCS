import { getAllMarkdownSlugs, getMarkdownContent } from "@/lib/markdown";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css'; // Switch to a deeper hacker theme
import { CodeBlock } from '@/components/CodeBlock';
import path from 'path';
import remarkAngleBracketPlaceholders from '@/lib/remarkAngleBracketPlaceholders';

export function generateStaticParams() {
  const slugs = getAllMarkdownSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export default function MarkdownPage({ params }: { params: { slug: string[] } }) {
  const decodedSlug = params.slug.map((s) => decodeURIComponent(s));
  const content = getMarkdownContent(decodedSlug);

  if (!content) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <h1 className="text-3xl font-bold mb-4">404 - Document Not Found</h1>
        <p className="text-muted-foreground">The markdown file you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
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
          td: ({ node, ...props }) => <td className="border border-border px-3 py-2 text-foreground" {...props} />,
          img: ({ node, ...props }) => {
            let src = props.src || '';
            if (src && !src.startsWith('http') && !src.startsWith('/')) {
              const dirParts = decodedSlug.slice(0, -1);
              const resolvedPath = path.posix.join('/', ...dirParts, src);
              // Use the static assets folder populated by copy-assets.mjs
              src = `/assets${resolvedPath}`;
            } else if (src.startsWith('/')) {
              // For absolute paths, check if they start with /assets or /api/assets
              // If not, they are likely content-relative and should be under /assets
              if (!src.startsWith('/assets') && !src.startsWith('/api/assets')) {
                 src = `/assets${src}`;
              }
            }
            return (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img 
                {...props} 
                src={src} 
                alt={props.alt || 'Documentation Image'} 
                className="max-w-full h-auto rounded-md border border-border shadow-sm my-4" 
              />
            );
          }
        }}
      >
        {content}
      </Markdown>
    </article>
  );
}
