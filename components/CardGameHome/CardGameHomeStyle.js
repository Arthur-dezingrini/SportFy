import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        flexDirection: 'row',
        borderRadius: 25,
        padding: 15,
        width: '80%'
    }, 
    image: {
        borderRadius: 15
    }, 
    infoContainer: {
        marginLeft: 10,
        marginTop: 5
    },
    title: {
        color: '#A6A6A6',
        fontSize: 20,
        marginBottom: 10,
        fontWeight: '600'
    },
    addres: {
        color: '#A6A6A6',
        fontWeight: '500',
        marginBottom: 5
    }, 
    value: {
        color: '#A6A6A6',
        fontWeight: '400',
        fontSize: 13
    }
})