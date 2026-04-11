import { getAllMarkdownSlugs, getMarkdownContent } from "@/lib/markdown";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css'; // Switch to a deeper hacker theme
import { CodeBlock } from '@/components/CodeBlock';

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
        remarkPlugins={[remarkGfm]} 
        rehypePlugins={[rehypeHighlight]}
        components={{
          pre: ({ node, ...props }) => <CodeBlock {...props} />,
          table: ({ node, ...props }) => (
            <div className="w-full overflow-x-auto my-6 border border-border rounded-lg shadow-sm">
              <table className="w-full text-sm text-left m-0" {...props} />
            </div>
          )
        }}
      >
        {content}
      </Markdown>
    </article>
  );
}
