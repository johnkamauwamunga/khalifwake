// context/AlarmsContext.tsx
import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Alarm {
  id: string;
  time: string;
  label: string;
  repeatDays: number[];
  sound: string;
  vibrate: boolean;
  enabled: boolean;
  sunrise: boolean;
}

interface AlarmsContextType {
  alarms: Alarm[];
  addAlarm: (alarm: Omit<Alarm, "id">) => void;
  updateAlarm: (id: string, alarm: Partial<Alarm>) => void;
  deleteAlarm: (id: string) => void;
  toggleAlarm: (id: string) => void;
  getNextAlarm: () => Alarm | null;
}

const AlarmsContext = createContext<AlarmsContextType | undefined>(undefined);

export const AlarmsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [alarms, setAlarms] = useState<Alarm[]>([]);

  useEffect(() => {
    loadAlarms();
  }, []);

  const loadAlarms = async () => {
    try {
      const stored = await AsyncStorage.getItem("alarms");
      if (stored) {
        setAlarms(JSON.parse(stored));
      } else {
        // Default alarms
        const defaults: Alarm[] = [
          {
            id: "1",
            time: "06:30",
            label: "Sunrise",
            repeatDays: [1, 2, 3, 4, 5],
            sound: "birds",
            vibrate: true,
            enabled: true,
            sunrise: true,
          },
          {
            id: "2",
            time: "08:00",
            label: "Weekend",
            repeatDays: [6, 0],
            sound: "ocean",
            vibrate: true,
            enabled: true,
            sunrise: false,
          },
          {
            id: "3",
            time: "09:15",
            label: "Morning",
            repeatDays: [1, 2, 3, 5],
            sound: "forest",
            vibrate: false,
            enabled: true,
            sunrise: false,
          },
          {
            id: "4",
            time: "13:30",
            label: "Afternoon",
            repeatDays: [1, 2, 3],
            sound: "rain",
            vibrate: false,
            enabled: true,
            sunrise: false,
          },
        ];
        setAlarms(defaults);
        await AsyncStorage.setItem("alarms", JSON.stringify(defaults));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const saveAlarms = async (newAlarms: Alarm[]) => {
    setAlarms(newAlarms);
    await AsyncStorage.setItem("alarms", JSON.stringify(newAlarms));
  };

  const addAlarm = (alarm: Omit<Alarm, "id">) => {
    const newAlarm = { ...alarm, id: Date.now().toString() };
    saveAlarms([...alarms, newAlarm]);
  };

  const updateAlarm = (id: string, updates: Partial<Alarm>) => {
    const newAlarms = alarms.map((a) =>
      a.id === id ? { ...a, ...updates } : a,
    );
    saveAlarms(newAlarms);
  };

  const deleteAlarm = (id: string) => {
    saveAlarms(alarms.filter((a) => a.id !== id));
  };

  const toggleAlarm = (id: string) => {
    const alarm = alarms.find((a) => a.id === id);
    if (alarm) updateAlarm(id, { enabled: !alarm.enabled });
  };

  const getNextAlarm = (): Alarm | null => {
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    let next: Alarm | null = null;
    let minDiff = Infinity;
    alarms.forEach((alarm) => {
      if (!alarm.enabled) return;
      const [h, m] = alarm.time.split(":").map(Number);
      const alarmDate = new Date(now);
      alarmDate.setHours(h, m, 0, 0);
      if (alarmDate < now) alarmDate.setDate(alarmDate.getDate() + 1);
      const diff = alarmDate.getTime() - now.getTime();
      if (diff < minDiff) {
        minDiff = diff;
        next = alarm;
      }
    });
    return next;
  };

  return (
    <AlarmsContext.Provider
      value={{
        alarms,
        addAlarm,
        updateAlarm,
        deleteAlarm,
        toggleAlarm,
        getNextAlarm,
      }}
    >
      {children}
    </AlarmsContext.Provider>
  );
};

export const useAlarms = () => {
  const ctx = useContext(AlarmsContext);
  if (!ctx) throw new Error("useAlarms must be inside AlarmsProvider");
  return ctx;
};
