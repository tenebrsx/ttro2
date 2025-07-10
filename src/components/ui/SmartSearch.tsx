import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { Search, X, Filter, Clock, TrendingUp, Star, Tag } from "lucide-react";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: "dessert" | "ingredient" | "flavor" | "occasion" | "dietary";
  image?: string;
  price?: number;
  rating?: number;
  tags: string[];
  popularity: number;
  isAvailable: boolean;
  preparationTime?: number;
}

interface SearchSuggestion {
  id: string;
  text: string;
  type: "recent" | "popular" | "trending" | "category";
  count?: number;
  icon?: React.ReactNode;
}

interface SmartSearchProps {
  placeholder?: string;
  onSearch?: (query: string, filters: SearchFilters) => void;
  onResultSelect?: (result: SearchResult) => void;
  showFilters?: boolean;
  showSuggestions?: boolean;
  maxResults?: number;
  categories?: string[];
  dietaryOptions?: string[];
}

interface SearchFilters {
  category: string;
  dietary: string[];
  occasion: string;
  priceRange: [number, number];
  rating: number;
  availableOnly: boolean;
  sortBy: "relevance" | "price" | "rating" | "popularity" | "preparation-time";
}

const defaultFilters: SearchFilters = {
  category: "",
  dietary: [],
  occasion: "",
  priceRange: [0, 100],
  rating: 0,
  availableOnly: false,
  sortBy: "relevance",
};

export const SmartSearch: React.FC<SmartSearchProps> = ({
  placeholder = "Buscar postres, sabores, ingredientes...",
  onSearch,
  onResultSelect,
  showFilters = true,
  showSuggestions = true,
  maxResults = 10,
  categories = [
    "Tartas",
    "Macarons",
    "Cupcakes",
    "Pasteles",
    "Galletas",
    "Sorbetes",
  ],
  dietaryOptions = [
    "Vegano",
    "Sin Gluten",
    "Sin Azúcar",
    "Sin Lácteos",
    "Keto",
  ],
}) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Mock data for demonstration
  const mockResults: SearchResult[] = useMemo(
    () => [
      {
        id: "1",
        title: "Tarta de Chocolate Premium",
        description: "Deliciosa tarta de chocolate con ganache y frutos rojos",
        category: "dessert",
        image: "/api/placeholder/60/60",
        price: 45.0,
        rating: 4.8,
        tags: ["Chocolate", "Premium", "Frutos Rojos"],
        popularity: 95,
        isAvailable: true,
        preparationTime: 60,
      },
      {
        id: "2",
        title: "Macarons de Vainilla",
        description: "Exquisitos macarons franceses con crema de vainilla",
        category: "dessert",
        image: "/api/placeholder/60/60",
        price: 24.0,
        rating: 4.9,
        tags: ["Macarons", "Vainilla", "Francés"],
        popularity: 88,
        isAvailable: true,
        preparationTime: 45,
      },
      {
        id: "3",
        title: "Cupcakes Veganos",
        description:
          "Cupcakes libres de productos animales con frosting de coco",
        category: "dessert",
        image: "/api/placeholder/60/60",
        price: 18.0,
        rating: 4.6,
        tags: ["Cupcakes", "Vegano", "Coco"],
        popularity: 82,
        isAvailable: true,
        preparationTime: 30,
      },
    ],
    [],
  );

  const mockSuggestions: SearchSuggestion[] = useMemo(
    () => [
      {
        id: "1",
        text: "chocolate",
        type: "popular",
        count: 23,
        icon: <TrendingUp className="w-4 h-4" />,
      },
      {
        id: "2",
        text: "macarons",
        type: "trending",
        count: 18,
        icon: <TrendingUp className="w-4 h-4" />,
      },
      {
        id: "3",
        text: "vegano",
        type: "category",
        count: 12,
        icon: <Tag className="w-4 h-4" />,
      },
      {
        id: "4",
        text: "cumpleaños",
        type: "category",
        count: 35,
        icon: <Tag className="w-4 h-4" />,
      },
      {
        id: "5",
        text: "sin gluten",
        type: "category",
        count: 15,
        icon: <Tag className="w-4 h-4" />,
      },
    ],
    [],
  );

  // Handle search
  useEffect(() => {
    if (query.length > 0) {
      setLoading(true);

      // Simulate API call
      setTimeout(() => {
        const filtered = mockResults.filter(
          (result) =>
            result.title.toLowerCase().includes(query.toLowerCase()) ||
            result.description.toLowerCase().includes(query.toLowerCase()) ||
            result.tags.some((tag) =>
              tag.toLowerCase().includes(query.toLowerCase()),
            ),
        );

        // Apply filters
        let filteredResults = filtered;

        if (filters.category) {
          filteredResults = filteredResults.filter(
            (result) => result.category === filters.category.toLowerCase(),
          );
        }

        if (filters.dietary.length > 0) {
          filteredResults = filteredResults.filter((result) =>
            filters.dietary.some((dietary) =>
              result.tags.some((tag) =>
                tag.toLowerCase().includes(dietary.toLowerCase()),
              ),
            ),
          );
        }

        if (filters.availableOnly) {
          filteredResults = filteredResults.filter(
            (result) => result.isAvailable,
          );
        }

        if (filters.rating > 0) {
          filteredResults = filteredResults.filter(
            (result) => result.rating && result.rating >= filters.rating,
          );
        }

        if (filters.priceRange[0] > 0 || filters.priceRange[1] < 100) {
          filteredResults = filteredResults.filter(
            (result) =>
              result.price &&
              result.price >= filters.priceRange[0] &&
              result.price <= filters.priceRange[1],
          );
        }

        // Sort results
        filteredResults.sort((a, b) => {
          switch (filters.sortBy) {
            case "price":
              return (a.price || 0) - (b.price || 0);
            case "rating":
              return (b.rating || 0) - (a.rating || 0);
            case "popularity":
              return b.popularity - a.popularity;
            case "preparation-time":
              return (a.preparationTime || 0) - (b.preparationTime || 0);
            default:
              return b.popularity - a.popularity;
          }
        });

        setResults(filteredResults.slice(0, maxResults));
        setLoading(false);
      }, 300);
    } else {
      setResults([]);
    }
  }, [query, filters, maxResults, mockResults]);

  // Handle suggestions
  useEffect(() => {
    if (query.length === 0 && showSuggestions) {
      const recentSuggestions = recentSearches
        .slice(0, 3)
        .map((search, index) => ({
          id: `recent-${index}`,
          text: search,
          type: "recent" as const,
          icon: <Clock className="w-4 h-4" />,
        }));

      setSuggestions([...recentSuggestions, ...mockSuggestions.slice(0, 5)]);
    } else if (query.length > 0 && query.length < 3) {
      const filtered = mockSuggestions.filter((suggestion) =>
        suggestion.text.toLowerCase().includes(query.toLowerCase()),
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [query, recentSearches, showSuggestions, mockSuggestions]);

  const handleSearch = useCallback(() => {
    if (query.trim()) {
      // Add to recent searches
      setRecentSearches((prev) => {
        const updated = [query, ...prev.filter((search) => search !== query)];
        return updated.slice(0, 5);
      });

      onSearch?.(query, filters);
      setIsOpen(false);
    }
  }, [query, filters, onSearch]);

  const handleResultSelect = useCallback(
    (result: SearchResult) => {
      setQuery(result.title);
      setIsOpen(false);
      onResultSelect?.(result);
    },
    [onResultSelect],
  );

  const handleSuggestionSelect = useCallback(
    (suggestion: SearchSuggestion) => {
      setQuery(suggestion.text);
      setIsOpen(false);

      // Add to recent searches
      setRecentSearches((prev) => {
        const updated = [
          suggestion.text,
          ...prev.filter((search) => search !== suggestion.text),
        ];
        return updated.slice(0, 5);
      });

      onSearch?.(suggestion.text, filters);
    },
    [filters, onSearch],
  );

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      const totalItems = results.length + suggestions.length;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => (prev < totalItems - 1 ? prev + 1 : 0));
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : totalItems - 1));
          break;
        case "Enter":
          e.preventDefault();
          if (selectedIndex >= 0) {
            if (selectedIndex < results.length) {
              handleResultSelect(results[selectedIndex]);
            } else {
              const suggestionIndex = selectedIndex - results.length;
              handleSuggestionSelect(suggestions[suggestionIndex]);
            }
          } else if (query) {
            handleSearch();
          }
          break;
        case "Escape":
          setIsOpen(false);
          inputRef.current?.blur();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    isOpen,
    selectedIndex,
    results,
    suggestions,
    query,
    handleSearch,
    handleResultSelect,
    handleSuggestionSelect,
  ]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setShowFilterPanel(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedIndex(-1);

    if (value.length > 0) {
      setIsOpen(true);
    }
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleFilterChange = (
    key: keyof SearchFilters,
    value: SearchFilters[keyof SearchFilters],
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearQuery = () => {
    setQuery("");
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const activeFiltersCount = Object.values(filters).filter((value) => {
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === "string") return value !== "";
    if (typeof value === "number") return value > 0;
    if (typeof value === "boolean") return value;
    if (Array.isArray(value)) return value[0] !== 0 || value[1] !== 100;
    return false;
  }).length;

  return (
    <div ref={searchRef} className="relative max-w-2xl mx-auto">
      {/* Search Input */}
      <div className="relative">
        <div className="flex items-center">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              placeholder={placeholder}
              className="w-full pl-12 pr-12 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-sage text-gray-900 placeholder-gray-500"
            />
            {query && (
              <button
                onClick={clearQuery}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {showFilters && (
            <button
              onClick={() => setShowFilterPanel(!showFilterPanel)}
              className={`ml-3 px-4 py-4 border rounded-lg transition-colors relative ${
                showFilterPanel
                  ? "bg-sage text-white border-sage"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              <Filter className="w-5 h-5" />
              {activeFiltersCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          )}
        </div>

        {/* Filter Panel */}
        {showFilterPanel && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-20 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
              <button
                onClick={resetFilters}
                className="text-sm text-sage hover:text-sage/80"
              >
                Limpiar filtros
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoría
                </label>
                <select
                  value={filters.category}
                  onChange={(e) =>
                    handleFilterChange("category", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-sage"
                >
                  <option value="">Todas las categorías</option>
                  {categories.map((category) => (
                    <option key={category} value={category.toLowerCase()}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dietary Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Opciones Dietéticas
                </label>
                <div className="flex flex-wrap gap-2">
                  {dietaryOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        const updated = filters.dietary.includes(option)
                          ? filters.dietary.filter((d) => d !== option)
                          : [...filters.dietary, option];
                        handleFilterChange("dietary", updated);
                      }}
                      className={`px-3 py-1 text-sm rounded-full transition-colors ${
                        filters.dietary.includes(option)
                          ? "bg-sage text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rango de Precio
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.priceRange[0]}
                    onChange={(e) =>
                      handleFilterChange("priceRange", [
                        Number(e.target.value),
                        filters.priceRange[1],
                      ])
                    }
                    className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-sage"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.priceRange[1]}
                    onChange={(e) =>
                      handleFilterChange("priceRange", [
                        filters.priceRange[0],
                        Number(e.target.value),
                      ])
                    }
                    className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-sage"
                  />
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Calificación Mínima
                </label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => handleFilterChange("rating", rating)}
                      className={`w-8 h-8 ${
                        filters.rating >= rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      } hover:text-yellow-400 transition-colors`}
                    >
                      <Star className="w-full h-full fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ordenar por
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-sage"
                >
                  <option value="relevance">Relevancia</option>
                  <option value="price">Precio</option>
                  <option value="rating">Calificación</option>
                  <option value="popularity">Popularidad</option>
                  <option value="preparation-time">
                    Tiempo de preparación
                  </option>
                </select>
              </div>

              {/* Available Only */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="available-only"
                  checked={filters.availableOnly}
                  onChange={(e) =>
                    handleFilterChange("availableOnly", e.target.checked)
                  }
                  className="rounded border-gray-300 text-sage focus:ring-sage"
                />
                <label
                  htmlFor="available-only"
                  className="text-sm text-gray-700"
                >
                  Solo disponibles
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && (
        <div
          ref={resultsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-96 overflow-y-auto"
        >
          {loading && (
            <div className="flex items-center justify-center py-8">
              <div className="w-6 h-6 border-2 border-sage/30 border-t-sage rounded-full animate-spin"></div>
            </div>
          )}

          {!loading &&
            results.length === 0 &&
            suggestions.length === 0 &&
            query && (
              <div className="p-4 text-center text-gray-500">
                <p className="text-gray-500 text-sm">
                  No encontramos resultados para &quot;{query}&quot;.
                </p>
              </div>
            )}

          {/* Results */}
          {results.length > 0 && (
            <div className="border-b border-gray-200">
              <div className="px-4 py-2 bg-gray-50 text-sm font-medium text-gray-700">
                Resultados ({results.length})
              </div>
              {results.map((result, index) => (
                <button
                  key={result.id}
                  onClick={() => handleResultSelect(result)}
                  className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                    index === selectedIndex ? "bg-sage/10" : ""
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {result.image && (
                      <img
                        src={result.image}
                        alt={result.title}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900 truncate">
                          {result.title}
                        </h4>
                        <div className="flex items-center space-x-2">
                          {result.rating && (
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm text-gray-600">
                                {result.rating}
                              </span>
                            </div>
                          )}
                          {result.price && (
                            <span className="text-sm font-medium text-sage">
                              ${result.price.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 truncate mt-1">
                        {result.description}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <div className="flex flex-wrap gap-1">
                          {result.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        {!result.isAvailable && (
                          <span className="text-xs text-red-500">
                            No disponible
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div>
              <div className="px-4 py-2 bg-gray-50 text-sm font-medium text-gray-700">
                {query ? "Sugerencias" : "Búsquedas populares"}
              </div>
              {suggestions.map((suggestion, index) => (
                <button
                  key={suggestion.id}
                  onClick={() => handleSuggestionSelect(suggestion)}
                  className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                    index + results.length === selectedIndex ? "bg-sage/10" : ""
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-gray-400">{suggestion.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-900">{suggestion.text}</span>
                        {suggestion.count && (
                          <span className="text-sm text-gray-500">
                            {suggestion.count} resultados
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {suggestion.type === "recent" && "Búsqueda reciente"}
                        {suggestion.type === "popular" && "Búsqueda popular"}
                        {suggestion.type === "trending" && "Tendencia"}
                        {suggestion.type === "category" && "Categoría"}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
