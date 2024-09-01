import { Text, TextInput, View } from "react-native";
import styles from "./ActionInputStyle";
import { TouchableOpacity } from "react-native";

export default function ActionInput() {
  return (
    <View style={styles.container}>
      <TextInput editable={false} />
      <TouchableOpacity style={styles.button}>
        <Text>teste</Text>
      </TouchableOpacity>
    </View>
  );
}
