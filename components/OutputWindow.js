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
    <div className="flex flex-col h-full border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800 shrink-0">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <span className="font-semibold">{selectedSnippets.length}</span> rules selected
        </div>
        <div className="flex gap-2">
          {selectedSnippets.length > 0 && (
            <button
              onClick={onClear}
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Clear All
            </button>
          )}
          <button
            onClick={handleCopy}
            disabled={!output}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm ${copied 
              ? 'bg-green-600 hover:bg-green-700 text-white' 
              : 'bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400'
            }`}
          >
            {copied ? 'Copied!' : 'Copy Rules'}
          </button>
        </div>
      </div>
      <div className="flex-1 p-0 overflow-hidden relative">
        {output ? (
          <textarea 
            readOnly
            value={output}
            className="w-full h-full resize-none p-4 font-mono text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 focus:outline-none"
            spellCheck={false}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 p-4 text-center">
            <svg className="w-16 h-16 mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            <p className="text-lg font-medium">No rules selected</p>
            <p className="text-sm mt-2 opacity-70">Select prompts from the list to combine them here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
