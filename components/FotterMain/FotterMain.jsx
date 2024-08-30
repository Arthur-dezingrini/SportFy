import React from "react";
import { View, Image } from "react-native";
import styles from "./FotterMainStyle";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function FotterMain() {
  return (
    <View style={styles.container}>
      <Icon name="house" color={'#FFF'}/>
      <Image source={require('./../../assets/bola.png')} style={styles.imageBall}/>
      <Icon name="person" color={'#FFF'}/>
    </View>
  );
}
