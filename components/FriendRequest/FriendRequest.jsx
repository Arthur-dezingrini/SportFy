import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./FriendRequestStyle";

const FriendRequest = ({ request, type, onPressAccept, onPressReject }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("./../../assets/bola.png")}
        style={styles.avatar}
      />
      <View style={styles.textContainer}>
        {type === "Friend" ? (
          <Text style={styles.inviteText}>
            <Text style={styles.userName}>{request.senderName}</Text> Enviou
            uma solicitação de amizade
          </Text>
        ) : (
          <Text style={styles.inviteText}>
            <Text style={styles.userName}>{request.senderName}</Text> convidou
            você para uma partida
          </Text>
        )}
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={onPressAccept} style={styles.acceptButton}>
          <Text style={styles.buttonText}>Aceitar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressReject} style={styles.rejectButton}>
          <Text style={styles.buttonText}>Rejeitar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FriendRequest;
