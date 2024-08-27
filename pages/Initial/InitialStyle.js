import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1, // Ocupa a tela inteira
        backgroundColor: '#1C1C1C', // Cor de fundo para toda a tela
    },
    block: {
        flex: 1, // Cada bloco ocupa um terço da tela
        justifyContent: 'center', // Centraliza verticalmente
        alignItems: 'center', // Centraliza horizontalmente
    },
    sportifyIcon: {
        width: '80%',
        height: '80%',
    },
    loginIcon: {
        width: '20%', 
        height: '20%',
    },
    registerIcon: {
        width: '10%', 
        height: '20%',
    },
    text: {
        marginTop: 10, // Espaçamento entre a imagem e o texto
        color: 'white', // Cor do texto
        fontSize: 18, // Tamanho do texto
        
    },
    divider: {
        height: 1, // Altura da linha divisória
        backgroundColor: 'white', // Cor da linha divisória
        width: '100%', // Ocupa a largura total da tela
    }
});