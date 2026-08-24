import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const NODE_COUNT = 100;
const CONNECT_DISTANCE = 1.4;
const MAX_PULSES = 35;
const NODE_COLOR = '#D97706';
const EDGE_COLOR = '#B45309';
const PULSE_COLOR = '#FDBA74';

type Bounds = { x: number; y: number; z: number };
type Edge = [number, number];

type Pulse = {
  from: THREE.Vector3;
  to: THREE.Vector3;
  speed: number;
  phase: number;
};

function generateNetwork(count: number, bounds: Bounds, maxDist: number) {
  const positions: THREE.Vector3[] = [];
  for (let i = 0; i < count; i++) {
    positions.push(
      new THREE.Vector3(
        (Math.random() - 0.5) * bounds.x * 2,
        (Math.random() - 0.5) * bounds.y * 2,
        (Math.random() - 0.5) * bounds.z * 2
      )
    );
  }

  const edges: Edge[] = [];
  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      if (positions[i].distanceTo(positions[j]) < maxDist) {
        edges.push([i, j]);
      }
    }
  }

  const edgePoints: number[] = [];
  edges.forEach(([a, b]) => {
    edgePoints.push(
      positions[a].x, positions[a].y, positions[a].z,
      positions[b].x, positions[b].y, positions[b].z
    );
  });

  const pulses: Pulse[] = [...edges]
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.min(MAX_PULSES, edges.length))
    .map(([a, b]) => ({
      from: positions[a],
      to: positions[b],
      speed: 0.25 + Math.random() * 0.35,
      phase: Math.random(),
    }));

  return { positions, edgePositions: new Float32Array(edgePoints), pulses };
}

function Pulses({ pulses }: { pulses: Pulse[] }) {
  const refs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    pulses.forEach((p, i) => {
      const mesh = refs.current[i];
      if (!mesh) return;
      const progress = (t * p.speed + p.phase) % 1;
      mesh.position.lerpVectors(p.from, p.to, progress);
      const edgeFade = Math.sin(progress * Math.PI);
      const material = mesh.material as THREE.MeshBasicMaterial;
      material.opacity = 0.25 + edgeFade * 0.75;
    });
  });

  return (
    <>
      {pulses.map((_, i) => (
        <mesh key={i} ref={(el) => { refs.current[i] = el; }}>
          <sphereGeometry args={[0.045, 8, 8]} />
          <meshBasicMaterial color={PULSE_COLOR} transparent opacity={1} />
        </mesh>
      ))}
    </>
  );
}

function NodeNetwork({ reduceMotion }: { reduceMotion: boolean }) {
  const { viewport } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  const { positions, edgePositions, pulses } = useMemo(() => {
    const bounds: Bounds = {
      x: (viewport.width * 0.95) / 2,
      y: Math.max((viewport.height * 0.85) / 2, 2.2),
      z: 2.6,
    };
    return generateNetwork(NODE_COUNT, bounds, CONNECT_DISTANCE);
  }, [viewport.width, viewport.height]);

  useEffect(() => {
    if (reduceMotion) return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, [reduceMotion]);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group || reduceMotion) return;

    // Bounded sway + mouse tilt only — the network is wide (spans the
    // viewport width), so rotation must stay small or the wide axis
    // periodically turns into depth and the network visually collapses.
    group.rotation.y = Math.sin(state.clock.elapsedTime * 0.08) * 0.12;

    const targetTiltX = pointer.current.y * 0.12;
    const targetTiltZ = -pointer.current.x * 0.12;
    const lerp = Math.min(1, delta * 2);
    group.rotation.x += (targetTiltX - group.rotation.x) * lerp;
    group.rotation.z += (targetTiltZ - group.rotation.z) * lerp;
  });

  return (
    <group ref={groupRef}>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshStandardMaterial
            color={NODE_COLOR}
            emissive={EDGE_COLOR}
            emissiveIntensity={0.7}
          />
        </mesh>
      ))}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={edgePositions.length / 3}
            array={edgePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color={EDGE_COLOR} transparent opacity={0.25} />
      </lineSegments>
      {!reduceMotion && <Pulses pulses={pulses} />}
    </group>
  );
}

const HeroScene = () => {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.7} />
      <pointLight position={[5, 5, 5]} intensity={0.9} color="#D97706" />
      <NodeNetwork reduceMotion={reduceMotion} />
    </Canvas>
  );
};

export default HeroScene;
