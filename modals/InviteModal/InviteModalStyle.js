import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignSelf: 'center',
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  modalView: {
    backgroundColor: "#C1C1C1",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    borderTopColor: "#46FF6F",
    borderTopWidth: 1,
    width: "100%",
    height: '40%',
    padding: 10,
    display: "flex",
    flexDirection: "column",
  },
  title: {
    alignSelf: "center",
    marginTop: 5,
    fontWeight: "700",
  },
  scrollView: {
    flex: 1,
  },
});
