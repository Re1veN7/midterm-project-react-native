import React from "react";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import JobFinder from "../screens/JobFinder";
import SavedJobs from "../screens/SavedJobs";
import ApplyForm from "../screens/ApplyForm";
import { Job } from "../types";
import { useJobStore } from "../store/useJobStore";
import { StatusBar } from "expo-status-bar";

// Define the parameter list for our stack
export type RootStackParamList = {
  JobFinder: undefined;
  SavedJobs: undefined;
  ApplyForm: { job: Job; formScreen: "JobFinder" | "SavedJobs" };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { isDarkMode } = useJobStore();

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={isDarkMode ? "#1f2937" : "#fff"}
      />

      <Stack.Navigator
        initialRouteName="JobFinder"
        screenOptions={{
          headerStyle: {
            backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
          },
          headerTintColor: isDarkMode ? "#fff" : "#1f2937",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="JobFinder"
          component={JobFinder}
          options={{ title: "Find Jobs" }}
        />
        <Stack.Screen
          name="SavedJobs"
          component={SavedJobs}
          options={{ title: "My Saved Jobs" }}
        />
        <Stack.Screen
          name="ApplyForm"
          component={ApplyForm}
          options={{
            title: "Apply Now",
            presentation: "modal",
            headerStyle: {
              backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
