import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingBottom: 10,
    paddingTop: 10,
    borderBottomColor: '#333',
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 25,
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
    flexDirection: 'row',
    alignItems: 'center'
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black'
  },
  inviteText: {
    fontSize: 14,
    color: '#666',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginLeft: 10
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 4,
  },
  rejectButton: {
    backgroundColor: '#FF5252',
    padding: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
});
