import Checkbox from "expo-checkbox";
import React, { useState, useEffect } from "react";
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
import * as Font from "expo-font";
import axios from "axios";

// Define a function to load the custom fonts
async function loadFonts() {
  await Font.loadAsync({
    Montserrat: require("../../assets/fonts/Montserrat-Regular.ttf"),
    MontserratSemiBold: require("../../assets/fonts/Montserrat-SemiBold.ttf"),
    MontserratBold: require("../../assets/fonts/Montserrat-Bold.ttf"),
  });
}

// Call the function to load the fonts
loadFonts();

const Offers = ({ navigation }) => {
  const [loading, setloading] = useState(false);
  const [properties, setproperties] = useState([]);

  useEffect(() => {
    setloading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://54.210.116.44/api/v1/properties"
        ); // Replace with your API endpoint
        setproperties(response.data.data);
        setloading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log("Property", properties);

  return (
    <View style={styles.Container}>
      <ScrollView>
        <View style={styles.PropertyContainer}>
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
              <View style={styles.bedroom}>
                <Text>Bedroom: </Text>
                <Checkbox />
              </View>
              <View style={styles.bathroom}>
                <Text>Bathroom: </Text>
                <Checkbox />
              </View>
            </View>

            <TextInput placeholder="Search Location" style={styles.input} />
            <View style={styles.Button}>
              <Text style={styles.ButtonText}>Search</Text>
            </View>
          </View>
        </View>
        {loading ? (
          <Text style={styles.load}>Loading...</Text>
        ) : (
          <View style={styles.PropertiesContainer}>
            {properties?.map((item) => {
              const limitedTitle =
                item.property_description.length > 20
                  ? item.property_description.substring(0, 20) + "..."
                  : item.property_description;

              const limitedText =
                item.property_name.length > 20
                  ? item.property_name.substring(0, 20) + "..."
                  : item.property_name;

              return (
                <TouchableOpacity
                  style={styles.FlatlistContent}
                  key={item.id}
                  onPress={() =>
                    navigation.navigate("PropertyDetails", { item: item.id })
                  }
                >
                  <View>
                    <Image
                      source={{ uri: item.property_other_image_url[0] }}
                      style={styles.ProductImage}
                    />
                    <Text style={styles.location}>{item.property_address}</Text>
                    <Text style={styles.title}>{limitedText}</Text>
                    <Text style={styles.description}>{limitedTitle}</Text>
                    <View style={styles.PriceContainer}>
                      <Text style={styles.price}>{item.property_price}$</Text>
                      <View style={styles.SizeContainer}>
                        <View style={styles.IconContainer}>
                          <Image
                            source={require("../../assets/floorPlanIcon.jpg")}
                            style={styles.sizeImage}
                          />
                          <Text style={styles.size}>
                            {item.property_total_floor_area}m
                          </Text>
                        </View>
                        <View style={styles.IconContainer}>
                          <Image
                            source={require("../../assets/bedroomIcon.jpg")}
                            style={styles.bedroomImage}
                          />
                          <Text style={styles.bedroom}>
                            {item.property_bedroom_number}
                          </Text>
                        </View>
                        <View style={styles.IconContainer}>
                          <Image
                            source={require("../../assets/bathroomIcon.jpg")}
                            style={styles.bathroomImage}
                          />
                          <Text style={styles.bathroom}>
                            {item.property_toilet_number}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    backgroundColor: "white",
  },
  Head: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: "10%",
    paddingBottom: 20,
  },
  Button: {
    backgroundColor: "#2e70cb",
    paddingVertical: 16,
    fontFamily: "Montserrat",
  },
  ButtonText: {
    fontFamily: "Montserrat",
    textAlign: "center",
    color: "white",
  },
  ViewMoreButton: {
    backgroundColor: "#2e70cb",
    padding: 16,
    fontFamily: "Montserrat",
    marginBottom: 16,
  },
  ViewMoreButtonText: {
    fontFamily: "Montserrat",
    textAlign: "center",
    color: "white",
  },
  ViewMoreButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  Image: {
    width: "100%",
  },
  ProductImage: {
    width: "100%",
    height: 115,
    resizeMode: "contain",
    marginBottom: 10,
    borderRadius: 10,
  },
  Logo: {
    fontSize: 18,
    fontWeight: 800,
    fontFamily: "MontserratBold",
  },
  PropertyContainer: {
    paddingHorizontal: 16,
  },
  PropertySearch: {
    marginVertical: 16,
    fontSize: 20,
    fontFamily: "MontserratSemiBold",
  },
  input: {
    paddingVertical: 20,
    paddingRight: "60%",
    paddingLeft: 10,
    marginVertical: 10,
    backgroundColor: "white",
    fontFamily: "Montserrat",
  },
  Category: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 16,
    backgroundColor: "white",
    padding: 16,
    fontFamily: "Montserrat",
  },
  CategoryText: {
    fontFamily: "Montserrat",
  },
  PropertyBedroom: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  FilterContainer: {
    padding: 20,
    backgroundColor: "#f5f5f5",
    marginTop: 20,
  },
  FlatlistContent: {
    width: "48%",
    marginBottom: 16,
  },
  PropertiesContainer: {
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 16,
  },
  description: {
    paddingBottom: 8,
    color: "#a9a9a9",
    fontWeight: 600,
    fontFamily: "Montserrat",
    fontSize: 12,
  },
  PriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#d9d9d9",
  },
  SizeContainer: {
    flexDirection: "row",
  },
  bedroom: {
    marginHorizontal: 4,
    fontSize: 12,
    fontFamily: "Montserrat",
  },
  bathroom: {
    fontSize: 12,
    fontFamily: "Montserrat",
  },
  size: {
    marginHorizontal: 4,
    fontSize: 12,
    fontFamily: "Montserrat",
  },
  price: {
    marginHorizontal: 4,
    fontSize: 12,
    fontWeight: 600,
    fontFamily: "MontserratSemiBold",
  },
  title: {
    fontSize: 16,
    fontWeight: 600,
    marginVertical: 8,
    fontFamily: "MontserratSemiBold",
  },
  location: {
    fontSize: 12,
  },
  IconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sizeImage: {
    width: 10,
    height: 10,
  },
  bedroomImage: {
    width: 10,
    height: 10,
  },
  bathroomImage: {
    width: 10,
    height: 10,
  },
  load: {
    textAlign: "center",
  },
  bedroom: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  bathroom: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Offers;
