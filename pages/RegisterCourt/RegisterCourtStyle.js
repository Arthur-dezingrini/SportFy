import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
    paddingTop: Platform.OS === 'Android' ? 15 : 0 
  },

  form: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
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

  register: {
    position: "absolute",
    borderRadius: 25,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#46FF6F",
    bottom: 50,
    right: 0
  }
});
