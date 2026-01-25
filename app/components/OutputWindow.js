'use client';
import { useState } from 'react';
import { copyToClipboard, cn, formatTitle } from '../lib/utils';
import { Check, Copy, ClipboardList } from 'lucide-react';

export default function OutputWindow({
  selectedSnippets,
  separator = "\n",
  includeTitle = true,
  onClear
}) {
  const [copied, setCopied] = useState(false);

  // Group snippets by category
  const snippetsByCategory = {};
  selectedSnippets.forEach(s => {
    if (!snippetsByCategory[s.category]) {
      snippetsByCategory[s.category] = [];
    }
    snippetsByCategory[s.category].push(s);
  });

  // Generate output grouped by category
  const categoryOutputs = Object.entries(snippetsByCategory).map(([category, snippets]) => {
    // Format category name for display
    const categoryTitle = formatTitle(category);

    // Join snippets within the category with single newline
    const snippetContents = snippets.map(s => s.content.trim()).join(separator);

    // Add category header if includeTitle is true
    if (includeTitle) {
      return `## ${categoryTitle}\n\n${snippetContents}`;
    }
    return snippetContents;
  });

  // Join categories with double newline
  const output = categoryOutputs.join('\n\n');

  const handleCopy = async () => {
    if (!output) return;
    const success = await copyToClipboard(output);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col h-full bg-theme-output relative group">
      {/* Action Bar - Floating on top right */}
      <div className="absolute top-4 right-4 z-10 flex gap-2 transition-opacity opacity-100">
        {selectedSnippets.length > 0 && (
          <button
            onClick={onClear}
            className="px-3 py-1.5 rounded-lg bg-theme-surface backdrop-blur text-xs font-medium text-theme-foreground border border-theme hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all shadow-sm active:scale-95"
          >
            Clear
          </button>
        )}
        <button
          onClick={handleCopy}
          disabled={!output}
          className={cn(
            "flex items-center justify-center whitespace-nowrap gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all shadow-sm active:scale-95 backdrop-blur border",
            copied
              ? "bg-green-500/90 text-primary-foreground border-green-500/50 ring-2 ring-green-400/50"
              : "bg-theme-surface text-theme-foreground border-theme hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-theme-surface disabled:hover:text-theme-foreground disabled:hover:border-theme"
          )}
        >
          {copied ? (
             <>
              <Check className="w-3.5 h-3.5" />
              Copied
             </>
          ) : (
             <>
              <Copy className="w-3.5 h-3.5" />
              Copy Rules
             </>
          )}
        </button>
      </div>

      {/* Header / Meta */}
      <div className="h-14 border-b border-theme-subtle flex items-center px-6 bg-theme-card">
        <div className="flex items-center gap-2">
            <div className={cn(
              "w-2 h-2 rounded-full",
              output ? "bg-green-500 animate-pulse" : "bg-theme-surface-elevated"
            )} />
            <span className="text-xs font-medium text-theme-muted uppercase tracking-wider">
                {selectedSnippets.length} Active Rules
            </span>
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 relative bg-theme-background">
        {output ? (
          <textarea
            readOnly
            value={output}
            className="w-full h-full resize-none p-6 font-mono text-sm leading-relaxed text-theme-foreground bg-transparent focus:outline-none"
            spellCheck={false}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-24 h-24 mb-6 rounded-2xl bg-theme-surface-elevated flex items-center justify-center transform rotate-12 transition-transform hover:rotate-0 duration-500">
              <ClipboardList className="w-10 h-10 text-theme-muted" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-semibold text-theme-foreground mb-2">Ready to Compose</h3>
            <p className="text-theme-muted max-w-xs mx-auto">
              Select snippets from the sidebar to build your context window.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}