import { cn } from '../lib/utils';
import { Check } from 'lucide-react';

export default function SnippetItem({ snippet, isSelected, onToggle }) {
  return (
          <div
            onClick={() => onToggle(snippet.id)}
            className={cn(
              "group relative p-4 rounded-xl mb-3 cursor-pointer transition-all duration-200 border active:scale-[0.98]",
              isSelected
                ? "border-primary/50 bg-primary/10 shadow-sm ring-1 ring-primary/20" // Increased opacity for highlight
                : "border-transparent bg-theme-card hover:bg-theme-surface-elevated shadow-sm hover:shadow-md hover:-translate-y-0.5"
            )}
          >
            <div className="flex items-start gap-3">
              <div className="pt-1.5">
                <div className={cn(
                  "w-5 h-5 rounded-md border flex items-center justify-center transition-colors",
                  isSelected
                    ? "bg-primary border-primary text-primary-foreground"
                    : "bg-transparent border-theme group-hover:border-primary/50"
                )}>
                  {isSelected && (
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                  )}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className={cn(
                    "text-sm font-bold truncate pr-2 transition-colors",
                    isSelected ? "text-primary" : "text-theme-foreground group-hover:text-primary"
                  )} title={snippet.title}>
                    {snippet.title}
                  </h3>
                  <a
                    href={snippet.editUrl}
                    onClick={(e) => e.stopPropagation()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-theme-muted hover:text-primary transition-colors opacity-0 group-hover:opacity-100"
                  >
                    Edit
                  </a>
                </div>
                <p className="text-xs leading-relaxed text-theme-muted line-clamp-4 break-words"> {/* Increased line clamp */}
                  {snippet.content}
                </p>
              </div>
            </div>
          </div>  );
}