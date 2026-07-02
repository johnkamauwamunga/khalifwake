// app/(tabs)/sounds.tsx
import {
  Box,
  Button,
  ButtonText,
  Heading,
  HStack,
  Text,
  VStack
} from "@gluestack-ui/themed";
import { Audio } from "expo-av";
import React, { useState } from "react";

const SOUNDS = [
  { id: "birds", name: "Birds Chirping", emoji: "🐦" },
  { id: "ocean", name: "Ocean Waves", emoji: "🌊" },
  { id: "forest", name: "Forest Morning", emoji: "🌳" },
  { id: "rain", name: "Gentle Rain", emoji: "🌧️" },
  { id: "sunrise", name: "Sunrise Melody", emoji: "🌅" },
  { id: "meadow", name: "Meadow", emoji: "🌾" },
];

export default function SoundsScreen() {
  const [selectedSound, setSelectedSound] = useState("birds");
  const [playing, setPlaying] = useState<Audio.Sound | null>(null);

  const playPreview = async (soundId: string) => {
    if (playing) {
      await playing.stopAsync();
      await playing.unloadAsync();
      setPlaying(null);
    }
    try {
      // In a real app, load actual file; for demo we use a placeholder
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/sounds/preview.mp3"),
        { volume: 0.5, shouldPlay: true },
      );
      setPlaying(sound);
      setTimeout(async () => {
        await sound.stopAsync();
        await sound.unloadAsync();
        setPlaying(null);
      }, 3000);
    } catch (error) {
      console.error("Playback error:", error);
    }
  };

  return (
    <Box flex={1} bg="$backgroundLight" p="$4">
      <VStack space="md">
        <Heading size="xl">Sound Selection</Heading>
        <Text>Choose beautiful natural sounds. Preview before selecting.</Text>
        {SOUNDS.map((sound) => (
          <HStack
            key={sound.id}
            justifyContent="space-between"
            alignItems="center"
            p="$3"
            bg={selectedSound === sound.id ? "$primary100" : "$warmGray100"}
            borderRadius="$md"
          >
            <HStack space="md" alignItems="center">
              <Text fontSize="$xl">{sound.emoji}</Text>
              <VStack>
                <Text
                  fontWeight={selectedSound === sound.id ? "bold" : "normal"}
                >
                  {sound.name}
                </Text>
                {selectedSound === sound.id && (
                  <Text fontSize="$xs" color="$primary600">
                    ✓ Selected
                  </Text>
                )}
              </VStack>
            </HStack>
            <Button
              size="sm"
              variant={selectedSound === sound.id ? "solid" : "outline"}
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
    </Box>
  );
}
