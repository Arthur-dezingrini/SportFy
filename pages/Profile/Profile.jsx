import React, {useEffect, useState} from "react";
import { View, Text, SafeAreaView, Image, TouchableOpacity, FlatList } from "react-native";
import styles from "./ProfileStyle";
import Icon from "react-native-vector-icons/MaterialIcons";
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../appContext";

export default function Profile({ navigation }) {
  const [userType, setUserType] = useState('jogador');
  const {setTheme} = useAuth();

  useEffect(() => {
    const loadUserType = async () => {
      try{
        const savedUserType = await AsyncStorage.getItem("userType");
        if (savedUserType !== null) {
          setUserType(savedUserType);
      }
    }catch (error) {
      console.error("Erro ao carregar o tipo de perfil do AsyncStorage:", error);
    }
  };
  loadUserType();
}, []);

  const options = [
    { id: '1', icon: 'account-circle', text: userType === 'jogador' ? 'Ir para perfil de dono de quadra' : 'Ir para perfil de jogador', onPress: () => switchProfile()  },
    { id: '2', icon: 'message', text: 'Mensagens' },
    { id: '3', icon: 'group', text: 'Convidar amigos', onPress: () => navigation.navigate('FriendList')},
    { id: '4', icon: 'sports-soccer', text: 'Novo time' },
    { id: '5', icon: 'stadium', text: 'Cadastrar quadra', onPress: () => navigation.navigate('RegisterCourt')},
    { id: '6', icon: 'info', text: 'Suporte' },   
    { id: '7', icon: 'exit-to-app', text: 'Sair' },
    ];
    
    const switchProfile = async () => {
      const newUserType = userType === 'jogador' ? 'dono' : 'jogador';
      setUserType(newUserType);
  
      // Salva o tipo de perfil atualizado no AsyncStorage
      try {
        await AsyncStorage.setItem("userType", newUserType)
        setTheme(newUserType);
      } catch (error) {
        console.error("Erro ao salvar userType no AsyncStorage:", error);
      }
    };

  const Filter = (userType) => {
    return options.filter((option) => {
      if (userType === 'jogador') {
        return option.id !== '5'; 
      } else if (userType === 'dono') {  
        return option.id !== '3' && option.id !== '4'; 
      }
      return true;
    });
  }

  const filteredOptions = Filter(userType);

  return (
    <SafeAreaView style={styles.container}>
      {/* <HeaderTop>PERFIL</HeaderTop> */}
      <View style={styles.container}>
        {/* Imagem de fundo */}
      <View style={styles.backgroundImageContainer}>
          <Image
            source={ require( './../../assets/profile-background.jpg') } 
            style={styles.backgroundImage}
          />
          <Image
          source={ require( './../../assets/profile-background.jpg') } 
          style={styles.backgroundImage}
          />
        <LinearGradient
        colors={['rgba(28,28,28,0)', 'rgba(28,28,28,1)']}
        style={styles.overlay}
        />
       
        <View style={styles.profileContainer}>
          <Image
            source={ require( './../../assets/nego-ney.jpg') } 
            style={userType === 'jogador' ? styles.profileImage : styles.profileImageCourtOwner}
          />
          <Text style={styles.userName}>Nome do Usuário</Text>
        </View>
      </View>

      <FlatList
        data={filteredOptions}
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
