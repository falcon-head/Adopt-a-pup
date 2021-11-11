import React from 'react';
import { Colors } from '../../Styles/Colors';
import { Text, StyleSheet } from 'react-native';
import { Box } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

export default function Header({ text, buttonPress }) {
  return (
    <Box style={styles.headerHolder}>
      <Text style={[styles.headerText]}>{text}</Text>
      <TouchableOpacity style={styles.filter} onPress={buttonPress}>
        <Ionicons name="ios-filter" size={30} color={Colors.primary} />
      </TouchableOpacity>
    </Box>
  );
}

const styles = StyleSheet.create({
  headerHolder: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
  },
  headerText: {
    fontSize: 32,
    fontFamily: 'Bold',
    paddingTop: 20,
    paddingBottom: 10,
  },
  filter: {
    paddingTop: 28,
  },
});
