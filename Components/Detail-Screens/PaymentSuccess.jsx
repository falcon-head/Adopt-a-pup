import { Box, Text, Heading } from 'native-base';
import React, { useEffect } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import DonationConfirmed from '../../assets/Animations/Done/d-confirmed.json';
import { useNavigation } from '@react-navigation/core';
import { Colors } from '../../Styles/Colors';
import { CommonStrings } from '../../Styles/CommonStrings';
import { TouchableOpacity } from 'react-native-gesture-handler';

//capture the dimensions of the screen
const { width, height } = Dimensions.get('window');

export default function PaymentSuccess() {
  // navigation
  const navigation = useNavigation();

  // Prevent going back to the previous screen
  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
    });
  }, [navigation]);

  return (
    <Box style={styles.mainHolder} safeAreaTop>
      <Box style={styles.donationConfirmedHolder}>
        <LottieView
          style={styles.done}
          source={DonationConfirmed}
          autoPlay
          loop={true}
        />
        <Text style={styles.donationText}>
          {CommonStrings.thanksForYourDonation}
        </Text>
        <Text style={styles.donationPara}>
          {CommonStrings.thanksForYourDonationMessage}
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Donations');
          }}
        >
          <Box style={styles.search}>
            <Heading size="md" style={styles.searchText}>
              {CommonStrings.goToDonations}
            </Heading>
          </Box>
        </TouchableOpacity>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  mainHolder: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  done: {
    width: width,
    height: height * 0.45,
  },
  donationConfirmedHolder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  donationText: {
    fontSize: 28,
    fontFamily: 'Bold',
    paddingTop: 10,
  },
  donationPara: {
    fontSize: 18,
    fontFamily: 'Regular',
    paddingTop: 20,
    textAlign: 'center',
    letterSpacing: 1,
  },
  goDonation: {
    backgroundColor: Colors.refreshButtonColor,
    width: '100%',
    borderRadius: 10,
    height: 50,
  },
  theBox: {
    width: '100%',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginTop: 40,
  },
  searchText: {
    color: Colors.white,
    fontFamily: 'Bold',
  },
});
