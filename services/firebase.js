import { initializeApp } from "firebase/app";
//import { getAuth } from 'firebase/auth'
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyBU_ZciAuk-2ZjDISns1IIpGcJJBvw3Rgg",
  authDomain: "react-shop-f4b14.firebaseapp.com",
  projectId: "react-shop-f4b14",
  storageBucket: "react-shop-f4b14.appspot.com",
  messagingSenderId: "628260170468",
  appId: "1:628260170468:web:d64193b07f15d26c5c5af1"
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);



