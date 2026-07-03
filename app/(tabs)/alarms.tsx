// app/(tabs)/alarms.tsx
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { AlarmCard } from "../../components/AlarmCard";
import { useAlarms } from "../../context/AlarmsContext";

export default function AlarmsScreen() {
  const { alarms, toggleAlarm, deleteAlarm } = useAlarms();
  const router = useRouter();

  return (
    <View className="flex-1 bg-background p-4">
      <View className="flex-1 gap-4">
        <Text className="text-xl font-bold">My Alarms</Text>
        {alarms.length === 0 ? (
          <View className="flex-1 justify-center items-center">
            <Text className="text-muted-foreground">
              No alarms set. Tap + to add one.
            </Text>
          </View>
        ) : (
          <FlatList
            data={alarms}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <AlarmCard
                alarm={item}
                onToggle={toggleAlarm}
                onEdit={(id) =>
                  router.push({
                    pathname: "/add-alarm",
                    params: { alarmId: id },
                  })
                }
                onDelete={deleteAlarm}
              />
            )}
            contentContainerStyle={{ gap: 12, paddingBottom: 20 }}
          />
        )}
        <Pressable
          className="bg-primary p-3 rounded-lg mt-auto"
          onPress={() => router.push("/add-alarm")}
        >
          <View className="flex-row items-center justify-center">
            <Text className="text-white text-base font-medium">
              + Add New Alarm
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
