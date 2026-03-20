import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ChevronDown, Terminal, Code2, Database, Award } from 'lucide-react';
import profileImg from '../assets/profile.jpg';

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen pt-24 pb-12 flex flex-col justify-center relative">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="inline-block px-4 py-1.5 rounded-full border border-cyber-purple/30 bg-cyber-purple/10 backdrop-blur-sm">
            <span className="text-sm font-mono text-cyber-purple drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]">
              Welcome to my portfolio_v2.0
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Hi, I'm <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink drop-shadow-[0_0_15px_rgba(0,245,255,0.4)]">
              ANAS F
            </span>
          </h1>

          <div className="h-12 md:h-16 text-2xl md:text-3xl font-mono text-gray-300 flex items-center gap-3">
            <span className="text-cyber-blue">{'>'}</span>
            <TypeAnimation
              sequence={[
                'Full Stack Developer',
                1000,
                'AI & ML Enthusiast',
                1000,
                'Problem Solver',
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="neon-text"
            />
            <span className="w-3 h-8 bg-cyber-pink animate-pulse ml-1 inline-block shadow-[0_0_8px_rgba(255,0,255,0.8)]"></span>
          </div>

          <p className="text-gray-400 max-w-lg text-lg leading-relaxed">
            Building digital experiences fusing artificial intelligence 
            with modern web development. Architecting the future, 
            one line of code at a time.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button className="px-8 py-3 rounded-lg bg-cyber-blue/10 border border-cyber-blue text-cyber-blue font-medium hover:bg-cyber-blue/20 hover:shadow-[0_0_15px_rgba(0,245,255,0.6)] transition-all duration-300 relative overflow-hidden group">
              <span className="relative z-10 flex items-center gap-2">
                <Terminal size={18} /> Initialize Connect
              </span>
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyber-blue/0 via-cyber-blue/30 to-cyber-blue/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
            <a href="#projects" className="px-8 py-3 rounded-lg bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all duration-300">
              View Database
            </a>
          </div>
        </motion.div>

        {/* Right Content - Stats Card */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Animated Background Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-cyber-blue/20 via-cyber-purple/20 to-cyber-pink/20 blur-[100px] -z-10 rounded-full"></div>
          
          <div className="glass-panel neon-border-purple rounded-2xl p-6 md:p-8 relative overflow-hidden group">
            {/* Corner Details */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyber-purple"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyber-purple"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyber-purple"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyber-purple"></div>

            <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 border-b border-white/10 pb-6 relative z-10">
              <div className="relative">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden neon-border z-10 relative bg-black">
                  <img src={profileImg} alt="Anas F" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                  <div className="absolute inset-0 bg-cyber-blue mix-blend-overlay opacity-30 group-hover:opacity-0 transition-opacity duration-300"></div>
                </div>
                {/* Orbital Ring */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-cyber-blue/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
                <div className="absolute top-0 left-1/2 w-3 h-3 bg-cyber-blue rounded-full shadow-[0_0_10px_rgba(0,245,255,1)] animate-[spin_5s_linear_infinite] origin-[0_60px] sm:origin-[0_80px]"></div>
              </div>
              
              <div className="text-center sm:text-left">
                <h3 className="text-2xl font-bold text-white mb-1">System Stats</h3>
                <p className="text-cyber-blue font-mono text-sm">Status: Optimal Performance</p>
              </div>
            </div>

            <div className="space-y-6 relative z-10">
              {/* Stat 1 */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="flex items-center gap-2 text-gray-300 text-sm"><Award size={16} className="text-cyber-purple" /> CGPA</span>
                  <span className="text-cyber-purple font-mono neon-text-purple font-bold text-lg">8.08</span>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '80.8%' }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-cyber-purple/50 to-cyber-purple neon-border-purple"
                  ></motion.div>
                </div>
              </div>

              {/* Stat 2 */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="flex items-center gap-2 text-gray-300 text-sm"><Code2 size={16} className="text-cyber-blue" /> LeetCode Solved</span>
                  <span className="text-cyber-blue font-mono neon-text font-bold text-lg">100+</span>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '60%' }}
                    transition={{ duration: 1.5, delay: 0.7 }}
                    className="h-full bg-gradient-to-r from-cyber-blue/50 to-cyber-blue neon-border"
                  ></motion.div>
                </div>
              </div>

              {/* Stat 3 */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="flex items-center gap-2 text-gray-300 text-sm"><Database size={16} className="text-cyber-pink" /> SkillRack Solved</span>
                  <span className="text-cyber-pink font-mono neon-text-pink font-bold text-lg">1000+</span>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '90%' }}
                    transition={{ duration: 1.5, delay: 0.9 }}
                    className="h-full bg-gradient-to-r from-cyber-pink/50 to-cyber-pink neon-border-pink"
                  ></motion.div>
                </div>
              </div>
            </div>
            
          </div>
        </motion.div>

      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 1.5, delay: 1.5, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500 hover:text-cyber-blue transition-colors cursor-pointer"
      >
        <a href="#about"><ChevronDown size={32} /></a>
      </motion.div>
    </section>
  );
};

export default Hero;
