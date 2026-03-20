import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, ChevronRight } from 'lucide-react';

const achievements = [
  {
    title: 'First Runner Up',
    event: 'National Level Paper Presentation',
    org: 'Coimbatore Institute of Technology (CIT)',
    date: '2026',
    iconColor: 'text-cyber-blue',
    borderColor: 'border-cyber-blue',
    shadowColor: 'shadow-[0_0_15px_rgba(0,245,255,0.4)]'
  },
  {
    title: 'Second Runner Up',
    event: 'Coding Relay',
    org: 'Technical Symposium,Coimbatore Institute of Technology (CIT)',
    date: '2026',
    iconColor: 'text-cyber-purple',
    borderColor: 'border-cyber-purple',
    shadowColor: 'shadow-[0_0_15px_rgba(139,92,246,0.4)]'
  },
  {
    title: 'Top 10 Innovators',
    event: 'GenAI Hackathon',
    org: 'AI Innovation Hub',
    date: '2025',
    iconColor: 'text-cyber-pink',
    borderColor: 'border-cyber-pink',
    shadowColor: 'shadow-[0_0_15px_rgba(255,0,255,0.4)]'
  },
  {
    title: 'Grand Finalist',
    event: 'ZeroDay Hackathon',
    org: 'Cybersec Society',
    date: '2025',
    iconColor: 'text-cyber-blue',
    borderColor: 'border-cyber-blue',
    shadowColor: 'shadow-[0_0_15px_rgba(0,245,255,0.4)]'
  }
];

const Achievements = () => {
  return (
    <section id="achievements" className="py-20 min-h-screen relative z-10 flex flex-col justify-center">
      <div className="mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-wider flex items-center gap-4 mb-2">
          <Trophy className="text-cyber-purple" size={32} />
          SYSTEM.<span className="text-cyber-blue drop-shadow-[0_0_8px_rgba(0,245,255,0.8)]">MILESTONES</span>
        </h2>
        <p className="text-gray-400 font-mono text-sm">
          Fetching operational records: Commendations and hackathons...
        </p>
      </div>

      <div className="relative">
        {/* Core Timeline Line */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2"></div>
        
        {/* Animated flow line */}
        <motion.div 
          initial={{ height: 0 }}
          whileInView={{ height: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="hidden md:block absolute left-1/2 top-0 w-px bg-gradient-to-b from-cyber-blue via-cyber-purple to-cyber-pink shadow-[0_0_8px_rgba(0,245,255,0.8)] -translate-x-1/2 z-0"
        ></motion.div>

        <div className="space-y-12">
          {achievements.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative flex flex-col md:flex-row items-center justify-between group ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Timeline Center Node */}
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-black border-2 border-white/20 items-center justify-center z-10 group-hover:scale-125 transition-transform duration-300">
                <Star size={16} className={`${item.iconColor} drop-shadow-[0_0_5px_currentColor]`} />
                <div className={`absolute inset-0 rounded-full bg-current opacity-20 blur-sm ${item.iconColor}`}></div>
              </div>

              {/* Empty spacer for alignment */}
              <div className="hidden md:block w-5/12"></div>

              {/* Content Card */}
              <div className="w-full md:w-5/12">
                <div className={`glass-panel p-6 rounded-2xl border ${item.borderColor}/30 hover:${item.borderColor} ${item.shadowColor} transition-all duration-300 relative overflow-hidden`}>
                  
                  {/* Glowing background accent */}
                  <div className={`absolute -top-10 -right-10 w-32 h-32 bg-current opacity-10 blur-3xl rounded-full ${item.iconColor}`}></div>

                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <span className={`px-3 py-1 text-xs font-mono rounded bg-white/5 border border-white/10 text-white`}>
                      {item.date}
                    </span>
                    <ChevronRight size={18} className={`${item.iconColor} opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all`} />
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-colors mb-2 relative z-10">
                    {item.title}
                  </h3>
                  
                  <p className={`text-md font-medium ${item.iconColor} mb-2 relative z-10`}>
                    {item.event}
                  </p>
                  
                  <p className="text-gray-400 text-sm flex items-center gap-2 relative z-10">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
                    {item.org}
                  </p>
                  
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
