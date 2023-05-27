// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from 'react'
import { onAuthStateChanged } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7RyBlN3vc9wxmy1TQo_l1w00vfKlPif8",
  authDomain: "licenta-5e468.firebaseapp.com",
  projectId: "licenta-5e468",
  storageBucket: "licenta-5e468.appspot.com",
  messagingSenderId: "944942592053",
  appId: "1:944942592053:web:d0f47b036198653841817c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export function useAuth() {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
          if (user) {
            setAuthUser(user);
          } else {
            setAuthUser(null);
          }
        });
    
        return () => {
          listen();
        };
      }, []);

      
      return authUser;
  }