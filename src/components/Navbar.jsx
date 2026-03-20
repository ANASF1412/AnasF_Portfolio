import React, { useState, useEffect } from 'react';
import { Search, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-0 left-16 md:left-20 lg:left-64 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'glass-panel py-3 border-b' : 'bg-transparent py-5 border-transparent'
      } px-6 lg:px-12 flex justify-between items-center`}
    >
      <div className="flex items-center gap-3">
        <div className="relative flex items-center">
          <div className="absolute left-3 text-cyber-blue">
            <Search size={18} />
          </div>
          <input 
            type="text" 
            placeholder="Search systems..." 
            className="bg-black/40 border border-cyber-blue/40 rounded-full py-2 pl-10 pr-4 w-48 lg:w-64 text-sm focus:outline-none focus:border-cyber-blue transition-all focus:shadow-[0_0_10px_rgba(0,245,255,0.3)] text-gray-200 placeholder-gray-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 backdrop-blur-md">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
          <span className="text-xs font-mono text-green-400">System Online</span>
        </div>
        
        <button className="relative text-gray-400 hover:text-cyber-blue transition-colors group">
          <Bell size={20} className="group-hover:drop-shadow-[0_0_8px_rgba(0,245,255,0.8)]" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-cyber-pink rounded-full shadow-[0_0_5px_rgba(255,0,255,0.8)]"></span>
        </button>
      </div>
    </motion.div>
  );
};

export default Navbar;
