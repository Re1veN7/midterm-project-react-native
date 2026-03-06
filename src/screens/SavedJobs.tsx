import React from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
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
  const { savedJobs, isDarkMode } = useJobStore();

  const handleApply = (job: Job) => {
    navigation.navigate("ApplyForm", { job, formScreen: "SavedJobs" });
  };

  return (
    <View className={`flex-1 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* --- Premium Header --- */}
      <View className="px-5 pt-6 pb-4 flex-row items-center justify-between">
        <View>
          <Text
            className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
          >
            Your Collection
          </Text>
          <Text
            className={`text-2xl font-bold mt-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}
          >
            Saved Jobs
          </Text>
        </View>
        <View
          className={`p-3 rounded-full ${isDarkMode ? "bg-gray-800" : "bg-white shadow-sm border border-gray-100"}`}
        >
          <Ionicons name="bookmarks" size={24} color="#3b82f6" />
        </View>
      </View>

      <FlatList
        data={savedJobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <JobCard job={item} onApply={handleApply} isSavedScreen={true} />
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="items-center justify-center mt-20 px-8">
            {/* Big Placeholder Icon */}
            <View
              className={`p-6 rounded-full mb-5 ${isDarkMode ? "bg-gray-800" : "bg-blue-50"}`}
            >
              <Ionicons
                name="bookmark-outline"
                size={56}
                color={isDarkMode ? "#4b5563" : "#3b82f6"}
              />
            </View>

            <Text
              className={`text-xl font-bold text-center ${isDarkMode ? "text-white" : "text-gray-900"}`}
            >
              No saved jobs yet
            </Text>

            <Text
              className={`text-base mt-2 text-center leading-6 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
            >
              Jobs you save will appear here. Find your dream job and bookmark
              it for later!
            </Text>

            {/* Quick action button to go back to searching */}
            <TouchableOpacity
              onPress={() => navigation.popToTop()} // CHANGED TO PREVENT PAGE STACKING
              className="mt-8 bg-blue-600 px-6 py-4 rounded-2xl flex-row items-center shadow-md shadow-blue-500/30"
            >
              <Ionicons name="search" size={20} color="#fff" />
              <Text className="text-white text-base font-bold ml-2">
                Browse Jobs
              </Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
}
