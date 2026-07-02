// app/add-alarm.tsx
import {
  Box,
  Button,
  ButtonText,
  ChevronLeftIcon,
  HStack,
  Heading,
  Icon,
  Input,
  InputField,
  Switch,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { DayPicker } from "../components/DayPicker";
import { SoundSelector } from "../components/SoundSelector";
import { useAlarms } from "../context/AlarmsContext";

export default function AddAlarmScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { addAlarm, updateAlarm, alarms } = useAlarms();
  const alarmId = route.params?.alarmId;
  const existingAlarm = alarmId ? alarms.find((a) => a.id === alarmId) : null;

  const [time, setTime] = useState(existingAlarm?.time || "06:30");
  const [label, setLabel] = useState(existingAlarm?.label || "");
  const [repeatDays, setRepeatDays] = useState<number[]>(
    existingAlarm?.repeatDays || [],
  );
  const [sound, setSound] = useState(existingAlarm?.sound || "birds");
  const [vibrate, setVibrate] = useState(existingAlarm?.vibrate ?? true);
  const [sunrise, setSunrise] = useState(existingAlarm?.sunrise ?? false);
  const [showPicker, setShowPicker] = useState(false);

  const handleSave = () => {
    const alarmData = {
      time,
      label: label || "Alarm",
      repeatDays: repeatDays.length > 0 ? repeatDays : [0, 1, 2, 3, 4, 5, 6],
      sound,
      vibrate,
      enabled: true,
      sunrise,
    };
    if (existingAlarm) {
      updateAlarm(existingAlarm.id, alarmData);
    } else {
      addAlarm(alarmData);
    }
    navigation.goBack();
  };

  return (
    <Box flex={1} bg="$backgroundLight">
      <VStack flex={1}>
        <HStack alignItems="center">
          <Button onPress={() => navigation.goBack()}>
            <Icon as={ChevronLeftIcon} color="$primary500" />
          </Button>
          <Heading>{existingAlarm ? "Edit Alarm" : "Add Alarm"}</Heading>
        </HStack>

        {/* Time Picker */}
        <Box bg="$primary50" p="$6" borderRadius="$lg" alignItems="center">
          <Button onPress={() => setShowPicker(true)}>
            <Heading color="$primary600">{time}</Heading>
          </Button>
          {showPicker && (
            <DateTimePicker
              value={new Date(`2000-01-01T${time}:00`)}
              mode="time"
              is24Hour={false}
              onChange={(event, selectedDate) => {
                setShowPicker(false);
                if (selectedDate) {
                  const hours = String(selectedDate.getHours()).padStart(
                    2,
                    "0",
                  );
                  const minutes = String(selectedDate.getMinutes()).padStart(
                    2,
                    "0",
                  );
                  setTime(`${hours}:${minutes}`);
                }
              }}
            />
          )}
        </Box>

        <Input>
          <InputField
            placeholder="Alarm Label"
            value={label}
            onChangeText={setLabel}
          />
        </Input>

        <DayPicker selectedDays={repeatDays} onToggleDay={setRepeatDays} />

        <SoundSelector selectedSound={sound} onSelect={setSound} />

        <HStack justifyContent="space-between" alignItems="center">
          <Text fontWeight="bold">Vibrate</Text>
          <Switch
            value={vibrate}
            onValueChange={setVibrate}
            trackColor={{ true: "$primary500" }}
          />
        </HStack>

        <HStack justifyContent="space-between" alignItems="center">
          <Text fontWeight="bold">Sunrise Mode (gradual increase)</Text>
          <Switch
            value={sunrise}
            onValueChange={setSunrise}
            trackColor={{ true: "$primary500" }}
          />
        </HStack>

        <Button bg="$primary500" onPress={handleSave} mt="auto">
          <ButtonText>
            {existingAlarm ? "Update Alarm" : "Create Alarm"}
          </ButtonText>
        </Button>
      </VStack>
    </Box>
  );
}
