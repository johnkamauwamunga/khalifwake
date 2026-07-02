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
  Volume2Icon,
  VolumeOffIcon,
} from "@gluestack-ui/themed";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Audio } from "expo-av";
import * as Haptics from "expo-haptics";
import React, { useEffect, useState } from "react";
import { SunriseAnimation } from "../components/SunriseAnimation";

export default function AlarmRingingScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { alarm } = route.params || {};
  const [progress, setProgress] = useState(0);
  const [intensity, setIntensity] = useState(0);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
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
      const { sound: newSound } = await Audio.Sound.createAsync(
        require("../assets/sounds/alarm.mp3"),
        { volume: 0.1, shouldPlay: true, isLooping: true },
      );
      setSound(newSound);
      let vol = 0.1;
      const volInterval = setInterval(() => {
        if (vol < 1) {
          vol += 0.02;
          newSound.setVolumeAsync(vol);
        } else clearInterval(volInterval);
      }, 500);
    } catch (error) {
      console.error(error);
    }
  };

  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
    }
  };

  const handleSnooze = async () => {
    setIsSnoozed(true);
    await stopSound();
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setTimeout(() => {
      setIsSnoozed(false);
      playAlarmSound();
    }, 300000); // 5 minutes
  };

  const handleDismiss = async () => {
    await stopSound();
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    navigation.goBack();
  };

  return (
    <Box flex={1} bg="$backgroundLight">
      <SunriseAnimation intensity={intensity} progress={progress} />
      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        p="$6"
        bg="rgba(255,255,255,0.9)"
        borderTopLeftRadius="$3xl"
        borderTopRightRadius="$3xl"
      >
        <VStack space="lg">
          <HStack justifyContent="space-between" alignItems="center">
            <VStack>
              <Heading size="xl">{alarm?.label || "Alarm"}</Heading>
              <Text fontSize="$lg">{alarm?.time || "06:30"}</Text>
            </VStack>
            <Button variant="outline" onPress={() => setIsMuted(!isMuted)}>
              <Icon
                as={isMuted ? VolumeOffIcon : Volume2Icon}
                color="$primary500"
                size="md"
              />
            </Button>
          </HStack>
          {isSnoozed && (
            <Box bg="$amber100" p="$3" borderRadius="$md">
              <Text color="$amber700">Snoozed for 5 minutes</Text>
            </Box>
          )}
          <HStack space="md">
            <Button
              flex={1}
              variant="outline"
              borderColor="$primary500"
              onPress={handleSnooze}
            >
              <ButtonText color="$primary500">Snooze</ButtonText>
            </Button>
            <Button flex={1} bg="$red500" onPress={handleDismiss}>
              <ButtonText>Dismiss</ButtonText>
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
}
