import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyDtCjbD8YYhlrA9ethuxdQ6VGDWrKCr04w",
  authDomain: "mini-todo-app-f61d1.firebaseapp.com",
  projectId: "mini-todo-app-f61d1",
  storageBucket: "mini-todo-app-f61d1.appspot.com",
  messagingSenderId: "419123713389",
  appId: "1:419123713389:web:e3759ee9df8bd1bf7a7664",
  measurementId: "G-PJZSGN1W44"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);