import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCqiiOmo5mTZO8CsD9jxoq26sMPAvhzR4k",
    authDomain: "ar-training-app.firebaseapp.com",
    projectId: "ar-training-app",
    storageBucket: "ar-training-app.firebasestorage.app",
    messagingSenderId: "356605059521",
    appId: "1:356605059521:web:d7992f1e072aa3b2598f40"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };