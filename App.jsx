import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { extendTheme, NativeBaseProvider } from 'native-base';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { AuthProvider } from './hooks/useAuth';
import MainScreen from './Components/MainScreen/MainScreen';

//fonts
const theme = extendTheme({
  // Make sure values below matches any of the keys in `fontConfig`
  fonts: {
    heading: 'Bold',
  },
});

/***
 * Async font loading. Please look at the expo for more examples
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
      <NativeBaseProvider theme={theme}>
        <AuthProvider>
          <MainScreen />
        </AuthProvider>
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
