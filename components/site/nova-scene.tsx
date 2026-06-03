"use client";

import { Float, OrbitControls, Sparkles as DreiSparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function GlowMaterial({
  color,
  intensity = 0.22,
}: {
  color: string;
  intensity?: number;
}) {
  return (
    <meshPhysicalMaterial
      clearcoat={0.42}
      color={color}
      emissive={color}
      emissiveIntensity={intensity}
      metalness={0.18}
      roughness={0.2}
    />
  );
}

function MiniVase({ position }: { position: [number, number, number] }) {
  return (
    <Float floatIntensity={0.42} rotationIntensity={0.24} speed={1.8}>
      <group position={position} rotation={[0.22, -0.35, -0.08]} scale={0.72}>
        {[0, 1, 2, 3, 4].map((layer) => (
          <mesh castShadow key={layer} position={[0, layer * 0.16, 0]}>
            <cylinderGeometry
              args={[0.34 - layer * 0.018, 0.44 - layer * 0.028, 0.11, 48]}
            />
            <GlowMaterial color={layer % 2 ? "#A855F7" : "#43E7FF"} />
          </mesh>
        ))}
        <mesh castShadow position={[0, 0.88, 0]}>
          <torusGeometry args={[0.24, 0.035, 18, 64]} />
          <GlowMaterial color="#E0F7FF" intensity={0.12} />
        </mesh>
      </group>
    </Float>
  );
}

function GearPart({ position }: { position: [number, number, number] }) {
  const teeth = Array.from({ length: 12 });

  return (
    <Float floatIntensity={0.5} rotationIntensity={0.5} speed={1.35}>
      <group position={position} rotation={[0.62, 0.12, 0.4]} scale={0.78}>
        <mesh castShadow>
          <torusGeometry args={[0.42, 0.12, 22, 84]} />
          <GlowMaterial color="#FACC15" intensity={0.16} />
        </mesh>
        {teeth.map((_, index) => {
          const angle = (index / teeth.length) * Math.PI * 2;

          return (
            <mesh
              castShadow
              key={index}
              position={[Math.cos(angle) * 0.55, Math.sin(angle) * 0.55, 0]}
              rotation={[0, 0, angle]}
            >
              <boxGeometry args={[0.16, 0.08, 0.22]} />
              <GlowMaterial color="#FACC15" intensity={0.14} />
            </mesh>
          );
        })}
        <mesh>
          <cylinderGeometry args={[0.14, 0.14, 0.28, 32]} />
          <meshBasicMaterial color="#070707" />
        </mesh>
      </group>
    </Float>
  );
}

function GamingDock({ position }: { position: [number, number, number] }) {
  return (
    <Float floatIntensity={0.44} rotationIntensity={0.36} speed={1.55}>
      <group position={position} rotation={[0.18, 0.72, -0.12]} scale={0.68}>
        <mesh castShadow>
          <boxGeometry args={[1.16, 0.18, 0.55]} />
          <GlowMaterial color="#111827" intensity={0.06} />
        </mesh>
        <mesh castShadow position={[-0.46, 0.16, 0]}>
          <sphereGeometry args={[0.23, 28, 18]} />
          <GlowMaterial color="#43E7FF" intensity={0.2} />
        </mesh>
        <mesh castShadow position={[0.46, 0.16, 0]}>
          <sphereGeometry args={[0.23, 28, 18]} />
          <GlowMaterial color="#A855F7" intensity={0.22} />
        </mesh>
        {[-0.22, 0.22].map((x) => (
          <mesh castShadow key={x} position={[x, 0.27, 0.12]}>
            <cylinderGeometry args={[0.045, 0.045, 0.08, 16]} />
            <GlowMaterial color="#E2E8F0" intensity={0.1} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function BrandPlate({ position }: { position: [number, number, number] }) {
  return (
    <Float floatIntensity={0.36} rotationIntensity={0.2} speed={1.2}>
      <group position={position} rotation={[-0.18, -0.76, 0.08]} scale={0.78}>
        <mesh castShadow>
          <boxGeometry args={[1.18, 0.62, 0.08]} />
          <GlowMaterial color="#111827" intensity={0.08} />
        </mesh>
        <mesh castShadow position={[-0.34, 0.02, 0.08]}>
          <boxGeometry args={[0.28, 0.34, 0.08]} />
          <GlowMaterial color="#43E7FF" intensity={0.24} />
        </mesh>
        <mesh castShadow position={[0.08, 0.02, 0.08]}>
          <boxGeometry args={[0.28, 0.34, 0.08]} />
          <GlowMaterial color="#A855F7" intensity={0.24} />
        </mesh>
        <mesh castShadow position={[0.42, 0.02, 0.08]}>
          <boxGeometry args={[0.18, 0.34, 0.08]} />
          <GlowMaterial color="#43E7FF" intensity={0.2} />
        </mesh>
      </group>
    </Float>
  );
}

function MiniatureFigure({ position }: { position: [number, number, number] }) {
  return (
    <Float floatIntensity={0.55} rotationIntensity={0.42} speed={1.7}>
      <group position={position} rotation={[0.28, -0.28, 0.08]} scale={0.62}>
        <mesh castShadow position={[0, 0.56, 0]}>
          <sphereGeometry args={[0.22, 32, 18]} />
          <GlowMaterial color="#FB7185" intensity={0.2} />
        </mesh>
        <mesh castShadow position={[0, 0.16, 0]}>
          <coneGeometry args={[0.36, 0.72, 5]} />
          <GlowMaterial color="#A855F7" intensity={0.22} />
        </mesh>
        <mesh castShadow position={[0, -0.28, 0]}>
          <cylinderGeometry args={[0.42, 0.5, 0.14, 48]} />
          <GlowMaterial color="#43E7FF" intensity={0.16} />
        </mesh>
      </group>
    </Float>
  );
}

function FilamentThread() {
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-1.18, 1.28, -0.86),
    new THREE.Vector3(-0.72, 1.04, -0.72),
    new THREE.Vector3(-0.2, 0.82, -0.62),
    new THREE.Vector3(0, 0.5, -0.58),
  ]);

  return (
    <mesh>
      <tubeGeometry args={[curve, 56, 0.018, 10, false]} />
      <meshBasicMaterial color="#43E7FF" transparent opacity={0.78} />
    </mesh>
  );
}

function ProductCloud() {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!group.current) {
      return;
    }

    const time = clock.getElapsedTime();
    group.current.rotation.y = time * 0.12;
    group.current.position.y = Math.sin(time * 0.7) * 0.08;
  });

  return (
    <group ref={group} position={[0.12, 0.08, 0.04]}>
      <MiniVase position={[1.28, 0.5, 0.18]} />
      <GearPart position={[1.24, -0.7, 0.58]} />
      <GamingDock position={[-1.16, 0.48, 0.48]} />
      <BrandPlate position={[-0.94, -0.52, 0.42]} />
      <MiniatureFigure position={[0.12, 1.38, 0.18]} />
    </group>
  );
}

function PrinterRig() {
  const group = useRef<THREE.Group>(null);
  const printHead = useRef<THREE.Mesh>(null);
  const printedPiece = useRef<THREE.Group>(null);

  useFrame(({ clock, pointer }) => {
    const time = clock.getElapsedTime();

    if (group.current) {
      group.current.rotation.y =
        -0.22 + pointer.x * 0.22 + Math.sin(time * 0.35) * 0.07;
      group.current.rotation.x = 0.1 + pointer.y * -0.09;
      group.current.position.y = Math.sin(time * 0.55) * 0.06;
    }

    if (printHead.current) {
      printHead.current.position.x = Math.sin(time * 1.25) * 0.72;
    }

    if (printedPiece.current) {
      printedPiece.current.rotation.y = time * 0.38;
    }
  });

  const metal = {
    metalness: 0.48,
    roughness: 0.24,
    clearcoat: 0.35,
  };

  return (
    <Float floatIntensity={0.55} rotationIntensity={0.22} speed={1.15}>
      <group ref={group} scale={0.94}>
        <mesh castShadow position={[0, -1.1, 0]}>
          <boxGeometry args={[3.7, 0.16, 2.25]} />
          <meshPhysicalMaterial
            color="#0E1624"
            emissive="#07131F"
            emissiveIntensity={0.32}
            {...metal}
          />
        </mesh>

        <mesh castShadow position={[0, -0.92, 0]}>
          <boxGeometry args={[2.75, 0.05, 1.54]} />
          <meshStandardMaterial color="#111827" metalness={0.24} roughness={0.42} />
        </mesh>

        {[-1.55, 1.55].map((x) => (
          <mesh castShadow key={x} position={[x, 0.03, -0.72]}>
            <boxGeometry args={[0.12, 2.2, 0.12]} />
            <meshPhysicalMaterial color="#1E293B" {...metal} />
          </mesh>
        ))}

        <mesh castShadow position={[0, 1.06, -0.72]}>
          <boxGeometry args={[3.35, 0.12, 0.16]} />
          <meshPhysicalMaterial color="#162133" {...metal} />
        </mesh>

        <mesh castShadow position={[-1.2, 1.38, -0.82]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.42, 0.055, 22, 92]} />
          <meshPhysicalMaterial
            color="#43E7FF"
            emissive="#43E7FF"
            emissiveIntensity={0.42}
            metalness={0.16}
            roughness={0.2}
          />
        </mesh>

        <mesh castShadow position={[-1.2, 1.38, -0.82]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.22, 0.025, 18, 72]} />
          <meshPhysicalMaterial
            color="#A855F7"
            emissive="#A855F7"
            emissiveIntensity={0.28}
            metalness={0.18}
            roughness={0.28}
          />
        </mesh>

        <FilamentThread />

        <mesh castShadow position={[0, 0.65, -0.72]} ref={printHead}>
          <boxGeometry args={[0.68, 0.38, 0.48]} />
          <meshPhysicalMaterial
            color="#0B1120"
            emissive="#43E7FF"
            emissiveIntensity={0.24}
            {...metal}
          />
        </mesh>

        <mesh castShadow position={[0, 0.31, -0.58]}>
          <coneGeometry args={[0.17, 0.36, 4]} />
          <meshPhysicalMaterial
            color="#E2E8F0"
            emissive="#43E7FF"
            emissiveIntensity={0.16}
            metalness={0.7}
            roughness={0.18}
          />
        </mesh>

        <group position={[0, -0.67, 0.08]} ref={printedPiece}>
          {[0, 1, 2, 3, 4].map((layer) => (
            <mesh castShadow key={layer} position={[0, layer * 0.12, 0]}>
              <cylinderGeometry args={[0.44 - layer * 0.035, 0.52 - layer * 0.035, 0.075, 72]} />
              <meshPhysicalMaterial
                color={layer % 2 ? "#A855F7" : "#43E7FF"}
                emissive={layer % 2 ? "#A855F7" : "#43E7FF"}
                emissiveIntensity={0.2}
                metalness={0.08}
                roughness={0.18}
                transmission={0.08}
              />
            </mesh>
          ))}
        </group>

        <mesh position={[0, -0.24, -0.58]}>
          <cylinderGeometry args={[0.018, 0.018, 1.02, 18]} />
          <meshBasicMaterial color="#43E7FF" transparent opacity={0.62} />
        </mesh>
      </group>
    </Float>
  );
}

export function NovaScene() {
  return (
    <Canvas
      aria-label="Modelo 3D interactivo de impresora fabricando una pieza"
      camera={{ position: [0.55, 0.4, 5.8], fov: 43 }}
      dpr={[1, 1.7]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        preserveDrawingBuffer: true,
      }}
      role="img"
      shadows
    >
      <ambientLight intensity={0.6} />
      <spotLight
        angle={0.36}
        color="#43E7FF"
        intensity={4.6}
        penumbra={0.72}
        position={[3, 5, 4]}
      />
      <pointLight color="#A855F7" intensity={2.2} position={[-3.5, 1.6, 2.5]} />
      <pointLight color="#FF4FD8" intensity={1.2} position={[2.8, -1.8, 2]} />
      <pointLight color="#43E7FF" intensity={1.4} position={[0.2, 2.6, -1.4]} />
      <DreiSparkles
        color="#43E7FF"
        count={110}
        opacity={0.42}
        scale={[6.4, 4.1, 3.2]}
        size={2.2}
        speed={0.38}
      />
      <group position={[0.42, -0.05, 0]}>
        <ProductCloud />
        <PrinterRig />
      </group>
      <OrbitControls
        autoRotate
        autoRotateSpeed={0.32}
        enableDamping
        enablePan={false}
        enableZoom={false}
        maxPolarAngle={Math.PI / 1.62}
        minPolarAngle={Math.PI / 3.2}
      />
    </Canvas>
  );
}
