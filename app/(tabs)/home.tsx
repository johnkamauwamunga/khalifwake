// app/(tabs)/home.tsx
import {
  Box,
  HStack,
  Heading,
  Icon,
  SunIcon,
  Text,
  VStack
} from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import { useAlarms } from "../../context/AlarmsContext";

export default function HomeScreen() {
  const { getNextAlarm } = useAlarms();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [nextAlarm, setNextAlarm] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setNextAlarm(getNextAlarm());
  }, [currentTime]);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });

  const dayNames = ["S", "M", "T", "W", "T", "F", "S"];
  const todayIndex = currentTime.getDay();

  return (
    <Box flex={1} bg="$backgroundLight" p="$5">
      <VStack space="xl" flex={1}>
        {/* Header */}
        <HStack justifyContent="space-between" alignItems="center">
          <VStack>
            <Heading size="2xl">Good Morning, John</Heading>
            <Text fontSize="$2xl" fontWeight="bold" color="$primary600">
              {formatTime(currentTime)}
            </Text>
            <Text fontSize="$md" color="$textLight">
              {formatDate(currentTime)}
            </Text>
          </VStack>
          <Box bg="$primary100" p="$2" borderRadius="$full">
            <Icon as={SunIcon} color="$primary500" size="xl" />
          </Box>
        </HStack>

        {/* Upcoming Alarm */}
        {nextAlarm && (
          <Box
            bg="$primary50"
            p="$4"
            borderRadius="$lg"
            borderWidth={1}
            borderColor="$primary200"
          >
            <VStack space="sm">
              <Text
                fontSize="$xs"
                fontWeight="bold"
                color="$primary600"
                letterSpacing={1}
              >
                UPCOMING ALARM
              </Text>
              <Heading size="xl">{nextAlarm.label}</Heading>
              <Heading size="3xl" color="$primary600">
                {nextAlarm.time}
              </Heading>
              <HStack space="sm">
                {dayNames.map((day, i) => (
                  <Box
                    key={i}
                    bg={i === todayIndex ? "$primary500" : "transparent"}
                    px="$2"
                    py="$1"
                    borderRadius="$sm"
                  >
                    <Text
                      color={i === todayIndex ? "$white" : "$textLight"}
                      fontWeight="bold"
                    >
                      {day}
                    </Text>
                  </Box>
                ))}
              </HStack>
            </VStack>
          </Box>
        )}

        {/* Feature Highlights (description) */}
        <VStack space="md">
          <Box bg="$warmGray100" p="$4" borderRadius="$lg">
            <Heading size="sm" color="$primary600">
              1. HOME
            </Heading>
            <Text>Shows current time, upcoming alarm and other alarms.</Text>
          </Box>
          <Box bg="$warmGray100" p="$4" borderRadius="$lg">
            <Heading size="sm" color="$primary600">
              2. ALARMS LIST
            </Heading>
            <Text>
              View all your alarms with details and enable / disable them.
            </Text>
          </Box>
          <Box bg="$warmGray100" p="$4" borderRadius="$lg">
            <Heading size="sm" color="$primary600">
              3. ADD / EDIT ALARM
            </Heading>
            <Text>
              Set the time, repeat days, sound, vibration, label and more.
            </Text>
          </Box>
        </VStack>

        <Spacer />
      </VStack>
    </Box>
  );
}
