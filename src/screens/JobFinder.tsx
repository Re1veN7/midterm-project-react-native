import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { fetchJobs } from '../api/emplloApi';
import { useJobStore } from '../store/useJobStore';
import JobCard from '../components/JobCard';
import SearchBar from '../components/SearchBar';
import { Job } from '../types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'JobFinder'>;

export default function JobFinder() {
  const navigation = useNavigation<NavigationProp>();
  const { jobs, setJobs, isDarkMode, toggleDarkMode } = useJobStore();
  
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch jobs when the screen loads
  useEffect(() => {
    const loadJobs = async () => {
      const fetchedJobs = await fetchJobs();
      setJobs(fetchedJobs);
      setLoading(false);
    };
    loadJobs();
  }, [setJobs]);

  // Filter jobs based on the search query
  const filteredJobs = jobs.filter((job) => {
    const query = searchQuery.toLowerCase();
    const titleMatch = job.title?.toLowerCase().includes(query) || false;
    const companyMatch = job.company?.toLowerCase().includes(query) || false;
    return titleMatch || companyMatch;
  });

  const handleApply = (job: Job) => {
    navigation.navigate('ApplyForm', { job, formScreen: 'JobFinder' });
  };

  if (loading) {
    return (
      <View className={`flex-1 items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <View className={`flex-1 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header controls for Navigation and Theme Toggle */}
      <View className="flex-row justify-between items-center px-4 py-3">
        <TouchableOpacity 
          onPress={() => navigation.navigate('SavedJobs')} 
          className="bg-blue-100 dark:bg-blue-900 px-4 py-2 rounded-lg"
        >
           <Text className="text-blue-800 dark:text-blue-200 font-bold">Saved Jobs</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleDarkMode} className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg">
           <Text className="text-gray-800 dark:text-white font-bold">
             {isDarkMode ? 'Light Mode' : 'Dark Mode'}
           </Text>
        </TouchableOpacity>
      </View>

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <FlatList
        data={filteredJobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <JobCard job={item} onApply={handleApply} />}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={<Text className="text-center mt-10 text-gray-500 dark:text-gray-400">No jobs found.</Text>}
      />
    </View>
  );
}