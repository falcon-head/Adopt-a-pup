import React, { useState, useEffect } from 'react';
import { ScrollView, View, Box, FlatList } from 'native-base';
import { StyleSheet, Text } from 'react-native';
import { Colors } from '../../Styles/Colors';
import { StatusBar } from 'expo-status-bar';
import { CommonStrings } from '../../Styles/CommonStrings';
import DonationArticles from '../Individuals/DonationArticles';
import { useNavigation } from '@react-navigation/core';
import EmptyScreen from '../Detail-Screens/EmptyScreen';
import { collection, onSnapshot } from '@firebase/firestore';
import { db } from '../../firebase';
import Loading from '../Detail-Screens/Loading';
import useAuth from '../../hooks/useAuth';

export default function Donations() {
  //use of navigation to move between the screens
  const navigations = useNavigation();

  //use of the state to store the data
  const [data, setData] = useState([]);

  //loading state
  const [loading, setLoading] = useState(true);

  // useEffect to fetch the data from firebase database "petdb"
  useEffect(() => {
    let unsub;

    const fetchData = async () => {
      //connecting to the firebase database
      // mapping the data and flattening it
      // saving the data in setData
      unsub = onSnapshot(collection(db, 'donationdb'), (snapshot) => {
        setData(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
        setLoading(false);
      });
    };

    fetchData();
    return unsub;
  }, []);

  const donateCard = ({ item }) => {
    return (
      <DonationArticles
        data={item}
        pressed={() => navigations.navigate('DonationDetailScreen', { item })}
      />
    );
  };

  // Refresh the data
  const refreshData = async () => {
    setLoading(true);
    const refreshQuery = query(collection(db, 'donationdb'));
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

  return (
    <>
      {!loading ? (
        <Box style={styles.settingsScrollView} safeAreaTop>
          <StatusBar />
          <View>
            <Text style={styles.heading}> {CommonStrings.donation} </Text>
          </View>
          {data.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={data}
              renderItem={donateCard}
              nestedScrollEnabled={false}
              keyExtractor={(item) => item.id}
              removeClippedSubviews={true}
              maxToRenderPerBatch={8}
              updateCellsBatchingPeriod={40}
              initialNumToRender={5}
              contentContainerStyle={{
                marginTop: 20,
                paddingBottom: 30,
              }}
            />
          ) : (
            <EmptyScreen onClick={() => refreshData()} />
          )}
        </Box>
      ) : (
        <Loading />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  settingsScrollView: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingLeft: 25,
    paddingRight: 25,
  },
  contentContainer: {
    paddingLeft: 25,
    paddingRight: 25,
    flex: 1,
  },
  heading: {
    fontSize: 32,
    fontFamily: 'Bold',
    paddingTop: 20,
    paddingBottom: 10,
    marginLeft: -8,
  },
});

//Mayur
//9448159632
