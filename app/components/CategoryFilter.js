'use client';
import { useState, useMemo } from 'react';
import SnippetItem from './SnippetItem';
import { collectSnippetIds, countSnippets } from '../lib/tree';
import { cn, formatTitle } from '../lib/utils';
import { Check, ChevronDown, Search } from 'lucide-react';

/** One category node plus its descendants. Recurses for nested categories. */
function CategoryNode({ node, depth, selectedSet, onToggleSnippet, onSelectCategory }) {
  const [isExpanded, setIsExpanded] = useState(true);

  const ids = useMemo(() => collectSnippetIds(node), [node]);
  const total = ids.length;

  if (total === 0) return null;

  const selectedCount = ids.filter((id) => selectedSet.has(id)).length;
  const allSelected = selectedCount === total;
  const someSelected = selectedCount > 0 && !allSelected;

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-3 group">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'w-5 h-5 rounded-md border flex items-center justify-center cursor-pointer transition-colors',
              allSelected || someSelected
                ? 'bg-primary border-primary text-primary-foreground'
                : 'bg-transparent border-theme hover:border-primary'
            )}
            onClick={() => onSelectCategory(node, !allSelected)}
          >
            {allSelected && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
            {someSelected && <div className="w-2.5 h-0.5 bg-primary-foreground rounded-full" />}
          </div>

          <button
            onClick={() => setIsExpanded((prev) => !prev)}
            className={cn(
              'flex items-center gap-2 tracking-wider hover:text-primary transition-colors',
              depth === 0
                ? 'text-sm font-bold text-theme-foreground uppercase'
                : 'text-xs font-semibold text-theme-muted uppercase'
            )}
          >
            {formatTitle(node.name)}
            <span className="ml-1 px-2 py-0.5 text-[10px] font-bold bg-theme-surface-elevated text-theme-muted rounded-full group-hover:bg-primary/10 group-hover:text-primary transition-colors">
              {total}
            </span>
          </button>
        </div>

        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${node.name}`}
          className={cn(
            'p-1 rounded-full hover:bg-theme-surface-elevated text-muted-foreground transition-all duration-200',
            isExpanded ? 'rotate-0' : '-rotate-90'
          )}
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>

      <div
        className={cn(
          'grid transition-all duration-300 ease-in-out',
          isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        )}
      >
        <div className="overflow-hidden">
          <div className={cn('space-y-1', depth === 0 ? 'pl-2' : 'pl-4 border-l border-theme')}>
            {node.snippets.map((snippet) => (
              <SnippetItem
                key={snippet.id}
                snippet={snippet}
                isSelected={selectedSet.has(snippet.id)}
                onToggle={onToggleSnippet}
              />
            ))}

            {node.children.map((child) => (
              <div key={child.path} className="pt-2">
                <CategoryNode
                  node={child}
                  depth={depth + 1}
                  selectedSet={selectedSet}
                  onToggleSnippet={onToggleSnippet}
                  onSelectCategory={onSelectCategory}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CategoryFilter({
  categoryTree,
  selectedSnippetIds,
  onToggleSnippet,
  onSelectCategory,
}) {
  // Convert to Set for O(1) lookups during list rendering
  const selectedSet = useMemo(() => new Set(selectedSnippetIds), [selectedSnippetIds]);

  const visible = (categoryTree || []).filter((node) => countSnippets(node) > 0);

  return (
    <div className="space-y-6 p-6 pb-24">
      {visible.map((node) => (
        <CategoryNode
          key={node.path}
          node={node}
          depth={0}
          selectedSet={selectedSet}
          onToggleSnippet={onToggleSnippet}
          onSelectCategory={onSelectCategory}
        />
      ))}

      {visible.length === 0 && (
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
