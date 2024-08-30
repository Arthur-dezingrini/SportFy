import React from "react";
import { View, Text, Image } from "react-native";
import FotterMain from "../../components/FotterMain/FotterMain";
import styles from "./HomeStyle";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={require("./../../assets/bola.png")}
          style={styles.image}
        />
        <Text style={styles.textName}>Olá, Fulano</Text>
      </View>
      <FotterMain></FotterMain>
    </SafeAreaView>
  );
}
