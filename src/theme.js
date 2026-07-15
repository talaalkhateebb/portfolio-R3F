// Dark = cosmic night voyage. Light = bright daytime sky.
// Every 3D value the scene needs lives here so switching themes is one object.
export const THEMES = {
  dark: {
    background: "#05030f",
    fog: { color: "#0a0720", near: 22, far: 95 },
    stars: true,
    starCount: 14000,
    sparkles: true,
    sparkleCount: 260,
    sparkleColor: "#c6d8ff",
    sky: {
      base: "#0a0720",
      top: "#1c0f45",
      bottom: "#05030f",
      nebula: "#3d1a63", // magenta bloom (dark only)
      nebula2: "#0a2b3a", // teal counter-glow (dark only)
    },
    sun: { core: "#fff6d6" },
    ambient: { color: "#3a4a8a", intensity: 0.18 },
    key: { color: "#dce6ff", intensity: 1.6 },
    rim: { color: "#c77dff", intensity: 0.5 },
    planeLight: "#ffdcb8",
    trail: {
      color: "#a9d8ff",
      emissive: "#4aa0ff",
      emissiveIntensity: 1.8,
      opacity: 0.65,
      additive: true,
    },
  },
  light: {
    background: "#cfe8fb",
    fog: { color: "#e6f4ff", near: 30, far: 130 },
    stars: false,
    starCount: 0,
    sparkles: false,
    sparkleCount: 0,
    sparkleColor: "#ffffff",
    sky: {
      base: "#bfe0f5",
      top: "#5aa6e0", // blue zenith
      bottom: "#eaf6ff", // near-white horizon
      nebula: null, // no nebula glow in daylight
      nebula2: null,
    },
    sun: { core: "#fff3c4" },
    ambient: { color: "#ffffff", intensity: 0.75 },
    key: { color: "#fff6e6", intensity: 1.5 },
    rim: { color: "#bfe0ff", intensity: 0.4 },
    planeLight: "#ffffff",
    trail: {
      color: "#ffffff",
      emissive: "#cfe6ff",
      emissiveIntensity: 0.15,
      opacity: 0.9,
      additive: false,
    },
  },
};
