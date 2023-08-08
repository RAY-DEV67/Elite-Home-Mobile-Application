import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect, useContext } from "react";
import { Onboarded, UserId, UserLogged } from "../../App";

export default function Navbar() {
  const [currentRouteName, setcurrentRouteName] = useState("Home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigation = useNavigation();
  const userId = useContext(UserId);
  const userLogged = useContext(UserLogged);
  const onboarded = useContext(Onboarded);

  const handleEventPress = () => {
    navigation.navigate("MyProperty");
    setcurrentRouteName("Events");
  };

  const handleHomePress = () => {
    navigation.navigate("AfterHome");
    setcurrentRouteName("Home");
  };

  const handleCartPress = () => {
    navigation.navigate("Property Search");
    setcurrentRouteName("Cart");
  };

  useEffect(() => {
    // Reset the current route name when hasOnboarded changes
    setcurrentRouteName("Home");
  }, []);

  if (onboarded || userLogged) {
    return (
      <View style={styles.card}>
        <TouchableOpacity style={styles.icon} onPress={handleHomePress}>
          <Feather
            name="home"
            size={20}
            color={currentRouteName === "Home" ? "#2e70cb" : "black"}
          />
          <Text style={currentRouteName === "Home" ? styles.blueText : null}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.icon} onPress={handleCartPress}>
          <AntDesign
            name="tago"
            size={24}
            color={currentRouteName === "Cart" ? "#2e70cb" : "black"}
          />

          <Text style={currentRouteName === "Cart" ? styles.blueText : null}>
            Offers
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.icon} onPress={handleEventPress}>
          <SimpleLineIcons
            name="handbag"
            size={20}
            color={currentRouteName === "Events" ? "#2e70cb" : "black"}
          />
          <Text style={currentRouteName === "Events" ? styles.blueText : null}>
            My Property
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.icon}>
          <MaterialCommunityIcons
            name="face-man-profile"
            size={20}
            color={currentRouteName === "Profile" ? "#2e70cb" : "black"}
          />
          <Text>Profile</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-between",
    padding: 20,
  },
  icon: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  blueText: {
    color: "#2e70cb",
  },
});
