import { useState, useEffect, useCallback } from "react";
import {
  ProductService,
  MigrationService,
  handleFirestoreError,
} from "../services/firestore";
import { products as localProducts } from "../data/products";
import type { Product } from "../data/products";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { db } from "../config/firebase";

interface UseFirebaseProductsReturn {
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
  // Persistence tracking
  persistenceStatus: {
    isConnected: boolean;
    dataSource: "firebase" | "local" | "migrating";
    lastSync: Date | null;
  };
}

export const useFirebaseProducts = (): UseFirebaseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [productStats, setProductStats] = useState({
    total: 0,
    featured: 0,
    available: 0,
    categories: {} as Record<string, number>,
  });
  const [migrationAttempted, setMigrationAttempted] = useState(false);
  const [hasEverHadProducts, setHasEverHadProducts] = useState(() => {
    const savedState = localStorage.getItem("hasEverHadProducts");
    return savedState === "true";
  });
  const [persistenceStatus, setPersistenceStatus] = useState<{
    isConnected: boolean;
    dataSource: "firebase" | "local" | "migrating";
    lastSync: Date | null;
  }>({
    isConnected: false,
    dataSource: "local",
    lastSync: null,
  });

  // Calculate product statistics
  const calculateStats = useCallback((productList: Product[]) => {
    const stats = {
      total: productList.length,
      featured: productList.filter((p) => p.featured).length,
      available: productList.filter((p) => p.available).length,
      categories: {} as Record<string, number>,
    };

    // Count products by category
    productList.forEach((product) => {
      stats.categories[product.category] =
        (stats.categories[product.category] || 0) + 1;
    });

    console.log("📊 Stats recalculated:", {
      total: stats.total,
      featured: stats.featured,
      available: stats.available,
      categories: Object.keys(stats.categories).length,
    });

    setProductStats(stats);
  }, []);

  // Load all products
  // Set up real-time listener for all products
  const setupProductsListener = useCallback(() => {
    try {
      setLoading(true);
      setError(null);

      const productsQuery = query(
        collection(db, "products"),
        orderBy("createdAt", "desc"),
      );

      const unsubscribe = onSnapshot(
        productsQuery,
        (snapshot) => {
          console.log(
            "🔥 REAL-TIME UPDATE: Products listener triggered - snapshot size:",
            snapshot.size,
          );

          // Track changes
          const changes = snapshot.docChanges();
          console.log(
            "🔥 REAL-TIME UPDATE: Document changes detected:",
            changes.length,
          );

          changes.forEach((change) => {
            if (change.type === "added") {
              console.log(
                "🔥 REAL-TIME UPDATE: Product ADDED:",
                change.doc.id,
                change.doc.data().name,
              );
            } else if (change.type === "modified") {
              console.log(
                "🔥 REAL-TIME UPDATE: Product MODIFIED:",
                change.doc.id,
                change.doc.data().name,
              );
            } else if (change.type === "removed") {
              console.log(
                "🔥 REAL-TIME UPDATE: Product REMOVED:",
                change.doc.id,
              );
            }
          });

          const updatedProducts: Product[] = [];

          snapshot.forEach((doc) => {
            const data = doc.data();
            updatedProducts.push({
              ...data,
              id: doc.id,
              createdAt: data.createdAt?.toDate() || new Date(),
              updatedAt: data.updatedAt?.toDate() || new Date(),
            } as Product);
          });

          console.log(
            "🔥 REAL-TIME UPDATE: Products processed:",
            updatedProducts.length,
          );
          console.log(
            "🔥 REAL-TIME UPDATE: Current product IDs:",
            updatedProducts.map((p) => `${p.id}:${p.name}`).slice(0, 5),
          );

          if (updatedProducts.length === 0) {
            console.log("🔥 REAL-TIME UPDATE: No products found in Firestore!");

            // Check environment variable for auto-migration control
            const AUTO_MIGRATION_ENABLED =
              import.meta.env.VITE_AUTO_MIGRATION_ENABLED === "true";

            // Check if this is an intentional deletion vs initial empty state
            if (hasEverHadProducts) {
              console.log(
                "🗑️ ADMIN ACTION: All products were intentionally deleted by admin",
              );
              console.log(
                "🚫 NO AUTO-MIGRATION: Keeping database empty as intended",
              );
              setProducts([]);
              calculateStats([]);
              setPersistenceStatus({
                isConnected: true,
                dataSource: "firebase",
                lastSync: new Date(),
              });
            } else if (!migrationAttempted && AUTO_MIGRATION_ENABLED) {
              console.log(
                "🚀 AUTO-MIGRATION: Firebase is empty on first load, automatically migrating local products for PERSISTENCE...",
              );
              setMigrationAttempted(true);
              setPersistenceStatus({
                isConnected: true,
                dataSource: "migrating",
                lastSync: new Date(),
              });

              // Auto-migrate local products to Firebase for real persistence
              MigrationService.migrateLocalProductsToFirestore(localProducts)
                .then(() => {
                  console.log(
                    "✅ AUTO-MIGRATION: Local products successfully migrated to Firebase!",
                  );
                  console.log(
                    "🔥 AUTO-MIGRATION: Real-time listeners will now update with persisted data",
                  );
                  setHasEverHadProducts(true);
                  localStorage.setItem("hasEverHadProducts", "true");
                  setPersistenceStatus({
                    isConnected: true,
                    dataSource: "firebase",
                    lastSync: new Date(),
                  });
                  // The real-time listener will automatically update with the new data
                })
                .catch((err) => {
                  console.error("❌ AUTO-MIGRATION: Migration failed:", err);
                  console.log(
                    "🔄 AUTO-MIGRATION: Falling back to local data temporarily",
                  );
                  setProducts(localProducts);
                  calculateStats(localProducts);
                  setPersistenceStatus({
                    isConnected: false,
                    dataSource: "local",
                    lastSync: new Date(),
                  });
                });
            } else {
              console.log(
                !AUTO_MIGRATION_ENABLED
                  ? "🚫 AUTO-MIGRATION: Disabled by environment variable, keeping empty state"
                  : "🔄 FALLBACK: Migration already attempted, keeping empty state",
              );
              setProducts([]);
              calculateStats([]);
              setPersistenceStatus({
                isConnected: true,
                dataSource: "firebase",
                lastSync: new Date(),
              });
            }
          } else {
            console.log(
              "🔥 REAL-TIME UPDATE: Setting products state with real-time data",
            );
            setProducts(updatedProducts);
            calculateStats(updatedProducts);
            setHasEverHadProducts(true); // Track that we've had products in Firebase
            localStorage.setItem("hasEverHadProducts", "true");
            setPersistenceStatus({
              isConnected: true,
              dataSource: "firebase",
              lastSync: new Date(),
            });
          }
          setLoading(false);
          console.log(
            "🔥 REAL-TIME UPDATE: Products state updated - triggering re-renders across the app",
          );
          console.log(
            "📊 REAL-TIME UPDATE: Admin panel stats should now be updated in real-time",
          );
          console.log(
            `🔍 PERSISTENCE STATUS: Data source: ${persistenceStatus.dataSource}, Connected: ${persistenceStatus.isConnected}`,
          );
        },
        (err) => {
          console.error("Error in products listener:", err);
          setError(handleFirestoreError(err));
          // Fallback to local products
          setProducts(localProducts);
          calculateStats(localProducts);
          setLoading(false);
        },
      );

      return unsubscribe;
    } catch (err) {
      console.error("Error setting up products listener:", err);
      setError(handleFirestoreError(err));
      setProducts(localProducts);
      calculateStats(localProducts);
      setLoading(false);
      return () => {}; // Return empty cleanup function
    }
  }, [calculateStats]);

  // Set up real-time listener for featured products
  const setupFeaturedProductsListener = useCallback(() => {
    try {
      const featuredQuery = query(
        collection(db, "products"),
        where("available", "==", true),
        where("featured", "==", true),
        orderBy("popularityScore", "desc"),
        limit(6),
      );

      const unsubscribe = onSnapshot(
        featuredQuery,
        (snapshot) => {
          console.log(
            "🔥 Real-time featured products update received - snapshot size:",
            snapshot.size,
          );
          const featured: Product[] = [];

          snapshot.forEach((doc) => {
            const data = doc.data();
            featured.push({
              ...data,
              id: doc.id,
              createdAt: data.createdAt?.toDate() || new Date(),
              updatedAt: data.updatedAt?.toDate() || new Date(),
            } as Product);
          });

          console.log("🔥 Featured products processed:", featured.length);
          console.log(
            "🔥 Featured product names:",
            featured.map((p) => p.name),
          );

          if (featured.length === 0) {
            console.log(
              "🔥 No featured products found in database - showing empty state",
            );
            setFeaturedProducts([]);
          } else {
            console.log(
              "🔥 Setting featured products state with real-time data",
            );
            setFeaturedProducts(featured);
          }
          console.log(
            "🔥 Featured products state updated - will update hero/menu sections",
          );
        },
        (err) => {
          console.error("Error in featured products listener:", err);
          setFeaturedProducts([]);
          setError("Error loading featured products");
        },
      );

      return unsubscribe;
    } catch (err) {
      console.error("Error setting up featured products listener:", err);
      setFeaturedProducts([]);
      setError("Error setting up featured products listener");
      return () => {}; // Return empty cleanup function
    }
  }, []);

  // Create new product
  const createProduct = useCallback(
    async (
      productData: Omit<Product, "id" | "createdAt" | "updatedAt">,
    ): Promise<string | null> => {
      try {
        setError(null);
        const productId = await ProductService.createProduct(productData);

        // Real-time listeners will automatically update the UI
        console.log(
          "✅ PRODUCT CREATED: Product created with ID:",
          productId,
          "- real-time listeners will update UI across all pages",
        );
        console.log(
          "📊 PRODUCT CREATED: Stats will auto-update via real-time listener",
        );

        return productId;
      } catch (err) {
        console.error("Error creating product:", err);
        setError(handleFirestoreError(err));
        return null;
      }
    },
    [],
  );

  // Update existing product
  const updateProduct = useCallback(
    async (
      id: string,
      productData: Partial<Omit<Product, "id" | "createdAt">>,
    ): Promise<boolean> => {
      try {
        setError(null);
        await ProductService.updateProduct(id, productData);

        // Real-time listeners will automatically update the UI
        console.log(
          "✅ PRODUCT UPDATED: Product updated with ID:",
          id,
          "- real-time listeners will update UI across all pages",
        );
        console.log(
          "📊 PRODUCT UPDATED: Stats will auto-update via real-time listener",
        );

        return true;
      } catch (err) {
        console.error("Error updating product:", err);
        setError(handleFirestoreError(err));
        return false;
      }
    },
    [],
  );

  // Delete product
  const deleteProduct = useCallback(
    async (id: string): Promise<boolean> => {
      try {
        setError(null);

        console.log(
          "🗑️ PRODUCT DELETE: Starting deletion process for product ID:",
          id,
        );
        console.log(
          `🔍 PERSISTENCE CHECK: Current data source: ${persistenceStatus.dataSource}, Connected: ${persistenceStatus.isConnected}`,
        );

        // Check if we're working with Firebase data or local fallback
        if (persistenceStatus.dataSource === "local") {
          console.error(
            "❌ PERSISTENCE ERROR: Cannot delete - currently using local data fallback!",
          );
          console.error(
            "💡 SOLUTION: Wait for auto-migration to complete or manually trigger migration",
          );
          setError(
            "No se puede eliminar: datos no sincronizados con Firebase. Intenta migrar los datos primero.",
          );
          return false;
        }

        // Find the product in our current state to verify it exists
        const productToDelete = products.find((p) => p.id === id);
        if (!productToDelete) {
          console.error(
            "❌ PRODUCT DELETE ERROR: Product not found in current state!",
          );
          console.error(
            "🔍 Available product IDs:",
            products.map((p) => p.id),
          );
          setError("Producto no encontrado en el estado actual.");
          return false;
        }

        console.log("✅ PRODUCT FOUND:", productToDelete.name);

        // Get current product count before deletion
        const currentCount = products.length;
        console.log(
          "🗑️ PRODUCT DELETE: Current products count before deletion:",
          currentCount,
        );

        await ProductService.deleteProduct(id);

        // Real-time listeners will automatically update the UI
        console.log(
          "✅ PRODUCT DELETE: Product deleted with ID:",
          id,
          "- real-time listeners will update UI across all pages",
        );
        console.log(
          "📊 PRODUCT DELETE: Stats will auto-update via real-time listener",
        );
        console.log("📊 PRODUCT DELETE: Expected new count:", currentCount - 1);

        return true;
      } catch (err) {
        console.error("🗑️ PRODUCT DELETE ERROR: Error deleting product:", err);
        console.error("🔍 Error details:", {
          message: err instanceof Error ? err.message : String(err),
          productId: id,
          persistenceStatus: persistenceStatus,
          currentProductCount: products.length,
        });
        setError(handleFirestoreError(err));
        return false;
      }
    },
    [products, persistenceStatus],
  );

  // Search products
  const searchProducts = useCallback(
    async (term: string): Promise<Product[]> => {
      try {
        setError(null);
        return await ProductService.searchProducts(term);
      } catch (err) {
        console.error("Error searching products:", err);
        setError(handleFirestoreError(err));

        // Fallback to local search
        const searchTermLower = term.toLowerCase();
        return localProducts.filter(
          (product) =>
            product.name.toLowerCase().includes(searchTermLower) ||
            product.description.toLowerCase().includes(searchTermLower) ||
            product.tags.some((tag) =>
              tag.toLowerCase().includes(searchTermLower),
            ) ||
            product.category.toLowerCase().includes(searchTermLower),
        );
      }
    },
    [],
  );

  // Get products by category
  const getProductsByCategory = useCallback(
    async (category: string): Promise<Product[]> => {
      try {
        setError(null);
        return await ProductService.getProductsByCategory(category);
      } catch (err) {
        console.error("Error getting products by category:", err);
        setError(handleFirestoreError(err));

        // Fallback to local filter
        return localProducts.filter((product) => product.category === category);
      }
    },
    [],
  );

  // Get product by ID
  const getProductById = useCallback(
    async (id: string): Promise<Product | null> => {
      try {
        setError(null);
        const firestoreProduct = await ProductService.getProductById(id);

        // If Firebase returns null, check local products as fallback
        if (firestoreProduct === null) {
          console.log(
            `Product ${id} not found in Firebase, checking local products...`,
          );
          const localProduct =
            localProducts.find((product) => product.id === id) || null;
          if (localProduct) {
            console.log(`Found product ${id} in local data as fallback`);
          } else {
            console.log(`Product ${id} not found in local data either`);
          }
          return localProduct;
        }

        return firestoreProduct;
      } catch (err) {
        console.error("Error getting product by ID:", err);
        setError(handleFirestoreError(err));

        // Fallback to local find on error
        console.log(`Firebase error for product ${id}, using local fallback`);
        return localProducts.find((product) => product.id === id) || null;
      }
    },
    [],
  );

  // Refresh products manually (for backwards compatibility)
  const refreshProducts = useCallback(async (): Promise<void> => {
    console.log(
      "Manual refresh triggered - real-time listeners should handle updates automatically",
    );
    // Real-time listeners handle updates automatically, but we can force a re-setup if needed
  }, []);

  // Migrate local data to Firestore
  const migrateLocalData = useCallback(async (): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      await MigrationService.migrateLocalProductsToFirestore(localProducts);

      // Real-time listeners will automatically update after migration
      console.log("Migration complete - real-time listeners will update UI");

      return true;
    } catch (err) {
      console.error("Error during migration:", err);
      setError(handleFirestoreError(err));
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Reset product state utility function (for development/testing)
  const resetProductState = useCallback(() => {
    console.log("🔄 RESET: Clearing product state and localStorage");
    localStorage.removeItem("hasEverHadProducts");
    setHasEverHadProducts(false);
    setMigrationAttempted(false);
    console.log(
      "✅ RESET: Product state cleared - next reload will trigger migration if no products exist",
    );
  }, []);

  // Set up real-time listeners
  useEffect(() => {
    console.log(
      "🔥 Setting up real-time Firebase listeners for products and featured products",
    );
    console.log(
      "🔥 These listeners will automatically update the admin panel, menu, and entire site",
    );

    // Set up real-time listeners
    const unsubscribeProducts = setupProductsListener();
    const unsubscribeFeatured = setupFeaturedProductsListener();

    console.log(
      "🔥 Real-time listeners established - the app will now update automatically on any changes",
    );

    // Cleanup function
    return () => {
      console.log("🔥 Cleaning up Firebase listeners");
      if (typeof unsubscribeProducts === "function") {
        unsubscribeProducts();
      }
      if (typeof unsubscribeFeatured === "function") {
        unsubscribeFeatured();
      }
    };
  }, [setupProductsListener, setupFeaturedProductsListener]);

  return {
    products,
    loading,
    error,
    featuredProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    getProductsByCategory,
    getProductById,
    refreshProducts,
    migrateLocalData,
    resetProductState,
    productStats,
    persistenceStatus,
  };
};

export default useFirebaseProducts;
