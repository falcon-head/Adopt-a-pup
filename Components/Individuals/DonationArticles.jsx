import React from 'react';
import {
  Box,
  Text,
  AspectRatio,
  Image,
  VStack,
  Stack,
  Heading,
} from 'native-base';
import { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { Colors } from '../../Styles/Colors';
import { SharedElement } from 'react-navigation-shared-element';

export default function DonationArticles({ data, pressed }) {
  return (
    <TouchableOpacity onPress={pressed}>
      <Box style={styles.cardContainer}>
        <Box style={styles.card}>
          <SharedElement id={`item.${data.id}.image`}>
            <AspectRatio ratio={16 / 9} style={styles.aspectRatio}>
              <Image
                source={{
                  uri: data.imageURL,
                }}
                alt="image"
                style={styles.heroImage}
              />
            </AspectRatio>
          </SharedElement>
          <Stack>
            <Stack style={styles.cardContentHolder}>
              <SharedElement id={`item.${data.id}.location`}>
                <Text style={styles.locationText}>{data.location}</Text>
              </SharedElement>
              <SharedElement id={`item.${data.id}.heading`}>
                <Heading numberOfLines={2} size="md" style={styles.headingText}>
                  {data.title}
                </Heading>
              </SharedElement>
              <SharedElement id={`item.${data.id}.para`}>
                <Text numberOfLines={2} style={styles.donationDesc}>
                  {data.description}
                </Text>
              </SharedElement>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 30,
  },
  aspectRatio: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  heroImage: {
    resizeMode: 'cover',
    borderRadius: 10,
    overflow: 'hidden',
  },
  locationText: {
    fontFamily: 'Regular',
    color: Colors.lightGray,
  },
  cardContentHolder: {
    paddingTop: 5,
  },
  donationDesc: {
    fontFamily: 'Regular',
    fontSize: 16,
  },
  headingText: {
    fontFamily: 'Bold',
  },
});
