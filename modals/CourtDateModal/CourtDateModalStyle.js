import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#111',
    borderRadius: 20,
    maxHeight: 580,
    width: '85%',
    margin: 30,
    marginTop: 90
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
    marginTop: 5,
    marginBottom: 5,
  },

  timeInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: 50,
    textAlign: 'center',
    marginRight: 5,
    alignItems: 'center',
  },

  addButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center', 
  },

  closedText: {
    color: '#999',
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 25,
    position: 'absolute', 
    bottom: 0, 
    left: 0,
    right: 0,
    backgroundColor: '#111', 
  },

  button: {
    backgroundColor: 'transparent', 
    paddingVertical: 12, 
    paddingHorizontal: 20, 
    marginHorizontal: 10,
  },

  cancelButton: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },

  applyButton: {
    color: '#46FF6F',
    fontSize: 16,
    textAlign: 'center',
  },

});
