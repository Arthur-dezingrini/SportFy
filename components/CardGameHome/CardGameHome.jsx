import { View, Image, Text, Pressable } from "react-native";
import styles from "./CardGameHomeStyle";
import Icon from "react-native-vector-icons/MaterialIcons";
import moment from "moment";

export default function CardGameHome({ navigation, game, navigate }) {
  return (
    <Pressable onPress={() => navigation.navigate(navigate, { match: game })} style={styles.container}>
      <View>
        <Image
          style={styles.image}
          source={
            game.image_url
              ? { uri: game.image_url }
              : require("./../../assets/stadium.png")
          }
        ></Image>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{game.name || 'Arena'}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon name={"near-me"}> </Icon>
          <Text style={styles.addres}>{ game.location?.substring(0, 20) }</Text>
        </View>

        <Text style={styles.value}>Dia: {moment(game.date).format('DD-MM-YYYY')} às {game.hour}</Text>
      </View>
    </Pressable>
  );
}
