import React from 'react';
import { ScrollView, Text, View, Box } from 'native-base';
import { StyleSheet } from 'react-native';
import { Colors } from '../../Styles/Colors';
import { StatusBar } from 'expo-status-bar';

export default function DonationDetails() {
  return (
    <>
      <StatusBar style="auto" />
      <ScrollView
        style={styles.settingsScrollView}
        showsVerticalScrollIndicator={false}
      >
        <Box safeAreaTop>Donation</Box>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  settingsScrollView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
