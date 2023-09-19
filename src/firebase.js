  // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {

  apiKey: "AIzaSyDXPHpPB-Kk3lwob_TNc1Q8L6-1-wCJxyw",

  authDomain: "urls-swaping.firebaseapp.com",

  projectId: "urls-swaping",

  storageBucket: "urls-swaping.appspot.com",

  messagingSenderId: "71213527826",

  appId: "1:71213527826:web:ddcdc367cb957f33a979cb"

};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);