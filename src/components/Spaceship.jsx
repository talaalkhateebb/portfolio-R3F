import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

// A sleek glowing orb craft with two counter-rotating orbital rings and a
// soft halo. Fully procedural — no models, no external assets.
export function Spaceship(props) {
  const ringA = useRef();
  const ringB = useRef();

  useFrame((_state, delta) => {
    if (ringA.current) ringA.current.rotation.z += delta * 1.4;
    if (ringB.current) ringB.current.rotation.z -= delta * 0.9;
  });

  return (
    <group {...props} dispose={null}>
      {/* Glowing core */}
      <mesh>
        <icosahedronGeometry args={[0.35, 1]} />
        <meshStandardMaterial
          color={"#d6f6ff"}
          emissive={"#5ad2ff"}
          emissiveIntensity={2.6}
          roughness={0.15}
          metalness={0.2}
        />
      </mesh>

      {/* Soft halo */}
      <mesh scale={1.9}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshBasicMaterial
          color={"#3aa0ff"}
          transparent
          opacity={0.14}
          depthWrite={false}
        />
      </mesh>

      {/* Orbital rings */}
      <mesh ref={ringA} rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[0.72, 0.018, 14, 80]} />
        <meshStandardMaterial
          color={"#e9c7ff"}
          emissive={"#c77dff"}
          emissiveIntensity={1.8}
          roughness={0.3}
        />
      </mesh>
      <mesh ref={ringB} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[0.55, 0.014, 14, 80]} />
        <meshStandardMaterial
          color={"#b9ffe6"}
          emissive={"#5affc8"}
          emissiveIntensity={1.5}
          roughness={0.3}
        />
      </mesh>

      {/* The craft lights its surroundings */}
      <pointLight color={"#7ad4ff"} intensity={4} distance={8} />
    </group>
  );
}
