import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    borderRadius: 15,
    // overflow: "visible",
    elevation: 2,
  },
  modalStyle: {
    width: "95%",
    height: "75%",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: 20,
  },
});
