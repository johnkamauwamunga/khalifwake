// app/(tabs)/_layout.tsx
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Icon,
  HomeIcon,
  AlignLeftIcon,
  MusicIcon,
  BarChart2Icon,
  SettingsIcon,
} from "@gluestack-ui/themed";
import HomeScreen from "./home";
import AlarmsScreen from "./alarms";
import SoundsScreen from "./sounds";
import StatsScreen from "./stats";
import SettingsScreen from "./settings";

const Tab = createBottomTabNavigator();

export default function TabsLayout() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = HomeIcon;
          else if (route.name === "Alarms") iconName = AlignLeftIcon;
          else if (route.name === "Sounds") iconName = MusicIcon;
          else if (route.name === "Stats") iconName = BarChart2Icon;
          else if (route.name === "Settings") iconName = SettingsIcon;
          return <Icon as={iconName} color={color} size="lg" />;
        },
        tabBarActiveTintColor: "$primary500",
        tabBarInactiveTintColor: "$warmGray400",
        tabBarStyle: {
          backgroundColor: "$warmGray50",
          borderTopColor: "$warmGray200",
          paddingBottom: 6,
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
