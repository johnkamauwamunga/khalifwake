// app/alarm-ringing.tsx
import {
  Button,
  ButtonText,
  HStack,
  Heading,
  Icon,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { createAudioPlayer } from "expo-audio";
import * as Haptics from "expo-haptics";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Volume2, VolumeX } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import { SunriseAnimation } from "../components/SunriseAnimation";

interface Alarm {
  id: string;
  time: string;
  label: string;
  repeatDays: number[];
  sound: string;
  vibrate: boolean;
  enabled: boolean;
  sunrise: boolean;
}

export default function AlarmRingingScreen() {
  const router = useRouter();
  const { alarm } = useLocalSearchParams<{ alarm?: string }>();
  const alarmData: Alarm | null = alarm ? JSON.parse(alarm) : null;
  const [progress, setProgress] = useState(0);
  const [intensity, setIntensity] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSnoozed, setIsSnoozed] = useState(false);
  const playerRef = useRef<ReturnType<typeof createAudioPlayer> | null>(null);

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
      // Stop any existing player
      if (playerRef.current) {
        playerRef.current.pause();
        playerRef.current.seekTo(0);
      }

      // Create a new player for the alarm sound
      const player = createAudioPlayer(
        require("../assets/audio/bedside-clock-alarm.mp3"),
      );
      playerRef.current = player;

      // Set initial volume
      player.volume = 0.1;
      await player.play();

      // Gradually increase volume
      let vol = 0.1;
      const volInterval = setInterval(() => {
        if (vol < 1.0 && playerRef.current) {
          vol += 0.02;
          playerRef.current.volume = vol;
        } else {
          clearInterval(volInterval);
        }
      }, 500);
    } catch (error) {
      console.error("Error playing alarm:", error);
    }
  };

  const stopSound = () => {
    if (playerRef.current) {
      playerRef.current.pause();
      playerRef.current.seekTo(0);
      playerRef.current = null;
    }
  };

  const handleSnooze = async () => {
    setIsSnoozed(true);
    stopSound();
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setTimeout(() => {
      setIsSnoozed(false);
      playAlarmSound();
    }, 300000);
  };

  const handleDismiss = async () => {
    stopSound();
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.back();
  };

  const toggleMute = () => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.volume = 0.8;
      } else {
        playerRef.current.volume = 0;
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <VStack className="flex-1 bg-background">
      <SunriseAnimation intensity={intensity} progress={progress} />
      <VStack className="absolute bottom-0 left-0 right-0 p-6 bg-white/90 rounded-t-3xl">
        <HStack className="justify-between items-center">
          <VStack>
            <Heading className="text-xl text-foreground">
              {alarmData?.label || "Alarm"}
            </Heading>
            <Text className="text-muted-foreground">
              {alarmData?.time || "06:30"}
            </Text>
          </VStack>
          <Button className="border border-primary-500" onPress={toggleMute}>
            <Icon
              as={isMuted ? VolumeX : Volume2}
              className="w-6 h-6 text-primary-500"
            />
          </Button>
        </HStack>
        {isSnoozed && (
          <VStack className="bg-orange-100 p-3 rounded-md">
            <Text className="text-orange-700">Snoozed for 5 minutes</Text>
          </VStack>
        )}
        <HStack className="space-x-4">
          <Button
            className="flex-1 border border-primary-500 bg-transparent"
            onPress={handleSnooze}
          >
            <ButtonText className="text-primary-500">Snooze</ButtonText>
          </Button>
          <Button className="flex-1 bg-destructive" onPress={handleDismiss}>
            <ButtonText className="text-destructive-foreground">
              Dismiss
            </ButtonText>
          </Button>
        </HStack>
      </VStack>
    </VStack>
  );
}
