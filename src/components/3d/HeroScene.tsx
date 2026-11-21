import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Create procedural texture for the clapperboard stripes
function createClapperStripeTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.Texture();

  // Background dark carbon
  ctx.fillStyle = '#0a0a0c';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Diagonal alternating stripes (White / Light metallic & Dark Red / Red)
  const stripeWidth = 50;
  ctx.lineWidth = stripeWidth;

  for (let i = -canvas.width; i < canvas.width * 2; i += stripeWidth * 2) {
    ctx.strokeStyle = '#f3f4f6';
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + 80, canvas.height);
    ctx.stroke();

    // Red accent line on each stripe
    ctx.strokeStyle = '#FF1744';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(i + 77, 0);
    ctx.lineTo(i + 157, canvas.height);
    ctx.stroke();
    ctx.lineWidth = stripeWidth;
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

// Create procedural filmstrip texture with sprockets and frame lines
function createFilmstripTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.Texture();

  // Base translucent amber/ruby dark film
  ctx.fillStyle = 'rgba(20, 5, 8, 0.95)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const numFrames = 8;
  const frameWidth = canvas.width / numFrames;

  for (let f = 0; f < numFrames; f++) {
    const x = f * frameWidth;

    // Frame divider line
    ctx.strokeStyle = 'rgba(255, 23, 68, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();

    // Frame area preview placeholder
    ctx.fillStyle = 'rgba(255, 23, 68, 0.08)';
    ctx.fillRect(x + 10, 26, frameWidth - 20, canvas.height - 52);

    // Subtle audio track line on edge
    ctx.fillStyle = 'rgba(255, 50, 80, 0.6)';
    ctx.fillRect(x + 4, 18, frameWidth - 8, 2);

    // Film sprocket holes (top and bottom rows)
    const sprocketsPerFrame = 4;
    const sprocketSpacing = frameWidth / sprocketsPerFrame;
    for (let s = 0; s < sprocketsPerFrame; s++) {
      const sx = x + s * sprocketSpacing + 6;
      ctx.fillStyle = '#050505';
      ctx.fillRect(sx, 6, 12, 14);
      ctx.fillRect(sx, canvas.height - 20, 12, 14);

      ctx.strokeStyle = 'rgba(255, 23, 68, 0.5)';
      ctx.lineWidth = 1;
      ctx.strokeRect(sx, 6, 12, 14);
      ctx.strokeRect(sx, canvas.height - 20, 12, 14);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.repeat.set(2, 1);
  return texture;
}

// 3D Play Button Triangle Geometry
function PlayButton() {
  const meshRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  const playShape = useMemo(() => {
    const shape = new THREE.Shape();
    const size = 0.55;
    const height = size * Math.sqrt(3);
    shape.moveTo(-size, -size * 0.85);
    shape.lineTo(height - size, 0);
    shape.lineTo(-size, size * 0.85);
    shape.closePath();
    return shape;
  }, []);

  const extrudeSettings = useMemo(() => ({
    depth: 0.16,
    bevelEnabled: true,
    bevelSegments: 4,
    steps: 1,
    bevelSize: 0.04,
    bevelThickness: 0.04
  }), []);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime();
      const pulse = 1.6 + Math.sin(t * 3.5) * 0.4;
      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        mat.emissiveIntensity = pulse;
      }
      if (lightRef.current) {
        lightRef.current.intensity = 2.5 + Math.sin(t * 3.5) * 0.8;
      }
    }
  });

  return (
    <group position={[0, -0.15, 0.16]}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <extrudeGeometry args={[playShape, extrudeSettings]} />
        <meshStandardMaterial
          color="#FF1744"
          emissive="#FF1744"
          emissiveIntensity={0.6}
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>
      <pointLight
        ref={lightRef}
        color="#FF1744"
        intensity={1.2}
        distance={3}
        decay={2}
      />
    </group>
  );
}

// Clapperboard Composite Object - with interactive 3D rotation strictly bounded to hover
function Clapperboard({ hoverCoords }: { hoverCoords: { x: number; y: number; isHovered: boolean } }) {
  const groupRef = useRef<THREE.Group>(null);
  const clapperTopRef = useRef<THREE.Group>(null);
  
  const stripeTexture = useMemo(() => createClapperStripeTexture(), []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Resting baseline 3/4 isometric perspective
    const baseRotX = -0.08;
    const baseRotY = 0.35;

    // When the cursor hovers specifically over the 3D clapperboard, compute dynamic 3D tilt
    const targetRotX = hoverCoords.isHovered 
      ? baseRotX + (hoverCoords.y * 0.42)
      : baseRotX;
    const targetRotY = hoverCoords.isHovered 
      ? baseRotY + (hoverCoords.x * 0.58)
      : baseRotY;

    // Silky smooth interpolation damping with zero jitter
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      targetRotX,
      5.5,
      delta
    );
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetRotY,
      5.5,
      delta
    );

    // Subtle breathing on top stick
    if (clapperTopRef.current) {
      const breathe = Math.sin(Date.now() * 0.002) * 0.03;
      clapperTopRef.current.rotation.z = 0.38 + breathe;
    }
  });

  return (
    <group ref={groupRef} position={[0.2, 0.1, 0]}>
      {/* --- 1. Lower Slate Body (Acrylic / Dark Glass with red beveled edge) --- */}
      <group position={[0, -0.3, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3.2, 2.1, 0.16]} />
          <meshPhysicalMaterial
            color="#08080C"
            roughness={0.12}
            metalness={0.15}
            transmission={0.82}
            thickness={0.6}
            ior={1.45}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>

        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[3.24, 2.14, 0.14]} />
          <meshStandardMaterial
            color="#FF1744"
            emissive="#FF1744"
            emissiveIntensity={0.8}
            wireframe={true}
            transparent
            opacity={0.35}
          />
        </mesh>

        <PlayButton />

        <mesh position={[0, -0.95, 0.09]}>
          <boxGeometry args={[3.0, 0.06, 0.02]} />
          <meshStandardMaterial color="#FF1744" emissive="#FF1744" emissiveIntensity={0.7} />
        </mesh>

        <mesh position={[-0.8, -0.7, 0.09]}>
          <planeGeometry args={[1.0, 0.2]} />
          <meshBasicMaterial color="#333340" />
        </mesh>
        <mesh position={[0.8, -0.7, 0.09]}>
          <planeGeometry args={[1.0, 0.2]} />
          <meshBasicMaterial color="#333340" />
        </mesh>
      </group>

      {/* --- 2. Fixed Lower Clapper Stick --- */}
      <group position={[0, 0.82, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3.2, 0.36, 0.2]} />
          <meshStandardMaterial
            map={stripeTexture}
            roughness={0.25}
            metalness={0.3}
          />
        </mesh>
        <mesh position={[0, -0.19, 0.05]}>
          <boxGeometry args={[3.22, 0.03, 0.22]} />
          <meshStandardMaterial color="#FF1744" emissive="#FF1744" emissiveIntensity={1.2} />
        </mesh>
      </group>

      {/* --- 3. Angled Top Clapper Stick --- */}
      <group
        ref={clapperTopRef}
        position={[-1.5, 0.88, 0.12]}
        rotation={[0, 0, 0.38]}
      >
        <mesh position={[1.5, 0.22, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.2, 0.36, 0.2]} />
          <meshStandardMaterial
            map={stripeTexture}
            roughness={0.25}
            metalness={0.3}
          />
        </mesh>

        <mesh position={[1.5, 0.02, 0]}>
          <boxGeometry args={[3.22, 0.03, 0.22]} />
          <meshStandardMaterial color="#FF1744" emissive="#FF1744" emissiveIntensity={1.2} />
        </mesh>

        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.14, 0.14, 0.3, 16]} />
          <meshStandardMaterial color="#d1d5db" roughness={0.1} metalness={0.9} />
        </mesh>
        <mesh position={[0, 0, 0.16]}>
          <circleGeometry args={[0.1, 16]} />
          <meshStandardMaterial color="#FF1744" emissive="#FF1744" emissiveIntensity={0.8} />
        </mesh>
      </group>
    </group>
  );
}

// 3D Curving Celluloid Filmstrip Ribbon wrapping around the clapperboard
function CurvedFilmstrip() {
  const meshRef = useRef<THREE.Mesh>(null);
  const filmTexture = useMemo(() => createFilmstripTexture(), []);

  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-3.2, -1.8, 1.4),
      new THREE.Vector3(-2.2, -1.2, 1.8),
      new THREE.Vector3(0.0, -1.6, 1.6),
      new THREE.Vector3(2.4, -1.0, 1.2),
      new THREE.Vector3(3.2, 0.2, 0.2),
      new THREE.Vector3(2.6, 1.4, -1.0),
      new THREE.Vector3(0.8, 1.6, -1.6),
      new THREE.Vector3(-1.4, 1.2, -1.2),
      new THREE.Vector3(-2.8, 0.0, -0.4),
      new THREE.Vector3(-3.0, -1.2, 0.8),
      new THREE.Vector3(-1.8, -1.8, 1.5),
      new THREE.Vector3(1.2, -1.9, 1.6),
      new THREE.Vector3(3.4, -1.4, 1.3),
    ]);

    const points = curve.getPoints(100);
    const width = 0.55;
    const positions: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];

    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      const tangent = curve.getTangent(i / (points.length - 1)).normalize();
      const up = new THREE.Vector3(0, 1, 0);
      let binormal = new THREE.Vector3().crossVectors(tangent, up).normalize();
      if (binormal.lengthSq() < 0.001) binormal.set(1, 0, 0);

      const pTop = new THREE.Vector3().copy(p).addScaledVector(up, width * 0.5);
      const pBottom = new THREE.Vector3().copy(p).addScaledVector(up, -width * 0.5);

      positions.push(pTop.x, pTop.y, pTop.z);
      positions.push(pBottom.x, pBottom.y, pBottom.z);

      const u = (i / (points.length - 1)) * 4;
      uvs.push(u, 1);
      uvs.push(u, 0);

      if (i < points.length - 1) {
        const v1 = i * 2;
        const v2 = i * 2 + 1;
        const v3 = (i + 1) * 2;
        const v4 = (i + 1) * 2 + 1;

        indices.push(v1, v2, v3);
        indices.push(v2, v4, v3);
        indices.push(v3, v2, v1);
        indices.push(v3, v4, v2);
      }
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geom.setIndex(indices);
    geom.computeVertexNormals();
    return geom;
  }, []);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime();
      meshRef.current.position.y = Math.sin(t * 0.8) * 0.08;
      meshRef.current.rotation.y = Math.sin(t * 0.4) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshPhysicalMaterial
        map={filmTexture}
        color="#150508"
        emissive="#FF1744"
        emissiveIntensity={0.25}
        roughness={0.15}
        metalness={0.2}
        transmission={0.65}
        thickness={0.4}
        side={THREE.DoubleSide}
        transparent
        opacity={0.92}
      />
    </mesh>
  );
}

// Atmospheric Floating Red Dust / Bokeh Particles
function CinematicParticles({ count = 60 }: { count?: number }) {
  const points = useMemo(() => {
    const coords = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      coords[i * 3] = (Math.random() - 0.5) * 10;
      coords[i * 3 + 1] = (Math.random() - 0.5) * 8;
      coords[i * 3 + 2] = (Math.random() - 0.5) * 6;
      scales[i] = Math.random() * 0.05 + 0.02;
    }
    return { coords, scales };
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      const t = clock.getElapsedTime() * 0.2;
      pointsRef.current.rotation.y = t * 0.3;
      pointsRef.current.position.y = Math.sin(t) * 0.15;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[points.coords, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#FF2A40"
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Main Canvas Scene Container - Interactive 3D hover strictly bounded to the 3D container
export default function HeroScene() {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [hoverCoords, setHoverCoords] = useState({ x: 0, y: 0, isHovered: false });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Normalized coordinates between -1 and +1 relative to this container
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    setHoverCoords({ x, y, isHovered: true });
  };

  const handlePointerLeave = () => {
    // Smoothly return to resting position
    setHoverCoords({ x: 0, y: 0, isHovered: false });
  };

  if (!hasWebGL) {
    return (
      <div className="relative w-full h-full flex items-center justify-center p-8">
        <div className="relative w-72 md:w-96 aspect-[4/3] rounded-2xl border border-red-500/30 bg-surface-card/80 p-6 flex flex-col items-center justify-center shadow-glow-red-lg">
          <div className="w-20 h-20 rounded-full bg-red-600/20 border border-red-500 flex items-center justify-center text-red-500 shadow-glow-red animate-pulse">
            <div className="w-0 h-0 border-y-[14px] border-y-transparent border-l-[24px] border-l-red-500 ml-1"></div>
          </div>
          <span className="mt-4 text-xs font-mono tracking-widest text-red-400 uppercase font-display">3D CLAPPERBOARD ENGINE</span>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full h-[460px] lg:h-[580px] select-none pointer-events-auto cursor-grab active:cursor-grabbing"
      title="Interactive 3D Clapperboard"
    >
      <Canvas
        shadows
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
        style={{ pointerEvents: 'none' }} // Lets the outer container handle smooth pointer events
      >
        <PerspectiveCamera makeDefault position={[0, 0, 5.8]} fov={45} />

        {/* Cinematic Red & White Lighting Setup */}
        <ambientLight intensity={0.4} color="#150508" />
        <directionalLight position={[-4, 5, 4]} intensity={1.5} color="#ffffff" />
        {/* Strong Red Rim Light from Top Right Back */}
        <spotLight
          position={[5, 4, 3]}
          angle={0.6}
          penumbra={0.8}
          intensity={6.5}
          color="#FF1744"
          castShadow
        />
        {/* Fill Rim Light from Left */}
        <pointLight position={[-5, -2, -2]} intensity={3.5} color="#B00020" />
        {/* Top Rim Highlighting Sticks */}
        <pointLight position={[0, 4, 2]} intensity={3.0} color="#FF334B" />

        {/* Subtle Float Motion */}
        <Float speed={2} rotationIntensity={0.12} floatIntensity={0.3}>
          <Clapperboard hoverCoords={hoverCoords} />
          <CurvedFilmstrip />
        </Float>

        {/* Ambient floating dust particles */}
        <CinematicParticles count={70} />
      </Canvas>
    </div>
  );
}
