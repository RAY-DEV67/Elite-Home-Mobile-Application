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
import * as Font from "expo-font";

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

const Home = ({ navigation }) => {
  const pressHandler = () => {
    navigation.navigate("Login");
  };


//////////////////// DUMMY DATA //////////////////////

  const [test, settest] = useState([
    {
      title: "Soluyi Avenue",
      image: require("../../assets/house1.jpg"),
      location: "Lagos",
      shortDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed faucibus enim. Sed at ullamcorper ligula.",
        longDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed faucibus enim. Sed at ullamcorper ligula. Aliquam erat volutpat. Nunc non suscipit velit, eu sodales magna. Donec eu enim in leo sagittis sagittis. Quisque eu felis euismod, faucibus quam vitae, fermentum dolor. In in ligula mattis, aliquet mauris in, scelerisque tellus. Vivamus auctor justo non ligula aliquam, ac ullamcorper est suscipit. Nulla bibendum eros id lectus finibus, sed rutrum elit lobortis.",
        price: 10000,
      size: "100m",
      bedroom: 1,
      bathroom: 1,
      ownerPicture: require("../../assets/profile.jpg"),
      ownerName: "Steve Parker",
      ownerAddress: "456, Soluyi Estherport Avenue, Gbagada, Lagos, Nigeria.",
      phoneNumber: "+2348114291075",
      idNumber: "78397456273877890",
      email: "henryekene8@gmail.com"
    },
    {
      title: "Soluyi Avenue",
      image: require("../../assets/house2.jpg"),
      location: "Abuja",
      shortDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed faucibus enim. Sed at ullamcorper ligula.",
      longDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed faucibus enim. Sed at ullamcorper ligula. Aliquam erat volutpat. Nunc non suscipit velit, eu sodales magna. Donec eu enim in leo sagittis sagittis. Quisque eu felis euismod, faucibus quam vitae, fermentum dolor. In in ligula mattis, aliquet mauris in, scelerisque tellus. Vivamus auctor justo non ligula aliquam, ac ullamcorper est suscipit. Nulla bibendum eros id lectus finibus, sed rutrum elit lobortis.",
      price: 20000,
      size: "200m",
      bedroom: 2,
      bathroom: 2,
      ownerPicture: require("../../assets/profile.jpg"),
      ownerName: "Steve Parker",
      ownerAddress: "456, Soluyi Estherport Avenue, Gbagada, Lagos, Nigeria.",
      phoneNumber: "+2348114291075",
      idNumber: "78397456879849",
      email: "henryekene8@gmail.com"
    },
    {
      title: "Soluyi Avenue",
      image: require("../../assets/house3.jpg"),
      location: "kaduna",
      shortDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed faucibus enim. Sed at ullamcorper ligula.",
      longDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed faucibus enim. Sed at ullamcorper ligula. Aliquam erat volutpat. Nunc non suscipit velit, eu sodales magna. Donec eu enim in leo sagittis sagittis. Quisque eu felis euismod, faucibus quam vitae, fermentum dolor. In in ligula mattis, aliquet mauris in, scelerisque tellus. Vivamus auctor justo non ligula aliquam, ac ullamcorper est suscipit. Nulla bibendum eros id lectus finibus, sed rutrum elit lobortis.",
      price: 30000,
      size: "300m",
      bedroom: 3,
      bathroom: 3,
      ownerPicture: require("../../assets/profile.jpg"),
      ownerName: "Steve Parker",
      ownerAddress: "456, Soluyi Estherport Avenue, Gbagada, Lagos, Nigeria.",
      phoneNumber: "+2348114291075",
      idNumber: "783097989084849",
      email: "henryekene8@gmail.com"
    },
    {
      title: "Soluyi Avenue",
      image: require("../../assets/house4.jpg"),
      location: "Benin",
      shortDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed faucibus enim. Sed at ullamcorper ligula.",
      longDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed faucibus enim. Sed at ullamcorper ligula. Aliquam erat volutpat. Nunc non suscipit velit, eu sodales magna. Donec eu enim in leo sagittis sagittis. Quisque eu felis euismod, faucibus quam vitae, fermentum dolor. In in ligula mattis, aliquet mauris in, scelerisque tellus. Vivamus auctor justo non ligula aliquam, ac ullamcorper est suscipit. Nulla bibendum eros id lectus finibus, sed rutrum elit lobortis.",
      price: 40000,
      size: "400m",
      bedroom: 4,
      bathroom: 4,
      ownerPicture: require("../../assets/profile.jpg"),
      ownerName: "Steve Parker",
      ownerAddress: "456, Soluyi Estherport Avenue, Gbagada, Lagos, Nigeria.",
      phoneNumber: "+2348114291075",
      idNumber: "78397456223579",
      email: "henryekene8@gmail.com"
    },
    {
      title: "Soluyi Avenue",
      image: require("../../assets/house5.jpg"),
      location: "Edo",
      shortDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed faucibus enim. Sed at ullamcorper ligula.",
      longDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed faucibus enim. Sed at ullamcorper ligula. Aliquam erat volutpat. Nunc non suscipit velit, eu sodales magna. Donec eu enim in leo sagittis sagittis. Quisque eu felis euismod, faucibus quam vitae, fermentum dolor. In in ligula mattis, aliquet mauris in, scelerisque tellus. Vivamus auctor justo non ligula aliquam, ac ullamcorper est suscipit. Nulla bibendum eros id lectus finibus, sed rutrum elit lobortis.",
      price: 50000,
      size: "500m",
      bedroom: 5,
      bathroom: 5,
      ownerPicture: require("../../assets/profile.jpg"),
      ownerName: "Steve Parker",
      ownerAddress: "456, Soluyi Estherport Avenue, Gbagada, Lagos, Nigeria.",
      phoneNumber: "+2348114291075",
      idNumber: "78397459634273849",
      email: "henryekene8@gmail.com"
    },
    {
      title: "Soluyi Avenue",
      image: require("../../assets/house6.jpg"),
      location: "Edo",
      shortDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed faucibus enim. Sed at ullamcorper ligula.",
      longDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed faucibus enim. Sed at ullamcorper ligula. Aliquam erat volutpat. Nunc non suscipit velit, eu sodales magna. Donec eu enim in leo sagittis sagittis. Quisque eu felis euismod, faucibus quam vitae, fermentum dolor. In in ligula mattis, aliquet mauris in, scelerisque tellus. Vivamus auctor justo non ligula aliquam, ac ullamcorper est suscipit. Nulla bibendum eros id lectus finibus, sed rutrum elit lobortis.",
      price: 60000,
      size: "600m",
      bedroom: 6,
      bathroom: 6,
      ownerPicture: require("../../assets/profile.jpg"),
      ownerName: "Steve Parker",
      ownerAddress: "456, Soluyi Estherport Avenue, Gbagada, Lagos, Nigeria.",
      phoneNumber: "+2348114291075",
      idNumber: "78397456273849",
      email: "henryekene8@gmail.com"
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
              <Text style={styles.ButtonText}>Search</Text>
            </View>
          </View>
        </View>

        <View style={styles.PropertiesContainer}>
          {test.map((item) => {
            return (
              <TouchableOpacity
                style={styles.FlatlistContent}
                key={item.idNumber}
                onPress={() => navigation.navigate("PropertyDetails", { item })}
              >
                <View>
                  <Image source={item.image} style={styles.ProductImage} />
                  <Text>{item.location}</Text>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.description}>{item.shortDescription}</Text>
                  <View style={styles.PriceContainer}>
                    <Text style={styles.price}>{item.price}$</Text>
                    <View style={styles.SizeContainer}>
                      <View style={styles.IconContainer}>
                        <Image
                          source={require("../../assets/floorPlanIcon.jpg")}
                          style={styles.sizeImage}
                        />
                        <Text style={styles.size}>{item.size}</Text>
                      </View>
                      <View style={styles.IconContainer}>
                        <Image
                          source={require("../../assets/bedroomIcon.jpg")}
                          style={styles.bedroomImage}
                        />
                        <Text style={styles.bedroom}>{item.bedroom}</Text>
                      </View>
                      <View style={styles.IconContainer}>
                        <Image
                          source={require("../../assets/bathroomIcon.jpg")}
                          style={styles.bathroomImage}
                        />
                        <Text style={styles.bathroom}>{item.bathroom}</Text>
                      </View>
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
    backgroundColor: "white",
  },
  Head: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: "13%",
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
    color: "white"
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
    fontSize: 32,
    // fontWeight: 600,
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
    color: "#d9d9d9",
    fontWeight: 600,
    fontFamily: "Montserrat",
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
    fontSize: 16,
    fontFamily: "Montserrat",
  },
  bathroom: {
    fontSize: 16,
    fontFamily: "Montserrat",
  },
  size: {
    marginHorizontal: 4,
    fontSize: 16,
    fontFamily: "Montserrat",
  },
  price: {
    marginHorizontal: 4,
    fontSize: 16,
    fontWeight: 600,
    fontFamily: "MontserratSemiBold",
  },
  title: {
    fontSize: 24,
    fontWeight: 600,
    marginVertical: 8,
    fontFamily: "MontserratSemiBold",
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
});

export default Home;
