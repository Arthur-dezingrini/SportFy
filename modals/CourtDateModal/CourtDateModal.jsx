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
    // Filtra o input para aceitar apenas números
    let filteredValue = value.replace(/[^0-9]/g, '').slice(0, 4);
    // Adiciona ":" automaticamente após os dois primeiros dígitos
    if (filteredValue.length > 2) {
      filteredValue = `${filteredValue.slice(0, 2)}:${filteredValue.slice(2)}`;
    }

    const updatedIntervals = days[day].intervals.map((interval, i) =>
      i === index ? { ...interval, [type]: filteredValue } : interval
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
                      <TextInput
                        style={styles.timeInput}
                        placeholder="08:00"
                        placeholderTextColor="#999"
                        value={interval.open}
                        maxLength={5} // Limita o input a 5 caracteres
                        keyboardType="numeric" // Garante que o teclado numérico seja exibido
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
                        maxLength={5} // Limita o input a 5 caracteres
                        keyboardType="numeric" // Garante que o teclado numérico seja exibido
                        onChangeText={(value) =>
                          handleTimeChange(day, index, 'close', value)
                        }
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
