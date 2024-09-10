import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import styles from './HeaderTopStyle';
import Icon from "react-native-vector-icons/MaterialIcons";

export default function Button({ children, onPress }) {
  return (
    <View style={styles.button} onPress={onPress}>
      <TouchableOpacity>
        <Icon name='arrow-back' size={24} style={styles.arrow}></Icon>
      </TouchableOpacity>
      <Text style={styles.buttonText}>{children}</Text>
    </View>
  );
}