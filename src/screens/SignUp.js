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
  Alert
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import * as Font from "expo-font";
import Spinner from 'react-native-loading-spinner-overlay';

// Define a function to load the custom fonts
async function loadFonts() {
  await Font.loadAsync({
    Montserrat: require("../../assets/fonts/Montserrat-Regular.ttf"),
    MontserratSemiBold: require("../../assets/fonts/Montserrat-SemiBold.ttf"),
  });
}

// Call the function to load the fonts
loadFonts();

const BASE_URL = "https://elitehomestest.onrender.com/api/v1";

const SignUp = ({ navigation }) => {
  const [loading, setloading] = useState(false);

  const initialValues = {
    username: "",
    first_name: "Henry",
    last_name: "Jhon",
    email: "",
    password: "",
    confirm_password: "",
    phone_number: "",
    is_landlord: 0,
  };

  const validationSchema = Yup.object().shape({
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
      navigation.navigate("Login");

      // Reset form after successful submission
      resetForm();
    } catch (error) {
      // Handle error response
      console.log(error.response.data);
      Alert.alert('Error', error.response.data.message);
    }
    setloading(false);
    setSubmitting(false);
  };

  const LoginHandler = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.ImageContainer}>
          <Image
            source={require("../../assets/login.png")}
            style={styles.Image}
          />
        </View>
        <Text style={styles.WelcomeText}>Welcome to</Text>
        <Text style={styles.EliteHomes}>Elite Homes</Text>
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
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
                placeholder="Username"
              />
              {touched.username && errors.username && (
                <Text style={styles.error}>{errors.username}</Text>
              )}

              <TextInput
                style={styles.input}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                placeholder="Email"
              />
              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
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
                onChangeText={handleChange("phone_number")}
                onBlur={handleBlur("phone_number")}
                value={values.phone_number}
                placeholder="Phone Number"
              />
              {touched.phone_number && errors.phone_number && (
                <Text style={styles.error}>{errors.phone_number}</Text>
              )}
              <TouchableOpacity style={styles.Button} onPress={handleSubmit}>
                <Text style={styles.ButtonText}>
                  Submit
                </Text>
                <Spinner visible={loading} textContent={'Loading...'} textStyle={{ color: '#FFF' }} />
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 80,
    backgroundColor: "white",
  },
  ImageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  Image: {
    width: 350,
    height: 170,
    marginBottom: 32,
  },
  input: {
    backgroundColor: "#d9d9d9",
    borderRadius: 10,
    paddingVertical: 20,
    paddingLeft: 10,
    marginVertical: 10,
    width: "100%",
    fontFamily: "Montserrat",
  },
  Button: {
    backgroundColor: "#2e70cb",
    borderRadius: 10,
    paddingVertical: 10,
    color: "white",
    marginVertical: 8,
  },
  ButtonText: {
    fontFamily: "Montserrat",
    textAlign: "center",
    color: "white",
  },
  EliteHomes: {
    fontSize: 32,
    marginVertical: 16,
    textAlign: "center",
    fontFamily: "Montserrat",
  },
  GetStartedText: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Montserrat",
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
  WelcomeText: {
    color: "#2e70cb",
    fontWeight: 700,
    textAlign: "center",
    fontSize: 26,
    fontFamily: "MontserratSemiBold",
  },
  error: {
    color: "red",
  },
});

export default SignUp;
