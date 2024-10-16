import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, Switch, TextInput, ScrollView } from 'react-native';
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

  const [showTimePicker, setShowTimePicker] = useState({ day: null, index: null, type: null });

  const toggleDay = (day) => {
    setDays({
      ...days,
      [day]: {
        ...days[day],
        enabled: !days[day].enabled,
      },
    });
  };

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
    setShowTimePicker({ day: null, index: null, type: null }); // Fecha o picker após a seleção
  };

  const openTimePicker = (day, index, type) => {
    setShowTimePicker({ day, index, type });
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

  const applyChanges = () => {
    // Lógica de aplicação das mudanças pode ser adicionada aqui
    onClose(); 
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
                      <TouchableOpacity
                        style={styles.timeInput}
                        onPress={() => openTimePicker(day, index, 'open')}
                      >
                        <Text
                          style={{
                            color: interval.open ? '#46FF6F' : '#999'  // Cor do texto e do "placeholder"
                          }}
                        >
                          {interval.open || '08:00'}
                        </Text>
                      </TouchableOpacity>
                      <Text> - </Text>
                      <TouchableOpacity
                        style={styles.timeInput}
                        onPress={() => openTimePicker(day, index, 'close')}
                      >
                        <Text
                          style={{
                            color: interval.close ? '#46FF6F' : '#999'  // Cor do texto e do "placeholder"
                          }}
                        >
                          {interval.close || '18:00'}
                        </Text>
                      </TouchableOpacity>
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
          {showTimePicker.day && (
            <DateTimePicker
              mode="time"
              display="default"
              is24Hour={true}  // Define o formato 24 horas
              value={new Date()}
              onChange={(event, selectedTime) =>
                handleTimeChange(event, selectedTime, showTimePicker.day, showTimePicker.index, showTimePicker.type)
              }
            />
          )}
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
