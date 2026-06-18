import React from 'react';
import { motion } from 'framer-motion';
import { Github, Activity, ExternalLink } from 'lucide-react';
import project1 from '../assets/project1.png';
import project2 from '../assets/project2.jpg';
import project3 from '../assets/project3.png';
import project4 from '../assets/project4.jpg';

const techColorMap = {
  'MongoDB': 'bg-green-500/10 text-green-400 border-green-500/30',
  'Express': 'bg-gray-400/10 text-gray-300 border-gray-400/30',
  'React': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
  'Node.js': 'bg-green-600/10 text-green-500 border-green-600/30',
  'JWT': 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/30',
  'Leaflet': 'bg-lime-500/10 text-lime-400 border-lime-500/30',
  'Python': 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  'Streamlit': 'bg-red-500/10 text-red-400 border-red-500/30',
  'NLP': 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  'LLMs': 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
  'Django': 'bg-emerald-600/10 text-emerald-400 border-emerald-600/30',
  'Machine Learning': 'bg-orange-500/10 text-orange-400 border-orange-500/30',
  'SQLite': 'bg-sky-500/10 text-sky-400 border-sky-500/30',
  'C++': 'bg-blue-600/10 text-blue-500 border-blue-600/30',
  'IoT': 'bg-violet-500/10 text-violet-400 border-violet-500/30',
  'React Native': 'bg-cyan-400/10 text-cyan-300 border-cyan-400/30',
  'Firebase': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
};

const getTechColor = (tech) => techColorMap[tech] || 'bg-white/5 text-gray-300 border-white/10';

const projects = [
  {
    id: 1,
    title: 'BioFund Connect',
    description: 'MERN ESG investment platform that connects sustainable projects with eco-conscious investors. Features JWT authentication, detailed dashboards, and Leaflet map integration for location-based project discovery.',
    tech: ['MongoDB', 'Express', 'React', 'Node.js', 'JWT', 'Leaflet'],
    github: 'https://github.com/ANASF1412/BioFund-AI-Connect',
    demo: 'https://biofund-connect.vercel.app',
    image: project1,
    colorClass: 'text-cyber-blue',
    hoverBorderClass: 'hover:neon-border',
    iconBorderClass: 'border-cyber-blue',
    shadowClass: 'group-hover:shadow-[0_0_15px_rgba(0,245,255,0.5)]',
    bgLine: 'bg-cyber-blue'
  },
  {
    id: 2,
    title: 'JarvisFi',
    description: 'Multilingual AI finance chatbot capable of answering complex financial queries, analyzing market trends, and providing personalized investment advice using advanced natural language processing.',
    tech: ['Python', 'Streamlit', 'NLP', 'LLMs'],
    github: 'https://github.com/ANASF1412/GenAI-JarvisFi-app',
    demo: 'https://jarvisfi-ai.vercel.app',
    image: project2,
    colorClass: 'text-cyber-purple',
    hoverBorderClass: 'hover:neon-border-purple',
    iconBorderClass: 'border-cyber-purple',
    shadowClass: 'group-hover:shadow-[0_0_15px_rgba(139,92,246,0.5)]',
    bgLine: 'bg-cyber-purple'
  },
  {
    id: 3,
    title: 'Finance Investment Planner',
    description: 'Django-based recommendation system that analyzes user risk profiles and financial goals to suggest optimal localized investment portfolios and strategies.',
    tech: ['Django', 'Python', 'Machine Learning', 'SQLite'],
    github: 'https://github.com/ANASF1412/Finance-Investment-Planner',
    demo: 'https://finance-planner.vercel.app',
    image: project3,
    colorClass: 'text-cyber-pink',
    hoverBorderClass: 'hover:neon-border-pink',
    iconBorderClass: 'border-cyber-pink',
    shadowClass: 'group-hover:shadow-[0_0_15px_rgba(255,0,255,0.5)]',
    bgLine: 'bg-cyber-pink'
  },
  {
    id: 4,
    title: 'COCOCLEAN',
    description: 'IoT-enabled sustainable water purification system monitoring dashboard. Tracks real-time water quality metrics and automates the filtration process based on sensor data.',
    tech: ['C++', 'IoT', 'React Native', 'Firebase'],
    github: 'https://github.com/ANASF1412/COCOCLEAN',
    demo: 'https://cococlean-iot.vercel.app',
    image: project4,
    colorClass: 'text-cyber-blue',
    hoverBorderClass: 'hover:neon-border',
    iconBorderClass: 'border-cyber-blue',
    shadowClass: 'group-hover:shadow-[0_0_15px_rgba(0,245,255,0.5)]',
    bgLine: 'bg-cyber-blue'
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 min-h-screen relative z-10">
      <div className="mb-16 text-center lg:text-left">
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-wider flex items-center justify-center lg:justify-start gap-4 mb-2">
          <Activity className="text-cyber-blue" size={32} />
          SYSTEM.<span className="text-cyber-purple drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]">PROJECTS</span>
        </h2>
        <p className="text-gray-400 font-mono text-sm max-w-xl mx-auto lg:mx-0">
          Compiling operational database of deployed applications and intelligent systems...
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`glass-panel border-white/10 rounded-2xl overflow-hidden group hover:-translate-y-2 transition-all duration-300 ${project.hoverBorderClass}`}
          >
            <div className="relative h-48 md:h-64 overflow-hidden bg-black/50">
              <div className="absolute inset-0 bg-cyber-blue/10 group-hover:bg-transparent transition-colors z-10 duration-500"></div>
              <img
                src={project.image}
                alt={`${project.title} screenshot`}
                loading="lazy"
                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />

              {/* Scanline overlay */}
              <div className="absolute inset-0 pointer-events-none z-20 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]"></div>
            </div>

            <div className="p-6 md:p-8 relative">
              <div className={`absolute top-0 right-8 -translate-y-1/2 w-10 h-10 bg-black border ${project.iconBorderClass} rounded-full flex items-center justify-center ${project.shadowClass} transition-shadow z-30`}>
                <Code className={`${project.colorClass}`} size={18} />
              </div>

              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyber-blue transition-colors">
                {project.title}
              </h3>

              <p className="text-gray-400 text-sm md:text-base mb-6 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className={`px-3 py-1 text-xs font-mono rounded-full border ${getTechColor(tech)} transition-all duration-300 group-hover:scale-105`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 mt-auto">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 text-sm font-medium text-white hover:${project.colorClass} transition-colors border border-white/20 hover:${project.iconBorderClass} px-4 py-2 rounded-lg`}
                >
                  <Github size={16} /> Code
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 text-sm font-medium text-white hover:${project.colorClass} transition-colors border border-white/20 hover:${project.iconBorderClass} px-4 py-2 rounded-lg`}
                  >
                    <ExternalLink size={16} /> Live Demo
                  </a>
                )}
              </div>
            </div>
            {/* Animated Bottom Border */}
            <div className={`absolute bottom-0 left-0 h-1 w-0 ${project.bgLine} group-hover:w-full transition-all duration-500`}></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// SVG component helper
const Code = ({ className, size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

export default Projects;
