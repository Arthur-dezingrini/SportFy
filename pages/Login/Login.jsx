import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Pressable,
  Platform,
  Alert,
} from "react-native";
import styles from "./LoginStyle";
import Input from "./../../components/Input/Input";
import Button from "./../../components/Button/Button";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import * as userService from "../../services/userService.js";
import { useAppContext } from '../../appContext.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const schema = Yup.object().shape({
  email: Yup.string(),
  password: Yup.string(),
});

export default function Login({ navigation }) {
  const { setUser, setToken } = useAppContext(); 
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const storeSession = async (user, token) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
      await AsyncStorage.setItem('token', token);
    } catch (error) {
      console.error('Erro ao salvar a sessão no AsyncStorage:', error);
    }
  };
  
  const Logar = async (data) => {
    try {
      data.email = data.email.toLowerCase();
      const response = await userService.Login(data);
      if (response.status === 200) {
        setUser(response.data.user); 
        setToken(response.data.token); 
        storeSession(response.data.user, response.data.token);
        navigation.navigate("MainTabs");
      } else {
        Alert.alert('Error', 'Email ou Senha Incorretos');
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {Platform.OS === 'android' && <View style={styles.androidTopView}></View>}
      <Pressable
        onPress={() => navigation.navigate("Initial")}
        style={styles.arrowBack}
      >
        <Icon name="arrow-back" size={24} color="#43F16A"></Icon>
      </Pressable>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/Logo_icon.png")}
          style={styles.image}
        ></Image>
      </View>
      <View style={styles.formContainer}>
        {/* Email */}
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder={"Email"}
              icon={"person"}
              onChangeText={onChange}
              value={value}
            />
          )}
        />

        {/* Password */}
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder={"Senha"}
              icon={isPasswordVisible ? "visibility" : "visibility-off"}
              secureTextEntry={!isPasswordVisible}
              onPressIcon={togglePasswordVisibility}
              onChangeText={onChange}
              value={value}
            />
          )}
        />

        <View>
          <TouchableOpacity>
            <Text style={styles.passwordText}>Esqueci a senha</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={handleSubmit(Logar)}
          children={"LOGAR"}
        />
      </View>
    </SafeAreaView>
  );
}
