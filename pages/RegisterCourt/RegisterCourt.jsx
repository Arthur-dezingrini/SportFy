import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Button,
  Alert,
  Platform,
  TouchableOpacity,
  Text,
  Image
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import styles from "./RegisterCourtStyle";
import ActionInput from "../../components/ActionInput/ActionInput";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
import * as Location from "expo-location";
import HeaderTop from "./../../components/HeaderTop/HeaderTop";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CourtDateModal from "../../modals/CourtDateModal/CourtDateModal";
import { storage } from '../../firebaseConfig.js';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import * as FileSystem from 'expo-file-system';

export default function RegisterCourt({ navigation }) {
  const [location, setLocation] = useState("");
  const [showCourtDateModal, setShowCourtDateModal] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [latiLong, setlatiLong] = useState(null);
  const [imageUrl, setImageUrl] = useState('')
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

  const uploadImageAsBase64ToFirebase = async (base64) => {
    try {
      console.log(base64)
      const imageName = `images-quadras/${Date.now()}.jpg`;
      const storageRef = ref(storage, imageName);
  
      await uploadString(storageRef, base64, 'base64');
      console.log('Imagem enviada com sucesso!');
  
      const downloadURL = await getDownloadURL(storageRef);
      console.log('URL da imagem:', downloadURL);
  
      return downloadURL; 
    } catch (error) {
      console.error('Erro ao enviar imagem:', error);
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
              base64: true
            });
  
            if (!result.canceled) {
              const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
                encoding: FileSystem.EncodingType.Base64,
              });
  
              const url = await uploadImageAsBase64ToFirebase(base64);
              setImageUrl(url)
            }
          },
        },
        {
          text: "Tirar Foto",
          onPress: async () => {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
  
            if (status !== "granted") {
              Alert.alert(
                "Permissão Necessária",
                "A permissão da câmera é necessária para tirar fotos."
              );
              return;
            }
  
            let result = await ImagePicker.launchCameraAsync({
              quality: 1,
              base64: true
            });
  
            if (!result.canceled) {
              await uploadImageToFirebase( result.assets[0].uri);
            } else {
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
    
  
  return (
    <SafeAreaView style={styles.container}>
      <HeaderTop back={true} navigation={navigation} style={{ backgroundColor: "#2C67FF" }}>Registrar Quadra</HeaderTop>
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
            textButton={"Inserir"}
            placeholder={"Localização"}
            value={location}
            onPress={() => setShowMap(true)}
          />
          <ActionInput
            textButton={"Inserir"}
            placeholder={"Horários"}
            onPress={() => setShowCourtDateModal(true)}
          />
          <ActionInput
            textButton={"Inserir"}
            placeholder={"Valor da hora"}
          />
          <TouchableOpacity onPress={handleImagePicker} style={styles.photoButton}>
            <Text>Inserir Foto</Text>
          </TouchableOpacity>
          <Image source={{ uri: imageUrl }} style={{ width: 100, height: 100 }} />
        </View>
      )}
      <CourtDateModal
        isVisible={showCourtDateModal}
        onClose={() => setShowCourtDateModal(false)}
      />
    </SafeAreaView>
  );
}
