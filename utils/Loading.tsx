import React from "react";
import { Animated, StyleSheet, View } from "react-native";

const Dot = ({ delay, color }: { delay: number; color: string }) => {
  const opacity = new Animated.Value(0);

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [delay, opacity]);

  return <Animated.View style={[styles.dot, { opacity, backgroundColor: color }]} />;
};

export default function LoadingScreen() {
  return (
    <View style={styles.loadingScreen}>
      <View style={styles.dotsWrapper}>
        <Dot delay={0} color="red" />
        <Dot delay={150} color="blue" />
        <Dot delay={300} color="red" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dotsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 60,
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});
