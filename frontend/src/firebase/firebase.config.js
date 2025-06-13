// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARyb1BAOIbUkaZzoI21G5gEj-KyrO4oYE",
  authDomain: "network-online-service-a8ffb.firebaseapp.com",
  projectId: "network-online-service-a8ffb",
  // storageBucket: "network-online-service-a8ffb.firebasestorage.app",
  storageBucket: "network-online-service-a8ffb.appspot.com",

  messagingSenderId: "755298212721",
  appId: "1:755298212721:web:a4dbf2aa7334c7fdc0f4d0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export default auth;
