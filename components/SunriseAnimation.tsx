// components/SunriseAnimation.tsx
import { Box } from "@gluestack-ui/themed";
import React, { useEffect } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

interface Props {
  intensity: number; // 0..1
  progress: number; // 0..1
}

export function SunriseAnimation({ intensity, progress }: Props) {
  const sunY = useSharedValue(600);
  const sunOpacity = useSharedValue(0);
  const glowScale = useSharedValue(1);

  useEffect(() => {
    sunY.value = withTiming(200 - progress * 150, {
      duration: 30000,
      easing: Easing.inOut(Easing.ease),
    });
    sunOpacity.value = withTiming(0.3 + intensity * 0.7, { duration: 30000 });
    glowScale.value = withRepeat(
      withSequence(
        withTiming(1 + intensity * 0.2, { duration: 2000 }),
        withTiming(1 - intensity * 0.1, { duration: 2000 }),
      ),
      -1,
      true,
    );
  }, [intensity, progress]);

  const sunStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: sunY.value }],
    opacity: sunOpacity.value,
  }));

  const glowStyle = useAnimatedStyle(() => ({
    transform: [{ scale: glowScale.value }],
    opacity: intensity * 0.3,
  }));

  return (
    <Box
      flex={1}
      className="bg-amber-600"
      justifyContent="center"
      alignItems="center"
    >
      <Animated.View
        style={[
          {
            position: "absolute",
            width: 300,
            height: 300,
            borderRadius: 150,
            backgroundColor: "#FFD700",
          },
          glowStyle,
        ]}
      />
      <Animated.View
        style={[
          {
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: "#FFA500",
            shadowColor: "#FFD700",
            shadowRadius: 30,
            shadowOpacity: 0.8,
          },
          sunStyle,
        ]}
      />
      <Box
        position="absolute"
        bottom={100}
        width="100%"
        height={2}
        // bg="$warmGray300"
      />
    </Box>
  );
}
