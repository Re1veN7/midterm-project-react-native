import uuid from 'react-native-uuid';
import { Job } from '../types';

const API_URL = 'https://empllo.com/api/v1';

export const fetchJobs = async (): Promise<Job[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    const rawJobs = Array.isArray(data) ? data : (data.jobs || data.data || []);

    // Translate the raw API data into our TypeScript Job format
    const jobsWithIds: Job[] = rawJobs.map((rawJob: any) => {
      
      // 1. Format the Salary cleanly (if available)
      let formattedSalary = undefined;
      if (rawJob.minSalary && rawJob.maxSalary) {
        formattedSalary = `${rawJob.currency || ''} ${rawJob.minSalary} - ${rawJob.maxSalary}`;
      } else if (rawJob.minSalary) {
        formattedSalary = `${rawJob.currency || ''} ${rawJob.minSalary}+`;
      }

      // 2. Format the Location array into a readable string
      const formattedLocation = rawJob.locations && rawJob.locations.length > 0 
        ? rawJob.locations.join(', ') 
        : 'Remote / Unspecified';

      return {
        ...rawJob, // Keep all the original data just in case
        id: uuid.v4() as string, // Inject our required UUID
        
        // --- DATA MAPPING FIXES ---
        company: rawJob.companyName, // Translate 'companyName' -> 'company'
        location: formattedLocation, // Translate 'locations' array -> 'location' string
        salary: formattedSalary,     // Use our formatted min/max salary string
        type: rawJob.jobType,        // Translate 'jobType' -> 'type'
      };
    });

    return jobsWithIds;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
};