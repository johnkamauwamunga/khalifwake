// app/(tabs)/home.tsx
import React, { useEffect, useState } from "react";
import { Text as RNText, View } from "react-native";
import { Alarm, useAlarms } from "../../context/AlarmsContext";

export default function HomeScreen() {
  const { getNextAlarm } = useAlarms();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [nextAlarm, setNextAlarm] = useState<Alarm | null>(null);

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
    <View className="flex-1 bg-background p-5">
      <View className="flex-1 justify-between">
        {/* Header */}
        <View className="flex-row justify-between items-center">
          <View>
            <RNText className="text-3xl font-bold text-foreground">
              Good Morning, John
            </RNText>
            <RNText className="text-2xl font-bold text-primary">
              {formatTime(currentTime)}
            </RNText>
            <RNText className="text-base text-muted-foreground">
              {formatDate(currentTime)}
            </RNText>
          </View>
          <View className="bg-primary/20 p-2 rounded-full">
            <RNText className="text-3xl">☀️</RNText>
          </View>
        </View>

        {/* Upcoming Alarm */}
        {nextAlarm && (
          <View className="bg-primary/10 p-4 rounded-lg border border-primary/30">
            <View className="gap-2">
              <RNText className="text-xs font-bold text-primary tracking-wider">
                UPCOMING ALARM
              </RNText>
              <RNText className="text-xl font-bold">{nextAlarm.label}</RNText>
              <RNText className="text-3xl font-bold text-primary">
                {nextAlarm.time}
              </RNText>
              <View className="flex-row gap-2">
                {dayNames.map((day, i) => (
                  <View
                    key={i}
                    className={`px-2 py-1 rounded-sm ${i === todayIndex ? "bg-primary" : "bg-transparent"}`}
                  >
                    <RNText
                      className={`font-bold ${i === todayIndex ? "text-white" : "text-muted-foreground"}`}
                    >
                      {day}
                    </RNText>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}

        {/* Feature Highlights (description) */}
        <View className="gap-4">
          <View className="bg-muted p-4 rounded-lg">
            <RNText className="text-sm font-bold text-primary">1. HOME</RNText>
            <RNText>
              Shows current time, upcoming alarm and other alarms.
            </RNText>
          </View>
          <View className="bg-muted p-4 rounded-lg">
            <RNText className="text-sm font-bold text-primary">
              2. ALARMS LIST
            </RNText>
            <RNText>
              View all your alarms with details and enable / disable them.
            </RNText>
          </View>
          <View className="bg-muted p-4 rounded-lg">
            <RNText className="text-sm font-bold text-primary">
              3. ADD / EDIT ALARM
            </RNText>
            <RNText>
              Set the time, repeat days, sound, vibration, label and more.
            </RNText>
          </View>
        </View>

        <View className="flex-1" />
      </View>
    </View>
  );
}
