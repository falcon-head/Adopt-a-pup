import React, { useState } from 'react';
import {
  Flex,
  View,
  Center,
  Heading,
  Text,
  VStack,
  Box,
  Input,
  Icon,
  Stack,
  FormControl,
  Button,
  Image,
  Link,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { auth, db, app } from '../../firebase';
import { ImageBackground, StyleSheet, Dimensions } from 'react-native';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { useNavigation } from '@react-navigation/core';
import { BlurView } from 'expo-blur';

export default function LoginScreen() {
  /**
   * All the state with values go here
   */

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // other useStates
  const [showPassword, setshowPassword] = useState(false);

  // Get height and width of the  window
  let { height, width } = Dimensions.get('window');

  // use navigation
  const navigation = useNavigation();

  // Show password on click
  const handleShowClick = () => setshowPassword(!showPassword);

  // handle the login
  const onLoginPress = () => {
    if (email || password === '') {
      alert('You need to fill up all the fields');
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  // take user to signup page
  const onSignUpPress = () => {
    navigation.navigate('Register');
  };

  return (
    <Box
      px={5}
      alignItems="center"
      flex="1"
      alignItems="center"
      flexDirection="row"
      safeArea
    >
      <VStack flex="1">
        <Heading size="xl" fontWeight="normal">
          Hey,
        </Heading>
        <Heading size="2xl" fontFamily="Bold" marginBottom="4">
          Welcome back
        </Heading>
        <FormControl space="4">
          <Stack space="2">
            <Box>
              <FormControl.Label fontWeight="bold" fontFamily="Regular">
                <Text fontFamily="Bold" fontSize="18">
                  Email
                </Text>
              </FormControl.Label>
              <Input
                isRequired
                size="xl"
                variant="outline"
                placeholder="johndoe@gmail.com"
                fontFamily="Regular"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </Box>
            <Box>
              <FormControl.Label fontWeight="700" fontFamily="Regular">
                <Text fontFamily="Bold" fontSize="18">
                  Password
                </Text>
              </FormControl.Label>
              <Input
                isRequired
                type={showPassword ? 'text' : 'password'}
                variant="outline"
                fontFamily="Regular"
                size="xl"
                value={password}
                onChangeText={(text) => setPassword(text)}
                InputRightElement={
                  <Icon
                    as={
                      showPassword ? (
                        <MaterialIcons name="visibility" />
                      ) : (
                        <MaterialIcons name="visibility-off" />
                      )
                    }
                    size={5}
                    mr="2"
                    color="muted.400"
                    onPress={handleShowClick}
                    fontFamily="Regular"
                    fontSize="md"
                  />
                }
              />
              <FormControl.Label>
                <Link
                  fontFamily="Regular"
                  fontSize="16"
                  marginTop="3"
                  isUnderlined={false}
                  _text={{
                    color: 'blue.400',
                  }}
                  onPress={() => console.log('forgot password clicked')}
                >
                  Forgot Password?
                </Link>
              </FormControl.Label>
            </Box>
            <Box>
              <Button
                size="lg"
                variant="solid"
                colorScheme="violet"
                fontFamily="Regular"
                _text={{
                  color: 'white',
                }}
                onPress={() => onLoginPress()}
              >
                Log In
              </Button>
              <Center my="4">
                <Text fontFamily="Regular">
                  Don't have an account ?{' '}
                  <Text fontFamily="Bold" onPress={() => onSignUpPress()}>
                    Sign-Up
                  </Text>
                </Text>
              </Center>
            </Box>
          </Stack>
        </FormControl>
      </VStack>
    </Box>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'Bold',
  },
});
