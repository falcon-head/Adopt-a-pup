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
} from 'native-base';
import { StyleSheet, Dimensions, Linking } from 'react-native';
import React from 'react';
import { Colors } from '../../Styles/Colors';
import { Slider } from '../Individuals/Slider';
import { useNavigation } from '@react-navigation/core';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CommonStrings } from '../../Styles/CommonStrings';

// Get height and width of the  window
let { height, width } = Dimensions.get('window');

export default function HomeDetails({ navigation, route }) {
  // Capture the data from route
  const { item } = route.params;

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
              <Heading size="lg" fontFamily="Bold">
                {CommonStrings.healthHistory}
              </Heading>
              <Box style={styles.listViewBox}>
                {item.health.map((item, index) => (
                  <Box style={styles.healthBox} key={index}>
                    <HStack display="flex" flexDirection="row" display="flex">
                      <Box style={styles.circle}></Box>
                      <VStack paddingLeft="5">
                        <Text style={styles.healthDateText}>{item.date}</Text>
                        <Heading size="md" style={styles.healthText}>
                          {item.detail}
                        </Heading>
                      </VStack>
                    </HStack>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </ScrollView>
      <Box style={styles.stickyBottom}>
        <Box>
          <Avatar.Group size="md" max={2}>
            <Avatar
              bg="green.500"
              source={{
                uri: 'https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg',
              }}
            >
              SS
            </Avatar>
            <Avatar
              bg="lightBlue.500"
              source={{
                uri: 'https://pbs.twimg.com/profile_images/1309797238651060226/18cm6VhQ_400x400.jpg',
              }}
            >
              AK
            </Avatar>
            <Avatar
              bg="indigo.500"
              source={{
                uri: 'https://pbs.twimg.com/profile_images/1352844693151731713/HKO7cnlW_400x400.jpg',
              }}
            >
              RS
            </Avatar>
            <Avatar
              bg="amber.600"
              source={{
                uri: 'https://pbs.twimg.com/profile_images/1320985200663293952/lE_Kg6vr_400x400.jpg',
              }}
            >
              MR
            </Avatar>
            <Avatar
              bg="emerald.600"
              source={{
                uri: 'https://bit.ly/code-beast',
              }}
            >
              CB
            </Avatar>
            <Avatar
              bg="blue.600"
              source={{
                uri: 'https://pbs.twimg.com/profile_images/1177303899243343872/B0sUJIH0_400x400.jpg',
              }}
            >
              GG
            </Avatar>
            <Avatar
              bg="black.600"
              source={{
                uri: 'https://pbs.twimg.com/profile_images/1352844693151731713/HKO7cnlW_400x400.jpg',
              }}
            >
              RS
            </Avatar>
            <Avatar
              bg="blueGray.600"
              source={{
                uri: 'https://pbs.twimg.com/profile_images/1320985200663293952/lE_Kg6vr_400x400.jpg',
              }}
            >
              MR
            </Avatar>
          </Avatar.Group>
        </Box>
        <Pressable style={styles.pressableBox}>
          <TouchableOpacity>
            <Box style={styles.adoptButton}>
              <Text style={styles.adoptMeText}>Adopt Me</Text>
            </Box>
          </TouchableOpacity>
        </Pressable>
      </Box>
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
  pressableBox: {
    flex: 1,
    paddingLeft: 10,
  },
  adoptMeText: {
    fontFamily: 'Bold',
    color: Colors.white,
    fontSize: 18,
  },
});
