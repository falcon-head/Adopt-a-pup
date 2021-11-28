import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  View,
  Box,
  AspectRatio,
  Image,
  Stack,
  Heading,
  Pressable,
  Modal,
  FormControl,
  Input,
  Button,
} from 'native-base';
import { Share, StyleSheet } from 'react-native';
import { Colors } from '../../Styles/Colors';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SharedElement } from 'react-navigation-shared-element';
import { CommonStrings } from '../../Styles/CommonStrings';
import { app, db } from '../../firebase';
import {
  addDoc,
  getDoc,
  updateDoc,
  doc,
  setDoc,
  arrayUnion,
  query,
  where,
  collection,
  getDocs,
} from '@firebase/firestore';
import useAuth from '../../hooks/useAuth';
import { useNavigation } from '@react-navigation/core';
import RNPgReactNativeSDK from 'react-native-pg-react-native-sdk';
import {
  httpsCallable,
  connectFunctionsEmulator,
  getFunctions,
} from 'firebase/functions';

const DonationDetails = ({ navigation, route }) => {
  // Capture the data from route
  const { item } = route.params;

  const navigations = useNavigation();

  // get the user data from useAuth hook
  const { user } = useAuth();

  // modal component useState
  const [showModal, setShowModal] = useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);

  // extra data useStates
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [address, setAddress] = useState(null);
  var [donationAmount, setDonationAmount] = useState(1);
  var [responseState, setResponseState] = useState('');
  var [apiResult, setApiResult] = useState([]);

  const emptyCheck = !phoneNumber || !address;

  const proceedToPayment = () => {
    setModalVisible(false);

    const orderData = { amount: donationAmount };

    // function to handle the donation
    const functions = getFunctions();
    // connectFunctionsEmulator(functions, 'localhost', 8081);
    const extraData = httpsCallable(functions, 'getOrderData');
    extraData(orderData)
      .then((result) => {
        console.log(result);
        setApiResult(result.data);
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
        console.log(error.details);
      });

    if (apiResult.length > 0) {
      //whenver the api result is set run this
      var inputParams = {
        orderId: apiResult.id,
        orderAmount: parseFloat(apiResult.amount),
        orderCurrency: apiResult.currency,
        tokenData: apiResult.data.cftoken,
        customerName: user.name,
        customerPhone: '',
        customerEmail: user.email,
        notifyUrl: '',
        appId: '1100126e5eef8ffc5bbe085ced210011',
        orderNote: 'Donation for' + item.name,
      };

      // //retrieve the id
      RNPgReactNativeSDK.startPaymentUPI(inputParams, 'TEST', (result) => {
        console.log(result);
        var resp = '';
        var obj = JSON.parse(result, function (key, value) {
          console.log(key);
          console.log(value);
          resp += key + ' : ' + value + '\n';
        });
        setResponseState(resp);
      });
    }
  };

  // Handle the donation request
  const handleDonate = async () => {
    // Check if the user exists in firebase users database
    const docRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // If the user exists, get the user data
      //navigate to PaymentSuccessScreen
      // Add enter amount modal
      setModalVisible(true);

      // navigations.navigate('PaymentSuccessScreen');
    } else {
      // add the user to the database
      console.log('I need to add the user to the database');
      setShowModal(true);
    }
  };

  return (
    <>
      <StatusBar style="auto" />
      <Box style={styles.closeButton} safeAreaTop>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="ios-close" size={30} color={Colors.gray} />
        </TouchableOpacity>
      </Box>
      <Box style={styles.contentBox}>
        <SharedElement id={`item.${item.id}.image`}>
          <AspectRatio ratio={3 / 2}>
            <Image
              source={{ uri: item.heroImage }}
              alt="Hero Image"
              style={styles.heroImage}
              defaultSource={require('../../assets/BackgroundLoading.png')}
            />
          </AspectRatio>
        </SharedElement>
        <Box style={styles.scrollViewHolder}>
          <ScrollView
            style={styles.settingsScrollView}
            showsVerticalScrollIndicator={false}
          >
            <Stack style={styles.mainStack}>
              <Stack>
                <SharedElement id={`item.${item.id}.location`}>
                  <Text style={styles.locationText}>{item.location}</Text>
                </SharedElement>
                <SharedElement id={`item.${item.id}.heading`}>
                  <Heading size="lg" style={[styles.headingStyle]}>
                    {item.title}
                  </Heading>
                </SharedElement>
                <Text style={styles.paragraph}>
                  {item.paragraph.replace(/\\n/g, '\n').replace(/\\t/g, '\t')}
                </Text>
              </Stack>
            </Stack>
          </ScrollView>
        </Box>
        <Box style={styles.donationButton}>
          <Pressable style={styles.donateButton}>
            <TouchableOpacity onPress={() => handleDonate()}>
              <Text style={styles.donateText}>Donate</Text>
            </TouchableOpacity>
          </Pressable>
        </Box>
      </Box>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setPhoneNumber(null);
          setAddress(null);
          setShowModal(false);
        }}
        size="lg"
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>{CommonStrings.almostThere}</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>{CommonStrings.contact}</FormControl.Label>
              <Input
                keyboardType="phone-pad"
                placeholder="9999999999"
                onChangeText={setPhoneNumber}
              />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>{CommonStrings.address}</FormControl.Label>
              <Input
                onChangeText={setAddress}
                height={20}
                textAlignVertical="top"
                multiline
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                  setPhoneNumber(null);
                  setAddress(null);
                }}
              >
                {CommonStrings.commonCancel}
              </Button>
              {emptyCheck ? (
                <Button
                  onPress={() => updateUserData()}
                  style={{ backgroundColor: Colors.disabledButtonColor }}
                  _text={{
                    color: Colors.disabledButtonTextColor,
                  }}
                >
                  {CommonStrings.commonUpdate}
                </Button>
              ) : (
                <Button onPress={() => updateUserData()}>
                  {CommonStrings.commonUpdate}
                </Button>
              )}
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Modal isOpen={modalVisible} onClose={setModalVisible} size="lg">
        <Modal.Content minH="200">
          <Modal.Header>Donation Amount</Modal.Header>
          <Modal.Body>
            <Input
              variant="underlined"
              placeholder="500"
              size="lg"
              keyboardType="number-pad"
              onChangeText={(text) => setDonationAmount(text)}
              style={{ fontSize: 30, fontWeight: 'bold', fontFamily: 'Bold' }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button.Group>
              <Button
                onPress={() => proceedToPayment()}
                backgroundColor={Colors.adoptButtonColor}
              >
                Proceed
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

// Shared element styles is only supported in react navigation v5 not v6
// Below code is redundant - waiting for the support from developer

DonationDetails.sharedElements = (route, otherRoute, showing) => {
  const { item } = route.params;

  return [
    { id: `item.${item.id}.image`, animation: 'move' },
    { id: `item.${item.id}.location`, animation: 'fade' },
    { id: `item.${item.id}.heading`, animation: 'fade' },
    { id: `item.${item.id}.para`, animation: 'fade' },
  ];
};

export default DonationDetails;

const styles = StyleSheet.create({
  settingsScrollView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  closeButton: {
    display: 'flex',
    backgroundColor: Colors.white,
    flexDirection: 'row-reverse',
    paddingStart: 20,
    paddingEnd: 20,
  },
  contentBox: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    backgroundColor: Colors.white,
  },
  locationText: {
    fontSize: 14,
    fontFamily: 'Regular',
    color: Colors.metalGray,
  },
  scrollViewHolder: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  mainStack: {
    paddingTop: 10,
    paddingBottom: 100,
  },
  heroImage: {
    resizeMode: 'cover',
  },
  headingStyle: {
    paddingTop: 10,
    fontFamily: 'Bold',
  },
  paragraph: {
    fontSize: 18,
    fontFamily: 'Regular',
    color: Colors.metalGray,
    paddingTop: 20,
  },
  donationButton: {
    flexDirection: 'row',
    width: '100%',
    position: 'absolute',
    bottom: 20,
    height: 50,
    borderTopColor: Colors.lightGray,
  },
  donateButton: {
    display: 'flex',
    backgroundColor: Colors.adoptButtonColor,
    marginLeft: 20,
    marginRight: 20,
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  donateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
  },
});
