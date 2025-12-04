// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyvY98_NxMJeC-su4Qy8E3RE6a_Fb443M",
  authDomain: "aube-7f1e7.firebaseapp.com",
  projectId: "aube-7f1e7",
  storageBucket: "aube-7f1e7.firebasestorage.app",
  messagingSenderId: "636842216264",
  appId: "1:636842216264:web:4d1409d267cdc8cabb817d",
  measurementId: "G-QRXZ52G7C7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);