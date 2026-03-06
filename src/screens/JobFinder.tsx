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
import { Ionicons } from '@expo/vector-icons'; // Added for icons

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'JobFinder'>;

export default function JobFinder() {
  const navigation = useNavigation<NavigationProp>();
  const { jobs, setJobs, isDarkMode, toggleDarkMode } = useJobStore();
  
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadJobs = async () => {
      const fetchedJobs = await fetchJobs();
      setJobs(fetchedJobs);
      setLoading(false);
    };
    loadJobs();
  }, [setJobs]);

  const filteredJobs = jobs.filter((job) => {
    const query = searchQuery.toLowerCase();
    const titleMatch = job.title?.toLowerCase().includes(query) || false;
    const companyMatch = job.company?.toLowerCase().includes(query) || false;
    return titleMatch || companyMatch;
  });

  const handleApply = (job: Job) => {
    navigation.navigate('ApplyForm', { job, fromScreen: 'JobFinder' });
  };

  if (loading) {
    return (
      <View className={`flex-1 items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <View className={`flex-1 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      
      {/* --- REDESIGNED HEADER --- */}
      <View className="px-4 pt-6 pb-2 flex-row justify-between items-center">
        <View>
          <Text className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Hello there,
          </Text>
          <Text className={`text-2xl font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Find Great Jobs
          </Text>
        </View>

        <View className="flex-row items-center space-x-3">
          {/* Saved Jobs Icon Button */}
          <TouchableOpacity 
            onPress={() => navigation.navigate('SavedJobs')} 
            className={`p-3 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow-sm border border-gray-100'}`}
          >
            <Ionicons name="bookmark" size={20} color="#3b82f6" />
          </TouchableOpacity>

          {/* Theme Toggle Icon Button */}
          <TouchableOpacity 
            onPress={toggleDarkMode} 
            className={`p-3 rounded-full ml-3 ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow-sm border border-gray-100'}`}
          >
            <Ionicons 
              name={isDarkMode ? 'sunny' : 'moon'} 
              size={20} 
              color={isDarkMode ? '#fbbf24' : '#4b5563'} 
            />
          </TouchableOpacity>
        </View>
      </View>

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <FlatList
        data={filteredJobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <JobCard job={item} onApply={handleApply} />}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="items-center justify-center mt-10">
            <Ionicons name="search" size={48} color={isDarkMode ? '#374151' : '#d1d5db'} />
            <Text className={`text-center mt-4 text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              No jobs match your search.
            </Text>
          </View>
        }
      />
    </View>
  );
}