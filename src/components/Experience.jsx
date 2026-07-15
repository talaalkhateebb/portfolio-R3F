import { Float, PerspectiveCamera, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { projects } from "../projects";
import { Airplane } from "./Airplane";
import { Background } from "./Background";
import { Cloud } from "./Cloud";

const LINE_NB_POINTS = 12000;

export const Experience = ({ theme }) => {
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, -10),
        new THREE.Vector3(-2, 0, -20),
        new THREE.Vector3(-3, 0, -30),
        new THREE.Vector3(0, 0, -40),
        new THREE.Vector3(5, 0, -50),
        new THREE.Vector3(7, 0, -60),
        new THREE.Vector3(5, 0, -70),
        new THREE.Vector3(0, 0, -80),
        new THREE.Vector3(0, 0, -90),
        new THREE.Vector3(0, 0, -100),
      ],
      false,
      "catmullrom",
      0.5
    );
  }, []);

  const linePoints = useMemo(() => {
    return curve.getPoints(LINE_NB_POINTS);
  }, [curve]);

  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.2);
    shape.lineTo(0, 0.2);

    return shape;
  }, [curve]);

  // A world for each project, sitting beside the flight path at the scroll
  // position where that project's description comes into view.
  const projectWorlds = useMemo(() => {
    // +1 section for the closing "What I know" panel; keeps the clouds in
    // sync with the scrolled description sections.
    const totalSections = projects.length + 1;
    return projects.map((project, i) => {
      const offset = (i + 0.5) / totalSections;
      const camPoint = curve.getPoint(offset);
      const side = i % 2 === 0 ? -1 : 1;
      const position = [
        camPoint.x + side * 2.7,
        0.6,
        camPoint.z - 5,
      ];
      return { project, position };
    });
  }, [curve]);

  const cameraGroup = useRef();
  const scroll = useScroll();

  useFrame((_state, delta) => {
    const curPointIndex = Math.min(
      Math.round(scroll.offset * linePoints.length),
      linePoints.length - 1
    );
    const curPoint = linePoints[curPointIndex];
    const pointAhead =
      linePoints[Math.min(curPointIndex + 1, linePoints.length - 1)];

    const xDisplacement = (pointAhead.x - curPoint.x) * 80;

    // Math.PI / 2 -> LEFT
    // -Math.PI / 2 -> RIGHT

    const angleRotation =
      (xDisplacement < 0 ? 1 : -1) *
      Math.min(Math.abs(xDisplacement), Math.PI / 3);

    const targetAirplaneQuaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        airplane.current.rotation.x,
        airplane.current.rotation.y,
        angleRotation
      )
    );
    const targetCameraQuaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        cameraGroup.current.rotation.x,
        angleRotation,
        cameraGroup.current.rotation.z
      )
    );

    airplane.current.quaternion.slerp(targetAirplaneQuaternion, delta * 2);
    cameraGroup.current.quaternion.slerp(targetCameraQuaternion, delta * 2);

    cameraGroup.current.position.lerp(curPoint, delta * 24);
  });

  const airplane = useRef();

  return (
    <>
      {/* <OrbitControls enableZoom={false} /> */}
      {/* Theme-driven lighting */}
      <ambientLight intensity={theme.ambient.intensity} color={theme.ambient.color} />
      <directionalLight
        position={[12, 7, 4]}
        intensity={theme.key.intensity}
        color={theme.key.color}
      />
      <directionalLight
        position={[-8, -3, -6]}
        intensity={theme.rim.intensity}
        color={theme.rim.color}
      />
      <group ref={cameraGroup}>
        <Background theme={theme} />
        <PerspectiveCamera position={[0, 0, 5]} fov={30} makeDefault />
        <group ref={airplane}>
          <Float floatIntensity={1.4} speed={1.6} rotationIntensity={0.4}>
            <Airplane
              rotation-y={Math.PI / 2}
              scale={[0.2, 0.2, 0.2]}
              position-y={0.1}
            />
          </Float>
          {/* Warm key light so the plane pops against the backdrop */}
          <pointLight
            position={[1.5, 1.5, 1]}
            intensity={4}
            distance={7}
            color={theme.planeLight}
          />
        </group>
      </group>

      {/* FLIGHT TRAIL (glowing in dark, soft ribbon in light) */}
      <group position-y={-2}>
        <mesh>
          <extrudeGeometry
            args={[
              shape,
              {
                steps: LINE_NB_POINTS,
                bevelEnabled: false,
                extrudePath: curve,
              },
            ]}
          />
          <meshStandardMaterial
            color={theme.trail.color}
            emissive={theme.trail.emissive}
            emissiveIntensity={theme.trail.emissiveIntensity}
            transparent
            opacity={theme.trail.opacity}
            depthWrite={false}
            blending={
              theme.trail.additive
                ? THREE.AdditiveBlending
                : THREE.NormalBlending
            }
          />
        </mesh>
      </group>

      {/* ONE CLICKABLE CLOUD PER PROJECT */}
      {projectWorlds.map(({ project, position }, i) => (
        <Float
          key={i}
          speed={1 + i * 0.1}
          floatIntensity={0.8}
          rotationIntensity={0.15}
        >
          <Cloud
            color={project.color}
            opacity={0.95}
            scale={1.1 + (i % 3) * 0.15}
            rotation-y={(i % 4) * 0.5}
            position={position}
            onClick={() => window.open(project.url, "_blank", "noopener")}
            onPointerOver={() => (document.body.style.cursor = "pointer")}
            onPointerOut={() => (document.body.style.cursor = "default")}
          />
        </Float>
      ))}
    </>
  );
};
