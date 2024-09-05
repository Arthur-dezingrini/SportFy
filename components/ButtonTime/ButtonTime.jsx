import { TouchableOpacity, Text } from "react-native";
import styles from './ButtonTimeStyle'

export default function ButtonTime ({time, onpress}) {
    return (
        <TouchableOpacity style={styles.button} onPress={onpress}>
            <Text style={styles.buttonText}>{time}</Text>
        </TouchableOpacity>
    )
}