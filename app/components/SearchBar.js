'use client';
import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { cn } from '../lib/utils';
import { Search, X } from 'lucide-react';

export default function SearchBar({ onSearch, placeholder = "Search..." }) {
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 300);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  return (
    <div className="p-4 bg-transparent">
      <div className={cn(
        "relative transition-all duration-300 ease-in-out transform",
        isFocused && "-translate-y-1"
      )}>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className={cn(
            "h-4 w-4 transition-colors duration-200",
            isFocused ? "text-primary" : "text-muted-foreground"
          )} />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-10 py-2.5 border border-glass-border rounded-xl leading-5 bg-glass-surface backdrop-blur-md text-theme-foreground placeholder:text-muted-foreground shadow-sm hover:shadow-md focus:shadow-lg focus:ring-2 focus:ring-primary/30 focus:outline-none sm:text-sm transition-all duration-300"
          placeholder={placeholder}
          value={query}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-primary cursor-pointer transition-all duration-200 active:scale-90"
            onClick={() => setQuery('')}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}