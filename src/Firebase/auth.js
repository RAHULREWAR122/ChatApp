import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAvIWduLkQ_V0uX2NH1m0p8v5rSFGU3HlU",
    authDomain: "chatapp-55bdc.firebaseapp.com",
    projectId: "chatapp-55bdc",
    storageBucket: "chatapp-55bdc.appspot.com",
    messagingSenderId: "366406826163",
    appId: "1:366406826163:web:046b1733ba5de5fb04d8c6"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage();
