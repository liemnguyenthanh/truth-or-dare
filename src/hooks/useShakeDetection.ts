'use client';

import { useEffect, useRef } from 'react';

interface UseShakeDetectionOptions {
  threshold?: number;
  timeout?: number;
  onShake?: () => void;
}

export function useShakeDetection({
  threshold = 15,
  timeout: _timeout = 500,
  onShake,
}: UseShakeDetectionOptions = {}) {
  const lastUpdate = useRef(0);
  const lastX = useRef(0);
  const lastY = useRef(0);
  const lastZ = useRef(0);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.DeviceMotionEvent) {
      return;
    }

    const handleDeviceMotion = (event: DeviceMotionEvent) => {
      const current = Date.now();

      if (current - lastUpdate.current > 100) {
        const timeDifference = current - lastUpdate.current;
        lastUpdate.current = current;

        const acceleration = event.accelerationIncludingGravity;
        if (!acceleration) return;

        const x = acceleration.x || 0;
        const y = acceleration.y || 0;
        const z = acceleration.z || 0;

        const speed =
          (Math.abs(x + y + z - lastX.current - lastY.current - lastZ.current) /
            timeDifference) *
          10000;

        if (speed > threshold) {
          // Haptic feedback
          if ('vibrate' in navigator) {
            navigator.vibrate([100, 50, 100]);
          }

          onShake?.();
        }

        lastX.current = x;
        lastY.current = y;
        lastZ.current = z;
      }
    };

    // Request permission for iOS 13+
    const requestPermission = async () => {
      if (typeof (DeviceMotionEvent as any).requestPermission === 'function') {
        try {
          const permission = await (
            DeviceMotionEvent as any
          ).requestPermission();
          if (permission === 'granted') {
            window.addEventListener('devicemotion', handleDeviceMotion);
          }
        } catch (error) {
          console.warn('Device motion permission denied:', error);
        }
      } else {
        // For non-iOS devices
        window.addEventListener('devicemotion', handleDeviceMotion);
      }
    };

    requestPermission();

    return () => {
      window.removeEventListener('devicemotion', handleDeviceMotion);
    };
  }, [threshold, onShake]);

  // Manual trigger function for testing
  const triggerShake = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([100, 50, 100]);
    }
    onShake?.();
  };

  return { triggerShake };
}
