import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
  },
  form: {
    flex: 1,
    alignSelf: 'center',
    width: '85%',
    justifyContent: 'flex-start',
    gap: 25,
    marginTop: 25
  }, 
  mapContainer: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "100%",
    maxHeight: "80%",
    gap: 25
  },
  modalCloseButton: {
    backgroundColor: "#00FF00",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  modalCloseButtonText: {
    color: "#fff",
    textAlign: "center",
  },
});
