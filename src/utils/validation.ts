export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidContactNumber = (number: string): boolean => {
  // Accepts 10 to 11 digits (adjust regex if you need specific country code validation)
  const phoneRegex = /^[0-9]{10,11}$/;
  return phoneRegex.test(number);
};