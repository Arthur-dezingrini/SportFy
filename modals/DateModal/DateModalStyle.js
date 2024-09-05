import { StyleSheet } from "react-native";

export default StyleSheet.create({
    modal: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      width: '90%',
      maxHeight: '80%',
    },
    modalCloseButton: {
      backgroundColor: "#00FF00",
      padding: 10,
      borderRadius: 5,
      marginBottom: 20,
    },
    modalCloseButtonText: {
      color: "#fff",
      textAlign: "center",
    },
  });