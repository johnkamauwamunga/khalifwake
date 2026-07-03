// components/SoundSelector.tsx
import {
  Box,
  Button,
  ButtonText,
  HStack,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { useAudioPlayer } from "expo-audio";
import React from "react";

const SOUNDS = [
  { id: "birds", name: "Birds", emoji: "🐦" },
  { id: "ocean", name: "Ocean", emoji: "🌊" },
  { id: "forest", name: "Forest", emoji: "🌳" },
  { id: "rain", name: "Rain", emoji: "🌧️" },
  { id: "sunrise", name: "Sunrise", emoji: "🌅" },
];

interface SoundSelectorProps {
  selectedSound: string;
  onSelect: (id: string) => void;
}

export function SoundSelector({ selectedSound, onSelect }: SoundSelectorProps) {
  const player = useAudioPlayer(
    require("../assets/audio/lesiakower-morning-joy.mp3"),
  );

  const playPreview = async (id: string) => {
    try {
      await player.play();
      // Auto-stop after 2 seconds
      setTimeout(async () => {
        await player.pause();
      }, 2000);
    } catch (error) {
      console.error("Playback error:", error);
    }
  };

  return (
    <Box>
      <Text className="text-lg font-bold mb-2">Sound</Text>
      <VStack className="space-y-2">
        {SOUNDS.map((s) => (
          <HStack
            key={s.id}
            justifyContent="space-between"
            alignItems="center"
            className={`p-3 rounded-md ${selectedSound === s.id ? "bg-primary-100" : "bg-warm-gray-100"}`}
            will-change-variable
          >
            <HStack className="space-x-2" alignItems="center">
              <Text className="text-2xl">{s.emoji}</Text>
              <Text
                className={selectedSound === s.id ? "font-bold" : ""}
                will-change-variable
              >
                {s.name}
              </Text>
            </HStack>
            <Button
              className={`w-20 h-10 ${selectedSound === s.id ? "bg-primary-500" : "border border-primary-500 bg-transparent"}`}
              will-change-variable
              onPress={() => {
                onSelect(s.id);
                playPreview(s.id);
              }}
            >
              <ButtonText
                className={
                  selectedSound === s.id ? "text-white" : "text-primary-500"
                }
                will-change-variable
              >
                Preview
              </ButtonText>
            </Button>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
}
