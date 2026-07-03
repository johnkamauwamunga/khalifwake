// app/(tabs)/settings.tsx
import { Switch } from "@gluestack-ui/themed";
import React from "react";
import { Pressable, Text, View } from "react-native";

export default function SettingsScreen() {
  return (
    <View className="flex-1 bg-background p-4">
      <View className="gap-4">
        <Text className="text-xl font-bold">Settings</Text>
        <View className="flex-row justify-between items-center p-3 bg-muted rounded-md">
          <Text className="font-bold">Vibration</Text>
          <Switch value={true} trackColor={{ true: "#F89220" }} />
        </View>
        <View className="flex-row justify-between items-center p-3 bg-muted rounded-md">
          <Text className="font-bold">Sound Volume</Text>
          {/* You can add a slider here */}
          <Text>50%</Text>
        </View>
        <View className="flex-row justify-between items-center p-3 bg-muted rounded-md">
          <Text className="font-bold">Snooze Duration</Text>
          <Text>5 minutes</Text>
        </View>
        <Pressable className="border border-red-500 rounded-md p-3 mt-4">
          <Text className="text-red-500 text-center font-medium">
            Reset All Alarms
          </Text>
        </Pressable>
        <Text className="text-sm text-muted-foreground text-center">
          Version 1.0.0
        </Text>
      </View>
    </View>
  );
}
