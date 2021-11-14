import { Box, Stack, Center, Image, Heading, Text } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Colors } from '../../Styles/Colors';
import { CommonStrings } from '../../Styles/CommonStrings';

export default function EmptyScreen({ onClick }) {
  return (
    <Box style={styles.emptyScreenHolder}>
      <Stack>
        <Center>
          <Image
            source={require('../../assets/404-dog.png')}
            style={styles.heroImage}
            alt={'404'}
          />
          <Heading size="xl" style={styles.heading}>
            {CommonStrings.pageNotFound}
          </Heading>
          <Text style={styles.pageNotFoundText}>
            {CommonStrings.pageNotFoundMessage}
          </Text>
          <TouchableOpacity onPress={onClick}>
            <Box style={styles.refreshButton}>
              <Text style={styles.refreshText}>{CommonStrings.letsGoHome}</Text>
            </Box>
          </TouchableOpacity>
        </Center>
      </Stack>
    </Box>
  );
}

const styles = StyleSheet.create({
  emptyScreenHolder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroImage: {
    width: 200,
    height: 180,
  },
  heading: {
    paddingTop: 20,
    fontFamily: 'Bold',
  },
  pageNotFoundText: {
    fontSize: 18,
    color: Colors.metalGray,
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: 'Regular',
  },
  refreshButton: {
    backgroundColor: Colors.refreshButtonColor,
    color: Colors.white,
    marginTop: 20,
    borderRadius: 5,
    overflow: 'hidden',
  },
  refreshText: {
    fontFamily: 'Regular',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 18,
    color: Colors.white,
  },
});
