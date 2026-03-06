export const isValidEmail = (email: string): boolean => {
  // Strict email format checking
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidContactNumber = (number: string): boolean => {
  // Strictly 10 to 11 digits, no letters or symbols
  const phoneRegex = /^[0-9]{10,11}$/;
  return phoneRegex.test(number);
};

export const hasNumbers = (text: string): boolean => {
  // Checks if a string contains any numbers
  return /\d/.test(text);
};

export const isValidNameFormat = (name: string): boolean => {
  // Allows only letters, spaces, hyphens, and apostrophes (no crazy symbols)
  const nameRegex = /^[a-zA-Z\s'-]+$/;
  return nameRegex.test(name);
};