import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1C1C',
    },
    imageContainer: {
      width: '100%',
      height: '30%',
      position: 'relative',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    darkOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Cor preta com 50% de opacidade
    },
    infoContainer: {
      padding: 20,
      backgroundColor: '#1c1c1c',
      borderRadius: 10,
      margin: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
      textAlign: 'center',
      marginBottom: 20,
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
    },
    infoText: {
      fontSize: 18,
      color: '#fff',
      marginLeft: 10,
    },
  });