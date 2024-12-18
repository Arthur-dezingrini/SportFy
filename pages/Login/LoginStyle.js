import { StyleSheet, Platform, StatusBar } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1C1C',
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems:'center'
    },
    formContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 120,
    },
    passwordText: {
        marginTop: 10,
        color: '#B6B6B6',
        fontSize: 18,
    },
    arrowBack: {
        position: 'absolute',
        top: 80,
        left: 25,
        width: 50,
        height: 50
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    androidTopView: {
        height: 30,  
        backgroundColor: '#FFF',  
      },    
});