import { Href, useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const routes: { name: string; path: string }[] = [
  { name: "Progress Bar", path: "/progressBar/progressbar" },
  { name: "Flip Card", path: "/flipCard/flipcard" },
  { name: "Rotating Wheel", path: "/rotatingWheel/rotatingwheel" },
];

const Index = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {routes.map((route, index) => (
        <Pressable
          key={index}
          onPress={() => router.push(route.path as Href)}
          style={styles.button}
        >
          <Text style={styles.text}>{route.name}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#3b82f6",
    padding: 10,
    borderRadius: 10,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  text: {
    color: "white",
    fontSize: 20,
  },
});

export default Index;
