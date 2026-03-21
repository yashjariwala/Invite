"use client";

import { useRef, useMemo, useEffect, memo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

/* ─── Preload models ─── */
useGLTF.preload("/models/chandelier.glb");
useGLTF.preload("/models/flower1.glb");
useGLTF.preload("/models/flower2.glb");
useGLTF.preload("/models/candle.glb");

/* ─── Constants ─── */
const MZ = -14;

/* ─── Camera — cinematic push-in toward sacred fire ─── */
export function CameraRig({ progress }: { progress: React.MutableRefObject<number> }) {
  const { camera } = useThree();
  useFrame(() => {
    const p   = progress.current;
    const tz  = 20 - p * 28;
    const ty  = 4.5 - p * 3.0;
    const tzC = Math.max(tz, MZ + 8);
    camera.position.z += (tzC - camera.position.z) * 0.045;
    camera.position.y += (ty   - camera.position.y) * 0.045;
    camera.position.x += (0    - camera.position.x) * 0.06;
    camera.lookAt(0, 1.5, MZ);
    const cam = camera as THREE.PerspectiveCamera;
    cam.fov += ((65 - p * 10) - cam.fov) * 0.035;
    cam.updateProjectionMatrix();
  });
  return null;
}

/* ─── Reflective marble floor ─── */
function MarbleFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, MZ - 2]}>
      <planeGeometry args={[34, 44]} />
      <meshPhysicalMaterial
        color="#fff8f2"
        roughness={0.02}
        metalness={0}
        clearcoat={1}
        clearcoatRoughness={0.01}
        reflectivity={1}
      />
    </mesh>
  );
}

/* ─── Hero sacred fire ─── */
function SacredFire() {
  const outer = useRef<THREE.Mesh>(null);
  const mid   = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (outer.current) {
      outer.current.scale.x = 1 + Math.sin(t * 4.1) * 0.14;
      outer.current.scale.z = 1 + Math.cos(t * 3.7) * 0.11;
    }
    if (mid.current) {
      mid.current.scale.x = 1 + Math.sin(t * 6.3 + 1) * 0.10;
      mid.current.position.y = 0.9 + Math.sin(t * 3.8) * 0.06;
    }
    if (inner.current) {
      inner.current.scale.x = 1 + Math.sin(t * 9.1 + 2) * 0.08;
      inner.current.position.y = 0.7 + Math.sin(t * 5.5 + 1) * 0.05;
    }
  });

  return (
    <group position={[0, 0.25, MZ]}>
      {/* Diya kund */}
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.55, 0.42, 0.28, 12]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.08}
          emissive="#8B6914" emissiveIntensity={1.0} toneMapped={false} />
      </mesh>
      <mesh ref={outer} position={[0, 1.1, 0]}>
        <coneGeometry args={[0.42, 1.8, 8]} />
        <meshStandardMaterial color="#ff3a00" emissive="#cc2200" emissiveIntensity={6}
          toneMapped={false} transparent opacity={0.88} />
      </mesh>
      <mesh ref={mid} position={[0, 0.9, 0]}>
        <coneGeometry args={[0.28, 1.4, 7]} />
        <meshStandardMaterial color="#ff7000" emissive="#ff5500" emissiveIntensity={8}
          toneMapped={false} transparent opacity={0.82} />
      </mesh>
      <mesh ref={inner} position={[0, 0.7, 0]}>
        <coneGeometry args={[0.14, 0.9, 6]} />
        <meshStandardMaterial color="#ffcc60" emissive="#ffaa00" emissiveIntensity={12}
          toneMapped={false} transparent opacity={0.72} />
      </mesh>
      <pointLight position={[0, 2.2, 0]} intensity={180} distance={28} color="#f97316" decay={1.8} />
      <pointLight position={[0, 1.0, 0]} intensity={80}  distance={12} color="#fff8c0" decay={2.0} />
    </group>
  );
}

/* ─── Real GLTF chandelier ─── */
const GLTFChandelier = memo(function GLTFChandelier() {
  const { scene } = useGLTF("/models/chandelier.glb");

  // Make all materials in the chandelier glow gold
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const mat  = mesh.material as THREE.MeshStandardMaterial;
        if (mat) {
          mat.emissive    = new THREE.Color("#D4AF37");
          mat.emissiveIntensity = 1.8;
          mat.metalness   = 0.9;
          mat.roughness   = 0.1;
          mat.needsUpdate = true;
        }
      }
    });
  }, [scene]);

  return (
    <group position={[0, 9.5, MZ]} scale={[2.2, 2.2, 2.2]}>
      <primitive object={scene.clone()} />
      <pointLight position={[0, -1, 0]} intensity={50} distance={14} color="#ffe8a0" decay={1.5} />
    </group>
  );
});

/* ─── Real GLTF flower clusters at pillar bases ─── */
const GLTFFlowerCluster = memo(function GLTFFlowerCluster({
  position, scale = 1, rotY = 0, modelIndex = 0
}: {
  position: [number, number, number];
  scale?: number;
  rotY?: number;
  modelIndex?: number;
}) {
  const path  = modelIndex % 2 === 0 ? "/models/flower1.glb" : "/models/flower2.glb";
  const { scene } = useGLTF(path);

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const mat  = mesh.material as THREE.MeshStandardMaterial;
        if (mat) {
          // Warm up the flowers with a pink/peach emissive tint
          mat.emissive          = new THREE.Color("#f4a07a");
          mat.emissiveIntensity = 0.25;
          mat.needsUpdate       = true;
        }
      }
    });
  }, [scene]);

  return (
    <group position={position} rotation={[0, rotY, 0]} scale={[scale, scale, scale]}>
      <primitive object={scene.clone()} />
    </group>
  );
});

/* ─── Marigold toran (entrance garland) — procedural ─── */
function MarigoldToran({ z }: { z: number }) {
  const count  = 30;
  const dummy  = useMemo(() => new THREE.Object3D(), []);
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const span   = 9.0;

  useEffect(() => {
    if (!meshRef.current) return;
    for (let i = 0; i < count; i++) {
      const t   = i / (count - 1);
      const x   = -span / 2 + t * span;
      const sag = Math.sin(t * Math.PI) * 1.4;
      dummy.position.set(x, 7.6 - sag, z);
      dummy.scale.setScalar(0.15 + Math.random() * 0.06);
      dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [z, dummy, span]);

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 7, 7]} />
      <meshStandardMaterial
        color="#F97316"
        emissive="#e05000"
        emissiveIntensity={1.4}
        toneMapped={false}
        roughness={0.85}
      />
    </instancedMesh>
  );
}

/* ─── Mandap frame — pillars + gold beams ─── */
function MandapFrame() {
  const h  = 7.5;
  const hw = 4.0;
  const hd = 3.5;
  const corners: [number, number][] = [[-hw, -hd], [hw, -hd], [-hw, hd], [hw, hd]];

  return (
    <group>
      {corners.map(([cx, cz], i) => (
        <group key={i} position={[cx, 0, MZ + cz]}>
          <mesh position={[0, 0.32, 0]}>
            <cylinderGeometry args={[0.32, 0.38, 0.64, 12]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.05}
              emissive="#D4AF37" emissiveIntensity={1.2} toneMapped={false} />
          </mesh>
          <mesh position={[0, h / 2 + 0.64, 0]}>
            <cylinderGeometry args={[0.2, 0.22, h, 14]} />
            <meshStandardMaterial color="#fff8f0" roughness={0.5} />
          </mesh>
          <mesh position={[0, h + 0.8, 0]}>
            <cylinderGeometry args={[0.38, 0.22, 0.44, 12]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.05}
              emissive="#D4AF37" emissiveIntensity={1.4} toneMapped={false} />
          </mesh>
          {/* Real flower cluster at base */}
          <GLTFFlowerCluster
            position={[0, 1.5, 0]}
            scale={0.9}
            rotY={(i * Math.PI) / 2}
            modelIndex={i}
          />
        </group>
      ))}

      {/* Gold top beams */}
      {[[-hd, hw], [hd, hw], [0, hd * 2 + 0.4]].map((_, i) => null)}
      <mesh position={[0, h + 0.88, MZ - hd]}>
        <boxGeometry args={[hw * 2 + 0.4, 0.22, 0.22]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.05}
          emissive="#D4AF37" emissiveIntensity={1.5} toneMapped={false} />
      </mesh>
      <mesh position={[0, h + 0.88, MZ + hd]}>
        <boxGeometry args={[hw * 2 + 0.4, 0.22, 0.22]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.05}
          emissive="#D4AF37" emissiveIntensity={1.5} toneMapped={false} />
      </mesh>
      <mesh position={[-hw, h + 0.88, MZ]}>
        <boxGeometry args={[0.22, 0.22, hd * 2 + 0.4]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.05}
          emissive="#D4AF37" emissiveIntensity={1.5} toneMapped={false} />
      </mesh>
      <mesh position={[hw, h + 0.88, MZ]}>
        <boxGeometry args={[0.22, 0.22, hd * 2 + 0.4]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.05}
          emissive="#D4AF37" emissiveIntensity={1.5} toneMapped={false} />
      </mesh>

      {/* Sheer peach silk canopy — lit from below by fire */}
      <mesh position={[0, h + 1.0, MZ]}>
        <planeGeometry args={[hw * 2, hd * 2]} />
        <meshStandardMaterial color="#f4a07a" roughness={0.95} transparent opacity={0.28}
          side={THREE.DoubleSide} emissive="#f97316" emissiveIntensity={0.55} />
      </mesh>

      {/* Reflective stage */}
      <mesh position={[0, 0.1, MZ]}>
        <cylinderGeometry args={[5.8, 6.2, 0.22, 36]} />
        <meshPhysicalMaterial color="#fff8f0" roughness={0.03} clearcoat={1}
          clearcoatRoughness={0.01} reflectivity={1} />
      </mesh>

      <pointLight position={[0, 12, MZ]} intensity={60} distance={20} color="#fff8e0" decay={1.5} />
    </group>
  );
}

/* ─── Diya ring using real candle models ─── */
function DiyaRing() {
  const count  = 8;
  const radius = 1.8;
  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const a  = (i / count) * Math.PI * 2;
        const dx = Math.cos(a) * radius;
        const dz = Math.sin(a) * radius + MZ;
        return (
          <group key={i} position={[dx, 0.26, dz]}>
            {/* Gold diya bowl */}
            <mesh position={[0, 0.06, 0]}>
              <cylinderGeometry args={[0.1, 0.08, 0.1, 8]} />
              <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
            </mesh>
            {/* Tiny flame */}
            <mesh position={[0, 0.2, 0]}>
              <coneGeometry args={[0.045, 0.22, 5]} />
              <meshStandardMaterial color="#ffe680" emissive="#ffcc00" emissiveIntensity={10}
                toneMapped={false} transparent opacity={0.9} />
            </mesh>
            <pointLight position={[0, 0.4, 0]} intensity={6} distance={4} color="#ffa040" decay={2} />
          </group>
        );
      })}
    </>
  );
}

/* ─── Golden fireflies ─── */
function Fireflies({ mobile }: { mobile: boolean }) {
  const count = mobile ? 60 : 200;
  const mesh  = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const data  = useMemo(() => Array.from({ length: count }, () => ({
    x: (Math.random() - 0.5) * 20,
    y: Math.random() * 9,
    z: MZ - 6 + Math.random() * 26,
    spd: 0.008 + Math.random() * 0.012,
    drift: (Math.random() - 0.5) * 0.004,
    phase: Math.random() * Math.PI * 2,
  })), [count]);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.elapsedTime;
    data.forEach((f, i) => {
      f.y += f.spd;
      f.x += Math.sin(t * 0.5 + f.phase) * f.drift;
      if (f.y > 9) { f.y = 0.5; f.x = (Math.random() - 0.5) * 20; }
      dummy.position.set(f.x, f.y, f.z);
      dummy.scale.setScalar(0.055 + Math.sin(t * 3 + f.phase) * 0.02);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 5, 5]} />
      <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={8} toneMapped={false} />
    </instancedMesh>
  );
}

/* ─── Rose petals shower ─── */
export function Petals({ mobile }: { mobile: boolean }) {
  const count  = mobile ? 60 : 220;
  const mesh   = useRef<THREE.InstancedMesh>(null);
  const dummy  = useMemo(() => new THREE.Object3D(), []);
  const palette = useMemo(() =>
    ["#ffffff", "#ffd5c8", "#ffb8a0", "#ff8080", "#ffe0cc", "#ffc0cb"]
      .map(c => new THREE.Color(c)), []);
  const data = useMemo(() => Array.from({ length: count }, () => ({
    x: (Math.random() - 0.5) * 24,
    y: Math.random() * 10 + 2,
    z: MZ - 8 + Math.random() * 32,
    spd: 0.005 + Math.random() * 0.009,
    dx: (Math.random() - 0.5) * 0.005,
    rot: Math.random() * Math.PI * 2,
    rSpd: (Math.random() - 0.5) * 0.025,
    color: Math.floor(Math.random() * 6),
  })), [count]);

  useFrame(() => {
    if (!mesh.current) return;
    data.forEach((p, i) => {
      p.y   -= p.spd;
      p.x   += p.dx;
      p.rot += p.rSpd;
      if (p.y < 0) { p.y = 12; p.x = (Math.random() - 0.5) * 24; }
      dummy.position.set(p.x, p.y, p.z);
      dummy.rotation.set(p.rot, p.rot * 0.5, 0);
      dummy.scale.setScalar(0.11);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
      mesh.current!.setColorAt(i, palette[p.color]);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
    if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <planeGeometry args={[1, 1.3]} />
      <meshStandardMaterial side={THREE.DoubleSide} roughness={0.6} transparent opacity={0.9} />
    </instancedMesh>
  );
}

/* ─── Full scene ─── */
export function Scene({ mobile }: { mobile: boolean }) {
  return (
    <>
      <color attach="background" args={["#0d0308"]} />
      <fog attach="fog" args={["#0d0308", 22, 55]} />
      <ambientLight intensity={0.18} color="#ffe8cc" />
      <hemisphereLight args={["#ff8c40", "#1a0408", 0.22]} />

      <MarbleFloor />
      <SacredFire />
      <DiyaRing />
      <MandapFrame />
      <GLTFChandelier />
      <MarigoldToran z={MZ - 3.5} />
      <Fireflies mobile={mobile} />
      <Petals mobile={mobile} />

      {!mobile && (
        <EffectComposer>
          <Bloom luminanceThreshold={0.45} luminanceSmoothing={0.85} intensity={1.4} height={400} />
          <Vignette eskil={false} offset={0.3} darkness={0.75} />
        </EffectComposer>
      )}
    </>
  );
}
