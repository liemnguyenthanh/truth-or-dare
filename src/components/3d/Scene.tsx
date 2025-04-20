import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  Environment, 
  OrbitControls, 
  PerspectiveCamera, 
  Stage 
} from '@react-three/drei';
import { Bottle } from './Bottle';

interface SceneProps {
  spinning?: boolean;
  onSpinComplete?: () => void;
}

export function Scene({ spinning = false, onSpinComplete }: SceneProps) {
  return (
    <div className="w-full h-80 md:h-96">
      <Canvas shadows>
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.5} shadows={false}>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={40} />
            <Bottle spinning={spinning} onSpinComplete={onSpinComplete} />
          </Stage>
          <Environment preset="sunset" />
        </Suspense>
        <OrbitControls 
          enablePan={false} 
          enableZoom={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
} 