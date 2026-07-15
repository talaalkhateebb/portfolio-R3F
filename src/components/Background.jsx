import { Sparkles, Sphere, Stars } from "@react-three/drei";
import { Gradient, LayerMaterial } from "lamina";
import { useMemo } from "react";
import * as THREE from "three";

// Backdrop that adapts to the theme: a cosmic nebula at night, a bright sky
// by day. Starfield, motes and nebula glow only appear in the dark theme.
export const Background = ({ theme }) => {
  const sky = theme.sky;

  // Soft radial glow drawn to a canvas — used as a billboard for the sun.
  const glowTexture = useMemo(() => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d");
    const g = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2
    );
    g.addColorStop(0.0, "rgba(255,246,214,1)");
    g.addColorStop(0.18, "rgba(255,225,160,0.9)");
    g.addColorStop(0.45, "rgba(255,190,140,0.3)");
    g.addColorStop(1.0, "rgba(255,170,120,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(canvas);
  }, []);

  return (
    <>
      {theme.stars && (
        /* radius kept inside the sky sphere (scale 100) so the stars are
           actually visible against the nebula instead of hidden behind it */
        <Stars
          radius={80}
          depth={55}
          count={theme.starCount}
          factor={4.5}
          saturation={0}
          fade
          speed={0.4}
        />
      )}

      {theme.sparkles && (
        <Sparkles
          count={theme.sparkleCount}
          scale={[40, 18, 40]}
          size={4}
          speed={0.25}
          opacity={0.8}
          color={theme.sparkleColor}
        />
      )}

      {/* Sun: bright core sphere plus a soft billboard glow */}
      <group position={[20, 8, -62]}>
        <mesh>
          <sphereGeometry args={[2, 48, 48]} />
          <meshBasicMaterial color={theme.sun.core} fog={false} />
        </mesh>
        <sprite scale={[26, 26, 1]}>
          <spriteMaterial
            map={glowTexture}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            fog={false}
          />
        </sprite>
      </group>

      {/* Sky gradient sphere */}
      <Sphere scale={[100, 100, 100]} rotation-y={Math.PI / 2}>
        <LayerMaterial color={sky.base} side={THREE.BackSide} fog={false}>
          {/* Top-to-horizon base gradient */}
          <Gradient
            colorA={sky.top}
            colorB={sky.bottom}
            axes={"y"}
            start={0.45}
            end={-0.45}
          />
          {/* Nebula glows — only present in the dark theme */}
          {sky.nebula && (
            <Gradient
              mode="lighten"
              colorA={"#000000"}
              colorB={sky.nebula}
              axes={"y"}
              start={0.12}
              end={-0.5}
            />
          )}
          {sky.nebula2 && (
            <Gradient
              mode="lighten"
              colorA={"#000000"}
              colorB={sky.nebula2}
              axes={"x"}
              start={-0.4}
              end={0.5}
            />
          )}
        </LayerMaterial>
      </Sphere>
    </>
  );
};
