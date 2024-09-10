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
    // Estilo do overlay com gradiente de opacidade
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'transparent', // Começa transparente
      backgroundImage: 'linear-gradient(to bottom, rgba(28, 28, 28, 0.2), rgba(28, 28, 28, 1))', // Termina na cor de fundo
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