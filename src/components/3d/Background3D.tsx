import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useSpring, animated } from '@react-spring/three';

// Generate random points for the background
const generatePoints = (count: number) => {
  const points = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const scale = 20; // Increased scale for more spread
  const sizes = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    points[i3] = (Math.random() - 0.5) * scale;
    points[i3 + 1] = (Math.random() - 0.5) * scale;
    points[i3 + 2] = (Math.random() - 0.5) * scale;

    // Generate colors with an enhanced indigo/purple/pink gradient
    const colorChoice = Math.random();
    if (colorChoice < 0.33) {
      // Indigo
      colors[i3] = 0.4 + Math.random() * 0.2;
      colors[i3 + 1] = 0.2 + Math.random() * 0.2;
      colors[i3 + 2] = 0.9 + Math.random() * 0.1;
    } else if (colorChoice < 0.66) {
      // Purple
      colors[i3] = 0.5 + Math.random() * 0.2;
      colors[i3 + 1] = 0.2 + Math.random() * 0.2;
      colors[i3 + 2] = 0.8 + Math.random() * 0.2;
    } else {
      // Pink
      colors[i3] = 0.8 + Math.random() * 0.2;
      colors[i3 + 1] = 0.2 + Math.random() * 0.2;
      colors[i3 + 2] = 0.7 + Math.random() * 0.3;
    }

    // Vary the sizes
    sizes[i] = Math.random() * 0.1 + 0.03;
  }

  return { positions: points, colors, sizes };
};

// Animated stars component
const Stars = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const { positions, colors, sizes } = generatePoints(3000); // Increased count
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (pointsRef.current) {
      // Slower rotation for more subtle effect
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.03;
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;

      // Add some wave motion
      pointsRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  // Animation for hover effect
  const springs = useSpring({
    size: hovered ? 0.08 : 0.05,
    config: { mass: 1, tension: 280, friction: 60 },
  });

  return (
    <group
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Points
        ref={pointsRef}
        positions={positions}
        stride={3}
        frustumCulled={false}
      >
        <PointMaterial
          transparent
          color="#ffffff"
          size={springs.size}
          sizeAttenuation={true}
          depthWrite={false}
          vertexColors
        />
      </Points>
    </group>
  );
};

// Animated sphere component
const AnimatedSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const springs = useSpring({
    scale: hovered ? [1.1, 1.1, 1.1] : [1, 1, 1],
    color: hovered ? '#ec4899' : '#6366f1', // Change color on hover (indigo to pink)
    wireframeOpacity: hovered ? 0.8 : 0.5,
    config: { mass: 1, tension: 280, friction: 40 },
  });

  useFrame((state) => {
    if (meshRef.current) {
      // Smoother rotation
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;

      // Add some floating motion
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.2;
    }
  });

  return (
    <group>
      {/* Outer glow sphere */}
      <mesh scale={[1.8, 1.8, 1.8]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial
          color="#8b5cf6"
          transparent
          opacity={0.05}
          roughness={0.4}
          metalness={0.8}
        />
      </mesh>

      {/* Main wireframe sphere */}
      <animated.mesh
        ref={meshRef}
        scale={springs.scale}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[1.5, 32, 32]} />
        <animated.meshStandardMaterial
          color={springs.color}
          roughness={0.4}
          metalness={0.8}
          wireframe
          transparent
          opacity={springs.wireframeOpacity}
        />
      </animated.mesh>

      {/* Inner core */}
      <mesh scale={[0.8, 0.8, 0.8]}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#4f46e5"
          emissive="#4f46e5"
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={1}
        />
      </mesh>
    </group>
  );
};

// Main background component
const Background3D = () => {
  return (
    <div className="fixed inset-0 -z-10" style={{ backgroundColor: '#111827' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundColor: '#111827' }}></div>
    </div>
  );
};

export default Background3D;
