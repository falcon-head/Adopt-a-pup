import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
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
    <View style={styles.cardContainer}>
      <View style={styles.cardHero}>
        <Image
          style={styles.heroImage}
          source={{
            uri: imageUri,
          }}
        />
      </View>
      <View style={styles.detailHolder}>
        <Text style={styles.heading}>{title}</Text>
        <Text style={styles.breedDesc}>{breed}</Text>
        <Text style={styles.breedAge}>{age}</Text>
        <Text numberOfLines={2} style={styles.desc}>
          {desc}
        </Text>
        <View
          style={{
            height: 40,
            flexDirection: 'row',
          }}
        >
          <TouchableOpacity style={styles.viewProfileHolder} onPress={pressed}>
            <Text style={styles.viewProfile}>View Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    height: 160,
  },
  heroImage: {
    height: 160,
    width: 120,
    resizeMode: 'cover',
    backgroundColor: Colors.lightGray,
    borderRadius: 5,
  },
  detailHolder: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 10,
    justifyContent: 'space-between',
  },
  heading: {
    fontFamily: 'Bold',
    fontSize: 18,
    textTransform: 'uppercase',
  },
  breedDesc: {
    fontFamily: 'Medium',
    fontSize: 16,
  },
  breedAge: {
    fontFamily: 'Medium',
    fontSize: 14,
    color: Colors.lightGray,
  },
  desc: {
    fontFamily: 'Regular',
    color: Colors.metalGray,
    fontSize: 16,
    paddingBottom: 10,
  },
  viewProfileHolder: {
    flex: 0.6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.metalGray,
  },
  viewProfile: {
    color: Colors.white,
  },
});
