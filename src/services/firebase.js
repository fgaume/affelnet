import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'affelnet75.firebaseapp.com',
  projectId: 'affelnet75',
  storageBucket: 'affelnet75.appspot.com',
  messagingSenderId: '462901127792',
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const firebase = initializeApp(firebaseConfig);
const firestore = getFirestore(firebase);
const analytics = getAnalytics(firebase);

export { firestore, analytics };
