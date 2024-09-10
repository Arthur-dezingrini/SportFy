import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1C1C',
    },
    imageContainer: {
      width: '100%',
      height: '30%',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    infoContainer: {
      padding: 20,
      backgroundColor: '#333',
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