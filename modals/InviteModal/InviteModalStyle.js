import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modalView: {
    backgroundColor: "#C1C1C1",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    borderTopColor: "#46FF6F",
    borderTopWidth: 1,
    width: "100%",
    minHeight: 200, 
    maxHeight: '40%',
    padding: 10,
    flexDirection: "column",
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
});
