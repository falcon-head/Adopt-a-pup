import { StatusBar } from 'expo-status-bar';
import {
  Image,
  ScrollView,
  Text,
  View,
  Box,
  HStack,
  Center,
  Heading,
} from 'native-base';
import { StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import { Colors } from '../../Styles/Colors';
import { Slider } from '../Individuals/Slider';
import { useNavigation } from '@react-navigation/core';
import { BlurView } from 'expo-blur';

// Get height and width of the  window
let { height, width } = Dimensions.get('window');

export default function HomeDetails({ navigation, route }) {
  const { item } = route.params;
  const navifations = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <StatusBar />
      <Box>
        <Slider
          arrayImage={item.images}
          backPressed={() => navigation.goBack()}
        />
        <Box style={styles.imageBottom}>
          <BlurView intensity={80} style={styles.blurContainer}>
            <Heading style={styles.blurText}>Marthalia</Heading>
          </BlurView>
        </Box>
      </Box>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  heroImage: {
    height: height * 0.6,
    width: width,
  },
  imageBottom: {
    position: 'absolute',
    width: width,
    height: 60,
    bottom: 0,
  },
  blurContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  blurText: {
    left: 20,
    fontFamily: 'Bold',
    color: Colors.white,
  },
});
