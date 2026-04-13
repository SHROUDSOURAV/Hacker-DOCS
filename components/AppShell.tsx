'use client';

import { useEffect, useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { FileNode } from '@/lib/markdown';

export function AppShell({ nodes, children }: { nodes: FileNode[], children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(256);
  const [isResizing, setIsResizing] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const updateViewport = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  useEffect(() => {
    if (!isResizing) {
      return;
    }

    const MIN_WIDTH = 220;
    const MAX_WIDTH = 520;

    const handleMouseMove = (event: MouseEvent) => {
      const nextWidth = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, event.clientX));
      setSidebarWidth(nextWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  return (
    <>
      <Sidebar 
        nodes={nodes} 
        isOpen={isSidebarOpen}
        setOpen={setIsSidebarOpen}
        width={sidebarWidth}
        onResizeStart={(event) => {
          event.preventDefault();
          setIsResizing(true);
        }}
      />
      
      <main 
        className="flex-1 w-full h-screen overflow-hidden flex flex-col relative z-0 transition-all duration-300 ease-in-out"
        style={{ marginLeft: isSidebarOpen && isDesktop ? `${sidebarWidth}px` : '0px' }}
      >
        <div className="flex-1 overflow-y-auto px-4 py-8 md:px-8 lg:px-16 w-full">
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
