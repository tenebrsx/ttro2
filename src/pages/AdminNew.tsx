import React, { useState } from "react";
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
  Image as ImageIcon,
  Upload,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { formatPrice } from "../utils/currency";
import { products } from "../data/products";
import type { Product } from "../data/products";

type AdminPanelProps = object;

const Admin: React.FC<AdminPanelProps> = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [desserts, setDesserts] = useState<Product[]>(products);
  const [isEditing, setIsEditing] = useState(false);
  const [editingDessert, setEditingDessert] = useState<Product | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null,
  );

  // Authentication
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      setIsAuthenticated(true);
      setPassword("");
    } else {
      alert("Contraseña incorrecta");
    }
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
    rating: 5,
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
      rating: 5,
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

  // Handle image upload
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "thumbnailImage" | "images",
    index?: number,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create a FileReader to convert the file to base64
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target?.result as string;

      if (field === "thumbnailImage") {
        setFormData((prev) => ({
          ...prev,
          thumbnailImage: base64String,
        }));
      } else if (field === "images" && index !== undefined) {
        const newImages = [...formData.images];
        newImages[index] = base64String;
        setFormData((prev) => ({
          ...prev,
          images: newImages,
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle image URL input
  const handleImageUrlChange = (
    value: string,
    field: "thumbnailImage" | "images",
    index?: number,
  ) => {
    if (field === "thumbnailImage") {
      setFormData((prev) => ({
        ...prev,
        thumbnailImage: value,
      }));
    } else if (field === "images" && index !== undefined) {
      const newImages = [...formData.images];
      newImages[index] = value;
      setFormData((prev) => ({
        ...prev,
        images: newImages,
      }));
    }
  };

  // Add new image slot
  const addImageSlot = () => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ""],
    }));
  };

  // Remove image slot
  const removeImageSlot = (index: number) => {
    if (formData.images.length > 1) {
      const newImages = formData.images.filter((_, i) => i !== index);
      setFormData((prev) => ({
        ...prev,
        images: newImages,
      }));
    }
  };

  // Handle array changes for tags, ingredients, etc.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleArrayChange = (
    field: keyof typeof formData,
    index: number,
    value: string,
  ) => {
    setFormData((prev) => {
      const currentValue = prev[field];
      if (Array.isArray(currentValue)) {
        return {
          ...prev,
          [field]: currentValue.map((item: string, i: number) =>
            i === index ? value : item,
          ),
        };
      }
      return prev;
    });
  };

  // Add array item
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const addArrayItem = (field: keyof typeof formData) => {
    setFormData((prev) => {
      const currentValue = prev[field];
      if (Array.isArray(currentValue)) {
        return {
          ...prev,
          [field]: [...currentValue, ""],
        };
      }
      return prev;
    });
  };

  // Remove array item
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const removeArrayItem = (field: keyof typeof formData, index: number) => {
    setFormData((prev) => {
      const currentValue = prev[field];
      if (Array.isArray(currentValue)) {
        return {
          ...prev,
          [field]: currentValue.filter((_: string, i: number) => i !== index),
        };
      }
      return prev;
    });
  };

  // Edit dessert
  const editDessert = (dessert: Product) => {
    setEditingDessert(dessert);
    setFormData({
      name: dessert.name,
      description: dessert.description,
      shortDescription: dessert.shortDescription,
      price: dessert.price,
      originalPrice: dessert.originalPrice || 0,
      category: dessert.category,
      subcategory: dessert.subcategory || "",
      customCategory:
        dessert.category === "otro" ? dessert.subcategory || "" : "",
      images: dessert.images,
      thumbnailImage: dessert.thumbnailImage,
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
    setShowAddForm(true);
  };

  // Save dessert
  const saveDessert = () => {
    const finalCategory =
      formData.category === "otro" ? "otro" : formData.category;
    const finalSubcategory =
      formData.category === "otro"
        ? formData.customCategory
        : formData.subcategory;

    const newDessert: Product = {
      id: editingDessert?.id || `dessert-${Date.now()}`,
      name: formData.name,
      description: formData.description,
      shortDescription: formData.shortDescription,
      price: formData.price,
      originalPrice: formData.originalPrice,
      category: finalCategory as Product["category"],
      subcategory: finalSubcategory,
      images: formData.images,
      thumbnailImage: formData.thumbnailImage,
      preparationTime: formData.preparationTime,
      serves: formData.serves,
      difficulty: formData.difficulty,
      customizations: formData.customizations,
      allergens: formData.allergens,
      dietaryOptions: formData.dietaryOptions,
      ingredients: formData.ingredients,
      tags: formData.tags,
      featured: formData.featured,
      available: formData.available,
      seasonal: formData.seasonal,
      popularityScore: formData.popularityScore,
      rating: formData.rating,
      reviewsCount: formData.reviewsCount,
      createdAt: editingDessert?.createdAt || new Date(),
      updatedAt: new Date(),
      nutritionalInfo: editingDessert?.nutritionalInfo,
      seo: formData.seo,
    };

    if (isEditing && editingDessert) {
      setDesserts((prev) =>
        prev.map((d) => (d.id === editingDessert.id ? newDessert : d)),
      );
    } else {
      setDesserts((prev) => [...prev, newDessert]);
    }

    resetForm();
    alert(isEditing ? "Postre actualizado" : "Postre agregado");
  };

  // Delete dessert
  const deleteDessert = (id: string) => {
    setDesserts((prev) => prev.filter((d) => d.id !== id));
    setShowDeleteConfirm(null);
    alert("Postre eliminado");
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
        case "popularity":
          return b.popularityScore - a.popularityScore;
        default:
          return 0;
      }
    });

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dusty-rose to-cream flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-playfair text-dark-cocoa mb-2">
              Panel de Administración
            </h1>
            <p className="text-mocha/70">
              Ingresa tu contraseña para continuar
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-mocha/80 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-dusty-rose/20 focus:border-dusty-rose focus:ring-2 focus:ring-dusty-rose/20 outline-none"
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-dusty-rose text-white py-3 rounded-lg hover:bg-dusty-rose/90 transition-colors font-medium"
            >
              Iniciar Sesión
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream to-creamy-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-playfair text-dark-cocoa mb-2">
              Panel de Administración
            </h1>
            <p className="text-mocha/70">Gestiona tus postres y productos</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                resetForm();
                setShowAddForm(true);
              }}
              className="bg-dusty-rose text-white px-4 py-2 rounded-lg hover:bg-dusty-rose/90 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Agregar Postre</span>
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="text-mocha/70 hover:text-mocha transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-gentle p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-mocha/80 mb-2">
                Buscar
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-mocha/40 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-dusty-rose/20 focus:border-dusty-rose focus:ring-2 focus:ring-dusty-rose/20 outline-none"
                  placeholder="Buscar postres..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-mocha/80 mb-2">
                Categoría
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-dusty-rose/20 focus:border-dusty-rose focus:ring-2 focus:ring-dusty-rose/20 outline-none"
              >
                <option value="all">Todas las categorías</option>
                <option value="tartas">Tartas</option>
                <option value="macarons">Macarons</option>
                <option value="cupcakes">Cupcakes</option>
                <option value="galletas">Galletas</option>
                <option value="postres-especiales">Postres Especiales</option>
                <option value="temporada">Temporada</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-mocha/80 mb-2">
                Ordenar por
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-dusty-rose/20 focus:border-dusty-rose focus:ring-2 focus:ring-dusty-rose/20 outline-none"
              >
                <option value="name">Nombre</option>
                <option value="price">Precio</option>
                <option value="rating">Calificación</option>
                <option value="popularity">Popularidad</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-mocha/70">
              <div className="font-medium">
                {filteredDesserts.length} postres
              </div>
              <div>
                {filteredDesserts.filter((d) => d.available).length} disponibles
              </div>
            </div>
          </div>
        </div>

        {/* Desserts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredDesserts.map((dessert) => (
            <motion.div
              key={dessert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-gentle overflow-hidden border border-dusty-rose/10 hover:shadow-soft transition-shadow"
            >
              <div className="relative">
                <div className="h-48 bg-gradient-to-br from-dusty-rose/10 to-cream/20 flex items-center justify-center">
                  {dessert.thumbnailImage ? (
                    <img
                      src={dessert.thumbnailImage}
                      alt={dessert.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="w-16 h-16 text-dusty-rose/40" />
                  )}
                </div>

                <div className="absolute top-4 left-4 flex space-x-2">
                  {dessert.featured && (
                    <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      ⭐ Destacado
                    </span>
                  )}
                  {!dessert.available && (
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      No disponible
                    </span>
                  )}
                  {dessert.seasonal && (
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Temporada
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-playfair text-dark-cocoa">
                    {dessert.name}
                  </h3>
                  <span className="text-dusty-rose font-medium">
                    {formatPrice(dessert.price)}
                  </span>
                </div>

                <p className="text-mocha/70 text-sm mb-4 line-clamp-2">
                  {dessert.shortDescription}
                </p>

                <div className="flex items-center justify-between text-sm text-mocha/60 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{dessert.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{dessert.preparationTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{dessert.serves}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs bg-dusty-rose/10 text-dusty-rose px-2 py-1 rounded-full">
                    {dessert.category}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => editDessert(dessert)}
                      className="text-dusty-rose hover:text-dusty-rose/70 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(dessert.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
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
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto my-8"
              >
                <div className="p-6 border-b border-dusty-rose/10">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-playfair text-dark-cocoa">
                      {isEditing ? "Editar Postre" : "Agregar Nuevo Postre"}
                    </h2>
                    <button
                      onClick={resetForm}
                      className="text-mocha/70 hover:text-mocha transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-8">
                  {/* Basic Information */}
                  <div>
                    <h3 className="text-lg font-medium text-dark-cocoa mb-4">
                      Información Básica
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-mocha/80 mb-2">
                          Nombre del postre
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-dusty-rose/20 focus:border-dusty-rose focus:ring-2 focus:ring-dusty-rose/20 outline-none"
                          placeholder="Nombre del postre"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-mocha/80 mb-2">
                          Precio
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-dusty-rose/20 focus:border-dusty-rose focus:ring-2 focus:ring-dusty-rose/20 outline-none"
                          placeholder="0.00"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-mocha/80 mb-2">
                          Categoría
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-dusty-rose/20 focus:border-dusty-rose focus:ring-2 focus:ring-dusty-rose/20 outline-none"
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

                      <div>
                        <label className="block text-sm font-medium text-mocha/80 mb-2">
                          Tiempo de preparación
                        </label>
                        <input
                          type="text"
                          name="preparationTime"
                          value={formData.preparationTime}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-dusty-rose/20 focus:border-dusty-rose focus:ring-2 focus:ring-dusty-rose/20 outline-none"
                          placeholder="2-3 días"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-mocha/80 mb-2">
                          Porciones
                        </label>
                        <input
                          type="text"
                          name="serves"
                          value={formData.serves}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-dusty-rose/20 focus:border-dusty-rose focus:ring-2 focus:ring-dusty-rose/20 outline-none"
                          placeholder="8-10 personas"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-mocha/80 mb-2">
                          Dificultad
                        </label>
                        <select
                          name="difficulty"
                          value={formData.difficulty}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-dusty-rose/20 focus:border-dusty-rose focus:ring-2 focus:ring-dusty-rose/20 outline-none"
                          required
                        >
                          <option value="Fácil">Fácil</option>
                          <option value="Intermedio">Intermedio</option>
                          <option value="Avanzado">Avanzado</option>
                        </select>
                      </div>
                    </div>

                    {/* Custom Category Input */}
                    {formData.category === "otro" && (
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-mocha/80 mb-2">
                          Tipo de dulce personalizado
                        </label>
                        <input
                          type="text"
                          name="customCategory"
                          value={formData.customCategory}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-dusty-rose/20 focus:border-dusty-rose focus:ring-2 focus:ring-dusty-rose/20 outline-none"
                          placeholder="Ej: Flanes, Cheesecakes, Mousses, etc."
                          required
                        />
                      </div>
                    )}
                  </div>

                  {/* Images */}
                  <div>
                    <h3 className="text-lg font-medium text-dark-cocoa mb-4">
                      Imágenes
                    </h3>
                    <div className="space-y-6">
                      {/* Thumbnail Image */}
                      <div>
                        <label className="block text-sm font-medium text-mocha/80 mb-2">
                          Imagen principal (miniatura)
                        </label>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-4">
                            <div className="flex-1">
                              <input
                                type="text"
                                value={formData.thumbnailImage}
                                onChange={(e) =>
                                  handleImageUrlChange(
                                    e.target.value,
                                    "thumbnailImage",
                                  )
                                }
                                className="w-full px-4 py-3 rounded-lg border border-dusty-rose/20 focus:border-dusty-rose focus:ring-2 focus:ring-dusty-rose/20 outline-none"
                                placeholder="URL de la imagen principal"
                              />
                            </div>
                            <label className="flex items-center space-x-2 bg-dusty-rose/10 text-dusty-rose px-4 py-3 rounded-lg hover:bg-dusty-rose/20 transition-colors cursor-pointer">
                              <Upload className="w-4 h-4" />
                              <span className="text-sm">Subir</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                  handleImageUpload(e, "thumbnailImage")
                                }
                                className="hidden"
                              />
                            </label>
                          </div>
                          {formData.thumbnailImage && (
                            <div className="w-32 h-32 rounded-lg overflow-hidden border border-dusty-rose/20">
                              <img
                                src={formData.thumbnailImage}
                                alt="Previsualización"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Gallery Images */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-sm font-medium text-mocha/80">
                            Galería de imágenes
                          </label>
                          <button
                            type="button"
                            onClick={addImageSlot}
                            className="text-dusty-rose text-sm hover:text-dusty-rose/80 transition-colors flex items-center space-x-1"
                          >
                            <Plus className="w-4 h-4" />
                            <span>Agregar imagen</span>
                          </button>
                        </div>
                        <div className="space-y-3">
                          {formData.images.map((image, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-4"
                            >
                              <div className="flex-1">
                                <input
                                  type="text"
                                  value={image}
                                  onChange={(e) =>
                                    handleImageUrlChange(
                                      e.target.value,
                                      "images",
                                      index,
                                    )
                                  }
                                  className="w-full px-4 py-3 rounded-lg border border-dusty-rose/20 focus:border-dusty-rose focus:ring-2 focus:ring-dusty-rose/20 outline-none"
                                  placeholder={`URL de la imagen ${index + 1}`}
                                />
                              </div>
                              <label className="flex items-center space-x-2 bg-dusty-rose/10 text-dusty-rose px-4 py-3 rounded-lg hover:bg-dusty-rose/20 transition-colors cursor-pointer">
                                <Upload className="w-4 h-4" />
                                <span className="text-sm">Subir</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) =>
                                    handleImageUpload(e, "images", index)
                                  }
                                  className="hidden"
                                />
                              </label>
                              {formData.images.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeImageSlot(index)}
                                  className="text-red-500 hover:text-red-700 transition-colors p-2"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                        {formData.images.some((img) => img) && (
                          <div className="grid grid-cols-4 gap-4 mt-4">
                            {formData.images
                              .filter((img) => img)
                              .map((image, index) => (
                                <div
                                  key={index}
                                  className="w-20 h-20 rounded-lg overflow-hidden border border-dusty-rose/20"
                                >
                                  <img
                                    src={image}
                                    alt={`Imagen ${index + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Descriptions */}
                  <div>
                    <h3 className="text-lg font-medium text-dark-cocoa mb-4">
                      Descripciones
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-mocha/80 mb-2">
                          Descripción corta
                        </label>
                        <input
                          type="text"
                          name="shortDescription"
                          value={formData.shortDescription}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-dusty-rose/20 focus:border-dusty-rose focus:ring-2 focus:ring-dusty-rose/20 outline-none"
                          placeholder="Una línea descriptiva para mostrar en tarjetas"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-mocha/80 mb-2">
                          Descripción completa
                        </label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          rows={4}
                          className="w-full px-4 py-3 rounded-lg border border-dusty-rose/20 focus:border-dusty-rose focus:ring-2 focus:ring-dusty-rose/20 outline-none resize-none"
                          placeholder="Descripción detallada del postre, ingredientes especiales, historia, etc."
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Options */}
                  <div>
                    <h3 className="text-lg font-medium text-dark-cocoa mb-4">
                      Opciones
                    </h3>
                    <div className="flex flex-wrap gap-6">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name="featured"
                          checked={formData.featured}
                          onChange={handleInputChange}
                          className="rounded border-dusty-rose/20 text-dusty-rose focus:border-dusty-rose focus:ring-dusty-rose/20"
                        />
                        <span className="text-sm text-mocha/80">Destacado</span>
                      </label>

                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name="available"
                          checked={formData.available}
                          onChange={handleInputChange}
                          className="rounded border-dusty-rose/20 text-dusty-rose focus:border-dusty-rose focus:ring-dusty-rose/20"
                        />
                        <span className="text-sm text-mocha/80">
                          Disponible
                        </span>
                      </label>

                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name="seasonal"
                          checked={formData.seasonal}
                          onChange={handleInputChange}
                          className="rounded border-dusty-rose/20 text-dusty-rose focus:border-dusty-rose focus:ring-dusty-rose/20"
                        />
                        <span className="text-sm text-mocha/80">Temporada</span>
                      </label>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-end space-x-4 pt-6 border-t border-dusty-rose/10">
                    <button
                      onClick={resetForm}
                      className="px-6 py-3 text-mocha/70 hover:text-mocha transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={saveDessert}
                      className="bg-dusty-rose text-white px-6 py-3 rounded-lg hover:bg-dusty-rose/90 transition-colors flex items-center space-x-2"
                    >
                      <Save className="w-5 h-5" />
                      <span>{isEditing ? "Actualizar" : "Agregar"} Postre</span>
                    </button>
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
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-dark-cocoa">
                      Confirmar eliminación
                    </h3>
                    <p className="text-mocha/70 text-sm">
                      Esta acción no se puede deshacer.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-4">
                  <button
                    onClick={() => setShowDeleteConfirm(null)}
                    className="px-4 py-2 text-mocha/70 hover:text-mocha transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => deleteDessert(showDeleteConfirm)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Eliminar
                  </button>
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
