import React, { useRef, useState, useEffect } from "react";
import { View, Text, Image, Animated, TouchableOpacity } from "react-native";
import styles from "./HomeStyle";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel from "react-native-snap-carousel";
import CardGameHome from "../../components/CardGameHome/CardGameHome";
import { useAuth } from "../../appContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as NotificationService from "../../services/NotificationService";

export default function Home({ navigation }) {
  const { user, token } = useAuth();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [userType, setUserType] = useState(null);
  const [notificationsCount, setNotificationsCount] = useState(null);
  const [notifications, setNotifications] = useState(null);

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const renderItem = ({ item, index }) => {
    return <CardGameHome navigation={navigation} key={index} />;
  };

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const response = await NotificationService.getNotifications(user.id, token)
        if (response.status === 200) {
          setNotificationsCount(response.data.friendRequests.length + response.data.matchRequests.length)
          setNotifications(response.data)
        }
      } catch (error) {
        console.error("Erro ao verificar a sessão:", error.response.data);
      }
    };
    const fetchUserType = async () => {
      try {
        const storedUserType = await AsyncStorage.getItem("userType");
        if (storedUserType) {
          setUserType(storedUserType);
        }
      } catch (error) {
        console.error("Erro ao buscar o tipo de usuário:", error);
      }
    };
    const focusListener = navigation.addListener('focus', () => {
      fetchUserType(); // Atualiza o tipo de usuário sempre que a Home for focada
    });

    fetchUserType();
    getNotifications();

    return () => {
      focusListener(); // Remove o listener quando o componente for desmontado
    };
  }, [navigation]);

  const data = [{}, {}, {}, {}, {}, {}, {}, {}];

  const containerStyleHeader = userType === "dono" ? styles.headerContainerOwner : styles.headerContainer;
  const imageStyle = userType === "dono" ? styles.imageOwner : styles.image;




  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[containerStyleHeader, { opacity: headerOpacity }]}
      >
        <View style={styles.infoContainer}>
          <Image
            source={require("./../../assets/bola.png")}
            style={[imageStyle]}
          />
          <Text style={styles.textName}>
            Olá, <Text style={styles.boldText}>{user.name.split(" ")[0]}</Text>

          </Text>
        </View>
        <TouchableOpacity style={styles.notifications} onPress={() => navigation.navigate('Notifications', { notifications })}>
          <Icon name="notifications" color={"#FFF"} size={30} />
          {notificationsCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{notificationsCount}</Text>
            </View>
          )}
        </TouchableOpacity>
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
