import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { getSidebarTree } from "@/lib/markdown";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-fira-code" });

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
    <html lang="en" className="dark selection:bg-primary/30 selection:text-primary-foreground text-base">
      <body className={`${inter.variable} ${firaCode.variable} font-sans min-h-screen flex`}>
        <Sidebar nodes={nodes} />
        <main className="flex-1 lg:ml-64 w-full h-screen overflow-hidden flex flex-col relative z-0">
          <div className="flex-1 overflow-y-auto px-4 py-8 md:px-8 lg:px-16 w-full">
            <div className="max-w-4xl mx-auto w-full relative">
              {children}
            </div>
          </div>
          {/* Subtle bottom glowing edge */}
          <div className="fixed bottom-0 left-0 right-0 h-1 shadow-[0_0_20px_#00ff41] bg-primary/20 pointer-events-none z-50"></div>
        </main>
      </body>
    </html>
  );
}
