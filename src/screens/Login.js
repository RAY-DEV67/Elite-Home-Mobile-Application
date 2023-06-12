import React from "react";
import { StyleSheet, Text, View, TextInput, Button, Image } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const BASE_URL = "https://elitehomestest.onrender.com/api/v1";

const Login = ({ navigation }) => {
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Make API call to log in with email and password
      const response = await axios.post(`${BASE_URL}/login`, values);

      // Handle success response
      console.log(response.data);
      navigation.navigate("Home");

      // TODO: Perform actions after successful login, such as storing tokens or redirecting to another screen
    } catch (error) {
      // Handle error response
      console.log(error.response.data);
    }

    setSubmitting(false);
  };

  const SignUpHandler = () => {
    navigation.navigate("SignUp");
  };
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/login.png")} style={styles.Image} />
      <Text style={styles.EliteHomes}>Elite Homes</Text>
      <Text style={styles.Hello}>
        <Text style={styles.HelloText}>Hello!</Text> Welcome back
      </Text>
      <Text style={styles.LoginText}>
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
          <View>
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
            <View style={styles.Button}>
              <Button title="Log In" onPress={handleSubmit} color="#ffffff"/>
            </View>
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
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
    paddingRight: "70%",
    paddingLeft: 10,
    marginVertical: 10,
    width: "80vw"
  },
  Button: {
    backgroundColor: "#2e70cb",
    borderRadius: 10,
    paddingVertical: 10,
  },
  EliteHomes: {
    fontSize: 32,
  },
  Hello: {
    fontSize: 26,
    marginVertical: 16,
  },
  LoginText: {
    fontSize: 16,
  },
  ForgotPassword: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  DontHaveAnAccount: {
    marginTop: 16,
    textAlign: "center",
  },
  ForgotPasswordText: {
    color: "#2e70cb",
    fontWeight: 700,
  },
  DontHaveAnAccountText: {
    color: "#2e70cb",
    fontWeight: 700,
  },
  HelloText: {
    color: "#2e70cb",
    fontWeight: 700,
  },
});

export default Login;
