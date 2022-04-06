import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBDFQX8ZI5dzA2NAnXj752bcVaoRl6I_Kk",
    authDomain: "mentor-matcher-g14.firebaseapp.com",
    projectId: "mentor-matcher-g14",
    storageBucket: "mentor-matcher-g14.appspot.com",
    messagingSenderId: "236114227145",
    appId: "1:236114227145:web:ef51ed9699906dbc2b8218",
    measurementId: "G-BMFHK0P8JJ"
  };

  const app= initializeApp(firebaseConfig);

  export const db= getFirestore();
  export const auth = getAuth(app);

const storage = getStorage();
export const firestore = getFirestore(app);



// Custom Hook
export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  }, [])

  return currentUser;
}

// Storage
export async function upload(file, currentUser, setLoading) {
  const fileRef = ref(storage, currentUser.uid + '.png');

  setLoading(true);
  
  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currentUser, {photoURL});
  
  setLoading(false);
  alert("Uploaded file!");
}