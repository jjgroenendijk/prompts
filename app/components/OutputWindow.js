'use client';
import { useState } from 'react';
import { copyToClipboard } from '../lib/utils';

export default function OutputWindow({
  selectedSnippets,
  separator = "\n\n---\n\n",
  includeTitle = true,
  onClear
}) {
  const [copied, setCopied] = useState(false);

  // Generate output
  const output = selectedSnippets.map(s => {
    let text = s.content.trim();
    if (includeTitle) {
      text = `## ${s.title}\n\n${text}`;
    }
    return text;
  }).join(separator);

  const handleCopy = async () => {
    if (!output) return;
    const success = await copyToClipboard(output);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col h-full bg-theme-card relative group">
      {/* Action Bar - Floating on top right */}
      <div className="absolute top-4 right-4 z-10 flex gap-2 transition-opacity opacity-100">
        {selectedSnippets.length > 0 && (
          <button
            onClick={onClear}
            className="px-3 py-1.5 rounded-lg bg-theme-surface backdrop-blur text-xs font-medium text-theme-foreground border border-theme hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all shadow-sm"
          >
            Clear
          </button>
        )}
        <button
          onClick={handleCopy}
          disabled={!output}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold shadow-lg backdrop-blur transition-all transform active:scale-95 ${copied
            ? 'bg-green-500/90 text-white ring-2 ring-green-400/50'
            : 'bg-primary/90 hover:bg-primary text-white hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none'
          }`}
        >
          {copied ? (
             <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              Copied
             </>
          ) : (
             <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
              Copy Rules
             </>
          )}
        </button>
      </div>

      {/* Header / Meta */}
      <div className="h-14 border-b border-theme-subtle flex items-center px-6 bg-theme-card">
        <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${output ? 'bg-green-500 animate-pulse' : 'bg-theme-surface-elevated'}`} />
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
              <svg className="w-10 h-10 text-theme-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
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