// app/(tabs)/stats.tsx
import {
  AlertCircleIcon,
  Box,
  CheckCircleIcon,
  ClockIcon,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import React from "react";
import { useAlarms } from "../../context/AlarmsContext";

export default function StatsScreen() {
  const { alarms } = useAlarms();
  const total = alarms.length;
  const enabled = alarms.filter((a) => a.enabled).length;
  const disabled = total - enabled;

  return (
    <Box flex={1} bg="$backgroundLight" p="$4">
      <VStack space="xl">
        <Heading size="xl">Alarm Statistics</Heading>
        <HStack space="md" justifyContent="space-around">
          <Box
            bg="$primary50"
            p="$4"
            borderRadius="$lg"
            alignItems="center"
            flex={1}
          >
            <Icon as={ClockIcon} color="$primary500" size="xl" />
            <Heading size="xl">{total}</Heading>
            <Text>Total Alarms</Text>
          </Box>
          <Box
            bg="$green50"
            p="$4"
            borderRadius="$lg"
            alignItems="center"
            flex={1}
          >
            <Icon as={CheckCircleIcon} color="$green500" size="xl" />
            <Heading size="xl">{enabled}</Heading>
            <Text>Enabled</Text>
          </Box>
          <Box
            bg="$red50"
            p="$4"
            borderRadius="$lg"
            alignItems="center"
            flex={1}
          >
            <Icon as={AlertCircleIcon} color="$red500" size="xl" />
            <Heading size="xl">{disabled}</Heading>
            <Text>Disabled</Text>
          </Box>
        </HStack>
        <Box bg="$warmGray100" p="$4" borderRadius="$lg">
          <Heading size="sm" mb="$2">
            Upcoming Alarm
          </Heading>
          <Text>Tomorrow at 6:30 AM (Sunrise)</Text>
        </Box>
        {/* Add more stats: most used sound, average time, etc. */}
      </VStack>
    </Box>
  );
}
