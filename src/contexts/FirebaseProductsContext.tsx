import React, { createContext, useContext, ReactNode } from "react";
import { useFirebaseProducts } from "../hooks/useFirebaseProducts";
import type { Product } from "../data/products";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface ProductStats {
  total: number;
  featured: number;
  available: number;
  categories: Record<string, number>;
}

interface ProductCRUDOperations {
  createProduct: (
    productData: Omit<Product, "id" | "createdAt" | "updatedAt">,
  ) => Promise<string | null>;
  updateProduct: (
    id: string,
    productData: Partial<Omit<Product, "id" | "createdAt">>,
  ) => Promise<boolean>;
  deleteProduct: (id: string) => Promise<boolean>;
}

interface ProductSearchOperations {
  searchProducts: (term: string) => Promise<Product[]>;
  getProductsByCategory: (category: string) => Promise<Product[]>;
  getProductById: (id: string) => Promise<Product | null>;
}

interface ProductUtilityOperations {
  refreshProducts: () => Promise<void>;
  migrateLocalData: () => Promise<boolean>;
  resetProductState: () => void;
}

interface ProductStateData {
  products: Product[];
  loading: boolean;
  error: string | null;
  featuredProducts: Product[];
  productStats: ProductStats;
}

type FirebaseProductsContextType = ProductStateData &
  ProductCRUDOperations &
  ProductSearchOperations &
  ProductUtilityOperations;

interface FirebaseProductsProviderProps {
  children: ReactNode;
}

// ============================================================================
// CONTEXT SETUP
// ============================================================================

const FirebaseProductsContext = createContext<
  FirebaseProductsContextType | undefined
>(undefined);

FirebaseProductsContext.displayName = "FirebaseProductsContext";

// ============================================================================
// PROVIDER COMPONENT
// ============================================================================

export const FirebaseProductsProvider: React.FC<
  FirebaseProductsProviderProps
> = ({ children }) => {
  const firebaseProductsData = useFirebaseProducts();

  return (
    <FirebaseProductsContext.Provider value={firebaseProductsData}>
      {children}
    </FirebaseProductsContext.Provider>
  );
};

// ============================================================================
// MAIN CONTEXT HOOK
// ============================================================================

export const useFirebaseProductsContext = (): FirebaseProductsContextType => {
  const context = useContext(FirebaseProductsContext);

  if (context === undefined) {
    throw new Error(
      "useFirebaseProductsContext must be used within a FirebaseProductsProvider. " +
        "Please wrap your component tree with <FirebaseProductsProvider>.",
    );
  }

  return context;
};

// ============================================================================
// SPECIALIZED HOOKS FOR SPECIFIC USE CASES
// ============================================================================

/**
 * Hook for components that only need basic product data
 * @returns Basic product state (products, loading, error)
 */
export const useProducts = () => {
  const { products, loading, error } = useFirebaseProductsContext();
  return { products, loading, error } as const;
};

/**
 * Hook for components that work with featured products
 * @returns Featured products state
 */
export const useFeaturedProducts = () => {
  const { featuredProducts, loading, error } = useFirebaseProductsContext();
  return { featuredProducts, loading, error } as const;
};

/**
 * Hook for components that need search functionality
 * @returns Product search operations
 */
export const useProductSearch = (): ProductSearchOperations => {
  const { searchProducts, getProductsByCategory, getProductById } =
    useFirebaseProductsContext();

  return {
    searchProducts,
    getProductsByCategory,
    getProductById,
  } as const;
};

/**
 * Hook for admin components that need CRUD operations
 * @returns Product management operations
 */
export const useProductManagement = (): ProductCRUDOperations &
  Pick<ProductUtilityOperations, "refreshProducts" | "resetProductState"> => {
  const {
    createProduct,
    updateProduct,
    deleteProduct,
    refreshProducts,
    resetProductState,
  } = useFirebaseProductsContext();

  return {
    createProduct,
    updateProduct,
    deleteProduct,
    refreshProducts,
    resetProductState,
  } as const;
};

/**
 * Hook for components that need utility operations
 * @returns Product utility operations
 */
export const useProductUtilities = (): ProductUtilityOperations => {
  const { refreshProducts, migrateLocalData, resetProductState } =
    useFirebaseProductsContext();

  return {
    refreshProducts,
    migrateLocalData,
    resetProductState,
  } as const;
};

/**
 * Hook for components that display product statistics
 * @returns Product statistics
 */
export const useProductStats = () => {
  const { productStats } = useFirebaseProductsContext();
  return { productStats } as const;
};

/**
 * Hook for components that need the full context (use sparingly)
 * @returns Complete context value
 */
export const useFullProductsContext = (): FirebaseProductsContextType => {
  return useFirebaseProductsContext();
};

// ============================================================================
// EXPORTS
// ============================================================================

export default FirebaseProductsContext;

export type {
  FirebaseProductsContextType,
  ProductStats,
  ProductCRUDOperations,
  ProductSearchOperations,
  ProductUtilityOperations,
  ProductStateData,
};
