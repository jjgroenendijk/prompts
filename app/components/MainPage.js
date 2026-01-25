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
    <div className="flex flex-col h-screen overflow-hidden font-sans selection:bg-primary/30 selection:text-white">
      {/* Header - Full width */}
      <Header
        title={config.site.title}
        settingsUrl={urls.config}
        addUrl={urls.create}
        repoUrl={`https://github.com/${config.github.owner}/${config.github.repo}`}
      />

      {/* Main Content - 2 Columns on Desktop */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative max-w-[1920px] mx-auto w-full p-4 gap-4">

        {/* Left Column: Sidebar / Browser */}
        <div className="glass-panel w-full md:w-2/5 lg:w-1/3 xl:w-1/4 flex flex-col rounded-2xl overflow-hidden z-10 transition-all duration-300">
          <SearchBar
            onSearch={setSearchQuery}
            placeholder={config.ui.searchPlaceholder}
          />
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <CategoryFilter
              categories={snippetsByCategory}
              selectedSnippetIds={selectedSnippetIds}
              onToggleSnippet={toggleSnippet}
              onSelectCategory={selectCategory}
            />
          </div>
        </div>

        {/* Right Column: Output */}
        <div className="glass-panel w-full md:w-3/5 lg:w-2/3 xl:w-3/4 flex flex-col rounded-2xl overflow-hidden z-20 relative transition-all duration-300">
          <OutputWindow
            selectedSnippets={selectedSnippets}
            separator={config.rules.separator}
            includeTitle={config.rules.includeTitle}
            onClear={clearAll}
          />
        </div>
      </div>

      {/* Decorative Orbs - Fixed Position */}
      <div className="fixed top-20 left-10 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="fixed bottom-10 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none z-0" />
    </div>
  );
}