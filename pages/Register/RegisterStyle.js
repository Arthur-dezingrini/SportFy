import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#1c1c1c',
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
      },
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 100 
      },
      footer: {
        alignItems: 'center',
      },
      passwordContainer: {
        flexDirection: 'row',
        marginTop: 20,
      },
      login: {
        color: '#B6B6B6',
        fontWeight: '600',
        fontSize: 15,
      },
      password: {
        color: '#B6B6B6',
        fontWeight: '300',
        fontSize: 15,
      }
});
