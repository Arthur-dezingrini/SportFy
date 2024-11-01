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
import * as registerMatchService from "../../services/RegisterMatchService";
import * as Location from "expo-location";
import * as courtService from "../../services/courtService";

export default function Home({ navigation }) {
  const { user, token } = useAuth();
  const [location, setLocation] = useState(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [userType, setUserType] = useState(null);
  const [notificationsCount, setNotificationsCount] = useState(null);
  const [notifications, setNotifications] = useState(null);
  const [matchs, SetMatchs] = useState([]);
  const [courts, setCourts] = useState([]);
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  useEffect( () => {
    const getNotifications = async () => {
      try {
        const response = await NotificationService.getNotifications(
          user.id,
          token
        );
        if (response.status === 200) {
          setNotificationsCount(
            response.data.friendRequests.length +
              response.data.matchRequests.length
          );
          setNotifications(response.data);
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
    const focusListener = navigation.addListener("focus", () => {
      fetchUserType();
    });

    const getGames = async () => {
      try {
        const response = await registerMatchService.getMatchs(user.id, token);
        if (response.status === 200) {
          SetMatchs(response.data);
        }
      } catch (error) {
        console.log("Erro ao pegar proximas partidas", error);
      }
    };

    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permissão para acessar localização foi negada.");
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setLocation(location);
    };

    const getCourts = async () => {
      try {
        const response = await courtService.getAllCourts(token);
        if (response.status === 200) {
          const allCourts = response.data;
          if (location) {
            const userCoords = {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            };

            const courtsWithDistance = allCourts.map((court) => {
              const courtCoords = {
                latitude: court.latitude,
                longitude: court.longitude,
              };
              const distance = haversineDistance(userCoords, courtCoords);
              return { ...court, distance };
            });

            const closestCourts = courtsWithDistance
              .sort((a, b) => a.distance - b.distance)
              .slice(0, 10); 
            setCourts(closestCourts);
          }
        }
      } catch (error) {
        console.log("Erro ao buscar quadras", error);
      }
    };

    getCourts();
    getLocation();
    getGames();
    fetchUserType();
    getNotifications();

    return () => {
      focusListener();
    };
  }, [navigation]);

  const data = [{}, {}, {}, {}, {}, {}, {}, {}];

  const containerStyleHeader =
    userType === "dono" ? styles.headerContainerOwner : styles.headerContainer;
  const imageStyle = userType === "dono" ? styles.imageOwner : styles.image;

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[containerStyleHeader, { opacity: headerOpacity }]}>
        <View style={styles.infoContainer}>
          <Image
            source={require("./../../assets/bola.png")}
            style={[imageStyle]}
          />
          <Text style={styles.textName}>
            Olá, <Text style={styles.boldText}>{user.name.split(" ")[0]}</Text>
          </Text>
        </View>
        <TouchableOpacity
          style={styles.notifications}
          onPress={() =>
            navigation.navigate("Notifications", { notifications })
          }
        >
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
            data={courts}
            renderItem={({ item, index }) => (
              <CardGameHome
                navigation={navigation}
                key={index}
                game={item}
                navigate={"RegisterMatch"}
              />
            )}
            sliderWidth={styles.sliderWidth}
            itemWidth={styles.itemWidth}
            layout={"default"}
            inactiveSlideScale={0.7}
            inactiveSlideOpacity={0.7}
            loop={true}
          />
        </View>
        {matchs.length > 0 && (
          <View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Seus Próximos Jogos</Text>
            </View>
            <Carousel
              data={matchs}
              renderItem={({ item, index }) => (
                <CardGameHome
                  navigation={navigation}
                  key={index}
                  game={item}
                  navigate={"Match"}
                />
              )}
              sliderWidth={styles.sliderWidth}
              itemWidth={styles.itemWidth}
              layout={"default"}
              inactiveSlideScale={0.7}
              inactiveSlideOpacity={0.7}
              loop={true}
            />
          </View>
        )}
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const haversineDistance = (coords1, coords2) => {
  const toRad = (value) => (value * Math.PI) / 180;

  const lat1 = coords1.latitude;
  const lon1 = coords1.longitude;
  const lat2 = coords2.latitude;
  const lon2 = coords2.longitude;

  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;
  return distance;
};
