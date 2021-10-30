import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { extendTheme, NativeBaseProvider, Text, Box } from 'native-base';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import LoginScreen from './Components/Logins/LoginScreen';
import RegisterScreen from './Components/Logins/RegisterScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Setting from './Components/Screens/Settings';
import Home from './Components/Screens/Home';
import Donations from './Components/Screens/Donations';
import { Ionicons } from '@expo/vector-icons';
import { CommonStrings } from './Styles/CommonStrings';
import HomeDetails from './Components/Detail-Screens/HomeDetails';
import DonationDetails from './Components/Detail-Screens/DonationDetails';
import { Colors } from './Styles/Colors';

const Tab = createBottomTabNavigator();

/* Bottom tab configuration */

const NavTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        activeTintColor: Colors.metalGray,
        fontFamily: 'Regular',
        tabStyle: {
          marginBottom: 5,
          marginTop: 5,
          color: Colors.metalGray,
          fontFamily: 'Medium',
        },
        headerShown: false,
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let accentColor;
          if (route.name === 'Adopt') {
            iconName = focused ? 'paw' : 'paw-outline';
          } else if (route.name === 'Donations') {
            iconName = focused ? 'ios-gift' : 'ios-gift-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'ios-settings' : 'ios-settings-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen
        options={{ headerShown: false }}
        name={CommonStrings.homes}
        component={Home}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name={CommonStrings.donation}
        component={Donations}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name={CommonStrings.setting}
        component={Setting}
      />
    </Tab.Navigator>
  );
};

const BottomStack = createStackNavigator();

/** This will help keep the stack navigation in the bottom */

const Navigation = () => {
  return (
    <NavigationContainer>
      <BottomStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <BottomStack.Screen
          name={CommonStrings.home}
          children={() => <NavTab />}
        />
        <BottomStack.Screen name="AdoptDetailScreen" component={HomeDetails} />
        <BottomStack.Screen
          name="DonationDetailScreen"
          component={DonationDetails}
        />
      </BottomStack.Navigator>
    </NavigationContainer>
  );
};

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
        <LoginScreen />
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
