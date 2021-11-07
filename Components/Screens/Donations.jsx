import React from 'react';
import { ScrollView, View, Box } from 'native-base';
import { StyleSheet, Text } from 'react-native';
import { Colors } from '../../Styles/Colors';
import { StatusBar } from 'expo-status-bar';
import { CommonStrings } from '../../Styles/CommonStrings';

export default function Donations() {
  return (
    <>
      <ScrollView
        style={styles.settingsScrollView}
        showsVerticalScrollIndicator={false}
      >
        <StatusBar />
        <Box style={styles.contentContainer} safeAreaTop>
          <View>
            <Text style={styles.heading}> {CommonStrings.donation} </Text>
          </View>
        </Box>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  settingsScrollView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contentContainer: {
    paddingLeft: 25,
    paddingRight: 25,
  },
  heading: {
    fontSize: 32,
    fontFamily: 'Bold',
    paddingTop: 20,
    marginLeft: -8,
  },
});

//Mayur
//9448159632
