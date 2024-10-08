import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, Switch, TextInput } from 'react-native';
import styles from './CourtDateModalStyle';

const CourtDateModal = ({ isVisible, onClose }) => {
  const [days, setDays] = useState({
    domingo: { enabled: false, open: '', close: '' },
    segunda: { enabled: false, open: '', close: '' },
    terca: { enabled: false, open: '', close: '' },
    quarta: { enabled: false, open: '', close: '' },
    quinta: { enabled: false, open: '', close: '' },
    sexta: { enabled: false, open: '', close: '' },
    sabado: { enabled: false, open: '', close: '' },
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
    <Modal visible={isVisible} animationType="slide">
      <View style={styles.container}>
        {Object.keys(days).map((day) => (
          <View
            key={day}
            style={[
              styles.dayRow,
              { backgroundColor: days[day].enabled ? '#fff' : '#f0f0f0' },
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
                  value={days[day].open}
                  onChangeText={(value) => handleTimeChange(day, 'open', value)}
                />
                <Text> - </Text>
                <TextInput
                  style={styles.timeInput}
                  placeholder="18:00"
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
      </View>
    </Modal>
  );
};

export default CourtDateModal;
