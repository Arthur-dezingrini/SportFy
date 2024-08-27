import React from "react";
import { View, Text, Stylesheet } from "react-native";
export default function Initial () {
    return (
        <View style={styles.container}>
            <View style={styles.block}>
                <Image source={require('./path_to_app_icon.png')} style={styles.icon} />
            </View>
            <View style={styles.block}>
                <Image source={require('./path_to_login_icon.png')} style={styles.icon} />
            </View>
            <View style={styles.block}>
                <Image source={require('./path_to_register_icon.png')} style={styles.icon} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // Ocupa a tela inteira
    },
    block: {
        flex: 1, // Cada bloco ocupa um terço da tela
        justifyContent: 'center', // Centraliza verticalmente
        alignItems: 'center', // Centraliza horizontalmente
    },
    icon: {
        width: 100, // Ajuste o tamanho do ícone conforme necessário
        height: 100,
    }
});
