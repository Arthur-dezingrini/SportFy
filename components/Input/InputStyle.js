import { StyleSheet } from "react-native";

export default StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginVertical: 10,
        width: '80%',
    },
    input: {
        flex: 1,
        height: 56,
        color: '#FFF',
        fontWeight: '100',
    },
    icon: {
        width: 24, 
        height: 24,
        marginLeft: 10,
        tintColor: '#FFF',
    },
});
