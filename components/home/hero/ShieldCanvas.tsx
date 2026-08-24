"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { useIsVisible } from "@/hooks/useIsVisible";
import { usePerformance } from "@/providers/PerformanceProvider";

function ShieldMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={[0, 0, 0]} scale={1.5}>
        {/* A simple low-poly shield shape using a cylinder as a base */}
        <cylinderGeometry args={[1, 0.2, 2.5, 6]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.5}
          chromaticAberration={0.05}
          anisotropy={0.1}
          distortion={0.2}
          distortionScale={0.5}
          temporalDistortion={0.1}
          ior={1.5}
          color="#1E1042"
          attenuationDistance={1}
          attenuationColor="#ffffff"
        />
      </mesh>
    </Float>
  );
}

export default function ShieldCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useIsVisible(containerRef, "200px");
  const { isLowEnd } = usePerformance();

  if (isLowEnd) {
    return (
      <div className="absolute inset-0 z-0 h-[600px] w-full hidden md:flex items-center justify-center opacity-50">
        <div className="w-64 h-64 bg-cyan-500/20 rounded-full blur-[60px]" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 h-[600px] w-full hidden md:block">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 45 }}
        frameloop={isVisible ? "always" : "demand"}
      >
        <ambientLight intensity={0.5} />
        {/* Cyan edge light */}
        <directionalLight position={[5, 5, 2]} intensity={2} color="#22D3EE" />
        {/* Purple edge light */}
        <directionalLight position={[-5, -5, 2]} intensity={2} color="#A855F7" />
        {isVisible && <ShieldMesh />}
      </Canvas>
    </div>
  );
}
