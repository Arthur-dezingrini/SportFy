import { View, Image, Text } from "react-native";
import { styles } from "./FriendComponentStyle";
import Add from "../Add/Add";

export default function FriendComponent({ name, image }) {
  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Image
          source={require("./../../assets/stadium.png")}
          style={styles.image}
        ></Image>
        <Text> Arthur Dezingrini </Text>
      </View>
      <Add></Add>
    </View>
  );
}
