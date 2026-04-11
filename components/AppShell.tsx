'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { FileNode } from '@/lib/markdown';
import { PanelLeftOpen } from 'lucide-react';

export function AppShell({ nodes, children }: { nodes: FileNode[], children: React.ReactNode }) {
  // Mobile sidebar is naturally closed, Desktop is naturally open
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true);

  return (
    <>
      <Sidebar 
        nodes={nodes} 
        isDesktopOpen={isDesktopSidebarOpen} 
        setDesktopOpen={setIsDesktopSidebarOpen} 
      />
      
      <main 
        className={`flex-1 w-full h-screen overflow-hidden flex flex-col relative z-0 transition-all duration-300 ease-in-out ${isDesktopSidebarOpen ? 'lg:ml-64' : 'ml-0'}`}
      >
        <div className="flex-1 overflow-y-auto px-4 py-8 md:px-8 lg:px-16 w-full">
          
          {/* Top floating "window tab" button to reopen when minimized on desktop */}
          {!isDesktopSidebarOpen && (
            <button 
              onClick={() => setIsDesktopSidebarOpen(true)}
              title="Expand Directory"
              className="fixed top-4 left-4 z-50 p-2 bg-[#0a0a0a] text-primary rounded-md border border-primary/30 shadow-[0_0_10px_hsl(133_100%_45%_/_0.2)] hover:bg-primary/10 transition-colors hidden lg:flex group"
            >
              <PanelLeftOpen className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          )}

          <div className="max-w-4xl mx-auto w-full relative">
            {children}
          </div>
        </div>
        {/* Subtle bottom glowing edge */}
        <div className="fixed bottom-0 left-0 right-0 h-1 shadow-[0_0_20px_#00ff41] bg-primary/20 pointer-events-none z-50"></div>
      </main>
    </>
  );
}
