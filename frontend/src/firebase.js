import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDoce6NcpBgjKP8Ks2nqDVkY7B85xVpwsY",
  authDomain: "quiz-app-vitalskills-auth.firebaseapp.com",
  projectId: "quiz-app-vitalskills-auth",
  storageBucket: "quiz-app-vitalskills-auth.appspot.com",
  messagingSenderId: "845934053251",
  appId: "1:845934053251:web:c30fe1398050efb80858b6",
  measurementId: "G-QM6NFSM4TY",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
