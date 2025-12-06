'use client';
import { useState, useMemo } from 'react';
import Header from './Header';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import OutputWindow from './OutputWindow';

export default function MainPage({ initialSnippets, config, urls }) {
  const [selectedSnippetIds, setSelectedSnippetIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter snippets
  const filteredSnippets = useMemo(() => {
    if (!searchQuery) return initialSnippets;
    const lowerQuery = searchQuery.toLowerCase();
    return initialSnippets.filter(s => 
      s.title.toLowerCase().includes(lowerQuery) || 
      s.content.toLowerCase().includes(lowerQuery)
    );
  }, [initialSnippets, searchQuery]);

  // Group by category
  const snippetsByCategory = useMemo(() => {
    const groups = {};
    filteredSnippets.forEach(s => {
      if (!groups[s.category]) groups[s.category] = [];
      groups[s.category].push(s);
    });
    return groups;
  }, [filteredSnippets]);

  // Selection handlers
  const toggleSnippet = (id) => {
    setSelectedSnippetIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const selectCategory = (category, isSelect) => {
    // Find all snippets in this category (visible ones)
    const snippetsInCat = snippetsByCategory[category] || [];
    const idsInCat = snippetsInCat.map(s => s.id);
    
    setSelectedSnippetIds(prev => {
      if (isSelect) {
        // Add all ids that aren't already selected
        const toAdd = idsInCat.filter(id => !prev.includes(id));
        return [...prev, ...toAdd];
      } else {
        // Remove all ids in this category
        return prev.filter(id => !idsInCat.includes(id));
      }
    });
  };

  const clearAll = () => setSelectedSnippetIds([]);

  // Get selected snippets objects for output
  // Use selectedSnippetIds order (insertion order)
  const selectedSnippets = selectedSnippetIds
    .map(id => initialSnippets.find(s => s.id === id))
    .filter(Boolean);

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-hidden">
      {/* Header - Full width */}
      <Header 
        title={config.site.title} 
        settingsUrl={urls.config}
        addUrl={urls.create}
      />
      
      {/* Main Content - 2 Columns on Desktop */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        
        {/* Left Column: Sidebar / Browser */}
        <div className="w-full md:w-2/5 lg:w-1/3 flex flex-col border-r border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 z-0 h-full">
          <SearchBar 
            onSearch={setSearchQuery} 
            placeholder={config.ui.searchPlaceholder}
          />
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
            <CategoryFilter 
              categories={snippetsByCategory}
              selectedSnippetIds={selectedSnippetIds}
              onToggleSnippet={toggleSnippet}
              onSelectCategory={selectCategory}
            />
          </div>
        </div>
        
        {/* Right Column: Output */}
        <div className="w-full md:w-3/5 lg:w-2/3 h-[40vh] md:h-auto border-t md:border-t-0 border-gray-200 dark:border-gray-700 shadow-2xl md:shadow-none z-10 bg-white dark:bg-gray-900">
          <OutputWindow 
            selectedSnippets={selectedSnippets}
            separator={config.rules.separator}
            includeTitle={config.rules.includeTitle}
            onClear={clearAll}
          />
        </div>
      </div>
    </div>
  );
}
