// app/(tabs)/_layout.tsx
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BarChart2, Home, List, Music, Settings } from "lucide-react-native";
import React from "react";
import AlarmsScreen from "./alarms";
import HomeScreen from "./home";
import SettingsScreen from "./settings";
import SoundsScreen from "./sounds";
import StatsScreen from "./stats";

const Tab = createBottomTabNavigator();

export default function TabsLayout() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = Home;
          else if (route.name === "Alarms") iconName = List;
          else if (route.name === "Sounds") iconName = Music;
          else if (route.name === "Stats") iconName = BarChart2;
          else if (route.name === "Settings") iconName = Settings;
          return iconName
            ? React.createElement(iconName, { color, size })
            : null;
        },
        tabBarActiveTintColor: "#F89220",
        tabBarInactiveTintColor: "#BDB3A9",
        tabBarStyle: {
          backgroundColor: "#F2EFEB",
          borderTopColor: "#E5E0DA",
          paddingBottom: 6,
        },
        tabBarActiveBackgroundColor: "#FFF8F0",
        tabBarLabelStyle: {
          fontWeight: "600",
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Alarms" component={AlarmsScreen} />
      <Tab.Screen name="Sounds" component={SoundsScreen} />
      <Tab.Screen name="Stats" component={StatsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
