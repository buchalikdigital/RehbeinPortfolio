"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Environment,
  Lightformer,
  MeshTransmissionMaterial,
} from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

type Quality = "high" | "low";

type DropDef = {
  position: [number, number, number];
  scale: number;
  speed: number;
  rotationIntensity: number;
  floatIntensity: number;
  geo: "sphere" | "ico" | "torus";
};

// Deterministic layout so the scene reads as composed, not random.
const DROPS: DropDef[] = [
  { position: [-4.6, 1.9, 0], scale: 1.5, speed: 1.4, rotationIntensity: 1.2, floatIntensity: 1.6, geo: "sphere" },
  { position: [4.7, 1.2, -1], scale: 2.2, speed: 1.0, rotationIntensity: 0.9, floatIntensity: 1.3, geo: "ico" },
  { position: [-2.4, -2.1, 1], scale: 1.1, speed: 1.8, rotationIntensity: 1.4, floatIntensity: 1.9, geo: "sphere" },
  { position: [3.0, -2.6, 0.5], scale: 1.25, speed: 1.2, rotationIntensity: 1.1, floatIntensity: 1.5, geo: "torus" },
  { position: [0.2, 3.0, -1.5], scale: 0.8, speed: 2.0, rotationIntensity: 1.6, floatIntensity: 2.1, geo: "sphere" },
  { position: [-5.6, -0.8, -2], scale: 0.9, speed: 1.6, rotationIntensity: 1.3, floatIntensity: 1.7, geo: "ico" },
  { position: [5.7, -0.4, -2.2], scale: 1.0, speed: 1.5, rotationIntensity: 1.0, floatIntensity: 1.6, geo: "sphere" },
  { position: [2.2, -2.2, 1.4], scale: 1.2, speed: 0.9, rotationIntensity: 0.8, floatIntensity: 1.1, geo: "ico" },
  { position: [-1.8, 3.1, 0.4], scale: 0.65, speed: 2.2, rotationIntensity: 1.8, floatIntensity: 2.2, geo: "sphere" },
];

function Geometry({ geo }: { geo: DropDef["geo"] }) {
  if (geo === "ico") return <icosahedronGeometry args={[1, 6]} />;
  if (geo === "torus") return <torusGeometry args={[0.7, 0.32, 32, 96]} />;
  return <sphereGeometry args={[1, 48, 48]} />;
}

function Drop({ def, quality }: { def: DropDef; quality: Quality }) {
  const materialProps =
    quality === "high"
      ? {
          samples: 10,
          resolution: 256,
          transmission: 1,
          roughness: 0.04,
          thickness: 1.6,
          ior: 1.34,
          chromaticAberration: 0.42,
          anisotropy: 0.3,
          distortion: 0.28,
          distortionScale: 0.35,
          temporalDistortion: 0.12,
        }
      : {
          samples: 4,
          resolution: 128,
          transmission: 1,
          roughness: 0.08,
          thickness: 1.2,
          ior: 1.33,
          chromaticAberration: 0.16,
          anisotropy: 0.1,
          distortion: 0.1,
          distortionScale: 0.2,
          temporalDistortion: 0,
        };

  return (
    <Float
      speed={def.speed}
      rotationIntensity={def.rotationIntensity}
      floatIntensity={def.floatIntensity}
      floatingRange={[-0.25, 0.25]}
    >
      <mesh position={def.position} scale={def.scale}>
        <Geometry geo={def.geo} />
        <MeshTransmissionMaterial
          {...materialProps}
          color="#dcecff"
          attenuationColor="#8fbaf0"
          attenuationDistance={2.4}
          clearcoat={1}
          clearcoatRoughness={0.1}
          background={new THREE.Color("#eaf2fe")}
        />
      </mesh>
    </Float>
  );
}

function ParallaxRig({
  children,
  quality,
}: {
  children: React.ReactNode;
  quality: Quality;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    const damp = quality === "high" ? 2.2 : 3.5;
    const targetY = state.pointer.x * 0.4;
    const targetX = -state.pointer.y * 0.25;
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      targetY,
      damp,
      delta
    );
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      targetX,
      damp,
      delta
    );
    group.current.position.x = THREE.MathUtils.damp(
      group.current.position.x,
      state.pointer.x * 0.6,
      damp,
      delta
    );
  });

  return <group ref={group}>{children}</group>;
}

export default function GlassScene({
  quality = "high",
  paused = false,
}: {
  quality?: Quality;
  paused?: boolean;
}) {
  const drops = quality === "high" ? DROPS : DROPS.slice(0, 5);

  return (
    <Canvas
      frameloop={paused ? "never" : "always"}
      dpr={[1, quality === "high" ? 2 : 1.5]}
      camera={{ position: [0, 0, 14], fov: 32 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 6]} intensity={1.4} color="#ffffff" />
      <directionalLight position={[-6, -4, 2]} intensity={0.8} color="#ffb44d" />
      <pointLight position={[0, 0, 8]} intensity={30} color="#4a9bff" />

      <ParallaxRig quality={quality}>
        {drops.map((def, i) => (
          <Drop key={i} def={def} quality={quality} />
        ))}
      </ParallaxRig>

      {/* Self-contained lighting environment (no external HDR download). */}
      <Environment resolution={quality === "high" ? 256 : 128}>
        <group>
          {/* cool key — sky/water */}
          <Lightformer
            form="rect"
            intensity={3}
            color="#bfe0ff"
            position={[-4, 3, 4]}
            scale={[8, 8, 1]}
          />
          {/* bright top */}
          <Lightformer
            form="rect"
            intensity={2.2}
            color="#ffffff"
            position={[2, 5, 3]}
            scale={[6, 6, 1]}
          />
          {/* warm gold rim */}
          <Lightformer
            form="circle"
            intensity={3.5}
            color="#ffb020"
            position={[5, -2, 3]}
            scale={[5, 5, 1]}
          />
          {/* orange energy accent */}
          <Lightformer
            form="circle"
            intensity={2.4}
            color="#f1650f"
            position={[-5, -3, 2]}
            scale={[4, 4, 1]}
          />
        </group>
      </Environment>
    </Canvas>
  );
}
