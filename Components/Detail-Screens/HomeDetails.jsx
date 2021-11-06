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
import { StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import { Colors } from '../../Styles/Colors';
import { Slider } from '../Individuals/Slider';
import { useNavigation } from '@react-navigation/core';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { flex, fontFamily, style } from 'styled-system';
import { alignItems } from 'styled-system';

// Get height and width of the  window
let { height, width } = Dimensions.get('window');

export default function HomeDetails({ navigation, route }) {
  const { item } = route.params;
  const navifations = useNavigation();
  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <StatusBar />
        <Box paddingBottom="32">
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
          <Box style={styles.contentHolder}>
            <Box style={styles.headingHolder}>
              <Heading style={styles.title}>Local Breed</Heading>
            </Box>
            <Box style={styles.location}>
              <Ionicons name="location-sharp" size={18} color="black" />
              <Text style={styles.locationValue}>Bangalore</Text>
            </Box>
            <HStack space={3} style={styles.hStack}>
              <Box style={styles.insideInfo}>
                <Center>
                  <Text style={styles.infoText}>Sex</Text>
                  <Text style={styles.infoValue}>Female</Text>
                </Center>
              </Box>
              <Box style={styles.insideInfo}>
                <Center>
                  <Text style={styles.infoText}>Age</Text>
                  <Text style={styles.infoValue}>1 Month</Text>
                </Center>
              </Box>
              <Box style={styles.insideInfo}>
                <Center>
                  <Text style={styles.infoText}>Temper</Text>
                  <Text style={styles.infoValue}>Hyperactive</Text>
                </Center>
              </Box>
            </HStack>
            <Box style={styles.contactHolder}>
              <HStack style={styles.hStack}>
                <Avatar
                  size="md"
                  source={{
                    uri: 'https://pbs.twimg.com/profile_images/1309797238651060226/18cm6VhQ_400x400.jpg',
                  }}
                />
                <VStack style={styles.orgHolder} flex={1}>
                  <Heading style={styles.owner} size="md">
                    Cupa Foundation
                  </Heading>
                  <Text style={styles.org}>Pet's Owner</Text>
                </VStack>
                <HStack
                  space={2}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box style={styles.sideIconOne}>
                    <Ionicons
                      name="call"
                      size={18}
                      color={Colors.callButtonColorOne}
                    />
                  </Box>
                  <Box style={styles.sideIconTwo}>
                    <Ionicons
                      name="ios-chatbubble"
                      size={18}
                      color={Colors.callButtonColorTwo}
                    />
                  </Box>
                </HStack>
              </HStack>
            </Box>
            <Box style={styles.summaryHolder}>
              <Heading size="md" fontFamily="Bold">
                Summary
              </Heading>
              <Text style={styles.summaryParagraph}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Dignissimos quis quam sint assumenda incidunt doloremque
                officia, veritatis soluta minus enim reprehenderit quibusdam ab
                accusamus reiciendis eaque! Atque velit saepe esse?
              </Text>
            </Box>
            <Box style={styles.summaryHolder}>
              <Heading size="md" fontFamily="Bold">
                Health History
              </Heading>
              <Box style={styles.listViewBox}>
                <Box style={styles.healthBox}>
                  <HStack display="flex" flexDirection="row" display="flex">
                    <Box style={styles.circle}></Box>
                    <VStack paddingLeft="5">
                      <Text style={styles.healthDateText}>
                        Tuesday, 25th may
                      </Text>
                      <Heading size="sm" style={styles.healthText}>
                        Rabies vaccination @ some medical
                      </Heading>
                    </VStack>
                  </HStack>
                </Box>
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
          <Box style={styles.adoptButton}>
            <Text style={styles.adoptMeText}>Adopt Me</Text>
          </Box>
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
    lineHeight: 20,
    color: Colors.black,
    fontSize: 16,
    fontFamily: 'Regular',
  },
  healthBox: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.gray,
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
    color: Colors.gray,
    justifyContent: 'flex-start',
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
