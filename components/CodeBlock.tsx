'use client';

import React, { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';

interface CodeBlockProps {
  children?: React.ReactNode;
  className?: string;
}

export function CodeBlock({ children, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  // Extract the raw string context from the children for the copy button
  // react-markdown passes the code elements as children inside the pre
  const rawCodes = React.Children.toArray(children).map((child) => {
    if (React.isValidElement(child) && child.props.children) {
      if (Array.isArray(child.props.children)) {
        return child.props.children.join('');
      } else {
        return String(child.props.children);
      }
    }
    return String(child);
  }).join('');

  // Sometimes rehype packages wrap content in extra elements.
  // The classname comes from the <code> element usually, but if it's on <pre>, it might be passed here.
  let language = 'bash';
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.props.className) {
      const match = /language-(\w+)/.exec(child.props.className || '');
      if (match) {
        language = match[1];
      }
    }
  });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rawCodes);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  return (
    <div className="relative my-6 rounded-lg overflow-hidden border border-border bg-[#0d0d0d] shadow-lg shadow-black/50 group">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#1a1a1a] border-b border-border">
        <div className="flex items-center gap-2">
          {/* macOS style fake buttons or techy square blocks */}
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-destructive/80"></div>
            <div className="w-3 h-3 rounded-sm bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-sm bg-primary/80"></div>
          </div>
          <span className="ml-2 text-xs font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-2">
            <Terminal className="w-3 h-3" />
            {language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors focus:outline-none"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-primary" />
              <span className="text-primary font-mono hidden sm:inline-block">COPIED</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span className="font-mono hidden sm:inline-block">COPY</span>
            </>
          )}
        </button>
      </div>
      
      {/* Code Content */}
      <div className="overflow-x-auto p-4 text-sm font-mono leading-relaxed" style={{ fontFamily: 'var(--font-fira-code)' }}>
        <pre className={className} style={{ margin: 0, padding: 0, backgroundColor: 'transparent' }}>
          {children}
        </pre>
      </div>
    </div>
  );
}
