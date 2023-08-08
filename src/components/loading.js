import { View, Text } from "react-native";
import LoadingSpinner from "./spinner";

function Loading() {
  return (
    <View className="absolute h-[100vh] w-[100vw] z-10 items-center opacity-80 justify-center bg-black top-0">
      <View className="animate-bounce">
        <LoadingSpinner />
      </View>
    </View>
  );
}

export default Loading;
