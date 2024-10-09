import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, Switch, TextInput, ScrollView } from 'react-native';
import styles from './CourtDateModalStyle';

export default function CourtDateModal({ isVisible, onClose }) {
  const [days, setDays] = useState({
    Dom: { enabled: false, intervals: [{ open: '', close: '' }] },
    Seg: { enabled: false, intervals: [{ open: '', close: '' }] },
    Ter: { enabled: false, intervals: [{ open: '', close: '' }] },
    Qua: { enabled: false, intervals: [{ open: '', close: '' }] },
    Qui: { enabled: false, intervals: [{ open: '', close: '' }] },
    Sex: { enabled: false, intervals: [{ open: '', close: '' }] },
    Sáb: { enabled: false, intervals: [{ open: '', close: '' }] },
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

  const handleTimeChange = (day, index, type, value) => {
    const updatedIntervals = days[day].intervals.map((interval, i) =>
      i === index ? { ...interval, [type]: value } : interval
    );
    setDays({
      ...days,
      [day]: { ...days[day], intervals: updatedIntervals },
    });
  };

  const addInterval = (day) => {
    if (days[day].intervals.length < 6) {
      const updatedIntervals = [...days[day].intervals, { open: '', close: '' }];
      setDays({
        ...days,
        [day]: { ...days[day], intervals: updatedIntervals },
      });
    }
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
              <View style={styles.intervalContainer}>
                {days[day].intervals.map((interval, index) => (
                  <View key={index} style={styles.timeInputs}>
                    <TextInput
                      style={styles.timeInput}
                      placeholder="08:00"
                      placeholderTextColor="#999"
                      value={interval.open}
                      onChangeText={(value) =>
                        handleTimeChange(day, index, 'open', value)
                      }
                    />
                    <Text> - </Text>
                    <TextInput
                      style={styles.timeInput}
                      placeholder="18:00"
                      placeholderTextColor="#999"
                      value={interval.close}
                      onChangeText={(value) =>
                        handleTimeChange(day, index, 'close', value)
                      }
                    />
                  </View>
                ))}

                {/* Novo View para centralizar o botão "+" */}
                {days[day].intervals.length < 6 && (
                  <View style={styles.addButtonContainer}>
                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={() => addInterval(day)}
                    >
                      <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                )}
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
