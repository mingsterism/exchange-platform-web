import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/firebase-storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain:
    import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN + ".firebaseapp.com",
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket:
    import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET + ".appspot.com",
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID,
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore(); //initate firestore connection

export const profileCollection = db.collection("userProfile");

// Get a reference to the storage service, which is used to create references in your storage bucket
export const storageRef = firebase.storage().ref(); // Points to root reference
