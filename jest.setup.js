// jest.setup.js
import '@testing-library/jest-dom';

// Mock the next/router
jest.mock('next/router', () => ({
  useRouter: () => ({
    route: '/',
    pathname: '',
    query: {},
    asPath: '',
    push: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
    },
    beforePopState: jest.fn(() => null),
    prefetch: jest.fn(() => null),
  }),
}));

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => {
  const actual = jest.requireActual('framer-motion');
  return {
    ...actual,
    motion: {
      ...actual.motion,
      div: ({ children, ...props }) => <div {...props}>{children}</div>,
      button: ({ children, ...props }) => <button {...props}>{children}</button>,
      form: ({ children, ...props }) => <form {...props}>{children}</form>,
      li: ({ children, ...props }) => <li {...props}>{children}</li>,
    },
    AnimatePresence: ({ children }) => <>{children}</>,
  };
});

// Mock Three.js and related libraries
jest.mock('@react-three/fiber', () => ({
  Canvas: ({ children }) => <div data-testid="mock-canvas">{children}</div>,
  useFrame: jest.fn(),
}));

jest.mock('@react-three/drei', () => ({
  Environment: () => null,
  OrbitControls: () => null,
  PerspectiveCamera: () => null,
  Stage: ({ children }) => <>{children}</>,
  useGLTF: jest.fn(),
}));

jest.mock('@react-spring/three', () => ({
  useSpring: jest.fn(() => ({ rotationZ: 0 })),
  animated: {
    group: ({ children, ...props }) => <group {...props}>{children}</group>,
  },
}));

// Set up a global matchMedia mock
window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {},
    addEventListener: function() {},
    removeEventListener: function() {},
    dispatchEvent: function() {},
  };
}; 