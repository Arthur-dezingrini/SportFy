import React from 'react';
import { View, Text } from 'react-native';
import MainFooter from '../../components/MainFooter/MainFooter';

export default function Home () {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <MainFooter>
        Profile
      </MainFooter>
    </View>
  );
}