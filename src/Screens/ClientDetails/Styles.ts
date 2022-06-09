import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  scrollView: {
    width: "100%",
  },
  scrollViewContentContainer: {
    paddingBottom: 35,
  },
  touchableSaleItem: {},
  saleName: {
    paddingHorizontal: 2,
  },
  touchableContainerSaleItem: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  containerShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
});
