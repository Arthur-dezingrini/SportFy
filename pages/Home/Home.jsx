import React, { useRef } from "react";
import { View, Text, Image, ScrollView, Animated } from "react-native";
import FotterMain from "../../components/FotterMain/FotterMain";
import styles from "./HomeStyle";
import { SafeAreaView } from "react-native-safe-area-context";
import CardGameHome from "../../components/CardGameHome/CardGameHome";

export default function Home() {
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100], 
    outputRange: [1, 0], 
    extrapolate: "clamp",
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.headerContainer, { opacity: headerOpacity }]}>
        <Image
          source={require("./../../assets/bola.png")}
          style={styles.image}
        />
        <Text style={styles.textName}>
          Olá, <Text style={styles.boldText}>Fulano</Text>
        </Text>
      </Animated.View>
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingTop: 80 }}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Quadras próximas da sua Localização</Text>
        </View>
        <View style={styles.gamesContainer}>
          <CardGameHome />
          <CardGameHome />
          <CardGameHome />
          <CardGameHome />
          <CardGameHome />
          <CardGameHome />
          <CardGameHome />
          <CardGameHome />
        </View>
      </Animated.ScrollView>
      <FotterMain />
    </SafeAreaView>
  );
}
