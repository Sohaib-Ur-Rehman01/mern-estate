// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC481UC_AWb9vF_y6cQr3tcsEenbDNAyDg",
  authDomain: "mern-real-estate-123.firebaseapp.com",
  projectId: "mern-real-estate-123",
  storageBucket: "mern-real-estate-123.appspot.com",
  messagingSenderId: "397730258163",
  appId: "1:397730258163:web:aff73e910ff993ecc2eb86",
  measurementId: "G-LDRPB5BVPS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);