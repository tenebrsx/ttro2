import { useState } from 'react';

// Hook for smart search functionality
export const useSmartSearch = () => {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [favoriteSearches, setFavoriteSearches] = useState<string[]>([]);

  const addToHistory = (query: string) => {
    setSearchHistory(prev => {
      const updated = [query, ...prev.filter(q => q !== query)];
      return updated.slice(0, 10);
    });
  };

  const addToFavorites = (query: string) => {
    setFavoriteSearches(prev => {
      if (prev.includes(query)) return prev;
      return [...prev, query];
    });
  };

  const removeFromFavorites = (query: string) => {
    setFavoriteSearches(prev => prev.filter(q => q !== query));
  };

  const clearHistory = () => {
    setSearchHistory([]);
  };

  return {
    searchHistory,
    favoriteSearches,
    addToHistory,
    addToFavorites,
    removeFromFavorites,
    clearHistory
  };
};
