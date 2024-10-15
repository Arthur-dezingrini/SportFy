import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, Switch, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
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

  const handleTimeChange = (event, selectedTime, day, index, type) => {
    if (selectedTime) {
      const formattedTime = selectedTime.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      }); 
      const updatedIntervals = days[day].intervals.map((interval, i) =>
        i === index ? { ...interval, [type]: formattedTime } : interval
      );
      setDays({
        ...days,
        [day]: { ...days[day], intervals: updatedIntervals },
      });
    }
  };

  const toggleDay = (day) => {
    setDays({
      ...days,
      [day]: {
        ...days[day],
        enabled: !days[day].enabled,
      },
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
        <View>
          {Object.keys(days).map((day) => (
            <View
              key={day}
              style={[
                styles.dayRow,
                { backgroundColor: days[day].enabled ? '#111' : '#2c2c2c' },
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
                      <DateTimePicker
                        mode="time"
                        display="default"
                        is24Hour={true}
                        value={interval.open ? new Date() : new Date()}
                        onChange={(event, selectedTime) =>
                          handleTimeChange(event, selectedTime, day, index, 'open')
                        }
                        style={styles.timeInput}
                      />
                      <DateTimePicker
                        mode="time"
                        display="default"
                        is24Hour={true}
                        value={interval.close ? new Date() : new Date()}
                        onChange={(event, selectedTime) =>
                          handleTimeChange(event, selectedTime, day, index, 'close')
                        }
                        style={styles.timeInput} // Agora o DateTimePicker aparece diretamente ao lado
                      />
                    </View>
                  ))}

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
        </View>
      </ScrollView>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.button} onPress={onClose}>
          <Text style={styles.cancelButton}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onClose}>
          <Text style={styles.applyButton}>Aplicar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
