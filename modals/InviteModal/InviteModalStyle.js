import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  modalView: {
    backgroundColor: "#fff",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    borderTopColor: "#46FF6F",
    borderTopWidth: 1,
    width: "100%",
    padding: 10,
  },
  modalContent: {
    flex: 1,
  },
  title: {
    alignSelf: "center",
    marginTop: 5,
    fontWeight: "700",
  },
  separator: {
    height: 15,  
    backgroundColor: "transparent", 
  },
  listContainer: {
    maxHeight: height * 0.35,
  },
});
