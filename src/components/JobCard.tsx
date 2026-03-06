import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Job } from '../types';
import { useJobStore } from '../store/useJobStore';

interface JobCardProps {
  job: Job;
  onApply: (job: Job) => void;
  isSavedScreen?: boolean;
}

export default function JobCard({ job, onApply, isSavedScreen = false }: JobCardProps) {
  const { savedJobs, saveJob, removeSavedJob, appliedJobs, isDarkMode } = useJobStore();
  
  const isSaved = savedJobs.some((saved) => saved.id === job.id);
  const hasApplied = appliedJobs.includes(job.id); // Check if applied!

  // --- NEW: Confirmation Prompts ---
  const handleSave = () => {
    Alert.alert(
      "Save Job",
      "Do you want to save this job?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Yes", onPress: () => saveJob(job) }
      ]
    );
  };

  const handleRemove = () => {
    Alert.alert(
      "Remove Job",
      "Do you want to remove this job?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Yes", style: "destructive", onPress: () => removeSavedJob(job.id) }
      ]
    );
  };

  return (
    <View className={`p-5 m-2 mx-4 rounded-2xl shadow-sm border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
      
      {/* Top Row: Job Title */}
      <View className="flex-row justify-between items-start mb-3">
        <Text className={`flex-1 text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`} numberOfLines={2}>
          {job.title || 'Untitled Job'}
        </Text>
      </View>

      {/* Middle Row: Icons + Details */}
      <View className="mb-5">
        <View className="flex-row items-center mb-2">
          <Ionicons name="business-outline" size={16} color={isDarkMode ? '#9ca3af' : '#6b7280'} />
          <Text className={`ml-2 text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{job.company || 'Unknown Company'}</Text>
        </View>

        <View className="flex-row items-center mt-1">
          {job.location ? (
            <View className="flex-row items-center mr-4">
              <Ionicons name="location-outline" size={16} color={isDarkMode ? '#9ca3af' : '#6b7280'} />
              <Text className={`ml-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{job.location}</Text>
            </View>
          ) : null}

          {job.salary ? (
            <View className="flex-row items-center">
              <Ionicons name="cash-outline" size={16} color={isDarkMode ? '#34d399' : '#059669'} />
              <Text className={`ml-1 font-semibold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>{job.salary}</Text>
            </View>
          ) : null}
        </View>
      </View>

      {/* Bottom Row: Action Buttons */}
      <View className="flex-row justify-between pt-4 border-t" style={{ borderTopColor: isDarkMode ? '#374151' : '#f3f4f6' }}>
        
        {/* Conditional Save/Remove Button */}
        {isSavedScreen ? (
          <TouchableOpacity
            onPress={handleRemove}
            className={`flex-1 mr-2 py-3 rounded-xl flex-row items-center justify-center ${isDarkMode ? 'bg-red-900/20' : 'bg-red-50'}`}
          >
            <Ionicons name="trash-outline" size={18} color={isDarkMode ? '#f87171' : '#dc2626'} />
            <Text className={`ml-2 font-bold ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>Remove</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleSave}
            disabled={isSaved}
            className={`flex-1 mr-2 py-3 rounded-xl flex-row items-center justify-center border ${
              isSaved 
                ? isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-200' 
                : isDarkMode ? 'bg-transparent border-blue-500' : 'bg-transparent border-blue-500'
            }`}
          >
            <Ionicons name={isSaved ? "bookmark" : "bookmark-outline"} size={18} color={isSaved ? (isDarkMode ? '#9ca3af' : '#6b7280') : '#3b82f6'} />
            <Text className={`ml-2 font-bold ${isSaved ? (isDarkMode ? 'text-gray-400' : 'text-gray-500') : 'text-blue-500'}`}>
              {isSaved ? 'Saved' : 'Save'}
            </Text>
          </TouchableOpacity>
        )}

        {/* Apply Button */}
        <TouchableOpacity
          onPress={() => onApply(job)}
          disabled={hasApplied}
          className={`flex-1 ml-2 py-3 rounded-xl flex-row items-center justify-center shadow-sm ${
            hasApplied ? (isDarkMode ? 'bg-gray-700' : 'bg-gray-400') : 'bg-blue-600'
          }`}
        >
          <Text className="text-white font-bold mr-2">{hasApplied ? 'Applied' : 'Apply Now'}</Text>
          {!hasApplied && <Ionicons name="arrow-forward" size={18} color="#ffffff" />}
          {hasApplied && <Ionicons name="checkmark-circle" size={18} color="#ffffff" />}
        </TouchableOpacity>
      </View>
    </View>
  );
}