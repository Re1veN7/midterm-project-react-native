import React from "react";
import { View, Text, TextInput, TextInputProps } from "react-native";

interface FormInputProps extends TextInputProps {
  label: string;
  error?: string;
  isDarkMode: boolean;
}

export default function FormInput({
  label,
  error,
  isDarkMode,
  ...props
}: FormInputProps) {
  return (
    <View className="mb-4">
      {/* Explicit label text color */}
      <Text
        className={`font-semibold mb-1 ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}
      >
        {label}
      </Text>
      <TextInput
        className={`px-4 py-3 rounded-lg border ${
          error
            ? "border-red-500 bg-red-50"
            : isDarkMode
              ? "border-gray-600 bg-gray-800 text-white" // Dark mode input styling
              : "border-gray-300 bg-gray-50 text-black" // Light mode input styling
        }`}
        placeholderTextColor={isDarkMode ? "#9ca3af" : "#6b7280"}
        {...props}
      />
      {error ? (
        <Text className="text-red-500 text-sm mt-1">{error}</Text>
      ) : null}
    </View>
  );
}
