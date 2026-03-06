import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';

interface FormInputProps extends TextInputProps {
  label: string;
  error?: string;
  isDarkMode: boolean;
}

export default function FormInput({ label, error, isDarkMode, ...props }: FormInputProps) {
  return (
    <View className="mb-5">
      <Text className={`font-medium mb-2 ml-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        {label}
      </Text>
      <TextInput
        className={`px-5 py-4 rounded-2xl border text-base ${
          error 
            ? 'border-red-500 bg-red-50 dark:bg-red-900/10 text-red-900 dark:text-red-200' 
            : isDarkMode 
              ? 'border-gray-700 bg-gray-800 text-white' 
              : 'border-gray-200 bg-gray-50 text-gray-900'
        }`}
        placeholderTextColor={isDarkMode ? '#6b7280' : '#9ca3af'}
        {...props}
      />
      {error ? <Text className="text-red-500 text-sm mt-1.5 ml-1">{error}</Text> : null}
    </View>
  );
}