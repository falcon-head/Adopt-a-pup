import { Box, Text, Heading } from 'native-base';
import React, { useEffect } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import FailedTransaction from '../../assets/Animations/Done/failed-transaction.json';
import { useNavigation } from '@react-navigation/core';
import { Colors } from '../../Styles/Colors';
import { CommonStrings } from '../../Styles/CommonStrings';
import { TouchableOpacity } from 'react-native-gesture-handler';

//capture the dimensions of the screen
const { width, height } = Dimensions.get('window');

export default function PaymentFailed({ navigation }) {
  //   // navigation
  //   const navigation = useNavigation();

  //   // Prevent going back to the previous screen
  //   useEffect(() => {
  //     navigation.addListener('beforeRemove', (e) => {
  //       e.preventDefault();
  //     });
  //   }, [navigation]);

  return (
    <Box style={styles.mainHolder} safeAreaTop>
      <Box style={styles.donationConfirmedHolder}>
        <LottieView
          style={styles.done}
          source={FailedTransaction}
          autoPlay
          loop={false}
        />
        <Text style={styles.donationText}>
          {CommonStrings.failedTransaction}
        </Text>
        <Text style={styles.donationPara}>
          {CommonStrings.transactionFailedMessage}
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Box style={styles.search}>
            <Heading size="md" style={styles.searchText}>
              {CommonStrings.tryAgain}
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
    width: '100%',
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
