import React from 'react';
import { View, TextInput } from 'react-native';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function SearchBar({ searchQuery, setSearchQuery }: SearchBarProps) {
  return (
    <View className="px-4 py-3 bg-white dark:bg-gray-900">
      <TextInput
        className="bg-gray-100 dark:bg-gray-800 text-black dark:text-white px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700"
        placeholder="Search jobs by title or company..."
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </View>
  );
}