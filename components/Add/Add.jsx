import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Add = () => {
  return (
    <View style={styles.iconContainer}>
      <Icon name="circle" size={30} color="#46FF6F" />
      <Icon name="plus" size={15} color="white" style={styles.plusIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIcon: {
    position: 'absolute',
  },
});

export default Add;
