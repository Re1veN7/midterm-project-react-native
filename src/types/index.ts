export interface Job {
  id: string; // We will generate this using react-native-uuid
  title: string;
  company: string;
  location?: string;
  salary?: string;
  description?: string;
  type?: string;
  // Note: We'll accept any other properties the API might return
  [key: string]: any; 
}

export interface ApplicationData {
  name: string;
  email: string;
  contactNumber: string;
  whyHireYou: string;
}