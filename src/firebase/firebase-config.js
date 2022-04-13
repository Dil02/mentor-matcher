import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDeLrQAn7IgFWQxJ9D9aIm3sSYYmkPyP5Q",
  authDomain: "backupmatcher.firebaseapp.com",
  projectId: "backupmatcher",
  storageBucket: "backupmatcher.appspot.com",
  messagingSenderId: "388124589351",
  appId: "1:388124589351:web:adb07ebd9e4b46724f3d02",
  measurementId: "G-LEFH4BKBPD"
};

//ABOVE IS FOR BACKUP FIREBASE PROJECT!!!!!!!!!!!!^^^^^

const app= initializeApp(firebaseConfig);

export const db= getFirestore();
export const auth = getAuth(app);

const storage = getStorage();
export const firestore = getFirestore(app);


// Custom Hook
export function useAuth() {
  const [ currentUser, setCurrentUser ] = useState();

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
  alert("Uploaded file! Please refresh the window");
}