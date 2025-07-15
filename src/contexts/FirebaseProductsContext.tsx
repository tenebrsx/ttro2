import * as React from "react";
import { createContext, useContext, ReactNode } from "react";
import { useFirebaseProducts } from "../hooks/useFirebaseProducts";
import type { Product } from "../data/products";

interface FirebaseProductsContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  featuredProducts: Product[];
  // CRUD operations
  createProduct: (
    productData: Omit<Product, "id" | "createdAt" | "updatedAt">,
  ) => Promise<string | null>;
  updateProduct: (
    id: string,
    productData: Partial<Omit<Product, "id" | "createdAt">>,
  ) => Promise<boolean>;
  deleteProduct: (id: string) => Promise<boolean>;
  // Search and filter
  searchProducts: (term: string) => Promise<Product[]>;
  getProductsByCategory: (category: string) => Promise<Product[]>;
  getProductById: (id: string) => Promise<Product | null>;
  // Utility functions
  refreshProducts: () => Promise<void>;
  migrateLocalData: () => Promise<boolean>;
  resetProductState: () => void;
  // Statistics
  productStats: {
    total: number;
    featured: number;
    available: number;
    categories: Record<string, number>;
  };
}

const FirebaseProductsContext = createContext<
  FirebaseProductsContextType | undefined
>(undefined);

interface FirebaseProductsProviderProps {
  children: ReactNode;
}

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

export const useFirebaseProductsContext = (): FirebaseProductsContextType => {
  const context = useContext(FirebaseProductsContext);
  if (context === undefined) {
    throw new Error(
      "useFirebaseProductsContext must be used within a FirebaseProductsProvider",
    );
  }
  return context;
};

// Hook for components that only need specific parts of the context
export const useProducts = () => {
  const { products, loading, error } = useFirebaseProductsContext();
  return { products, loading, error };
};

export const useFeaturedProducts = () => {
  const { featuredProducts, loading, error } = useFirebaseProductsContext();
  return { featuredProducts, loading, error };
};

export const useProductSearch = () => {
  const { searchProducts, getProductsByCategory, getProductById } =
    useFirebaseProductsContext();
  return { searchProducts, getProductsByCategory, getProductById };
};

export const useProductManagement = () => {
  const {
    createProduct,
    updateProduct,
    deleteProduct,
    refreshProducts,
    migrateLocalData,
    resetProductState,
  } = useFirebaseProductsContext();
  return {
    createProduct,
    updateProduct,
    deleteProduct,
    refreshProducts,
    migrateLocalData,
    resetProductState,
  };
};

export const useProductStats = () => {
  const { productStats } = useFirebaseProductsContext();
  return { productStats };
};

export default FirebaseProductsContext;
