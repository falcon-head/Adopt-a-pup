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
  VStack,
  Avatar,
  Pressable,
  Modal,
  Input,
  Button,
  FormControl,
  useToast,
} from 'native-base';
import { StyleSheet, Dimensions, Linking } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Colors } from '../../Styles/Colors';
import { Slider } from '../Individuals/Slider';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CommonStrings } from '../../Styles/CommonStrings';
import useAuth from '../../hooks/useAuth';
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
import { db } from '../../firebase';
import ButtonLoader from '../../assets/Animations/Done/button-loading.json';
import LottieView from 'lottie-react-native';

// Get height and width of the  window
let { height, width } = Dimensions.get('window');

export default function HomeDetails({ navigation, route }) {
  // Capture the data from route
  const { item } = route.params;
  const isadopt = item.adopted;
  const userList = item.requestedUser;
  const { user } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [address, setAddress] = useState(null);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [userRequestedForAdoption, setUserRequestedForAdoption] =
    useState(false);

  const emptyCheck = !phoneNumber || !address;

  //toast initialization
  const toast = useToast();

  // Dummy values
  const organizationContact = item.orgContact;

  // Handle the onPress event of handleCallIntent
  const handleCallIntent = () => {
    // Call the phone number
    // Link to the phone number
    Linking.openURL(`tel:${organizationContact}`);
  };

  // Handle onPress event of handleMessageIntent
  const handleMessageIntent = () => {
    // Open the message intent
    Linking.openURL(`sms:${organizationContact}`);
  };

  //handle adoption request
  const handleAdoptionRequest = async () => {
    // check if the user present in the firebase user database
    // if not present then add the user to the database
    // get the collection ref
    const docRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(docRef);
    const petRef = doc(db, 'petdb', item.id);

    if (docSnap.exists()) {
      setButtonLoader(true);
      // push the petId to user liked array
      try {
        await updateDoc(petRef, {
          likedUsers: arrayUnion(user.photoURL),
        });
      } catch (error) {
        alert(error);
      }

      try {
        await updateDoc(petRef, {
          requestedUser: arrayUnion(user.uid),
        });
      } catch (error) {
        alert(error);
      }

      try {
        await updateDoc(docRef, {
          requestedPet: arrayUnion({
            id: item.id,
            name: item.name,
            profileImage: item.profileImage,
          }),
        });
        navigation.navigate('FilterDetailScreen');
      } catch (error) {
        alert('Something went wrong');
      }

      setButtonLoader(false);
    } else {
      // add the user to the database
      console.log('I need to add the user to the database');
      setShowModal(true);
    }
  };

  // handle the button and liked user request
  useEffect(() => {
    if (userList.length > 0) {
      if (userList.includes(user.uid)) {
        setUserRequestedForAdoption(true);
      }
    }
  }, []);

  // update user data
  const updateUserData = () => {
    setShowModal(false);
    setDoc(doc(db, 'users', user.uid), {
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid,
      phoneNumber: phoneNumber,
      addressTwo: address,
      requestedPet: [],
      cards: [],
      donations: [],
    });
    toast.show({
      description:
        'Your profile has been updated successfully. You are ready to go',
    });
  };

  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <StatusBar />
        <Box paddingBottom="32">
          <Box>
            <Slider
              arrayImage={item.slideshow}
              backPressed={() => navigation.goBack()}
            />
            <Box style={styles.imageBottom}>
              <BlurView intensity={80} style={styles.blurContainer}>
                <Heading style={styles.blurText}>{item.name}</Heading>
              </BlurView>
            </Box>
          </Box>
          <Box style={styles.contentHolder}>
            <Box style={styles.headingHolder}>
              <Heading style={styles.title}>{item.breed}</Heading>
            </Box>
            <Box style={styles.location}>
              <Ionicons name="location-sharp" size={18} color="black" />
              <Text style={styles.locationValue}>{item.location}</Text>
            </Box>
            <HStack space={3} style={styles.hStack}>
              <Box style={styles.insideInfo}>
                <Center>
                  <Text style={styles.infoText}>{CommonStrings.sex}</Text>
                  <Text style={styles.infoValue}>{item.gender}</Text>
                </Center>
              </Box>
              <Box style={styles.insideInfo}>
                <Center>
                  <Text style={styles.infoText}>{CommonStrings.age}</Text>
                  <Text style={styles.infoValue}>
                    {item.age.replace('old', '').replace('Old', '')}
                  </Text>
                </Center>
              </Box>
              <Box style={styles.insideInfo}>
                <Center>
                  <Text style={styles.infoText}>{CommonStrings.temper}</Text>
                  <Text style={styles.infoValue}>{item.temper}</Text>
                </Center>
              </Box>
            </HStack>
            <Box style={styles.contactHolder}>
              <HStack style={styles.hStack}>
                <Avatar
                  size="md"
                  source={{
                    uri: item.orgProfile,
                  }}
                />
                <VStack style={styles.orgHolder} flex={1}>
                  <Heading style={styles.owner} size="md">
                    {item.orgName}
                  </Heading>
                  <Text style={styles.org}>{item.orgRelation}</Text>
                </VStack>
                <HStack
                  space={2}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <TouchableOpacity onPress={() => handleCallIntent()}>
                    <Box style={styles.sideIconOne}>
                      <Ionicons
                        name="call"
                        size={18}
                        color={Colors.callButtonColorOne}
                      />
                    </Box>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleMessageIntent()}>
                    <Box style={styles.sideIconTwo}>
                      <Ionicons
                        name="ios-chatbubble"
                        size={18}
                        color={Colors.callButtonColorTwo}
                      />
                    </Box>
                  </TouchableOpacity>
                </HStack>
              </HStack>
            </Box>
            <Box style={styles.summaryHolder}>
              <Heading size="lg" fontFamily="Bold">
                {CommonStrings.summary}
              </Heading>
              <Text style={styles.summaryParagraph}>
                {item.summary.replace(/\\n/g, '\n').replace(/\\t/g, '\t')}
              </Text>
            </Box>
            <Box style={styles.summaryHolder}>
              {item.health.length > 0 ? (
                <>
                  <Heading size="lg" fontFamily="Bold">
                    {CommonStrings.healthHistory}
                  </Heading>
                  <Box style={styles.listViewBox}>
                    {item.health.map((item, index) => (
                      <Box style={styles.healthBox} key={index}>
                        <HStack
                          display="flex"
                          flexDirection="row"
                          display="flex"
                        >
                          <Box style={styles.circle}></Box>
                          <VStack paddingLeft="5">
                            <Text style={styles.healthDateText}>
                              {item.date}
                            </Text>
                            <Heading size="md" style={styles.healthText}>
                              {item.detail}
                            </Heading>
                          </VStack>
                        </HStack>
                      </Box>
                    ))}
                  </Box>
                </>
              ) : (
                <> </>
              )}
            </Box>
          </Box>
        </Box>
      </ScrollView>
      <Box style={styles.stickyBottom}>
        <Box>
          {item.likedUsers.length > 0 ? (
            <Avatar.Group size="md" max={2}>
              {item.likedUsers.map((item, index) => (
                <Avatar
                  bg="green.500"
                  key={index}
                  source={{
                    uri: item,
                  }}
                />
              ))}
            </Avatar.Group>
          ) : (
            <></>
          )}
        </Box>
        {isadopt ? (
          <Pressable style={styles.pressableBox}>
            <Box style={styles.adoptButtonGrayed}>
              <Text style={styles.adoptMeTextGrayed}>
                {CommonStrings.adopted}
              </Text>
            </Box>
          </Pressable>
        ) : (
          <>
            {!userRequestedForAdoption ? (
              <>
                {buttonLoader ? (
                  <Pressable style={styles.pressableBox}>
                    <Box style={styles.adoptButtonLoading}>
                      <LottieView
                        source={ButtonLoader}
                        autoPlay
                        loop
                        style={styles.lottieLoader}
                      />
                    </Box>
                  </Pressable>
                ) : (
                  <Pressable style={styles.pressableBox}>
                    <TouchableOpacity onPress={() => handleAdoptionRequest()}>
                      <Box style={styles.adoptButton}>
                        <Text style={styles.adoptMeText}>
                          {CommonStrings.adoptMe}
                        </Text>
                      </Box>
                    </TouchableOpacity>
                  </Pressable>
                )}
              </>
            ) : (
              <Pressable style={styles.pressableBox}>
                <Box style={styles.adoptButtonRequested}>
                  <Text style={styles.adoptMeText}>
                    {CommonStrings.requested}
                  </Text>
                </Box>
              </Pressable>
            )}
          </>
        )}
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
    </>
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
  contentHolder: {
    marginTop: 20,
  },
  headingHolder: {
    paddingLeft: 20,
    paddingRight: 20,
    display: 'flex',
  },
  title: {
    fontFamily: 'Bold',
  },
  location: {
    paddingTop: 5,
    paddingLeft: 18,
    paddingRight: 18,
    display: 'flex',
    flexDirection: 'row',
    fontFamily: 'Regular',
    alignItems: 'center',
  },
  locationValue: {
    fontFamily: 'Regular',
    fontSize: 16,
    paddingLeft: 5,
  },
  hStack: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    display: 'flex',
  },
  insideInfo: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.cardBackground,
    height: 80,
    flex: 1,
    borderRadius: 30,
  },
  infoText: { fontFamily: 'Bold', color: Colors.lightGray, fontSize: 16 },
  infoValue: {
    fontFamily: 'Bold',
    fontSize: 18,
    textTransform: 'capitalize',
  },
  contactHolder: {
    paddingTop: 10,
  },
  orgHolder: {
    paddingLeft: 10,
    fontFamily: 'Bold',
    textTransform: 'capitalize',
  },
  owner: {
    fontFamily: 'Bold',
    textTransform: 'capitalize',
  },
  org: {
    fontFamily: 'Bold',
    color: Colors.articleGray,
    textTransform: 'capitalize',
  },
  sideIconOne: {
    height: 40,
    width: 40,
    backgroundColor: Colors.callButtonOne,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sideIconTwo: {
    height: 40,
    width: 40,
    backgroundColor: Colors.callButtonTwo,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryHolder: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  summaryParagraph: {
    paddingTop: 10,
    lineHeight: 24,
    color: Colors.black,
    fontSize: 18,
    fontFamily: 'Regular',
    letterSpacing: 0.2,
  },
  healthBox: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.lightGray,
    marginTop: 15,
    padding: 20,
    display: 'flex',
    alignItems: 'flex-start',
  },
  circle: {
    marginTop: 6,
    width: 10,
    height: 10,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: Colors.black,
  },
  healthDateText: {
    fontFamily: 'Bold',
    color: Colors.lightGray,
    justifyContent: 'flex-start',
    fontSize: 16,
  },
  healthText: {
    fontFamily: 'Bold',
  },
  stickyBottom: {
    flexDirection: 'row',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    height: 100,
    borderTopWidth: 0.5,
    borderTopColor: Colors.lightGray,
    backgroundColor: Colors.fixedBottomColor,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20,
  },
  adoptButton: {
    backgroundColor: Colors.adoptButtonColor,
    height: 50,
    borderRadius: 15,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  adoptButtonGrayed: {
    backgroundColor: Colors.disabledButtonColor,
    height: 50,
    borderRadius: 15,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressableBox: {
    flex: 1,
    paddingLeft: 10,
  },
  adoptMeText: {
    fontFamily: 'Bold',
    color: Colors.white,
    fontSize: 18,
  },
  adoptMeTextGrayed: {
    color: Colors.disabledButtonTextColor,
    fontFamily: 'Bold',
    fontSize: 18,
  },
  adoptButtonLoading: {
    backgroundColor: Colors.adoptButtonColor,
    height: 50,
    borderRadius: 15,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieLoader: {
    width: '100%',
    height: 40,
  },
  adoptButtonRequested: {
    backgroundColor: 'orange',
    height: 50,
    borderRadius: 15,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
