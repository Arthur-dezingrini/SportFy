import React from "react";
import { View, Image, Pressable } from "react-native";
import styles from "./FotterMainStyle";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function FotterMain({ navigation }) {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate('Home')}>
        <Icon name="house" color={"#FFF"} size={35} />
      </Pressable>
      <Pressable onPress={() => navigation.navigate('RegisterMatch')}>
        <Image
          source={require("./../../assets/bola.png")}
          style={styles.imageBall}
        />
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Perfil')}>
        <Icon name="person" color={"#FFF"} size={35} />
      </Pressable>
    </View>
  );
}
