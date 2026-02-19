import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import JobFinder from '../screens/JobFinder';
import SavedJobs from '../screens/SavedJobs';
import ApplyForm from '../screens/ApplyForm';
import { Job } from '../types';

// Define the parameter list for our stack
export type RootStackParamList = {
    JobFinder: undefined;
    SavedJobs: undefined;
    ApplyForm: { job: Job };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="JobFinder">
                <Stack.Screen
                    name="JobFinder"
                    component={JobFinder}
                    options={{ title: 'Job Finder' }}
                />
                <Stack.Screen
                    name="SavedJobs"
                    component={SavedJobs}
                    options={{ title: 'My Saved Jobs' }}
                />
                <Stack.Screen
                    name="ApplyForm"
                    component={ApplyForm}
                    options={{ title: 'Apply Now', presentation: 'modal' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}