import { ScrollView, View, Text } from "react-native";
import ButtonTime from "../../components/ButtonTime/ButtonTime";
import Modal from "react-native-modal";
import styles from './TimeModalStyle'

export default function TimeModal({ isVisible, onBackdropPress, times = [], onSelectTime }) {
    times = ["08:00", "12:00", "16:00", "20:00"]; // Horários exemplo
  return (
    <Modal 
      style={styles.modalContainer} 
      isVisible={isVisible} 
      onBackdropPress={onBackdropPress}
      backdropOpacity={0.4}
    >
      <View style={styles.modalContent}>
        <Text style={styles.title}>HORÁRIOS</Text>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.timeGrid}>
            {times.map((time, index) => (
              <View key={index} style={styles.buttonMargin}>
                <ButtonTime
                  time={time}
                  onpress={() => {
                    onSelectTime(time);
                    onBackdropPress();
                  }}
                />
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}
