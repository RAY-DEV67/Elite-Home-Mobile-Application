import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

function OnboardingThree({ navigation }) {
  return (
    <View style={styles.Container}>
      <View>
        <View style={styles.ImageContainer}>
          <Image
            source={require("../../assets/onboardingThree.png")}
            style={styles.image}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.logo}>
            Elite <Text style={styles.logoHomes}>Homes</Text>
          </Text>
          <Text style={styles.head}>Start Exploring</Text>
          <Text style={styles.text}>
            The best and affordable apartment at your finger tip
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("Create An Account");
            }}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.loginContainer}>
          <View style={styles.skip}>
            <Text> Already have an account?</Text>
            <TouchableOpacity onPress={() => {
                navigation.navigate("Log In")
            }}>
              <Text style={styles.login}> Log in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: screenHeight,
  },
  ImageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: screenWidth,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: screenHeight / 4,
    left: screenWidth / 50,
  },
  head: {
    fontSize: screenWidth / 14,
    fontWeight: 400,
    marginVertical: 8,
    textAlign: "center",
    color: "#ffffff",
  },
  logo: {
    fontSize: screenWidth / 14,
    fontWeight: 400,
    marginVertical: 16,
    textAlign: "center",
    color: "#ffffff",
  },
  logoHomes: {
    fontSize: screenWidth / 14,
    fontWeight: 600,
    marginVertical: 16,
    textAlign: "center",
    color: "#2e70cb",
  },
  text: {
    fontSize: screenWidth / 16,
    marginHorizontal: 32,
    textAlign: "center",
    color: "#ffffff",
    textAlign: "center",
  },
  image: {
    width: screenWidth,
    height: screenHeight / 1.5,
  },
  button: {
    borderWidth: 1,
    borderColor: "#2e70cb",
    borderRadius: 5,
    marginTop: 16,
    paddingVertical: 14,
    paddingHorizontal: 32,
    width: screenWidth / 1.2,
    backgroundColor: "#2e70cb",
    marginBottom: 16,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: 500,
    textAlign: "center",
  },
  loginContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  skip: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    color: "#2e70cb",
    marginBottom: screenHeight / 15,
    marginRight: screenWidth / 15,
  },
  login: {
    color: "#2e70cb",
  },
});

export default OnboardingThree;
