import { Box, Center, Stack } from 'native-base';
import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';

//Get the dimensions of the screen
const { width, height } = Dimensions.get('window');

export default function Loading() {
  return (
    <Box style={styles.loaderHolder}>
      <Center>
        <LottieView
          style={styles.loader}
          source={require('../../assets/Animations/Loading/loading.json')}
          autoPlay
        />
      </Center>
    </Box>
  );
}

const styles = StyleSheet.create({
  loaderHolder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  loader: {
    width: width,
    height: height * 0.2,
  },
});
