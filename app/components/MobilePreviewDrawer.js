'use client';
import { useEffect } from 'react';
import { ClipboardList, X } from 'lucide-react';
import { cn } from '../lib/utils';
import OutputWindow from './OutputWindow';

/**
 * Mobile-only bottom-sheet drawer for the rules preview.
 *
 * On mobile the browser sidebar takes the full screen, so the selected-rules
 * output is surfaced on demand via a floating action button that opens this
 * slide-up drawer. Hidden entirely on md+ where the inline preview pane shows.
 */
export default function MobilePreviewDrawer({
  isOpen,
  onOpen,
  onClose,
  count,
  selectedSnippets,
  separator,
  includeTitle,
  tokenBudget,
  onClear,
}) {
  // Close on Escape while open
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  return (
    <div className="md:hidden">
      {/* Floating action button - hidden while the drawer is open */}
      <button
        type="button"
        onClick={onOpen}
        aria-label="Show selected rules"
        className={cn(
          'fixed bottom-5 right-5 z-30 flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-all active:scale-95',
          isOpen ? 'pointer-events-none opacity-0 translate-y-4' : 'opacity-100'
        )}
      >
        <ClipboardList className="h-5 w-5" />
        <span>Rules</span>
        {count > 0 && (
          <span className="ml-1 inline-flex min-w-5 items-center justify-center rounded-full bg-primary-foreground/20 px-1.5 text-xs font-bold">
            {count}
          </span>
        )}
      </button>

      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={cn(
          'fixed inset-0 z-30 bg-black/40 backdrop-blur-sm transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
      />

      {/* Bottom sheet */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Selected rules"
        className={cn(
          'fixed inset-x-0 bottom-0 z-40 flex h-[85vh] flex-col rounded-t-2xl border-t border-theme bg-theme-output shadow-2xl transition-transform duration-300 ease-out',
          isOpen ? 'translate-y-0' : 'translate-y-full'
        )}
      >
        {/* Grab handle + header */}
        <div className="flex items-center justify-between border-b border-theme-subtle px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-theme-foreground">
              Selected Rules
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close rules preview"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-theme-muted transition-colors hover:bg-theme-surface-elevated hover:text-theme-foreground active:scale-95"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-1.5 h-1 w-10 -translate-x-1/2 rounded-full bg-theme-surface-elevated"
        />

        {/* Reuse the existing output pane */}
        <div className="min-h-0 flex-1">
          <OutputWindow
            selectedSnippets={selectedSnippets}
            separator={separator}
            includeTitle={includeTitle}
            tokenBudget={tokenBudget}
            onClear={onClear}
          />
        </div>
      </div>
    </div>
  );
}
