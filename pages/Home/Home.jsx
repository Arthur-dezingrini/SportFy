import React from 'react';
import { View, Text } from 'react-native';
import FotterMain from '../../components/FotterMain/FotterMain';
import styles from './HomeStyle'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home () {
  return (
    <SafeAreaView style={styles.container}>
      <FotterMain></FotterMain>
    </SafeAreaView>
  );
}