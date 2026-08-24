"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useIsVisible } from "@/hooks/useIsVisible";
import { usePerformance } from "@/providers/PerformanceProvider";

function SpectrogramMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Create a plane with many segments for detailed vertex manipulation
  const geometry = useMemo(() => new THREE.PlaneGeometry(10, 10, 32, 32), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    
    const positionAttribute = geometry.attributes.position;
    const vertex = new THREE.Vector3();
    
    for (let i = 0; i < positionAttribute.count; i++) {
      vertex.fromBufferAttribute(positionAttribute, i);
      // Create a moving wave pattern based on x, y coordinates and time
      const waveX = Math.sin(vertex.x * 2 + time * 2);
      const waveY = Math.cos(vertex.y * 2 + time * 2);
      const noise = Math.sin(vertex.x * 5 + vertex.y * 5 + time * 4) * 0.2;
      
      vertex.z = (waveX * waveY * 0.5) + noise;
      positionAttribute.setZ(i, vertex.z);
    }
    
    positionAttribute.needsUpdate = true;
    
    // Slowly rotate the entire mesh
    meshRef.current.rotation.z = time * 0.1;
  });

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 3, 0, 0]} position={[0, 0, -2]}>
      <meshBasicMaterial 
        color="#22D3EE" 
        wireframe={true} 
        transparent={true} 
        opacity={0.6}
      />
    </mesh>
  );
}

export default function SpectrogramCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useIsVisible(containerRef, "200px");
  const { isLowEnd } = usePerformance();

  if (isLowEnd) {
    return (
      <div className="absolute inset-0 w-full h-full bg-[#050510] hidden sm:flex items-end justify-center overflow-hidden rounded-b-2xl pointer-events-none opacity-20">
        <div className="w-[120%] h-[60%] bg-gradient-to-t from-cyan-500/20 to-transparent blur-[40px] transform scale-x-150" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full bg-[#050510] hidden sm:block overflow-hidden rounded-b-2xl pointer-events-none">
      <Canvas 
        camera={{ position: [0, -3, 3], fov: 60 }}
        frameloop={isVisible ? "always" : "demand"}
      >
        <fog attach="fog" args={['#050510', 2, 8]} />
        {isVisible && <SpectrogramMesh />}
      </Canvas>
    </div>
  );
}
