import React, { useState } from "react";
import { View, Text, SafeAreaView, Image, TouchableOpacity, Pressable } from "react-native";
import styles from "./MatchStyle";
import Icon from "react-native-vector-icons/MaterialIcons";
import { LinearGradient } from 'expo-linear-gradient';
import HeaderTop from "./../../components/HeaderTop/HeaderTop";

export default function Match({ navigation }) {

  return (
    <SafeAreaView style={styles.container}>
      <HeaderTop back={true} navigation={navigation}>Partida</HeaderTop>
      <View style={styles.container}>
        {/* Imagem com o gradiente embutido */}
        <View style={styles.imageContainer}>
          <Image 
            source={require('./../../assets/stadium.png')}
            style={styles.image} 
            resizeMode="cover" 
          />
          {/* Camada para escurecer a imagem */}
          <View style={styles.darkOverlay} />
           {/* Aplicando o gradiente */}
          <LinearGradient
            colors={['rgba(28,28,28,0)', 'rgba(28,28,28,1)']} // Transparente no topo, cor sólida no fim
            style={styles.overlay}
          />
        </View>

        {/* Container das informações */}
        <View style={styles.infoContainer}>
          <Text style={styles.title}>Nabi Abi Chedid</Text>
          <Text style={styles.title}>Nome da Quadra</Text>
          
          <View style={styles.infoRow}>
            <Icon name="event" size={20} color="#fff" />
            <Text style={styles.infoText}>Data: 31/12/2024</Text>
          </View>

          <View style={styles.infoRow}>
            <Icon name="schedule" size={20} color="#fff" />
            <Text style={styles.infoText}>Horário: 13:00</Text>
          </View>

          <View style={styles.infoRow}>
            <Icon name="attach-money" size={20} color="#fff" />
            <Text style={styles.infoText}>Valor da partida: $300</Text>
          </View>

          <View style={styles.infoRow}>
            <Icon name="location-on" size={20} color="#fff" />
            <Text style={styles.infoText}>Localização da quadra</Text>
          </View>

          <View style={styles.infoRow}>
            <Icon name="account-circle" size={20} color="#fff" />
            <Text style={styles.infoText}>Jogadores confirmados: 7/14</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
