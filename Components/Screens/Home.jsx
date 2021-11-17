import {
  Text,
  View,
  Box,
  ScrollView,
  FlatList,
  Modal,
  Select,
  VStack,
  CheckIcon,
  Button,
} from 'native-base';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/core';
import { StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Colors } from '../../Styles/Colors';
import AdoptCard from '../Individuals/AdoptCard';
import Header from '../Individuals/Header';
import { CommonStrings } from '../../Styles/CommonStrings';
import useAuth from '../../hooks/useAuth';
import EmptyScreen from '../Detail-Screens/EmptyScreen';
import {
  collection,
  onSnapshot,
  where,
  query,
  getDocs,
} from '@firebase/firestore';
import { db } from '../../firebase';
import Loading from '../Detail-Screens/Loading';

export default function Home() {
  // data useState
  const [data, setData] = useState([]);
  //loading useState
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(false);
  // pet filter value useState
  const [petFilter, setPetFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  // dropDown filter value useState
  const [petDropDownFilter, setPetDropDownFilter] = useState([]);
  const [locationDropDownFilter, setLocationDropDownFilter] = useState([]);

  // handle modal
  const [showModal, setShowModal] = useState(false);

  //use of navigation to move between the screens
  const navigations = useNavigation();

  // useEffect to fetch the data from firebase database "petdb"
  useEffect(() => {
    let unsub;

    const fetchData = async () => {
      //connecting to the firebase database
      // mapping the data and flattening it
      // saving the data in setData
      unsub = onSnapshot(collection(db, 'petdb'), (snapshot) => {
        setData(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
        setLoading(false);
        setFilter(true);
      });
    };

    fetchData();

    return unsub;
  }, []);

  // Add the filter data to filter variables
  useEffect(() => {
    setFilter(false);
    setPetDropDownFilter(
      data
        .map((item) => item.breed)
        .filter((item, index, self) => self.indexOf(item) === index)
    );
    setLocationDropDownFilter(
      data
        .map((item) => item.location)
        .filter((item, index, self) => self.indexOf(item) === index)
    );

    return () => {
      console.log('unsub');
    };
  }, [filter]);

  // Handle the filter search
  const handleSearch = async () => {
    let q;
    setLoading(true);
    setShowModal(false);

    if (petFilter !== '' && locationFilter !== '') {
      console.log('both');
      q = query(
        collection(db, 'petdb'),
        where('breed', '==', petFilter),
        where('location', '==', locationFilter)
      );
    } else if (petFilter !== '') {
      console.log('pet');
      q = query(collection(db, 'petdb'), where('breed', '==', petFilter));
    } else if (locationFilter !== '') {
      console.log('location');
      q = query(
        collection(db, 'petdb'),
        where('location', '==', locationFilter)
      );
    } else {
      q = query(collection(db, 'petdb'));
    }

    try {
      const docs = await getDocs(q);
      //set doc object to an array
      const docArray = docs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(docArray);
      setLoading(false);
      setPetFilter('');
      setLocationFilter('');
    } catch (error) {
      console.log(error.message);
    }
  };

  // Refresh the data
  const refreshData = async () => {
    setLoading(true);
    const refreshQuery = query(collection(db, 'petdb'));
    try {
      const docs = await getDocs(refreshQuery);
      //set doc object to an array
      const docArray = docs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(docArray);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const TheCard = ({ item }) => {
    return (
      <AdoptCard
        title={item.name}
        breed={item.breed}
        age={item.age}
        desc={item.summary}
        imageUri={item.profileImage}
        pressed={() => navigations.navigate('HomeDetailScreen', { item })}
      />
    );
  };

  const openFilter = () => {
    navigations.navigate('FilterDetailScreen');
  };

  return (
    <>
      {!loading ? (
        <>
          <Box style={styles.initialBox} px={8} safeAreaTop>
            <StatusBar />
            <Header
              text={CommonStrings.homes}
              buttonPress={() => setShowModal(true)}
            />
            {data.length > 0 ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={data}
                renderItem={TheCard}
                nestedScrollEnabled={false}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ marginTop: 20, paddingBottom: 20 }}
                removeClippedSubviews={true}
                maxToRenderPerBatch={8}
                updateCellsBatchingPeriod={40}
                initialNumToRender={5}
              />
            ) : (
              <EmptyScreen onClick={() => refreshData()} />
            )}
          </Box>
          <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            size="lg"
          >
            <Modal.Content>
              <Modal.CloseButton />
              <Modal.Header _text={styles.modalHeader}>
                {CommonStrings.commonFilter}
              </Modal.Header>
              <Modal.Body>
                <Box style={styles.filterOptionHolder}>
                  <Box style={styles.selectHolder}>
                    <Text style={styles.heading}>
                      {CommonStrings.choosePet}
                    </Text>
                    <VStack alignItems="center" space={4}>
                      <Select
                        // selectedValue={service}
                        width="100%"
                        height={50}
                        accessibilityLabel={CommonStrings.chooseYourPet}
                        placeholder={CommonStrings.chooseYourPet}
                        fontFamily="Bold"
                        fontSize={16}
                        _selectedItem={{
                          bg: 'trueGray.200',
                          endIcon: <CheckIcon size="5" />,
                        }}
                        mt={1}
                        onValueChange={(itemValue) => setPetFilter(itemValue)}
                      >
                        {petDropDownFilter.map((item, index) => (
                          <Select.Item
                            key={index}
                            label={item}
                            value={item}
                            _text={styles.selectTextStyle}
                          />
                        ))}
                      </Select>
                    </VStack>
                  </Box>
                  <Box style={styles.selectHolder}>
                    <Text style={styles.heading}>
                      {CommonStrings.chooseLocation}
                    </Text>
                    <VStack alignItems="center" space={4}>
                      <Select
                        // selectedValue={service}
                        width="100%"
                        height={50}
                        accessibilityLabel={CommonStrings.chooseYourLocation}
                        placeholder={CommonStrings.chooseYourLocation}
                        fontFamily="Bold"
                        fontSize={16}
                        _selectedItem={{
                          bg: 'trueGray.200',
                          endIcon: <CheckIcon size="5" />,
                        }}
                        mt={1}
                        onValueChange={(itemValue) =>
                          setLocationFilter(itemValue)
                        }
                      >
                        {locationDropDownFilter.map((item, index) => (
                          <Select.Item
                            key={index}
                            label={item}
                            value={item}
                            _text={styles.selectTextStyle}
                          />
                        ))}
                      </Select>
                    </VStack>
                  </Box>
                </Box>
              </Modal.Body>
              <Modal.Footer>
                <Button.Group space={2}>
                  <Button
                    variant="ghost"
                    colorScheme="blueGray"
                    onPress={() => {
                      setShowModal(false);
                    }}
                    _text={styles.bottomButtons}
                  >
                    {CommonStrings.commonCancel}
                  </Button>
                  <Button
                    onPress={() => handleSearch()}
                    _text={styles.bottomButtons}
                  >
                    {CommonStrings.commonSave}
                  </Button>
                </Button.Group>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  initialBox: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  modalHeader: {
    fontFamily: 'Bold',
    fontSize: 20,
  },
  selectHolder: {
    marginBottom: 20,
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
  bottomButtons: {
    fontFamily: 'Regular',
    fontSize: 16,
  },
});
