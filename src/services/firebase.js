import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'affelnet75.firebaseapp.com',
  projectId: 'affelnet75',
  storageBucket: 'affelnet75.appspot.com',
  messagingSenderId: '462901127792',
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: "G-T8MTQSHQ6B"
};

const firebase = initializeApp(firebaseConfig);
const firestore = getFirestore(firebase);
//const analytics = getAnalytics(firebase);

export { firestore };
