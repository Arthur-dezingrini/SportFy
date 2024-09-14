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
        height: 50,
        width: 50,
        borderColor: '#65CC41',
        borderWidth: 1
    }, 
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    }
})