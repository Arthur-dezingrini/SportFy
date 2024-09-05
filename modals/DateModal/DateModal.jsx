import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import styles from './DateModalStyle'

LocaleConfig.locales['pt-br'] = {
  monthNames: [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ],
  monthNamesShort: [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ],
  dayNames: [
    'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'
  ],
  dayNamesShort: [
    'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'
  ],
  today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt-br';

export default function DateModal ({ isVisible, onBackdropPress, selectedDate, markedDates, onDayPress }) {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      style={styles.modal}
    >
      <View style={styles.modalContent}>
        <TouchableOpacity
          style={styles.modalCloseButton}
          onPress={onBackdropPress}
        >
          <Text style={styles.modalCloseButtonText}>Fechar</Text>
        </TouchableOpacity>
        <Calendar
          current={selectedDate || new Date().toISOString().split('T')[0]}
          markedDates={markedDates}
          onDayPress={onDayPress}
          markingType="custom"
          theme={{
            calendarBackground: "#FFFFFF",
            textSectionTitleColor: "#333333",
            selectedDayBackgroundColor: "#00FF00",
            selectedDayTextColor: "#FFFFFF",
            todayTextColor: "#00FF00",
            dayTextColor: "#333333",
            textDisabledColor: "#AAAAAA",
            dotColor: "#00FF00",
            selectedDotColor: "#FFFFFF",
            arrowColor: "#333333",
            monthTextColor: "#333333",
            textMonthFontWeight: "bold",
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16,
          }}
        />
      </View>
    </Modal>
  );
};