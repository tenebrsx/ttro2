export interface Product {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory?: string;
  images: string[];
  thumbnailImage: string;
  preparationTime: string;
  serves: string;
  difficulty: "Fácil" | "Intermedio" | "Avanzado";
  customizations: string[];
  allergens: string[];
  dietaryOptions: string[];
  ingredients: string[];
  nutritionalInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    sugar: number;
  };
  tags: string[];
  featured: boolean;
  available: boolean;
  seasonal: boolean;
  popularityScore: number;
  rating: number;
  reviewsCount: number;
  createdAt: Date;
  updatedAt: Date;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  icon: string;
  color: string;
  featured: boolean;
  sortOrder: number;
}

// Product Categories
export const productCategories: ProductCategory[] = [
  {
    id: "tartas",
    name: "Tartas Artesanales",
    slug: "tartas",
    description:
      "Cada tarta cuenta una historia única, desde el primer bocado hasta el último",
    image: "/images/placeholder-dessert.jpg",
    icon: "",
    color: "#c78787",
    featured: true,
    sortOrder: 1,
  },
  {
    id: "macarons",
    name: "Macarons Franceses",
    slug: "macarons",
    description: "Técnica parisina auténtica que aprendí en las mejores pastelerías de Francia",
    image: "/images/placeholder-dessert.jpg",
    icon: "🥐",
    color: "#c78787",
    featured: true,
    sortOrder: 2,
  },
  {
    id: "cupcakes",
    name: "Cupcakes Temáticos",
    slug: "cupcakes",
    description: "Pequeñas obras de arte comestibles que hacen sonreír a grandes y chicos",
    image: "/images/placeholder-dessert.jpg",
    icon: "🧁",
    color: "#c78787",
    featured: true,
    sortOrder: 3,
  },
  {
    id: "galletas",
    name: "Galletas Decoradas",
    slug: "galletas",
    description: "Cada galleta es un lienzo donde pinto con royal icing y mucho cariño",
    image: "/images/placeholder-dessert.jpg",
    icon: "",
    color: "#8D7053",
    featured: false,
    sortOrder: 4,
  },
  {
    id: "postres-especiales",
    name: "Postres Especiales",
    slug: "postres-especiales",
    description: "Para esos momentos que merecen algo completamente único y memorable",
    image: "/images/placeholder-dessert.jpg",
    icon: "",
    color: "#A67B5B",
    featured: true,
    sortOrder: 5,
  },
  {
    id: "temporada",
    name: "Temporada",
    slug: "temporada",
    description: "Sabores estacionales que capturan la esencia de cada época del año",
    image: "/images/placeholder-dessert.jpg",
    icon: "",
    color: "#9D6E47",
    featured: false,
    sortOrder: 6,
  },
];

// Sample Products Database
export const products: Product[] = [
  {
    id: "tarta-chocolate-premium",
    name: "Tarta de Chocolate Premium",
    description:
      "Mi tarta más pedida para celebraciones especiales. Tres capas de bizcocho de chocolate húmedo, rellenas con ganache de chocolate belga que derrito yo misma, y crema de vainilla auténtica de Madagascar. La termino con frutos rojos frescos que selecciono cada mañana. Es el tipo de chocolate que te hace cerrar los ojos en el primer bocado.",
    shortDescription: "La favorita: chocolate belga con frutos rojos del día",
    price: 45.0,
    originalPrice: 50.0,
    category: "tartas",
    subcategory: "chocolate",
    images: [
      "/images/placeholder-dessert.jpg",
      "/images/placeholder-dessert.jpg",
      "/images/placeholder-dessert.jpg",
    ],
    thumbnailImage: "/images/placeholder-dessert.jpg",
    preparationTime: "2-3 días",
    serves: "8-10 personas",
    difficulty: "Avanzado",
    customizations: [
      "Mensaje personalizado",
      "Decoración temática",
      "Tamaño personalizado",
      "Sabor de crema adicional",
    ],
    allergens: ["Gluten", "Lácteos", "Huevos", "Frutos secos"],
    dietaryOptions: ["Disponible sin gluten", "Versión vegana disponible"],
    ingredients: [
      "Chocolate belga 70%",
      "Vainilla Madagascar",
      "Crema fresca",
      "Huevos orgánicos",
      "Frutos rojos frescos",
      "Azúcar morena",
      "Harina de almendra",
    ],
    nutritionalInfo: {
      calories: 420,
      protein: 6,
      carbs: 35,
      fat: 28,
      sugar: 25,
    },
    tags: ["Premium", "Chocolate", "Frutos rojos", "Artesanal", "Bestseller"],
    featured: true,
    available: true,
    seasonal: false,
    popularityScore: 95,
    rating: 4.9,
    reviewsCount: 127,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-12-01"),
    seo: {
      metaTitle: "Tarta de Chocolate Premium - Cucinanostrard",
      metaDescription:
        "Tarta artesanal de chocolate belga con ganache y frutos rojos. Perfecta para celebraciones especiales. Elaborada con ingredientes premium.",
      keywords: [
        "tarta chocolate",
        "chocolate belga",
        "postres artesanales",
        "frutos rojos",
        "celebration cake",
      ],
    },
  },
  {
    id: "macarons-franceses-clasicos",
    name: "Macarons Franceses Clásicos",
    description:
      "Los hago exactamente como aprendí en París: con harina de almendra francesa, macaronage a mano hasta conseguir esa textura perfecta, y 24 horas de reposo para que cada uno encuentre su equilibrio. Esta caja de 12 incluye vainilla Bourbon, chocolate 70%, fresa natural, limón siciliano, pistacho de verdad, y mi favorito personal: lavanda de Provenza. Cada uno lleva tres días de proceso.",
    shortDescription: "12 macarons hechos con técnica parisina auténtica",
    price: 24.0,
    category: "macarons",
    subcategory: "clasicos",
    images: [
      "/images/placeholder-dessert.jpg",
      "/images/placeholder-dessert.jpg",
      "/images/placeholder-dessert.jpg",
    ],
    thumbnailImage: "/images/placeholder-dessert.jpg",
    preparationTime: "24-48 horas",
    serves: "12 unidades",
    difficulty: "Avanzado",
    customizations: [
      "Selección de sabores",
      "Caja personalizada",
      "Colores temáticos",
      "Cantidad personalizada",
    ],
    allergens: ["Gluten", "Lácteos", "Huevos", "Almendras"],
    dietaryOptions: ["Versión sin gluten disponible"],
    ingredients: [
      "Harina de almendra",
      "Azúcar glass",
      "Claras de huevo",
      "Azúcar refinada",
      "Colorantes naturales",
      "Esencias naturales",
      "Mantequilla francesa",
    ],
    nutritionalInfo: {
      calories: 95,
      protein: 2,
      carbs: 15,
      fat: 4,
      sugar: 12,
    },
    tags: ["Francés", "Tradicional", "Elegante", "Regalo", "Colores"],
    featured: true,
    available: true,
    seasonal: false,
    popularityScore: 88,
    rating: 4.8,
    reviewsCount: 89,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-11-28"),
    seo: {
      metaTitle: "Macarons Franceses Artesanales - Cucinanostrard",
      metaDescription:
        "Auténticos macarons franceses elaborados con técnica tradicional. Sabores clásicos y presentación elegante. Perfectos para regalar.",
      keywords: [
        "macarons franceses",
        "macarons artesanales",
        "postres franceses",
        "regalo dulce",
        "técnica francesa",
      ],
    },
  },
  {
    id: "cupcakes-tematicos-cumpleanos",
    name: "Cupcakes Temáticos de Cumpleaños",
    description:
      "Estos cupcakes son pura alegría en formato individual. Los hago con mi receta secreta de vainilla que queda súper esponjosa, y el buttercream lo bato a mano hasta conseguir esa textura cremosa perfecta. Lo divertido viene después: trabajo contigo para crear el tema que quieras, desde unicornios hasta superhéroes, siempre con decoraciones comestibles hechas en casa. Es ver la cara del cumpleañero lo que más me emociona.",
    shortDescription: "6 cupcakes personalizados que hacen sonreír",
    price: 18.0,
    category: "cupcakes",
    subcategory: "cumpleanos",
    images: [
      "/images/placeholder-dessert.jpg",
      "/images/placeholder-dessert.jpg",
      "/images/placeholder-dessert.jpg",
    ],
    thumbnailImage: "/images/placeholder-dessert.jpg",
    preparationTime: "1-2 días",
    serves: "6 unidades",
    difficulty: "Intermedio",
    customizations: [
      "Tema personalizado",
      "Colores específicos",
      "Mensaje en toppers",
      "Sabor del bizcocho",
      "Tipo de buttercream",
    ],
    allergens: ["Gluten", "Lácteos", "Huevos"],
    dietaryOptions: [
      "Versión vegana disponible",
      "Sin azúcar añadido disponible",
    ],
    ingredients: [
      "Harina de trigo",
      "Mantequilla",
      "Azúcar blanca",
      "Huevos frescos",
      "Vainilla natural",
      "Polvo de hornear",
      "Leche fresca",
      "Colorantes alimentarios",
    ],
    nutritionalInfo: {
      calories: 280,
      protein: 4,
      carbs: 38,
      fat: 12,
      sugar: 28,
    },
    tags: ["Cumpleaños", "Personalizado", "Colorido", "Niños", "Celebración"],
    featured: false,
    available: true,
    seasonal: false,
    popularityScore: 82,
    rating: 4.7,
    reviewsCount: 156,
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-11-25"),
    seo: {
      metaTitle: "Cupcakes Temáticos de Cumpleaños - Cucinanostrard",
      metaDescription:
        "Cupcakes personalizados para cumpleaños con decoración temática y colores únicos. Perfectos para hacer especial cualquier celebración.",
      keywords: [
        "cupcakes cumpleaños",
        "cupcakes personalizados",
        "decoración temática",
        "celebración infantil",
        "postres cumpleaños",
      ],
    },
  },
  {
    id: "galletas-decoradas-boda",
    name: "Galletas Decoradas para Boda",
    description:
      "Elegantes galletas decoradas especialmente para bodas. Cada galleta es una pequeña obra de arte comestible con diseños románticos, colores sutiles y acabados en royal icing. Perfectas como detalles para invitados o mesa dulce.",
    shortDescription: "Galletas artesanales decoradas para bodas",
    price: 32.0,
    category: "galletas",
    subcategory: "bodas",
    images: [
      "/images/placeholder-dessert.jpg",
      "/images/placeholder-dessert.jpg",
      "/images/placeholder-dessert.jpg",
    ],
    thumbnailImage: "/images/placeholder-dessert.jpg",
    preparationTime: "3-5 días",
    serves: "20 unidades",
    difficulty: "Avanzado",
    customizations: [
      "Diseño personalizado",
      "Colores de boda",
      "Iniciales de novios",
      "Formas especiales",
      "Empaque individual",
    ],
    allergens: ["Gluten", "Lácteos", "Huevos"],
    dietaryOptions: ["Versión sin gluten disponible"],
    ingredients: [
      "Harina de trigo premium",
      "Mantequilla europea",
      "Azúcar glass",
      "Huevos orgánicos",
      "Vainilla Bourbon",
      "Royal icing",
      "Colorantes gel",
      "Esencia de almendra",
    ],
    nutritionalInfo: {
      calories: 145,
      protein: 2,
      carbs: 20,
      fat: 6,
      sugar: 14,
    },
    tags: ["Boda", "Elegante", "Romántico", "Artesanal", "Royal icing"],
    featured: false,
    available: true,
    seasonal: false,
    popularityScore: 75,
    rating: 4.9,
    reviewsCount: 43,
    createdAt: new Date("2024-02-14"),
    updatedAt: new Date("2024-11-20"),
    seo: {
      metaTitle:
        "Galletas Decoradas para Boda - Detalles Únicos - Cucinanostrard",
      metaDescription:
        "Galletas artesanales decoradas para bodas con royal icing. Diseños personalizados y colores únicos. Perfectas como detalles para invitados.",
      keywords: [
        "galletas boda",
        "galletas decoradas",
        "royal icing",
        "detalles boda",
        "mesa dulce boda",
      ],
    },
  },
  {
    id: "tiramisu-individual-premium",
    name: "Tiramisú Individual Premium",
    description:
      "Mi versión del tiramisú clásico que aprendí de una nonna italiana en Roma. Uso mascarpone importado, café espresso de la mejor cafetería de Santo Domingo, y ladyfingers que hago yo misma porque la textura tiene que ser perfecta. Lo sirvo en copas de cristal porque este postre se disfruta primero con los ojos. El secreto está en dejarlo reposar 24 horas para que todos los sabores se casen.",
    shortDescription: "Tiramisú como en Roma, servido en copa de cristal",
    price: 12.0,
    category: "postres-especiales",
    subcategory: "italiano",
    images: [
      "/images/placeholder-dessert.jpg",
      "/images/placeholder-dessert.jpg",
      "/images/placeholder-dessert.jpg",
    ],
    thumbnailImage: "/images/placeholder-dessert.jpg",
    preparationTime: "24 horas",
    serves: "1 persona",
    difficulty: "Intermedio",
    customizations: [
      "Intensidad del café",
      "Decoración especial",
      "Copa personalizada",
      "Sin alcohol disponible",
    ],
    allergens: ["Gluten", "Lácteos", "Huevos", "Alcohol"],
    dietaryOptions: ["Versión sin alcohol", "Versión sin gluten disponible"],
    ingredients: [
      "Mascarpone italiano",
      "Café espresso dominicano",
      "Ladyfingers artesanales",
      "Cacao holandés",
      "Marsala italiano",
      "Azúcar refinada",
      "Huevos pasteurizados",
      "Crema fresca",
    ],
    nutritionalInfo: {
      calories: 385,
      protein: 8,
      carbs: 28,
      fat: 26,
      sugar: 22,
    },
    tags: ["Italiano", "Auténtico", "Café", "Premium", "Individual"],
    featured: true,
    available: true,
    seasonal: false,
    popularityScore: 91,
    rating: 4.8,
    reviewsCount: 78,
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-11-30"),
    seo: {
      metaTitle:
        "Tiramisú Individual Premium - Auténtico Italiano - Cucinanostrard",
      metaDescription:
        "Auténtico tiramisú italiano con mascarpone y café espresso dominicano. Presentación individual elegante. Sabor tradicional garantizado.",
      keywords: [
        "tiramisú auténtico",
        "postre italiano",
        "mascarpone",
        "café espresso",
        "postre individual",
      ],
    },
  },
  {
    id: "tarta-red-velvet-temporada",
    name: "Red Velvet de Temporada",
    description:
      "Clásica tarta Red Velvet con un toque estacional. Bizcocho aterciopelado de color rojo intenso, cream cheese frosting suave y decoración temática de temporada. Una combinación perfecta entre tradición y creatividad estacional.",
    shortDescription: "Red Velvet clásica con decoración de temporada",
    price: 38.0,
    category: "temporada",
    subcategory: "otoño",
    images: [
      "/images/placeholder-dessert.jpg",
      "/images/placeholder-dessert.jpg",
      "/images/placeholder-dessert.jpg",
    ],
    thumbnailImage: "/images/placeholder-dessert.jpg",
    preparationTime: "2-3 días",
    serves: "8-10 personas",
    difficulty: "Intermedio",
    customizations: [
      "Decoración estacional",
      "Mensaje personalizado",
      "Intensidad del color",
      "Tamaño personalizado",
    ],
    allergens: ["Gluten", "Lácteos", "Huevos"],
    dietaryOptions: ["Colorante natural disponible"],
    ingredients: [
      "Harina de trigo",
      "Cacao en polvo",
      "Colorante rojo",
      "Suero de leche",
      "Aceite vegetal",
      "Cream cheese",
      "Mantequilla",
      "Azúcar glass",
      "Vainilla",
    ],
    nutritionalInfo: {
      calories: 365,
      protein: 5,
      carbs: 42,
      fat: 20,
      sugar: 35,
    },
    tags: ["Red Velvet", "Temporada", "Clásico", "Cream cheese", "Otoño"],
    featured: false,
    available: true,
    seasonal: true,
    popularityScore: 79,
    rating: 4.6,
    reviewsCount: 64,
    createdAt: new Date("2024-09-01"),
    updatedAt: new Date("2024-11-15"),
    seo: {
      metaTitle:
        "Red Velvet de Temporada - Tarta Clásica Estacional - Cucinanostrard",
      metaDescription:
        "Clásica tarta Red Velvet con decoración de temporada. Bizcocho aterciopelado y cream cheese frosting. Perfecta para celebraciones otoñales.",
      keywords: [
        "red velvet",
        "tarta temporada",
        "cream cheese frosting",
        "decoración otoño",
        "tarta estacional",
      ],
    },
  },
];

// Utility functions
export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter((product) => product.category === categoryId);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter((product) => product.featured);
};

export const getAvailableProducts = (): Product[] => {
  return products.filter((product) => product.available);
};

export const getSeasonalProducts = (): Product[] => {
  return products.filter((product) => product.seasonal);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find((product) => product.id === id);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)) ||
      product.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(lowercaseQuery),
      ),
  );
};

export const getTopRatedProducts = (limit: number = 10): Product[] => {
  return products.sort((a, b) => b.rating - a.rating).slice(0, limit);
};

export const getPopularProducts = (limit: number = 10): Product[] => {
  return products
    .sort((a, b) => b.popularityScore - a.popularityScore)
    .slice(0, limit);
};

export const getProductsByPriceRange = (
  minPrice: number,
  maxPrice: number,
): Product[] => {
  return products.filter(
    (product) => product.price >= minPrice && product.price <= maxPrice,
  );
};

export const getProductsByAllergen = (allergen: string): Product[] => {
  return products.filter((product) => !product.allergens.includes(allergen));
};

export const getProductsByDietaryOption = (option: string): Product[] => {
  return products.filter((product) =>
    product.dietaryOptions.some((dietaryOption) =>
      dietaryOption.toLowerCase().includes(option.toLowerCase()),
    ),
  );
};
