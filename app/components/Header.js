'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon, Plus, Settings } from 'lucide-react';

export default function Header({ title, settingsUrl, addUrl }) {
  const { resolvedTheme, setTheme } = useTheme();

  const handleToggleTheme = () => {
    const nextTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border/40 bg-background/80 backdrop-blur-lg sticky top-0 z-20 transition-all duration-200">
      <h1 className="text-2xl font-extrabold text-foreground tracking-tight truncate">
        {title}
      </h1>
      <div className="flex gap-3 shrink-0 items-center">
        <button
          onClick={handleToggleTheme}
          className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary/10 rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
          title="Toggle Theme"
        >
          {resolvedTheme === 'dark' ? (
            <Sun className="w-6 h-6" />
          ) : (
            <Moon className="w-6 h-6" />
          )}
        </button>
        <a
          href={addUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary/10 rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
          title="Add New Snippet"
        >
          <Plus className="w-6 h-6" />
        </a>
        <a
          href={settingsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-muted-foreground hover:text-foreground hover:bg-primary/10 rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
          title="Settings"
        >
          <Settings className="w-6 h-6" />
        </a>
      </div>
    </header>
  );
}
