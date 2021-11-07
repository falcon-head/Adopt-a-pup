import React from 'react';
import { Colors } from '../../Styles/Colors';
import { Text, StyleSheet } from 'react-native';
import { Box } from 'native-base';

export default function Header({ text }) {
  return (
    <Box style={styles.headerHolder}>
      <Text style={[styles.headerText]}>{text}</Text>
    </Box>
  );
}

const styles = StyleSheet.create({
  headerHolder: {
    backgroundColor: Colors.white,
  },
  headerText: {
    fontSize: 32,
    fontFamily: 'Bold',
    paddingTop: 20,
    paddingBottom: 10,
  },
});
