// components/AlarmCard.tsx
import { Switch } from "@gluestack-ui/themed";
import React from "react";
import { Pressable, Text, View } from "react-native";
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
    <View
      className={`p-4 rounded-lg border ${alarm.enabled ? "bg-white border-primary/30" : "bg-muted border-border"}`}
      style={{ opacity: alarm.enabled ? 1 : 0.6 }}
    >
      <View className="flex-row justify-between items-center">
        <View className="flex-1 gap-2">
          <View className="flex-row gap-2 items-center">
            <Text
              className={`text-2xl font-bold ${alarm.enabled ? "text-primary" : "text-foreground"}`}
            >
              {alarm.time}
            </Text>
            {alarm.sunrise && (
              <View className="bg-orange-100 px-2 py-1 rounded-sm">
                <Text className="text-xs text-orange-600">🌅 Sunrise</Text>
              </View>
            )}
          </View>
          <Text className="text-sm">{alarm.label}</Text>
          <Text className="text-xs text-muted-foreground">{repeatStr}</Text>
          <View className="flex-row gap-2 items-center">
            {alarm.vibrate && <Text className="text-xs">🔔</Text>}
            <Text className="text-xs text-muted-foreground">
              Sound: {alarm.sound}
            </Text>
          </View>
        </View>
        <View className="gap-4 items-center">
          <Switch
            value={alarm.enabled}
            onValueChange={() => onToggle(alarm.id)}
            trackColor={{ true: "#F89220", false: "#D1CAC2" }}
          />
          <View className="flex-row gap-2">
            <Pressable
              className="p-1 border border-border rounded"
              onPress={() => onEdit(alarm.id)}
            >
              <Text className="text-xs">✏️</Text>
            </Pressable>
            <Pressable
              className="p-1 border border-border rounded"
              onPress={() => onDelete(alarm.id)}
            >
              <Text className="text-xs">🗑️</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
