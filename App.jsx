import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { extendTheme, NativeBaseProvider, Text, Box } from 'native-base';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import LoginScreen from './Components/LoginScreen';
import { flex } from 'styled-system';
import RegisterScreen from './Components/RegisterScreen';

/***
 * Async font loading. Please look at the expo for examples
 ***/
const getFonts = () => {
  return Font.loadAsync({
    Regular: require('./assets/fonts/AdobeClean-Regular.ttf'),
    Medium: require('./assets/fonts/AdobeClean-SemiLight.ttf'),
    Bold: require('./assets/fonts/AdobeClean-Bold.ttf'),
    Black: require('./assets/fonts/AdobeClean-Black.ttf'),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (fontLoaded) {
    return (
      <NativeBaseProvider>
        <RegisterScreen />
      </NativeBaseProvider>
    );
  } else {
    return (
      <AppLoading
        startAsync={getFonts}
        onError={console.warn}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Regular',
  },
});
