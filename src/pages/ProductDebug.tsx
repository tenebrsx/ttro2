import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useProducts, useProductSearch } from "../contexts/FirebaseProductsContext";
import { products as localProducts } from "../data/products";
import type { Product } from "../data/products";

const ProductDebug: React.FC = () => {
  const { testId } = useParams<{ testId?: string }>();
  const [testResult, setTestResult] = useState<Product | null>(null);
  const [testError, setTestError] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string>("");

  const { products: firebaseProducts, loading } = useProducts();
  const { getProductById } = useProductSearch();

  const testProductFetch = async (productId: string) => {
    if (!productId) return;

    setTestError(null);
    setTestResult(null);

    try {
      console.log(`Testing fetch for product ID: ${productId}`);
      const result = await getProductById(productId);
      console.log(`Result:`, result);
      setTestResult(result);

      if (!result) {
        setTestError(`Product with ID "${productId}" not found`);
      }
    } catch (error) {
      console.error("Error testing product fetch:", error);
      setTestError(error instanceof Error ? error.message : String(error));
    }
  };

  useEffect(() => {
    if (testId) {
      testProductFetch(testId);
    }
  }, [testId, getProductById]);

  return (
    <div className="pt-20 min-h-screen bg-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h1 className="text-3xl font-playfair font-bold text-mocha-700 mb-8">
            Product Debug Tool
          </h1>

          {/* Quick Test Section */}
          <div className="mb-8 p-6 bg-cream-50 rounded-2xl">
            <h2 className="text-xl font-playfair font-semibold mb-4">Quick Product Test</h2>
            <div className="flex gap-4 mb-4">
              <select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="px-4 py-2 border border-dusty-rose-200 rounded-xl font-source-serif"
              >
                <option value="">Select a product to test...</option>
                {localProducts.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name} ({product.id})
                  </option>
                ))}
              </select>
              <button
                onClick={() => testProductFetch(selectedProductId)}
                disabled={!selectedProductId}
                className="px-6 py-2 bg-dusty-rose-500 text-white rounded-xl hover:bg-dusty-rose-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Test Fetch
              </button>
              <Link
                to={`/product/${selectedProductId}`}
                className={`px-6 py-2 bg-mocha-500 text-white rounded-xl hover:bg-mocha-600 ${
                  !selectedProductId ? 'opacity-50 pointer-events-none' : ''
                }`}
              >
                Go to Product Page
              </Link>
            </div>

            {testError && (
              <div className="p-4 bg-red-100 border border-red-300 rounded-xl text-red-700">
                <strong>Error:</strong> {testError}
              </div>
            )}

            {testResult && (
              <div className="p-4 bg-green-100 border border-green-300 rounded-xl">
                <strong>Success!</strong> Found product: {testResult.name}
                <pre className="mt-2 text-sm overflow-x-auto">
                  {JSON.stringify(testResult, null, 2)}
                </pre>
              </div>
            )}
          </div>

          {/* Data Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Local Products */}
            <div>
              <h2 className="text-xl font-playfair font-semibold mb-4">
                Local Products ({localProducts.length})
              </h2>
              <div className="bg-cream-50 rounded-2xl p-4 max-h-96 overflow-y-auto">
                {localProducts.map((product) => (
                  <div key={product.id} className="mb-3 p-3 bg-white rounded-xl">
                    <div className="font-semibold">{product.name}</div>
                    <div className="text-sm text-gray-600">ID: {product.id}</div>
                    <div className="text-sm text-gray-600">Category: {product.category}</div>
                    <Link
                      to={`/product/${product.id}`}
                      className="text-sm text-dusty-rose-600 hover:underline"
                    >
                      → Test Product Page
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Firebase Products */}
            <div>
              <h2 className="text-xl font-playfair font-semibold mb-4">
                Firebase Products ({loading ? 'Loading...' : firebaseProducts.length})
              </h2>
              <div className="bg-cream-50 rounded-2xl p-4 max-h-96 overflow-y-auto">
                {loading ? (
                  <div>Loading Firebase products...</div>
                ) : firebaseProducts.length === 0 ? (
                  <div className="text-red-600">
                    No products found in Firebase. Migration may be needed.
                  </div>
                ) : (
                  firebaseProducts.map((product) => (
                    <div key={product.id} className="mb-3 p-3 bg-white rounded-xl">
                      <div className="font-semibold">{product.name}</div>
                      <div className="text-sm text-gray-600">ID: {product.id}</div>
                      <div className="text-sm text-gray-600">Category: {product.category}</div>
                      <Link
                        to={`/product/${product.id}`}
                        className="text-sm text-dusty-rose-600 hover:underline"
                      >
                        → Test Product Page
                      </Link>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* ID Comparison */}
          <div className="mb-8 p-6 bg-cream-50 rounded-2xl">
            <h2 className="text-xl font-playfair font-semibold mb-4">ID Comparison</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Local Product IDs:</h3>
                <div className="text-sm space-y-1">
                  {localProducts.slice(0, 5).map((product) => (
                    <div key={product.id} className="font-mono bg-white p-2 rounded">
                      {product.id}
                    </div>
                  ))}
                  {localProducts.length > 5 && (
                    <div className="text-gray-500">... and {localProducts.length - 5} more</div>
                  )}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Firebase Product IDs:</h3>
                <div className="text-sm space-y-1">
                  {firebaseProducts.slice(0, 5).map((product) => (
                    <div key={product.id} className="font-mono bg-white p-2 rounded">
                      {product.id}
                    </div>
                  ))}
                  {firebaseProducts.length > 5 && (
                    <div className="text-gray-500">... and {firebaseProducts.length - 5} more</div>
                  )}
                  {firebaseProducts.length === 0 && !loading && (
                    <div className="text-red-500">No Firebase products found</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* URL Test */}
          <div className="p-6 bg-cream-50 rounded-2xl">
            <h2 className="text-xl font-playfair font-semibold mb-4">Test URLs</h2>
            <div className="space-y-2">
              <Link
                to="/product-debug/tarta-chocolate-premium"
                className="block text-dusty-rose-600 hover:underline"
              >
                Test with URL: /product-debug/tarta-chocolate-premium
              </Link>
              <Link
                to="/product-debug/macarons-franceses-clasicos"
                className="block text-dusty-rose-600 hover:underline"
              >
                Test with URL: /product-debug/macarons-franceses-clasicos
              </Link>
              <Link
                to="/product-debug/invalid-id"
                className="block text-dusty-rose-600 hover:underline"
              >
                Test with invalid ID: /product-debug/invalid-id
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8 pt-6 border-t border-dusty-rose-200">
            <Link
              to="/menu"
              className="text-dusty-rose-600 hover:underline font-source-serif"
            >
              ← Back to Menu
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDebug;
