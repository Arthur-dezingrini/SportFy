import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1C1C'
    },
    headerContainer: {
        borderBottomColor: '#46FF6F',
        borderBottomWidth: 2,
        padding: 10, 
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15
    },
    image: {
        height: 50,
        width: 50,
        borderColor: '#46FF6F',
        borderRadius: '50%',
        borderWidth: 2
    }, 
    textName: {
        color: '#FFF',
        fontSize: 18
    }
})