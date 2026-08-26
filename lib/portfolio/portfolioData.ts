/**
 * ALIDEV Cinematic Portfolio Data Model
 * Centralized content structure for portfolio sections.
 */

export interface SkillItem {
  name: string;
  category: '3D & Graphics' | 'Frontend' | 'Backend & AI' | 'Tools';
  level: string; // e.g. "Advanced", "Expert"
  color: string;
  icon?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  technologies: string[];
  year: string;
  category: string;
  demoUrl?: string;
  githubUrl?: string;
  accentColor: string;
}

export interface TimelineItem {
  year: string;
  role: string;
  organization: string;
  description: string;
  highlights: string[];
}

export interface LabExperiment {
  id: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
}

export const PORTFOLIO_DATA = {
  hero: {
    name: 'ALIDEV',
    title: 'Creative Developer & 3D Web Engineer',
    subtitle: 'Building digital experiences through code, design, and technology.',
    bio: 'Fusing modern WebGL, real-time 3D graphics, and responsive web technologies into atmospheric interactive portfolio worlds.',
  },
  about: {
    title: 'About Me',
    subtitle: 'At the intersection of design and engineering',
    summary:
      'Passionate full-stack & WebGL engineer specialized in building high-performance 3D web applications, interactive visualizers, and scalable modern web platforms.',
    focusAreas: [
      {
        title: 'Real-Time 3D & WebGL',
        desc: 'Crafting immersive interactive scenes using Three.js, React Three Fiber, GLSL shaders, and WebGL.',
      },
      {
        title: 'Modern Frontend Architecture',
        desc: 'Building lighting-fast web apps with Next.js 15, React 19, TypeScript, and Tailwind CSS.',
      },
      {
        title: 'Creative Engineering & AI',
        desc: 'Integrating AI capabilities and generative visual logic into seamless user experiences.',
      },
    ],
  },
  skills: [
    { name: 'Three.js / WebGL', category: '3D & Graphics', level: 'Expert', color: '#38bdf8' },
    { name: 'React Three Fiber', category: '3D & Graphics', level: 'Expert', color: '#60a5fa' },
    { name: 'React 19 / Next.js 15', category: 'Frontend', level: 'Expert', color: '#a855f7' },
    { name: 'TypeScript', category: 'Frontend', level: 'Expert', color: '#3178c6' },
    { name: 'Tailwind CSS', category: 'Frontend', level: 'Expert', color: '#38bdf8' },
    { name: 'GSAP & Animations', category: 'Frontend', level: 'Advanced', color: '#86efac' },
    { name: 'Node.js & APIs', category: 'Backend & AI', level: 'Advanced', color: '#4ade80' },
    { name: 'Shader Development', category: '3D & Graphics', level: 'Intermediate', color: '#f472b6' },
  ] as SkillItem[],
  projects: [
    {
      id: 'webgl-fiber-city',
      title: 'Anime Cinematic 3D Engine',
      tagline: 'Interactive 3D Portfolio World',
      description:
        'A scroll-driven cinematic 3D web experience built with Next.js 15, Three.js, R3F, and GSAP featuring procedural architecture and atmospheric visual effects.',
      technologies: ['Next.js 15', 'React Three Fiber', 'Three.js', 'TypeScript', 'Tailwind'],
      year: '2026',
      category: 'WebGL / 3D App',
      githubUrl: 'https://github.com/mohammadali-eth/webgl_fiber',
      accentColor: '#38bdf8',
    },
    {
      id: 'lifeos-platform',
      title: 'Tazora LifeOS Platform',
      tagline: 'AI-Powered Personal Management Ecosystem',
      description:
        'Production enterprise SaaS platform featuring dynamic dashboard widgets, secure OAuth authentication, multi-step onboarding, and automated workflow AI.',
      technologies: ['Next.js', 'React', 'Prisma', 'Tailwind CSS', 'OAuth 2.0'],
      year: '2026',
      category: 'Enterprise SaaS',
      githubUrl: 'https://github.com/mohammadali-eth',
      accentColor: '#a855f7',
    },
    {
      id: 'invix-advisor',
      title: 'Invix Launch Advisor',
      tagline: 'AI Financial & Invoicing Platform',
      description:
        'Intelligent document processing and financial advisor suite using automated Gemini AI invoice extraction, real-time analytics, and role-based permissions.',
      technologies: ['React 19', 'Gemini AI API', 'Node.js', 'Recharts', 'Tailwind'],
      year: '2025',
      category: 'AI Application',
      githubUrl: 'https://github.com/mohammadali-eth',
      accentColor: '#ec4899',
    },
  ] as ProjectItem[],
  experience: [
    {
      year: '2026',
      role: 'Lead Creative Engineer',
      organization: 'ALIDEV Studio',
      description: 'Designing state-of-the-art 3D WebGL experiences and high-performance Web applications.',
      highlights: ['Engineered cinematic 3D R3F viewport', 'Optimized WebGL renderer for mobile browsers'],
    },
    {
      year: '2025',
      role: 'Senior Full-Stack & WebGL Developer',
      organization: 'Tech Innovations',
      description: 'Built complex enterprise dashboards, real-time analytics, and client interactive visualizers.',
      highlights: ['Migrated legacy stack to React 19 & Next.js 15', 'Implemented zero-latency data pipelines'],
    },
    {
      year: '2024',
      role: 'Frontend & 3D Specialist',
      organization: 'Digital Lab',
      description: 'Developed custom Three.js shader materials and dynamic web applications.',
      highlights: ['Created modular UI component design systems', 'Delivered 10+ production web apps'],
    },
  ] as TimelineItem[],
  creativeLab: [
    {
      id: 'procedural-city-gen',
      title: 'Procedural Building Generator',
      category: '3D Geometry',
      description: 'Deterministic building archetype generation with automated window arrays and glowing rooftops.',
      tech: ['Three.js', 'WebGL', 'Algorithmic Geometry'],
    },
    {
      id: 'holographic-shader',
      title: 'Cyber Hologram Shader',
      category: 'GLSL Shaders',
      description: 'Custom vertex & fragment shader animating scanning lines and volumetric noise distortion.',
      tech: ['GLSL', 'R3F', 'Custom Materials'],
    },
    {
      id: 'particle-field-physics',
      title: 'Atmospheric Dust Systems',
      category: 'Particle Physics',
      description: 'GPU-accelerated particle field drifting through exponential fog atmosphere.',
      tech: ['InstancedMesh', 'Math Utilities'],
    },
  ] as LabExperiment[],
  contact: {
    title: "Let's Build Something Amazing.",
    subtitle: 'Available for creative engineering, 3D WebGL projects, and technical consultation.',
    email: 'contact@alidev.in',
    github: 'https://github.com/mohammadali-eth',
    linkedin: 'https://linkedin.com/in/mohammadali-dev',
    location: 'Global / Remote',
  },
};

export default PORTFOLIO_DATA;
