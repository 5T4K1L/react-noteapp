import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCFyE1UvCMLO_1-aiEcT-P8WylsxLx1AN8",
  authDomain: "noteapp-ca560.firebaseapp.com",
  projectId: "noteapp-ca560",
  storageBucket: "noteapp-ca560.appspot.com",
  messagingSenderId: "918343650723",
  appId: "1:918343650723:web:9f79a412563032b4621e16",
  measurementId: "G-ESXKXK8J7L",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
