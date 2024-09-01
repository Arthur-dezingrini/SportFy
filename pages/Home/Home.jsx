import React, { useRef } from "react";
import { View, Text, Image, Animated } from "react-native";
import FotterMain from "../../components/FotterMain/FotterMain";
import styles from "./HomeStyle";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel from "react-native-snap-carousel";
import CardGameHome from "../../components/CardGameHome/CardGameHome";

export default function Home({ navigation }) {
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const renderItem = ({ item, index }) => {
    return <CardGameHome key={index} />;
  };

  const data = [{}, {}, {}, {}, {}, {}, {}, {}];

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[styles.headerContainer, { opacity: headerOpacity }]}
      >
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
        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              Quadras próximas da sua Localização
            </Text>
          </View>
          <Carousel
            data={data}
            renderItem={renderItem}
            sliderWidth={styles.sliderWidth}
            itemWidth={styles.itemWidth}
            layout={"default"}
            inactiveSlideScale={0.7}
            inactiveSlideOpacity={0.7}
            loop={true}
          />
        </View>
        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Seus Próximos Jogos</Text>
          </View>
          <Carousel
            data={data}
            renderItem={renderItem}
            sliderWidth={styles.sliderWidth}
            itemWidth={styles.itemWidth}
            layout={"default"}
            inactiveSlideScale={0.9}
            inactiveSlideOpacity={0.7}
            loop={true}
          />
        </View>
      </Animated.ScrollView>
      <FotterMain navigation={navigation}/>
    </SafeAreaView>
  );
}