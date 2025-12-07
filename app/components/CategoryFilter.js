'use client';
import { useState } from 'react';
import SnippetItem from './SnippetItem';

export default function CategoryFilter({ 
  categories, 
  selectedSnippetIds, 
  onToggleSnippet,
  onSelectCategory
}) {
  const [expanded, setExpanded] = useState(
    Object.keys(categories).reduce((acc, cat) => ({...acc, [cat]: true}), {})
  );

  const toggleExpand = (cat) => {
    setExpanded(prev => ({...prev, [cat]: !prev[cat]}));
  };

  const sortedCategories = Object.entries(categories).sort((a, b) => a[0].localeCompare(b[0]));

  return (
    <div className="space-y-6 p-6 pb-24">
      {sortedCategories.map(([category, snippets]) => {
        if (snippets.length === 0) return null;
        
        const allSelected = snippets.length > 0 && snippets.every(s => selectedSnippetIds.includes(s.id));
        const someSelected = snippets.some(s => selectedSnippetIds.includes(s.id));
        const isExpanded = expanded[category];
        
        return (
          <div key={category} className="animate-fade-in">
            <div className="flex items-center justify-between mb-3 group">
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center cursor-pointer transition-colors ${
                    allSelected
                      ? 'bg-primary border-primary text-white'
                      : someSelected
                        ? 'bg-primary border-primary text-white'
                        : 'bg-transparent border-theme hover:border-primary'
                  }`}
                  onClick={() => onSelectCategory(category, !allSelected)}
                >
                   {allSelected && (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                   )}
                   {someSelected && !allSelected && (
                     <div className="w-2.5 h-0.5 bg-white rounded-full" />
                   )}
                </div>

                <button
                  onClick={() => toggleExpand(category)}
                  className="flex items-center gap-2 text-sm font-bold text-theme-foreground uppercase tracking-wider hover:text-primary transition-colors"
                >
                  {category}
                  <span className="ml-1 px-2 py-0.5 text-[10px] font-bold bg-theme-surface-elevated text-theme-muted rounded-full group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    {snippets.length}
                  </span>
                </button>
              </div>

              <button
                onClick={() => toggleExpand(category)}
                className={`p-1 rounded-full hover:bg-theme-surface-elevated text-gray-400 transition-all duration-200 ${isExpanded ? 'rotate-0' : '-rotate-90'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
            </div>
            
            <div className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
              <div className="overflow-hidden">
                <div className="pl-2 space-y-1">
                  {snippets.map(snippet => (
                    <SnippetItem
                      key={snippet.id}
                      snippet={snippet}
                      isSelected={selectedSnippetIds.includes(snippet.id)}
                      onToggle={onToggleSnippet}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
      
      {sortedCategories.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 mb-4 rounded-full bg-theme-surface-elevated flex items-center justify-center text-gray-400">
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <h3 className="text-lg font-medium text-theme-foreground">No matching snippets</h3>
          <p className="text-sm text-gray-500 mt-1">Try adjusting your search terms</p>
        </div>
      )}
    </div>
  );
}