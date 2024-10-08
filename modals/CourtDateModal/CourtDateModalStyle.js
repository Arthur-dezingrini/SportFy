import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 50, // Define uma margem para não cobrir o header
    marginBottom: 50, // Define uma margem para não cobrir o footer
    borderRadius: 10, // Opcional: arredondamento para as bordas do modal
  },
  dayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  dayInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dayText: {
    fontSize: 16,
    marginRight: 10,
  },
  timeInputs: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: 60,
    textAlign: 'center',
    marginRight: 5,
  },
  closedText: {
    color: '#999',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    color: 'red',
  },
  applyButton: {
    color: 'green',
  },
});
