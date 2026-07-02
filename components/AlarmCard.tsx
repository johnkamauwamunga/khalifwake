// components/AlarmCard.tsx
import {
  Box,
  DeleteIcon,
  EditIcon,
  HStack,
  Heading,
  IconButton,
  Switch,
  Text,
  VStack
} from "@gluestack-ui/themed";
import React from "react";
import { Alarm } from "../context/AlarmsContext";

interface AlarmCardProps {
  alarm: Alarm;
  onToggle: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function AlarmCard({
  alarm,
  onToggle,
  onEdit,
  onDelete,
}: AlarmCardProps) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const repeatStr = alarm.repeatDays.map((d) => days[d]).join(", ");

  return (
    <Box
      bg={alarm.enabled ? "$white" : "$warmGray100"}
      p="$4"
      borderRadius="$lg"
      borderWidth={1}
      borderColor={alarm.enabled ? "$primary200" : "$warmGray300"}
      opacity={alarm.enabled ? 1 : 0.6}
    >
      <HStack justifyContent="space-between" alignItems="center">
        <VStack space="xs" flex={1}>
          <HStack space="sm" alignItems="center">
            <Heading
              size="2xl"
              color={alarm.enabled ? "$primary600" : "$textDark"}
            >
              {alarm.time}
            </Heading>
            {alarm.sunrise && (
              <Box bg="$orange100" px="$2" py="$1" borderRadius="$sm">
                <Text fontSize="$xs" color="$orange600">
                  🌅 Sunrise
                </Text>
              </Box>
            )}
          </HStack>
          <Text fontSize="$sm">{alarm.label}</Text>
          <Text fontSize="$xs" color="$textLight">
            {repeatStr}
          </Text>
          <HStack space="sm" alignItems="center">
            {alarm.vibrate && <Text fontSize="$xs">🔔</Text>}
            <Text fontSize="$xs" color="$textLight">
              Sound: {alarm.sound}
            </Text>
          </HStack>
        </VStack>
        <VStack space="md" alignItems="center">
          <Switch
            value={alarm.enabled}
            onValueChange={() => onToggle(alarm.id)}
            trackColor={{ true: "$primary500", false: "$warmGray300" }}
          />
          <HStack space="sm">
            <IconButton
              size="sm"
              variant="outline"
              onPress={() => onEdit(alarm.id)}
              icon={EditIcon}
            />
            <IconButton
              size="sm"
              variant="outline"
              onPress={() => onDelete(alarm.id)}
              icon={DeleteIcon}
            />
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
}
