import React, { useState } from "react";
import { View, Text, SafeAreaView, Image } from "react-native";
import styles from "./MatchStyle";
import Icon from "react-native-vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import HeaderTop from "./../../components/HeaderTop/HeaderTop";
import moment from "moment";

export default function Match({ navigation, route }) {
  const { match } = route.params || {};
  console.log(match)
  return (
    <SafeAreaView style={styles.container}>
      <HeaderTop back={true} navigation={navigation}>
        Partida
      </HeaderTop>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={
              match.image_url
                ? { uri: match.image_url }
                : require("./../../assets/stadium.png")
            }
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.darkOverlay} />
          <LinearGradient
            colors={["rgba(28,28,28,0)", "rgba(28,28,28,1)"]}
            style={styles.overlay}
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.title}>{match.name ?? "Nome da Quadra"}</Text>

          <View style={styles.infoRow}>
            <Icon name="event" size={20} color="#fff" />
            <Text style={styles.infoText}>
              Data: {moment(match?.date).format("DD-MM-YYYY")}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Icon name="schedule" size={20} color="#fff" />
            <Text style={styles.infoText}>Horário: {match?.hour}</Text>
          </View>

          <View style={styles.infoRow}>
            <Icon name="attach-money" size={20} color="#fff" />
            <Text style={styles.infoText}>
              Valor da partida: ${match?.value}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Icon name="location-on" size={20} color="#fff" />
            <Text style={styles.infoText}>
              Localização: {match?.location || "Localização da quadra"}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Icon name="account-circle" size={20} color="#fff" />
            <Text style={styles.infoText}>
              Jogadores confirmados: {match.confirmPlayersCount + 1} /{" "}
              {match.totalPlayersCount + 1}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
