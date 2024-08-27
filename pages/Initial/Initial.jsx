import { View, Text, Image, TouchableOpacity, SafeAreaView } from "react-native";
import styles from "./InitialStyle";

export default function Initial({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.block}>
          <Image
            source={require("./../../assets/sportify_icon.png")}
            style={styles.sportifyIcon}
            resizeMode="contain"
          />
        </View>
        <View style={styles.divider} />
        <TouchableOpacity
          style={styles.block}
          onPress={() => navigation.navigate("Login")}
        >
          <Image
            source={require("./../../assets/login_icon.png")}
            style={styles.loginIcon}
            resizeMode="contain"
          />
          <Text style={styles.text}>LOGAR</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          style={styles.block}
          onPress={() => navigation.navigate("Register")}
        >
          <Image
            source={require("./../../assets/register_icon.png")}
            style={styles.registerIcon}
            resizeMode="contain"
          />
          <Text style={styles.text}>REGISTRAR</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
}
