import React, { useEffect } from 'react';
import {
  Box,
  Center,
  Heading,
  Text,
  Select,
  VStack,
  CheckIcon,
  Pressable,
} from 'native-base';
import { StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Colors } from '../../Styles/Colors';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { CommonStrings } from '../../Styles/CommonStrings';
import { useNavigation } from '@react-navigation/core';
import Anim from '../../assets/Animations/Done/done.json';

//Get the dimensions of the screen
const { width, height } = Dimensions.get('window');

export default function FilterDetail() {
  // navigation
  const navigation = useNavigation();

  // Prevent going back to the previous screen
  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
    });
  }, [navigation]);

  return (
    <Box style={styles.modalHolder}>
      <LottieView style={styles.done} source={Anim} autoPlay loop={false} />
      <Center>
        <Heading size="xl" style={styles.heading}>
          {CommonStrings.thankYou}
        </Heading>
        <Text style={styles.thankYouText}>{CommonStrings.thankYouMessage}</Text>
      </Center>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Adopt');
        }}
      >
        <Box style={styles.search}>
          <Heading size="md" style={styles.searchText}>
            {CommonStrings.letsGoHome}
          </Heading>
        </Box>
      </TouchableOpacity>
    </Box>
  );
}

const styles = StyleSheet.create({
  modalHolder: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  done: {
    width: width * 0.5,
    height: height * 0.5,
  },
  heading: {
    fontFamily: 'Bold',
  },
  search: {
    width: width * 0.8,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.refreshButtonColor,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  searchText: {
    color: Colors.white,
    fontFamily: 'Bold',
  },
  thankYouText: {
    width: width * 0.9,
    fontSize: 18,
    color: Colors.metalGray,
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: 'Regular',
  },
});
