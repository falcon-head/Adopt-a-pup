import React, { createContext, useContext } from 'react';
import { View, Text } from 'native-base';
import * as Google from 'expo-google-app-auth';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
} from '@firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext({});

//items to get from the google login
const config = {
  androidClientId:
    '95867268624-78mpvmn8m2ruq2a8md1g6r3744k0v3gq.apps.googleusercontent.com',
  iosClientId:
    '95867268624-21ttstoj2namgbtdtfujda35m8sd5quj.apps.googleusercontent.com',
  scopes: ['profile', 'email'],
  Permissions: ['public_profile', 'email', 'gender', 'location'],
};

// use createContext to store the user login data
export const AuthProvider = ({ children }) => {
  // handle sign in with google
  const signInWithGoogleAsync = async () => {
    await Google.logInAsync(config).then(async (result) => {
      if (result.type === 'success') {
        // add the data to firebase firestore
        const { idToken, accessToken } = result;
        const credential = GoogleAuthProvider.credential(idToken, accessToken);
        await signInWithCredential(auth, credential);
      }

      return Promise.reject();
    });
  };

  return (
    <AuthContext.Provider value={{ user: null, signInWithGoogleAsync }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
