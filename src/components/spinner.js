import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";

export default function LoadingSpinner() {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="small"
        color="#383636"
        style={styles.spinner}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  spinner: {
    width: 20,
    height: 20,
    borderWidth: 5,
    borderColor: "#f3f3f3",
    borderTopColor: "#383636",
    borderRadius: 50,
  },
});
