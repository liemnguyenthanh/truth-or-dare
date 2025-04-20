import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import { useSpring, animated } from '@react-spring/three';

interface BottleProps {
  spinning?: boolean;
  onSpinComplete?: () => void;
}

export function Bottle({ spinning = false, onSpinComplete }: BottleProps) {
  const groupRef = useRef<Group>(null);
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  
  // Set up the spring animation for smooth spinning
  const { rotationZ } = useSpring({
    rotationZ: spinning ? rotation + Math.PI * 10 : rotation,
    config: {
      mass: 1,
      tension: 280,
      friction: 60,
    },
    onRest: () => {
      if (spinning) {
        setIsSpinning(false);
        if (onSpinComplete) onSpinComplete();
      }
    },
  });

  // Start spinning when the spinning prop changes
  React.useEffect(() => {
    if (spinning && !isSpinning) {
      setIsSpinning(true);
      setRotation(prev => prev + Math.PI * 2 * (8 + Math.random() * 4)); // 8-12 rotations
    }
  }, [spinning, isSpinning]);

  // Animate the bottle
  useFrame(() => {
    if (groupRef.current && !spinning && !isSpinning) {
      // Subtle floating animation when not spinning
      groupRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.05;
      groupRef.current.rotation.y += 0.001;
    }
  });

  // Simple bottle model
  return (
    <animated.group 
      ref={groupRef} 
      rotation-z={rotationZ}
      position={[0, 0, 0]}
    >
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.5, 0.5, 2, 32]} />
        <meshPhysicalMaterial 
          color="#88ccff" 
          transmission={0.9} 
          roughness={0.1} 
          metalness={0.1}
          thickness={0.5}
        />
      </mesh>
      <mesh position={[0, 0, 1.1]} castShadow>
        <cylinderGeometry args={[0.2, 0.3, 0.2, 32]} />
        <meshPhysicalMaterial 
          color="#88ccff" 
          transmission={0.9} 
          roughness={0.1} 
          metalness={0.1}
          thickness={0.5}
        />
      </mesh>
      {/* Bottle neck */}
      <mesh position={[0, 0, 1.25]} castShadow>
        <cylinderGeometry args={[0.15, 0.2, 0.3, 32]} />
        <meshPhysicalMaterial 
          color="#88ccff" 
          transmission={0.9} 
          roughness={0.1} 
          metalness={0.1}
          thickness={0.5}
        />
      </mesh>
      {/* Arrow indicator */}
      <mesh position={[0, 0.25, 0]} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
        <coneGeometry args={[0.15, 0.5, 32]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
    </animated.group>
  );
} 