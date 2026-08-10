import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import type { MotionValue } from "motion/react";
import type { Line as ThreeLine } from "three";

interface Props { mouseX: MotionValue<number>; mouseY: MotionValue<number>; }

function NetworkParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 280;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) { positions[i * 3] = (Math.random() - 0.5) * 11; positions[i * 3 + 1] = (Math.random() - 0.5) * 7; positions[i * 3 + 2] = (Math.random() - 0.5) * 5; }
  useFrame((state) => { if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.035; });
  return (<Points ref={ref} positions={positions} stride={3}><PointMaterial size={0.016} color="#c4c4c4" transparent opacity={0.4} sizeAttenuation /></Points>);
}

function Node({ position, size, phase }: { position: [number, number, number]; size: number; phase: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => { if (ref.current) { const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.2 + phase) * 0.08; ref.current.scale.setScalar(pulse); } });
  return (<mesh ref={ref} position={position}><sphereGeometry args={[size, 12, 12]} /><meshStandardMaterial color="#c4c4c4" emissive="#888888" emissiveIntensity={0.3} roughness={0.2} metalness={0.9} /></mesh>);
}

function ConnectionLine({ a, b }: { a: [number, number, number]; b: [number, number, number] }) {
  const points = [new THREE.Vector3(...a), new THREE.Vector3(...b)];
  const ref = useRef<ThreeLine>(null);
  useFrame((state) => { if (ref.current?.material) { (ref.current.material as THREE.LineBasicMaterial).opacity = 0.15 + Math.sin(state.clock.elapsedTime * 0.8) * 0.1; } });
  const geo = new THREE.BufferGeometry().setFromPoints(points);
  return (<primitive object={new THREE.Line(geo, new THREE.LineBasicMaterial({ color: "#c4c4c4", transparent: true, opacity: 0.2 }))} ref={ref} />);
}

const nodePositions: [number, number, number][] = [[0,0,0],[-2,0.8,0.3],[2,0.5,0.4],[0.5,1.8,-0.2],[-1.2,-1.6,0.5],[1.8,-1.2,0.3],[-2.5,-0.5,0.2]];

export default function ConsultingScene({ mouseX, mouseY }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (groupRef.current) {
      const tx = mouseX.get() * 0.28; const ty = -mouseY.get() * 0.28;
      groupRef.current.rotation.y += (tx - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (ty - groupRef.current.rotation.x) * 0.05;
    }
    if (coreRef.current) { coreRef.current.rotation.y += delta * 0.12; coreRef.current.rotation.z += delta * 0.06; }
  });
  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.25} />
      <pointLight position={[4, 3, 4]} intensity={1.8} color="#c4c4c4" />
      <pointLight position={[-3, -3, 2]} intensity={0.6} color="#ffffff" />
      <mesh ref={coreRef}><dodecahedronGeometry args={[1.0, 0]} /><meshStandardMaterial color="#0f0f0f" roughness={0.05} metalness={0.95} emissive="#1a1a1a" emissiveIntensity={0.4} /></mesh>
      <mesh><dodecahedronGeometry args={[1.02, 0]} /><meshBasicMaterial color="#c4c4c4" wireframe transparent opacity={0.15} /></mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[1.7, 0.007, 8, 60]} /><meshBasicMaterial color="#c4c4c4" transparent opacity={0.25} /></mesh>
      {nodePositions.slice(1).map((pos, i) => (<Node key={i} position={pos} size={0.05 + i * 0.01} phase={i * 0.8} />))}
      {nodePositions.slice(1).map((pos, i) => (<ConnectionLine key={i} a={[0,0,0]} b={pos} />))}
      <ConnectionLine a={nodePositions[1]} b={nodePositions[3]} />
      <ConnectionLine a={nodePositions[2]} b={nodePositions[5]} />
      <ConnectionLine a={nodePositions[4]} b={nodePositions[6]} />
      <NetworkParticles />
    </group>
  );
}
