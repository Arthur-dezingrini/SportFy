import React from "react";
import { View, Text, SafeAreaView, Image, TouchableOpacity } from "react-native";
import styles from "./LoginStyle";
import Input from './../../components/Input/Input'
import Button from './../../components/Button/Button'

export default function Login() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require("../../assets/Logo_icon.png")} style={styles.image}></Image>
      </View>
      <View>
        <Input placeholder={"Email"}></Input>
        <Input placeholder={"Senha"}></Input>
        <View>
            <TouchableOpacity>
                <Text>Esqueci a senha</Text>
            </TouchableOpacity>
        </View>
        <View>
            <Button children={"LOGAR"}></Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
