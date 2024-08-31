import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1C1C1C',
    },
    headerContainer: {
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,   
        zIndex: 1,
        borderBottomColor: '#46FF6F',
        borderBottomWidth: 2,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
      },
    image: {
      height: 50,
      width: 50,
      borderColor: '#46FF6F',
      borderRadius: 25, // Substitua '50%' por 25 para fazer o borderRadius correto
      borderWidth: 2,
    },
    textName: {
      color: '#FFF',
      fontSize: 18,
      fontWeight: '600',
    },
    boldText: {
      fontWeight: '300',
    },
    titleContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20, 
    },
    title: {
      color: '#A6A6A6',
      fontSize: 18,
      fontWeight: '600',
    },
    gamesContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
        marginTop: 25
    }
  });
  