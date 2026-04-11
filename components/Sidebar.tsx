'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Folder, FileText, ChevronDown, ChevronRight, Menu } from 'lucide-react';
import { useState } from 'react';
import type { FileNode } from '@/lib/markdown';

function TreeNode({ node, level = 0 }: { node: FileNode; level?: number }) {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  const isActive = pathname === `/${node.path}` || pathname === encodeURI(`/${node.path}`);

  if (node.type === 'directory') {
    return (
      <div className="w-full">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center w-full py-1.5 px-3 text-sm rounded-md transition-colors hover:bg-secondary/50 text-muted-foreground hover:text-foreground`}
          style={{ paddingLeft: `${Math.max(0.75, level * 1)}rem` }}
        >
          {isOpen ? <ChevronDown className="w-4 h-4 mr-1 opacity-50" /> : <ChevronRight className="w-4 h-4 mr-1 opacity-50" />}
          <Folder className="w-4 h-4 mr-2 opacity-70" />
          <span className="truncate">{node.name}</span>
        </button>
        {isOpen && node.children && (
          <div className="mt-1 flex flex-col gap-0.5">
            {node.children.map((child) => (
              <TreeNode key={child.path} node={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={`/${node.path}`}
      className={`flex items-center w-full py-1.5 px-3 text-sm rounded-md transition-colors ${
        isActive
          ? 'bg-secondary text-foreground font-medium'
          : 'hover:bg-secondary/50 text-muted-foreground hover:text-foreground'
      }`}
      style={{ paddingLeft: `${Math.max(0.75, level * 1 + 1.25)}rem` }}
    >
      <FileText className="w-4 h-4 mr-2 opacity-70" />
      <span className="truncate">{node.name}</span>
    </Link>
  );
}

export function Sidebar({ nodes }: { nodes: FileNode[] }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <button 
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-secondary text-foreground rounded-md border border-border"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <Menu className="w-5 h-5" />
      </button>

      <aside className={`
        fixed inset-y-0 left-0 z-40
        w-64 bg-background border-r border-border
        transform transition-transform duration-200 ease-in-out lg:translate-x-0
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        flex flex-col h-screen
      `}>
        <div className="p-4 border-b border-border">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-foreground">
            <span className="bg-foreground text-background px-2 py-1 rounded-md text-xs">DOCS</span>
            Hacker Docs
          </Link>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-1">
          {nodes.map(node => (
            <TreeNode key={node.path} node={node} />
          ))}
        </div>
      </aside>
      
      {/* Mobile overlay */}
      {mobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-30"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
