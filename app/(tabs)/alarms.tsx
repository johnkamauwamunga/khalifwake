// app/(tabs)/alarms.tsx
import {
  AddIcon,
  Box,
  Button,
  ButtonText,
  Heading,
  Icon,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList } from "react-native";
import { AlarmCard } from "../../components/AlarmCard";
import { useAlarms } from "../../context/AlarmsContext";

export default function AlarmsScreen() {
  const { alarms, toggleAlarm, deleteAlarm } = useAlarms();
  const navigation = useNavigation();

  return (
    <Box flex={1} bg="$backgroundLight" p="$4">
      <VStack space="md" flex={1}>
        <Heading size="xl">My Alarms</Heading>
        {alarms.length === 0 ? (
          <Box flex={1} justifyContent="center" alignItems="center">
            <Text color="$textLight">No alarms set. Tap + to add one.</Text>
          </Box>
        ) : (
          <FlatList
            data={alarms}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <AlarmCard
                alarm={item}
                onToggle={toggleAlarm}
                onEdit={(id) =>
                  navigation.navigate("AddAlarm", { alarmId: id })
                }
                onDelete={deleteAlarm}
              />
            )}
            contentContainerStyle={{ gap: 12, paddingBottom: 20 }}
          />
        )}
        <Button
          bg="$primary500"
          onPress={() => navigation.navigate("AddAlarm")}
          mt="auto"
        >
          <Icon as={AddIcon} color="$white" size="md" />
          <ButtonText ml="$2">Add New Alarm</ButtonText>
        </Button>
      </VStack>
    </Box>
  );
}
