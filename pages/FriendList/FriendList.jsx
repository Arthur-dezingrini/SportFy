import React, { useEffect, useState } from "react";
import { View, SafeAreaView, FlatList, Alert } from "react-native";
import HeaderTop from "./../../components/HeaderTop/HeaderTop";
import styles from "./FriendListStyle";
import Input from "./../../components/Input/Input";
import FriendComponent from "../../components/FriendComponent/FriendComponent";
import * as FriendListService from './../../services/FriendListService';
import { useAuth } from "./../../appContext";  

export default function FriendList({navigation}) {
  const { token, user } = useAuth(); 
  const [condition, setCondition] = useState('');
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      await FindPlayers(condition);
    };
    fetchPlayers();
  }, [condition]);

  const FindPlayers = async (condition = '') => {
    try {
      const response = await FriendListService.findPlayers(user.id, condition, token);
      if (response.status === 200) {
        setPlayers(response.data);
      } 
    } catch (error) {
      console.error(error);
    }
  };

  async function InviteFriend(item) {
    try {
      data = {
        user: user,
        userRecive: item 
      }
      const response = await FriendListService.InviteFriend(data, token);
      if (response.status === 200) {
        Alert.alert('Sucesso', 'Pedido de amizade enviado com sucesso');
        const response2 = await FriendListService.findPlayers(user.id, '', token)
        if (response2.status === 200) {
          setPlayers(response2.data);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderTop back={true} navigation={navigation}>Adicionar Amigos</HeaderTop>
      <View style={styles.searchContainer}>
        <Input
          placeholder={"Buscar Jogador"}
          icon={"search"}
          value={condition}
          onChangeText={setCondition}
          onPressIcon={() => FindPlayers(condition)}
        />
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={players}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <FriendComponent textColor={'#FFF'} friend={item} onPressAdd={() => InviteFriend(item)} />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}
