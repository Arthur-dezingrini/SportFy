import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    margin: 200,
    backgroundColor: '#111',
    borderRadius: 20,
    maxHeight: 640,
  },
  dayRow: {
    flexDirection: 'row',  // Mantido como estava para o layout original
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#2c2c2c',  // Fundo do dia
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
    marginLeft: 20, // Um pouco de margem à esquerda para alinhar com o texto do dia
    marginBottom: 5,
  },
  timeInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: 60,
    textAlign: 'center',
    marginRight: 5,
    color: '#fff',
  },
  addButton: {
    backgroundColor: 'green',
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'flex-start', // Alinha o botão "+" à esquerda
  },
  addButtonText: {
    color: '#fff',
    fontSize: 20,
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
  addButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Centraliza o botão na linha
    marginVertical: 10, // Adiciona um pouco de margem vertical
  },  
});
