import React from "react";
import { View, FlatList, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { useJobStore } from "../store/useJobStore";
import JobCard from "../components/JobCard";
import { Job } from "../types";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "SavedJobs"
>;

export default function SavedJobs() {
  const navigation = useNavigation<NavigationProp>();

  // Pull our saved jobs and dark mode state from Zustand
  const { savedJobs, isDarkMode } = useJobStore();

  const handleApply = (job: Job) => {
    navigation.navigate("ApplyForm", { job, formScreen: "SavedJobs" });
  };

  return (
    <View
      className={`flex-1 pt-4 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <FlatList
        data={savedJobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <JobCard
            job={item}
            onApply={handleApply}
            isSavedScreen={true} // Pass the flag so the Remove button shows!
          />
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <View className="items-center justify-center mt-20 px-4">
            <Text
              className={`text-lg text-center ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
            >
              You haven't saved any jobs yet.
            </Text>
            <Text
              className={`text-sm mt-2 text-center ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}
            >
              Go back to the Job Finder and tap "Save Job" on a listing you
              like!
            </Text>
          </View>
        }
      />
    </View>
  );
}
