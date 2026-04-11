import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { getSidebarTree } from "@/lib/markdown";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hacker DOCS",
  description: "Next.js Markdown Documentation site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nodes = getSidebarTree();

  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen flex`}>
        <Sidebar nodes={nodes} />
        <main className="flex-1 lg:ml-64 w-full h-screen overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto px-4 py-8 md:px-8 lg:px-12 w-full">
            <div className="max-w-4xl mx-auto w-full">
              {children}
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
