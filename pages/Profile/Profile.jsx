import React, { useState } from "react";
import { View, Text, SafeAreaView, Image, TouchableOpacity, Pressable, FlatList } from "react-native";
import styles from "./ProfileStyle";
import Input from "./../../components/Input/Input";
import Button from "./../../components/Button/Button";
import Icon from "react-native-vector-icons/MaterialIcons";
import { LinearGradient } from 'expo-linear-gradient';
import HeaderTop from "./../../components/HeaderTop/HeaderTop";
import FotterMain from "../../components/FotterMain/FotterMain";

const options = [
{ id: '1', icon: '👤', text: 'Trocar perfil/cadastrar quadra' },
{ id: '2', icon: '💬', text: 'Mensagens' },
{ id: '3', icon: '🤝', text: 'Convidar amigos' },
{ id: '4', icon: '⚽', text: 'Novo time' },
{ id: '5', icon: 'ℹ️', text: 'Suporte' },
{ id: '6', icon: '🚪', text: 'Sair' },
];

export default function Profile({ navigation }) {

  return (
    <SafeAreaView style={styles.container}>
      <HeaderTop>PERFIL</HeaderTop>
      <View style={styles.container}>
        {/* Imagem de fundo */}
      <View style={styles.backgroundImageContainer}>
        <Image
          source={{ uri: 'path_to_background_image' }} // Substituir pela sua imagem
          style={styles.backgroundImage}
        />
        {/* Imagem de perfil */}
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: 'path_to_profile_image' }} // Substituir pela sua imagem
            style={styles.profileImage}
          />
          <Text style={styles.userName}>Nome do Usuário</Text>
        </View>
      </View>

      {/* Lista de opções */}
      <FlatList
        data={options}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.optionContainer}>
            <Text style={styles.optionIcon}>{item.icon}</Text>
            <Text style={styles.optionText}>{item.text}</Text>
          </TouchableOpacity>
        )}
        style={styles.optionsList}
      />
      </View>
    </SafeAreaView>
  );
}
