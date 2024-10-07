import { View, Image, Text, TouchableOpacity } from "react-native";
import { styles } from "./FriendComponentStyle";
import Add from "../Add/Add";
import React, { useState, useEffect } from "react";
import Check from "./../../components/Check/Check";

export default function FriendComponent({ friend, friendAdd, friendsAdicionados, onPressAdd }) {
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if(friendsAdicionados && friendsAdicionados.length > 0) {
      const isFriendAdded = friendsAdicionados.some(item => item.id === friend.id);
      setIsAdded(isFriendAdded); 
    }
  }, [friendsAdicionados, friend]);

  const handleAddFriend = () => {
    if(friendsAdicionados) {
      setIsAdded(!isAdded);
      friendAdd(friend); 
    } else {
      onPressAdd()
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Image
          source={require("./../../assets/stadium.png")}
          style={styles.image}
        />
        <Text>{friend.name}</Text>
      </View>
      <TouchableOpacity onPress={handleAddFriend}>
        {!isAdded ? <Add /> : <Check />}
      </TouchableOpacity>
    </View>
  );
}
