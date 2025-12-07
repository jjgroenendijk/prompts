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
    <div className="p-6 bg-transparent">
      <div className={cn(
        "relative transition-all duration-300 ease-in-out transform",
        isFocused && "-translate-y-1"
      )}>
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className={cn(
            "h-5 w-5 transition-colors duration-200",
            isFocused ? "text-primary" : "text-gray-400"
          )} />
        </div>
        <input
          type="text"
          className="block w-full pl-12 pr-12 py-3 border-0 rounded-2xl leading-5 bg-theme-card text-theme-foreground placeholder-gray-400 shadow-md hover:shadow-lg focus:shadow-xl focus:ring-2 focus:ring-primary/50 focus:outline-none sm:text-base transition-all duration-300"
          placeholder={placeholder}
          value={query}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-primary cursor-pointer transition-colors duration-200"
            onClick={() => setQuery('')}
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}