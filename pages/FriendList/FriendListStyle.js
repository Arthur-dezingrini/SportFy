import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
    alignItems: "center",
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  iconContainer: {
    backgroundColor: "#333",
    borderRadius: 30,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  separator: {
    height: 20,
    backgroundColor: "transparent",
  },
  listContainer: {
    marginTop: 25,
    justifyContent: "center",
    alignItems: "center",
    width: "85%",
  },
});
