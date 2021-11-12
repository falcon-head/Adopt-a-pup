import React from 'react';
import { Box, Center, Heading, HStack, Image, Stack, Text } from 'native-base';
import { StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import { Colors } from '../../Styles/Colors';
import { CommonStrings } from '../../Styles/CommonStrings';
import { Ionicons } from '@expo/vector-icons';
import { alignItems } from 'styled-system';
import { TouchableOpacity } from 'react-native-gesture-handler';
import auth from '../../hooks/useAuth';

// Get height and width of the  window
let { height, width } = Dimensions.get('window');

export default function GoogleAuthLogin() {
  const { signInWithGoogleAsync } = auth();

  return (
    <Box style={styles.mainBox}>
      <Box style={styles.loginContainer}>
        <Stack>
          <LottieView
            style={styles.welcomeView}
            source={require('../../assets/Animations/Animation 10/drawkit-grape-animation-10-LOOP.json')}
            autoPlay
          />
          <Center style={styles.contentText}>
            <Heading size={'2xl'} fontFamily={'Bold'}>
              {CommonStrings.welcome}
            </Heading>
            <Text style={styles.missedText}>{CommonStrings.missed}</Text>
            <Box style={styles.buttonContainer}>
              <Box style={styles.buttonBackground}>
                <TouchableOpacity onPress={signInWithGoogleAsync}>
                  <HStack>
                    <Ionicons name="logo-google" size={24} color="orange" />
                    <Text style={styles.signText}>
                      {CommonStrings.signGoogle}
                    </Text>
                  </HStack>
                </TouchableOpacity>
              </Box>
            </Box>
          </Center>
        </Stack>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  mainBox: {
    flex: 1,
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  loginContainer: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  welcomeView: {
    width: width,
    height: height / 2.5,
  },
  contentText: {
    marginTop: 30,
  },
  missedText: {
    fontSize: 18,
    paddingTop: 10,
    fontFamily: 'Regular',
    color: Colors.subtleText,
  },
  buttonContainer: {
    marginTop: 30,
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
  },
  buttonBackground: {
    width: '100%',
    backgroundColor: Colors.grayButtonBackground,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  signText: {
    fontSize: 18,
    fontFamily: 'Bold',
    paddingLeft: 10,
  },
});
