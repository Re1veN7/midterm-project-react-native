import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { useJobStore } from "../store/useJobStore";
import FormInput from "../components/FormInput";
import { isValidEmail, isValidContactNumber } from "../utils/validation";

type ApplyFormRouteProp = RouteProp<RootStackParamList, "ApplyForm">;
type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ApplyForm"
>;

export default function ApplyForm() {
  const route = useRoute<ApplyFormRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { job, fromScreen } = route.params;
  const { isDarkMode } = useJobStore();

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [whyHireYou, setWhyHireYou] = useState("");

  // Error State
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    contact: "",
    whyHireYou: "",
  });

  const validateForm = () => {
    let valid = true;
    let newErrors = { name: "", email: "", contact: "", whyHireYou: "" };

    if (!name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }
    if (!email.trim() || !isValidEmail(email)) {
      newErrors.email = "Valid email is required";
      valid = false;
    }
    if (!contact.trim() || !isValidContactNumber(contact)) {
      newErrors.contact = "Valid 10-11 digit contact number is required";
      valid = false;
    }
    if (!whyHireYou.trim()) {
      newErrors.whyHireYou = "This field is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      Alert.alert(
        "Application Successful!",
        `You have successfully applied for the ${job.title} position at ${job.company}.`,
        [
          {
            text: "Okay",
            onPress: () => {
              // Clear form
              setName("");
              setEmail("");
              setContact("");
              setWhyHireYou("");

              // Redirect logic
              if (fromScreen === "SavedJobs") {
                navigation.navigate("JobFinder");
              } else {
                navigation.goBack();
              }
            },
          },
        ],
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className={`flex-1 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}
    >
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text
          className={`text-2xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}
        >
          Apply for {job.title}
        </Text>
        <Text
          className={`text-lg mb-6 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
        >
          {job.company}
        </Text>

        <FormInput
          label="Full Name"
          placeholder="John Doe"
          value={name}
          onChangeText={setName}
          error={errors.name}
          isDarkMode={isDarkMode}
        />

        <FormInput
          label="Email Address"
          placeholder="john@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email}
          isDarkMode={isDarkMode}
        />

        <FormInput
          label="Contact Number"
          placeholder="09123456789"
          value={contact}
          onChangeText={setContact}
          keyboardType="numeric"
          error={errors.contact}
          isDarkMode={isDarkMode}
        />

        <FormInput
          label="Why should we hire you?"
          placeholder="Tell us about your skills and experience..."
          value={whyHireYou}
          onChangeText={setWhyHireYou}
          multiline
          numberOfLines={4}
          style={{ height: 100, textAlignVertical: "top" }}
          error={errors.whyHireYou}
          isDarkMode={isDarkMode}
        />

        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-green-600 py-4 rounded-xl items-center mt-4"
        >
          <Text className="text-white text-lg font-bold">
            Submit Application
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
