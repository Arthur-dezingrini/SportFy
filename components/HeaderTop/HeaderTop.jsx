import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import styles from './HeaderTopStyle';
import Icon from "react-native-vector-icons/MaterialIcons";

export default function Button({ children, onPress }) {
  return (
    <View style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{children}</Text>
    </View>
  );
}
