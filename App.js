import React, {useState, useEffect} from "react";
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import {AppLoading} from "expo"
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import PropertyDetails from './src/screens/propertyDetails';

const Stack = createStackNavigator()


// const getFonts = () => {
//   return Font.LoadAsync({
//     "Montesserat" : require("./assets/fonts/Montserrat-Regular.ttf")
//   })
// }

export default function App() {

  // const [fontsLoaded, setfontsLoaded] = useState(false);

  // useEffect(() => {
  //   const loadFonts = async () => {
  //     await getFonts()
  //     setfontsLoaded(true)
  //   }

  //   loadFonts()
  // }, []);

  // if(!fontsLoaded){
  //   return <AppLoading
  //   startAsync={getFonts}
  //   onFinish = {() => setfontsLoaded(true)}
  //   />
  // }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} options={{headerShown: false}}/>
        <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
        <Stack.Screen name='SignUp' component={SignUp} options={{headerShown: false}}/>
        <Stack.Screen name='PropertyDetails' component={PropertyDetails} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
);



}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
