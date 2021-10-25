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
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Dimensions } from 'react-native';

export default function LoginScreen() {
  const [showPassword, setshowPassword] = useState(false);
  let { height, width } = Dimensions.get('window');

  const handleShowClick = () => setshowPassword(!showPassword);

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
                size="xl"
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
                <Text fontFamily="Regular" fontSize="16" marginTop="3">
                  Forgot Password?
                </Text>
              </FormControl.Label>
            </Box>
            <Box>
              <Button
                size="lg"
                variant="solid"
                color="orange.100"
                fontFamily="Regular"
                backgroundColor="indigo.700"
              >
                Log In
              </Button>
              <Center my="4">
                <Text fontFamily="Regular">
                  Don't have an account ? <Text fontFamily="Bold">Sign-Up</Text>
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
