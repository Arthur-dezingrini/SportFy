import React, { useState } from "react";
import { View, Text, SafeAreaView, Image, TouchableOpacity, Pressable } from "react-native";
import styles from "./MatchStyle";
import Input from "./../../components/Input/Input";
import Button from "./../../components/Button/Button";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function Match({ navigation }) {

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {/* Imagem com o gradiente embutido */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: './../../assets/stadium1.png' }} 
            style={styles.image} 
            resizeMode="cover" 
          />
        </View>

        {/* Container das informações */}
        <View style={styles.infoContainer}>
          <Text style={styles.title}>Nome da Quadra</Text>
          
          <View style={styles.infoRow}>
            <Icon name="calendar" size={20} color="#fff" />
            <Text style={styles.infoText}>Data da partida</Text>
          </View>

          <View style={styles.infoRow}>
            <Icon name="clock-o" size={20} color="#fff" />
            <Text style={styles.infoText}>Horário da partida</Text>
          </View>

          <View style={styles.infoRow}>
            <Icon name="ticket" size={20} color="#fff" />
            <Text style={styles.infoText}>Valor da partida</Text>
          </View>

          <View style={styles.infoRow}>
            <Icon name="map-marker" size={20} color="#fff" />
            <Text style={styles.infoText}>Endereço da quadra</Text>
          </View>

          <View style={styles.infoRow}>
            <Icon name="users" size={20} color="#fff" />
            <Text style={styles.infoText}>Jogadores confirmados</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
