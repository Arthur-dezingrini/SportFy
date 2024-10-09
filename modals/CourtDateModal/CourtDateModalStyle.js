import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    margin:200,
    backgroundColor: '#111',
    borderRadius: 20,
    maxHeight: 640,
  },
  dayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  dayInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dayText: {
    fontSize: 16,
    marginRight: 10,
    color: '#fff',
    width: 40,
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
    color: '#fff',  
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
    color: 'lightgreen',
  },
});
