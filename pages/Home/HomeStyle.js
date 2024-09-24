import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C',
  },
  headerContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    zIndex: 1,
    borderBottomColor: '#46FF6F',
    borderBottomWidth: 2,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 50,
    width: 50,
    borderColor: '#46FF6F',
    borderRadius: 25,
    borderWidth: 2,
  },
  textName: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  boldText: {
    fontWeight: '300',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  title: {
    color: '#A6A6A6',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 25,
  },
  gamesContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    marginTop: 25,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  notifications: {
    marginLeft: 'auto',
    marginRight: 25, 
  },
  notifications: {
    marginLeft: 'auto',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    right: -5,
    top: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  sliderWidth: width * 1.2,
  itemWidth: width,
});
