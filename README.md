# Portfolio — React Three Fiber

An interactive 3D portfolio built with React Three Fiber. It features a scroll-driven airplane flight through the clouds, animated backgrounds, and sections for skills and projects.

## Tech Stack

- **React** + **Vite**
- **React Three Fiber** (`@react-three/fiber`)
- **Drei** (`@react-three/drei`)
- **Three.js**
- **Lamina** for layered materials

## Getting Started

Install dependencies:

```bash
yarn
```

Run the development server:

```bash
yarn dev
```

Build for production:

```bash
yarn build
```

Preview the production build:

```bash
yarn preview
```

## Project Structure

- `src/components/` — 3D scene components (Airplane, Clouds, Background, Planet, Spaceship) and the UI Interface
- `src/projects.js`, `src/skills.js` — content data
- `public/models/`, `public/textures/` — 3D assets

## 3D Model Credits

- Cloud by Poly by Google — [CC-BY](https://creativecommons.org/licenses/by/3.0/) via [Poly Pizza](https://poly.pizza/m/44cGXp6_8WD)
- Airplane by Poly by Google — [CC-BY](https://creativecommons.org/licenses/by/3.0/) via [Poly Pizza](https://poly.pizza/m/8VysVKMXN2J)
