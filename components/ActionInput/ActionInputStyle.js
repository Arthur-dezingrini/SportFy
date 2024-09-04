import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#FFF',
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 12
    }, 
    button: {
        backgroundColor: '#1c1c1c',
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 12,
        paddingTop: 12,
        borderRadius: 8
    }, 
    buttonText: {
        color: '#46FF6F',
        fontWeight: '600'
    }, 
    placeholder: {
        color: '#6D758F',
        fontWeight: '500'
    }
})