import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './IntervalModalStyle';

export default function IntervalModal({ isVisible, onClose, onAddInterval }) {
  const [open, setOpen] = useState('');
  const [close, setClose] = useState('');

  const handleAdd = () => {
    if (open && close) {
      onAddInterval({ open, close });
    }
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text>Inserir intervalo de horário</Text>
          <View style={styles.timeInputs}>
            <TextInput
              style={styles.timeInput}
              placeholder="08:00"
              value={open}
              onChangeText={setOpen}
            />
            <Text> - </Text>
            <TextInput
              style={styles.timeInput}
              placeholder="18:00"
              value={close}
              onChangeText={setClose}
            />
          </View>
          <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
