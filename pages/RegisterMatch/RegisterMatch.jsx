import { SafeAreaView } from "react-native-safe-area-context";
import FotterMain from "../../components/FotterMain/FotterMain";
import styles from "./RegisterMatchStyle";
import ActionInput from "../../components/ActionInput/ActionInput";
import { View } from "react-native";
import HeaderTop from './../../components/HeaderTop/HeaderTop'
import React, { useState } from "react";

export default function RegisterMatch({ navigation }) {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')



  function abreModalLocalizacao() {
    setLocation('teste')
  }


  return (
    <SafeAreaView style={styles.container}>
      <HeaderTop>Cadastrar Partida</HeaderTop>
      <View style={styles.form}>
        <ActionInput textButton={'Selecionar'} placeholder={'Localização'} value={location} onPress={abreModalLocalizacao}></ActionInput>
        <ActionInput textButton={'Alterar'} placeholder={'Data'}></ActionInput>
        <ActionInput textButton={'Alterar'} placeholder={'Horario'}></ActionInput>
        <ActionInput textButton={'Pagar'} placeholder={'Valor Total - '}></ActionInput>
        <ActionInput textButton={'Convidar'} placeholder={'Convidar Amigos'}></ActionInput>
      </View>
      <FotterMain navigation={navigation}></FotterMain>
    </SafeAreaView>
  );
}
