'use client';
import { useMemo, useState } from 'react';
import { copyToClipboard, cn } from '../lib/utils';
import { buildOutput, estimateTokens, formatTokenCount } from '../lib/output';
import { Check, Copy, ClipboardList } from 'lucide-react';

export default function OutputWindow({
  selectedSnippets,
  separator = "\n",
  includeTitle = true,
  tokenBudget = 2000,
  onClear
}) {
  const [copied, setCopied] = useState(false);

  const output = useMemo(
    () => buildOutput(selectedSnippets, { separator, includeTitle }),
    [selectedSnippets, separator, includeTitle]
  );

  const tokens = useMemo(() => estimateTokens(output), [output]);
  const budget = tokenBudget > 0 ? tokenBudget : 0;
  const overBudget = budget > 0 && tokens > budget;
  const budgetUsed = budget > 0 ? Math.min(100, Math.round((tokens / budget) * 100)) : 0;

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
      <div className="h-14 border-b border-theme-subtle flex items-center gap-4 px-6 bg-theme-card">
        <div className="flex items-center gap-2">
            <div className={cn(
              "w-2 h-2 rounded-full",
              output ? "bg-green-500 animate-pulse" : "bg-theme-surface-elevated"
            )} />
            <span className="text-xs font-medium text-theme-muted uppercase tracking-wider">
                {selectedSnippets.length} Active Rules
            </span>
        </div>

        {/* Context budget meter - token count is an estimate, see lib/output.js */}
        <div
          className="flex items-center gap-2 min-w-0"
          data-testid="token-meter"
          title={`Estimated ${tokens} tokens of a ${budget} token budget`}
        >
          <div className="hidden sm:block w-20 h-1.5 rounded-full bg-theme-surface-elevated overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-300",
                overBudget ? "bg-amber-500" : "bg-primary"
              )}
              style={{ width: `${budgetUsed}%` }}
            />
          </div>
          <span
            className={cn(
              "text-xs font-medium uppercase tracking-wider whitespace-nowrap",
              overBudget ? "text-amber-600 dark:text-amber-400" : "text-theme-muted"
            )}
          >
            {formatTokenCount(tokens)} / {formatTokenCount(budget)} Tokens
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