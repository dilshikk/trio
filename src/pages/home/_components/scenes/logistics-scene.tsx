import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Torus, Line, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import type { MotionValue } from "motion/react";

interface Props { mouseX: MotionValue<number>; mouseY: MotionValue<number>; }

function RouteLine({ start, end, color }: { start: [number, number, number]; end: [number, number, number]; color: string }) {
  const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  return <Line points={points} color={color} lineWidth={0.5} transparent opacity={0.4} />;
}

function LogisticsParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 300;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
  }
  useFrame((_, delta) => { if (ref.current) ref.current.rotation.y += delta * 0.03; });
  return (<Points ref={ref} positions={positions} stride={3}><PointMaterial size={0.015} color="#6395ff" transparent opacity={0.5} sizeAttenuation /></Points>);
}

function GlobeRing({ radius, rotation, color }: { radius: number; rotation: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => { if (ref.current) ref.current.rotation.z += delta * 0.1; });
  return (<mesh ref={ref} rotation={rotation}><torusGeometry args={[radius, 0.008, 8, 80]} /><meshBasicMaterial color={color} transparent opacity={0.35} /></mesh>);
}

// Suppress unused import warning
void Sphere;
void Torus;

export default function LogisticsScene({ mouseX, mouseY }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (groupRef.current) {
      const tx = mouseX.get() * 0.3; const ty = -mouseY.get() * 0.3;
      groupRef.current.rotation.y += (tx - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (ty - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.z += delta * 0.015;
    }
    if (coreRef.current) coreRef.current.rotation.y += delta * 0.2;
  });
  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#6395ff" />
      <pointLight position={[-5, -3, 3]} intensity={0.6} color="#ffffff" />
      <mesh ref={coreRef}><sphereGeometry args={[1.2, 32, 32]} /><meshStandardMaterial color="#0a0f1e" wireframe={false} roughness={0.3} metalness={0.8} emissive="#0d1a3a" emissiveIntensity={0.5} /></mesh>
      <mesh><sphereGeometry args={[1.22, 16, 16]} /><meshBasicMaterial color="#6395ff" wireframe transparent opacity={0.12} /></mesh>
      <GlobeRing radius={1.7} rotation={[0, 0, 0]} color="#6395ff" />
      <GlobeRing radius={1.7} rotation={[Math.PI / 2, 0, 0]} color="#6395ff" />
      <GlobeRing radius={2.2} rotation={[Math.PI / 4, Math.PI / 6, 0]} color="#4060aa" />
      <RouteLine start={[-2, 0.5, 0.5]} end={[0, 0, 0]} color="#6395ff" />
      <RouteLine start={[2, -0.3, 0.3]} end={[0, 0, 0]} color="#6395ff" />
      <RouteLine start={[-1, -1.5, 0.8]} end={[0, 0, 0]} color="#4060cc" />
      <RouteLine start={[1.5, 1.2, -0.5]} end={[0, 0, 0]} color="#4060cc" />
      {([ [-2, 0.5, 0.5], [2, -0.3, 0.3], [-1, -1.5, 0.8], [1.5, 1.2, -0.5], [0.8, -2, 0.3], [-1.8, -0.8, 0.6] ] as [number, number, number][]).map((pos, i) => (<mesh key={i} position={pos}><sphereGeometry args={[0.04, 8, 8]} /><meshBasicMaterial color="#6395ff" /></mesh>))}
      <LogisticsParticles />
    </group>
  );
}
