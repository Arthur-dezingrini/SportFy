import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, Switch, TextInput, ScrollView } from 'react-native';
import styles from './CourtDateModalStyle';

export default function CourtDateModal({ isVisible, onClose }) {
  const [days, setDays] = useState({
    Dom: { enabled: false, open: '', close: '' },
    Seg: { enabled: false, open: '', close: '' },
    Ter: { enabled: false, open: '', close: '' },
    Qua: { enabled: false, open: '', close: '' },
    Qui: { enabled: false, open: '', close: '' },
    Sex: { enabled: false, open: '', close: '' },
    Sáb: { enabled: false, open: '', close: '' },
  });

  const toggleDay = (day) => {
    setDays({
      ...days,
      [day]: {
        ...days[day],
        enabled: !days[day].enabled,
      },
    });
  };

  const handleTimeChange = (day, type, value) => {
    setDays({
      ...days,
      [day]: {
        ...days[day],
        [type]: value,
      },
    });
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <ScrollView style={styles.container}>
        {Object.keys(days).map((day) => (
          <View
            key={day}
            style={[
              styles.dayRow,
              { backgroundColor: days[day].enabled ? '#1c1c1c' : '#2c2c2c' },
            ]}
          >
            <View style={styles.dayInfo}>
              <Text style={styles.dayText}>
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </Text>
              <Switch
                value={days[day].enabled}
                onValueChange={() => toggleDay(day)}
              />
            </View>

            {days[day].enabled && (
              <View style={styles.timeInputs}>
                <TextInput
                  style={styles.timeInput}
                  placeholder="08:00"
                  placeholderTextColor = "#999" 
                  value={days[day].open}
                  onChangeText={(value) => handleTimeChange(day, 'open', value)}
                />
                <Text> - </Text>
                <TextInput
                  style={styles.timeInput}
                  placeholder="18:00"
                  placeholderTextColor = "#999" 
                  value={days[day].close}
                  onChangeText={(value) => handleTimeChange(day, 'close', value)}
                />
              </View>
            )}

            {!days[day].enabled && <Text style={styles.closedText}>Fechado</Text>}
          </View>
        ))}

        <View style={styles.actions}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancelButton}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.applyButton}>Aplicar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Modal>
  );
}
