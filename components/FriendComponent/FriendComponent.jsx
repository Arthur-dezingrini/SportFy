import { View, Image, Text, TouchableOpacity } from "react-native";
import { styles } from "./FriendComponentStyle";
import Add from "../Add/Add";
import React, { useState } from "react";

export default function FriendComponent({ friend, textColor, onPressAdd }) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddFriend = async () => {
    if (!isAdded) {
      await onPressAdd(); 
      setIsAdded(true); 
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Image
          source={require("./../../assets/stadium.png")}
          style={styles.image}
        ></Image>
        <Text style={{ color: textColor }}> {friend.name} </Text>
        </View>
      <TouchableOpacity onPress={onPressAdd}>
        <Add></Add>
      </TouchableOpacity>
    </View>
  );
}
