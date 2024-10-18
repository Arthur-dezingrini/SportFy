import { View, Image, Text, Pressable } from "react-native";
import styles from "./CardGameHomeStyle";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function CardGameHome({ navigation, game }) {
  return (
    <Pressable onPress={() => navigation.navigate('Match')} style={styles.container}>
      <View>
        <Image
          style={styles.image}
          source={require("./../../assets/exemplo.png")}
        ></Image>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{game.nomeArena || 'Arena'}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon name={"near-me"}> </Icon>
          <Text style={styles.addres}>Rua dos Bobos N° 0</Text>
        </View>

        <Text style={styles.value}>R$ 200,00/Hora</Text>
      </View>
    </Pressable>
  );
}
