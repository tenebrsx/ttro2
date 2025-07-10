export interface Product {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  category:
    | "tartas"
    | "macarons"
    | "cupcakes"
    | "galletas"
    | "postres-especiales"
    | "temporada"
    | "otro";
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
      "Tartas elaboradas con ingredientes premium y técnicas tradicionales",
    image: "/images/placeholder-dessert.jpg",
    icon: "",
    color: "#8B5A5A",
    featured: true,
    sortOrder: 1,
  },
  {
    id: "macarons",
    name: "Macarons Franceses",
    slug: "macarons",
    description: "Auténticos macarons franceses con sabores únicos",
    image: "/images/placeholder-dessert.jpg",
    icon: "🥐",
    color: "#D4A574",
    featured: true,
    sortOrder: 2,
  },
  {
    id: "cupcakes",
    name: "Cupcakes Temáticos",
    slug: "cupcakes",
    description: "Cupcakes personalizados para todas las ocasiones",
    image: "/images/placeholder-dessert.jpg",
    icon: "🧁",
    color: "#B8A082",
    featured: true,
    sortOrder: 3,
  },
  {
    id: "galletas",
    name: "Galletas Decoradas",
    slug: "galletas",
    description: "Galletas artesanales con diseños únicos",
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
    description: "Creaciones únicas para momentos especiales",
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
    description: "Sabores y diseños de temporada",
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
      "Exquisita tarta de chocolate belga con capas de ganache sedoso, crema de vainilla Madagascar y decoración de frutos rojos frescos. Una experiencia gourmet que combina la intensidad del cacao con la delicadeza de ingredientes premium.",
    shortDescription: "Tarta de chocolate belga con ganache y frutos rojos",
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
      "Caja de 12 macarons auténticos franceses elaborados con técnica tradicional. Incluye sabores clásicos: vainilla, chocolate, fresa, limón, pistacho y lavanda. Perfectos para regalar o disfrutar en una ocasión especial.",
    shortDescription: "Caja de 12 macarons artesanales sabores variados",
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
      "Set de 6 cupcakes personalizados para celebraciones de cumpleaños. Incluye decoración temática, colores personalizados y toppers únicos. Base de vainilla esponjosa con buttercream suave y decoraciones comestibles.",
    shortDescription: "Set de 6 cupcakes personalizados para cumpleaños",
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
      "Auténtico tiramisú italiano servido en elegantes copas individuales. Elaborado con mascarpone italiano, café espresso dominicano, ladyfingers artesanales y cacao importado. Una experiencia gourmet que transporta directamente a Italia.",
    shortDescription: "Tiramisú auténtico en presentación individual",
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
