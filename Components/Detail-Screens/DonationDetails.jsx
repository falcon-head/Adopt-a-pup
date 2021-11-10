import React from 'react';
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
} from 'native-base';
import { Share, StyleSheet } from 'react-native';
import { Colors } from '../../Styles/Colors';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SharedElement } from 'react-navigation-shared-element';

const DonationDetails = ({ navigation, route }) => {
  // Capture the data from route
  const { item } = route.params;

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
              // defaultSource={require('../../../assets/images/default.png')}
              source={{ uri: item.imageURL }}
              alt="Hero Image"
              style={styles.heroImage}
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
                  <Heading size="lg" style={styles.headingStyle}>
                    {item.title}
                  </Heading>
                </SharedElement>
                <Text style={styles.paragraph}>{item.description}</Text>
              </Stack>
            </Stack>
          </ScrollView>
        </Box>
        <Box style={styles.donationButton}>
          <Pressable style={styles.donateButton}>
            <TouchableOpacity>
              <Text style={styles.donateText}>Donate</Text>
            </TouchableOpacity>
          </Pressable>
        </Box>
      </Box>
    </>
  );
};

// Shared element styles is only supported in react navigation v5 not v6
// Below code is redundant - waiting for the support from developer

DonationDetails.sharedElements = (route, otherRoute, showing) => {
  const { item } = route.params;

  console.log(item);

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
