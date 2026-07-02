// components/SoundSelector.tsx
import {
  Box,
  Button,
  ButtonText,
  HStack,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { AudioPlayer } from "expo-audio";
import React, { useState } from "react";

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
  const [player, setPlayer] = useState<AudioPlayer | null>(null);

  const playPreview = async (id: string) => {
    // Stop any current playback
    if (player) {
      await player.pause();
      await player.seekTo(0);
      setPlayer(null);
    }

    try {
      // ✅ FIX: Provide all 3 required arguments
      const newPlayer = new AudioPlayer(
        require("../assets/audio/lesiakower-morning-joy.mp3"),
        1000, // update interval (ms)
        {}, // options (empty for now)
      );

      await newPlayer.play();
      setPlayer(newPlayer);

      // Auto-stop after 2 seconds
      setTimeout(async () => {
        if (newPlayer) {
          await newPlayer.pause();
          await newPlayer.seekTo(0);
          setPlayer(null);
        }
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
            className="p-3"
            bg={selectedSound === s.id ? "$primary100" : "$warmGray100"}
            borderRadius="$md"
          >
            <HStack className="space-x-2" alignItems="center">
              <Text className="text-2xl">{s.emoji}</Text>
              <Text>{s.name}</Text>
            </HStack>
            <Button
              className="w-20 h-10"
              variant={selectedSound === s.id ? "solid" : "outline"}
              bg={selectedSound === s.id ? "$primary500" : "transparent"}
              _text={{
                color: selectedSound === s.id ? "$white" : "$primary500",
              }}
              onPress={() => {
                onSelect(s.id);
                playPreview(s.id);
              }}
            >
              <ButtonText>Preview</ButtonText>
            </Button>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
}
