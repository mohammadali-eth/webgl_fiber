# 🌆 ALIDEV — Interactive 3D / Game-Inspired Portfolio

> **A personal portfolio built as an interactive digital world — not just a website.**

Welcome to **ALIDEV**, an experimental next-generation personal portfolio that transforms the traditional developer portfolio into an **interactive 3D city experience**.

Instead of scrolling through static sections, visitors can explore a virtual city, interact with environments, discover projects, listen to music, trigger animations, and experience my work through a game-inspired interface.

**Explore. Interact. Play. Discover.**

---

## ✨ Vision

The goal of this project is simple:

> **Build a portfolio that feels like entering a world rather than opening a webpage.**

The experience combines:

* 🌆 Interactive 3D city
* 🎮 Game-inspired exploration
* 🧊 3D / immersive UI
* 🎵 Dynamic background music & sound effects
* 🚗 Interactive objects and environments
* 🏢 Project buildings
* 👤 Character/avatar interaction
* 🌌 Dynamic environments
* ✨ Cinematic animations
* 🌀 Particle effects
* 💫 Scroll & camera transitions
* 🖱️ Mouse + keyboard interaction
* 📱 Responsive experience
* ⚡ High-performance WebGL rendering

---

# 🎮 Experience

The portfolio is designed like a small interactive game.

Visitors can enter the virtual city and explore different areas.

### 🏠 Home District

The starting point of the experience.

Visitors can discover:

* Personal introduction
* Developer identity
* Interactive character
* City environment
* Navigation system
* Ambient animations

---

### 🏢 Project District

Each major project can be represented as an interactive building.

For example:

```text
┌──────────────────────────────┐
│        PROJECT CITY          │
├──────────────────────────────┤
│                              │
│   🏢 AI PROJECT              │
│   ├── Overview               │
│   ├── Technologies           │
│   ├── Features               │
│   └── Live Demo              │
│                              │
│   🏢 WEB PROJECT             │
│   ├── Overview               │
│   ├── Technologies           │
│   ├── GitHub                 │
│   └── Live Demo              │
│                              │
└──────────────────────────────┘
```

---

### 💻 Developer Zone

A futuristic interactive environment displaying:

* Skills
* Technologies
* Programming languages
* Frameworks
* Tools
* Experience
* Development philosophy

---

### 🎵 Music Zone

The environment includes an interactive audio system.

Possible features:

* Background music
* Ambient city sounds
* Interaction sound effects
* Footsteps
* UI sounds
* Music controls
* Dynamic audio transitions

---

# 🧠 Technology Stack

The project is built around modern web technologies and real-time 3D rendering.

### Frontend

* **React**
* **TypeScript**
* **Vite**

### 3D / WebGL

* **Three.js**
* **React Three Fiber**
* **@react-three/drei**
* **WebGL**

### Animation

* **GSAP**
* **Framer Motion**
* **Three.js animation system**

### Styling

* **Tailwind CSS**
* **CSS**
* **CSS3 animations**

### Audio

* **Web Audio API**
* **Howler.js** *(if required)*

### 3D Assets

* **Blender**
* **GLTF / GLB**
* **HDRI environments**
* **PBR materials**

### Development

* **Git**
* **GitHub**
* **ESLint**
* **Prettier**

---

# 🏗️ Architecture

The project follows a modular architecture so the 3D world can evolve without turning into an unmaintainable codebase.

```text
ALIDEV
│
├── src
│   │
│   ├── components
│   │   ├── UI
│   │   ├── Navigation
│   │   ├── HUD
│   │   └── Loading
│   │
│   ├── three
│   │   ├── City
│   │   ├── Buildings
│   │   ├── Environment
│   │   ├── Character
│   │   ├── Vehicles
│   │   └── Effects
│   │
│   ├── scenes
│   │   ├── Home
│   │   ├── Projects
│   │   ├── Skills
│   │   └── About
│   │
│   ├── systems
│   │   ├── Audio
│   │   ├── Camera
│   │   ├── Interaction
│   │   ├── Controls
│   │   └── Performance
│   │
│   ├── hooks
│   ├── stores
│   ├── utils
│   ├── assets
│   └── App.tsx
│
├── public
│   ├── models
│   ├── textures
│   ├── audio
│   └── environments
│
└── package.json
```

---

# 🌌 Visual Direction

The visual identity is inspired by:

* Cyberpunk cities
* Futuristic architecture
* Open-world games
* Sci-fi interfaces
* Digital worlds
* Cinematic environments
* Neon environments
* Procedural effects

The interface should feel like a combination of:

**Portfolio + Game + Digital City + Interactive Story**

---

# 🎯 Core Features

| Feature                    | Status            |
| -------------------------- | ----------------- |
| 🌆 3D City                 | 🚧 In Development |
| 🎮 Game-style Navigation   | 🚧 In Development |
| 👤 Interactive Character   | 🚧 In Development |
| 🏢 Project Buildings       | 🚧 In Development |
| 🎵 Dynamic Audio           | 🚧 In Development |
| 🌌 Environment System      | 🚧 In Development |
| ✨ Particle Effects         | 🚧 In Development |
| 🎥 Cinematic Camera        | 🚧 In Development |
| 💻 Skills System           | 🚧 In Development |
| 📱 Responsive UI           | 🚧 In Development |
| ⚡ Performance Optimization | 🚧 In Development |
| 🌓 Day/Night Cycle         | 🔮 Planned        |
| 🌧️ Weather System         | 🔮 Planned        |
| 🚗 Traffic System          | 🔮 Planned        |
| 🤖 Interactive NPCs        | 🔮 Planned        |
| 🗺️ Mini Map               | 🔮 Planned        |

---

# 🕹️ Controls

The experience is designed around familiar game controls.

```text
W / A / S / D
    ↓
Move around the world

Mouse
    ↓
Look / interact

Click
    ↓
Select objects

ESC
    ↓
Open menu

M
    ↓
Toggle music

E
    ↓
Interact
```

Additional controls may be added as the world evolves.

---

# ⚡ Performance Philosophy

A highly detailed 3D website can easily become slow.

Performance is therefore treated as a **first-class feature**, not an afterthought.

The project aims to use:

* GLTF / GLB optimized assets
* Texture compression
* Lazy loading
* Code splitting
* Instanced meshes
* Level of Detail (LOD)
* Frustum culling
* Efficient lighting
* Shadow optimization
* Asset caching
* Progressive loading
* Adaptive rendering quality

The goal is:

> **Maximum immersion without sacrificing usability.**

---

# 🎨 Design Philosophy

This portfolio intentionally avoids the traditional:

```text
Hero
↓
About
↓
Skills
↓
Projects
↓
Contact
```

approach.

Instead:

```text
             🌌 DIGITAL WORLD
                    │
             ┌──────┴──────┐
             │             │
          🌆 CITY       🎮 GAME
             │             │
       ┌─────┼─────┐       │
       │     │     │       │
      🏠    🏢    💻      🧑
     Home Projects Skills Character
       │     │     │       │
       └─────┴─────┴───────┘
                    │
                 🎵 MUSIC
                    │
                 📡 STORY
```

The visitor discovers information through interaction rather than simply reading it.

---

# 🚀 Getting Started

## Prerequisites

Make sure you have installed:

* Node.js
* npm / pnpm / yarn
* Git

Check your versions:

```bash
node --version
npm --version
git --version
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
```

Enter the project:

```bash
cd YOUR_REPOSITORY
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open the local development URL shown in your terminal.

---

# 🛠️ Development

Run development mode:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run linting:

```bash
npm run lint
```

---

# 🧩 Future Roadmap

The project is intentionally designed to evolve over time.

### Phase 01 — Foundation

* [x] Project setup
* [ ] React architecture
* [ ] TypeScript configuration
* [ ] 3D scene
* [ ] Camera system
* [ ] Lighting system

### Phase 02 — City

* [ ] City environment
* [ ] Buildings
* [ ] Roads
* [ ] Street lights
* [ ] Traffic
* [ ] Environment props

### Phase 03 — Game Mechanics

* [ ] Character controller
* [ ] WASD movement
* [ ] Interaction system
* [ ] Collision detection
* [ ] NPC system
* [ ] Mission-style navigation

### Phase 04 — Portfolio

* [ ] About experience
* [ ] Skills system
* [ ] Project buildings
* [ ] Project details
* [ ] Experience section
* [ ] Contact system

### Phase 05 — Immersion

* [ ] Music system
* [ ] Sound effects
* [ ] Particle effects
* [ ] Weather
* [ ] Day/night cycle
* [ ] Cinematic transitions

### Phase 06 — Advanced Experience

* [ ] Procedural city elements
* [ ] Dynamic environment
* [ ] AI/NPC interactions
* [ ] Easter eggs
* [ ] Hidden areas
* [ ] Interactive storytelling

---

# 🧪 Experimental Ideas

This project is also a playground for experimenting with future web technologies.

Potential experiments include:

* 🤖 AI-powered NPC
* 🧠 AI portfolio assistant
* 🎙️ Voice interaction
* 🗺️ Procedural world generation
* 🌐 Multiplayer exploration
* 🥽 WebXR / VR support
* 📱 Mobile gyroscope interaction
* 🧬 Generative environments
* 🎮 Mini-games
* 🏆 Achievement system
* 🎁 Hidden Easter eggs

---

# 🔐 Environment Variables

If environment variables are required, create:

```bash
.env.local
```

Example:

```env
VITE_API_URL=
VITE_AI_API_KEY=
```

**Never commit secrets to GitHub.**

Add environment files to `.gitignore`:

```gitignore
.env
.env.local
.env.*.local
```

---

# 📁 Asset Guidelines

Large 3D environments can significantly increase repository size.

Recommended formats:

```text
3D Models
→ .glb / .gltf

Textures
→ .webp / compressed formats

Images
→ .webp / .avif

Audio
→ .ogg / .mp3

HDR
→ .hdr / optimized environment formats
```

For large binary assets, consider using **Git LFS** or external asset storage.

---

# 🤝 Contributing

This is primarily a personal portfolio project, but ideas, suggestions, and improvements are welcome.

If you discover a bug or have an interesting idea:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Commit your changes
5. Open a Pull Request

Example:

```bash
git checkout -b feature/new-city-system
```

---

# 📜 License

This project is intended for personal portfolio and educational purposes.

If you want to reuse significant portions of the project, please contact me first.

---

# 👨💻 About Me

I'm **Ali**, a developer interested in building ambitious digital experiences at the intersection of:

```text
Software Engineering
        +
Creative Development
        +
3D Graphics
        +
Artificial Intelligence
        +
Interactive Experiences
```

I enjoy turning ideas into products that are not only functional, but also **visual, immersive, and memorable**.

---

# 🌐 Connect With Me

* 🌍 Portfolio: `https://your-domain.com`
* 💻 GitHub: `https://github.com/YOUR_USERNAME`
* 💼 LinkedIn: `https://linkedin.com/in/YOUR_USERNAME`
* 📧 Email: `your-email@example.com`

---

# ⭐ Support

If you like the concept or find the project interesting, consider giving the repository a ⭐.

It helps support the project and motivates me to keep building.

---

<div align="center">

### 🌆 ENTER THE CITY

**This isn't just a portfolio.**

**It's a world built to showcase how I think, design, and build.**

<br />

`BUILD • EXPLORE • EXPERIMENT • CREATE`

<br />

⭐ **ALIDEV — Interactive Digital Portfolio**

</div>
