import { Text, View, Box, ScrollView, FlatList } from 'native-base';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/core';
import { StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '../../Styles/Colors';
import AdoptCard from '../Individuals/AdoptCard';
import Header from '../Individuals/Header';
import { CommonStrings } from '../../Styles/CommonStrings';

const DATA = [
  {
    id: '1',
    title: 'Marthalia',
    profileImage:
      'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
    breed: 'German Black puppy',
    age: '6 months old',
    images: [
      'https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGRvZ3N8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1558929996-da64ba858215?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGRvZ3N8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1541876176131-3f5e84a7331a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGRvZ3N8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1517638083100-3f5eb3055a8d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDl8fGRvZ3N8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1598134493179-51332e56807f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjF8fGRvZ3N8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    ],
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim adminim veniam',
  },
  {
    id: '2',
    title: 'Marthalia',
    profileImage:
      'https://images.unsplash.com/photo-1517423738875-5ce310acd3da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1005&q=80',
    breed: 'German Black puppy',
    age: '6 months old',
    images: [
      'https://images.unsplash.com/photo-1608096275202-85fd2fc2e4d9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjZ8fGRvZ3N8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1607923432735-bb1e676f87a8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjV8fGRvZ3N8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1607923432780-7a9c30adcb72?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzJ8fGRvZ3N8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1615266508000-63ac219ac378?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzN8fGRvZ3N8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1604186838309-c6715f0d3e6c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODR8fGRvZ3N8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    ],
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim adminim veniam',
  },
  {
    id: '3',
    title: 'Marthalia',
    profileImage:
      'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60',
    breed: 'German Black puppy',
    age: '6 months old',
    images: [
      'https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGRvZ3N8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1558929996-da64ba858215?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGRvZ3N8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1541876176131-3f5e84a7331a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGRvZ3N8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1517638083100-3f5eb3055a8d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDl8fGRvZ3N8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1598134493179-51332e56807f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjF8fGRvZ3N8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    ],
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim adminim veniam',
  },
  {
    id: '4',
    title: 'Marthalia',
    profileImage:
      'https://images.unsplash.com/photo-1591769225440-811ad7d6eab3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60',
    breed: 'German Black puppy',
    age: '6 months old',
    images: [
      'https://images.unsplash.com/photo-1608096275202-85fd2fc2e4d9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjZ8fGRvZ3N8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1607923432735-bb1e676f87a8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjV8fGRvZ3N8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1607923432780-7a9c30adcb72?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzJ8fGRvZ3N8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1615266508000-63ac219ac378?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzN8fGRvZ3N8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1604186838309-c6715f0d3e6c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODR8fGRvZ3N8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    ],
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim adminim veniam',
  },
  {
    id: '5',
    title: 'Marthalia',
    profileImage:
      'https://images.unsplash.com/photo-1497993950456-cdb57afd1cf1?ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTl8OTU2NTkzMnx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60',
    breed: 'German Black puppy',
    age: '6 months old',
    images: [
      'https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGRvZ3N8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1558929996-da64ba858215?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGRvZ3N8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1541876176131-3f5e84a7331a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGRvZ3N8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1517638083100-3f5eb3055a8d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDl8fGRvZ3N8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1598134493179-51332e56807f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjF8fGRvZ3N8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    ],
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim adminim veniam',
  },
];

export default function Home() {
  //use of navigation to move between the screens
  const navigations = useNavigation();

  const TheCard = ({ item }) => {
    return (
      <AdoptCard
        title={item.title}
        breed={item.breed}
        age={item.age}
        desc={item.desc}
        imageUri={item.profileImage}
        pressed={() => navigations.navigate('HomeDetailScreen', { item })}
      />
    );
  };

  return (
    <Box style={styles.initialBox} px={8} safeAreaTop>
      <StatusBar />
      <Header text={CommonStrings.homes} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={DATA}
        renderItem={TheCard}
        nestedScrollEnabled={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ marginTop: 20, paddingBottom: 20 }}
      />
    </Box>
  );
}

const styles = StyleSheet.create({
  initialBox: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
