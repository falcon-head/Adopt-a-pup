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
  NumberInput,
} from 'native-base';
import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, app, db } from '../../firebase';
import { getDocs, addDoc, collection } from 'firebase/firestore';

export default function RegisterScreen() {
  /**
   * All the important use states
   */

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  /**
   * Firebase fields
   */

  const userCollectionRef = collection(db, 'users');

  // use state for toggling the password state
  const [showPassword, setshowPassword] = useState(false);

  // Toggle password function
  const handleShowClick = () => setshowPassword(!showPassword);

  // Register on click

  const onRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user.email);
      })
      .catch((error) => alert(error.message));
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
        <Heading size="2xl" fontFamily="Bold" marginBottom="4">
          Sign up
        </Heading>
        <FormControl>
          <Stack space={2}>
            <Box>
              <FormControl.Label fontWeight="bold" fontFamily="Regular">
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
              <FormControl.Label fontWeight="bold" fontFamily="Regular">
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
              <FormControl.Label fontWeight="700" fontFamily="Regular">
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
            <Box marginBottom="5">
              <FormControl.Label fontWeight="bold" fontFamily="Regular">
                <Text fontFamily="Bold" fontSize="18">
                  Contact No
                </Text>
              </FormControl.Label>
              <Input
                isRequired
                keyboardType="number-pad"
                size="xl"
                value={phoneNumber}
                onChangeText={(text) => setPhoneNumber(text)}
                variant="outline"
                placeholder="9998989999"
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
                  Looking for log in? <Text fontFamily="Bold">Log-In</Text>
                </Text>
              </Center>
            </Box>
          </Stack>
        </FormControl>
      </VStack>
    </Box>
  );
}
