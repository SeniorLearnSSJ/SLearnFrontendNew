import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    color: "purple",
    fontWeight: 800,
    textAlign: "center",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },
  container: {
    flexGrow: 1,
    backgroundColor: "#FFFB84",
    padding: 16,
    justifyContent: "flex-start",
  },
  wrapper: {
    alignItems: "center",
  },
  screenContainer: {
    flexDirection: "column",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
  },
  Button: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    color: "purple",
    backgroundColor: "lightgrey",
    borderRadius: 8,
    alignItems: "center",
    width: 200,
    height: 100,
    justifyContent: "center",
  },
  buttonText: {
    color: "purple",
    fontWeight: "600",
    textAlign: "center",
  },

  skinnyButton: {
    color: "black",
    backgroundColor: "lightgrey",
    margin: 10,
    borderRadius: 25,
    width: 250,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    paddingHorizontal: 10,
    paddingVertical: 5
  },

  logo: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    margin: 10,
  },

  input: {
    color: "black",
    backgroundColor: "lightgrey",
    margin: 10,
    borderRadius: 25,
  },

  backButton: {
    marginTop: 20,
    marginLeft: 10,
    borderRadius: 10,
    color: "black",
    backgroundColor: "lightgrey",
    justifyContent: "center",
    alignSelf: "flex-start",
    //height: 100,
    //width: 200,
    alignItems: "center",
  },
  topHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    gap: 10,
  },
  innerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonWrapper: {
    alignItems: "flex-start",
    width: "100%",
  },
  buttonsContainer: {
    width: 220, // match or slightly bigger than skinnyButton width (200 + margins)
    alignSelf: "center", // center this whole block horizontally
  },
  centeredButtons: {
    alignItems: "center", // center Submit and Register horizontally within buttonsContainer
  },
  list: {
    margin: 10,
    backgroundColor: "lightgrey",
    borderRadius: 10,
    padding: 10,
    color: "black",
  },
  listItem: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    color: "black",
  },
  bulletinText: {
    color: "black",
  },
  addButton: {
    color: "black",
    backgroundColor: "lightgrey",
    alignSelf: "flex-end",
    width: 150,
    height: 50,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonRight: {
    color: "black",
    backgroundColor: "lightgrey",
    alignSelf: "flex-end",
    width: 150,
    height: 50,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10
  },

  buttonLeft: {
    color: "black",
    backgroundColor: "lightgrey",
    alignSelf: "flex-start",
    width: 150,
    height: 50,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10
  },

  event: {
    color: "black",
    backgroundColor: "lightgrey",
    borderRadius: 10,
  },
  selectedCategory: {
    color: "purple",
    backgroundColor: "white",
  },

  bottomButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  centerer: {
    width: "90%",
    maxWidth: 500,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
  },
  headerText: {
    justifyContent: "center",
  },
});
