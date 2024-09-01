import { SafeAreaView } from "react-native-safe-area-context";
import FotterMain from "../../components/FotterMain/FotterMain";
import styles from "./RegisterMatchStyle";
import ActionInput from "../../components/ActionInput/ActionInput";
import { View } from "react-native";

export default function RegisterMatch({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <ActionInput></ActionInput>
      </View>
      <FotterMain navigation={navigation}></FotterMain>
    </SafeAreaView>
  );
}
