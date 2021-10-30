// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDemMXJXOVeGtKxQeQ0CURCak1a7ZbO2pI',
  authDomain: 'cupa-564dd.firebaseapp.com',
  projectId: 'cupa-564dd',
  storageBucket: 'cupa-564dd.appspot.com',
  messagingSenderId: '95867268624',
  appId: '1:95867268624:web:7ba372a5c72a8b71d16495',
  measurementId: 'G-PKNHQ77451',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth();
const db = getFirestore();

export { app, auth, db };
