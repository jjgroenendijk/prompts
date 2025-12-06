'use client';
import { useState } from 'react';
import SnippetItem from './SnippetItem';

export default function CategoryFilter({ 
  categories, // Object: { [categoryName]: snippets[] }
  selectedSnippetIds, // Array of IDs
  onToggleSnippet,
  onSelectCategory
}) {
  // Initialize all categories as expanded by default
  const [expanded, setExpanded] = useState(
    Object.keys(categories).reduce((acc, cat) => ({...acc, [cat]: true}), {})
  );

  const toggleExpand = (cat) => {
    setExpanded(prev => ({...prev, [cat]: !prev[cat]}));
  };

  // Sort categories alphabetically
  const sortedCategories = Object.entries(categories).sort((a, b) => a[0].localeCompare(b[0]));

  return (
    <div className="space-y-4 p-4 pb-20">
      {sortedCategories.map(([category, snippets]) => {
        if (snippets.length === 0) return null;
        
        // Check selection state
        const allSelected = snippets.length > 0 && snippets.every(s => selectedSnippetIds.includes(s.id));
        const someSelected = snippets.some(s => selectedSnippetIds.includes(s.id));
        
        return (
          <div key={category} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
            <div className="bg-gray-100 dark:bg-gray-800 p-3 flex items-center justify-between select-none sticky top-0 z-0">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={input => {
                    if (input) {
                      input.indeterminate = someSelected && !allSelected;
                    }
                  }}
                  onChange={() => onSelectCategory(category, !allSelected)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 dark:bg-gray-700 cursor-pointer"
                />
                <button 
                  onClick={() => toggleExpand(category)}
                  className="flex items-center gap-2 text-sm font-bold text-gray-800 dark:text-gray-100 capitalize focus:outline-none hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {category}
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 px-2 py-0.5 bg-white dark:bg-gray-700 rounded-full border border-gray-200 dark:border-gray-600">
                    {snippets.length}
                  </span>
                </button>
              </div>
              <button 
                onClick={() => toggleExpand(category)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {expanded[category] ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                )}
              </button>
            </div>
            
            {expanded[category] && (
              <div className="p-2 bg-white dark:bg-gray-900 space-y-2">
                {snippets.map(snippet => (
                  <SnippetItem
                    key={snippet.id}
                    snippet={snippet}
                    isSelected={selectedSnippetIds.includes(snippet.id)}
                    onToggle={onToggleSnippet}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
      
      {sortedCategories.length === 0 && (
        <div className="text-center py-10 text-gray-500 dark:text-gray-400">
          No snippets found.
        </div>
      )}
    </div>
  );
}
