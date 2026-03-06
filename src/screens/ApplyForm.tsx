import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useJobStore } from '../store/useJobStore';
import FormInput from '../components/FormInput';
import { isValidEmail, isValidContactNumber, hasNumbers, isValidNameFormat } from '../utils/validation';

type ApplyFormRouteProp = RouteProp<RootStackParamList, 'ApplyForm'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ApplyForm'>;

export default function ApplyForm() {
  const route = useRoute<ApplyFormRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { job, fromScreen } = route.params;
  const { isDarkMode } = useJobStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [whyHireYou, setWhyHireYou] = useState('');
  const [errors, setErrors] = useState({ name: '', email: '', contact: '', whyHireYou: '' });

  // --- UPGRADED STRICT VALIDATIONS ---
  const validateForm = () => {
    let valid = true;
    let newErrors = { name: '', email: '', contact: '', whyHireYou: '' };

    // 1. Name Validations
    if (!name.trim()) {
      newErrors.name = 'Full name is required';
      valid = false;
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
      valid = false;
    } else if (hasNumbers(name)) {
      newErrors.name = 'Name cannot contain numbers';
      valid = false;
    } else if (!isValidNameFormat(name)) {
      newErrors.name = 'Name contains invalid special characters';
      valid = false;
    }

    // 2. Email Validations
    if (!email.trim()) {
      newErrors.email = 'Email address is required';
      valid = false;
    } else if (!isValidEmail(email.trim())) {
      newErrors.email = 'Please enter a valid email format (e.g., user@mail.com)';
      valid = false;
    }

    // 3. Contact Number Validations
    if (!contact.trim()) {
      newErrors.contact = 'Contact number is required';
      valid = false;
    } else if (!isValidContactNumber(contact.trim())) {
      newErrors.contact = 'Please enter a valid 10-11 digit numeric contact number';
      valid = false;
    }

    // 4. "Why Hire You" Validations
    if (!whyHireYou.trim()) {
      newErrors.whyHireYou = 'Please tell us why we should hire you';
      valid = false;
    } else if (whyHireYou.trim().length < 30) {
      newErrors.whyHireYou = `Please provide more detail (minimum 30 characters). Currently: ${whyHireYou.trim().length} characters.`;
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      Alert.alert(
        "Application Sent! 🎉",
        `Your application for ${job.title} at ${job.company} has been successfully submitted.`,
        [
          {
            text: "Awesome!",
            onPress: () => {
              setName(''); setEmail(''); setContact(''); setWhyHireYou('');
              if (fromScreen === 'SavedJobs') {
                navigation.navigate('JobFinder');
              } else {
                navigation.goBack();
              }
            }
          }
        ]
      );
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className={`flex-1 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}
    >
      <ScrollView contentContainerStyle={{ padding: 24 }} showsVerticalScrollIndicator={false}>
        
        {/* Header Summary Card */}
        <View className={`mb-8 p-6 rounded-3xl border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-blue-50 border-blue-100'}`}>
          <View className="flex-row items-center mb-2">
            <Ionicons name="briefcase" size={20} color={isDarkMode ? '#60a5fa' : '#3b82f6'} />
            <Text className={`ml-2 text-lg font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
              Applying For
            </Text>
          </View>
          <Text className={`text-2xl font-extrabold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {job.title}
          </Text>
          <Text className={`text-base font-medium mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            at {job.company}
          </Text>
        </View>

        {/* Form Inputs */}
        <FormInput label="Full Name" placeholder="e.g. John Doe" value={name} onChangeText={setName} error={errors.name} isDarkMode={isDarkMode} />
        <FormInput label="Email Address" placeholder="e.g. john@example.com" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" error={errors.email} isDarkMode={isDarkMode} />
        <FormInput label="Contact Number" placeholder="e.g. 09123456789" value={contact} onChangeText={setContact} keyboardType="numeric" maxLength={11} error={errors.contact} isDarkMode={isDarkMode} />
        
        <FormInput 
          label="Why should we hire you?" 
          placeholder="Tell us about your skills, experience, and passion (min 30 characters)..." 
          value={whyHireYou} 
          onChangeText={setWhyHireYou} 
          multiline 
          numberOfLines={5} 
          style={{ height: 120, textAlignVertical: 'top' }} 
          error={errors.whyHireYou} 
          isDarkMode={isDarkMode} 
        />

        {/* Submit Button */}
        <TouchableOpacity 
          onPress={handleSubmit} 
          className="bg-blue-600 py-4 rounded-2xl flex-row justify-center items-center mt-6 shadow-md shadow-blue-500/30"
        >
          <Text className="text-white text-lg font-bold mr-2">Submit Application</Text>
          <Ionicons name="paper-plane" size={20} color="#ffffff" />
        </TouchableOpacity>
        
        <View className="h-10" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}