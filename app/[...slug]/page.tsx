import { getAllMarkdownSlugs, getMarkdownContent } from "@/lib/markdown";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = getAllMarkdownSlugs();
  return slugs.map((slug) => ({
    slug: slug.map(encodeURIComponent),
  }));
}

export default function MarkdownPage({ params }: { params: { slug: string[] } }) {
  // Decode the parameters that might be URL encoded
  const decodedSlug = params.slug.map(decodeURIComponent);
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
      >
        {content}
      </Markdown>
    </article>
  );
}
