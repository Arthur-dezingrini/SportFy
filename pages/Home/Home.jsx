import React, { useRef, useState, useEffect } from "react";
import { View, Text, Image, Animated } from "react-native";
import styles from "./HomeStyle";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel from "react-native-snap-carousel";
import CardGameHome from "../../components/CardGameHome/CardGameHome";
import { useAuth } from "../../appContext";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function Home({ navigation }) {
  const { user } = useAuth();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [notifications, setNotifications] = useState(5);

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const renderItem = ({ item, index }) => {
    return <CardGameHome navigation={navigation} key={index} />;
  };

  useEffect(() => {
   
    
  }, []);

  const data = [{}, {}, {}, {}, {}, {}, {}, {}];

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[styles.headerContainer, { opacity: headerOpacity }]}
      >
        <View style={styles.infoContainer}>
          <Image
            source={require("./../../assets/bola.png")}
            style={styles.image}
          />
          <Text style={styles.textName}>
            Olá, <Text style={styles.boldText}>{user.name.split(" ")[0]}</Text>
          </Text>
        </View>
        <View style={styles.notifications}>
          <Icon name="notifications" color={"#FFF"} size={30} />
          {notifications > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{notifications}</Text>
            </View>
          )}
        </View>
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
    </SafeAreaView>
  );
}
