import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    margin: 60,
    backgroundColor: '#111',
    borderRadius: 20,
    maxHeight: 580,
  },
  dayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#2c2c2c',
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
    marginLeft: 20,
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
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'flex-start', // Alinha o botão "+" à esquerda
    marginLeft: 15, 
  },
  addButtonText: {
    color: '#fff',
    fontSize: 15,
  },
  addButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Centraliza o botão na linha
  },
  closedText: {
    color: '#999',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 25,
    position: 'absolute', // Mantém os botões fixos
    bottom: 0, // Coloca os botões na parte inferior da tela
    left: 0,
    right: 0,
    backgroundColor: '#111', // Pode ajustar conforme o estilo do modal
  },
  button: {
    backgroundColor: '#333', // Cor de fundo do botão
    borderRadius: 10, // Bordas arredondadas
    paddingVertical: 12, // Aumenta a área vertical clicável
    paddingHorizontal: 20, // Aumenta a área horizontal clicável
    marginHorizontal: 10, // Espaçamento entre os botões
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
