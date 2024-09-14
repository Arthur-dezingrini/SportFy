import React from "react";
import { Text, View, ScrollView } from "react-native";
import FriendComponent from "../../components/FriendComponent/FriendComponent";
import { styles } from "./InviteModalStyle";
import Modal from "react-native-modal";

export default function InviteModal({ onClose, isVisible }) {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose} 
      onSwipeComplete={onClose} 
      swipeDirection="down" 
      style={styles.overlay}
      backdropOpacity={0.5} 
    >
      <View style={styles.modalView}>
        <Text style={styles.title}>Enviar Convite</Text>
        <ScrollView style={styles.scrollView}>
          <View style={{ gap: 15 }}>
            <FriendComponent />
            <FriendComponent />
            <FriendComponent />
            <FriendComponent />
            <FriendComponent />
            <FriendComponent />
            <FriendComponent />
            <FriendComponent />
            <FriendComponent />
            <FriendComponent />
            <FriendComponent />
            <FriendComponent />
            <FriendComponent />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}
