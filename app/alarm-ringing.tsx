// app/alarm-ringing.tsx
import {
  Box,
  Button,
  ButtonText,
  HStack,
  Heading,
  Icon,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AudioPlayer } from "expo-audio";
import * as Haptics from "expo-haptics";
import { Volume2, VolumeX } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { SunriseAnimation } from "../components/SunriseAnimation";

export default function AlarmRingingScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { alarm } = route.params || {};
  const [progress, setProgress] = useState(0);
  const [intensity, setIntensity] = useState(0);
  const [player, setPlayer] = useState<AudioPlayer | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isSnoozed, setIsSnoozed] = useState(false);

  useEffect(() => {
    playAlarmSound();
    startGradualIncrease();
    return () => {
      stopSound();
    };
  }, []);

  const startGradualIncrease = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 0.01;
      setProgress(Math.min(progress, 1));
      setIntensity(Math.min(progress, 1));
      if (progress >= 1) clearInterval(interval);
    }, 300);
    return () => clearInterval(interval);
  };

  const playAlarmSound = async () => {
    try {
      const newPlayer = new AudioPlayer(
        require("../assets/sounds/alarm.mp3"),
        1000,
        { volume: 0.1, isLooping: true },
      );
      await newPlayer.play();
      setPlayer(newPlayer);

      let vol = 0.1;
      const volInterval = setInterval(() => {
        if (vol < 1.0) {
          vol += 0.02;
          newPlayer.setVolume(vol);
        } else {
          clearInterval(volInterval);
        }
      }, 500);
    } catch (error) {
      console.error("Error playing alarm:", error);
    }
  };

  const stopSound = async () => {
    if (player) {
      await player.pause();
      await player.seekTo(0);
      setPlayer(null);
    }
  };

  const handleSnooze = async () => {
    setIsSnoozed(true);
    await stopSound();
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setTimeout(() => {
      setIsSnoozed(false);
      playAlarmSound();
    }, 300000);
  };

  const handleDismiss = async () => {
    await stopSound();
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    navigation.goBack();
  };

  const toggleMute = () => {
    if (player) {
      if (isMuted) {
        player.setVolume(0.8);
      } else {
        player.setVolume(0);
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <Box className="flex-1 bg-backgroundLight">
      {" "}
      {/* Tailwind bg */}
      <SunriseAnimation intensity={intensity} progress={progress} />
      <Box
        className="absolute bottom-0 left-0 right-0 p-6 bg-white/90 rounded-t-3xl"
        // All Tailwind: padding, background with opacity, rounded top
      >
        <VStack className="space-y-4">
          <HStack className="justify-between items-center">
            <VStack>
              <Heading className="text-xl text-textDark">
                {alarm?.label || "Alarm"}
              </Heading>
              <Text className="text-textLight">{alarm?.time || "06:30"}</Text>
            </VStack>
            <Button
              variant="outline"
              className="border-primary-500"
              onPress={toggleMute}
            >
              <Icon
                as={isMuted ? VolumeX : Volume2}
                className="w-6 h-6 text-primary-500"
              />
            </Button>
          </HStack>
          {isSnoozed && (
            <Box className="bg-amber-100 p-3 rounded-md">
              <Text className="text-amber-700">Snoozed for 5 minutes</Text>
            </Box>
          )}
          <HStack className="space-x-4">
            <Button
              className="flex-1 border border-primary-500 bg-transparent"
              onPress={handleSnooze}
            >
              <ButtonText className="text-primary-500">Snooze</ButtonText>
            </Button>
            <Button className="flex-1 bg-red-500" onPress={handleDismiss}>
              <ButtonText className="text-white">Dismiss</ButtonText>
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
}
