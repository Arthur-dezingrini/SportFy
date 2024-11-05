import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Modal from 'react-native-modal';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';
import styles from './DateModalStyle';

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

const getAvailableDaysInYear = (year, daysOfWeek) => {
  const markedDates = {};
  const startOfYear = moment(`${year}-01-01`).subtract(10, 'year');
  const endOfYear = moment(`${year}-12-31`).add(10, 'year');


  for (let day = startOfYear; day.isBefore(endOfYear); day.add(1, 'day')) {
    const dayOfWeek = day.isoWeekday();
    if (Object.values(daysOfWeek).includes(dayOfWeek)) {
      markedDates[day.format("YYYY-MM-DD")] = { disabled: false };
    } else {
      markedDates[day.format("YYYY-MM-DD")] = { disabled: true };
    }
  }

  return markedDates;
};

export default function DateModal({ isVisible, onBackdropPress, selectedDate, onDayPress, daysOfWeek }) {
  const currentYear = new Date().getFullYear();
  let markedDates = [];
  const daysOfWeekNumbers = daysOfWeek.map(day => {
    switch (day) {
      case 'Seg': return 1; 
      case 'Ter': return 2; 
      case 'Qua': return 3; 
      case 'Qui': return 4;
      case 'Sex': return 5; 
      case 'Sab': return 6;
      case 'Dom': return 7;
      default: return null;
    }
  }).filter(day => day !== null);
  if (daysOfWeek.length > 0) {
    markedDates = useMemo(() => getAvailableDaysInYear(currentYear, daysOfWeekNumbers), [currentYear, daysOfWeek]);
  }

  const handleDayPress = (day) => {
    if (markedDates[day.dateStrnig]?.disabled !== true) {
      onDayPress(day);
      onBackdropPress();
    } else {
      Alert.alert("Data indisponível", "Por favor, selecione um dia disponível.");
    }
  };

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
          onDayPress={handleDayPress} 
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
}
