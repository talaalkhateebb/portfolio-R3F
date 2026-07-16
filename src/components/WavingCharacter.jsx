import { Center, useAnimations, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

// "Animated Woman" by Quaternius (CC0) via poly.pizza — a rigged character
// with a built-in Wave animation, greeting visitors beside the About title.
// To swap characters: just replace the GLB — the wave clip is found by
// name and any weapon props are hidden automatically.
const MODEL = "./models/character/model.glb";

function Character() {
  const group = useRef();
  const { scene, animations } = useGLTF(MODEL);
  const { actions } = useAnimations(animations, group);

  // Hide any weapon props and normalize to a known size (2 units tall) so
  // the camera framing below works no matter how the source model is scaled.
  const scale = useMemo(() => {
    scene.traverse((obj) => {
      if (/weapon|gun|sword|axe/i.test(obj.name)) obj.visible = false;
    });
    const size = new THREE.Box3().setFromObject(scene).getSize(new THREE.Vector3());
    return 2 / size.y;
  }, [scene]);

  useEffect(() => {
    const clip = animations.find((a) => /wave/i.test(a.name));
    const wave = clip && actions[clip.name];
    if (wave) wave.reset().play();
  }, [actions, animations]);

  return (
    <group ref={group}>
      <Center>
        <primitive object={scene} scale={scale} />
      </Center>
    </group>
  );
}

// A tiny inline canvas that sits beside the About title, sized like an emoji.
export const WavingCharacter = () => (
  <span className="waving-character" aria-hidden="true">
    {/* Camera pulled back far enough that the whole body — including the
        arm raised above the head mid-wave — stays in frame. */}
    <Canvas camera={{ position: [0, 0, 3.2], fov: 45 }} dpr={[1, 2]}>
      <ambientLight intensity={1.3} />
      <directionalLight position={[2, 3, 4]} intensity={1.8} />
      <Suspense fallback={null}>
        <Character />
      </Suspense>
    </Canvas>
  </span>
);

useGLTF.preload(MODEL);
