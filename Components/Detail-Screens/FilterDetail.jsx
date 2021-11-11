import React from 'react';
import {
  Box,
  Center,
  Heading,
  Text,
  Select,
  VStack,
  CheckIcon,
  Pressable,
} from 'native-base';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../Styles/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function FilterDetail() {
  return (
    <Box style={styles.modalHolder}>
      <Center>
        <Ionicons name="ios-remove-outline" size={50} color="gray" />
      </Center>
      <Box style={styles.modalContent}>
        <Heading size="2xl" fontFamily="Bold">
          Filters
        </Heading>
        <Box style={styles.filterOptionHolder}>
          <Box style={styles.selectHolder}>
            <Text style={styles.heading}> Pet </Text>
            <VStack alignItems="center" space={4}>
              <Select
                // selectedValue={service}
                width="100%"
                height={50}
                accessibilityLabel="Choose Service"
                placeholder="Choose Service"
                fontFamily="Bold"
                fontSize={16}
                _selectedItem={{
                  bg: 'trueGray.200',
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}

                // onValueChange={(itemValue) => setService(itemValue)}
              >
                <Select.Item
                  label="UX Research"
                  value="ux"
                  _text={styles.selectTextStyle}
                />
                <Select.Item
                  label="Web Development"
                  value="web"
                  _text={styles.selectTextStyle}
                />
                <Select.Item
                  label="Cross Platform Development"
                  value="cross"
                  _text={styles.selectTextStyle}
                />
                <Select.Item
                  label="UI Designing"
                  value="ui"
                  _text={styles.selectTextStyle}
                />
                <Select.Item
                  label="Backend Development"
                  value="backend"
                  _text={styles.selectTextStyle}
                />
              </Select>
            </VStack>
          </Box>
          <Box style={styles.selectHolder}>
            <Text style={styles.heading}> Location </Text>
            <VStack alignItems="center" space={4}>
              <Select
                // selectedValue={service}
                width="100%"
                height={50}
                accessibilityLabel="Choose Service"
                placeholder="Choose Service"
                fontFamily="Bold"
                fontSize={16}
                _selectedItem={{
                  bg: 'trueGray.200',
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}

                // onValueChange={(itemValue) => setService(itemValue)}
              >
                <Select.Item
                  label="UX Research"
                  value="ux"
                  _text={styles.selectTextStyle}
                />
                <Select.Item
                  label="Web Development"
                  value="web"
                  _text={styles.selectTextStyle}
                />
                <Select.Item
                  label="Cross Platform Development"
                  value="cross"
                  _text={styles.selectTextStyle}
                />
                <Select.Item
                  label="UI Designing"
                  value="ui"
                  _text={styles.selectTextStyle}
                />
                <Select.Item
                  label="Backend Development"
                  value="backend"
                  _text={styles.selectTextStyle}
                />
              </Select>
            </VStack>
          </Box>
        </Box>
      </Box>
      <TouchableOpacity>
        <Box style={styles.search}>
          <Heading size="md" style={styles.searchText}>
            Search
          </Heading>
        </Box>
      </TouchableOpacity>
    </Box>
  );
}

const styles = StyleSheet.create({
  modalHolder: {
    flex: 1,
    backgroundColor: Colors.grayButtonBackground,
    marginBottom: 30,
  },
  modalContent: {
    flex: 1,
    marginLeft: 20,
    paddingRight: 20,
  },
  selectTextStyle: {
    fontFamily: 'Regular',
    fontSize: 18,
  },
  heading: {
    fontFamily: 'Bold',
    color: 'grey',
    fontSize: 16,
  },
  filterOptionHolder: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  selectHolder: {
    marginBottom: 20,
  },
  search: {
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.adoptButtonColor,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
  },
  searchText: {
    color: Colors.white,
    fontFamily: 'Bold',
  },
});
