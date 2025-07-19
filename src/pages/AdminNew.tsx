import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Star,
  Search,
  Users,
  Clock,
  AlertTriangle,
  LogOut,
  Eye,
  EyeOff,
  Package,
  TrendingUp,
  Shield,
  Monitor,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { formatPrice } from "../utils/currency";

import Button from "../components/Button";
import { SophisticatedButton } from "../components/animations/SophisticatedAnimations";
import DragDropImageUpload from "../components/admin/DragDropImageUpload";

import type { Product } from "../data/products";
import { useFirebaseProducts } from "../hooks/useFirebaseProducts";
import { useAuth } from "../contexts/AuthContext";
import SessionManager from "../components/admin/SessionManager";

type AdminPanelProps = object;

const Admin: React.FC<AdminPanelProps> = () => {
  const { isAuthenticated, login, logout, allSessions, currentSession } =
    useAuth();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showSessionManager, setShowSessionManager] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingDessert, setEditingDessert] = useState<Product | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null,
  );
  const [isOperationLoading, setIsOperationLoading] = useState(false);
  const [showMigrationDialog, setShowMigrationDialog] = useState(false);
  const [migrationStatus, setMigrationStatus] = useState<string>("");

  // Firebase integration
  const {
    products: desserts,
    loading: isLoading,
    error: firebaseError,
    createProduct,
    updateProduct,
    deleteProduct,
    refreshProducts,
    migrateLocalData,
    resetProductState,
    productStats,
    persistenceStatus,
  } = useFirebaseProducts();

  // Track changes to desserts array
  useEffect(() => {
    // Component state updated
  }, [desserts, isLoading]);

  // Authentication
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsOperationLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const success = await login(password);
    if (success) {
      setPassword("");
    } else {
      alert("Contraseña incorrecta");
    }
    setIsOperationLoading(false);
  };

  const handleLogout = async () => {
    await logout();
  };

  // Form state for adding/editing desserts
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    shortDescription: "",
    price: "",
    originalPrice: 0,
    category: "tartas" as
      | "tartas"
      | "macarons"
      | "cupcakes"
      | "galletas"
      | "postres-especiales"
      | "temporada"
      | "otro",
    subcategory: "",
    customCategory: "",
    images: [""],
    thumbnailImage: "",
    preparationTime: "",
    serves: "",
    difficulty: "Fácil" as "Fácil" | "Intermedio" | "Avanzado",
    customizations: [""],
    allergens: [""],
    dietaryOptions: [""],
    ingredients: [""],
    tags: [""],
    featured: false,
    available: true,
    seasonal: false,
    popularityScore: 0,
    rating: 0,
    reviewsCount: 0,

    seo: {
      metaTitle: "",
      metaDescription: "",
      keywords: [""],
    },
  });

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      shortDescription: "",
      price: "",
      originalPrice: 0,
      category: "tartas",
      subcategory: "",
      customCategory: "",
      images: [""],
      thumbnailImage: "",
      preparationTime: "2-3 días",
      serves: "8-10 personas",
      difficulty: "Fácil",
      customizations: [],
      allergens: [],
      dietaryOptions: [],
      ingredients: [],
      tags: [],
      featured: false,
      available: true,
      seasonal: false,
      popularityScore: 50,
      rating: 5,
      reviewsCount: 0,

      seo: {
        metaTitle: "",
        metaDescription: "",
        keywords: [],
      },
    });
    setIsEditing(false);
    setEditingDessert(null);
    setShowAddForm(false);
  };

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else if (type === "number") {
      setFormData((prev) => ({
        ...prev,
        [name]: value === "" ? 0 : parseFloat(value) || 0,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Edit dessert
  const editDessert = (dessert: Product) => {
    setFormData({
      name: dessert.name,
      description: dessert.description,
      shortDescription: dessert.shortDescription,
      price: dessert.price.toString(),
      originalPrice: dessert.originalPrice || 0,
      category: dessert.category as
        | "tartas"
        | "macarons"
        | "cupcakes"
        | "galletas"
        | "postres-especiales"
        | "temporada"
        | "otro",
      subcategory: dessert.subcategory || "",
      customCategory: "",
      images: dessert.images,
      thumbnailImage: dessert.thumbnailImage || "",
      preparationTime: dessert.preparationTime,
      serves: dessert.serves,
      difficulty: dessert.difficulty,
      customizations: dessert.customizations,
      allergens: dessert.allergens,
      dietaryOptions: dessert.dietaryOptions,
      ingredients: dessert.ingredients,
      tags: dessert.tags,
      featured: dessert.featured,
      available: dessert.available,
      seasonal: dessert.seasonal,
      popularityScore: dessert.popularityScore,
      rating: dessert.rating,
      reviewsCount: dessert.reviewsCount,

      seo: dessert.seo,
    });
    setIsEditing(true);
    setEditingDessert(dessert);
    setShowAddForm(true);
  };

  // Save dessert
  const saveDessert = async () => {
    // Enhanced validation
    if (
      !formData.name ||
      !formData.description ||
      !formData.price ||
      parseFloat(formData.price.toString()) <= 0
    ) {
      alert(
        "Por favor completa todos los campos obligatorios: nombre, descripción y precio",
      );
      return;
    }

    // Validate custom category when "otro" is selected
    if (formData.category === "otro" && !formData.customCategory.trim()) {
      alert("Por favor ingresa una categoría personalizada");
      return;
    }

    // Validate that at least thumbnail image or one image is provided
    const hasImages =
      formData.images.some((img) => img.trim() !== "") ||
      formData.thumbnailImage.trim() !== "";
    if (!hasImages) {
      alert(
        "Por favor agrega al menos una imagen del producto (imagen principal o imágenes adicionales)",
      );
      return;
    }

    if (!formData.shortDescription) {
      alert("Por favor agrega una descripción corta");
      return;
    }

    // Helper function to remove undefined values from object
    const removeUndefinedValues = (obj: any): any => {
      const cleaned: any = {};
      for (const [key, value] of Object.entries(obj)) {
        if (value !== undefined) {
          if (
            typeof value === "object" &&
            value !== null &&
            !Array.isArray(value)
          ) {
            cleaned[key] = removeUndefinedValues(value);
          } else {
            cleaned[key] = value;
          }
        }
      }
      return cleaned;
    };

    if (!formData.preparationTime || !formData.serves) {
      alert("Por favor completa el tiempo de preparación y las porciones");
      return;
    }

    setIsOperationLoading(true);

    try {
      // Filter and prepare arrays
      const filteredImages = formData.images.filter((img) => img.trim() !== "");
      const filteredCustomizations = formData.customizations.filter(
        (c) => c.trim() !== "",
      );
      const filteredAllergens = formData.allergens.filter(
        (a) => a.trim() !== "",
      );
      const filteredDietaryOptions = formData.dietaryOptions.filter(
        (d) => d.trim() !== "",
      );
      const filteredIngredients = formData.ingredients.filter(
        (i) => i.trim() !== "",
      );
      const filteredTags = formData.tags.filter((t) => t.trim() !== "");
      const filteredKeywords =
        formData.seo?.keywords?.filter((k) => k.trim() !== "") || [];

      // Ensure we have at least one image
      // Allow empty images array - no automatic placeholder addition

      // Ensure we have default values for optional fields
      const defaultSeo = {
        metaTitle: formData.seo?.metaTitle?.trim() || formData.name,
        metaDescription:
          formData.seo?.metaDescription?.trim() || formData.shortDescription,
        keywords:
          filteredKeywords.length > 0
            ? filteredKeywords
            : [
                formData.name,
                formData.category === "otro" && formData.customCategory.trim()
                  ? formData.customCategory.trim()
                  : formData.category,
              ].filter(Boolean),
      };

      const dessertData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        shortDescription: formData.shortDescription.trim(),
        price: Number(formData.price),
        originalPrice:
          formData.originalPrice > 0 ? Number(formData.originalPrice) : 0,
        category:
          formData.category === "otro"
            ? formData.customCategory.trim()
            : (formData.category as Product["category"]),
        subcategory: formData.subcategory.trim() || "",
        images: filteredImages,
        thumbnailImage: formData.thumbnailImage || filteredImages[0] || "",
        preparationTime: formData.preparationTime.trim(),
        serves: formData.serves.trim(),
        difficulty: formData.difficulty as Product["difficulty"],
        customizations: filteredCustomizations,
        allergens: filteredAllergens,
        dietaryOptions: filteredDietaryOptions,
        ingredients: filteredIngredients,
        tags: filteredTags,
        featured: Boolean(formData.featured),
        available: Boolean(formData.available),
        seasonal: Boolean(formData.seasonal),
        popularityScore: Number(formData.popularityScore) || 0,
        rating: Number(formData.rating) || 0,
        reviewsCount: Number(formData.reviewsCount) || 0,
        seo: defaultSeo,
      };

      // Remove undefined values to prevent Firebase errors
      const cleanedDessertData = removeUndefinedValues(dessertData);

      // Check for potential problematic fields
      console.log("  - Empty arrays check:", {
        customizations: dessertData.customizations,
        allergens: dessertData.allergens,
        dietaryOptions: dessertData.dietaryOptions,
        ingredients: dessertData.ingredients,
        tags: dessertData.tags,
      });
      console.log("  - SEO object:", dessertData.seo);
      console.log("  - Images array:", dessertData.images);
      console.log(
        "  - Price type and value:",
        typeof dessertData.price,
        dessertData.price,
      );

      let success = false;

      if (isEditing && editingDessert) {
        success = await updateProduct(editingDessert.id, dessertData);
        if (success) {
          alert("Producto actualizado exitosamente");
        } else {
          alert("Error al actualizar el producto. Intenta de nuevo.");
        }
      } else {
        console.log("🍰 Creating new product with data:", dessertData);
        console.log("🍰 Required fields check:", {
          name: !!dessertData.name,
          description: !!dessertData.description,
          shortDescription: !!dessertData.shortDescription,
          price: !!dessertData.price,
          category: !!dessertData.category,
          preparationTime: !!dessertData.preparationTime,
          serves: !!dessertData.serves,
        });

        console.log("🍰 About to call createProduct with data:", dessertData);
        console.log("🍰 Validation checks passed:");
        console.log("  - Name:", !!dessertData.name);
        console.log("  - Description:", !!dessertData.description);
        console.log("  - Price:", dessertData.price);
        console.log("  - Images:", dessertData.images);
        console.log("  - Category:", dessertData.category);

        const productId = await createProduct(cleanedDessertData);
        console.log("🍰 CreateProduct returned:", productId);

        if (productId) {
          success = true;
          console.log("✅ Product created successfully with ID:", productId);
          alert("Producto creado exitosamente");
        } else {
          console.error("❌ CreateProduct failed - returned null/undefined");
          console.error("❌ Dessert data that failed:", dessertData);
          console.error("❌ Form data:", formData);
          alert(
            "Error al crear el producto. Verifica la conexión y los datos ingresados. Revisa la consola para más detalles.",
          );
        }
      }

      if (success) {
        resetForm();
      }
    } catch (error) {
      console.error("Detailed error saving product:");
      console.error("- Error object:", error);
      console.error("- Form data:", formData);
      console.error("- Product data: Unable to display (construction failed)");

      let errorMessage = "Error inesperado. Por favor intenta de nuevo.";

      if (error instanceof Error) {
        console.error("- Error message:", error.message);

        // Provide more specific error messages based on the error
        if (error.message.includes("Failed to create product")) {
          errorMessage = `Error al crear el producto: ${error.message.replace("Failed to create product: ", "")}`;
        } else if (error.message.includes("Failed to update product")) {
          errorMessage = `Error al actualizar el producto: ${error.message.replace("Failed to update product: ", "")}`;
        } else if (error.message.includes("Missing required fields")) {
          errorMessage =
            "Error: Faltan campos obligatorios. Verifica que hayas completado nombre, descripción y precio.";
        } else if (error.message.includes("permission")) {
          errorMessage =
            "Error de permisos. Verifica la configuración de Firebase.";
        } else if (
          error.message.includes("network") ||
          error.message.includes("Failed to fetch")
        ) {
          errorMessage =
            "Error de conexión. Verifica tu conexión a internet y que Firebase esté configurado correctamente.";
        } else if (
          error.message.includes("quota") ||
          error.message.includes("billing")
        ) {
          errorMessage =
            "Error: Se ha alcanzado el límite de Firebase. Contacta al administrador.";
        } else {
          errorMessage = `Error detallado: ${error.message}. Si el problema persiste, contacta al soporte técnico.`;
        }
      }

      alert(errorMessage);
    } finally {
      setIsOperationLoading(false);
    }
  };

  // Force refresh products from Firebase
  const forceRefreshProducts = async () => {
    console.log(
      "🔄 FORCE REFRESH: Manually refreshing products from Firebase...",
    );
    try {
      await refreshProducts();
      console.log("🔄 FORCE REFRESH: Manual refresh completed");
    } catch (error) {
      console.error("🔄 FORCE REFRESH ERROR:", error);
    }
  };

  // Delete dessert
  const deleteDessert = async (id: string) => {
    setIsOperationLoading(true);

    // Find the product being deleted
    const productToDelete = desserts.find((d) => d.id === id);
    console.log("🗑️ ADMIN DELETE: Starting deletion process");
    console.log(
      "🗑️ ADMIN DELETE: Product to delete:",
      productToDelete?.name,
      "ID:",
      id,
    );
    console.log(
      "🗑️ ADMIN DELETE: Current products count before deletion:",
      desserts.length,
    );

    try {
      const success = await deleteProduct(id);

      if (success) {
        console.log("🗑️ ADMIN DELETE: Firebase delete operation successful");
        console.log("🗑️ ADMIN DELETE: Waiting for real-time update...");
        alert("Producto eliminado exitosamente");
        setShowDeleteConfirm(null);

        // Force refresh after 1 second to ensure UI updates
        setTimeout(async () => {
          const stillExists = desserts.find((d) => d.id === id);
          if (stillExists) {
            console.error(
              "🗑️ ADMIN DELETE ERROR: Product still exists in admin array after deletion!",
            );
            console.error("🗑️ ADMIN DELETE ERROR: Forcing manual refresh...");
            await forceRefreshProducts();
          } else {
            console.log(
              "✅ ADMIN DELETE SUCCESS: Product successfully removed from admin array",
            );
          }
        }, 1000);

        // Additional safety refresh after 3 seconds
        setTimeout(async () => {
          await forceRefreshProducts();
          // Safety refresh completed
        }, 3000);
      } else {
        console.error("Delete operation failed");
        alert("Error al eliminar el producto. Intenta de nuevo.");
      }
    } catch (error) {
      console.error("🗑️ ADMIN DELETE ERROR: Exception during deletion:", error);
      alert("Error inesperado. Por favor intenta de nuevo.");
    } finally {
      setIsOperationLoading(false);
    }
  };

  // Test function to create a simple product
  const testFirebaseConnection = async () => {
    try {
      setIsOperationLoading(true);
      console.log("🔥 Testing Firebase connection...");

      // Test 1: Import Firebase modules
      const { db } = await import("../config/firebase");
      const { collection, addDoc, doc, getDoc, deleteDoc } = await import(
        "firebase/firestore"
      );
      console.log("✅ Firebase modules imported successfully");

      // Test 2: Test connection with a simple write
      console.log("🔥 Testing Firestore write operation...");
      const testRef = collection(db, "connection-test");
      const testData = {
        timestamp: new Date(),
        test: "connection-test",
        message: "Testing Firebase connection",
      };

      const docRef = await addDoc(testRef, testData);
      console.log("✅ Test document created with ID:", docRef.id);

      // Test 3: Test read operation
      console.log("🔥 Testing Firestore read operation...");
      const docSnap = await getDoc(doc(db, "connection-test", docRef.id));
      if (docSnap.exists()) {
        console.log("✅ Test document read successfully:", docSnap.data());
      } else {
        throw new Error("Test document not found after creation");
      }

      // Test 4: Clean up - delete test document
      await deleteDoc(doc(db, "connection-test", docRef.id));
      console.log("✅ Test document deleted successfully");

      alert("✅ Firebase connection test passed! All operations successful.");
    } catch (error) {
      console.error("🚨 Firebase connection test failed:", error);
      alert(
        `❌ Firebase connection failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    } finally {
      setIsOperationLoading(false);
    }
  };

  const testSimpleProduct = async () => {
    try {
      setIsOperationLoading(true);

      const testProduct = {
        name: "Test Product",
        description: "Test Description",
        shortDescription: "Test short description",
        price: 19.99,
        category: "tartas" as const,
        images: [""],
        thumbnailImage: "",
        preparationTime: "2-3 días",
        serves: "8-10 personas",
        difficulty: "Fácil" as const,
        customizations: [""],
        allergens: [""],
        dietaryOptions: [""],
        ingredients: [""],
        tags: [""],
        featured: false,
        available: true,
        seasonal: false,
        popularityScore: 0,
        rating: 0,
        reviewsCount: 0,
        seo: {
          metaTitle: "Test Product",
          metaDescription: "Test short description",
          keywords: ["test", "tartas"],
        },
      };

      console.log("🧪 Testing simple product creation...");
      const productId = await createProduct(testProduct);

      if (productId) {
        alert("✅ Test product created successfully!");
        console.log("✅ Test product created with ID:", productId);
        await refreshProducts();
      } else {
        alert("❌ Test failed - no product ID returned");
        console.error("❌ Test failed - createProduct returned null");
      }
    } catch (error) {
      console.error("🚨 Test product creation failed:", error);
      alert(
        `❌ Test failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    } finally {
      setIsOperationLoading(false);
    }
  };

  // Test function that mimics the form submission process exactly
  const testFormDataStructure = async () => {
    try {
      setIsOperationLoading(true);
      console.log("🧪 Testing form data structure with minimal values...");

      // Create a minimal form data object that mimics the actual form
      const minimalFormData = {
        name: "Test Form Product",
        description: "Test Description from Form",
        shortDescription: "Test Short Description",
        price: "25.50", // String like the form
        originalPrice: 0,
        category: "tartas",
        subcategory: "",
        customCategory: "",
        images: [""],
        thumbnailImage: "",
        preparationTime: "2-3 días",
        serves: "8-10 personas",
        difficulty: "Fácil" as const,
        customizations: [""],
        allergens: [""],
        dietaryOptions: [""],
        ingredients: [""],
        tags: [""],
        featured: false,
        available: true,
        seasonal: false,
        popularityScore: 0,
        rating: 0,
        reviewsCount: 0,
        seo: {
          metaTitle: "",
          metaDescription: "",
          keywords: [""],
        },
      };

      console.log("🧪 Minimal form data:", minimalFormData);

      // Process it exactly like the form does
      const filteredImages = minimalFormData.images.filter(
        (img) => img.trim() !== "",
      );
      const filteredCustomizations = minimalFormData.customizations.filter(
        (c) => c.trim() !== "",
      );
      const filteredAllergens = minimalFormData.allergens.filter(
        (a) => a.trim() !== "",
      );
      const filteredDietaryOptions = minimalFormData.dietaryOptions.filter(
        (d) => d.trim() !== "",
      );
      const filteredIngredients = minimalFormData.ingredients.filter(
        (i) => i.trim() !== "",
      );
      const filteredTags = minimalFormData.tags.filter((t) => t.trim() !== "");
      const filteredKeywords =
        minimalFormData.seo?.keywords?.filter((k) => k.trim() !== "") || [];

      const defaultSeo = {
        metaTitle:
          minimalFormData.seo?.metaTitle?.trim() || minimalFormData.name,
        metaDescription:
          minimalFormData.seo?.metaDescription?.trim() ||
          minimalFormData.shortDescription,
        keywords:
          filteredKeywords.length > 0
            ? filteredKeywords
            : [minimalFormData.name, minimalFormData.category],
      };

      const processedData = {
        name: minimalFormData.name.trim(),
        description: minimalFormData.description.trim(),
        shortDescription: minimalFormData.shortDescription.trim(),
        price: Number(minimalFormData.price),
        originalPrice:
          minimalFormData.originalPrice > 0
            ? Number(minimalFormData.originalPrice)
            : 0,
        category: minimalFormData.category,
        subcategory: minimalFormData.subcategory.trim() || "",
        images: filteredImages,
        thumbnailImage:
          minimalFormData.thumbnailImage || filteredImages[0] || "",
        preparationTime: minimalFormData.preparationTime.trim(),
        serves: minimalFormData.serves.trim(),
        difficulty: minimalFormData.difficulty,
        customizations: filteredCustomizations,
        allergens: filteredAllergens,
        dietaryOptions: filteredDietaryOptions,
        ingredients: filteredIngredients,
        tags: filteredTags,
        featured: Boolean(minimalFormData.featured),
        available: Boolean(minimalFormData.available),
        seasonal: Boolean(minimalFormData.seasonal),
        popularityScore: Number(minimalFormData.popularityScore) || 0,
        rating: Number(minimalFormData.rating) || 0,
        reviewsCount: Number(minimalFormData.reviewsCount) || 0,
        seo: defaultSeo,
      };

      // Remove undefined values for form test too
      const removeUndefinedValues = (obj: any): any => {
        const cleaned: any = {};
        for (const [key, value] of Object.entries(obj)) {
          if (value !== undefined) {
            if (
              typeof value === "object" &&
              value !== null &&
              !Array.isArray(value)
            ) {
              cleaned[key] = removeUndefinedValues(value);
            } else {
              cleaned[key] = value;
            }
          }
        }
        return cleaned;
      };

      const cleanedProcessedData = removeUndefinedValues(processedData);

      console.log("🧪 Processed form-like data:", processedData);
      console.log("🧪 Cleaned form-like data:", cleanedProcessedData);
      console.log("🧪 Comparison with working test product:");
      console.log("  - Arrays in form test:", {
        customizations: processedData.customizations,
        allergens: processedData.allergens,
        images: processedData.images,
      });

      const productId = await createProduct(cleanedProcessedData);

      if (productId) {
        alert("✅ Form data structure test successful!");
        console.log("✅ Form-like test product created with ID:", productId);
        await refreshProducts();
      } else {
        alert("❌ Form data structure test failed - no product ID returned");
        console.error("❌ Form test failed - createProduct returned null");
      }
    } catch (error) {
      console.error("🚨 Form data structure test failed:", error);
      alert(
        `❌ Form test failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    } finally {
      setIsOperationLoading(false);
    }
  };

  // Filter and sort desserts
  const filteredDesserts = desserts
    .filter((dessert) => {
      const matchesSearch =
        dessert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dessert.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || dessert.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price":
          return a.price - b.price;
        default:
          return 0;
      }
    });

  // Debug: Track filtered results
  useEffect(() => {
    console.log(
      "🔍 ADMIN FILTER: Filtered desserts count:",
      filteredDesserts.length,
    );
    console.log("🔍 ADMIN FILTER: Search term:", searchTerm);
    console.log("🔍 ADMIN FILTER: Selected category:", selectedCategory);
    if (filteredDesserts.length !== desserts.length) {
      console.log("🔍 ADMIN FILTER: Some products are being filtered out");
    }
  }, [filteredDesserts.length, searchTerm, selectedCategory, desserts.length]);

  // Login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-100 via-white to-cream-100 flex items-center justify-center p-4 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-gentle p-6 sm:p-8 w-full max-w-md border border-sage-200"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-sage-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 sm:w-10 sm:h-10 text-sage-600" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-academy text-cocoa-700 font-bold mb-2">
              Panel de Administración
            </h1>
            <p className="text-cocoa-600 font-bodoni text-sm sm:text-base">
              Gestiona tus creaciones artesanales
            </p>
            <div className="mt-3 p-3 bg-sage-50 rounded-lg border border-sage-200">
              <div className="flex items-center space-x-2 text-sage-700">
                <Shield className="w-4 h-4" />
                <span className="text-xs font-medium">
                  Acceso multi-dispositivo habilitado
                </span>
              </div>
              <p className="text-xs text-sage-600 mt-1">
                Puedes iniciar sesión desde múltiples dispositivos
                simultáneamente
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-mocha-600 mb-2 font-playfair">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-dusty-rose-200 focus:border-dusty-rose-500 focus:ring-2 focus:ring-dusty-rose-500/20 outline-none font-source-serif"
                  placeholder="Ingresa tu contraseña"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-mocha-400 hover:text-mocha-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isOperationLoading}
              variant="primary"
              size="lg"
              fullWidth
              loading={isOperationLoading}
            >
              Iniciar Sesión
            </Button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-100 via-white to-cream-100 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-gentle p-4 sm:p-6 mb-6 sm:mb-8 border border-dusty-rose-200"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-dusty-rose-50 rounded-full flex items-center justify-center">
                <Package className="w-6 h-6 sm:w-8 sm:h-8 text-dusty-rose-600" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-sans text-mocha-700 font-bold">
                  Panel de Administración
                </h1>
                <p className="text-mocha-600 font-sans text-lg sm:text-xl">
                  Gestiona tus postres • {desserts.length} productos
                </p>
                {currentSession && (
                  <div className="flex items-center space-x-2 text-sm text-dusty-rose-600 mt-2">
                    <Monitor className="w-4 h-4" />
                    <span>{currentSession.deviceInfo.deviceName}</span>
                    {allSessions.length > 1 && (
                      <span className="bg-dusty-rose-100 text-dusty-rose-700 px-2 py-1 rounded-full text-xs">
                        {allSessions.length} sesiones activas
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
              <SophisticatedButton
                onClick={() => {
                  resetForm();
                  setShowAddForm(true);
                }}
                variant="primary"
                className="flex items-center space-x-3 text-lg px-8 py-4"
              >
                <Plus className="w-6 h-6" />
                <span>Agregar Postre</span>
              </SophisticatedButton>

              <div className="flex items-center space-x-2">
                {allSessions.length > 1 && (
                  <button
                    onClick={() => setShowSessionManager(true)}
                    className="text-mocha-600 hover:text-dusty-rose-600 transition-colors p-2 rounded-xl hover:bg-dusty-rose-50 border border-dusty-rose-200 sm:border-0 relative"
                    title="Gestionar sesiones"
                  >
                    <Monitor className="w-5 h-5" />
                    {allSessions.length > 1 && (
                      <span className="absolute -top-1 -right-1 bg-dusty-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {allSessions.length}
                      </span>
                    )}
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="text-mocha-600 hover:text-dusty-rose-600 transition-colors p-2 rounded-xl hover:bg-dusty-rose-50 border border-dusty-rose-200 sm:border-0"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Firebase Status & Controls - Hidden for user-friendly interface */}
        {false && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-gentle p-4 sm:p-6 mb-6 sm:mb-8 border border-dusty-rose-200"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-3 h-3 rounded-full ${isLoading ? "bg-yellow-500" : firebaseError ? "bg-red-500" : "bg-green-500"}`}
                ></div>
                <div>
                  <h3 className="text-xl font-sans font-bold text-mocha-700">
                    Estado de Firebase
                  </h3>
                  <p className="text-lg text-mocha-600 font-sans">
                    {isLoading
                      ? "Conectando..."
                      : firebaseError
                        ? "Error de conexión"
                        : "Conectado exitosamente"}
                  </p>
                  {firebaseError && (
                    <p className="text-base text-red-600 mt-2 font-sans font-medium">
                      {firebaseError}
                    </p>
                  )}
                </div>
              </div>

              {/* Persistence Status Indicator */}
              <div className="mb-4 p-4 rounded-lg bg-white/50 border border-dusty-rose-100">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        persistenceStatus.dataSource === "firebase"
                          ? "bg-green-500 animate-pulse"
                          : persistenceStatus.dataSource === "migrating"
                            ? "bg-yellow-500 animate-pulse"
                            : "bg-red-500"
                      }`}
                    />
                    <span className="font-source-serif text-sm font-medium">
                      {persistenceStatus.dataSource === "firebase"
                        ? "🔥 Datos sincronizados con Firebase"
                        : persistenceStatus.dataSource === "migrating"
                          ? "🚀 Migrando datos..."
                          : "⚠️ Usando datos locales (no persistentes)"}
                    </span>
                  </div>
                  {persistenceStatus.lastSync && (
                    <span className="text-xs text-warm-grey-600 font-source-serif">
                      Última sync:{" "}
                      {persistenceStatus.lastSync.toLocaleTimeString()}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowMigrationDialog(true)}
                  className="bg-dusty-rose-500 text-white px-6 py-3 rounded-lg hover:bg-dusty-rose-600 transition-colors font-sans font-medium shadow-gentle hover:shadow-elegant text-base"
                  disabled={persistenceStatus.dataSource === "migrating"}
                >
                  🔄 Migrar Datos Locales
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={forceRefreshProducts}
                  disabled={isLoading}
                  className="bg-warm-ivory text-mocha-700 px-6 py-3 rounded-lg hover:bg-cream-200 transition-colors font-sans font-medium shadow-gentle hover:shadow-elegant text-base border border-dusty-rose-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  🔄 Forzar Actualización
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={testFirebaseConnection}
                  disabled={isOperationLoading}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-source-serif font-medium shadow-gentle hover:shadow-elegant text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Test Firebase
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={testSimpleProduct}
                  disabled={isOperationLoading}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors font-source-serif font-medium shadow-gentle hover:shadow-elegant text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Test Product
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={testFormDataStructure}
                  disabled={isOperationLoading}
                  className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors font-source-serif font-medium shadow-gentle hover:shadow-elegant text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Test Form Structure
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetProductState}
                  disabled={isOperationLoading}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-source-serif font-medium shadow-gentle hover:shadow-elegant text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Clears localStorage and resets migration state - use for testing auto-migration behavior"
                >
                  Reset Product State
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Migration Dialog */}
        <AnimatePresence>
          {showMigrationDialog && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={() => setShowMigrationDialog(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl p-6 max-w-md w-full shadow-elegant"
              >
                <h3 className="text-xl font-academy font-bold text-mocha-700 mb-4">
                  Migrar Datos Locales a Firebase
                </h3>
                <p className="text-mocha-600 font-source-serif mb-4">
                  Esto migrará todos los productos locales a la base de datos de
                  Firebase. Esta acción solo debe realizarse una vez.
                </p>
                {migrationStatus && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-4">
                    <p className="text-blue-700 text-sm font-source-serif">
                      {migrationStatus}
                    </p>
                  </div>
                )}
                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={async () => {
                      setMigrationStatus("Iniciando migración...");
                      const success = await migrateLocalData();
                      if (success) {
                        setMigrationStatus(
                          "¡Migración completada exitosamente!",
                        );
                        setTimeout(() => {
                          setShowMigrationDialog(false);
                          setMigrationStatus("");
                        }, 2000);
                      } else {
                        setMigrationStatus(
                          "Error durante la migración. Intenta de nuevo.",
                        );
                      }
                    }}
                    disabled={isLoading}
                    className="flex-1 bg-dusty-rose text-white py-2 rounded-xl hover:bg-dusty-rose/90 transition-colors font-source-serif disabled:opacity-50"
                  >
                    {isLoading ? "Migrando..." : "Migrar"}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setShowMigrationDialog(false);
                      setMigrationStatus("");
                    }}
                    className="flex-1 bg-gray-500 text-white py-2 rounded-xl hover:bg-gray-600 transition-colors font-source-serif"
                  >
                    Cancelar
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-dusty-rose-200 shadow-gentle"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg sm:text-xl text-mocha-600 font-sans font-medium">
                  Destacados
                </p>
                <p className="text-4xl sm:text-5xl font-sans font-bold text-mocha-700">
                  {productStats.featured}
                </p>
              </div>
              <div className="w-16 h-16 bg-yellow-400/10 rounded-full flex items-center justify-center">
                <Star className="w-8 h-8 text-yellow-500" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-dusty-rose-200 shadow-gentle"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg sm:text-xl text-mocha-600 font-sans font-medium">
                  Disponibles
                </p>
                <p className="text-4xl sm:text-5xl font-sans font-bold text-mocha-700">
                  {productStats.available}
                </p>
              </div>
              <div className="w-16 h-16 bg-green-400/10 rounded-full flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-dusty-rose-200 shadow-gentle"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg sm:text-xl text-mocha-600 font-sans font-medium">
                  Total Postres
                </p>
                <p className="text-4xl sm:text-5xl font-sans font-bold text-mocha-700">
                  {productStats.total}
                </p>
              </div>
              <div className="w-16 h-16 bg-dusty-rose/10 rounded-full flex items-center justify-center">
                <Package className="w-8 h-8 text-dusty-rose" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-gentle p-4 sm:p-6 mb-6 sm:mb-8 border border-dusty-rose-200"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-lg font-medium text-mocha/80 mb-3 font-sans">
                Buscar
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-mocha/40 w-6 h-6" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 rounded-xl border border-dusty-rose/20 focus:border-dusty-rose focus:ring-2 focus:ring-dusty-rose/20 outline-none font-sans text-lg"
                  placeholder="Buscar postres..."
                />
              </div>
            </div>

            <div>
              <label className="block text-lg font-medium text-mocha/80 mb-3 font-sans">
                Categoría
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-6 py-4 rounded-xl border border-dusty-rose/20 focus:border-dusty-rose focus:ring-2 focus:ring-dusty-rose/20 outline-none font-sans text-lg"
              >
                <option value="all">Todas las categorías</option>
                <option value="tartas">Tartas</option>
                <option value="macarons">Macarons</option>
                <option value="cupcakes">Cupcakes</option>
                <option value="galletas">Galletas</option>
                <option value="postres-especiales">Postres Especiales</option>
                <option value="temporada">Temporada</option>
              </select>
            </div>

            <div>
              <label className="block text-lg font-medium text-mocha/80 mb-3 font-sans">
                Ordenar por
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-6 py-4 rounded-xl border border-dusty-rose/20 focus:border-dusty-rose focus:ring-2 focus:ring-dusty-rose/20 outline-none font-sans text-lg"
              >
                <option value="name">Nombre</option>
                <option value="price">Precio</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Desserts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredDesserts.map((dessert, index) => (
            <motion.div
              key={dessert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden shadow-gentle hover:shadow-elegant transition-all duration-300 border border-dusty-rose/20"
            >
              <div className="relative">
                <img
                  src={dessert.thumbnailImage || dessert.images[0]}
                  alt={dessert.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 right-3 flex space-x-2">
                  {dessert.featured && (
                    <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      ⭐
                    </span>
                  )}
                  {!dessert.available && (
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      No disponible
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-sans font-bold text-mocha leading-tight">
                    {dessert.name}
                  </h3>
                  <span className="text-2xl font-sans font-bold text-dusty-rose">
                    {formatPrice(dessert.price)}
                  </span>
                </div>

                <p className="text-mocha/70 text-base mb-6 line-clamp-2 font-sans leading-relaxed">
                  {dessert.shortDescription}
                </p>

                <div className="flex items-center justify-between text-base text-mocha/60 mb-6">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span className="font-medium">
                      {dessert.preparationTime}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span className="font-medium">{dessert.serves}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-base bg-dusty-rose/10 text-dusty-rose px-4 py-2 rounded-full font-sans font-medium">
                    {dessert.category}
                  </span>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => editDessert(dessert)}
                      className="text-dusty-rose hover:text-dusty-rose/70 transition-colors p-3 rounded-lg hover:bg-dusty-rose/10"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(dessert.id)}
                      className="text-red-500 hover:text-red-700 transition-colors p-3 rounded-lg hover:bg-red-50"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add/Edit Form Modal */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto my-8"
              >
                <div className="p-6 border-b border-dusty-rose/10">
                  <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-sans text-mocha font-bold">
                      {isEditing ? "Editar Postre" : "Agregar Nuevo Postre"}
                    </h2>
                    <button
                      onClick={resetForm}
                      className="text-mocha/70 hover:text-dusty-rose transition-colors p-2 rounded-lg hover:bg-dusty-rose/10"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-8">
                  {/* Basic Information */}
                  <div>
                    <h3 className="text-xl font-sans font-bold text-mocha mb-6">
                      Información Básica
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-lg font-medium text-mocha/80 mb-3 font-sans">
                          Nombre del postre *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-6 py-4 rounded-xl border border-dusty-rose/20 focus:border-dusty-rose focus:ring-2 focus:ring-dusty-rose/20 outline-none font-sans text-lg"
                          placeholder="Nombre del postre"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-lg font-medium text-mocha/80 mb-3 font-sans">
                          Precio *
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          className="w-full px-6 py-4 rounded-xl border border-dusty-rose/20 focus:border-dusty-rose focus:ring-2 focus:ring-dusty-rose/20 outline-none font-sans text-lg"
                          placeholder="Ingresa el precio"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-lg font-medium text-mocha/80 mb-3 font-sans">
                          Categoría *
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="w-full px-6 py-4 rounded-xl border border-dusty-rose/20 focus:border-dusty-rose focus:ring-2 focus:ring-dusty-rose/20 outline-none font-sans text-lg"
                          required
                        >
                          <option value="tartas">Tartas</option>
                          <option value="macarons">Macarons</option>
                          <option value="cupcakes">Cupcakes</option>
                          <option value="galletas">Galletas</option>
                          <option value="postres-especiales">
                            Postres Especiales
                          </option>
                          <option value="temporada">Temporada</option>
                          <option value="otro">Otro</option>
                        </select>
                      </div>

                      {/* Custom Category Input - Only show when "otro" is selected */}
                      {formData.category === "otro" && (
                        <div>
                          <label className="block text-lg font-medium text-mocha/80 mb-3 font-sans">
                            Categoría Personalizada *
                          </label>
                          <input
                            type="text"
                            name="customCategory"
                            value={formData.customCategory}
                            onChange={handleInputChange}
                            className="w-full px-6 py-4 rounded-xl border border-dusty-rose/20 focus:border-dusty-rose focus:ring-2 focus:ring-dusty-rose/20 outline-none font-sans text-lg"
                            placeholder="Ingresa la categoría personalizada"
                            required
                          />
                        </div>
                      )}

                      <div>
                        <label className="block text-lg font-medium text-mocha/80 mb-3 font-sans">
                          Tiempo de preparación *
                        </label>
                        <input
                          type="text"
                          name="preparationTime"
                          value={formData.preparationTime}
                          onChange={handleInputChange}
                          className="w-full px-6 py-4 rounded-xl border border-dusty-rose/20 focus:border-dusty-rose focus:ring-2 focus:ring-dusty-rose/20 outline-none font-sans text-lg"
                          placeholder="2-3 días"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-lg font-medium text-mocha/80 mb-3 font-sans">
                          Porciones *
                        </label>
                        <input
                          type="text"
                          name="serves"
                          value={formData.serves}
                          onChange={handleInputChange}
                          className="w-full px-6 py-4 rounded-xl border border-dusty-rose/20 focus:border-dusty-rose focus:ring-2 focus:ring-dusty-rose/20 outline-none font-sans text-lg"
                          placeholder="8-10 personas"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Images */}
                  <div>
                    <h3 className="text-xl font-sans font-bold text-mocha mb-6">
                      Imágenes del Producto
                    </h3>

                    <div className="space-y-8">
                      <DragDropImageUpload
                        onImagesChange={(images) => {
                          setFormData((prev) => ({
                            ...prev,
                            thumbnailImage: images[0] || "",
                          }));
                        }}
                        currentImages={
                          formData.thumbnailImage
                            ? [formData.thumbnailImage]
                            : []
                        }
                        maxFiles={1}
                        label="Imagen Principal"
                        description="Arrastra tu imagen aquí o toca para seleccionar"
                        compressionPreset="large"
                        required={true}
                      />

                      <DragDropImageUpload
                        onImagesChange={(images) => {
                          setFormData((prev) => ({
                            ...prev,
                            images: images,
                          }));
                        }}
                        currentImages={formData.images.filter(
                          (img) => img.trim() !== "",
                        )}
                        maxFiles={10}
                        label="Imágenes Adicionales"
                        description="Puedes agregar hasta 10 imágenes adicionales"
                        compressionPreset="medium"
                        required={false}
                      />
                    </div>
                  </div>

                  {/* Descriptions */}
                  <div>
                    <h3 className="text-xl font-sans font-bold text-mocha mb-6">
                      Descripciones
                    </h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-lg font-medium text-mocha/80 mb-3 font-sans">
                          Descripción corta *
                        </label>
                        <textarea
                          name="shortDescription"
                          value={formData.shortDescription}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full px-6 py-4 rounded-xl border border-dusty-rose/20 focus:border-dusty-rose focus:ring-2 focus:ring-dusty-rose/20 outline-none resize-none font-sans text-lg"
                          placeholder="Descripción breve para mostrar en tarjetas"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-lg font-medium text-mocha/80 mb-3 font-sans">
                          Descripción completa *
                        </label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          rows={5}
                          className="w-full px-6 py-4 rounded-xl border border-dusty-rose/20 focus:border-dusty-rose focus:ring-2 focus:ring-dusty-rose/20 outline-none resize-none font-sans text-lg"
                          placeholder="Descripción detallada del postre"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Tags and Customizations */}
                  <div>
                    <h3 className="text-lg font-academy font-bold text-mocha mb-4">
                      Etiquetas y Personalizaciones
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-mocha/80 mb-2 font-source-serif">
                          Etiquetas (separadas por comas)
                        </label>
                        <input
                          type="text"
                          value={formData.tags.join(", ")}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              tags: e.target.value
                                .split(",")
                                .map((tag) => tag.trim()),
                            }))
                          }
                          className="w-full px-4 py-3 rounded-xl border border-dusty-rose/20 focus:border-dusty-rose focus:ring-2 focus:ring-dusty-rose/20 outline-none font-source-serif"
                          placeholder="chocolate, premium, vegano..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-mocha/80 mb-2 font-source-serif">
                          Opciones de personalización (separadas por comas)
                        </label>
                        <textarea
                          value={formData.customizations.join(", ")}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              customizations: e.target.value
                                .split(",")
                                .map((c) => c.trim()),
                            }))
                          }
                          className="w-full px-4 py-3 rounded-xl border border-dusty-rose/20 focus:border-dusty-rose focus:ring-2 focus:ring-dusty-rose/20 outline-none font-source-serif"
                          placeholder="Cambio de sabor, decoración especial, tamaño..."
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Options */}
                  <div>
                    <h3 className="text-lg font-academy font-bold text-mocha mb-4">
                      Opciones
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <label className="flex items-center space-x-2 p-3 rounded-xl border border-dusty-rose/20 hover:bg-dusty-rose/5 transition-colors cursor-pointer">
                        <input
                          type="checkbox"
                          name="featured"
                          checked={formData.featured}
                          onChange={handleInputChange}
                          className="rounded border-dusty-rose/20 text-dusty-rose focus:border-dusty-rose focus:ring-dusty-rose/20"
                        />
                        <span className="text-sm text-mocha/80 font-source-serif">
                          Destacado
                        </span>
                      </label>

                      <label className="flex items-center space-x-2 p-3 rounded-xl border border-dusty-rose/20 hover:bg-dusty-rose/5 transition-colors cursor-pointer">
                        <input
                          type="checkbox"
                          name="available"
                          checked={formData.available}
                          onChange={handleInputChange}
                          className="rounded border-dusty-rose/20 text-dusty-rose focus:border-dusty-rose focus:ring-dusty-rose/20"
                        />
                        <span className="text-sm text-mocha/80 font-source-serif">
                          Disponible
                        </span>
                      </label>

                      <label className="flex items-center space-x-2 p-3 rounded-xl border border-dusty-rose/20 hover:bg-dusty-rose/5 transition-colors cursor-pointer">
                        <input
                          type="checkbox"
                          name="seasonal"
                          checked={formData.seasonal}
                          onChange={handleInputChange}
                          className="rounded border-dusty-rose/20 text-dusty-rose focus:border-dusty-rose focus:ring-dusty-rose/20"
                        />
                        <span className="text-sm text-mocha/80 font-source-serif">
                          Temporada
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-end space-x-4 pt-6 border-t border-dusty-rose/10">
                    <SophisticatedButton
                      onClick={resetForm}
                      variant="secondary"
                      className="px-6 py-3"
                    >
                      Cancelar
                    </SophisticatedButton>
                    <SophisticatedButton
                      onClick={saveDessert}
                      variant="primary"
                      className={`px-10 py-5 text-xl flex items-center space-x-3 ${isOperationLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <Save className="w-6 h-6" />
                      <span>
                        {isOperationLoading
                          ? "Guardando..."
                          : (isEditing ? "Actualizar" : "Agregar") + " Postre"}
                      </span>
                    </SophisticatedButton>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {showDeleteConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-md"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-academy font-bold text-mocha">
                      Confirmar eliminación
                    </h3>
                    <p className="text-mocha/70 text-sm font-source-serif">
                      Esta acción no se puede deshacer.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-4">
                  <SophisticatedButton
                    onClick={() => setShowDeleteConfirm(null)}
                    variant="secondary"
                    className="px-4 py-2"
                  >
                    Cancelar
                  </SophisticatedButton>
                  <SophisticatedButton
                    onClick={() => deleteDessert(showDeleteConfirm)}
                    variant="primary"
                    className={`px-4 py-2 !bg-red-600 !border-red-600 hover:!bg-red-700 hover:!border-red-700 flex items-center space-x-2 ${isOperationLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>
                      {isOperationLoading ? "Eliminando..." : "Eliminar"}
                    </span>
                  </SophisticatedButton>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Session Manager Modal */}
        <SessionManager
          isOpen={showSessionManager}
          onClose={() => setShowSessionManager(false)}
        />
      </div>
    </div>
  );
};

export default Admin;
