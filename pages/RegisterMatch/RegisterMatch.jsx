import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  View,
  Button,
  Alert,
  Platform,
  TouchableOpacity,
  Image,
  Text,
  Pressable
} from "react-native";
import styles from "./RegisterMatchStyle";
import ActionInput from "../../components/ActionInput/ActionInput";
import MapView, { Marker, Callout } from "react-native-maps";
import axios from "axios";
import * as Location from "expo-location";
import moment from "moment";
import DateModal from "../../modals/DateModal/DateModal";
import TimeModal from "../../modals/TimeModal/TimeModal";
import InviteModal from "../../modals/InviteModal/InviteModal";
import Icon from "react-native-vector-icons/MaterialIcons";
import HeaderTop from "./../../components/HeaderTop/HeaderTop";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as RegisterMatchService from "./../../services/RegisterMatchService";
import * as FriendListService from "./../../services/FriendListService";
import { useAuth } from "./../../appContext";
import * as courtService from '../../services/courtService'

const GOOGLE_API_KEY = "AIzaSyCqR9pyqkCysNHTtDz_hNXjIJNLGuDYq0Q";

export default function RegisterMatch({ navigation, route }) {
  const { match } = route.params || {};
  const [location, setLocation] = useState(
    match && match.location ? match.location : ""
  );
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [latiLong, setlatiLong] = useState(
    match && match.latitude && match.longitude
      ? { latitude: match.latitude, longitude: match.longitude }
      : null
  );
  const [initialRegion, setInitialRegion] = useState({
    latitude: match && match.latitude ? match.latitude : -23.55052,
    longitude: match && match.longitude ? match.longitude : -46.633308,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [value, setValue] = useState(match && match.value ? match.value : null);
  const actionSheetRef = useRef(null);
  const [friendsList, setFriendsList] = useState(null);
  const { user, token } = useAuth();
  const [friendMatch, setFriendsMatch] = useState([]);
  const [availableCourts, setAvailableCourts] = useState([])
  const [selectedCourt, setSelectedCourt] = useState(match || null);
  const [reservedHours, setReservedHours] = useState(null)

  useEffect(() => {
    const getLocationPermission = async () => {
      const response = await FriendListService.getFriends(user.id, token);
      if (response.status === 200 && response.data.length > 0) {
        setFriendsList(response.data);
      }
      const storedPermissionStatus = await AsyncStorage.getItem(
        "locationPermissionStatus"
      );

      if (storedPermissionStatus === "granted") {
        let userLocation = await Location.getCurrentPositionAsync({});
        setInitialRegion({
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        return;
      }

      if (Platform.OS === "android") {
        Alert.alert(
          "Permissão de Localização",
          "Precisamos da sua localização para mostrar os jogos mais próximos.",
          [
            {
              text: "Cancelar",
              onPress: () => ("Permissão cancelada"),
              style: "cancel",
            },
            {
              text: "OK",
              onPress: async () => {
                let { status } =
                  await Location.requestForegroundPermissionsAsync();
                await AsyncStorage.setItem("locationPermissionStatus", status);

                if (status !== "granted") {
                  Alert.alert(
                    "Permissão negada",
                    "Permissão de localização foi negada."
                  );
                  return;
                }

                let userLocation = await Location.getCurrentPositionAsync({});
                setInitialRegion({
                  latitude: userLocation.coords.latitude,
                  longitude: userLocation.coords.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                });
              },
            },
          ]
        );
      } else if (Platform.OS === "ios") {
        let { status } = await Location.requestForegroundPermissionsAsync({
          rationale: {
            title: "Permissão de Localização",
            message:
              "Precisamos da sua localização para mostrar os jogos mais próximos.",
          },
        });

        await AsyncStorage.setItem("locationPermissionStatus", status);

        if (status !== "granted") {
          Alert.alert(
            "Permissão negada",
            "Permissão de localização foi negada."
          );
          return;
        }

        let userLocation = await Location.getCurrentPositionAsync({});
        setInitialRegion({
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      }
    };

    const loadCourts = async () => {
      try {
        const response = await courtService.getAllCourts(token);
        if (response.status === 200) {
          setAvailableCourts(response.data)
        }
      } catch (error) {
        console.error("Erro ao carregar as quadras", error);
      }
    };

    loadCourts();
    getLocationPermission();
  }, []);

  const handleSelectLocation = async (event) => {
    if (event.id) {
      setSelectedCourt(event)
      setLocation(event.location)
      setShowMap(false)
      const response = await courtService.getReservedHours(token, event.id)
      if (response.status === 200) {
        setReservedHours(response.data)
      }
      return
    }
    setSelectedCourt(null)
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setlatiLong({ latitude, longitude });
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`
      );
      const address =
        response.data.results[0]?.formatted_address ||
        "Endereço não encontrado";
      setLocation(address);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível obter o endereço.");
    }
    setShowMap(false);
  };

  const handleDateSelect = (day) => {
    setDate(moment(day.dateString).format("DD-MM-YYYY"));
    setShowCalendarModal(false);
  };

  const handleSelectTime = (time) => {
    setTime(time);
    setShowTimeModal(false);
  };

  const handleInviteFriends = async () => {
    actionSheetRef.current?.setModalVisible(true);
  };

  const reviceFriends = (data) => {
    setFriendsMatch(data);
  };

  const registerMatch = async () => {
    try {
      if (latiLong.latitude == null || time == null) {
        Alert.alert("Ops", "Esta faltando alguma informação");
        return;
      }
      const Match = {
        latitude: selectedCourt ? selectedCourt.latitude : latiLong.latitude,
        longitude: selectedCourt ? selectedCourt.longitude : latiLong.longitude,
        date: moment(date, "DD-MM-YYYY").format("YYYY-MM-DD"),
        hour: time,
        value: selectedCourt ? selectedCourt.value : 0,
        creator_id: user.id,
        location: selectedCourt ? selectedCourt.location : location,
        court_id: selectedCourt && selectedCourt.id ? selectedCourt.id : null,
        inviteMatchFriends: friendMatch.map((friend) => friend.id),
      };
      const response = await RegisterMatchService.Register(Match, token);
      if (response.status === 200) {
        const createdMatch = await RegisterMatchService.getMatch(
          response.data,
          token
        );
        navigation.navigate("Match", { match: createdMatch.data });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderTop>Registrar Partida</HeaderTop>
      {showMap ? (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={initialRegion}
            onPress={handleSelectLocation}
          >
            {availableCourts.map((court, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: court.latitude,
                  longitude: court.longitude,
                }}
                title={court.name}
              >
                <Pressable
                  onPress={() => handleSelectLocation(court)}
                  style={{ alignItems: "center", padding: 15 }}
                >
                  <Image
                    source={court.image_url ? {uri: court.image_url} : require("./../../assets/stadium.png")}
                    style={{ width: 50, height: 50, borderRadius: 50 }}
                  />
                </Pressable>
                <Callout
                  onPress={() =>
                    handleSelectLocation(court)
                  }
                >
                  <View style={{ alignItems: "center" }}>
                    <Text>{court.name}</Text>
                  </View>
                </Callout>
              </Marker>
            ))}
          </MapView>
          <Button title="Cancelar" onPress={() => setShowMap(false)} />
        </View>
      ) : (
        <View style={styles.form}>
          <ActionInput
            textButton={"Selecionar"}
            placeholder={"Localização"}
            value={location}
            onPress={() => setShowMap(true)}
          />

          <ActionInput
            textButton={"Alterar"}
            placeholder={"Data"}
            value={date}
            onPress={() => setShowCalendarModal(true)}
          />

          <DateModal
            isVisible={showCalendarModal}
            onBackdropPress={() => setShowCalendarModal(false)}
            selectedDate={selectedDate}
            markedDates={markedDates}
            onDayPress={handleDateSelect}
          />
          <ActionInput
            textButton={"Alterar"}
            placeholder={"Horário"}
            value={time}
            onPress={() => setShowTimeModal(true)}
          />
          <TimeModal
            isVisible={showTimeModal}
            onBackdropPress={() => setShowTimeModal(false)}
            onSelectTime={handleSelectTime}
          />
          {selectedCourt && (
            <ActionInput
              value={selectedCourt && selectedCourt.value ? selectedCourt.value : 0}
              textButton={"Pagar"}
              placeholder={
                selectedCourt && selectedCourt.value ? `R$${selectedCourt.value}` : "Valor Total"
              }
            />
          )}
          <ActionInput
            textButton={"Convidar"}
            placeholder={"Convidar Amigos"}
            onPress={handleInviteFriends}
          />
          <InviteModal
            friends={friendsList}
            friendsAdicionados={friendMatch}
            enviaAmigos={reviceFriends}
            ref={actionSheetRef}
          />
          <TouchableOpacity onPress={registerMatch} style={styles.register}>
            <Icon name="arrow-forward" size={24} style={{ color: "#FFF" }} />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
