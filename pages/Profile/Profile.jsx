import React, { useState } from "react";
import { View, Text, SafeAreaView, Image, TouchableOpacity, Pressable, FlatList } from "react-native";
import styles from "./ProfileStyle";
import Icon from "react-native-vector-icons/MaterialIcons";
import { LinearGradient } from 'expo-linear-gradient';
import HeaderTop from "./../../components/HeaderTop/HeaderTop";

const options = [
{ id: '1', icon: 'account-circle', text: 'Trocar perfil/Cadastrar quadra' },
{ id: '2', icon: 'message', text: 'Mensagens' },
{ id: '3', icon: 'group', text: 'Convidar amigos' },
{ id: '4', icon: 'sports-soccer', text: 'Novo time' },
{ id: '5', icon: 'info', text: 'Suporte' },
{ id: '6', icon: 'exit-to-app', text: 'Sair' },
];

export default function Profile({ navigation }) {

  return (
    <SafeAreaView style={styles.container}>
      <HeaderTop>PERFIL</HeaderTop>
      <View style={styles.container}>
        {/* Imagem de fundo */}
      <View style={styles.backgroundImageContainer}>
          <Image
            source={ require( './../../assets/profile-background.jpg') } // Substituir pela sua imagem
            style={styles.backgroundImage}
          />
          <Image
          source={ require( './../../assets/profile-background.jpg') } // Substituir pela sua imagem
          style={styles.backgroundImage}
          />
        <LinearGradient
        colors={['rgba(28,28,28,0)', 'rgba(28,28,28,1)']} // Transparente no topo, cor sólida no fim
        style={styles.overlay}
        />
       
        {/* Imagem de perfil */}
        <View style={styles.profileContainer}>
          <Image
            source={ require( './../../assets/nego-ney.jpg') } // Substituir pela sua imagem
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
            <Icon name={item.icon} size={25} color={'#fff'}></Icon>
            <Text style={styles.optionText}>{item.text}</Text>
          </TouchableOpacity>
        )}
        style={styles.optionsList}
      />
      </View>
    </SafeAreaView>
  );
}
