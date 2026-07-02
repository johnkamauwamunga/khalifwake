// components/SoundSelector.tsx
import {
  Box,
  Button,
  ButtonText,
  HStack,
  Text,
  VStack
} from "@gluestack-ui/themed";
import { Audio } from "expo-av";
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
  const [playing, setPlaying] = useState<Audio.Sound | null>(null);

  const playPreview = async (id: string) => {
    if (playing) {
      await playing.stopAsync();
      await playing.unloadAsync();
      setPlaying(null);
    }
    // Placeholder - replace with actual sound file
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/sounds/preview.mp3"),
        { volume: 0.5, shouldPlay: true },
      );
      setPlaying(sound);
      setTimeout(async () => {
        await sound.stopAsync();
        await sound.unloadAsync();
        setPlaying(null);
      }, 2000);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box>
      <Text fontWeight="bold" mb="$2">
        Sound
      </Text>
      <VStack space="sm">
        {SOUNDS.map((s) => (
          <HStack
            key={s.id}
            justifyContent="space-between"
            alignItems="center"
            p="$2"
            bg={selectedSound === s.id ? "$primary100" : "$warmGray100"}
            borderRadius="$md"
          >
            <HStack space="md" alignItems="center">
              <Text fontSize="$xl">{s.emoji}</Text>
              <Text>{s.name}</Text>
            </HStack>
            <Button
              size="xs"
              variant={selectedSound === s.id ? "solid" : "outline"}
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
