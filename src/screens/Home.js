import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Card from "../components/card";

const Home = ({ navigation }) => {
  const pressHandler = () => {
    navigation.navigate("Login");
  };

  const [test, settest] = useState([
    {
      title: "Test1",
      image: require("../../assets/login.png"),
      location: "Lagos",
      description:
        "texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext",
      price: 10000,
      size: "100m",
      bedroom: 1,
      bathroom: 1,
    },
    {
      title: "Test2",
      image: require("../../assets/login.png"),
      location: "Abuja",
      description:
        "texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext",
      price: 20000,
      size: "200m",
      bedroom: 2,
      bathroom: 2,
    },
    {
      title: "Test3",
      image: require("../../assets/login.png"),
      location: "kaduna",
      description:
        "texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext",
      price: 30000,
      size: "300m",
      bedroom: 3,
      bathroom: 3,
    },
    {
      title: "Test4",
      image: require("../../assets/login.png"),
      location: "Benin",
      description:
        "texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext",
      price: 40000,
      size: "400m",
      bedroom: 4,
      bathroom: 4,
    },
    {
      title: "Test5",
      image: require("../../assets/login.png"),
      location: "Edo",
      description:
        "texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext",
      price: 50000,
      size: "500m",
      bedroom: 5,
      bathroom: 5,
    },
  ]);

  return (
    <View style={styles.Container}>
      <ScrollView>
        <View style={styles.Head}>
          <Text style={styles.Logo}>Elite Home</Text>
          <MaterialCommunityIcons
            name="face-man-profile"
            size={24}
            color="black"
            onPress={pressHandler}
          />
        </View>
        <Image source={require("../../assets/home.png")} style={styles.Image} />
        <View style={styles.PropertyContainer}>
          <Text style={styles.PropertySearch}>Property Search</Text>

          <View style={styles.FilterContainer}>
            <View style={styles.Category}>
              <Text style={styles.CategoryText}>Category</Text>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={24}
                color="black"
              />
            </View>

            <View style={styles.PropertyBedroom}>
              <Text>Bedroom:</Text>
              <Text>Bathroom:</Text>
            </View>

            <TextInput placeholder="Search Location" style={styles.input} />
            <View style={styles.Button}>
              <Button
                title="Search"
                color="#ffffff"
                // onPress={props.handleSubmit}
              />
            </View>
          </View>
        </View>

        <View style={styles.PropertiesContainer}>
          {test.map((item) => {
            return (
              <TouchableOpacity
                style={styles.FlatlistContent}
                onPress={() => navigation.navigate("PropertyDetails", { item })}
              >
                <View>
                <Image source={item.image} style={styles.ProductImage} />
                  <Text>{item.location}</Text>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                  <View style={styles.PriceContainer}>
                    <Text style={styles.price}>{item.price}$</Text>
                    <View style={styles.SizeContainer}>
                      <Text style={styles.size}>{item.size}</Text>
                      <Text style={styles.bedroom}>{item.bedroom}</Text>
                      <Text style={styles.bathroom}>{item.bathroom}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    // fontFamily: "Montesserat"
    backgroundColor: "white"
  },
  Head: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: "5vh",
    paddingBottom: 20,
  },
  Button: {
    backgroundColor: "#2e70cb",
    paddingVertical: 10,
  },
  Image: {
    width: "100%",
  },
  ProductImage: {
    width: "100%",
    backgroundColor: "pink",
    height: 200,
    resizeMode: "contain",
    marginBottom: 10,
    borderRadius: 10
  },
  Logo: {
    fontWeight: 800,
    fontSize: 18,
  },
  PropertyContainer: {
    paddingHorizontal: 16,
  },
  PropertySearch: {
    marginVertical: 16,
    fontSize: 32,
    fontWeight: 600,
  },
  input: {
    paddingVertical: 20,
    paddingRight: "60%",
    paddingLeft: 10,
    marginVertical: 10,
    backgroundColor: "white",
  },
  Category: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 26,
    backgroundColor: "white",
    padding: 16,
  },
  CategoryText: {
    fontSize: 20,
  },
  PropertyBedroom: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  FilterContainer: {
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  FlatlistContent: {
    width: "48%",
    marginBottom: 16
  },
  PropertiesContainer: {
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal:16,
    marginTop: 16,
  },
  description: {
    paddingBottom: 8,
    color: "#d9d9d9",
    fontWeight:600
  },
  PriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    paddingTop: 8,
    borderTopWidth:1,
    borderTopColor: "#d9d9d9"
  },
  SizeContainer: {
    flexDirection: "row",
  },
  bedroom: {
    marginHorizontal: 4,
    fontSize: 16,
  },
  bathroom: {
    fontSize: 16,
  },
  size: {
    marginHorizontal: 4,
    fontSize: 16,
  },
  price: {
    marginHorizontal: 4,
    fontSize: 16,
    fontWeight: 600,
  },
  title:{
    fontSize: 24,
    fontWeight: 600,
    marginVertical: 8,
  }
});

export default Home;
