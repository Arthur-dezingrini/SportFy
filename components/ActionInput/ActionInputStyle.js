import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#FFF',
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 12,
    alignItems: 'center',
  },
  placeholder: {
    color: '#6D758F',
    fontWeight: '500',
    flex: 1, 
    marginRight: 10, 
  },
  button: {
    backgroundColor: '#1c1c1c',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 12,
    paddingTop: 12,
    width: '25%',
    borderRadius: 8,
  },
  buttonText: {
    color: '#46FF6F',
    fontWeight: '600',
  },
});
