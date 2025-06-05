
import React, { useState, useEffect, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Search, Clock, TrendingUp, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Fuse from 'fuse.js';
import { Raffle } from '@/data/raffles';
import useLocalStorageState from 'use-local-storage-state';

interface EnhancedSearchProps {
  raffles: Raffle[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onRaffleSelect?: (raffle: Raffle) => void;
}

const EnhancedSearch: React.FC<EnhancedSearchProps> = ({
  raffles,
  searchQuery,
  onSearchChange,
  onRaffleSelect
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchHistory, setSearchHistory] = useLocalStorageState<string[]>('search-history', {
    defaultValue: []
  });
  const [recentlyViewed, setRecentlyViewed] = useLocalStorageState<string[]>('recently-viewed', {
    defaultValue: []
  });

  // Fuse.js configuration for fuzzy search
  const fuse = useMemo(() => new Fuse(raffles, {
    keys: [
      { name: 'title', weight: 0.4 },
      { name: 'description', weight: 0.2 },
      { name: 'organization', weight: 0.2 },
      { name: 'category', weight: 0.2 }
    ],
    threshold: 0.3,
    includeMatches: true,
    includeScore: true
  }), [raffles]);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return fuse.search(searchQuery).slice(0, 5);
  }, [fuse, searchQuery]);

  const trendingSearches = ['High Prize', 'Ending Soon', 'Gadgets', 'Cars', 'Cash'];
  
  const filterPresets = [
    { name: 'Best Deals', icon: Star, filters: { sortBy: 'win-high-to-low' } },
    { name: 'Ending Today', icon: Clock, filters: { endingSoon: true } },
    { name: 'High Value', icon: TrendingUp, filters: { sortBy: 'prize-high-to-low' } }
  ];

  const handleSearch = (query: string) => {
    onSearchChange(query);
    if (query.trim() && !searchHistory.includes(query.trim())) {
      setSearchHistory(prev => [query.trim(), ...prev.slice(0, 9)]);
    }
  };

  const handleResultClick = (raffle: Raffle) => {
    if (!recentlyViewed.includes(raffle.id)) {
      setRecentlyViewed(prev => [raffle.id, ...prev.slice(0, 9)]);
    }
    if (onRaffleSelect) {
      onRaffleSelect(raffle);
    }
    setIsSearchFocused(false);
  };

  const highlightMatch = (text: string, matches: any[]) => {
    if (!matches || matches.length === 0) return text;
    
    let highlightedText = text;
    matches.forEach(match => {
      const start = match.indices[0][0];
      const end = match.indices[0][1] + 1;
      const beforeMatch = text.slice(0, start);
      const matchText = text.slice(start, end);
      const afterMatch = text.slice(end);
      highlightedText = `${beforeMatch}<mark class="bg-yellow-200 px-1 rounded">${matchText}</mark>${afterMatch}`;
    });
    
    return highlightedText;
  };

  return (
    <div className="relative w-full">
      <div className="relative group">
        <Input
          type="text"
          placeholder="🔍 Search raffles, categories, or organizers..."
          className="pl-10 pr-4 py-3 rounded-full border-2 border-purple-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 w-full text-base shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02] bg-white"
          value={searchQuery}
          onChange={e => handleSearch(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
        />
        <Search className="absolute left-3 top-3 h-5 w-5 text-purple-400 animate-pulse" />
      </div>

      {/* Search Dropdown */}
      {isSearchFocused && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-purple-100 rounded-2xl shadow-xl z-50 max-h-96 overflow-y-auto">
          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-600 mb-3">Search Results</h3>
              {searchResults.map(result => (
                <div
                  key={result.item.id}
                  onClick={() => handleResultClick(result.item)}
                  className="flex items-center p-3 hover:bg-purple-50 rounded-lg cursor-pointer transition-all duration-200"
                >
                  <img
                    src={result.item.imageUrl}
                    alt={result.item.title}
                    className="w-12 h-12 object-cover rounded-lg mr-3"
                  />
                  <div className="flex-1">
                    <h4 
                      className="font-medium text-gray-800"
                      dangerouslySetInnerHTML={{
                        __html: highlightMatch(result.item.title, result.matches?.filter(m => m.key === 'title'))
                      }}
                    />
                    <p className="text-sm text-gray-600">{result.item.organization}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">{result.item.category}</Badge>
                      <span className="text-xs text-gray-500">₱{result.item.prize.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Filter Presets */}
          {searchQuery.length === 0 && (
            <div className="p-4 border-t border-gray-100">
              <h3 className="text-sm font-semibold text-gray-600 mb-3">Quick Filters</h3>
              <div className="grid grid-cols-3 gap-2">
                {filterPresets.map(preset => (
                  <button
                    key={preset.name}
                    onClick={() => handleSearch(preset.name)}
                    className="flex items-center gap-2 p-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg hover:from-purple-100 hover:to-pink-100 transition-all duration-200"
                  >
                    <preset.icon className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-medium text-gray-700">{preset.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search History */}
          {searchQuery.length === 0 && searchHistory.length > 0 && (
            <div className="p-4 border-t border-gray-100">
              <h3 className="text-sm font-semibold text-gray-600 mb-3">Recent Searches</h3>
              <div className="flex flex-wrap gap-2">
                {searchHistory.slice(0, 5).map((query, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(query)}
                    className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors duration-200"
                  >
                    <Clock className="h-3 w-3 text-gray-500" />
                    <span className="text-sm text-gray-700">{query}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Trending Searches */}
          {searchQuery.length === 0 && (
            <div className="p-4 border-t border-gray-100">
              <h3 className="text-sm font-semibold text-gray-600 mb-3">Trending Searches</h3>
              <div className="flex flex-wrap gap-2">
                {trendingSearches.map(trend => (
                  <button
                    key={trend}
                    onClick={() => handleSearch(trend)}
                    className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full hover:from-yellow-200 hover:to-orange-200 transition-all duration-200"
                  >
                    <TrendingUp className="h-3 w-3 text-orange-600" />
                    <span className="text-sm text-orange-700">{trend}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EnhancedSearch;
