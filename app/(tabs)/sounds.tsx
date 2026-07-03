// app/(tabs)/sounds.tsx
import {
  Button,
  ButtonText,
  Heading,
  HStack,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { createAudioPlayer } from "expo-audio";
import React, { useCallback, useRef, useState } from "react";

// Static require statements for each sound file (required by Metro bundler)
const soundFiles = {
  birds: require("../../assets/audio/birds-chirping.mp3"),
  ocean: require("../../assets/audio/lesiakower-morning-joy.mp3"),
  forest: require("../../assets/audio/lesiakower-morning-joy.mp3"),
  rain: require("../../assets/audio/lesiakower-morning-joy.mp3"),
  sunrise: require("../../assets/audio/lesiakower-morning-joy.mp3"),
  meadow: require("../../assets/audio/lesiakower-morning-joy.mp3"),
};

const SOUNDS = [
  {
    id: "birds",
    name: "Birds Chirping",
    emoji: "🐦",
  },
  {
    id: "ocean",
    name: "Ocean Waves",
    emoji: "🌊",
  },
  {
    id: "forest",
    name: "Forest Morning",
    emoji: "🌳",
  },
  {
    id: "rain",
    name: "Gentle Rain",
    emoji: "🌧️",
  },
  {
    id: "sunrise",
    name: "Sunrise Melody",
    emoji: "🌅",
  },
  {
    id: "meadow",
    name: "Meadow",
    emoji: "🌾",
  },
];

export default function SoundsScreen() {
  const [selectedSound, setSelectedSound] = useState("birds");
  const currentPlayer = useRef<ReturnType<typeof createAudioPlayer> | null>(
    null,
  );

  const playPreview = useCallback(async (soundId: string) => {
    const soundFile = soundFiles[soundId as keyof typeof soundFiles];
    if (!soundFile) return;

    try {
      // Stop any currently playing audio
      if (currentPlayer.current) {
        currentPlayer.current.pause();
        currentPlayer.current.seekTo(0);
      }

      // Create a new player for the selected sound
      const player = createAudioPlayer(soundFile);
      currentPlayer.current = player;

      await player.play();

      // Auto-stop after 3 seconds
      setTimeout(() => {
        if (currentPlayer.current) {
          currentPlayer.current.pause();
          currentPlayer.current.seekTo(0);
        }
      }, 3000);
    } catch (error) {
      console.error("Playback error:", error);
    }
  }, []);

  return (
    <VStack className="flex-1 bg-background p-4 gap-4">
      <Heading className="text-xl">Sound Selection</Heading>
      <Text>Choose beautiful natural sounds. Preview before selecting.</Text>
      {SOUNDS.map((sound) => (
        <HStack
          key={sound.id}
          className={`justify-between items-center p-3 rounded-md ${selectedSound === sound.id ? "bg-primary-100" : "bg-warm-gray-100"}`}
          will-change-variable
        >
          <HStack className="gap-2 items-center">
            <Text className="text-2xl">{sound.emoji}</Text>
            <VStack>
              <Text
                className={selectedSound === sound.id ? "font-bold" : ""}
                will-change-variable
              >
                {sound.name}
              </Text>
              {selectedSound === sound.id && (
                <Text className="text-xs text-primary-600">✓ Selected</Text>
              )}
            </VStack>
          </HStack>
          <Button
            className="w-20 h-10"
            will-change-variable
            onPress={() => {
              setSelectedSound(sound.id);
              playPreview(sound.id);
            }}
          >
            <ButtonText>Preview</ButtonText>
          </Button>
        </HStack>
      ))}
    </VStack>
  );
}
