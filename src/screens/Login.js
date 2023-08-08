import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";
import { useState, useContext } from "react";
import { SetUserId, SetUserLogged, UserId, UserLogged } from "../../App";
import * as Font from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

const Login = ({ navigation }) => {
  const setUserId = useContext(SetUserLogged);
  const [loading, setloading] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  // Assuming you have a function to handle the completion of onboarding
const handleOnboardingComplete = async () => {
  try {
    // Set onboarded as true in AsyncStorage
    await AsyncStorage.setItem("onboarded", "true");

  } catch (error) {
    console.error("Error setting onboarded status:", error);
  }
};


  const handleSubmit = async (values, { setSubmitting }) => {
    setloading(true);
    try {
      // Make API call to log in with email and password
      const response = await axios.post(`${BASE_URL}/login`, values);

      // Handle success response
      setUserId(true);
      Alert.alert("Success", "Log In Successful");
      console.log(response.data.data);
      handleOnboardingComplete()
      navigation.navigate("AfterHome");
      await AsyncStorage.setItem(
        "userData",
        JSON.stringify(response.data.data.userId)
      );
      await AsyncStorage.setItem(
        "accessToken",
        JSON.stringify(response.data.token)
      );
    } catch (error) {
      // Handle error response
      console.log(error.response.data);
      Alert.alert("Error", error.response.data.message);
    }
    setloading(false);
    setSubmitting(false);
  };

  const SignUpHandler = () => {
    navigation.navigate("Create An Account");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.GetStartedText}>
        Log in with the data you entered during sign up
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
            <TouchableOpacity style={styles.Button} onPress={handleSubmit}>
              <Text style={styles.ButtonText}>Log In</Text>
              <Spinner
                visible={loading}
                textContent={"Loading..."}
                textStyle={{ color: "#FFF" }}
              />
            </TouchableOpacity>
            <Text style={styles.DontHaveAnAccount}>
              Dont have an account?{" "}
              <Text
                style={styles.DontHaveAnAccountText}
                onPress={SignUpHandler}
              >
                Sign Up
              </Text>
            </Text>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#ffffff",
  },
  GetStartedText: {
    width: "50%",
    fontSize: 16,
    fontWeight: 400,
  },
  Image: {
    width: "80%",
    height: 170,
    marginBottom: 32,
  },
  formContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    paddingVertical: 20,
    paddingLeft: 10,
    marginVertical: 10,
    fontFamily: "Montserrat",
    width: "120%",
    borderWidth: 0.5,
    borderColor: "#d9d9d9",
  },

  Button: {
    backgroundColor: "#2e70cb",
    borderRadius: 10,
    paddingVertical: 16,
    marginTop: 8,
  },
  ButtonText: {
    fontFamily: "Montserrat",
    textAlign: "center",
    color: "white",
  },
  EliteHomes: {
    fontSize: 32,
    fontFamily: "Montserrat",
  },
  Hello: {
    fontSize: 26,
    marginVertical: 16,
    fontFamily: "Montserrat",
  },
  LoginText: {
    fontSize: 16,
    fontFamily: "Montserrat",
  },
  DontHaveAnAccount: {
    marginTop: 16,
    textAlign: "center",
    fontFamily: "Montserrat",
  },
  DontHaveAnAccountText: {
    color: "#2e70cb",
    fontWeight: 700,
    fontFamily: "MontserratSemiBold",
  },
  HelloText: {
    color: "#2e70cb",
    fontWeight: 700,
    fontFamily: "MontserratSemiBold",
  },
  error: {
    color: "red",
  },
});

export default Login;
