import { create } from 'zustand';
import { Job } from '../types';

interface JobStore {
  jobs: Job[];
  savedJobs: Job[];
  appliedJobs: string[]; // NEW: Track IDs of jobs applied for
  isDarkMode: boolean;

  setJobs: (jobs: Job[]) => void;
  saveJob: (job: Job) => void;
  removeSavedJob: (jobId: string) => void;
  addAppliedJob: (jobId: string) => void; // NEW: Action to mark as applied
  toggleDarkMode: () => void;
}

export const useJobStore = create<JobStore>((set) => ({
  jobs: [],
  savedJobs: [],
  appliedJobs: [],
  isDarkMode: false,

  setJobs: (jobs) => set({ jobs }),
  
  saveJob: (job) => 
    set((state) => {
      const isAlreadySaved = state.savedJobs.some((saved) => saved.id === job.id);
      if (isAlreadySaved) return state;
      return { savedJobs: [...state.savedJobs, job] };
    }),

  removeSavedJob: (jobId) => 
    set((state) => ({
      savedJobs: state.savedJobs.filter((job) => job.id !== jobId),
    })),

  addAppliedJob: (jobId) =>
    set((state) => {
      // Prevent duplicates
      if (state.appliedJobs.includes(jobId)) return state;
      return { appliedJobs: [...state.appliedJobs, jobId] };
    }),

  toggleDarkMode: () => 
    set((state) => ({ isDarkMode: !state.isDarkMode })),
}));