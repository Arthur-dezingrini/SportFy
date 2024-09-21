import React from "react";
import { View, SafeAreaView, FlatList } from "react-native";
import HeaderTop from "./../../components/HeaderTop/HeaderTop";
import styles from "./FriendListStyle";
import Input from "./../../components/Input/Input";
import FriendComponent from "../../components/FriendComponent/FriendComponent";

const players = [
  { id: "1", name: "Luan Domingues", image: "https://link-para-imagem1.png" },
  { id: "2", name: "Luan Domingues", image: "https://link-para-imagem1.png" },
  { id: "3", name: "Luan Domingues", image: "https://link-para-imagem1.png" },
  { id: "4", name: "Luan Domingues", image: "https://link-para-imagem1.png" },
  { id: "5", name: "Luan Domingues", image: "https://link-para-imagem1.png" },
  { id: "6", name: "Luan Domingues", image: "https://link-para-imagem1.png" },
  { id: "7", name: "Luan Domingues", image: "https://link-para-imagem1.png" },
  { id: "8", name: "Luan Domingues", image: "https://link-para-imagem1.png" },
  { id: "9", name: "Luan Domingues", image: "https://link-para-imagem1.png" },
  { id: "10", name: "Luan Domingues", image: "https://link-para-imagem1.png" },
];

export default function FriendList() {
  function pesquisar() {}
  return (
    <SafeAreaView style={styles.container}>
      <HeaderTop>Adicionar Amigos</HeaderTop>
      <View style={styles.searchContainer}>
        <Input
          placeholder={"Buscar Jogador"}
          icon={"search"}
          onPressIcon={() => pesquisar}
        ></Input>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={players}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <FriendComponent textColor={'#FFF'} friend={item} />}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}
