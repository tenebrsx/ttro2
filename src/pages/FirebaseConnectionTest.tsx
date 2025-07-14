import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";

const FirebaseConnectionTest: React.FC = () => {
  const [status, setStatus] = useState<string>("Testing...");
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    console.log(message);
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testFirebaseConnection = async () => {
    try {
      addLog("🔥 Starting Firebase connection test...");
      
      // Test 1: Try to read from products collection
      addLog("📖 Test 1: Reading products collection...");
      const productsRef = collection(db, "products");
      const snapshot = await getDocs(productsRef);
      addLog(`✅ Success: Found ${snapshot.size} products`);

      // Test 2: Try to create a test document
      addLog("📝 Test 2: Creating test document...");
      const testData = {
        name: "Test Product",
        description: "Test Description",
        price: 10.99,
        category: "test",
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const docRef = await addDoc(productsRef, testData);
      addLog(`✅ Success: Created test document with ID: ${docRef.id}`);

      // Test 3: Delete the test document
      addLog("🗑️ Test 3: Deleting test document...");
      await deleteDoc(doc(db, "products", docRef.id));
      addLog("✅ Success: Test document deleted");

      setStatus("✅ All tests passed - Firebase connection is working!");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      addLog(`❌ Error: ${errorMessage}`);
      addLog(`❌ Error code: ${(error as any)?.code}`);
      addLog(`❌ Full error: ${JSON.stringify(error, null, 2)}`);
      setStatus("❌ Firebase connection failed");
    }
  };

  useEffect(() => {
    testFirebaseConnection();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Firebase Connection Test</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Status: {status}</h2>
          <button
            onClick={testFirebaseConnection}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Run Test Again
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Logs:</h2>
          <div className="bg-gray-50 p-4 rounded max-h-96 overflow-y-auto">
            {logs.map((log, index) => (
              <div key={index} className="text-sm font-mono mb-1">
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirebaseConnectionTest;