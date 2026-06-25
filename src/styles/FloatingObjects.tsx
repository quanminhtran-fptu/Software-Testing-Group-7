import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Individual 3D shapes that float and rotate slowly

function FloatingCube({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1.2}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.4} />
      </mesh>
    </Float>
  );
}

function FloatingSphere({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh position={position} scale={scale}>
        <sphereGeometry args={[0.7, 64, 64]} />
        <MeshDistortMaterial color={color} distort={0.3} speed={2} roughness={0.2} metalness={0.5} />
      </mesh>
    </Float>
  );
}

function FloatingPyramid({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
  });

  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <coneGeometry args={[0.8, 1.2, 4]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.3} flatShading />
      </mesh>
    </Float>
  );
}

function FloatingTorus({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.4;
    meshRef.current.rotation.z = state.clock.elapsedTime * 0.2;
  });

  return (
    <Float speed={1.6} rotationIntensity={0.6} floatIntensity={1.3}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <torusGeometry args={[0.6, 0.25, 16, 64]} />
        <MeshWobbleMaterial color={color} factor={0.3} speed={1} roughness={0.3} metalness={0.4} />
      </mesh>
    </Float>
  );
}

function FloatingOctahedron({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.25;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.35;
  });

  return (
    <Float speed={2.2} rotationIntensity={0.5} floatIntensity={1.4}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <octahedronGeometry args={[0.8]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.6} flatShading />
      </mesh>
    </Float>
  );
}

interface FloatingObjectsProps {
  variant?: 'hero' | 'lesson' | 'minimal';
  className?: string;
}

// Scene composition with deterministic placement
function Scene({ variant }: { variant: 'hero' | 'lesson' | 'minimal' }) {
  const objects = useMemo(() => {
    if (variant === 'minimal') {
      return [
        { type: 'sphere', position: [2, 0.5, 0] as [number, number, number], color: '#2D7FF9', scale: 0.8 },
        { type: 'cube', position: [-2, -0.5, 0] as [number, number, number], color: '#16C47F', scale: 0.6 },
      ];
    }
    if (variant === 'lesson') {
      return [
        { type: 'octahedron', position: [0, 0, 0] as [number, number, number], color: '#2D7FF9', scale: 1.2 },
        { type: 'sphere', position: [2.2, 0.8, -0.5] as [number, number, number], color: '#16C47F', scale: 0.5 },
        { type: 'torus', position: [-2.2, -0.6, -0.5] as [number, number, number], color: '#F59E0B', scale: 0.5 },
      ];
    }
    // hero
    return [
      { type: 'cube', position: [-2.5, 0.8, -0.5] as [number, number, number], color: '#2D7FF9', scale: 0.7 },
      { type: 'sphere', position: [2.5, -0.5, -0.5] as [number, number, number], color: '#16C47F', scale: 0.6 },
      { type: 'pyramid', position: [0, 1.2, -1] as [number, number, number], color: '#F59E0B', scale: 0.6 },
      { type: 'torus', position: [-1.8, -1, 0] as [number, number, number], color: '#8B5CF6', scale: 0.5 },
      { type: 'octahedron', position: [1.8, 1, 0] as [number, number, number], color: '#FF5A5F', scale: 0.5 },
    ];
  }, [variant]);

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-5, -5, -5]} intensity={0.3} color="#2D7FF9" />
      <pointLight position={[0, 0, 5]} intensity={0.5} color="#16C47F" />
      {objects.map((obj, i) => {
        const key = `${obj.type}-${i}`;
        switch (obj.type) {
          case 'cube':
            return <FloatingCube key={key} position={obj.position} color={obj.color} scale={obj.scale} />;
          case 'sphere':
            return <FloatingSphere key={key} position={obj.position} color={obj.color} scale={obj.scale} />;
          case 'pyramid':
            return <FloatingPyramid key={key} position={obj.position} color={obj.color} scale={obj.scale} />;
          case 'torus':
            return <FloatingTorus key={key} position={obj.position} color={obj.color} scale={obj.scale} />;
          case 'octahedron':
            return <FloatingOctahedron key={key} position={obj.position} color={obj.color} scale={obj.scale} />;
          default:
            return null;
        }
      })}
    </>
  );
}

export function FloatingObjects({ variant = 'hero', className = '' }: FloatingObjectsProps) {
  return (
    <div className={`pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene variant={variant} />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Lightweight single-object version for lesson intro
export function FloatingObject({ type = 'octahedron', color = '#2D7FF9' }: { type?: 'cube' | 'sphere' | 'pyramid' | 'torus' | 'octahedron'; color?: string }) {
  return (
    <div className="pointer-events-none w-full h-full">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }} style={{ background: 'transparent' }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[3, 3, 3]} intensity={1.2} />
          <pointLight position={[-3, -3, 2]} intensity={0.4} color={color} />
          {type === 'cube' && <FloatingCube position={[0, 0, 0]} color={color} scale={1.3} />}
          {type === 'sphere' && <FloatingSphere position={[0, 0, 0]} color={color} scale={1.3} />}
          {type === 'pyramid' && <FloatingPyramid position={[0, 0, 0]} color={color} scale={1.3} />}
          {type === 'torus' && <FloatingTorus position={[0, 0, 0]} color={color} scale={1.3} />}
          {type === 'octahedron' && <FloatingOctahedron position={[0, 0, 0]} color={color} scale={1.3} />}
        </Suspense>
      </Canvas>
    </div>
  );
}
