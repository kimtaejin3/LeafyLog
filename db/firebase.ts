import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCs97sFVIO8Ih4FSfaWjMJMOgF6E1VB25w",
  authDomain: "leafylog-2f8bc.firebaseapp.com",
  projectId: "leafylog-2f8bc",
  storageBucket: "leafylog-2f8bc.appspot.com",
  messagingSenderId: "1073983305793",
  appId: "1:1073983305793:web:89efefee4e64f30cd12ec0",
  measurementId: "G-F6T7164FDG",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
