import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  ScrollView,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const BASE_URL = 'https://elitehomestest.onrender.com/api/v1';

const SignUp = ({ navigation }) => {
  const initialValues = {
    username: "",
    first_name: "Hneyr",
    last_name: "Jhon",
    email: "",
    password: "",
    confirm_password: "",
    phone_number: "",
    is_landlord: 0
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
    }

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
            <View>
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

              <View style={styles.Button}>
                <Button title="Submit" onPress={handleSubmit} color="#ffffff" />
              </View>

              <Text style={styles.AlreadyHaveAnAccount}>
              Already have an account?{" "}
              <Text
                style={styles.AlreadyHaveAnAccountText}
                onPress={LoginHandler}
              >
                Sign Up
              </Text>
            </Text>
            </View>
          )}
        </Formik>
        {/* <Formik
          initialValues={{
            name: "",
            password: "",
            confirm_password: "",
            email: "",
            phone: "",
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {(props) => (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={props.handleChange("name")}
                value={props.values.name}
              />

              <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={props.handleChange("password")}
                value={props.values.email}
                secureTextEntry
              />

              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                onChangeText={props.handleChange("confirm_password")}
                value={props.values.confirm_password}
                secureTextEntry
              />
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                onChangeText={props.handleChange("email")}
                value={props.values.email}
              />
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                onChangeText={props.handleChange("phone")}
                value={props.values.phone}
              />

              <View style={styles.Button}>
                <Button
                  title="Continue"
                  color="#ffffff"
                  onPress={SignUpHandler}
                />
              </View>
              <Text style={styles.AlreadyHaveAnAccount}>
                Already have an account?{" "}
                <Text style={styles.AlreadyHaveAnAccountText} onPress={LoginHandler}>Log In</Text>
              </Text>
            </View>
          )}
        </Formik> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 80,
    backgroundColor: "#ffffff",
  },
  ImageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  Image: {
    width: 200,
    height: 170,
    marginBottom: 32,
  },
  input: {
    backgroundColor: "#d9d9d9",
    borderRadius: 10,
    paddingVertical: 20,
    paddingRight: "60%",
    paddingLeft: 10,
    marginVertical: 10,
    width: "80vw"
  },
  Button: {
    backgroundColor: "#2e70cb",
    borderRadius: 10,
    paddingVertical: 10,
    color: "white",
  },
  EliteHomes: {
    fontSize: 32,
    marginVertical: 16,
    textAlign: "center",
  },
  GetStartedText: {
    fontSize: 16,
    textAlign: "center",
  },
  AlreadyHaveAnAccount: {
    marginTop: 16,
    textAlign: "center",
  },
  AlreadyHaveAnAccountText: {
    color: "#2e70cb",
    fontWeight: 700,
  },
  WelcomeText: {
    color: "#2e70cb",
    fontWeight: 700,
    textAlign: "center",
  },
});

export default SignUp;
