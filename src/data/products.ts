export interface Product {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  priceUnit?: "por unidad" | "por docena" | "por porción" | "por torta";
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
    description:
      "Técnica parisina auténtica que aprendí en las mejores pastelerías de Francia",
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
    description:
      "Pequeñas obras de arte comestibles que hacen sonreír a grandes y chicos",
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
    description:
      "Cada galleta es un lienzo donde pinto con royal icing y mucho cariño",
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
    description:
      "Para esos momentos que merecen algo completamente único y memorable",
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
    description:
      "Sabores estacionales que capturan la esencia de cada época del año",
    image: "/images/placeholder-dessert.jpg",
    icon: "",
    color: "#9D6E47",
    featured: false,
    sortOrder: 6,
  },
];

// Products Database - Now managed through Firebase Admin Panel
export const products: Product[] = [];

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
