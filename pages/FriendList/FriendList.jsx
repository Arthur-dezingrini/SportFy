import React, { useEffect, useState } from "react";
import { View, SafeAreaView, FlatList, Alert } from "react-native";
import HeaderTop from "./../../components/HeaderTop/HeaderTop";
import styles from "./FriendListStyle";
import Input from "./../../components/Input/Input";
import FriendComponent from "../../components/FriendComponent/FriendComponent";
import * as FriendListService from './../../services/FriendListService'
import { useAuth } from "./../../appContext";  

export default function FriendList() {
  const { token, user } = useAuth(); 
  const [ condition, setCondition ] = useState(null)
  const [ players, setPlayers ] = useState(null)

  useEffect(() => {
   FindPlayers() 
  })

  const FindPlayers = async (condition = null) => {
    try {
      const response = await FriendListService.findPlayers(user.id, condition, token)
      if (response.status === 200) {
        setPlayers(response.data)
      } 
    } catch (error) {
      console.error(error)
    }
  }

  async function InviteFriend (id) {

    try {
      const response = await FriendListService.InviteFriend(id, token)
      if (response.status === 200) {
        Alert.alert('Sucesso', 'Pedido de amizade enviado com sucesso')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderTop>Adicionar Amigos</HeaderTop>
      <View style={styles.searchContainer}>
        <Input
          placeholder={"Buscar Jogador"}
          icon={"search"}
          value={condition}
          onChangeText={setCondition}
          onPressIcon={() => FindPlayers()}
        ></Input>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={players}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <FriendComponent textColor={'#FFF'} friend={item} onPressAdd={() => InviteFriend(item.id)} />}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}
