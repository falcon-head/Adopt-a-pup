import React, { createContext, useContext } from 'react';
import { View, Text } from 'native-base';

const AuthContext = createContext({});

// use createContext to store the user login data
export const AuthProvider = ({ children }) => {
  return (
    <View>
      <AuthContext.Provider value={null}>{children}</AuthContext.Provider>
    </View>
  );
};

export default function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
