import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ScrollView,
  TextInput,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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


export default function PropertyDetails({ route, navigation }) {
  const { item } = route.params;

  const pressHandler = () => {
    navigation.navigate("Login");
  };

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
        <View style={styles.priceContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>Price: {item.price}$</Text>
        </View>
        <View style={styles.idContainer}>
          <View style={styles.RentOrSale}>
            <Text style={styles.RentOrSaleText}>For Rent</Text>
          </View>
          <Text>Apartment</Text>
          <Text>Property ID: 123456789</Text>
        </View>
        <Image source={item.image} style={styles.ProductImage} />
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionHeader}>Description</Text>
          <Text style={styles.description}>{item.longDescription}</Text>
        </View>

        <View style={styles.propertyDetailsContainer}>
          <Text style={styles.propertyDetailsHeader}>Property Details</Text>
          <Text style={styles.propertyDetails}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed
            faucibus enim. Sed at ullamcorper ligula.
          </Text>
          <View style={styles.DetailsContainer}>
            <View style={styles.size}>
              <Image
                source={require("../../assets/floorPlanIcon.jpg")}
                style={styles.Icon}
              />
              <Text style={styles.TextFont}>Size: {item.size}</Text>
            </View>
            <View style={styles.bedrooms}>
              <Image
                source={require("../../assets/bedroomIcon.jpg")}
                style={styles.Icon}
              />
              <Text style={styles.TextFont}>Bedrooms: {item.bedroom}</Text>
            </View>
            <View style={styles.bathrooms}>
              <Image
                source={require("../../assets/bathroomIcon.jpg")}
                style={styles.Icon}
              />
              <Text style={styles.TextFont}>Bathrooms: {item.bathroom}</Text>
            </View>
          </View>
        </View>

        <View style={styles.floorContainer}>
          <Text style={styles.floorHeader}>Floor Plan</Text>
          <Text style={styles.floorDetails}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed
            faucibus enim. Sed at ullamcorper ligula.
          </Text>
          <Image
            source={require("../../assets/floorPlan.jpg")}
            style={styles.floorPlanImage}
          />
        </View>

        <View style={styles.profileContainer}>
          <View style={styles.ownerDetailsContainer}>
            <Image source={item.ownerPicture} style={styles.ownerImage} />
            <View style={styles.ownerDetailsText}>
              <Text style={styles.TextFont}>Elite Homes</Text>
              <Text style={styles.ownerName}>{item.ownerName}</Text>
              <Text style={styles.ownerAddress}>{item.ownerAddress}</Text>
            </View>
          </View>
          <View style={styles.phoneContainer}>
            <Text style={styles.phone}>Mobile Phone</Text>
            <Text style={styles.TextFont}>{item.phoneNumber}</Text>
          </View>
          <View style={styles.idNumberContainer}>
            <Text style={styles.id}>Id Number</Text>
            <Text style={styles.TextFont}>{item.idNumber}</Text>
          </View>
          <View style={styles.emailContainer}>
            <Text style={styles.email}>Email</Text>
            <Text style={styles.TextFont}>{item.email}</Text>
          </View>
          <View style={styles.Button}>
            <Button title="View my properties" color="#ffffff" />
          </View>
        </View>

        <View style={styles.scheduleContainer}>
          <Text style={styles.scheduleHeader}>Schedule Tour</Text>
          <Text style={styles.TextFont}>
            Please fill in the detail in other to book the meeting for the
            apartment
          </Text>
          <TextInput style={styles.input} placeholder="Your Name*" />
          <TextInput style={styles.input} placeholder="Your Email*" />
          <TextInput style={styles.input} placeholder="Your Phone*" />
          <TextInput style={styles.input} placeholder="Message" />
          <View style={styles.Button}>
            <Button title="Make Enquiry" color="#ffffff" />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: "white",
  },
  Head: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: "3%",
    paddingBottom: 20,
  },
  Logo: {
    fontWeight: 800,
    fontSize: 18,
    fontFamily: "MontserratBold",
  },
  ProductImage: {
    width: "100%",
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    alignItems: "center",
  },
  price: {
    fontSize: 16,
    fontWeight: 600,
    fontFamily: "MontserratSemiBold",
  },
  title: {
    fontSize: 24,
    fontWeight: 600,
    fontFamily: "MontserratSemiBold",
  },
  idContainer: {
    marginHorizontal: 16,
    width: "70%",
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: 16,
    alignItems: "center",
  },
  RentOrSale: {
    backgroundColor: "#2e70cb",
    borderRadius: 10,
    padding: 8,
    borderRadius: 10,
  },
  RentOrSaleText: {
    color: "white",
  },
  descriptionContainer: {
    marginVertical: 16,
    marginHorizontal: 16,
  },
  descriptionHeader: {
    fontSize: 32,
    marginBottom: 16,
    fontWeight: 600,
    fontFamily: "MontserratSemiBold",
  },
  description: {
    fontFamily: "Montserrat",
  },
  propertyDetailsContainer: {
    marginVertical: 16,
    marginHorizontal: 16,
  },
  propertyDetailsHeader: {
    fontSize: 32,
    marginBottom: 16,
    fontWeight: 600,
    fontFamily: "MontserratSemiBold",
  },
  DetailsContainer: {
    marginVertical: 16,
  },
  propertyDetails: {
    fontFamily: "Montserrat",
  },
  TextFont: {
    fontFamily: "Montserrat",
  },
  bedrooms: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    marginVertical: 16,
    borderColor: "#d9d9d9",
    flexDirection: "row",
    alignItems: "center",
  },
  size: {
    flexDirection: "row",
    alignItems: "center",
  },
  bathrooms: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    borderColor: "#d9d9d9",
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 20,
    backgroundColor: "white",
    paddingLeft: 10,
    marginVertical: 10,
    fontFamily: "Montserrat",
  },
  Button: {
    backgroundColor: "#2e70cb",
    paddingVertical: 15,
  },
  floorContainer: {
    marginHorizontal: 16,
  },
  floorPlanImage: {
    width: "100%",
    backgroundColor: "#f5f5f5",
  },
  floorHeader: {
    fontSize: 32,
    marginBottom: 16,
    fontWeight: 600,
    fontFamily: "MontserratSemiBold",
  },
  floorDetails: {
    marginBottom: 16,
    fontFamily: "Montserrat",
  },
  profileContainer: {
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#d9d9d9",
    marginVertical: 16,
  },
  ownerDetailsContainer: {
    flexDirection: "row",
  },
  ownerDetailsText: {
    width: "50%",
    marginLeft: 16,
  },
  ownerName: {
    fontSize: 28,
    marginVertical: 4,
    fontFamily: "MontserratSemiBold",
  },
  phoneContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#d9d9d9",
  },
  idNumberContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#d9d9d9",
  },
  emailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    marginBottom: 16
  },
  ownerAddress: {
    color: "#6a6b6c",
    fontFamily: "Montserrat",
  },
  phone:{
    color: "#6a6b6c",
    fontFamily: "Montserrat",
  },
  id:{
    color: "#6a6b6c",
    fontFamily: "Montserrat",
  },
  email:{
    color: "#6a6b6c",
    fontFamily: "Montserrat",
  },
  scheduleContainer: {
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#d9d9d9",
    marginBottom: 16
  },
  scheduleHeader: {
    fontSize: 32,
    marginBottom: 16,
    fontWeight: 600,
    fontFamily: "MontserratSemiBold",
  },
  Icon: {
    marginRight: 16,
  },
});
