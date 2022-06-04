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
    elevation: 2,
  },
  headerGradient: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  headerStickyGradient: {
    height: 60,
    borderRadius: 15,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  headerContainerSticky: {
    top: 40,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  headerContainerNotSticky: {
    top: 20,
    paddingHorizontal: 15,
    borderRadius: 0,
  },
  headerContainer: {
    width: "100%",
    position: "absolute",
  },
});
