import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffe8f8"
  },

  search: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#ffe8f8"
  },

  logo: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20
  },

  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "center",
    color: "#390c2f"
      
  },

  category: {
    backgroundColor: "#f2f2f2",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10
  },

  product: {
    borderWidth: 3,
    borderRadius: 15,
    padding: 50,
    marginHorizontal: 8,
    marginBottom: 20,
    backgroundColor: "#fff8ff",
    shadowColor: "#44004a",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    borderColor: "#fdfbfd"
  },

  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#70155d"
  },

  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ae099e"
  },
  
  promoBanner: {
    backgroundColor: "#F8D7E5",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
});