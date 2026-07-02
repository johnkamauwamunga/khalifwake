// app/(tabs)/settings.tsx
import {
  Box,
  Button,
  ButtonText,
  Heading,
  HStack,
  Icon,
  LogOutIcon,
  Switch,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import React from "react";

export default function SettingsScreen() {
  return (
    <Box flex={1} bg="$backgroundLight" p="$4">
      <VStack space="lg">
        <Heading size="xl">Settings</Heading>
        <HStack
          justifyContent="space-between"
          alignItems="center"
          p="$3"
          bg="$warmGray100"
          borderRadius="$md"
        >
          <Text fontWeight="bold">Vibration</Text>
          <Switch value={true} trackColor={{ true: "$primary500" }} />
        </HStack>
        <HStack
          justifyContent="space-between"
          alignItems="center"
          p="$3"
          bg="$warmGray100"
          borderRadius="$md"
        >
          <Text fontWeight="bold">Sound Volume</Text>
          {/* You can add a slider here */}
          <Text>50%</Text>
        </HStack>
        <HStack
          justifyContent="space-between"
          alignItems="center"
          p="$3"
          bg="$warmGray100"
          borderRadius="$md"
        >
          <Text fontWeight="bold">Snooze Duration</Text>
          <Text>5 minutes</Text>
        </HStack>
        <Button variant="outline" borderColor="$red500" mt="$4">
          <Icon as={LogOutIcon} color="$red500" size="md" />
          <ButtonText color="$red500" ml="$2">
            Reset All Alarms
          </ButtonText>
        </Button>
        <Text fontSize="$sm" color="$textLight" textAlign="center">
          Version 1.0.0
        </Text>
      </VStack>
    </Box>
  );
}
