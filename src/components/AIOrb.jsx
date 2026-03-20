import React from 'react';
import { motion } from 'framer-motion';

const AIOrb = () => {
  return (
    <div className="fixed bottom-10 right-10 z-[100] pointer-events-none opacity-50 hidden lg:block">
      <motion.div 
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 360]
        }}
        transition={{ 
          y: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          },
          rotate: {
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }
        }}
        className="relative w-24 h-24"
      >
        {/* Core */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-[0_0_30px_rgba(255,255,255,1)]"></div>
        
        {/* Inner Ring */}
        <div className="absolute top-0 left-0 w-full h-full border-2 border-cyber-blue/50 rounded-full border-t-cyber-blue animate-[spin_3s_linear_infinite] shadow-[0_0_15px_rgba(0,245,255,0.4)]"></div>
        
        {/* Outer Ring */}
        <div className="absolute -top-4 -left-4 w-[calc(100%+32px)] h-[calc(100%+32px)] border-2 border-cyber-purple/30 rounded-full border-b-cyber-purple border-l-cyber-purple animate-[spin_5s_linear_infinite_reverse] shadow-[0_0_20px_rgba(139,92,246,0.3)]"></div>
        
        {/* Particles */}
        <div className="absolute top-2 right-4 w-2 h-2 bg-cyber-pink rounded-full shadow-[0_0_10px_rgba(255,0,255,0.8)] animate-pulse"></div>
        <div className="absolute bottom-4 left-2 w-1.5 h-1.5 bg-cyber-blue rounded-full shadow-[0_0_10px_rgba(0,245,255,0.8)] animate-pulse" style={{ animationDelay: '0.5s'}}></div>
        
      </motion.div>
    </div>
  );
};

export default AIOrb;
