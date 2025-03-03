// utils/darkMode.ts - Create this file to centralize dark mode logic

// Utility to check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

// Initialize dark mode based on localStorage or system preference
export const getInitialDarkMode = (): boolean => {
  if (!isBrowser) return false;
  
  // First check localStorage
  const storedValue = localStorage.getItem('darkMode');
  if (storedValue !== null) {
    return JSON.parse(storedValue);
  }
  
  // Then check system preference
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

// Apply dark mode classes to document
export const applyDarkMode = (isDark: boolean): void => {
  if (!isBrowser) return;
  
  if (isDark) {
    document.documentElement.classList.add('dark');
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    document.documentElement.setAttribute('data-theme', 'light');
  }
};

// Save dark mode preference
export const saveDarkModePreference = (isDark: boolean): void => {
  if (!isBrowser) return;
  localStorage.setItem('darkMode', JSON.stringify(isDark));
};

// Toggle dark mode
export const toggleDarkMode = (current: boolean): boolean => {
  const newMode = !current;
  applyDarkMode(newMode);
  saveDarkModePreference(newMode);
  return newMode;
};

// Initialize dark mode on page load
export const initializeDarkMode = (): boolean => {
  const isDark = getInitialDarkMode();
  applyDarkMode(isDark);
  return isDark;
};