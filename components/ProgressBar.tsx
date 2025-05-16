import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const ProgressBar = () => {
  const router = useRouter();
  const progress = useSharedValue(0);
  const [tooltipText, setTooltipText] = React.useState("0%");

  // Animate progress bar width
  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  // Tooltip position - centered
  const tooltipStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: progress.value * 300 - 25 }],
  }));

  useAnimatedReaction(
    () => Math.round(progress.value * 100),
    (val) => {
      runOnJS(setTooltipText)(`${val}%`);
    },
    []
  );

  const startProgress = () => {
    progress.value = 0;
    progress.value = withTiming(1, { duration: 3000 });
  };

  useEffect(() => {
    progress.value = 0;
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Button title="Go Back" onPress={() => router.back()} />
      <View style={styles.container}>
        <View style={styles.progressContainer}>
          <Animated.View style={[styles.progressBar, animatedStyle]} />
          <Animated.View style={[styles.tooltip, tooltipStyle]}>
            <Text style={styles.tooltipText}>{tooltipText}</Text>
          </Animated.View>
        </View>
        <View style={{ marginTop: 20 }}>
          <Button title="Start Progress" onPress={startProgress} />
        </View>
      </View>
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
  progressContainer: {
    width: 300,
    height: 20,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    overflow: "visible",
    position: "relative",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#3b82f6",
    borderRadius: 10,
  },
  tooltip: {
    position: "absolute",
    top: -30,
    width: 50,
    height: 25,
    backgroundColor: "#333",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  tooltipText: {
    color: "#fff",
    fontSize: 14,
  },
});

export default ProgressBar;
