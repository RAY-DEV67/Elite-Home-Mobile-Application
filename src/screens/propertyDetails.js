import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Font from "expo-font";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

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
  const { image } = route.params;

  const [loading, setloading] = useState(false);
  const [properties, setproperties] = useState({});
  const [fetched, setfetched] = useState(false);

  useEffect(() => {
    setloading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://54.210.116.44/api/v1/properties/${item}`
        );
        setproperties(response.data.data);
        setloading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(image[0])

  // Check if the properties object is empty or undefined
  if (loading || !properties) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={styles.Container}>
      <ScrollView>
        <View style={styles.priceContainer}>
          {properties.property_name && (
            <Text style={styles.title}>{properties.property_name}</Text>
          )}
          {properties.property_price && (
            <Text style={styles.price}>
              Price: {properties.property_price}$
            </Text>
          )}
        </View>
        <View style={styles.idContainer}>
          <View style={styles.RentOrSale}>
            <Text style={styles.RentOrSaleText}>For Rent</Text>
          </View>
          <Text style={styles.TextFont}>Apartment</Text>
          {properties.id && (
            <Text style={styles.TextFont}>Property ID: {properties?.id}</Text>
          )}
        </View>
        {properties.property_other_image_url && (
          <Image
          source={{uri : properties.property_other_image_url[0]}}
          style={styles.ProductImage}
          onError={(error) => console.error("Image Error:", error)}
        />
        )}
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionHeader}>Description</Text>
          {properties.property_description && (
            <Text style={styles.description}>
              {properties.property_description}
            </Text>
          )}
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
              {properties.property_total_floor_area && (
                <Text style={styles.TextFont}>
                  Size: {properties.property_total_floor_area}
                </Text>
              )}
            </View>
            <View style={styles.bedrooms}>
              <Image
                source={require("../../assets/bedroomIcon.jpg")}
                style={styles.Icon}
              />
              {properties.property_bedroom_number && (
                <Text style={styles.TextFont}>
                  Bedrooms: {properties.property_bedroom_number}
                </Text>
              )}
            </View>
            <View style={styles.bathrooms}>
              <Image
                source={require("../../assets/bathroomIcon.jpg")}
                style={styles.Icon}
              />
              {properties.property_toilet_number && (
                <Text style={styles.TextFont}>
                  Bathrooms: {properties?.property_toilet_number}
                </Text>
              )}
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
            {/* <Image
              source={{ uri: properties?.property_owner.profile_picture }}
              style={styles.ownerImage}
            /> */}
            <View style={styles.ownerDetailsText}>
              <Text style={styles.TextFont}>Elite Homes</Text>
              {properties.property_owner && (
                <Text style={styles.ownerName}>
                  {properties.property_owner.full_name}
                </Text>
              )}
            </View>
          </View>
          <View style={styles.phoneContainer}>
            <Text style={styles.phone}>Mobile Phone</Text>
            {properties.property_owner && (
              <Text style={styles.TextFont}>
                {properties.property_owner.phone_number}
              </Text>
            )}
          </View>
          <View style={styles.idNumberContainer}>
            <Text style={styles.id}>Id Number</Text>
            {properties.id && (
              <Text style={styles.TextFont}>{properties?.id}</Text>
            )}
          </View>
          <View style={styles.emailContainer}>
            <Text style={styles.email}>Email</Text>
            {properties.property_owner && (
              <Text style={styles.TextFont}>
                {properties?.property_owner.email}
              </Text>
            )}
          </View>
          <TouchableOpacity style={styles.Button}>
            <Text style={styles.ButtonText}>View My Properties</Text>
          </TouchableOpacity>
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
          <TouchableOpacity style={styles.Button}>
            <Text style={styles.ButtonText}>Make Enquiry</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: "white",
    paddingTop: "5%",
  },
  Head: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 10,
    marginBottom: 16,
    paddingTop: "10%",
    borderBottomWidth: 1,
    borderColor: "#d9d9d9",
  },
  Logo: {
    fontWeight: 800,
    fontSize: 18,
    fontFamily: "MontserratBold",
  },
  ProductImage: {
    width: screenWidth,
    height: screenHeight/3,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    alignItems: "center",
  },
  price: {
    fontSize: 12,
    fontWeight: 600,
    fontFamily: "MontserratSemiBold",
  },
  title: {
    fontSize: 20,
    fontWeight: 600,
    fontFamily: "MontserratSemiBold",
    width: screenWidth / 1.5,
  },
  idContainer: {
    marginHorizontal: 16,
    width: "80%",
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
    fontFamily: "Montserrat",
    fontSize: 12,
  },
  descriptionContainer: {
    marginVertical: 16,
    marginHorizontal: 16,
  },
  descriptionHeader: {
    fontSize: 20,
    marginBottom: 16,
    fontWeight: 600,
    fontFamily: "MontserratSemiBold",
  },
  description: {
    fontFamily: "Montserrat",
    fontSize: 12,
  },
  propertyDetailsContainer: {
    marginVertical: 16,
    marginHorizontal: 16,
  },
  propertyDetailsHeader: {
    fontSize: 20,
    marginBottom: 16,
    fontWeight: 600,
    fontFamily: "MontserratSemiBold",
  },
  DetailsContainer: {
    marginVertical: 16,
  },
  propertyDetails: {
    fontFamily: "Montserrat",
    fontSize: 12,
  },
  TextFont: {
    fontFamily: "Montserrat",
    fontSize: 12,
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
    fontSize: 12,
  },
  Button: {
    backgroundColor: "#2e70cb",
    paddingVertical: 15,
  },
  ButtonText: {
    fontFamily: "Montserrat",
    textAlign: "center",
    color: "white",
  },
  floorContainer: {
    marginHorizontal: 16,
  },
  floorPlanImage: {
    width: "100%",
    backgroundColor: "#f5f5f5",
  },
  floorHeader: {
    fontSize: 20,
    marginBottom: 16,
    fontWeight: 600,
    fontFamily: "MontserratSemiBold",
  },
  floorDetails: {
    marginBottom: 16,
    fontFamily: "Montserrat",
    fontSize: 12,
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
    fontSize: 20,
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
    marginBottom: 16,
  },
  ownerAddress: {
    color: "#6a6b6c",
    fontFamily: "Montserrat",
    fontSize: 12,
  },
  phone: {
    color: "#6a6b6c",
    fontFamily: "Montserrat",
    fontSize: 12,
  },
  id: {
    color: "#6a6b6c",
    fontFamily: "Montserrat",
    fontSize: 12,
  },
  email: {
    color: "#6a6b6c",
    fontFamily: "Montserrat",
    fontSize: 12,
  },
  scheduleContainer: {
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#d9d9d9",
    marginBottom: 16,
  },
  scheduleHeader: {
    fontSize: 20,
    marginBottom: 16,
    fontWeight: 600,
    fontFamily: "MontserratSemiBold",
  },
  Icon: {
    marginRight: 16,
  },
});
