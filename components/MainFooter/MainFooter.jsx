import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './MainFooter';

export default function MainFooter({ children, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
}
