import React from 'react';
import { motion } from 'framer-motion';
import { Home, User, Briefcase, Code, Award, Mail } from 'lucide-react';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { id: 'hero', icon: <Home size={20} />, label: 'Home' },
    { id: 'about', icon: <User size={20} />, label: 'About' },
    { id: 'projects', icon: <Briefcase size={20} />, label: 'Projects' },
    { id: 'skills', icon: <Code size={20} />, label: 'Skills' },
    { id: 'achievements', icon: <Award size={20} />, label: 'Achievements' },
    { id: 'contact', icon: <Mail size={20} />, label: 'Contact' }
  ];

  return (
    <motion.div 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed left-0 top-0 h-screen w-16 md:w-20 lg:w-64 glass-panel border-r border-white/10 z-50 flex flex-col justify-between py-8 transition-all duration-300"
    >
      <div className="flex flex-col items-center lg:items-start lg:px-6 w-full">
        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full neon-border flex items-center justify-center mb-12 bg-black overflow-hidden relative group">
          <span className="text-xl font-bold bg-gradient-to-r from-cyber-blue to-cyber-purple bg-clip-text text-transparent group-hover:scale-110 transition-transform">
            AF
          </span>
          <div className="absolute inset-0 bg-cyber-blue/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>

        <nav className="flex flex-col gap-6 lg:gap-4 w-full">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setActiveSection(item.id)}
                className={`relative flex items-center justify-center lg:justify-start gap-4 p-3 rounded-xl transition-all duration-300 group
                  ${isActive ? 'bg-cyber-blue/10 neon-border-pink text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}
                `}
              >
                <div className={`transition-colors ${isActive ? 'text-cyber-pink drop-shadow-[0_0_8px_rgba(255,0,255,0.8)]' : 'group-hover:text-cyber-blue group-hover:drop-shadow-[0_0_8px_rgba(0,245,255,0.8)]'}`}>
                  {item.icon}
                </div>
                <span className={`hidden lg:block font-medium ${isActive ? 'text-white' : ''}`}>
                  {item.label}
                </span>
                
                {isActive && (
                  <motion.div 
                    layoutId="activeIndicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-cyber-pink shadow-[0_0_10px_rgba(255,0,255,0.8)] rounded-r-md"
                  />
                )}
              </a>
            );
          })}
        </nav>
      </div>
    </motion.div>
  );
};

export default Sidebar;
