import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Button,
  Alert,
  Platform,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import styles from "./RegisterCourtStyle";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
import * as Location from "expo-location";
import HeaderTop from "./../../components/HeaderTop/HeaderTop";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CourtDateModal from "../../modals/CourtDateModal/CourtDateModal";
import { storage } from "../../firebaseConfig.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Input from "../../components/Input/Input.jsx";
import { useAuth } from "../../appContext";
import * as courtService from "../../services/courtService.js";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function RegisterCourt({ navigation }) {
  const { user, token } = useAuth();
  const [location, setLocation] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);
  const [newTimeSlot, setNewTimeSlot] = useState({ start: "", end: "" });
  const [name, setName] = useState(null);
  const [value, setValue] = useState(null);
  const [showCourtDateModal, setShowCourtDateModal] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [latiLong, setlatiLong] = useState(null);
  const [image, setImage] = useState("");
  const [initialRegion, setInitialRegion] = useState({
    latitude: -23.55052,
    longitude: -46.633308,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

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

  const uploadImage = async () => {
    if (!image) {
      Alert.alert("Selecione uma imagem antes de fazer o upload.");
      return;
    }
    try {
      const response = await fetch(image.uri);
      const blob = await response.blob();
      const filename = image.uri.substring(image.uri.lastIndexOf("/") + 1);
      console.log(filename, 'teste')
      const storageRef = ref(storage, 'images-quadras/' + filename);
      console.log(storageRef, 'teste 1')
      await uploadBytes(storageRef, blob);

      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL

    } catch (e) {
      console.error("Erro ao carregar a imagem:", e);
      Alert.alert("Erro ao carregar a imagem.");
    }
  };

  const handleRegisterCourt = async () => {
    try {
      const image = await uploadImage();
      const objeto = {
        name: name,
        location: location,
        latitude: latiLong.latitude,
        longitude: latiLong.longitude,
        value: value,
        imageUrl: image,
        timeslots: timeSlots,
        ownerId: user.id,
      };
      setImage(null);
      const response = await courtService.addCourt(token, objeto);
      if (response.status === 200) {
        Alert.alert('Sucesso', 'Quadra Cadastrada com sucesso')
        navigation.navigate("MainTabs");
      }
    } catch (error) {
      Alert.alert("Erro ao cadastrar Quadra");
    }
  };

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

  const handleImagePicker = async () => {
    Alert.alert(
      "Selecionar Foto",
      "Escolha uma opção:",
      [
        {
          text: "Abrir Galeria",
          onPress: async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              quality: 1,
              base64: true,
              allowsEditing: true,
            });

            if (!result.canceled) {
              const source = { uri: result.assets[0].uri };
              setImage(source);
            }
          },
        },
        {
          text: "Tirar Foto",
          onPress: async () => {
            const { status } =
              await ImagePicker.requestCameraPermissionsAsync();

            if (status !== "granted") {
              Alert.alert(
                "Permissão Necessária",
                "A permissão da câmera é necessária para tirar fotos."
              );
              return;
            }

            let result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              quality: 1,
              base64: true,
              allowsEditing: true,
            });

            if (!result.canceled) {
              const source = { uri: result.assets[0].uri };
              setImage(source);
            }
          },
        },
        {
          text: "Cancelar",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  const addTimeSlot = (selectedTimes) => {
    for (const day in selectedTimes) {
      selectedTimes[day].forEach((interval) => {
        if (!interval.open || !interval.close) {
          Alert.alert("Por favor, preencha ambos os horários.");
          return;
        }

        const timeSlotExists = timeSlots.some(
          (slot) =>
            slot.day === day &&
            slot.startRange === interval.open &&
            slot.endRange === interval.close
        );

        if (timeSlotExists) {
          return;
        }
        setTimeSlots((prev) => [
          ...prev,
          { day, startRange: interval.open, endRange: interval.close },
        ]);
      });
    }
    setNewTimeSlot({ startRange: "", endRange: "" });
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderTop
        back={true}
        navigation={navigation}
        style={{ backgroundColor: "#2C67FF" }}
      >
        Registrar Quadra
      </HeaderTop>
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
          <Input
            value={name}
            onChangeText={setName}
            placeholder={"Nome da Arena"}
          />
          <Input
            value={location}
            icon={"search"}
            placeholder={"Localização"}
            onPressIcon={() => setShowMap(true)}
            editable={false}
          />
          <Input
            icon={"calendar-today"}
            placeholder={"Horários"}
            onPressIcon={() => setShowCourtDateModal(true)}
            editable={false}
          />
          <Input
            value={value}
            onChangeText={setValue}
            placeholder={"Valor da hora"}
            keyboardType={"numeric"}
          />
          <Input
            placeholder={"Fotos"}
            onPressIcon={() => handleImagePicker()}
            editable={false}
            icon={"photo"}
          />
        </View>
      )}
      <CourtDateModal
        isVisible={showCourtDateModal}
        onClose={() => setShowCourtDateModal(false)}
        onApply={addTimeSlot}
      />
      <TouchableOpacity onPress={handleRegisterCourt} style={styles.register}>
        <Icon name="arrow-forward" size={24} style={{ color: "#FFF" }} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
