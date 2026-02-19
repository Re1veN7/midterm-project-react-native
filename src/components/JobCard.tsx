import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Job } from '../types';
import { useJobStore } from '../store/useJobStore';

interface JobCardProps {
  job: Job;
  onApply: (job: Job) => void;
}

export default function JobCard({ job, onApply }: JobCardProps) {
  const { savedJobs, saveJob } = useJobStore();
  
  // Check if this specific job is already in the savedJobs array
  const isSaved = savedJobs.some((saved) => saved.id === job.id);

  return (
    <View className="bg-white dark:bg-gray-800 p-4 m-2 mx-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <Text className="text-lg font-bold text-gray-900 dark:text-white">{job.title || 'Untitled Job'}</Text>
      <Text className="text-gray-600 dark:text-gray-300 mt-1">{job.company || 'Unknown Company'}</Text>
      {job.salary ? <Text className="text-green-600 dark:text-green-400 mt-1 font-semibold">{job.salary}</Text> : null}

      <View className="flex-row justify-between mt-4">
        <TouchableOpacity
          onPress={() => saveJob(job)}
          disabled={isSaved}
          className={`flex-1 mr-2 py-2 rounded-lg items-center ${isSaved ? 'bg-gray-400' : 'bg-blue-600'}`}
        >
          <Text className="text-white font-bold">{isSaved ? 'Saved' : 'Save Job'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onApply(job)}
          className="flex-1 ml-2 py-2 rounded-lg items-center bg-green-600"
        >
          <Text className="text-white font-bold">Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}