'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Folder, FileTerminal, ChevronDown, ChevronRight, Shield, PanelLeftClose, PanelLeftOpen, Menu } from 'lucide-react';
import { useState } from 'react';
import type { MouseEvent } from 'react';
import type { FileNode } from '@/lib/markdown';

function TreeNode({ node, level = 0 }: { node: FileNode; level?: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isActive = pathname === node.path || pathname === encodeURI(node.path);

  if (node.type === 'directory') {
    return (
      <div className="w-full">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center min-w-full w-max py-2 px-3 text-sm rounded-none transition-all hover:bg-primary/5 text-muted-foreground hover:text-primary hover:translate-x-1 outline-none focus-visible:ring-1 focus-visible:ring-primary"
          style={{ paddingLeft: `${Math.max(0.75, level * 1)}rem` }}
        >
          {isOpen ? <ChevronDown className="w-3 h-3 mr-1.5 opacity-70" /> : <ChevronRight className="w-3 h-3 mr-1.5 opacity-70" />}
          <Folder className={`w-3.5 h-3.5 mr-2 transition-colors ${isOpen ? 'text-primary opacity-80' : 'opacity-50'}`} />
          <span className="whitespace-nowrap font-mono tracking-tight">{node.name}</span>
        </button>
        {isOpen && node.children && (
          <div className="flex flex-col relative before:absolute before:left-3 before:top-0 before:bottom-0 before:w-[1px] before:bg-border/50">
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
      href={node.path}
      className={`flex items-center min-w-full w-max py-1.5 px-3 text-sm rounded-none transition-all relative outline-none focus-visible:ring-1 focus-visible:ring-primary ${
        isActive
          ? 'bg-primary/10 text-primary font-medium shadow-[inset_2px_0_0_var(--tw-colors-primary)] before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary/5 before:to-transparent'
          : 'hover:bg-primary/5 text-muted-foreground hover:text-foreground hover:translate-x-1 hover:shadow-[inset_2px_0_0_var(--tw-colors-primary)]'
      }`}
      style={{ paddingLeft: `${Math.max(0.75, level * 1 + 1.25)}rem` }}
    >
      <FileTerminal className={`w-3.5 h-3.5 mr-2 ${isActive ? 'text-primary' : 'opacity-50'}`} />
      <span className="whitespace-nowrap font-mono tracking-tight">{node.name}</span>
    </Link>
  );
}

interface SidebarProps {
  nodes: FileNode[];
  isOpen: boolean;
  setOpen: (val: boolean) => void;
  width: number;
  onResizeStart: (event: MouseEvent<HTMLDivElement>) => void;
}

export function Sidebar({ nodes, isOpen, setOpen, width, onResizeStart }: SidebarProps) {
  return (
    <>
      <button
        onClick={() => setOpen(!isOpen)}
        title={isOpen ? 'Close Sidebar' : 'Open Sidebar'}
        className="fixed top-4 right-4 z-50 p-2 bg-[#0a0a0a] text-primary rounded-md border border-primary/30 shadow-[0_0_10px_hsl(133_100%_45%_/_0.2)] hover:bg-primary/10 transition-colors lg:hidden"
      >
        <Menu className="w-5 h-5" />
      </button>

      {!isOpen && (
        <button
          onClick={() => setOpen(true)}
          title="Expand Sidebar"
          className="fixed top-4 left-4 z-50 p-2 bg-[#0a0a0a] text-primary rounded-md border border-primary/30 shadow-[0_0_10px_hsl(133_100%_45%_/_0.2)] hover:bg-primary/10 transition-colors hidden lg:flex group"
        >
          <PanelLeftOpen className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-40
        bg-[#050505] border-r border-border
        transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
        ${isOpen ? 'translate-x-0 lg:translate-x-0 shadow-[0_0_30px_hsl(133_100%_45%_/_0.15)]' : '-translate-x-full lg:-translate-x-full'}
        flex flex-col h-screen overflow-hidden
      `}
      style={{ width: `${width}px` }}>
        <div className="p-5 border-b border-border bg-[#0a0a0a] relative overflow-hidden group flex justify-between items-center">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,255,100,0.03)_50%,transparent_75%,transparent_100%)] bg-[length:250px_250px] animate-[gradient_3s_linear_infinite] pointer-events-none"></div>
          <Link href="/" className="flex items-center gap-3 font-bold text-lg text-foreground relative z-10 transition-colors hover:text-primary">
            <div className="p-1.5 bg-primary/10 rounded border border-primary/30 text-primary group-hover:shadow-[0_0_10px_hsl(133_100%_45%_/_0.5)] transition-shadow">
              <Shield className="w-4 h-4" />
            </div>
            <span className="font-mono tracking-widest text-[15px]">HACKER_DOCS</span>
          </Link>
          
          {/* Sidebar toggle button on desktop */}
          {setOpen && (
            <>
              <button 
                onClick={() => setOpen(!isOpen)}
                className="relative z-10 p-1.5 border border-primary/20 hover:bg-primary/10 hover:border-primary/50 text-muted-foreground hover:text-primary rounded hidden lg:flex outline-none focus-visible:ring-1 focus-visible:ring-primary"
                title={isOpen ? 'Minimize Sidebar' : 'Expand Sidebar'}
              >
                {isOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setOpen(false)}
                className="relative z-10 p-1.5 border border-primary/20 hover:bg-primary/10 hover:border-primary/50 text-muted-foreground hover:text-primary rounded lg:hidden outline-none focus-visible:ring-1 focus-visible:ring-primary"
                title="Close Sidebar"
              >
                <PanelLeftClose className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
        
        <div className="flex-1 overflow-auto pt-2 pb-6 flex flex-col gap-[1px]">
          {/* Subtle terminal lines styling */}
          <div className="text-[10px] text-primary/40 font-mono px-4 py-2 uppercase tracking-widest pointer-events-none">
            Directory Listing
          </div>
          {nodes.map(node => (
            <TreeNode key={node.path} node={node} />
          ))}
        </div>

        {/* Footer info readout */}
        <div className="p-3 border-t border-border bg-[#0a0a0a] text-[10px] font-mono text-muted-foreground/60 flex justify-between items-center">
          <span>PORT: 3000</span>
          <span>SYSTEM ENABLED</span>
        </div>

        {/* Desktop resize handle */}
        <div
          className="hidden lg:block absolute top-0 right-0 h-full w-1.5 cursor-col-resize hover:bg-primary/20"
          onMouseDown={onResizeStart}
          aria-hidden="true"
        />
      </aside>
      
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-background/90 backdrop-blur-sm z-30 transition-opacity"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
