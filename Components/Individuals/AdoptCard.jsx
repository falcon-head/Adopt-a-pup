import { View, Text, Box, Image } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { style } from 'styled-system';
import { Colors } from '../../Styles/Colors';

export default function AdoptCard({
  title,
  breed,
  age,
  desc,
  imageUri,
  pressed,
}) {
  return (
    <Box flexDir="row">
      <View>
        <Image
          source={{
            uri: 'https://cupabangalore.org/wp-content/uploads/2020/05/ANDY-1100x732.jpg',
          }}
          alt="profile-images"
          style={styles.heroImage}
        />
      </View>
    </Box>
  );
}

const styles = StyleSheet.create({
  heroImage: {
    width: 140,
    height: 160,
    resizeMode: 'cover',
    backgroundColor: Colors.lightGray,
  },
});
