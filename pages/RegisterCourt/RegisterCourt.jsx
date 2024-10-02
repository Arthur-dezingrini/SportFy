import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  View,
  Button,
  Alert,
  Platform,
  TouchableOpacity,
} from "react-native";
import styles from "./RegisterCourtStyle";
import ActionInput from "../../components/ActionInput/ActionInput";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
import * as Location from "expo-location";
import moment from "moment";
import DateModal from "../../modals/DateModal/DateModal";
import TimeModal from "../../modals/TimeModal/TimeModal";
import InviteModal from "../../modals/InviteModal/InviteModal";
import Icon from "react-native-vector-icons/MaterialIcons";
import HeaderTop from "./../../components/HeaderTop/HeaderTop";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as RegisterMatchService from './../../services/RegisterMatchService'

export default function RegisterCourt({ locationMatch }) {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [latiLong, setlatiLong] = useState(null);
  const [initialRegion, setInitialRegion] = useState({
    latitude: -23.55052,
    longitude: -46.633308,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [value, setValue] = useState(null)
  const actionSheetRef = useRef(null);
  const [friendsList, setFriendsList] = useState(null)

  const GOOGLE_API_KEY = "AIzaSyCqR9pyqkCysNHTtDz_hNXjIJNLGuDYq0Q";

  useEffect(() => {
    const getLocationPermission = async () => {
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
              onPress: () => console.log("Permissão cancelada"),
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

    getLocationPermission();
  }, []);

  const handleSelectLocation = async (event) => {
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

  const handleInviteFriends = () => {
    actionSheetRef.current?.setModalVisible(true);
  };

  const registerMatch = async () => {
    try {
      const Match = {
        latitude: latiLong.latitude,
        longitude: latiLong.longitude,
        date: date,
        hour: time,
        value: value ? value : 0,
        InviteMatchFriends: []
      }
      const response = await RegisterMatchService.Register(Match);
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderTop style={{ backgroundColor: "#2C67FF" }}>Registrar Quadra</HeaderTop>
      {showMap ? (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={initialRegion}
            onPress={handleSelectLocation}
          >
            {latiLong && (
              <Marker title="Local Selecionado" coordinate={latiLong} />
            )}
          </MapView>
          <Button title="Cancelar" onPress={() => setShowMap(false)} />
        </View>
      ) : (
        <View style={styles.form}>
          <ActionInput
            textButton={"Inserir"}
            placeholder={"Nome da Arena"}
          />
          <ActionInput
            textButton={"Selecionar"}
            placeholder={"Localização"}
            value={location}
            onPress={() => setShowMap(true)}
          />
          <DateModal
            isVisible={showCalendarModal}
            onBackdropPress={() => setShowCalendarModal(false)}
            selectedDate={selectedDate}
            markedDates={markedDates}
            onDayPress={handleDateSelect}
          />
          <ActionInput
            textButton={"Inserir"}
            placeholder={"Datas e horários"}
          />
          <TimeModal
            isVisible={showTimeModal}
            onBackdropPress={() => setShowTimeModal(false)}
            onSelectTime={handleSelectTime}
          />
          <ActionInput
            textButton={"Inserir"}
            placeholder={"Valor da hora"}
            // onPress={handleInviteFriends}
          />
          <ActionInput
            textButton={"Inserir"}
            placeholder={"Fotos"}
            // onPress={handleInviteFriends}
          />
          <InviteModal friends={friendsList} ref={actionSheetRef} />
          <TouchableOpacity 
            onPress={registerMatch}
            style={styles.register}
          >
            <Icon name="arrow-forward" size={24} style={{ color: "#FFF" }} />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}