import React from "react";
import { View, Image, Pressable } from "react-native";
import styles from "./FotterMainStyle";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function FotterMain() {
  return (
    <View style={styles.container}>
      <Pressable>
        <Icon name="house" color={"#FFF"} size={35} />
      </Pressable>
      <Pressable>
        <Image
          source={require("./../../assets/bola.png")}
          style={styles.imageBall}
        />
      </Pressable>
      <Pressable>
        <Icon name="person" color={"#FFF"} size={35} />
      </Pressable>
    </View>
  );
}
