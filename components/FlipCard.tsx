import { useRouter } from "expo-router";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const FlipCard = () => {
  const router = useRouter();

  const rotateY = useSharedValue(0);
  const isFlipped = useSharedValue(false);

  const start = () => {
    rotateY.value = 0;
    rotateY.value = withTiming(
      1,
      { duration: 300 },
      () => (isFlipped.value = !isFlipped.value)
    );
  };

  const animtedStyler = useAnimatedStyle(() => ({
    transform: [
      {
        rotateY: `${rotateY.value * 180}deg`,
      },
    ],
    backgroundColor: isFlipped.value
      ? withTiming("#3b82f6", { duration: 10 })
      : withTiming("#b58df1", { duration: 10 }),
  }));

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Button title="Go Back" onPress={() => router.back()} />
      <View style={styles.container}>
        <Animated.View style={[styles.flipCard, animtedStyler]}>
          <Text style={{ color: "#000", fontSize: 20 }}></Text>
        </Animated.View>
      </View>
      <Button title="RotateY" onPress={start} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  flipCard: {
    width: 200,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3b82f6",
    borderRadius: 10,
    position: "absolute",
  },
});

export default FlipCard;
