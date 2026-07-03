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
    <VStack className="gap-2">
      <Text className="font-bold">Repeat</Text>
      <HStack className="gap-2 flex-wrap">
        {DAYS.map((day, i) => (
          <Button
            key={i}
            className={`px-3 py-1 rounded ${selectedDays.includes(i) ? "bg-primary-500" : "bg-transparent border border-primary-500"}`}
            onPress={() => toggle(i)}
          >
            <ButtonText
              className={
                selectedDays.includes(i) ? "text-white" : "text-primary-500"
              }
            >
              {day}
            </ButtonText>
          </Button>
        ))}
      </HStack>
    </VStack>
  );
}
