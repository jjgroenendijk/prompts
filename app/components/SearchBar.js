'use client';
import { useState, useEffect } from 'react';

export default function SearchBar({ onSearch, placeholder = "Search..." }) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query, onSearch]);

  return (
    <div className="p-6 bg-transparent">
      <div className={`relative transition-all duration-300 ease-in-out transform ${isFocused ? '-translate-y-1' : ''}`}>
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          {/* Search Icon */}
          <svg className={`h-5 w-5 transition-colors duration-200 ${isFocused ? 'text-primary' : 'text-gray-400'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
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
            {/* X Icon */}
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}