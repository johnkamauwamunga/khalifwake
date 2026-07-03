// app/(tabs)/stats.tsx
import React from "react";
import { Text, View } from "react-native";
import { useAlarms } from "../../context/AlarmsContext";

export default function StatsScreen() {
  const { alarms } = useAlarms();
  const total = alarms.length;
  const enabled = alarms.filter((a) => a.enabled).length;
  const disabled = total - enabled;

  return (
    <View className="flex-1 bg-background p-4">
      <View className="gap-6">
        <Text className="text-xl font-bold">Alarm Statistics</Text>
        <View className="flex-row gap-4 justify-around">
          <View className="bg-primary/10 p-4 rounded-lg items-center flex-1">
            <Text className="text-3xl">⏰</Text>
            <Text className="text-3xl font-bold">{total}</Text>
            <Text>Total Alarms</Text>
          </View>
          <View className="bg-green-100 p-4 rounded-lg items-center flex-1">
            <Text className="text-3xl">✅</Text>
            <Text className="text-3xl font-bold">{enabled}</Text>
            <Text>Enabled</Text>
          </View>
          <View className="bg-red-100 p-4 rounded-lg items-center flex-1">
            <Text className="text-3xl">❌</Text>
            <Text className="text-3xl font-bold">{disabled}</Text>
            <Text>Disabled</Text>
          </View>
        </View>
        <View className="bg-muted p-4 rounded-lg">
          <Text className="text-sm font-bold mb-2">Upcoming Alarm</Text>
          <Text>Tomorrow at 6:30 AM (Sunrise)</Text>
        </View>
        {/* Add more stats: most used sound, average time, etc. */}
      </View>
    </View>
  );
}
