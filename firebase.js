// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDxZRitphLRP6hhH6T3uZd90QvCEJXXqE8',
  authDomain: 'adopt-ffa35.firebaseapp.com',
  projectId: 'adopt-ffa35',
  storageBucket: 'adopt-ffa35.appspot.com',
  messagingSenderId: '816256765542',
  appId: '1:816256765542:web:378035f35ca3aeb230a7a7',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth();
const db = getFirestore();
const functions = getFunctions(app);

export { app, auth, db };
