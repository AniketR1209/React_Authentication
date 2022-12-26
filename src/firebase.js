import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCyohgPqaX4D-a4Eka7ZwJoehZPKLBSliE",
  authDomain: "phone-auth-ec6a3.firebaseapp.com",
  projectId: "phone-auth-ec6a3",
  storageBucket: "phone-auth-ec6a3.appspot.com",
  messagingSenderId: "202357694589",
  appId: "1:202357694589:web:36ff216ea688064fe21114"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
