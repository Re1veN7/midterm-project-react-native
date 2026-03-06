import React from "react";
import { View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useJobStore } from "../store/useJobStore";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function SearchBar({
  searchQuery,
  setSearchQuery,
}: SearchBarProps) {
  const { isDarkMode } = useJobStore();

  return (
    <View className={`px-4 py-4 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <View
        className={`flex-row items-center px-4 py-3 rounded-2xl border ${
          isDarkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200 shadow-sm"
        }`}
      >
        <Ionicons
          name="search-outline"
          size={20}
          color={isDarkMode ? "#9ca3af" : "#6b7280"}
          style={{ marginRight: 8 }}
        />
        <TextInput
          className={`flex-1 text-base ${isDarkMode ? "text-white" : "text-gray-900"}`}
          placeholder="Search for your dream job..."
          placeholderTextColor={isDarkMode ? "#9ca3af" : "#9ca3af"}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
    </View>
  );
}