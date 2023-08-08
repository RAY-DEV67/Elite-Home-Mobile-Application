import React, { useState, useEffect, useContext, createContext } from "react";
import { AppLoading } from "expo";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./src/screens/Home";
import Login from "./src/screens/Login";
import SignUp from "./src/screens/SignUp";
import PropertyDetails from "./src/screens/propertyDetails";
import OnboardingOne from "./src/screens/onboardingOne";
import OnboardingTwo from "./src/screens/onboardingTwo";
import OnboardingThree from "./src/screens/onboardingThree";
import Navbar from "./src/components/navbar";
import Offers from "./src/screens/offers";
import MyProperty from "./src/screens/myProperty";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "./src/components/loading";

const Stack = createStackNavigator();

export const UserId = createContext();
export const SetUserLogged = createContext();
export const UserLogged = createContext();
export const AccessToken = createContext();
export const Onboarded = createContext();

export default function App() {
  const [userId, setuserId] = useState();
  const [accessToken, setaccessToken] = useState();
  const [onboarded, setonboarded] = useState();
  const [loading, setloading] = useState(true);
  const [userLogged, setuserLogged] = useState();

  const getUserData = async () => {
    setloading(true);
    try {
      const userData = await AsyncStorage.getItem("userData");
      const accessToken = await AsyncStorage.getItem("accessToken");
      const onboarded = await AsyncStorage.getItem("onboarded");

      if (userData) {
        const parsedUserData = JSON.parse(userData);
        const parsedAccessToken = JSON.parse(accessToken);
        setaccessToken(parsedAccessToken);
        setuserId(parsedUserData);
        setonboarded(onboarded === "true");
      }

      setloading(false);
    } catch (error) {
      console.error("Error retrieving user data:", error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  // if (loading) {
  //   return <Loading />;
  // }

  return (
    <UserId.Provider value={userId}>
      <AccessToken.Provider value={accessToken}>
        <Onboarded.Provider value={onboarded}>
          <SetUserLogged.Provider value={setuserLogged}>
            <UserLogged.Provider value={userLogged}>
              <NavigationContainer>
                <Stack.Navigator>
                  {onboarded ? (
                    <Stack.Screen
                      name="Home"
                      component={Home}
                      options={{ headerShown: false }}
                    />
                  ) : (
                    <Stack.Screen
                      name="OnboardingOne"
                      component={OnboardingOne}
                      options={{ headerShown: false }}
                    />
                  )}
                  <Stack.Screen
                    name="AfterHome"
                    component={Home}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="OnboardingTwo"
                    component={OnboardingTwo}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="OnboardingThree"
                    component={OnboardingThree}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="Log In"
                    component={Login}
                    options={{
                      headerBackTitle: "",
                    }}
                  />
                  <Stack.Screen
                    name="Create An Account"
                    component={SignUp}
                    options={{
                      headerBackTitle: "",
                    }}
                  />
                  <Stack.Screen
                    name="PropertyDetails"
                    component={PropertyDetails}
                    options={{
                      headerBackTitle: "",
                      headerTitle: "",
                    }}
                  />
                  <Stack.Screen
                    name="Property Search"
                    component={Offers}
                    options={{
                      headerBackTitle: "",
                    }}
                  />
                  <Stack.Screen
                    name="MyProperty"
                    component={MyProperty}
                    options={{ headerShown: false }}
                  />
                </Stack.Navigator>
                <Navbar />
              </NavigationContainer>
            </UserLogged.Provider>
          </SetUserLogged.Provider>
        </Onboarded.Provider>
      </AccessToken.Provider>
    </UserId.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
