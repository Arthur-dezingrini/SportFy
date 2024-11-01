import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, Switch, ScrollView, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import PngIcon from '../../assets/add-button.png';
import styles from './CourtDateModalStyle';

const initialDaysState = {
  Dom: { enabled: false, intervals: [{ open: '', close: '' }] },
  Seg: { enabled: false, intervals: [{ open: '', close: '' }] },
  Ter: { enabled: false, intervals: [{ open: '', close: '' }] },
  Qua: { enabled: false, intervals: [{ open: '', close: '' }] },
  Qui: { enabled: false, intervals: [{ open: '', close: '' }] },
  Sex: { enabled: false, intervals: [{ open: '', close: '' }] },
  Sáb: { enabled: false, intervals: [{ open: '', close: '' }] },
};

export default function CourtDateModal({ isVisible, onClose, onApply }) {

  const [days, setDays] = useState(initialDaysState);

  const [showTimePicker, setShowTimePicker] = useState({ visible: false, day: null, index: null, type: null });

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
    if (event.type === 'set' && selectedTime) {
      const formattedTime = selectedTime.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      }); 

      const updatedIntervals = days[day].intervals.map((interval, i) =>
        i === index ? { ...interval, [type]: formattedTime } : interval
      );

      const openTime = updatedIntervals[index].open;
      const closeTime = updatedIntervals[index].close;
  
      // Validação de intervalo mínimo de 1 hora
      if (openTime && closeTime) {
        const [openHours, openMinutes] = openTime.split(':').map(Number);
        const [closeHours, closeMinutes] = closeTime.split(':').map(Number);
  
        // Converte para objetos de data
        const openDate = new Date();
        openDate.setHours(openHours, openMinutes);
  
        const closeDate = new Date();
        closeDate.setHours(closeHours, closeMinutes);
  
        // Calcula a diferença em milissegundos
        const difference = closeDate - openDate;
  
        // Verifica se a diferença é de pelo menos 1 hora (3600000 ms)
        if (difference < 3600000) {
          alert('O intervalo mínimo entre os horários deve ser de 1 hora.');
          return; // Impede a atualização se a validação falhar
        }
      }

      setDays({
        ...days,
        [day]: { ...days[day], intervals: updatedIntervals },
      });

      // Após a escolha do horário, fechamos o TimePicker
      setShowTimePicker({ visible: false, day: null, index: null, type: null });
    } else {
      // Cancela a seleção e fecha o picker
      setShowTimePicker({ visible: false, day: null, index: null, type: null });
    }
  };

  const openTimePicker = (day, index, type) => {
    setShowTimePicker({ visible: true, day, index, type });
  };

  const addInterval = (day) => {
    if (days[day].intervals.length < 4) {
      const updatedIntervals = [...days[day].intervals, { open: '', close: '' }];
      setDays({
        ...days,
        [day]: { ...days[day], intervals: updatedIntervals },
      });
    }
  };

  const resetDays = () => {
    setDays(initialDaysState);  
  };

  const validateIntervals = () => {
    for (const day in days) {
      if (days[day].enabled) {
        for (const interval of days[day].intervals) {
          if ((!interval.open && interval.close) || (interval.open && !interval.close)) {
            alert('Não é possível um intervalo de horários com apenas um horário inserido!');
            return false; 
          }
        }
      }
    }
    return true;
  };

  const handleApply = () => {
    if (validateIntervals()) {
      const selectedTimes = {};
      for (const day in days) {
        if (days[day].enabled) {
          selectedTimes[day] = days[day].intervals.filter(interval => interval.open && interval.close);
        }
      }
      
      onApply(selectedTimes);
      
      onClose();
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
                      <TouchableOpacity
                        style={styles.timeInput}
                        onPress={() => openTimePicker(day, index, 'open')}
                      >
                        <Text
                          style={{
                            color: interval.open ? '#46FF6F' : '#',  fontSize: 18// Cor do texto e do "placeholder"
                          }}
                        >
                          {interval.open || '08:00'}
                        </Text>
                      </TouchableOpacity>
                      <Text style={{ color: 'white' }}> -  </Text>
                      <TouchableOpacity
                        style={styles.timeInput}
                        onPress={() => openTimePicker(day, index, 'close')}
                      >
                        <Text
                          style={{
                            color: interval.close ? '#46FF6F' : '#999',  fontSize: 18
                          }}
                        >
                          {interval.close || '18:00'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ))}

                  {days[day].intervals.length < 4 && (
                    <View style={styles.addButtonContainer}>
                      <TouchableOpacity
                        // style={styles.addButton}
                        onPress={() => addInterval(day)}
                      >
                        <Image source={PngIcon} style={{ width: 24, height: 24, backgroundColor:'transparent' }} />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              )}

              {!days[day].enabled && <Text style={styles.closedText}>Fechado</Text>}
            </View>
          ))}

          {showTimePicker.visible && (
            <DateTimePicker
  mode="time"
  display="spinner"
  is24Hour={true}  // Define o formato 24 horas
  value={new Date()}
  onChange={(event, selectedTime) => {
    if (selectedTime) {
      // Ajusta os minutos para zero
      selectedTime.setMinutes(0);
      handleTimeChange(event, selectedTime, showTimePicker.day, showTimePicker.index, showTimePicker.type);
    }
  }}
/>
          )}
        </View>
      </ScrollView>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            resetDays(); 
            onClose();
          }}
        >
          <Text style={styles.cancelButton}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleApply}>
          <Text style={styles.applyButton}>Aplicar</Text>
        </TouchableOpacity>
      </View>

    </Modal>
  );
}
