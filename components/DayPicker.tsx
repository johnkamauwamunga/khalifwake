// components/DayPicker.tsx
import { Button, ButtonText, HStack, Text, VStack } from "@gluestack-ui/themed";
import React from "react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface DayPickerProps {
  selectedDays: number[];
  onToggleDay: (days: number[]) => void;
}

export function DayPicker({ selectedDays, onToggleDay }: DayPickerProps) {
  const toggle = (index: number) => {
    const newDays = selectedDays.includes(index)
      ? selectedDays.filter((d) => d !== index)
      : [...selectedDays, index].sort();
    onToggleDay(newDays);
  };

  return (
    <VStack space="sm">
      <Text fontWeight="bold">Repeat</Text>
      <HStack space="sm" flexWrap="wrap">
        {DAYS.map((day, i) => (
          <Button
            key={i}
            size="sm"
            variant={selectedDays.includes(i) ? "solid" : "outline"}
            bg={selectedDays.includes(i) ? "$primary500" : "transparent"}
            onPress={() => toggle(i)}
          >
            <ButtonText
              color={selectedDays.includes(i) ? "$white" : "$primary500"}
            >
              {day}
            </ButtonText>
          </Button>
        ))}
      </HStack>
    </VStack>
  );
}
