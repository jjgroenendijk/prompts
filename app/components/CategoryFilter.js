'use client';
import { useState } from 'react';
import SnippetItem from './SnippetItem';
import { cn } from '../lib/utils';
import { Check, ChevronDown, Search } from 'lucide-react';

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
                  className={cn(
                    "w-5 h-5 rounded-md border flex items-center justify-center cursor-pointer transition-colors",
                    allSelected || someSelected
                      ? "bg-primary border-primary text-primary-foreground"
                      : "bg-transparent border-theme hover:border-primary"
                  )}
                  onClick={() => onSelectCategory(category, !allSelected)}
                >
                   {allSelected && (
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                   )}
                   {someSelected && !allSelected && (
                     <div className="w-2.5 h-0.5 bg-primary-foreground rounded-full" />
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
                className={cn(
                  "p-1 rounded-full hover:bg-theme-surface-elevated text-muted-foreground transition-all duration-200",
                  isExpanded ? "rotate-0" : "-rotate-90"
                )}
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>

            <div className={cn(
              "grid transition-all duration-300 ease-in-out",
              isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            )}>
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
          <div className="w-16 h-16 mb-4 rounded-full bg-theme-surface-elevated flex items-center justify-center text-muted-foreground">
             <Search className="w-8 h-8" strokeWidth={1.5} />
          </div>
          <h3 className="text-lg font-medium text-theme-foreground">No matching snippets</h3>
          <p className="text-sm text-muted-foreground mt-1">Try adjusting your search terms</p>
        </div>
      )}
    </div>
  );
}