import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import type { MotionValue } from "motion/react";

interface Props { mouseX: MotionValue<number>; mouseY: MotionValue<number>; }

function DataParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 250;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) { positions[i * 3] = (Math.random() - 0.5) * 10; positions[i * 3 + 1] = (Math.random() - 0.5) * 7; positions[i * 3 + 2] = (Math.random() - 0.5) * 5; }
  useFrame((state) => { if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.04; });
  return (<Points ref={ref} positions={positions} stride={3}><PointMaterial size={0.018} color="#dcb25a" transparent opacity={0.45} sizeAttenuation /></Points>);
}

function CrystalBox({ position, scale, speed }: { position: [number, number, number]; scale: number; speed: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * speed * 0.7;
      ref.current.rotation.y = state.clock.elapsedTime * speed;
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.1;
    }
  });
  return (<mesh ref={ref} position={position} scale={scale}><octahedronGeometry args={[1, 0]} /><meshStandardMaterial color="#1a1200" roughness={0.05} metalness={0.9} emissive="#4a3800" emissiveIntensity={0.3} transparent opacity={0.7} /></mesh>);
}

export default function AccountingScene({ mouseX, mouseY }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const mainRef = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    void state;
    if (groupRef.current) {
      const tx = mouseX.get() * 0.25; const ty = -mouseY.get() * 0.25;
      groupRef.current.rotation.y += (tx - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (ty - groupRef.current.rotation.x) * 0.05;
    }
    if (mainRef.current) { mainRef.current.rotation.y += delta * 0.15; mainRef.current.rotation.x += delta * 0.07; }
  });
  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.2} />
      <pointLight position={[4, 4, 4]} intensity={2} color="#dcb25a" />
      <pointLight position={[-4, -2, 3]} intensity={0.8} color="#ffffff" />
      <spotLight position={[0, 6, 2]} intensity={1} color="#dcb25a" angle={0.4} penumbra={0.5} />
      <mesh ref={mainRef}><icosahedronGeometry args={[1.1, 1]} /><meshStandardMaterial color="#0d0900" roughness={0.0} metalness={1.0} emissive="#3d2800" emissiveIntensity={0.4} /></mesh>
      <mesh><icosahedronGeometry args={[1.12, 1]} /><meshBasicMaterial color="#dcb25a" wireframe transparent opacity={0.18} /></mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[1.8, 0.008, 8, 60]} /><meshBasicMaterial color="#dcb25a" transparent opacity={0.3} /></mesh>
      <mesh rotation={[Math.PI / 3, 0.5, 0]}><torusGeometry args={[2.3, 0.006, 8, 60]} /><meshBasicMaterial color="#aa8833" transparent opacity={0.2} /></mesh>
      <CrystalBox position={[-2.2, 0.5, 0.3]} scale={0.2} speed={0.3} />
      <CrystalBox position={[2.0, -0.8, 0.5]} scale={0.15} speed={0.25} />
      <CrystalBox position={[0.8, 2.0, -0.3]} scale={0.12} speed={0.4} />
      <CrystalBox position={[-1.5, -1.8, 0.2]} scale={0.18} speed={0.2} />
      <DataParticles />
    </group>
  );
}
