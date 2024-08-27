import { View, Text, Image, StyleSheet } from 'react-native';

export default function Initial () {
    return (
        <View style={styles.container}>
            <View style={styles.block}>
                <Image
                    source={require('./../../assets/sportify_icon.png')} style={styles.sportifyIcon} 
                    resizeMode="contain" // Ajusta a imagem para caber no espaço

                />
            </View>
            <View style={styles.divider} />
            <View style={styles.block}>
                <Image 
                    source={require('./../../assets/login_icon.png')} style={styles.loginIcon}
 
                    resizeMode="contain" // Ajusta a imagem para caber no espaço
                />
                <Text style={styles.text}>LOGIN</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.block}>
                <Image 
                source={require('./../../assets/register_icon.png')} style={styles.registerIcon}
                resizeMode="contain" // Ajusta a imagem para caber no espaço
                />
                <Text style={styles.text}>REGISTER</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
        width: '20%', // Ajuste o tamanho da imagem de login conforme necessário
        height: '20%',
    },
    registerIcon: {
        width: '10%', // Ajuste o tamanho da imagem de registro conforme necessário
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

// baixar imagens em svg