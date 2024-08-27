import React, { useState } from "react";
import { View, Text, SafeAreaView, Pressable } from "react-native";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import styles from "./RegisterStyle";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function Register({ navigation }) {
  const [text, setText] = useState("");

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Icon onPress={() => navigation.navigate('Initial')} name="arrow-back" size={24} color="#43F16A" />
      </View>
      <View style={styles.container}>
        <Input placeholder="Nome" />
        <Input placeholder="E-mail" />
        <Input placeholder="Número" />
        <Input placeholder="Nascimento" />
        <Input placeholder="Senha" />
        <Input placeholder="Repita a senha" />
        <View style={styles.passwordContainer}>
          <Text style={styles.password}>Já tem conta? </Text>
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text style={styles.login}> Logar</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.footer}>
        <Button>REGISTRAR</Button>
      </View>
    </SafeAreaView>
  );
}
