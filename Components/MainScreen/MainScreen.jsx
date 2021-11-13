import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import LoginScreen from '../Logins/LoginScreen';
import RegisterScreen from '../Logins/RegisterScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Setting from '../Screens/Settings';
import Home from '../Screens/Home';
import Donations from '../Screens/Donations';
import { Ionicons } from '@expo/vector-icons';
import { CommonStrings } from '../../Styles/CommonStrings';
import HomeDetails from '../Detail-Screens/HomeDetails';
import DonationDetails from '../Detail-Screens/DonationDetails';
import { Colors } from '../../Styles/Colors';
import GoogleAuthLogin from '../Logins/GoogleAuthLogin';
import FilterDetail from '../Detail-Screens/FilterDetail';
import { TransitionPresets } from '@react-navigation/stack';
import ToTheReader from '../Detail-Screens/ToTheReader';
import useAuth from '../../hooks/useAuth';
import { enableScreens } from 'react-native-screens';
import { CardStyleInterpolators } from '@react-navigation/stack';

enableScreens();

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

const NavTab = () => {
  return (
    <Tab.Navigator
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
        tabBarActiveTintColor: Colors.metalGray,
        tabBarStyle: {
          color: Colors.metalGray,
          fontFamily: 'Medium',
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

const Navigation = () => {
  return (
    <BottomStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <BottomStack.Group>
        <BottomStack.Screen
          name={CommonStrings.home}
          children={() => <NavTab />}
        />
        <BottomStack.Screen name="HomeDetailScreen" component={HomeDetails} />
        <BottomStack.Screen
          name="DonationDetailScreen"
          component={DonationDetails}
          options={{
            ...TransitionPresets.ModalSlideFromBottomIOS,
          }}
        />
      </BottomStack.Group>
      <BottomStack.Group screenOptions={{ presentation: 'modal' }}>
        <BottomStack.Screen
          name="FilterDetailScreen"
          component={FilterDetail}
          options={{
            ...TransitionPresets.ModalPresentationIOS,
          }}
        />
        <BottomStack.Screen
          name="ToTheReaderDetail"
          component={ToTheReader}
          options={{
            ...TransitionPresets.ModalPresentationIOS,
          }}
        />
      </BottomStack.Group>
    </BottomStack.Navigator>
  );
};

export default function MainScreen() {
  const { user } = useAuth();

  if (user) {
    return (
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <HomeStack.Navigator>
          <HomeStack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={GoogleAuthLogin}
          />
          <HomeStack.Screen
            options={{ headerShown: false }}
            name="Register"
            component={RegisterScreen}
          />
        </HomeStack.Navigator>
      </NavigationContainer>
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
