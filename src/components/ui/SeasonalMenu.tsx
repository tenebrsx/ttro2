import React, { useState, useEffect } from "react";
import {
  Calendar,
  Snowflake,
  Sun,
  Leaf,
  Flower,
  Star,
  Clock,
  ThermometerSun,
  MapPin,
} from "lucide-react";

interface SeasonalItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  tags: string[];
  availableFrom: Date;
  availableTo: Date;
  isLimitedTime: boolean;
  ingredients: string[];
  allergens: string[];
  preparationTime: number;
  popularityScore: number;
}

interface SeasonalMenuProps {
  showOnlyCurrentSeason?: boolean;
  allowPreOrders?: boolean;
  showAvailabilityDates?: boolean;
  enableFilters?: boolean;
  maxItemsToShow?: number;
}

type Season = "spring" | "summer" | "autumn" | "winter";

const seasonConfig = {
  spring: {
    name: "Primavera",
    icon: <Flower className="w-5 h-5" />,
    color: "from-pink-400 to-green-400",
    bgColor: "bg-gradient-to-br from-pink-50 to-green-50",
    textColor: "text-pink-700",
    months: [3, 4, 5], // March, April, May
    theme: "Frescura y Renovación",
  },
  summer: {
    name: "Verano",
    icon: <Sun className="w-5 h-5" />,
    color: "from-yellow-400 to-orange-400",
    bgColor: "bg-gradient-to-br from-yellow-50 to-orange-50",
    textColor: "text-orange-700",
    months: [6, 7, 8], // June, July, August
    theme: "Vibrante y Refrescante",
  },
  autumn: {
    name: "Otoño",
    icon: <Leaf className="w-5 h-5" />,
    color: "from-orange-400 to-red-400",
    bgColor: "bg-gradient-to-br from-orange-50 to-red-50",
    textColor: "text-orange-700",
    months: [9, 10, 11], // September, October, November
    theme: "Calidez y Especias",
  },
  winter: {
    name: "Invierno",
    icon: <Snowflake className="w-5 h-5" />,
    color: "from-blue-400 to-purple-400",
    bgColor: "bg-gradient-to-br from-blue-50 to-purple-50",
    textColor: "text-blue-700",
    months: [12, 1, 2], // December, January, February
    theme: "Comfort y Tradición",
  },
};

export const SeasonalMenu: React.FC<SeasonalMenuProps> = ({
  showOnlyCurrentSeason = false,
  allowPreOrders = true,
  showAvailabilityDates = true,
  enableFilters = true,
  maxItemsToShow = 12,
}) => {
  const [currentSeason] = useState<Season>("spring");
  const [selectedSeason, setSelectedSeason] = useState<Season>("spring");
  const [seasonalItems, setSeasonalItems] = useState<SeasonalItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<SeasonalItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<
    "popularity" | "price" | "name" | "availability"
  >("popularity");
  const [showPreOrders, setShowPreOrders] = useState(false);

  // Determine current season
  useEffect(() => {
    const now = new Date();
    const month = now.getMonth() + 1;

    const season =
      (Object.entries(seasonConfig).find(([, config]) =>
        config.months.includes(month),
      )?.[0] as Season) || "spring";

    setSelectedSeason(season);
  }, []);

  // Mock seasonal items data
  useEffect(() => {
    const mockItems: SeasonalItem[] = [
      // Spring Items
      {
        id: "spring-1",
        name: "Tarta de Fresas Silvestres",
        description:
          "Deliciosa tarta con fresas frescas de temporada, crema pastelera y masa quebrada artesanal",
        price: 28.5,
        image: "/api/placeholder/300/200",
        tags: ["Frutas Frescas", "Artesanal", "Temporada"],
        availableFrom: new Date(2024, 2, 1), // March 1
        availableTo: new Date(2024, 5, 30), // June 30
        isLimitedTime: true,
        ingredients: [
          "Fresas silvestres",
          "Crema pastelera",
          "Masa quebrada",
          "Azúcar glass",
        ],
        allergens: ["Gluten", "Huevos", "Lácteos"],
        preparationTime: 45,
        popularityScore: 95,
      },
      {
        id: "spring-2",
        name: "Macarons de Lavanda",
        description:
          "Exquisitos macarons con sabor a lavanda, perfectos para la primavera",
        price: 18.0,
        image: "/api/placeholder/300/200",
        tags: ["Macarons", "Lavanda", "Delicado"],
        availableFrom: new Date(2024, 2, 15),
        availableTo: new Date(2024, 5, 15),
        isLimitedTime: true,
        ingredients: [
          "Almendra molida",
          "Azúcar",
          "Claras de huevo",
          "Lavanda",
        ],
        allergens: ["Frutos secos", "Huevos"],
        preparationTime: 90,
        popularityScore: 88,
      },

      // Summer Items
      {
        id: "summer-1",
        name: "Cheesecake de Mango y Maracuyá",
        description:
          "Refrescante cheesecake con frutas tropicales, ideal para los días calurosos",
        price: 32.0,
        image: "/api/placeholder/300/200",
        tags: ["Tropical", "Refrescante", "Sin Hornear"],
        availableFrom: new Date(2024, 5, 1),
        availableTo: new Date(2024, 8, 31),
        isLimitedTime: true,
        ingredients: [
          "Queso crema",
          "Mango",
          "Maracuyá",
          "Galletas digestivas",
        ],
        allergens: ["Lácteos", "Gluten"],
        preparationTime: 60,
        popularityScore: 92,
      },
      {
        id: "summer-2",
        name: "Sorbete de Limón y Albahaca",
        description:
          "Sorbete artesanal con limón fresco y un toque de albahaca",
        price: 12.5,
        image: "/api/placeholder/300/200",
        tags: ["Sorbete", "Vegano", "Refrescante"],
        availableFrom: new Date(2024, 5, 15),
        availableTo: new Date(2024, 8, 15),
        isLimitedTime: true,
        ingredients: ["Limón", "Albahaca fresca", "Azúcar", "Agua"],
        allergens: [],
        preparationTime: 30,
        popularityScore: 85,
      },

      // Autumn Items
      {
        id: "autumn-1",
        name: "Tarta de Calabaza Especiada",
        description:
          "Clásica tarta de calabaza con canela, nuez moscada y crema batida",
        price: 26.0,
        image: "/api/placeholder/300/200",
        tags: ["Calabaza", "Especias", "Tradicional"],
        availableFrom: new Date(2024, 8, 1),
        availableTo: new Date(2024, 11, 30),
        isLimitedTime: true,
        ingredients: ["Calabaza", "Canela", "Nuez moscada", "Crema batida"],
        allergens: ["Gluten", "Huevos", "Lácteos"],
        preparationTime: 75,
        popularityScore: 90,
      },
      {
        id: "autumn-2",
        name: "Muffins de Manzana y Canela",
        description:
          "Esponjosos muffins con trozos de manzana y aroma a canela",
        price: 15.0,
        image: "/api/placeholder/300/200",
        tags: ["Muffins", "Manzana", "Canela"],
        availableFrom: new Date(2024, 8, 15),
        availableTo: new Date(2024, 11, 15),
        isLimitedTime: true,
        ingredients: ["Manzana", "Canela", "Harina", "Mantequilla"],
        allergens: ["Gluten", "Lácteos", "Huevos"],
        preparationTime: 35,
        popularityScore: 87,
      },

      // Winter Items
      {
        id: "winter-1",
        name: "Chocolate Caliente Gourmet",
        description:
          "Chocolate caliente preparado con chocolate belga y especias navideñas",
        price: 8.5,
        image: "/api/placeholder/300/200",
        tags: ["Chocolate", "Caliente", "Navideño"],
        availableFrom: new Date(2024, 11, 1),
        availableTo: new Date(2025, 2, 28),
        isLimitedTime: true,
        ingredients: ["Chocolate belga", "Leche", "Canela", "Vainilla"],
        allergens: ["Lácteos"],
        preparationTime: 15,
        popularityScore: 93,
      },
      {
        id: "winter-2",
        name: "Panettone Artesanal",
        description:
          "Tradicional panettone italiano con frutas confitadas y masa madre",
        price: 35.0,
        image: "/api/placeholder/300/200",
        tags: ["Panettone", "Tradicional", "Frutas"],
        availableFrom: new Date(2024, 10, 1),
        availableTo: new Date(2025, 0, 31),
        isLimitedTime: true,
        ingredients: [
          "Masa madre",
          "Frutas confitadas",
          "Huevos",
          "Mantequilla",
        ],
        allergens: ["Gluten", "Huevos", "Lácteos"],
        preparationTime: 180,
        popularityScore: 89,
      },
    ];

    setSeasonalItems(mockItems);
    setLoading(false);
  }, []);

  // Filter items based on season and other filters
  useEffect(() => {
    let filtered = seasonalItems;

    // Filter by season
    if (showOnlyCurrentSeason) {
      filtered = filtered.filter((item) => {
        const itemSeason = getItemSeason(item);
        return itemSeason === currentSeason;
      });
    } else {
      filtered = filtered.filter((item) => {
        const itemSeason = getItemSeason(item);
        return itemSeason === selectedSeason;
      });
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter((item) =>
        selectedTags.every((tag) => item.tags.includes(tag)),
      );
    }

    // Filter by availability
    const now = new Date();
    if (!showPreOrders) {
      filtered = filtered.filter((item) => item.availableFrom <= now);
    }

    // Sort items
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "popularity":
          return b.popularityScore - a.popularityScore;
        case "price":
          return a.price - b.price;
        case "name":
          return a.name.localeCompare(b.name);
        case "availability":
          return a.availableFrom.getTime() - b.availableFrom.getTime();
        default:
          return 0;
      }
    });

    // Limit results
    if (maxItemsToShow) {
      filtered = filtered.slice(0, maxItemsToShow);
    }

    setFilteredItems(filtered);
  }, [
    seasonalItems,
    selectedSeason,
    selectedTags,
    sortBy,
    showPreOrders,
    currentSeason,
    showOnlyCurrentSeason,
    maxItemsToShow,
  ]);

  const getItemSeason = (item: SeasonalItem): Season => {
    const month = item.availableFrom.getMonth() + 1;
    return (
      (Object.entries(seasonConfig).find(([, config]) =>
        config.months.includes(month),
      )?.[0] as Season) || "spring"
    );
  };

  const isItemAvailable = (item: SeasonalItem): boolean => {
    const now = new Date();
    return item.availableFrom <= now && item.availableTo >= now;
  };

  const getDaysUntilAvailable = (item: SeasonalItem): number => {
    const now = new Date();
    const diffTime = item.availableFrom.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getAllTags = (): string[] => {
    const tags = new Set<string>();
    seasonalItems.forEach((item) => {
      item.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags);
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-64"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const currentSeasonConfig = seasonConfig[selectedSeason];

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className={`${currentSeasonConfig.bgColor} rounded-2xl p-8 mb-6`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                {currentSeasonConfig.icon}
                <h1
                  className={`text-3xl font-bold ${currentSeasonConfig.textColor}`}
                >
                  Menú de {currentSeasonConfig.name}
                </h1>
              </div>
              <p
                className={`text-lg ${currentSeasonConfig.textColor} opacity-80`}
              >
                {currentSeasonConfig.theme}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Ingredientes frescos de temporada, sabores únicos que cambian
                con las estaciones
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                <Calendar className="w-4 h-4" />
                <span>Temporada Actual</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>Disponible en tienda</span>
              </div>
            </div>
          </div>
        </div>

        {/* Season Selector */}
        {!showOnlyCurrentSeason && (
          <div className="flex items-center space-x-4 mb-6">
            <span className="text-sm font-medium text-gray-700">
              Temporada:
            </span>
            <div className="flex space-x-2">
              {Object.entries(seasonConfig).map(([season, config]) => (
                <button
                  key={season}
                  onClick={() => setSelectedSeason(season as Season)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    selectedSeason === season
                      ? `bg-gradient-to-r ${config.color} text-white shadow-lg`
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {config.icon}
                  <span className="text-sm">{config.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Filters */}
        {enableFilters && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-wrap items-center gap-4">
              {/* Tags Filter */}
              <div className="flex-1 min-w-0">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filtrar por:
                </label>
                <div className="flex flex-wrap gap-2">
                  {getAllTags().map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleTagToggle(tag)}
                      className={`px-3 py-1 text-sm rounded-full transition-colors ${
                        selectedTags.includes(tag)
                          ? "bg-sage text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div className="flex items-center space-x-4">
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(
                      e.target.value as
                        | "popularity"
                        | "price"
                        | "name"
                        | "availability",
                    )
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-sage focus:border-sage"
                >
                  <option value="popularity">Más Popular</option>
                  <option value="price">Precio</option>
                  <option value="name">Nombre</option>
                  <option value="availability">Disponibilidad</option>
                </select>

                {allowPreOrders && (
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={showPreOrders}
                      onChange={(e) => setShowPreOrders(e.target.checked)}
                      className="rounded border-gray-300 text-sage focus:ring-sage"
                    />
                    <span className="text-sm text-gray-700">
                      Mostrar próximos
                    </span>
                  </label>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const available = isItemAvailable(item);
          const daysUntil = getDaysUntilAvailable(item);
          const itemSeason = getItemSeason(item);
          const itemSeasonConfig = seasonConfig[itemSeason];

          return (
            <div
              key={item.id}
              className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                !available ? "opacity-75" : ""
              }`}
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />

                {/* Availability Badge */}
                <div className="absolute top-4 left-4">
                  {available ? (
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Disponible
                    </span>
                  ) : daysUntil > 0 ? (
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      En {daysUntil} días
                    </span>
                  ) : (
                    <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Temporada pasada
                    </span>
                  )}
                </div>

                {/* Season Badge */}
                <div className="absolute top-4 right-4">
                  <div
                    className={`p-2 rounded-full bg-white/90 ${itemSeasonConfig.textColor}`}
                  >
                    {itemSeasonConfig.icon}
                  </div>
                </div>

                {/* Limited Time Badge */}
                {item.isLimitedTime && (
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>Tiempo Limitado</span>
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 flex-1">
                    {item.name}
                  </h3>
                  <div className="flex items-center space-x-1 text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm text-gray-600">
                      {(item.popularityScore / 10).toFixed(1)}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Availability Dates */}
                {showAvailabilityDates && (
                  <div className="flex items-center space-x-2 text-xs text-gray-500 mb-4">
                    <Calendar className="w-3 h-3" />
                    <span>
                      {item.availableFrom.toLocaleDateString("es-ES", {
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      -{" "}
                      {item.availableTo.toLocaleDateString("es-ES", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                )}

                {/* Preparation Time */}
                <div className="flex items-center space-x-2 text-xs text-gray-500 mb-4">
                  <ThermometerSun className="w-3 h-3" />
                  <span>Tiempo de preparación: {item.preparationTime} min</span>
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-sage">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>

                  <button
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      available
                        ? "bg-sage text-white hover:bg-sage/90"
                        : allowPreOrders && daysUntil > 0
                          ? "bg-orange-500 text-white hover:bg-orange-600"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    disabled={!available && (!allowPreOrders || daysUntil <= 0)}
                  >
                    {available
                      ? "Ordenar"
                      : allowPreOrders && daysUntil > 0
                        ? "Pre-ordenar"
                        : "No disponible"}
                  </button>
                </div>

                {/* Allergen Info */}
                {item.allergens.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500">
                      <strong>Alérgenos:</strong> {item.allergens.join(", ")}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* No Results */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Calendar className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No hay artículos disponibles
          </h3>
          <p className="text-gray-600">
            Intenta ajustar los filtros o seleccionar una temporada diferente
          </p>
        </div>
      )}
    </div>
  );
};

// Hook for seasonal menu management
export const useSeasonalMenu = () => {
  const [currentSeason] = useState<Season>("spring");
  const [seasonalItems] = useState<SeasonalItem[]>([]);
  const [preOrders, setPreOrders] = useState<string[]>([]);

  const getCurrentSeason = (): Season => {
    const month = new Date().getMonth() + 1;
    return (
      (Object.entries(seasonConfig).find(([, config]) =>
        config.months.includes(month),
      )?.[0] as Season) || "spring"
    );
  };

  const addPreOrder = (itemId: string) => {
    setPreOrders((prev) => [...prev, itemId]);
  };

  const removePreOrder = (itemId: string) => {
    setPreOrders((prev) => prev.filter((id) => id !== itemId));
  };

  const getSeasonalRecommendations = (season: Season): SeasonalItem[] => {
    return seasonalItems
      .filter((item) => {
        const itemSeason = getItemSeason(item);
        return itemSeason === season;
      })
      .sort((a, b) => b.popularityScore - a.popularityScore)
      .slice(0, 3);
  };

  const getItemSeason = (item: SeasonalItem): Season => {
    const month = item.availableFrom.getMonth() + 1;
    return (
      (Object.entries(seasonConfig).find(([, config]) =>
        config.months.includes(month),
      )?.[0] as Season) || "spring"
    );
  };

  return {
    currentSeason,
    seasonalItems,
    preOrders,
    getCurrentSeason,
    addPreOrder,
    removePreOrder,
    getSeasonalRecommendations,
  };
};
