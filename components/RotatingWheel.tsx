import { useRouter } from "expo-router";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const SEGMENTS = 8;
const ROTATION_PER_SEGMENT = 360 / SEGMENTS;

const RotatingWheel = () => {
  const router = useRouter();

  const rotate = useSharedValue(0);

  const startRandom = () => {
    const randomSegment = Math.floor(Math.random() * SEGMENTS); // 0 to 7
    const extraSpins = 5; // full extra spins before landing
    const finalRotation =
      extraSpins * 360 + randomSegment * ROTATION_PER_SEGMENT;

    rotate.value = 0;
    rotate.value = withTiming(
      finalRotation / 360, // convert degrees to shared value rotation units
      {
        duration: 3000,
        easing: Easing.out(Easing.exp),
      }
    );
  };

  const stopAtSegment = (segmentIndex: number) => {
    const extraSpins = 5; // full spins
    const finalRotation =
      extraSpins * 360 + segmentIndex * ROTATION_PER_SEGMENT;

    rotate.value = 0;
    rotate.value = withTiming(finalRotation / 360, {
      duration: 3000,
      easing: Easing.out(Easing.exp),
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${rotate.value * 360}deg`,
      },
    ],
  }));

  const renderSegments = () => {
    const items = [];
    for (let i = 0; i < SEGMENTS; i++) {
      const angle = (360 / SEGMENTS) * i;
      items.push(
        <View
          key={i}
          style={[
            styles.segment,
            {
              transform: [{ rotate: `${angle}deg` }, { translateY: -135 }],
            },
          ]}
        >
          <Text style={styles.segmentText}>{i + 1}</Text>
        </View>
      );
    }
    return items;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Button title="Go Back" onPress={() => router.back()} />
      <View style={styles.container}>
        <View style={styles.pointer} />
        <Animated.View style={[styles.wheel, animatedStyle]}>
          {renderSegments()}
        </Animated.View>
      </View>
      <Button title="Random Spin" onPress={startRandom} />
      <Button title="Stop at Segment 5" onPress={() => stopAtSegment(4)} />
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
  wheel: {
    width: 300,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3b82f6",
    borderRadius: 999,
    position: "relative",
  },
  pointer: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 20,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#b58df1",
    transform: [{ rotate: "180deg" }],
    marginBottom: 20,
  },
  segment: {
    position: "absolute",
    top: "45%",
    left: "50%",
    width: 60,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -30,
  },
  segmentText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RotatingWheel;
