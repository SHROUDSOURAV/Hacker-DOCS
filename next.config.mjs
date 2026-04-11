/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enables Next.js static HTML export for Markdown files if preferred,
  // but we can also rely on general Vercel deployment which handles serverless as well!
  // Since we want dynamic reading, output: 'export' restricts us from reading file paths at runtime if we don't have generateStaticParams.
  // We'll use standard server components which Vercel handles beautifully by tracing the `Hacker-DOCS` directory.
  
  // Note: Vercel traces dynamically required files, but we'll use `generateStaticParams` for optimal performance.
  output: "export",
};

export default nextConfig;
