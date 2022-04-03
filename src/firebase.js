// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import{getFirestore} from "@firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firestore = getFirestore(app);