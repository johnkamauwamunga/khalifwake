// app/(tabs)/sounds.tsx
import {
  Button,
  ButtonText,
  Heading,
  HStack,
  Text,
  VStack,
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
    <VStack className="flex-1 bg-background p-4 gap-4">
      <Heading className="text-xl">Sound Selection</Heading>
      <Text>Choose beautiful natural sounds. Preview before selecting.</Text>
      {SOUNDS.map((sound) => (
        <HStack
          key={sound.id}
          className={`justify-between items-center p-3 rounded-md ${selectedSound === sound.id ? "bg-primary-100" : "bg-warm-gray-100"}`}
        >
          <HStack className="gap-2 items-center">
            <Text className="text-2xl">{sound.emoji}</Text>
            <VStack>
              <Text className={selectedSound === sound.id ? "font-bold" : ""}>
                {sound.name}
              </Text>
              {selectedSound === sound.id && (
                <Text className="text-xs text-primary-600">✓ Selected</Text>
              )}
            </VStack>
          </HStack>
          <Button
            className="w-20 h-10"
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
