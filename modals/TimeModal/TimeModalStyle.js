import { StyleSheet } from "react-native";

export default StyleSheet.create({
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
  },
  modalContent: {
    width: 300,
    minHeight: '40%',
    maxHeight: "70%",
    backgroundColor: "#1c1c1c",
    borderRadius: 10,
    padding: 20,
  },
  scrollContainer: {
    alignItems: "center",     
  },
  title: {
    color: '#46FF6F',
    fontSize: 20,
    marginBottom: 10,
  },
  timeGrid: {
    flexDirection: "row",    
    flexWrap: "wrap",         
    justifyContent: "center", 
    alignItems: "flex-end",
  },
  buttonMargin: {
    marginTop: 15,
    marginLeft: 6, 
  },
});
