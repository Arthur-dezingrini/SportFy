import React from "react";
import { View, Text, SafeAreaView, Image, TouchableOpacity, FlatList } from "react-native";
import styles from "./ProfileStyle";
import Icon from "react-native-vector-icons/MaterialIcons";
import { LinearGradient } from 'expo-linear-gradient';

export default function Profile({ navigation }) {
  const options = [
    { id: '1', icon: 'account-circle', text: 'Trocar perfil/Cadastrar quadra' },
    { id: '2', icon: 'message', text: 'Mensagens' },
    { id: '3', icon: 'group', text: 'Convidar amigos', onPress: () => navigation.navigate('FriendList')},
    { id: '4', icon: 'sports-soccer', text: 'Novo time' },
    { id: '5', icon: 'info', text: 'Suporte' },
    { id: '6', icon: 'exit-to-app', text: 'Sair' },
    ];
    

  return (
    <SafeAreaView style={styles.container}>
      {/* <HeaderTop>PERFIL</HeaderTop> */}
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

      <FlatList
        data={options}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.optionContainer} onPress={item.onPress}>
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
