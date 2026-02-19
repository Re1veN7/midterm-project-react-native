import { create } from 'zustand';
import { Job } from '../types';

interface JobStore {
  // State
  jobs: Job[];
  savedJobs: Job[];
  isDarkMode: boolean;

  // Actions
  setJobs: (jobs: Job[]) => void;
  saveJob: (job: Job) => void;
  removeSavedJob: (jobId: string) => void;
  toggleDarkMode: () => void;
}

export const useJobStore = create<JobStore>((set) => ({
  jobs: [],
  savedJobs: [],
  isDarkMode: false,

  setJobs: (jobs) => set({ jobs }),
  
  saveJob: (job) => 
    set((state) => {
      // Requirement: Only one of each job can be added. Must not duplicate.
      const isAlreadySaved = state.savedJobs.some((saved) => saved.id === job.id);
      if (isAlreadySaved) return state; // Do nothing if it exists
      
      return { savedJobs: [...state.savedJobs, job] };
    }),

  removeSavedJob: (jobId) => 
    set((state) => ({
      savedJobs: state.savedJobs.filter((job) => job.id !== jobId),
    })),

  toggleDarkMode: () => 
    set((state) => ({ isDarkMode: !state.isDarkMode })),
}));