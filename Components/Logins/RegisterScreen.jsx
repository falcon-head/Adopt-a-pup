import {
  Box,
  FormControl,
  Heading,
  Stack,
  Text,
  VStack,
  Input,
  Icon,
  Button,
  Center,
  ScrollView,
  useToast,
  Toast,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, app, db } from '../../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/core';
import { flex } from 'styled-system';
import useAuth from '../../hooks/useAuth';

export default function RegisterScreen() {
  /**
   * All the important use states
   */

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [confirm, setConfirm] = useState('');

  const { registerWithEmail } = useAuth();

  /**
   * Firebase fields
   */

  const userCollectionRef = collection(db, 'users');

  // use state for toggling the password state
  const [showPassword, setshowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [invalid, setInvalid] = useState(false);

  // Small functions
  const handleShowClick = () => setshowPassword(!showPassword);
  const handleShowConfirmClick = () =>
    setShowConfirmPassword(!showConfirmPassword);

  // use navigation
  const navigation = useNavigation();

  // use effect to check if the passwords match
  useEffect(() => {
    if (password !== confirm) {
      setInvalid(true);
    } else {
      setInvalid(false);
    }
  }, [confirm]);

  // push the data user collection in the firebase with the help of the setDoc function
  async function addDocument(data) {
    const docRef = await addDoc(userCollectionRef, data);
    console.log('docRef', docRef.path);
  }

  // Register on click
  const onRegister = async () => {
    if (email === '' || password === '' || name === '') {
      alert('Please fill in all fields');
      return;
    } else if (password !== confirm) {
      alert('Passwords do not match');
    } else {
      console.log('Registering');
    }

    registerWithEmail(email, password)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  // handle login button click
  const takMeToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <ScrollView
      _contentContainerStyle={{
        minH: '100%',
      }}
    >
      <Box
        px={5}
        alignItems="center"
        flex="1"
        alignItems="center"
        flexDirection="row"
        safeArea
      >
        <VStack flex="1">
          <Center>
            <Heading size="2xl" fontFamily="Bold" marginBottom="4">
              Sign up
            </Heading>
          </Center>
          <FormControl>
            <Stack space={2}>
              <Box>
                <FormControl.Label
                  fontWeight="bold"
                  fontFamily="Regular"
                  isRequired
                >
                  <Text fontFamily="Bold" fontSize="18">
                    Name
                  </Text>
                </FormControl.Label>
                <Input
                  size="xl"
                  value={name}
                  onChangeText={(text) => setName(text)}
                  variant="outline"
                  placeholder="John Doe"
                  fontFamily="Regular"
                />
              </Box>
              <Box>
                <FormControl.Label
                  fontWeight="bold"
                  fontFamily="Regular"
                  isRequired
                >
                  <Text fontFamily="Bold" fontSize="18">
                    Email
                  </Text>
                </FormControl.Label>
                <Input
                  size="xl"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  variant="outline"
                  placeholder="johndoe@gmail.com"
                  fontFamily="Regular"
                />
              </Box>
              <Box>
                <FormControl.Label
                  fontWeight="700"
                  fontFamily="Regular"
                  isRequired
                >
                  <Text fontFamily="Bold" fontSize="18">
                    Password
                  </Text>
                </FormControl.Label>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  variant="outline"
                  fontFamily="Regular"
                  size="xl"
                  value={password}
                  placeholder="********"
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
                    />
                  }
                />
              </Box>
              <Box>
                <FormControl isInvalid={invalid}>
                  <FormControl.Label
                    fontWeight="bold"
                    fontFamily="Regular"
                    isRequired
                  >
                    <Text fontFamily="Bold" fontSize="18">
                      Confirm Password
                    </Text>
                  </FormControl.Label>
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    size="xl"
                    value={confirm}
                    onChangeText={(text) => setConfirm(text)}
                    variant="outline"
                    fontFamily="Regular"
                    placeholder="Confirm Password"
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
                        onPress={handleShowConfirmClick}
                        fontFamily="Regular"
                      />
                    }
                  />
                  <FormControl.ErrorMessage>
                    Password does not match
                  </FormControl.ErrorMessage>
                </FormControl>
              </Box>
              <Box marginBottom="5">
                <FormControl.Label fontWeight="bold" fontFamily="Regular">
                  <Text fontFamily="Bold" fontSize="18">
                    Contact Number
                  </Text>
                </FormControl.Label>
                <Input
                  size="xl"
                  value={phone}
                  keyboardType="number-pad"
                  onChangeText={(text) => setPhone(text)}
                  variant="outline"
                  placeholder="9974838821"
                  fontFamily="Regular"
                />
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
                  onPress={() => onRegister()}
                >
                  Register
                </Button>
                <Center my="4">
                  <Text fontFamily="Regular">
                    Looking for log in?{' '}
                    <Text fontFamily="Bold" onPress={() => takMeToLogin()}>
                      Log-In
                    </Text>
                  </Text>
                </Center>
              </Box>
            </Stack>
          </FormControl>
        </VStack>
      </Box>
    </ScrollView>
  );
}
