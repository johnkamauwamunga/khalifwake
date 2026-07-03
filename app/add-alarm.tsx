// app/add-alarm.tsx
import {
  Button,
  ButtonText,
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
import { useLocalSearchParams, useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import React, { useState } from "react";
import { DayPicker } from "../components/DayPicker";
import { SoundSelector } from "../components/SoundSelector";
import { useAlarms } from "../context/AlarmsContext";

export default function AddAlarmScreen() {
  const router = useRouter();
  const { alarmId } = useLocalSearchParams<{ alarmId?: string }>();
  const { addAlarm, updateAlarm, alarms } = useAlarms();
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
    router.back();
  };

  return (
    <VStack className="flex-1 bg-background">
      <HStack className="items-center">
        <Button onPress={() => router.back()}>
          <Icon as={ChevronLeft} className="w-6 h-6 text-primary-500" />
        </Button>
        <Heading>{existingAlarm ? "Edit Alarm" : "Add Alarm"}</Heading>
      </HStack>

      {/* Time Picker */}
      <VStack className="bg-primary-50 p-6 rounded-lg items-center">
        <Button onPress={() => setShowPicker(true)}>
          <Heading className="text-primary-600">{time}</Heading>
        </Button>
        {showPicker && (
          <DateTimePicker
            value={new Date(`2000-01-01T${time}:00`)}
            mode="time"
            is24Hour={false}
            onChange={(event, selectedDate) => {
              setShowPicker(false);
              if (selectedDate) {
                const hours = String(selectedDate.getHours()).padStart(2, "0");
                const minutes = String(selectedDate.getMinutes()).padStart(
                  2,
                  "0",
                );
                setTime(`${hours}:${minutes}`);
              }
            }}
          />
        )}
      </VStack>

      <Input>
        <InputField
          placeholder="Alarm Label"
          value={label}
          onChangeText={setLabel}
        />
      </Input>

      <DayPicker selectedDays={repeatDays} onToggleDay={setRepeatDays} />

      <SoundSelector selectedSound={sound} onSelect={setSound} />

      <HStack className="justify-between items-center">
        <Text className="font-bold">Vibrate</Text>
        <Switch
          value={vibrate}
          onValueChange={setVibrate}
          trackColor={{ true: "#F89220" }}
        />
      </HStack>

      <HStack className="justify-between items-center">
        <Text className="font-bold">Sunrise Mode (gradual increase)</Text>
        <Switch
          value={sunrise}
          onValueChange={setSunrise}
          trackColor={{ true: "#F89220" }}
        />
      </HStack>

      <Button className="bg-primary-500 mt-auto" onPress={handleSave}>
        <ButtonText>
          {existingAlarm ? "Update Alarm" : "Create Alarm"}
        </ButtonText>
      </Button>
    </VStack>
  );
}
