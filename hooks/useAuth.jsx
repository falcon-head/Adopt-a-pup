import React, { createContext, useContext, useMemo, useState } from 'react';
import { View, Text } from 'native-base';
import * as Google from 'expo-google-app-auth';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@firebase/auth';
import { auth } from '../firebase';
import { useEffect } from 'react';

const AuthContext = createContext({
  registerWithEmail: () => Promise,
  logIn: () => Promise,
});

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
  // useStates
  const [errors, setErrors] = useState(null);
  const [user, setUser] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);

  // auth logged in? useEffect
  //if i login the useeffect will be run to track whether the user is logged in or not
  // with unsubscribe from the auth state
  useEffect(
    () =>
      // This is a listener, unsub function
      onAuthStateChanged(auth, (user) => {
        if (user) {
          //get the user info
          setUser(user);
        } else {
          // logout => simply set the user to null
          setUser(null);
        }

        // setLoading to false
        setInitialLoading(false);
      }),

    []
  );

  // Register function to register with email and password
  function registerWithEmail(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // Login function to login with email and password
  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const signInWithGoogle = async () => {
    // sign in with google
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error);
    }
  };

  //logout fuctions
  const logout = () => {
    signOut(auth).catch((error) => setErrors(error));
  };

  //using the memo to stop the re-renering of all the component
  // cache most of the values, the render will run only when user and errors are triggered
  const memoedValue = useMemo(
    () => ({
      user,
      errors,
      logout,
      signInWithGoogle,
      registerWithEmail,
      logIn,
    }),
    [user, errors]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
