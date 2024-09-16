import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        paddingEnd: 15
    }, 
    image: {
        borderRadius: 25,
        height: 45,
        width: 45,
        borderColor: '#65CC41',
        borderWidth: 2
    }, 
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    }
})