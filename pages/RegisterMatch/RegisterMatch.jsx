import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  View,
  Button,
  Alert,
  TouchableOpacity,
  Image,
  Text,
  Pressable,
} from "react-native";
import styles from "./RegisterMatchStyle";
import ActionInput from "../../components/ActionInput/ActionInput";
import MapView, { Marker, Callout } from "react-native-maps";
import axios from "axios";
import moment from "moment";
import DateModal from "../../modals/DateModal/DateModal";
import TimeModal from "../../modals/TimeModal/TimeModal";
import InviteModal from "../../modals/InviteModal/InviteModal";
import Icon from "react-native-vector-icons/MaterialIcons";
import HeaderTop from "./../../components/HeaderTop/HeaderTop";
import * as RegisterMatchService from "./../../services/RegisterMatchService";
import * as FriendListService from "./../../services/FriendListService";
import { useAuth } from "./../../appContext";
import * as courtService from "../../services/courtService";
import * as Location from 'expo-location'

import "moment/locale/pt-br";
moment.locale("pt-br");

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
    latitude: -23.55052,
    longitude: -46.633308,
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
  const [availableCourts, setAvailableCourts] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState(match || null);
  const [reservedHours, setReservedHours] = useState([]);
  const [hoursFree, setHourFree] = useState([]);
  const [hoursDay, setHoursDay] = useState(null);

  useEffect(() => {
    const loadFriends = async () => {
      const response = await FriendListService.getFriends(user.id, token);
      if (response.status === 200 && response.data.length > 0) {
        setFriendsList(response.data);
      }  
    }

    const loadCourts = async () => {
      try {
        const response = await courtService.getAllCourts(token);
        if (response.status === 200) {
          setAvailableCourts(response.data);
        }
      } catch (error) {
        console.error("Erro ao carregar as quadras", error);
      }
    };

    const loadLocation = async () => {
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }

    loadLocation();
    loadFriends();
    loadCourts();
  }, []);

  const handleSelectLocation = async (event) => {
    if (event.id) {
      setSelectedCourt(event);
      setLocation(event.location);
      setShowMap(false);
      setDate(null);
      const response = await courtService.getFreeDays(token, event.id);
      if (response.status === 200) {
        setReservedHours(response.data.map((map) => map.day));
        setHoursDay(response.data);
      }
      return;
    }
    setReservedHours([]);
    setSelectedCourt(null);
    setDate(null);
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

  const generateHourlySlots = async (startRange, endRange, day) => {
    const hoursReserved = await courtService.getReservedHours(
      token,
      moment(day).format("YYYY-MM-DD")
    );


    const slots = [];
    let start = moment(startRange, "HH:mm");
    const end = moment(endRange, "HH:mm");

    while (start.isBefore(end)) {
      if (!hoursReserved.data.some(some => some === start.format("HH:mm"))) {
        slots.push(start.format("HH:mm"));
      }
      start.add(1, "hour");
    }
    setHourFree(slots);
    setShowTimeModal(true);
  };

  const validaSetShowTimeModal = () => {
    const momentDate = moment(date, "DD-MM-YYYY");

    if (!momentDate.isValid()) {
      console.error("Data inválida:", date);
      return;
    }

    const dia = momentDate.format("ddd");
    const diaSelect = hoursDay.find((find) => find.day.toLowerCase() === dia);

    generateHourlySlots(diaSelect.startRange, diaSelect.endRange, momentDate);
  };

  const registerMatch = async () => {
    try {
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
                    source={
                      court.image_url
                        ? { uri: court.image_url }
                        : require("./../../assets/stadium.png")
                    }
                    style={{ width: 50, height: 50, borderRadius: 50 }}
                  />
                </Pressable>
                <Callout onPress={() => handleSelectLocation(court)}>
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
            daysOfWeek={reservedHours}
          />
          <ActionInput
            textButton={"Alterar"}
            placeholder={"Horário"}
            value={time}
            onPress={() => validaSetShowTimeModal(true)}
          />
          <TimeModal
            times={hoursFree}
            isVisible={showTimeModal}
            onBackdropPress={() => setShowTimeModal(false)}
            onSelectTime={handleSelectTime}
          />
          {selectedCourt && (
            <ActionInput
              value={
                selectedCourt && selectedCourt.value ? selectedCourt.value : 0
              }
              textButton={"Pagar"}
              placeholder={
                selectedCourt && selectedCourt.value
                  ? `R$${selectedCourt.value}`
                  : "Valor Total"
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
