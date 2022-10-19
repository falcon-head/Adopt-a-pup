import React, { createContext, useContext, useMemo, useState } from 'react';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
} from '@firebase/auth';
import { auth } from '../firebase';
import { useEffect } from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import * as dotenv from 'dotenv';
dotenv.config();

const AuthContext = createContext({});

// Configuring the google sign in
GoogleSignin.configure({
  webClientId: process.env.GOOGLE_WEB_CLIENT_ID,
  iosClientId: process.env.GOOGLE_WEB_CLIENT_ID,
  scopes: ['profile', 'email'],
});

// use createContext to store the user login data
export const AuthProvider = ({ children }) => {
  // useStates
  const [errors, setErrors] = useState(null);
  const [user, setUser] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);

  // auth logged in? useEffect
  // if i login the useeffect will be run to track whether the user is logged in or not
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

  //logout fuctions
  const logout = () => {
    signOut(auth).catch((error) => setErrors(error));
  };

  // handle sign in with google
  const signInWithGoogleAsync = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken, accessToken } = await GoogleSignin.signIn();
      const googleCredential = await GoogleAuthProvider.credential(
        idToken,
        accessToken
      );
      await signInWithCredential(auth, googleCredential);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
        console.log(error);
      }
    }
  };

  // using the memo to stop the re-renering of all the component
  // cache most of the values, the render will run only when user and errors are triggered
  const memoedValue = useMemo(
    () => ({
      user,
      errors,
      logout,
      signInWithGoogleAsync,
    }),
    [user, errors]
  );

  // auth context provider from
  return (
    <AuthContext.Provider value={memoedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
