import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { extendTheme, NativeBaseProvider } from 'native-base';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { AuthProvider } from './hooks/useAuth';
import MainScreen from './Components/MainScreen/MainScreen';
import { StripeProvider } from '@stripe/stripe-react-native';

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
        <StripeProvider publishableKey="pk_test_51JwBw9SC8udWIWgKb4gsgTJlhoPNnGc0rRQmkvtH9Fx5RhYn7qKFY2pgTnbZ6u3yLXb0jAiwF16a9gUMUWqGJvfN00KCiYW6uM">
          <AuthProvider>
            <MainScreen />
          </AuthProvider>
        </StripeProvider>
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
