import { Text, View, Box, StatusBar } from 'native-base';
import React from 'react';
import { Colors } from '../../Styles/Colors';

import AdoptCard from '../Individuals/AdoptCard';

export default function Home() {
  return (
    <Box
      display="flex"
      flex="1"
      backgroundColor="orange.100"
      backgroundColor={Colors.white}
      paddingLeft="8"
      paddingRight="8"
    >
      <StatusBar />
      <AdoptCard />
    </Box>
  );
}
