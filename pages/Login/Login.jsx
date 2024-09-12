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
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const schema = Yup.object().shape({
  email: Yup.string().required("E-mail é obrigatório"),
  password: Yup.string().required("Senha é obrigatória"),
});

export default function Login({ navigation }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const logar = () => {};

  return (
    <SafeAreaView style={styles.container}>
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
            <Input placeholder={"Email"} icon={"person"}></Input>
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder={"Senha"}
              icon={isPasswordVisible ? "visibility" : "visibility-off"}
              secureTextEntry={!isPasswordVisible}
              onPressIcon={togglePasswordVisibility}
            ></Input>
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
          onPress={() => navigation.navigate("Home")}
          children={"LOGAR"}
        ></Button>
      </View>
    </SafeAreaView>
  );
}
