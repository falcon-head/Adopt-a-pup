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
} from 'native-base';
import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

export default function RegisterScreen() {
  const [showPassword, setshowPassword] = useState(false);

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
                size="xl"
                variant="outline"
                placeholder="9998989999"
                fontFamily="Regular"
              />
            </Box>
            <Box>
              <Button
                size="lg"
                variant="solid"
                color="orange.100"
                fontFamily="Regular"
                backgroundColor="indigo.700"
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
