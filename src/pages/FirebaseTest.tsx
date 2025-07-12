import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Database,
  Wifi,
  WifiOff,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  Package,
  Star,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { useFirebaseProductsContext } from '../contexts/FirebaseProductsContext';
import { formatPrice } from '../utils/currency';
import { runFirebaseDiagnostic, checkFirebaseHealth } from '../utils/firebaseDiagnostic';

const FirebaseTest: React.FC = () => {
  const {
    products,
    loading,
    error,
    featuredProducts,
    productStats,
    refreshProducts,
    createProduct
  } = useFirebaseProductsContext();

  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [diagnosticResults, setDiagnosticResults] = useState<any>(null);
  const [isRunningDiagnostic, setIsRunningDiagnostic] = useState(false);
  const [testProductCreated, setTestProductCreated] = useState(false);

  // Update timestamp every second to show real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Check connection status
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const isHealthy = await checkFirebaseHealth();
        setConnectionStatus(isHealthy ? 'connected' : 'error');
      } catch {
        setConnectionStatus('error');
      }
    };

    checkConnection();

    // Check every 30 seconds
    const interval = setInterval(checkConnection, 30000);
    return () => clearInterval(interval);
  }, []);

  // Update last update time when products change
  useEffect(() => {
    if (!loading) {
      setLastUpdate(new Date());
    }
  }, [products, loading]);

  const runDiagnostic = async () => {
    setIsRunningDiagnostic(true);
    try {
      const results = await runFirebaseDiagnostic();
      setDiagnosticResults(results);
    } catch (error) {
      console.error('Diagnostic failed:', error);
    } finally {
      setIsRunningDiagnostic(false);
    }
  };

  const createTestProduct = async () => {
    try {
      const testProduct = {
        name: `Producto de Prueba ${Date.now()}`,
        description: 'Este es un producto de prueba creado para verificar la funcionalidad en tiempo real de Firebase.',
        shortDescription: 'Producto de prueba para Firebase',
        price: 500,
        category: 'otro' as const,
        images: ['https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg'],
        thumbnailImage: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg',
        preparationTime: '15 minutos',
        serves: '1 persona',
        difficulty: 'Fácil' as const,
        customizations: ['Sin personalización'],
        allergens: ['Ninguno'],
        dietaryOptions: ['Regular'],
        ingredients: ['Ingredientes de prueba'],
        tags: ['prueba', 'firebase', 'test'],
        featured: false,
        available: true,
        seasonal: false,
        popularityScore: 0,
        rating: 5,
        reviewsCount: 0,
        seo: {
          metaTitle: 'Producto de Prueba Firebase',
          metaDescription: 'Producto de prueba para verificar Firebase',
          keywords: ['prueba', 'firebase']
        }
      };

      const productId = await createProduct(testProduct);
      if (productId) {
        setTestProductCreated(true);
        setTimeout(() => setTestProductCreated(false), 5000);
      }
    } catch (error) {
      console.error('Error creating test product:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-500';
      case 'error': return 'text-red-500';
      default: return 'text-yellow-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <Wifi className="w-5 h-5" />;
      case 'error': return <WifiOff className="w-5 h-5" />;
      default: return <RefreshCw className="w-5 h-5 animate-spin" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-100 via-white to-cream-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-playfair font-bold text-mocha-700 mb-4">
            Firebase Real-time Test Panel
          </h1>
          <p className="text-lg text-mocha-600 font-source-serif">
            Esta página muestra el estado en tiempo real de la integración con Firebase
          </p>
        </motion.div>

        {/* Status Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Connection Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-gentle border border-dusty-rose-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-playfair font-bold text-mocha-700">Conexión</h3>
              <div className={getStatusColor(connectionStatus)}>
                {getStatusIcon(connectionStatus)}
              </div>
            </div>
            <p className={`text-sm font-source-serif ${getStatusColor(connectionStatus)}`}>
              {connectionStatus === 'connected' ? 'Conectado' :
               connectionStatus === 'error' ? 'Error' : 'Verificando...'}
            </p>
          </motion.div>

          {/* Products Count */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-gentle border border-dusty-rose-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-playfair font-bold text-mocha-700">Productos</h3>
              <Package className="w-5 h-5 text-dusty-rose" />
            </div>
            <p className="text-2xl font-playfair font-bold text-dusty-rose">
              {loading ? '...' : productStats.total}
            </p>
          </motion.div>

          {/* Featured Count */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-gentle border border-dusty-rose-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-playfair font-bold text-mocha-700">Destacados</h3>
              <Star className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-2xl font-playfair font-bold text-yellow-500">
              {loading ? '...' : productStats.featured}
            </p>
          </motion.div>

          {/* Available Count */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-gentle border border-dusty-rose-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-playfair font-bold text-mocha-700">Disponibles</h3>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-2xl font-playfair font-bold text-green-500">
              {loading ? '...' : productStats.available}
            </p>
          </motion.div>
        </div>

        {/* Real-time Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-gentle border border-dusty-rose-200 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-playfair font-bold text-mocha-700">
              Estado en Tiempo Real
            </h3>
            <Clock className="w-5 h-5 text-dusty-rose" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-mocha-600 font-source-serif mb-1">Última actualización:</p>
              <p className="font-mono text-dusty-rose font-bold">
                {lastUpdate.toLocaleTimeString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-mocha-600 font-source-serif mb-1">Estado de carga:</p>
              <div className="flex items-center space-x-2">
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-yellow-500" />
                    <span className="text-yellow-500 font-source-serif">Cargando...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-green-500 font-source-serif">Completado</span>
                  </>
                )}
              </div>
            </div>

            <div>
              <p className="text-sm text-mocha-600 font-source-serif mb-1">Errores:</p>
              <div className="flex items-center space-x-2">
                {error ? (
                  <>
                    <XCircle className="w-4 h-4 text-red-500" />
                    <span className="text-red-500 font-source-serif text-xs">{error}</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-green-500 font-source-serif">Sin errores</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-gentle border border-dusty-rose-200 mb-8"
        >
          <h3 className="text-xl font-playfair font-bold text-mocha-700 mb-4">
            Acciones de Prueba
          </h3>

          <div className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={refreshProducts}
              disabled={loading}
              className="bg-dusty-rose text-white px-6 py-3 rounded-xl hover:bg-dusty-rose/90 transition-colors font-source-serif disabled:opacity-50 flex items-center space-x-2"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Actualizar Productos</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={runDiagnostic}
              disabled={isRunningDiagnostic}
              className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-colors font-source-serif disabled:opacity-50 flex items-center space-x-2"
            >
              <Database className={`w-4 h-4 ${isRunningDiagnostic ? 'animate-spin' : ''}`} />
              <span>Ejecutar Diagnóstico</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={createTestProduct}
              disabled={loading}
              className="bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition-colors font-source-serif disabled:opacity-50 flex items-center space-x-2"
            >
              <Package className="w-4 h-4" />
              <span>Crear Producto de Prueba</span>
            </motion.button>
          </div>

          {testProductCreated && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-green-50 border border-green-200 rounded-xl"
            >
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-green-700 font-source-serif">
                  ¡Producto de prueba creado exitosamente! Debería aparecer en la lista.
                </span>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Featured Products Preview */}
        {featuredProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl p-6 shadow-gentle border border-dusty-rose-200 mb-8"
          >
            <h3 className="text-xl font-playfair font-bold text-mocha-700 mb-4">
              Productos Destacados (Tiempo Real)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredProducts.slice(0, 3).map((product) => (
                <div
                  key={product.id}
                  className="border border-dusty-rose-100 rounded-xl p-4 hover:shadow-gentle transition-shadow"
                >
                  <img
                    src={product.thumbnailImage || product.images[0]}
                    alt={product.name}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg";
                    }}
                  />
                  <h4 className="font-playfair font-bold text-mocha-700 mb-2">
                    {product.name}
                  </h4>
                  <p className="text-dusty-rose font-source-serif font-bold">
                    {formatPrice(product.price)}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-mocha-600">Destacado</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Diagnostic Results */}
        {diagnosticResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-gentle border border-dusty-rose-200"
          >
            <h3 className="text-xl font-playfair font-bold text-mocha-700 mb-4">
              Resultados del Diagnóstico
            </h3>

            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-2">
                {diagnosticResults.overall === 'success' ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : diagnosticResults.overall === 'warning' ? (
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
                <span className="font-source-serif font-bold">
                  {diagnosticResults.summary}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {Object.entries(diagnosticResults.tests).map(([testName, result]: [string, any]) => (
                <div key={testName} className="flex items-center justify-between p-3 bg-cream-50 rounded-lg">
                  <span className="font-source-serif capitalize">
                    {testName.replace(/([A-Z])/g, ' $1').toLowerCase()}
                  </span>
                  <div className="flex items-center space-x-2">
                    {result.success ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-sm ${result.success ? 'text-green-600' : 'text-red-600'}`}>
                      {result.success ? 'Exitoso' : 'Error'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {diagnosticResults.recommendations.length > 0 && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <h4 className="font-source-serif font-bold text-blue-700 mb-2">
                  Recomendaciones:
                </h4>
                <ul className="space-y-1">
                  {diagnosticResults.recommendations.map((rec: string, index: number) => (
                    <li key={index} className="text-sm text-blue-600 font-source-serif">
                      • {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 bg-dusty-rose-50 border border-dusty-rose-200 rounded-2xl p-6"
        >
          <h3 className="text-xl font-playfair font-bold text-dusty-rose-700 mb-4">
            Cómo Probar la Funcionalidad en Tiempo Real
          </h3>

          <ol className="space-y-3 text-mocha-700 font-source-serif">
            <li className="flex items-start space-x-3">
              <span className="bg-dusty-rose text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
              <span>Abre esta página en una pestaña</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="bg-dusty-rose text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
              <span>Abre el panel de administración (/admin) en otra pestaña</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="bg-dusty-rose text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
              <span>Agrega, edita o elimina un producto en el admin</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="bg-dusty-rose text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span>
              <span>Observa cómo los números y productos se actualizan automáticamente en esta página</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="bg-dusty-rose text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">5</span>
              <span>¡Los cambios deberían aparecer instantáneamente sin recargar la página!</span>
            </li>
          </ol>
        </motion.div>
      </div>
    </div>
  );
};

export default FirebaseTest;
