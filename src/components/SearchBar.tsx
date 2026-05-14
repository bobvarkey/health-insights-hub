import { useState, useRef, useEffect, type ChangeEvent } from 'react';
import { Search, X } from 'lucide-react';
import { searchProcedures, getCategoryLabel, type SearchResult } from '../lib/search';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Handle search input
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim()) {
      const searchResults = searchProcedures(value);
      setResults(searchResults);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  };

  // Clear search
  const handleClear = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (searchRef.current && event.target && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle result selection
  const handleResultClick = (url: string) => {
    window.location.href = url;
  };

  return (
    <div ref={searchRef} className="relative w-full">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => query && setIsOpen(true)}
          placeholder="Search procedures, tools, and guides..."
          className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-all"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Dropdown Results */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-dropdown max-h-96 overflow-y-auto">
          {results.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {results.map((result) => (
                <li key={result.id}>
                  <button
                    onClick={() => handleResultClick(result.url)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex flex-col gap-1"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-medium text-sm text-gray-900">{result.title}</h3>
                      <span className="text-xs px-2 py-1 rounded bg-primary-100 text-primary-700 whitespace-nowrap">
                        {getCategoryLabel(result.category)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2">{result.description}</p>
                    <p className="text-xs text-gray-500">{result.type}</p>
                  </button>
                </li>
              ))}
            </ul>
          ) : query ? (
            <div className="px-4 py-8 text-center">
              <p className="text-sm text-gray-500">No results found for "{query}"</p>
              <p className="text-xs text-gray-400 mt-1">Try different keywords</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
