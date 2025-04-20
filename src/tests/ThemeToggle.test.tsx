import React from 'react';
import { render } from '@testing-library/react';
import { screen, fireEvent } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { ThemeToggle } from '../components/ThemeToggle';
import { ThemeProvider } from '../context/ThemeContext';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('ThemeToggle Component', () => {
  beforeEach(() => {
    document.documentElement.classList.remove('dark');
    localStorageMock.clear();
  });

  const renderThemeToggle = () => {
    return render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
  };

  test('renders with moon icon initially in light mode', () => {
    renderThemeToggle();
    
    // In light mode, we should see the moon icon (for switching to dark)
    const moonIcon = screen.getByLabelText('Switch to dark mode');
    expect(moonIcon).toBeInTheDocument();
  });

  test('toggles between light and dark mode when clicked', () => {
    renderThemeToggle();
    
    // Initially in light mode
    const toggleButton = screen.getByRole('button');
    
    // Click to switch to dark mode
    fireEvent.click(toggleButton);
    
    // Now should be labeled for switching to light mode
    expect(screen.getByLabelText('Switch to light mode')).toBeInTheDocument();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorageMock.getItem('theme')).toBe('dark');
    
    // Click again to switch back to light mode
    fireEvent.click(toggleButton);
    
    // Now should be labeled for switching to dark mode again
    expect(screen.getByLabelText('Switch to dark mode')).toBeInTheDocument();
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorageMock.getItem('theme')).toBe('light');
  });

  test('respects system preference for dark mode', () => {
    // Mock system preference for dark mode
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
    
    renderThemeToggle();
    
    // Should default to dark mode and show sun icon
    expect(screen.getByLabelText('Switch to light mode')).toBeInTheDocument();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  test('respects localStorage preference over system preference', () => {
    // Mock system preference for dark mode
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
    
    // But set localStorage to light mode
    localStorageMock.setItem('theme', 'light');
    
    renderThemeToggle();
    
    // Should respect localStorage and show moon icon (for switching to dark)
    expect(screen.getByLabelText('Switch to dark mode')).toBeInTheDocument();
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
}); 