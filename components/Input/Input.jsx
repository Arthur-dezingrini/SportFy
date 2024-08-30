import React from 'react';
import { View, TextInput, Image } from 'react-native';
import styles from './InputStyle';
import Icon from "react-native-vector-icons/MaterialIcons";

export default function Input({ value, placeholder, onChangeText, secureTextEntry, icon, onPressIcon}) {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={[styles.input, icon ? { paddingRight: 40 } : null]}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={'#FFF'}
      />
      {icon && (
        <Icon name={icon} size={24} color="#FFF" onPress={onPressIcon}/>
      )}
    </View>
  );
}
