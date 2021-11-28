import React, { createContext, useContext, useMemo, useState } from 'react';
import { View, Text } from 'native-base';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
} from '@firebase/auth';
import { auth } from '../firebase';
import { useEffect } from 'react';
import { doc, serverTimestamp, setDoc } from '@firebase/firestore';
import { db } from '../firebase';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const AuthContext = createContext({});

//items to get from the google login
GoogleSignin.configure({
  webClientId:
    '816256765542-m9bofs3aiq8vieamrmkjf6qpuql5l78e.apps.googleusercontent.com',
  iosClientId:
    '816256765542-j9d3vkmbncfbmetvh1ofvkghlcr0363n.apps.googleusercontent.com',
  scopes: ['profile', 'email'],
});

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
      // }
      // await Google.logInAsync(config)
      //   .then(async (result) => {
      //     if (result.type === 'success') {
      //       const { idToken, accessToken } = result;
      //       const credential = GoogleAuthProvider.credential(
      //         idToken,
      //         accessToken
      //       );
      //       await signInWithCredential(auth, credential);
      //     }
      //     const user = result.user;
      //     pushToDB(user);

      //     return Promise.reject();
      //   })
      //   .catch((error) => setErrors(error));
    }
  };

  //using the memo to stop the re-renering of all the component
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

  return (
    <AuthContext.Provider value={memoedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
