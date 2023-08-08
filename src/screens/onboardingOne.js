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

function OnboardingOne({ navigation }) {
  return (
    <View style={styles.Container}>
      <View style={styles.onboardingContainer}>
        <View style={styles.ImageContainer}>
          <Image
            source={require("../../assets/onboardingOne.png")}
            style={styles.image}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.head}>Make Direct Contact</Text>
          <Text style={styles.text}>
            It connets customers directly to property owners and enables them to
            rent apartments of their choice
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("OnboardingTwo");
            }}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("OnboardingThree");
        }}
      >
        <Text style={styles.skip}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: screenHeight,
    backgroundColor: "#ffffff"
  },
  onboardingContainer: {
    width: screenWidth
  },
  ImageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: screenHeight / 7,
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
  },
  head: {
    fontSize: screenWidth / 16,
    fontWeight: 400,
    marginVertical: 16,
    textAlign: "center",
  },
  text: {
    fontSize: screenWidth / 24,
    marginHorizontal: 32,
    textAlign: "center",
    color: "#d9d9d9",
    textAlign: "center",
  },
  image: {
    width: screenWidth / 1.3,
    height: screenHeight / 3,
  },
  button: {
    borderWidth: 1,
    borderColor: "#2e70cb",
    borderRadius: 5,
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 32,
    width: screenWidth / 4,
  },
  buttonText: {
    color: "#2e70cb",
    textAlign: "center",
  },
  skip: {
    marginBottom: screenHeight / 15,
    marginRight: screenWidth / 15,
  },
});

export default OnboardingOne;
