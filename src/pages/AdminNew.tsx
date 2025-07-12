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
  Database,
  Wifi,
  WifiOff,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { formatPrice } from "../utils/currency";

import type { Product } from "../data/products";
import { useFirebaseProducts } from "../hooks/useFirebaseProducts";

type AdminPanelProps = object;

const Admin: React.FC<AdminPanelProps> = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    productStats,
  } = useFirebaseProducts();

  // Session persistence
  useEffect(() => {
    const savedSession = localStorage.getItem("admin_session");
    if (savedSession) {
      try {
        const sessionData = JSON.parse(savedSession);
        const currentTime = Date.now();
        // Session expires after 24 hours
        if (currentTime - sessionData.timestamp < 24 * 60 * 60 * 1000) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("admin_session");
        }
      } catch (error) {
        console.error("Error parsing session data:", error);
        localStorage.removeItem("admin_session");
      }
    }
  }, []);

  // Authentication
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsOperationLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (password === "admin123") {
      setIsAuthenticated(true);
      setPassword("");

      // Save session to localStorage
      const sessionData = {
        timestamp: Date.now(),
        authenticated: true,
      };
      localStorage.setItem("admin_session", JSON.stringify(sessionData));
    } else {
      alert("Contraseña incorrecta");
    }
    setIsOperationLoading(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin_session");
  };

  // Form state for adding/editing desserts
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    shortDescription: "",
    price: 0,
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
      price: 0,
      originalPrice: 0,
      category: "tartas",
      subcategory: "",
      customCategory: "",
      images: [""],
      thumbnailImage: "",
      preparationTime: "",
      serves: "",
      difficulty: "Fácil",
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
        [name]: parseFloat(value) || 0,
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
      price: dessert.price,
      originalPrice: dessert.originalPrice || 0,
      category: dessert.category,
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
    if (!formData.name || !formData.description || formData.price <= 0) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }

    setIsOperationLoading(true);

    try {
      const dessertData = {
        name: formData.name,
        description: formData.description,
        shortDescription: formData.shortDescription,
        price: formData.price,
        originalPrice: formData.originalPrice || undefined,
        category: formData.category,
        subcategory: formData.subcategory || undefined,
        images: formData.images.filter((img) => img.trim() !== ""),
        thumbnailImage: formData.thumbnailImage || formData.images[0] || "",
        preparationTime: formData.preparationTime,
        serves: formData.serves,
        difficulty: formData.difficulty,
        customizations: formData.customizations.filter((c) => c.trim() !== ""),
        allergens: formData.allergens.filter((a) => a.trim() !== ""),
        dietaryOptions: formData.dietaryOptions.filter((d) => d.trim() !== ""),
        ingredients: formData.ingredients.filter((i) => i.trim() !== ""),
        tags: formData.tags.filter((t) => t.trim() !== ""),
        featured: formData.featured,
        available: formData.available,
        seasonal: formData.seasonal,
        popularityScore: formData.popularityScore,
        rating: formData.rating,
        reviewsCount: formData.reviewsCount,
        seo: formData.seo || {
          metaTitle: "",
          metaDescription: "",
          keywords: [],
        },
      };

      let success = false;

      if (isEditing && editingDessert) {
        success = await updateProduct(editingDessert.id, dessertData);
        if (success) {
          alert("Producto actualizado exitosamente");
        } else {
          alert("Error al actualizar el producto. Intenta de nuevo.");
        }
      } else {
        const productId = await createProduct(dessertData);
        if (productId) {
          success = true;
          alert("Producto creado exitosamente");
        } else {
          alert("Error al crear el producto. Intenta de nuevo.");
        }
      }

      if (success) {
        resetForm();
      }
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Error inesperado. Por favor intenta de nuevo.");
    } finally {
      setIsOperationLoading(false);
    }
  };

  // Delete dessert
  const deleteDessert = async (id: string) => {
    setIsOperationLoading(true);

    try {
      const success = await deleteProduct(id);

      if (success) {
        alert("Producto eliminado exitosamente");
        setShowDeleteConfirm(null);
      } else {
        alert("Error al eliminar el producto. Intenta de nuevo.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error inesperado. Por favor intenta de nuevo.");
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
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  // Login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-100 via-white to-cream-100 flex items-center justify-center p-4 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-gentle p-6 sm:p-8 w-full max-w-md border border-dusty-rose-200"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-dusty-rose-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 sm:w-10 sm:h-10 text-dusty-rose-600" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-playfair text-mocha-700 font-bold mb-2">
              Panel de Administración
            </h1>
            <p className="text-mocha-600 font-source-serif text-sm sm:text-base">
              Gestiona tus dulces creaciones
            </p>
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

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-dusty-rose to-dusty-rose/90 text-white py-3 rounded-xl hover:from-dusty-rose/90 hover:to-dusty-rose transition-all duration-300 font-medium font-source-serif shadow-gentle hover:shadow-elegant disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Verificando..." : "Iniciar Sesión"}
            </button>
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
                <h1 className="text-2xl sm:text-3xl font-playfair text-mocha-700 font-bold">
                  Panel de Administración
                </h1>
                <p className="text-mocha-600 font-source-serif text-sm sm:text-base">
                  Gestiona tus postres • {desserts.length} productos
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  resetForm();
                  setShowAddForm(true);
                }}
                className="bg-gradient-to-r from-dusty-rose-500 to-dusty-rose-600 text-white px-6 py-3 rounded-full hover:from-dusty-rose-600 hover:to-dusty-rose-700 transition-all duration-300 flex items-center space-x-2 font-playfair font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Plus className="w-5 h-5" />
                <span>Agregar Postre</span>
              </motion.button>
              <button
                onClick={handleLogout}
                className="text-mocha-600 hover:text-dusty-rose-600 transition-colors p-2 rounded-xl hover:bg-dusty-rose-50 border border-dusty-rose-200 sm:border-0"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Firebase Status & Controls */}
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
                <h3 className="text-lg font-playfair font-bold text-mocha-700">
                  Estado de Firebase
                </h3>
                <p className="text-sm text-mocha-600 font-source-serif">
                  {isLoading
                    ? "Conectando..."
                    : firebaseError
                      ? "Error de conexión"
                      : "Conectado exitosamente"}
                </p>
                {firebaseError && (
                  <p className="text-xs text-red-600 mt-1">{firebaseError}</p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowMigrationDialog(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition-colors flex items-center space-x-2 font-source-serif"
              >
                <Database className="w-4 h-4" />
                <span>Migrar Datos</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={refreshProducts}
                disabled={isLoading}
                className="bg-gray-500 text-white px-4 py-2 rounded-xl hover:bg-gray-600 transition-colors flex items-center space-x-2 font-source-serif disabled:opacity-50"
              >
                {isLoading ? (
                  <Wifi className="w-4 h-4 animate-spin" />
                ) : (
                  <WifiOff className="w-4 h-4" />
                )}
                <span>Actualizar</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

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
                <h3 className="text-xl font-playfair font-bold text-mocha-700 mb-4">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-dusty-rose-200 shadow-gentle"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-mocha-600 font-source-serif">
                  Destacados
                </p>
                <p className="text-2xl sm:text-3xl font-playfair font-bold text-mocha-700">
                  {productStats.featured}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-400/10 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-500" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-dusty-rose-200 shadow-gentle"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-mocha-600 font-source-serif">
                  Disponibles
                </p>
                <p className="text-2xl sm:text-3xl font-playfair font-bold text-mocha-700">
                  {productStats.available}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-400/10 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-dusty-rose-200 shadow-gentle"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-mocha-600 font-source-serif">
                  Total Postres
                </p>
                <p className="text-2xl sm:text-3xl font-playfair font-bold text-mocha-700">
                  {productStats.total}
                </p>
              </div>
              <div className="w-12 h-12 bg-dusty-rose/10 rounded-full flex items-center justify-center">
                <Package className="w-6 h-6 text-dusty-rose" />
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
              <label className="block text-sm font-medium text-mocha/80 mb-2 font-source-serif">
                Buscar
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-mocha/40 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-dusty-rose/20 focus:border-dusty-rose focus:ring-2 focus:ring-dusty-rose/20 outline-none font-source-serif"
                  placeholder="Buscar postres..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-mocha/80 mb-2 font-source-serif">
                Categoría
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-dusty-rose/20 focus:border-dusty-rose focus:ring-2 focus:ring-dusty-rose/20 outline-none font-source-serif"
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
              <label className="block text-sm font-medium text-mocha/80 mb-2 font-source-serif">
                Ordenar por
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-dusty-rose/20 focus:border-dusty-rose focus:ring-2 focus:ring-dusty-rose/20 outline-none font-source-serif"
              >
                <option value="name">Nombre</option>
                <option value="price">Precio</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Desserts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-playfair font-bold text-mocha">
                    {dessert.name}
                  </h3>
                  <span className="text-xl font-playfair font-bold text-dusty-rose">
                    {formatPrice(dessert.price)}
                  </span>
                </div>

                <p className="text-mocha/70 text-sm mb-4 line-clamp-2 font-source-serif">
                  {dessert.shortDescription}
                </p>

                <div className="flex items-center justify-between text-xs text-mocha/60 mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{dessert.preparationTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{dessert.serves}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>{dessert.rating}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs bg-dusty-rose/10 text-dusty-rose px-3 py-1 rounded-full font-source-serif">
                    {dessert.category}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => editDessert(dessert)}
                      className="text-dusty-rose hover:text-dusty-rose/70 transition-colors p-2 rounded-lg hover:bg-dusty-rose/10"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(dessert.id)}
                      className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-lg hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
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
                    <h2 className="text-2xl font-playfair text-mocha font-bold">
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
                    <h3 className="text-lg font-playfair font-bold text-mocha mb-4">
                      Información Básica
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-mocha/80 mb-2 font-source-serif">
                          Nombre del postre *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-dusty-rose/20 focus:border-dusty-rose focus:ring-2 focus:ring-dusty-rose/20 outline-none font-source-serif"
                          placeholder="Nombre del postre"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-mocha/80 mb-2 font-source-serif">
                          Precio *
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-dusty-rose/20 focus:border-dusty-rose focus:ring-2 focus:ring-dusty-rose/20 outline-none font-source-serif"
                          placeholder="0.00"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-mocha/80 mb-2 font-source-serif">
                          Categoría *
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-dusty-rose/20 focus:border-dusty-rose focus:ring-2 focus:ring-dusty-rose/20 outline-none font-source-serif"
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
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-mocha/80 mb-2 font-source-serif">
                          Tiempo de preparación *
                        </label>
                        <input
                          type="text"
                          name="preparationTime"
                          value={formData.preparationTime}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-dusty-rose/20 focus:border-dusty-rose focus:ring-2 focus:ring-dusty-rose/20 outline-none font-source-serif"
                          placeholder="2-3 días"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-mocha/80 mb-2 font-source-serif">
                          Porciones *
                        </label>
                        <input
                          type="text"
                          name="serves"
                          value={formData.serves}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-dusty-rose/20 focus:border-dusty-rose focus:ring-2 focus:ring-dusty-rose/20 outline-none font-source-serif"
                          placeholder="8-10 personas"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Images */}
                  <div>
                    <h3 className="text-lg font-playfair font-bold text-mocha-700 mb-4">
                      Imágenes del Producto
                    </h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-mocha-600 mb-3 font-playfair">
                          Imagen Principal *
                        </label>
                        <div className="border-2 border-dashed border-dusty-rose-300 rounded-xl p-6 text-center hover:border-dusty-rose-500 transition-colors">
                          <input
                            type="file"
                            accept="image/*"
                            capture="environment"
                            className="hidden"
                            id="thumbnailImage"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    thumbnailImage: event.target
                                      ?.result as string,
                                  }));
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                          <label
                            htmlFor="thumbnailImage"
                            className="cursor-pointer flex flex-col items-center space-y-2"
                          >
                            <div className="w-12 h-12 bg-dusty-rose-100 rounded-full flex items-center justify-center">
                              <Plus className="w-6 h-6 text-dusty-rose-600" />
                            </div>
                            <span className="text-sm font-playfair text-mocha-600">
                              Toca para subir imagen desde tu teléfono
                            </span>
                            <span className="text-xs text-mocha-400">
                              PNG, JPG hasta 5MB
                            </span>
                          </label>
                          {formData.thumbnailImage && (
                            <div className="mt-4">
                              <img
                                src={formData.thumbnailImage}
                                alt="Preview"
                                className="w-20 h-20 object-cover rounded-lg mx-auto"
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-mocha-600 mb-3 font-playfair">
                          Imágenes Adicionales (opcional)
                        </label>
                        <div className="border-2 border-dashed border-dusty-rose-300 rounded-xl p-6 text-center hover:border-dusty-rose-500 transition-colors">
                          <input
                            type="file"
                            accept="image/*"
                            capture="environment"
                            multiple
                            className="hidden"
                            id="additionalImages"
                            onChange={(e) => {
                              const files = Array.from(e.target.files || []);
                              files.forEach((file) => {
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    images: [
                                      ...prev.images.filter((img) => img),
                                      event.target?.result as string,
                                    ],
                                  }));
                                };
                                reader.readAsDataURL(file);
                              });
                            }}
                          />
                          <label
                            htmlFor="additionalImages"
                            className="cursor-pointer flex flex-col items-center space-y-2"
                          >
                            <div className="w-12 h-12 bg-dusty-rose-100 rounded-full flex items-center justify-center">
                              <Plus className="w-6 h-6 text-dusty-rose-600" />
                            </div>
                            <span className="text-sm font-playfair text-mocha-600">
                              Agregar más imágenes
                            </span>
                            <span className="text-xs text-mocha-400">
                              Puedes seleccionar múltiples imágenes
                            </span>
                          </label>
                          {formData.images.filter((img) => img).length > 0 && (
                            <div className="mt-4 grid grid-cols-3 gap-2">
                              {formData.images
                                .filter((img) => img)
                                .map((img, imgIndex) => (
                                  <div key={imgIndex} className="relative">
                                    <img
                                      src={img}
                                      alt={`Preview ${imgIndex + 1}`}
                                      className="w-full h-16 object-cover rounded-lg"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setFormData((prev) => ({
                                          ...prev,
                                          images: prev.images.filter(
                                            (_, i) => i !== imgIndex,
                                          ),
                                        }));
                                      }}
                                      className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                  </div>
                                ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Descriptions */}
                  <div>
                    <h3 className="text-lg font-playfair font-bold text-mocha mb-4">
                      Descripciones
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-mocha/80 mb-2 font-source-serif">
                          Descripción corta *
                        </label>
                        <input
                          type="text"
                          name="shortDescription"
                          value={formData.shortDescription}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-dusty-rose/20 focus:border-dusty-rose focus:ring-2 focus:ring-dusty-rose/20 outline-none font-source-serif"
                          placeholder="Una línea descriptiva para mostrar en tarjetas"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-mocha/80 mb-2 font-source-serif">
                          Descripción completa *
                        </label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          rows={4}
                          className="w-full px-4 py-3 rounded-xl border border-dusty-rose/20 focus:border-dusty-rose focus:ring-2 focus:ring-dusty-rose/20 outline-none font-source-serif resize-none"
                          placeholder="Descripción detallada del postre, ingredientes especiales, historia, etc."
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Tags and Customizations */}
                  <div>
                    <h3 className="text-lg font-playfair font-bold text-mocha mb-4">
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
                    <h3 className="text-lg font-playfair font-bold text-mocha mb-4">
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
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-6 py-3 text-mocha/70 hover:text-mocha transition-colors font-source-serif"
                    >
                      Cancelar
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={saveDessert}
                      disabled={isOperationLoading}
                      className="bg-gradient-to-r from-dusty-rose to-dusty-rose/90 text-white px-6 py-3 rounded-xl hover:from-dusty-rose/90 hover:to-dusty-rose transition-all duration-300 flex items-center space-x-2 font-source-serif font-medium shadow-gentle hover:shadow-elegant disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Save className="w-5 h-5" />
                      <span>
                        {isOperationLoading
                          ? "Guardando..."
                          : (isEditing ? "Actualizar" : "Agregar") + " Postre"}
                      </span>
                    </motion.button>
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
                    <h3 className="text-lg font-playfair font-bold text-mocha">
                      Confirmar eliminación
                    </h3>
                    <p className="text-mocha/70 text-sm font-source-serif">
                      Esta acción no se puede deshacer.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-4">
                  <button
                    onClick={() => setShowDeleteConfirm(null)}
                    className="px-4 py-2 text-mocha/70 hover:text-mocha transition-colors font-source-serif"
                  >
                    Cancelar
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => deleteDessert(showDeleteConfirm)}
                    disabled={isOperationLoading}
                    className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition-colors font-source-serif disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    {isOperationLoading ? "Eliminando..." : "Eliminar"}
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Admin;
