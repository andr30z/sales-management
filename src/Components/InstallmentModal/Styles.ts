import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  installmentList: {
    paddingBottom: 35,
    width: "100%",
    flex: 1,
  },
  buttonGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  deleteButton: {
    padding: 4,
  },
  datePicker: {
    marginTop: 5,
    width: "100%",
  },
  inputValueText: { textAlign: "left" },
  toggleInputs: {
    width: "100%",
    flexDirection: "column",
    overflow: "hidden",
    marginVertical: 30,
  },
});
