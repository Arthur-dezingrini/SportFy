import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './ButtonStyle';

export default function Button({ children, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
}
