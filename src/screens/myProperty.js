import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useContext } from "react";
import * as ImagePicker from "expo-image-picker";
import Checkbox from "expo-checkbox";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import * as Font from "expo-font";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import Spinner from "react-native-loading-spinner-overlay";
import firebase from "firebase/compat";


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

const MyProperty = ({ navigation }) => {

  
  const [userId, setuserId] = useState();
  const [accessToken, setaccessToken] = useState();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        const accessToken = await AsyncStorage.getItem("accessToken");
        if (userData) {
          const parsedUserData = JSON.parse(userData);
          const parsedAccessToken = JSON.parse(accessToken);
          setaccessToken(parsedAccessToken);
          setuserId(parsedUserData);
          console.log(userData);
        }
      } catch (error) {
        console.error("Error retrieving user data:", error);
      }
    };

    getUserData();
  }, []);

  const [loading, setloading] = useState(false);
  const [properties, setproperties] = useState("Property Listings");
  const [favourite, setfavourite] = useState([]);
  const [userProperties, setuserProperties] = useState();
  const [image1, setimage1] = useState();
  const [loadingImage, setloadingImage] = useState(false);
  // const [category, setcategory] = useState();

  const generateRandomString = (length) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomString = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
    return randomString;
  };

  const uploadImage1 = async (uri, values) => {
    setloadingImage(true);
    const response = await fetch(uri);
    const blob = await response.blob();

    const filename = generateRandomString(20);

    const ref = firebase.storage().ref().child(`images/${filename}`);
    console.log(filename);
    const snapshot = await ref.put(blob);

    // Get the download URL for the uploaded image
    const downloadURL = await snapshot.ref.getDownloadURL();

    // Do something with the downloadURL, like saving it to the database
    console.log("Image download URL:", downloadURL);
    values.property_other_image_url.push(downloadURL);
    setimage1(downloadURL);
    setloadingImage(false);
  };

  const selectImage1 = async (values) => {
    // Launch the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      maxFileSize: 1 * 1024 * 1024, // Maximum file size in bytes (2MB)
    });
    if (!result.canceled) {
      uploadImage1(result.assets[0].uri, values);
    }
  };

  const initialValues = {
    property_address: "",
    property_bedroom_number: "",
    property_description: "",
    property_name: "",
    property_other_image_url: [],
    category_id: 1,
    property_plan_image_url: "",
    property_price: "",
    property_stock: 1,
    property_toilet_number: "",
    property_total_floor_area: "",
    isRent: "",
  };

  const validationSchema = Yup.object().shape({
    property_address: Yup.string().required("Property Address is required"),
    property_bedroom_number: Yup.string().required(
      "Property Bedroom Number is required"
    ),
    property_description: Yup.string().required(
      "Property Description is required"
    ),
    property_name: Yup.string().required("Property Name is required"),

    property_price: Yup.string().required("Property Price is required"),
    property_stock: "",
    property_toilet_number: Yup.string().required(
      "Property Bathroom Number is required"
    ),
    property_total_floor_area: Yup.string().required(
      "Property Size is required"
    ),
  });

  console.log(accessToken);
  console.log(userId);

  const handleSubmit = async (values, { resetForm }) => {
    console.log("Final Values", values);
    setloading(true);
    try {
      // Make API call to submit form data
      const headers = { Authorization: `Bearer ${accessToken}` };

      const response = await axios.post(
        `http://54.210.116.44/api/v1/properties`,
        values,
        { headers }
      );

      // Handle success response
      console.log(response.data);
      Alert.alert("Success", "Property Created Succesfully");
      // Reset form after successful submission
      // resetForm();
    } catch (error) {
      // Handle error response
      console.log(error.response.data);
      Alert.alert("Error", error.response.data.message);
    }
    setloading(false);
  };

  const handleRemove = async (id) => {
    try {
      // Make API call to submit form data
      const headers = { Authorization: `Bearer ${accessToken}` };

      const response = await axios.delete(
        `http://54.210.116.44/api/v1/properties/${id}`,
        { headers }
      );

      // Handle success response
      console.log(response.data);
      Alert.alert("Success", response.data.Message);
    } catch (error) {
      // Handle error response
      console.log(error.response.data);
      Alert.alert("Error", error.response.data.message);
    }
    setloading(false);
  };

  useEffect(() => {
    setloading(true);
    if (accessToken) {
      const fetchData = async () => {
        try {
          // Set the access token in the request headers
          const headers = { Authorization: `Bearer ${accessToken}` };

          const response = await axios.get(
            `http://54.210.116.44/api/v1/users/${userId}/properties`,
            { headers } // Include the headers in the request
          );
          setuserProperties(response.data.data);
          setloading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [userId]);

  useEffect(() => {
    setloading(true);
    if (accessToken) {
      const fetchData = async () => {
        try {
          // Set the access token in the request headers
          const headers = { Authorization: `Bearer ${accessToken}` };

          const response = await axios.get(
            `http://54.210.116.44/api/v1/users/${userId}/bookings`,
            { headers } // Include the headers in the request
          );
          setfavourite(response.data.data);
          setloading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [userId]);

  console.log(userId);

  return (
    <View style={styles.Container}>
      <ScrollView>
        <View style={styles.PropertyContainer}>
          <Text style={styles.PropertySearch}>My Property</Text>
        </View>

        <View style={styles.Properties}>
          <TouchableOpacity
            onPress={() => {
              setproperties("Property Listings");
            }}
          >
            <Text
              style={
                properties === "Property Listings"
                  ? styles.PropertyBackground
                  : null
              }
            >
              Property Listings
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setproperties("Your Properties");
            }}
          >
            <Text
              style={
                properties === "Your Properties"
                  ? styles.PropertyBackground
                  : null
              }
            >
              Your Properties
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setproperties("Add Properties");
            }}
          >
            <Text
              style={
                properties === "Add Properties"
                  ? styles.PropertyBackground
                  : null
              }
            >
              Add Properties
            </Text>
          </TouchableOpacity>
        </View>
        {properties === "Add Properties" && (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View style={styles.formContainer}>
                <Text style={styles.heading}>
                  Property Name<Text style={styles.star}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("property_name")}
                  onBlur={handleBlur("property_name")}
                  value={values.property_name}
                  placeholder="Your Property Name"
                />
                {touched.property_name && errors.property_name && (
                  <Text style={styles.error}>{errors.property_name}</Text>
                )}
                <Text style={styles.heading}>
                  Address<Text style={styles.star}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("property_address")}
                  onBlur={handleBlur("property_address")}
                  value={values.property_address}
                  placeholder="Your Property Address"
                />
                {touched.property_address && errors.property_address && (
                  <Text style={styles.error}>{errors.property_address}</Text>
                )}

                {/* <TextInput
                  style={styles.input}
                  onChangeText={handleChange("property_stock")}
                  onBlur={handleBlur("property_stock")}
                  value={values.property_stock}
                  placeholder="Your Property stock"
                />

                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("category_id")}
                  onBlur={handleBlur("category_id")}
                  value={values.category_id}
                  placeholder="Your Category"
                /> */}

                <Text style={styles.heading}>
                  Amount<Text style={styles.star}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("property_price")}
                  onBlur={handleBlur("property_price")}
                  value={values.property_price}
                  placeholder="$0.00"
                />
                {touched.property_price && errors.property_price && (
                  <Text style={styles.error}>{errors.property_price}</Text>
                )}
                <Text style={styles.heading}>
                  Zip Code<Text style={styles.star}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={image1}
                  placeholder="Zip Code"
                />
                {touched.email && errors.email && (
                  <Text style={styles.error}>{errors.email}</Text>
                )}
                <Text style={styles.heading}>
                  Short Details<Text style={styles.star}>*</Text>
                </Text>
                <TextInput
                  style={styles.longInput}
                  placeholder="Short Details Of Your Property"
                  multiline={true}
                  numberOfLines={4}
                />

                <Text style={styles.heading}>
                  Full Details <Text style={styles.star}>*</Text>
                </Text>
                <TextInput
                  style={styles.longInput}
                  onChangeText={handleChange("property_description")}
                  onBlur={handleBlur("property_description")}
                  value={values.property_description}
                  placeholder="Full Details Of Your Property"
                  multiline={true}
                  numberOfLines={4}
                />
                {touched.property_description &&
                  errors.property_description && (
                    <Text style={styles.error}>
                      {errors.property_description}
                    </Text>
                  )}

                <View>
                  <Text style={styles.Additional}>Additional Info</Text>
                  <View style={styles.AdditionalInfoContainer}>
                    <View style={styles.AdditionalInfo}>
                      <Text>Bedroom: </Text>
                      <TextInput
                        style={styles.additionalInfo}
                        onChangeText={handleChange("property_bedroom_number")}
                        onBlur={handleBlur("property_bedroom_number")}
                        value={values.property_bedroom_number}
                      />
                    </View>

                    <View style={styles.AdditionalInfo}>
                      <Text>Bathroom: </Text>
                      <TextInput
                        style={styles.additionalInfo}
                        onChangeText={handleChange("property_toilet_number")}
                        onBlur={handleBlur("property_toilet_number")}
                        value={values.property_toilet_number}
                      />
                    </View>

                    <View style={styles.AdditionalInfo}>
                      <Text>Property Size </Text>
                      <TextInput
                        style={styles.additionalInfo}
                        onChangeText={handleChange("property_total_floor_area")}
                        onBlur={handleBlur("property_total_floor_area")}
                        value={values.property_total_floor_area}
                      />
                    </View>
                  </View>
                  {touched.property_bedroom_number &&
                    errors.property_bedroom_number && (
                      <Text style={styles.error}>
                        {errors.property_bedroom_number}
                      </Text>
                    )}
                  {touched.property_toilet_number &&
                    errors.property_toilet_number && (
                      <Text style={styles.error}>
                        {errors.property_toilet_number}
                      </Text>
                    )}
                  {touched.property_total_floor_area &&
                    errors.property_total_floor_area && (
                      <Text style={styles.error}>
                        {errors.property_total_floor_area}
                      </Text>
                    )}
                </View>

                <View>
                  <Text style={styles.Additional}>
                    Image<Text style={styles.star}>*</Text>
                  </Text>
                  <Text>
                    Upload images of your property to help users understand what
                    you are offering and build truth.
                  </Text>

                  <View>
                    <TouchableOpacity
                      style={styles.addImage}
                      onPress={() => {
                        selectImage1(values);
                      }}
                      className="mt-[16px] rounded-[15px] border py-[8px] px-[16px]  border-[#00cc00] w-[25vw] flex-col items-center justify-center"
                    >
                      <Text className=" text-center  font-semibold">
                        {loadingImage ? "Loading..." : "Add Image +"}
                      </Text>
                    </TouchableOpacity>
                    {image1 && (
                      <Image
                        source={{ uri: image1 }}
                        style={{ width: 50, height: 50 }}
                        className="mt-[8px]"
                      />
                    )}
                  </View>
                </View>

                {/* <View style={styles.propertiesContainer}>
                  <View>
                    <Text style={styles.propertiesHeading}>
                      Property Category<Text style={styles.star}>*</Text>
                    </Text>
                    <View style={styles.propertiesType}>
                      <Text>For Rent </Text>
                      <Checkbox />
                    </View>
                    <View style={styles.propertiesType}>
                      <Text>For Sale </Text>
                      <Checkbox />
                    </View>
                    <View style={styles.propertiesType}>
                      <Text>For Lease </Text>
                      <Checkbox />
                    </View>
                  </View>

                  <View style={styles.propertiestypes}>
                    <Text style={styles.propertiesHeading}>
                      Property Types<Text style={styles.star}>*</Text>
                    </Text>
                    <View style={styles.propertiesType}>
                      <Text>For Apartment </Text>
                      <Checkbox />
                    </View>
                    <View style={styles.propertiesType}>
                      <Text>Bungalow </Text>
                      <Checkbox />
                    </View>
                    <View style={styles.propertiesType}>
                      <Text>Residential Area </Text>
                      <Checkbox />
                    </View>
                    <View style={styles.propertiesType}>
                      <Text>Mansion </Text>
                      <Checkbox value={values.isRent} />
                    </View>
                    <View
                      style={styles.propertiesType}
                      onValueChange={setimage1}
                    >
                      <Text>Island </Text>
                      <Checkbox
                        value={category}
                        onValueChange={setcategory("island")}
                      />
                    </View>
                  </View>
                </View> */}

                <View style={styles.ButtonContainer}>
                  <TouchableOpacity
                    style={styles.Button}
                    onPress={() => {
                      handleSubmit(values);
                      // console.log(values)
                    }}
                  >
                    <Text style={styles.ButtonText}>Add Property</Text>
                    <Spinner
                      visible={loading}
                      textContent={"Loading..."}
                      textStyle={{ color: "#FFF" }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        )}
        {properties === "Property Listings" && favourite.length === 0 ? (
          <Text style={styles.empty}>You have not booked any property yet</Text>
        ) : null}

        {properties === "Property Listings" && favourite.length !== 0 && (
          <View>
            {loading ? (
              <Text style={styles.load}>Loading...</Text>
            ) : (
              <View style={styles.PropertiesContainer}>
                {favourite.map((item) => {
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
                      // onPress={() =>
                      //   navigation.navigate("PropertyDetails", {
                      //     item: item.id,
                      //   })
                      // }
                    >
                      <View>
                        <Image
                          source={{ uri: item.property_other_image_url[0] }}
                          style={styles.ProductImage}
                        />
                        <View>
                          <Text style={styles.location}>
                            {item.property_address}
                          </Text>
                          <Text style={styles.title}>{limitedText}</Text>
                          <Text style={styles.description}>{limitedTitle}</Text>
                        </View>
                        <View>
                          <TouchableOpacity style={styles.RemoveFav}>
                            <Text style={styles.RemoveText}>
                              Remove Propety
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>
        )}

        {properties === "Your Properties" && userProperties.length === 0 ? (
          <Text style={styles.empty}>
            You have not uploaded any property yet
          </Text>
        ) : null}

        {properties === "Your Properties" && userProperties.length !== 0 && (
          <View>
            {loading ? (
              <Text style={styles.load}>Loading...</Text>
            ) : (
              <View style={styles.PropertiesContainer}>
                {userProperties.map((item) => {
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
                      // onPress={() =>
                      //   navigation.navigate("PropertyDetails", {
                      //     item: item.id,
                      //   })
                      // }
                    >
                      <View>
                        <Image
                          source={{ uri: item.property_other_image_url[0] }}
                          style={styles.ProductImage}
                        />
                        <View>
                          <Text style={styles.location}>
                            {item.property_address}
                          </Text>
                          <Text style={styles.title}>{limitedText}</Text>
                          <Text style={styles.description}>{limitedTitle}</Text>
                          <View>
                            <TouchableOpacity
                              onPress={() => {
                                handleRemove(item.id);
                              }}
                              style={styles.Remove}
                            >
                              <Text style={styles.RemoveText}>
                                Remove Propety
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    margin: 16,
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
    fontSize: screenWidth / 16,
    fontFamily: "MontserratSemiBold",
    paddingTop: screenHeight / 15,
    width: screenWidth / 1.5,
  },
  realEstate: {
    color: "#2e70cb",
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
  Search: {
    display: "flex",
    flexDirection: "row",
  },
  SearchContainer: {
    backgroundColor: "white",
    width: screenWidth / 1.1,
    borderRadius: 50,
    padding: 8,
  },
  icon: {
    marginRight: 12,
  },
  Properties: {
    marginHorizontal: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  PropertyBackground: {
    backgroundColor: "#2e70cb",
    color: "white",
    padding: 10,
  },
  input: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    paddingVertical: 20,
    paddingLeft: 10,
    marginVertical: 10,
    width: "100%",
    fontFamily: "Montserrat",
    borderWidth: 0.5,
    borderColor: "#d9d9d9",
  },
  longInput: {
    height: 120, // Adjust the height as needed to make the TextInput bigger
    borderColor: "#d9d9d9",
    backgroundColor: "white",
    borderWidth: 0.5,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginVertical: 10,
  },
  ButtonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  Button: {
    backgroundColor: "#2e70cb",
    borderRadius: 2,
    paddingVertical: 18,
    color: "white",
    marginVertical: 8,
    width: screenWidth / 2,
  },
  ButtonText: {
    fontFamily: "Montserrat",
    textAlign: "center",
    color: "white",
  },
  GetStartedText: {
    fontSize: 20,
    textAlign: "left",
    fontFamily: "Montserrat",
    fontWeight: 800,
    width: screenWidth / 2,
    marginBottom: 16,
  },
  AlreadyHaveAnAccount: {
    marginTop: 16,
    textAlign: "center",
    fontFamily: "Montserrat",
    marginVertical: 16,
  },
  AlreadyHaveAnAccountText: {
    color: "#2e70cb",
    fontWeight: 700,
    fontFamily: "MontserratSemiBold",
  },
  error: {
    color: "red",
  },
  star: {
    color: "red",
  },
  Additional: {
    fontSize: screenWidth / 15,
    fontWeight: 500,
    marginTop: 16,
    marginBottom: 8,
  },
  AdditionalInfoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  AdditionalInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  additionalInfo: {
    borderWidth: 1,
    width: screenWidth / 10,
    height: screenHeight / 25,
    borderColor: "#d9d9d9",
  },
  propertiesContainer: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 20,
  },
  propertiesHeading: {
    fontSize: screenWidth / 20,
  },
  propertiesType: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  propertiestypes: {
    marginLeft: 20,
  },
  empty: {
    textAlign: "center",
    marginTop: 16,
  },
  favouritesContainer: {
    display: "flex",
    flexDirection: "row",
  },
  Remove: {
    backgroundColor: "red",
    width: "70%",
    paddingVertical: 8,
  },
  RemoveFav: {
    backgroundColor: "#2e70cb",
    width: "70%",
    paddingVertical: 8,
  },
  RemoveText: {
    textAlign: "center",
    color: "white",
  },
  addImage: {
    borderWidth: 0.5,
    padding: 24,
    width: screenWidth / 3,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 16,
    borderColor: "#d9d9d9",
  },
});

export default MyProperty;
