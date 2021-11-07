import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../Styles/Colors';

export const SettingItem = ({ name, icon, settingPressed, extraStyle }) => {
  return (
    <View>
      <TouchableOpacity
        style={[styles.itemHolder, extraStyle]}
        onPress={settingPressed}
      >
        <Text style={styles.settingTitle}> {name} </Text>
        <Ionicons name={icon} size={22} color={Colors.hof} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 25,
    paddingRight: 25,
  },
  itemHolder: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 15,
    paddingTop: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.gray,
  },
  settingTitle: {
    fontFamily: 'Regular',
    fontSize: 20,
    color: Colors.hof,
  },
});
