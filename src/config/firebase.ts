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

// Initialize Analytics (only in production)
export const analytics =
  typeof window !== "undefined" && window.location.hostname !== "localhost"
    ? getAnalytics(app)
    : null;

// Connect to Firestore emulator in development
if (typeof window !== "undefined" && window.location.hostname === "localhost") {
  try {
    connectFirestoreEmulator(db, "localhost", 8080);
  } catch {
    console.log("Firestore emulator already connected or not available");
  }
}

export default app;
