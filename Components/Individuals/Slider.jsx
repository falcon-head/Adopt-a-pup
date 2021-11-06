import React, { useEffect, useRef } from 'react';
import {
  Image,
  FlatList,
  View,
  StatusBar,
  Dimensions,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Colors } from '../../Styles/Colors';
import { Ionicons } from '@expo/vector-icons';

// Getting the height and width of the device
const { width, height } = Dimensions.get('screen');

const ITEM_WIDTH = width;
const ITEM_HEIGHT = height * 0.6;
const DOT_SIZE = 0;
const DOT_SPACING = 8;
const DOT_INDICATOR_SIZE = DOT_SIZE + DOT_SPACING;

export const Slider = ({ arrayImage, backPressed }) => {
  const scrollY = useRef(new Animated.Value(0)).current;

  //On the below flatllist we do not care about the index
  return (
    <View style={styles.viewStyle}>
      <Animated.FlatList
        data={arrayImage}
        keyExtractor={(_, index) => index.toString()}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        bounces={false}
        horizontal
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item }) => {
          return (
            <View style={{ borderRadius: 5 }}>
              <Image source={{ uri: item }} style={styles.sliderImage} />
            </View>
          );
        }}
      />
      <View style={styles.pagination}>
        {arrayImage.map((_, index) => {
          return <View key={index} style={[styles.dot]}></View>;
        })}
      </View>
      <View style={styles.goBack}>
        <TouchableOpacity onPress={backPressed}>
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderImage: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    resizeMode: 'cover',
    backgroundColor: Colors.lightGray,
    borderRadius: 5,
  },
  viewStyle: {
    height: ITEM_HEIGHT,
    overflow: 'hidden',
    borderRadius: 5,
  },
  pagination: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    bottom: 20,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE,
    backgroundColor: Colors.white,
    marginRight: DOT_SPACING,
    opacity: 0.5,
  },
  goBack: {
    position: 'absolute',
    top: 15,
    left: 15,
    opacity: 0.7,
  },
  goBack: {
    position: 'absolute',
    top: 40,
    left: 20,
    opacity: 0.7,
  },

  //   dotIndicator: {
  //     width: DOT_INDICATOR_SIZE,
  //     height: DOT_INDICATOR_SIZE,
  //     borderRadius: DOT_INDICATOR_SIZE,
  //     borderWidth: 1,
  //     borderColor: Colors.white,
  //     position: "absolute",
  //     bottom: -DOT_SIZE / 2,
  //   },
});
