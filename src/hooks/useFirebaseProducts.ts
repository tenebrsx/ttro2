import { useState, useEffect, useCallback } from 'react';
import { ProductService, MigrationService, handleFirestoreError } from '../services/firestore';
import { products as localProducts } from '../data/products';
import type { Product } from '../data/products';

interface UseFirebaseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  featuredProducts: Product[];
  // CRUD operations
  createProduct: (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Promise<string | null>;
  updateProduct: (id: string, productData: Partial<Omit<Product, 'id' | 'createdAt'>>) => Promise<boolean>;
  deleteProduct: (id: string) => Promise<boolean>;
  // Search and filter
  searchProducts: (term: string) => Promise<Product[]>;
  getProductsByCategory: (category: string) => Promise<Product[]>;
  getProductById: (id: string) => Promise<Product | null>;
  // Utility functions
  refreshProducts: () => Promise<void>;
  migrateLocalData: () => Promise<boolean>;
  // Statistics
  productStats: {
    total: number;
    featured: number;
    available: number;
    categories: Record<string, number>;
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
    categories: {} as Record<string, number>
  });

  // Calculate product statistics
  const calculateStats = useCallback((productList: Product[]) => {
    const stats = {
      total: productList.length,
      featured: productList.filter(p => p.featured).length,
      available: productList.filter(p => p.available).length,
      categories: {} as Record<string, number>
    };

    // Count products by category
    productList.forEach(product => {
      stats.categories[product.category] = (stats.categories[product.category] || 0) + 1;
    });

    setProductStats(stats);
  }, []);

  // Load all products
  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const fetchedProducts = await ProductService.getAllProducts();

      // If no products in Firestore, try to migrate from local data
      if (fetchedProducts.length === 0) {
        console.log('No products found in Firestore, using local data...');
        setProducts(localProducts);
        calculateStats(localProducts);
      } else {
        setProducts(fetchedProducts);
        calculateStats(fetchedProducts);
      }
    } catch (err) {
      console.error('Error loading products:', err);
      setError(handleFirestoreError(err));
      // Fallback to local products
      setProducts(localProducts);
      calculateStats(localProducts);
    } finally {
      setLoading(false);
    }
  }, [calculateStats]);

  // Load featured products
  const loadFeaturedProducts = useCallback(async () => {
    try {
      const featured = await ProductService.getFeaturedProducts();
      setFeaturedProducts(featured);
    } catch (err) {
      console.error('Error loading featured products:', err);
      // Fallback to local featured products
      const localFeatured = localProducts.filter(p => p.featured && p.available).slice(0, 6);
      setFeaturedProducts(localFeatured);
    }
  }, []);

  // Create new product
  const createProduct = useCallback(async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<string | null> => {
    try {
      setError(null);
      const productId = await ProductService.createProduct(productData);

      // Refresh products after creation
      await loadProducts();
      await loadFeaturedProducts();

      return productId;
    } catch (err) {
      console.error('Error creating product:', err);
      setError(handleFirestoreError(err));
      return null;
    }
  }, [loadProducts, loadFeaturedProducts]);

  // Update existing product
  const updateProduct = useCallback(async (id: string, productData: Partial<Omit<Product, 'id' | 'createdAt'>>): Promise<boolean> => {
    try {
      setError(null);
      await ProductService.updateProduct(id, productData);

      // Refresh products after update
      await loadProducts();
      await loadFeaturedProducts();

      return true;
    } catch (err) {
      console.error('Error updating product:', err);
      setError(handleFirestoreError(err));
      return false;
    }
  }, [loadProducts, loadFeaturedProducts]);

  // Delete product
  const deleteProduct = useCallback(async (id: string): Promise<boolean> => {
    try {
      setError(null);
      await ProductService.deleteProduct(id);

      // Refresh products after deletion
      await loadProducts();
      await loadFeaturedProducts();

      return true;
    } catch (err) {
      console.error('Error deleting product:', err);
      setError(handleFirestoreError(err));
      return false;
    }
  }, [loadProducts, loadFeaturedProducts]);

  // Search products
  const searchProducts = useCallback(async (term: string): Promise<Product[]> => {
    try {
      setError(null);
      return await ProductService.searchProducts(term);
    } catch (err) {
      console.error('Error searching products:', err);
      setError(handleFirestoreError(err));

      // Fallback to local search
      const searchTermLower = term.toLowerCase();
      return localProducts.filter(product =>
        product.name.toLowerCase().includes(searchTermLower) ||
        product.description.toLowerCase().includes(searchTermLower) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTermLower)) ||
        product.category.toLowerCase().includes(searchTermLower)
      );
    }
  }, []);

  // Get products by category
  const getProductsByCategory = useCallback(async (category: string): Promise<Product[]> => {
    try {
      setError(null);
      return await ProductService.getProductsByCategory(category);
    } catch (err) {
      console.error('Error getting products by category:', err);
      setError(handleFirestoreError(err));

      // Fallback to local filter
      return localProducts.filter(product => product.category === category);
    }
  }, []);

  // Get product by ID
  const getProductById = useCallback(async (id: string): Promise<Product | null> => {
    try {
      setError(null);
      return await ProductService.getProductById(id);
    } catch (err) {
      console.error('Error getting product by ID:', err);
      setError(handleFirestoreError(err));

      // Fallback to local find
      return localProducts.find(product => product.id === id) || null;
    }
  }, []);

  // Refresh products manually
  const refreshProducts = useCallback(async (): Promise<void> => {
    await loadProducts();
    await loadFeaturedProducts();
  }, [loadProducts, loadFeaturedProducts]);

  // Migrate local data to Firestore
  const migrateLocalData = useCallback(async (): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      await MigrationService.migrateLocalProductsToFirestore(localProducts);

      // Refresh products after migration
      await loadProducts();
      await loadFeaturedProducts();

      return true;
    } catch (err) {
      console.error('Error during migration:', err);
      setError(handleFirestoreError(err));
      return false;
    } finally {
      setLoading(false);
    }
  }, [loadProducts, loadFeaturedProducts]);

  // Set up real-time listeners
  useEffect(() => {
    setLoading(true);
    setError(null);

    let unsubscribeProducts: (() => void) | null = null;
    let unsubscribeFeatured: (() => void) | null = null;

    const initialize = async () => {
      try {
        // Fetch initial data first to unblock the UI
        const initialProducts = await ProductService.getAllProducts();
        const initialFeatured = await ProductService.getFeaturedProducts();

        if (initialProducts.length === 0) {
          console.log("No products in Firestore, using local fallback.");
          setProducts(localProducts);
          calculateStats(localProducts);
          setFeaturedProducts(localProducts.filter(p => p.featured && p.available).slice(0, 6));
        } else {
          setProducts(initialProducts);
          calculateStats(initialProducts);
          setFeaturedProducts(initialFeatured);
        }

        // With initial data loaded, stop the loading state
        setLoading(false);

        // Now, subscribe to real-time updates for subsequent changes
        unsubscribeProducts = ProductService.subscribeToProducts((updatedProducts) => {
          setProducts(updatedProducts);
          calculateStats(updatedProducts);
        });

        unsubscribeFeatured = ProductService.subscribeToFeaturedProducts((updatedFeatured) => {
          setFeaturedProducts(updatedFeatured);
        });

      } catch (err) {
        console.error("Failed to initialize Firebase products:", err);
        setError(handleFirestoreError(err));
        // Fallback to local data on any initialization error
        setProducts(localProducts);
        calculateStats(localProducts);
        setFeaturedProducts(localProducts.filter(p => p.featured && p.available).slice(0, 6));
        setLoading(false);
      }
    };

    initialize();

    // Cleanup listeners on unmount
    return () => {
      if (unsubscribeProducts) unsubscribeProducts();
      if (unsubscribeFeatured) unsubscribeFeatured();
    };
  }, [calculateStats]); // Effect only needs to re-run if calculateStats changes

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
    productStats
  };
};

export default useFirebaseProducts;
