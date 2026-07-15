import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

// A softly spinning planet with an optional glowing ring. Procedural.
export function Planet({
  color = "#8ab4ff",
  emissive = "#101433",
  ring = false,
  ringColor = "#ffd9a0",
  spin = 0.12,
  ...props
}) {
  const body = useRef();

  useFrame((_state, delta) => {
    if (body.current) body.current.rotation.y += delta * spin;
  });

  return (
    <group {...props} dispose={null}>
      <mesh ref={body}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={0.5}
          roughness={0.85}
          metalness={0.1}
        />
      </mesh>

      {ring && (
        <mesh rotation={[Math.PI / 2.3, 0, 0.35]}>
          <ringGeometry args={[1.45, 2.2, 80]} />
          <meshStandardMaterial
            color={ringColor}
            emissive={ringColor}
            emissiveIntensity={0.35}
            side={THREE.DoubleSide}
            transparent
            opacity={0.75}
          />
        </mesh>
      )}
    </group>
  );
}
