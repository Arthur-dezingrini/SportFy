import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import styles from "./LoginStyle";
import Input from "./../../components/Input/Input";
import Button from "./../../components/Button/Button";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function Login({ navigation }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={() => navigation.navigate('Initial')} style={styles.arrowBack}>
        <Icon name="arrow-back" size={24} color="#43F16A"></Icon>
      </Pressable>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/Logo_icon.png")}
          style={styles.image}
        ></Image>
      </View>
      <View style={styles.formContainer}>
        <Input placeholder={"Email"} icon={"person"}></Input>
        <Input
          placeholder={"Senha"}
          icon={isPasswordVisible ? "visibility" : "visibility-off"}
          secureTextEntry={!isPasswordVisible}
          onPressIcon={togglePasswordVisibility}
        ></Input>
        <View>
          <TouchableOpacity>
            <Text style={styles.passwordText}>Esqueci a senha</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={() => navigation.navigate('Home')} children={"LOGAR"}></Button>
      </View>
    </SafeAreaView>
  );
}
