import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  writeBatch,
  setDoc,
  serverTimestamp,
  Timestamp,
  DocumentSnapshot,
} from "firebase/firestore";
import { db } from "../config/firebase";
import type { Product } from "../data/products";

// Collections
export const COLLECTIONS = {
  PRODUCTS: "products",
  CATEGORIES: "categories",
  ORDERS: "orders",
  SETTINGS: "settings",
} as const;

// Firestore Product type (with Firestore Timestamps)
export interface FirestoreProduct
  extends Omit<Product, "createdAt" | "updatedAt"> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Convert Firestore document to Product
const convertFirestoreToProduct = (doc: DocumentSnapshot): Product | null => {
  if (!doc.exists()) return null;

  const data = doc.data() as FirestoreProduct;
  return {
    ...data,
    id: doc.id,
    createdAt: data.createdAt?.toDate() || new Date(),
    updatedAt: data.updatedAt?.toDate() || new Date(),
  };
};

// Convert Product to Firestore format
const convertProductToFirestore = (
  product: Omit<Product, "id" | "createdAt" | "updatedAt">,
): Omit<FirestoreProduct, "id"> => {
  return {
    ...product,
    createdAt: serverTimestamp() as Timestamp,
    updatedAt: serverTimestamp() as Timestamp,
  };
};

// Product Services
export class ProductService {
  // Get all products
  static async getAllProducts(): Promise<Product[]> {
    try {
      const productsRef = collection(db, COLLECTIONS.PRODUCTS);
      const q = query(productsRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs
        .map((doc) => convertFirestoreToProduct(doc))
        .filter(Boolean) as Product[];
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error("Failed to fetch products");
    }
  }

  // Get product by ID
  static async getProductById(id: string): Promise<Product | null> {
    try {
      const productDoc = await getDoc(doc(db, COLLECTIONS.PRODUCTS, id));
      return convertFirestoreToProduct(productDoc);
    } catch (error) {
      console.error("Error fetching product:", error);
      throw new Error("Failed to fetch product");
    }
  }

  // Get products by category
  static async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const productsRef = collection(db, COLLECTIONS.PRODUCTS);
      const q = query(
        productsRef,
        where("category", "==", category),
        orderBy("popularityScore", "desc"),
      );
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs
        .map((doc) => convertFirestoreToProduct(doc))
        .filter(Boolean) as Product[];
    } catch (error) {
      console.error("Error fetching products by category:", error);
      throw new Error("Failed to fetch products by category");
    }
  }

  // Get featured products
  static async getFeaturedProducts(): Promise<Product[]> {
    try {
      const productsRef = collection(db, COLLECTIONS.PRODUCTS);
      const q = query(
        productsRef,
        where("featured", "==", true),
        where("available", "==", true),
        orderBy("popularityScore", "desc"),
        limit(6),
      );
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs
        .map((doc) => convertFirestoreToProduct(doc))
        .filter(Boolean) as Product[];
    } catch (error) {
      console.error("Error fetching featured products:", error);
      throw new Error("Failed to fetch featured products");
    }
  }

  // Get available products
  static async getAvailableProducts(): Promise<Product[]> {
    try {
      const productsRef = collection(db, COLLECTIONS.PRODUCTS);
      const q = query(
        productsRef,
        where("available", "==", true),
        orderBy("popularityScore", "desc"),
      );
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs
        .map((doc) => convertFirestoreToProduct(doc))
        .filter(Boolean) as Product[];
    } catch (error) {
      console.error("Error fetching available products:", error);
      throw new Error("Failed to fetch available products");
    }
  }

  // Search products
  static async searchProducts(searchTerm: string): Promise<Product[]> {
    try {
      const productsRef = collection(db, COLLECTIONS.PRODUCTS);
      const querySnapshot = await getDocs(productsRef);

      const searchTermLower = searchTerm.toLowerCase();

      return querySnapshot.docs
        .map((doc) => convertFirestoreToProduct(doc))
        .filter(Boolean)
        .filter(
          (product) =>
            product!.name.toLowerCase().includes(searchTermLower) ||
            product!.description.toLowerCase().includes(searchTermLower) ||
            product!.tags.some((tag) =>
              tag.toLowerCase().includes(searchTermLower),
            ) ||
            product!.category.toLowerCase().includes(searchTermLower),
        ) as Product[];
    } catch (error) {
      console.error("Error searching products:", error);
      throw new Error("Failed to search products");
    }
  }

  // Create new product
  static async createProduct(
    productData: Omit<Product, "id" | "createdAt" | "updatedAt">,
  ): Promise<string> {
    try {
      console.log("🔥 FIREBASE: Creating product with data:", productData);

      // Validate required fields
      if (!productData.name || !productData.description || !productData.price) {
        throw new Error("Missing required fields: name, description, or price");
      }

      const firestoreData = convertProductToFirestore(productData);
      console.log("🔥 FIREBASE: Converted to Firestore format:", firestoreData);

      // Test Firebase connection first
      console.log("🔥 FIREBASE: Testing connection...");
      const testRef = collection(db, COLLECTIONS.PRODUCTS);
      console.log("🔥 FIREBASE: Collection reference created:", testRef);

      console.log("🔥 FIREBASE: Attempting to add document...");
      const docRef = await addDoc(testRef, firestoreData);

      console.log("🔥 FIREBASE: Product created successfully with ID:", docRef.id);
      return docRef.id;
    } catch (error) {
      console.error("🔥 FIREBASE: Detailed error creating product:");
      console.error("🔥 FIREBASE: - Error message:", error instanceof Error ? error.message : String(error));
      console.error("🔥 FIREBASE: - Error object:", error);
      console.error("🔥 FIREBASE: - Error code:", (error as any)?.code);
      console.error("🔥 FIREBASE: - Error name:", (error as any)?.name);
      console.error("🔥 FIREBASE: - Full error:", JSON.stringify(error, null, 2));
      console.error("🔥 FIREBASE: - Product data that failed:", productData);

      // Re-throw with more specific error message
      if (error instanceof Error) {
        throw new Error(`Failed to create product: ${error.message}`);
      } else {
        throw new Error("Failed to create product: Unknown error");
      }
    }
  }

  // Update product
  static async updateProduct(
    id: string,
    productData: Partial<Omit<Product, "id" | "createdAt">>,
  ): Promise<void> {
    try {
      const productRef = doc(db, COLLECTIONS.PRODUCTS, id);
      const updateData = {
        ...productData,
        updatedAt: serverTimestamp(),
      };
      await updateDoc(productRef, updateData);
    } catch (error) {
      console.error("Error updating product:", error);
      throw new Error("Failed to update product");
    }
  }

  // Delete product
  static async deleteProduct(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, COLLECTIONS.PRODUCTS, id));
    } catch (error) {
      console.error("Error deleting product:", error);
      throw new Error("Failed to delete product");
    }
  }

  // Bulk update products (for migration or batch operations)
  static async bulkUpdateProducts(products: Product[]): Promise<void> {
    try {
      const batch = writeBatch(db);

      products.forEach((product) => {
        const productRef = doc(db, COLLECTIONS.PRODUCTS, product.id);
        const firestoreData = {
          ...product,
          createdAt: Timestamp.fromDate(product.createdAt),
          updatedAt: serverTimestamp(),
        };
        delete (firestoreData as Record<string, unknown>).id; // Remove id from data
        batch.set(productRef, firestoreData);
      });

      await batch.commit();
    } catch (error) {
      console.error("Error bulk updating products:", error);
      throw new Error("Failed to bulk update products");
    }
  }

  // Real-time listener for products
  static subscribeToProducts(
    callback: (products: Product[]) => void,
  ): () => void {
    const productsRef = collection(db, COLLECTIONS.PRODUCTS);
    const q = query(productsRef, orderBy("createdAt", "desc"));

    return onSnapshot(
      q,
      (querySnapshot) => {
        const products = querySnapshot.docs
          .map((doc) => convertFirestoreToProduct(doc))
          .filter(Boolean) as Product[];
        callback(products);
      },
      (error) => {
        console.error("Error in products subscription:", error);
      },
    );
  }

  // Real-time listener for featured products
  static subscribeToFeaturedProducts(
    callback: (products: Product[]) => void,
  ): () => void {
    const productsRef = collection(db, COLLECTIONS.PRODUCTS);
    const q = query(
      productsRef,
      where("featured", "==", true),
      where("available", "==", true),
      orderBy("popularityScore", "desc"),
      limit(6),
    );

    return onSnapshot(
      q,
      (querySnapshot) => {
        const products = querySnapshot.docs
          .map((doc) => convertFirestoreToProduct(doc))
          .filter(Boolean) as Product[];
        callback(products);
      },
      (error) => {
        console.error("Error in featured products subscription:", error);
      },
    );
  }

  // Get products count by category
  static async getProductsCountByCategory(): Promise<Record<string, number>> {
    try {
      const productsRef = collection(db, COLLECTIONS.PRODUCTS);
      const querySnapshot = await getDocs(productsRef);

      const categoryCount: Record<string, number> = {};

      querySnapshot.docs.forEach((doc) => {
        const product = convertFirestoreToProduct(doc);
        if (product) {
          categoryCount[product.category] =
            (categoryCount[product.category] || 0) + 1;
        }
      });

      return categoryCount;
    } catch (error) {
      console.error("Error getting products count by category:", error);
      throw new Error("Failed to get products count by category");
    }
  }
}

// Settings Service for admin configuration
export class SettingsService {
  static async getSettings(): Promise<Record<string, unknown>> {
    try {
      const settingsDoc = await getDoc(
        doc(db, COLLECTIONS.SETTINGS, "general"),
      );
      return settingsDoc.exists() ? settingsDoc.data() : {};
    } catch (error) {
      console.error("Error fetching settings:", error);
      throw new Error("Failed to fetch settings");
    }
  }

  static async updateSettings(
    settings: Record<string, unknown>,
  ): Promise<void> {
    try {
      const settingsRef = doc(db, COLLECTIONS.SETTINGS, "general");
      await updateDoc(settingsRef, {
        ...settings,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error updating settings:", error);
      throw new Error("Failed to update settings");
    }
  }
}

// Migration utility to move existing data to Firestore
export class MigrationService {
  static async migrateLocalProductsToFirestore(
    localProducts: Product[],
  ): Promise<void> {
    try {
      console.log("Starting migration of", localProducts.length, "products...");

      // Check if products already exist
      const existingProducts = await ProductService.getAllProducts();

      if (existingProducts.length > 0) {
        console.log("Products already exist in Firestore. Skipping migration.");
        return;
      }

      // Migrate products in batches
      const batchSize = 10;
      const batches = [];

      for (let i = 0; i < localProducts.length; i += batchSize) {
        const batch = localProducts.slice(i, i + batchSize);
        batches.push(batch);
      }

      for (const batch of batches) {
        const promises = batch.map(async (product) => {
          const { id, ...productData } = product;
          const firestoreData = convertProductToFirestore(productData);
          const productRef = doc(db, COLLECTIONS.PRODUCTS, id);
          await setDoc(productRef, firestoreData);
          return id;
        });

        await Promise.all(promises);
        console.log(`Migrated batch of ${batch.length} products`);
      }

      console.log("Migration completed successfully!");
    } catch (error) {
      console.error("Error during migration:", error);
      throw new Error("Failed to migrate products to Firestore");
    }
  }
}

// Error handling utility
export const handleFirestoreError = (error: {
  code?: string;
  message?: string;
}): string => {
  if (error.code) {
    switch (error.code) {
      case "permission-denied":
        return "No tienes permisos para realizar esta acción";
      case "not-found":
        return "El elemento solicitado no fue encontrado";
      case "already-exists":
        return "El elemento ya existe";
      case "unavailable":
        return "Servicio temporalmente no disponible. Intenta de nuevo.";
      default:
        return "Error inesperado. Por favor intenta de nuevo.";
    }
  }
  return "Error de conexión. Verifica tu conexión a internet.";
};
