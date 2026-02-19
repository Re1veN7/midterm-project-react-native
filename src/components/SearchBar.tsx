import React from "react";
import { View, TextInput } from "react-native";
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
    <View className={`px-4 py-3 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
      <TextInput
        className={`px-4 py-3 rounded-lg border ${
          isDarkMode
            ? "bg-gray-800 border-gray-700 text-white"
            : "bg-gray-100 border-gray-300 text-black"
        }`}
        placeholder="Search jobs by title or company..."
        placeholderTextColor={isDarkMode ? "#9ca3af" : "#888"}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </View>
  );
}
