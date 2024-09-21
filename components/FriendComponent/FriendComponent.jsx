import { View, Image, Text, TouchableOpacity } from "react-native";
import { styles } from "./FriendComponentStyle";
import Add from "../Add/Add";

export default function FriendComponent({ friend, textColor  }) {
  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Image
          source={require("./../../assets/stadium.png")}
          style={styles.image}
        ></Image>
        <Text style={{ color: textColor }}> {friend.name} </Text>
        </View>
      <TouchableOpacity>
        <Add></Add>
      </TouchableOpacity>
    </View>
  );
}
