import uuid from "react-native-uuid";
import { Job } from "../types";

const API_URL = "https://empllo.com/api/v1";

export const fetchJobs = async (): Promise<Job[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const rawJobs = Array.isArray(data) ? data : data.jobs || data.data || [];

    // Inject a unique ID into every job
    const jobsWithIds: Job[] = rawJobs.map((job: any) => ({
      ...job,
      id: uuid.v4() as string,
    }));

    return jobsWithIds;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
};
