'use client';
import React, { createContext, ReactNode, useContext, useState } from 'react';

type ThemeContextType = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Check if dark mode is preferred or previously set
  // Default to dark mode
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  const value: ThemeContextType = {
    isDarkMode,
    toggleDarkMode: () => setIsDarkMode(!isDarkMode),
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
