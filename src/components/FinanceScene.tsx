'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Grid, RoundedBox } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

// A bar with a staggered, spring-like animation
function Bar({ position, height, color, label, index }: { position: [number, number, number], height: number, color: string, label: string, index: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const textRef = useRef<any>(null!);
  
  const animationState = useRef({
    hasStarted: false,
    currentHeight: 0,
  });

  const delay = index * 0.2; // 200ms delay for each subsequent bar

  // Set initial scale to 0 once on mount
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.scale.y = 0;
    }
  }, []);

  useFrame((state) => {
    const { clock } = state;

    // Check if the animation for this bar should start
    if (clock.elapsedTime > delay) {
      animationState.current.hasStarted = true;
    }

    if (animationState.current.hasStarted) {
      const targetHeight = height;
      const currentHeight = animationState.current.currentHeight;
      
      // Stop animating when close to the target to save performance
      if (Math.abs(targetHeight - currentHeight) < 0.01) {
        return;
      }

      // Animate with a lerp for a smooth, springy feel.
      const newHeight = THREE.MathUtils.lerp(currentHeight, targetHeight, 0.1);
      animationState.current.currentHeight = newHeight;

      if (meshRef.current) {
        meshRef.current.scale.y = newHeight;
        meshRef.current.position.y = newHeight / 2;
      }
      if (textRef.current) {
        textRef.current.position.y = newHeight + 0.3;
        textRef.current.text = newHeight.toFixed(1);
        textRef.current.visible = newHeight > height * 0.5;
      }
    }
  });

  return (
    <group position={position}>
      <RoundedBox
        ref={meshRef}
        args={[0.8, 1, 0.8]}
        radius={0.1}
        smoothness={4}
      >
        <meshStandardMaterial
          color={color}
          metalness={0.6}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </RoundedBox>
      <Text
        position={[0, -0.3, 0]}
        fontSize={0.25}
        color="#333"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
       <Text
        ref={textRef}
        position={[0, 0.3, 0]}
        fontSize={0.3}
        color="#333"
        anchorX="center"
        anchorY="middle"
        visible={false}
      >
        {height.toFixed(1)}
      </Text>
    </group>
  );
}

export default function FinanceModel() {
  const expenseData = [
    { label: "Food", amount: 4.5, color: "#e53935" },
    { label: "Travel", amount: 2.8, color: "#d32f2f" },
    { label: "Bills", amount: 6.2, color: "#c62828" },
    { label: "Fun", amount: 3.1, color: "#b71c1c" },
    { label: "Other", amount: 1.9, color: "#ef5350" },
  ];

  return (
    <div className="w-full h-[350px] sm:h-[450px] rounded-xl overflow-hidden bg-white">
      <Canvas camera={{ position: [0, 4, 8], fov: 50 }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 10, 7.5]} intensity={1.8} />

        {expenseData.map((data, index) => (
          <Bar
            key={data.label}
            position={[index * 1.5 - (expenseData.length * 1.5) / 2 + 0.75, 0, 0]}
            height={data.amount}
            color={data.color}
            label={data.label}
            index={index} // Pass index for staggered animation
          />
        ))}

        <Grid
          position={[0, -0.01, 0]}
          args={[20, 20]}
          cellSize={0.5}
          cellThickness={1}
          cellColor={"#e0e0e0"}
          sectionSize={1.5}
          sectionThickness={1.5}
          sectionColor={"#bdbdbd"}
          fadeDistance={30}
          infiniteGrid
        />

        <OrbitControls
          enableZoom={true}
          enablePan={true}
          autoRotate={false}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.5}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  );
}
