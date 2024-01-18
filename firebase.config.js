// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyCSrUwoQTOWEciJ_GjepfDHarp4sALYT_Y",
        authDomain: "crud-475a7.firebaseapp.com",
        projectId: "crud-475a7",
        storageBucket: "crud-475a7.appspot.com",
        messagingSenderId: "764506306663",
        appId: "1:764506306663:web:e530ee5ccc7ca5c79f3cc2"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    export const auth = getAuth(app);
    export const db = getFirestore(app);
    export const storage = getStorage(app);