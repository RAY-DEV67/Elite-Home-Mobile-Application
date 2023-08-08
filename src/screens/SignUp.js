import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import * as Font from "expo-font";
import Spinner from "react-native-loading-spinner-overlay";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

// Define a function to load the custom fonts
async function loadFonts() {
  await Font.loadAsync({
    Montserrat: require("../../assets/fonts/Montserrat-Regular.ttf"),
    MontserratSemiBold: require("../../assets/fonts/Montserrat-SemiBold.ttf"),
  });
}

// Call the function to load the fonts
loadFonts();

const BASE_URL = "http://54.210.116.44/api/v1";

const SignUp = ({ navigation }) => {
  const [loading, setloading] = useState(false);

  const initialValues = {
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    phone_number: "",
    is_landlord: true,
  };

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    phone_number: Yup.string().required("Phone Number is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setloading(true);
    try {
      // Make API call to submit form data
      const response = await axios.post(`${BASE_URL}/register`, values);

      // Handle success response
      console.log(response.data);
      Alert.alert("Success", "Äccount Created Succesfully");
      navigation.navigate("Log In");

      // Reset form after successful submission
      resetForm();
    } catch (error) {
      // Handle error response
      console.log(error.response.data);
    }
    setloading(false);
    setSubmitting(false);
  };

  const LoginHandler = () => {
    navigation.navigate("Log In");
  };

  return (
    // <View >
    <ScrollView style={styles.FullContainer}>
      <View style={styles.Container}>
        <Text style={styles.GetStartedText}>
          Lets get you started, input your details below.
        </Text>

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
              <TextInput
                style={styles.input}
                onChangeText={handleChange("first_name")}
                onBlur={handleBlur("first_name")}
                value={values.first_name}
                placeholder="First Name"
              />
              {touched.first_name && errors.first_name && (
                <Text style={styles.error}>{errors.first_name}</Text>
              )}

              <TextInput
                style={styles.input}
                onChangeText={handleChange("last_name")}
                onBlur={handleBlur("last_name")}
                value={values.last_name}
                placeholder="Last Name"
              />
              {touched.last_name && errors.last_name && (
                <Text style={styles.error}>{errors.last_name}</Text>
              )}

              <TextInput
                style={styles.input}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
                placeholder="username"
              />
              {touched.username && errors.username && (
                <Text style={styles.error}>{errors.username}</Text>
              )}

              <TextInput
                style={styles.input}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                placeholder="Password"
                secureTextEntry
              />
              {touched.password && errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}

              <TextInput
                style={styles.input}
                onChangeText={handleChange("confirm_password")}
                onBlur={handleBlur("confirm_password")}
                value={values.confirm_password}
                placeholder="Confirm Password"
                secureTextEntry
              />
              {touched.confirm_password && errors.confirm_password && (
                <Text style={styles.error}>{errors.confirm_password}</Text>
              )}

              <TextInput
                style={styles.input}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                placeholder="Email Address"
              />
              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}

              <TextInput
                style={styles.input}
                onChangeText={handleChange("phone_number")}
                onBlur={handleBlur("phone_number")}
                value={values.phone_number}
                placeholder="Phone Number"
              />
              {touched.phone_number && errors.phone_number && (
                <Text style={styles.error}>{errors.phone_number}</Text>
              )}
              <TouchableOpacity style={styles.Button} onPress={handleSubmit}>
                <Text style={styles.ButtonText}>Submit</Text>
                <Spinner
                  visible={loading}
                  textContent={"Loading..."}
                  textStyle={{ color: "#FFF" }}
                />
              </TouchableOpacity>

              <Text style={styles.AlreadyHaveAnAccount}>
                Already have an account?{" "}
                <Text
                  style={styles.AlreadyHaveAnAccountText}
                  onPress={LoginHandler}
                >
                  Log In
                </Text>
              </Text>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
    // {/* </View> */}
  );
};

const styles = StyleSheet.create({
  Container: {
    paddingHorizontal: 20,
    paddingTop: "5%",
    backgroundColor: "white",
  },
  FullContainer: {
    backgroundColor: "white",
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
  Button: {
    backgroundColor: "#2e70cb",
    borderRadius: 8,
    paddingVertical: 18,
    color: "white",
    marginVertical: 8,
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
});

export default SignUp;
