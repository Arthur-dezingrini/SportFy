import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, Switch, TextInput, SafeAreaView } from 'react-native';
import styles from './CourtDateModalStyle';

export default function ScheduleModal({ isVisible, onClose }) {
  const [days, setDays] = useState({
    dom: { enabled: false, open: '', close: '' },
    seg: { enabled: false, open: '', close: '' },
    ter: { enabled: false, open: '', close: '' },
    qua: { enabled: false, open: '', close: '' },
    qui: { enabled: false, open: '', close: '' },
    sex: { enabled: false, open: '', close: '' },
    sáb: { enabled: false, open: '', close: '' },
  });

  const [showIntervalModal, setShowIntervalModal] = useState(false);
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
    <Modal style={styles.modalContainer} 
      visible={isVisible} 
      animationType="slide"
      transparent={true}
      >
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
                <Text style={styles.dayText}>{day.charAt(0).toUpperCase() + day.slice(1)}</Text>
                <Switch
                  value={days[day].enabled}
                  onValueChange={() => toggleDay(day)}
                />
              </View>

              {days[day].enabled && (
                <View>
                {days[day].intervals.map((interval, index) => (
                  <View key={index} style={styles.timeInputs}>
                    <Text>{interval.open} - {interval.close}</Text>
                  </View>
                ))}
                <TouchableOpacity
                  onPress={() => {
                    setSelectedDay(day);
                    setShowIntervalModal(true);
                  }}
                >
                  <Text style={styles.addIntervalButton}>Inserir intervalo</Text>
                </TouchableOpacity>
              </View>
            )}

              {!days[day].enabled && (
                <Text style={styles.closedText}>Fechado</Text>
              )}
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
      {showIntervalModal && (
        <IntervalModal
          isVisible={showIntervalModal}
          onClose={() => setShowIntervalModal(false)}
          onAddInterval={(interval) => {
            handleAddInterval(selectedDay, interval);
            setShowIntervalModal(false);
          }}
        />
      )}
    </Modal>
  );
}
