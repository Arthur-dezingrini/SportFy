import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import styles from './InputStyle'

export default function Input({ value, placeholder, onChangeText, secureTextEntry }) {
  return (
    <TextInput
      style={styles.input}
      value={value}
      placeholder={placeholder}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      placeholderTextColor={'#FFF'} 
    />
  );
}