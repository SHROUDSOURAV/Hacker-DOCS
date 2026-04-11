import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/AppShell";
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
        <AppShell nodes={nodes}>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
