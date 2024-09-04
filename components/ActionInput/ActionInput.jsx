import { Text, TextInput, View } from "react-native";
import styles from "./ActionInputStyle";
import { TouchableOpacity } from "react-native";

export default function ActionInput({textButton, placeholder, onPress, value}) {
  return (
    <View style={styles.container}>
      <TextInput editable={false} placeholder={placeholder} style={styles.placeholder} value={value}/>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{textButton}</Text>
      </TouchableOpacity>
    </View>
  );
}
