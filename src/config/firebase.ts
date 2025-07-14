import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJ6Wk4CQn9DYi07Kao2jnjd___J1RtJiE",
  authDomain: "titirosa-a3873.firebaseapp.com",
  projectId: "titirosa-a3873",
  storageBucket: "titirosa-a3873.firebasestorage.app",
  messagingSenderId: "879407423850",
  appId: "1:879407423850:web:b0e7224b21c091bd7dc513",
  measurementId: "G-FKSQW67X75",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Storage for image uploads
export const storage = getStorage(app);

// Environment detection
const isDevelopment =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1" ||
    window.location.hostname.includes("localhost"));

const isProduction =
  typeof window !== "undefined" &&
  (window.location.hostname.includes("web.app") ||
    window.location.hostname.includes("firebaseapp.com") ||
    process.env.NODE_ENV === "production");

// Initialize Analytics (only in production and browser environment)
export const analytics =
  typeof window !== "undefined" && isProduction ? getAnalytics(app) : null;

// Connect to Firestore emulator only in development
// TEMPORARILY DISABLED - Using production Firebase
/*
let emulatorConnected = false;
if (isDevelopment && !emulatorConnected) {
  try {
    // Only connect to emulator if we're in development and haven't connected yet
    console.log("Attempting to connect to Firestore emulator...");
    connectFirestoreEmulator(db, "localhost", 8082);
    emulatorConnected = true;
    console.log("Successfully connected to Firestore emulator");
  } catch (error) {
    // This is expected if emulator is already connected or not running
    console.log("Firestore emulator connection skipped:", error);
  }
}
*/

console.log("Using production Firebase - emulator disabled");

export default app;
