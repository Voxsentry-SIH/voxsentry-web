"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

function SpectrogramMesh({ isAnalyzing, isComplete }: { isAnalyzing: boolean; isComplete: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Create a plane with segments for detailed vertex manipulation
  const geometry = useMemo(() => new THREE.PlaneGeometry(10, 5, 32, 16), []);
  
  // Keep track of internal time to smoothly interpolate speeds
  const speedRef = useRef(0.2);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // Target speeds: very slow when complete/idle, fast when analyzing
    const targetSpeed = isAnalyzing ? 1.5 : (isComplete ? 0.1 : 0.2);
    speedRef.current = THREE.MathUtils.lerp(speedRef.current, targetSpeed, 0.05);
    
    const time = state.clock.getElapsedTime() * speedRef.current;
    
    const positionAttribute = geometry.attributes.position;
    const vertex = new THREE.Vector3();
    
    // Amplitude is higher when analyzing
    const targetAmp = isAnalyzing ? 0.8 : (isComplete ? 0.2 : 0.3);
    const amp = THREE.MathUtils.lerp(0.3, targetAmp, 0.05); // Simplistic interpolation
    
    for (let i = 0; i < positionAttribute.count; i++) {
      vertex.fromBufferAttribute(positionAttribute, i);
      const waveX = Math.sin(vertex.x * 2 + time * 3);
      const waveY = Math.cos(vertex.y * 2 + time * 3);
      const noise = Math.sin(vertex.x * 6 + vertex.y * 4 + time * 5) * 0.2;
      
      vertex.z = (waveX * waveY * amp) + (noise * amp);
      positionAttribute.setZ(i, vertex.z);
    }
    
    positionAttribute.needsUpdate = true;
    
    // Slowly rotate slightly for effect
    meshRef.current.rotation.z = time * 0.05;
  });

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 3, 0, 0]} position={[0, -0.5, -2]}>
      <meshBasicMaterial 
        color="#22D3EE" 
        wireframe={true} 
        transparent={true} 
        opacity={isAnalyzing ? 0.8 : 0.4}
      />
    </mesh>
  );
}

export default function SpectrogramView({ isAnalyzing, isComplete }: { isAnalyzing: boolean; isComplete: boolean }) {
  return (
    <div className="relative flex h-full w-full items-end overflow-hidden rounded-xl border border-[rgba(34,211,238,0.2)] bg-[#050510] shadow-[inset_0_0_20px_rgba(34,211,238,0.05)]">
      
      {/* 3D WebGL Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, -2, 3], fov: 60 }}>
          <fog attach="fog" args={['#050510', 2, 6]} />
          <SpectrogramMesh isAnalyzing={isAnalyzing} isComplete={isComplete} />
        </Canvas>
      </div>
      
      {/* Overlay gradient to fade out edges */}
      <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_30%,#050510_100%)] pointer-events-none" />

      {/* Analyzing Pulse Effect */}
      <AnimatePresence>
        {isAnalyzing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 bg-[linear-gradient(90deg,transparent,rgba(34,211,238,0.15),transparent)] mix-blend-screen"
            style={{ 
              backgroundSize: "200% 100%",
              animation: "pulse-scan 1.5s infinite linear" 
            }}
          />
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes pulse-scan {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
