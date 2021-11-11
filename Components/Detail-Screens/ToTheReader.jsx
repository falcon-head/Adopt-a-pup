import React from 'react';
import { Box, Center, Heading, Text, Image, ScrollView } from 'native-base';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../Styles/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function ToTheReader() {
  return (
    <Box style={styles.modalHolder}>
      <Center>
        <Ionicons name="ios-remove-outline" size={50} color="gray" />
      </Center>
      <Box style={styles.contentBox}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Box>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1562317305-58a17fe2c09e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80',
              }}
              alt="org-header-image"
              style={styles.heroImage}
            />
          </Box>
          <Box style={styles.contentText}>
            <Heading size="md" style={styles.heading}>
              Who we are?
            </Heading>
            <Text style={styles.para}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga
              odit, rem hic a totam sed ad culpa perspiciatis quos alias dolores
              molestias tenetur similique veritatis incidunt dolore voluptas
              laudantium quidem.
            </Text>
          </Box>
          <Box style={styles.contentText}>
            <Heading size="md" style={styles.heading}>
              What we do?
            </Heading>
            <Text style={styles.para}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga
              odit, rem hic a totam sed ad culpa perspiciatis quos alias dolores
              molestias tenetur similique veritatis incidunt dolore voluptas
              laudantium quidem.
            </Text>
          </Box>
          <Box style={styles.contentText}>
            <Heading size="md" style={styles.heading}>
              Why we do?
            </Heading>
            <Text style={styles.para}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga
              odit, rem hic a totam sed ad culpa perspiciatis quos alias dolores
              molestias tenetur similique veritatis incidunt dolore voluptas
              laudantium quidem.
            </Text>
          </Box>
        </ScrollView>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  modalHolder: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contentBox: {
    flex: 1,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  heroImage: {
    aspectRatio: 16 / 9,
    borderRadius: 10,
  },
  contentText: {
    paddingTop: 20,
  },
  heading: {
    fontFamily: 'Bold',
  },
  para: {
    fontSize: 16,
    fontFamily: 'Regular',
    color: Colors.metalGray,
    paddingTop: 10,
  },
});
