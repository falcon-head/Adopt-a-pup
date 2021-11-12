import React, { createContext, useContext } from 'react';
import { View, Text } from 'native-base';

const AuthContext = createContext({});

// use createContext to store the user login data
export const AuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={{ user: 'lol' }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function auth() {
  return useContext(AuthContext);
}
