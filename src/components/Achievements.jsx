import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, ChevronRight, X, Image as ImageIcon } from 'lucide-react';
import { mediaData } from '../data/mediaData';

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
  const [selectedMedia, setSelectedMedia] = useState(null);

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

      {/* Media Gallery Section */}
      <div className="mt-32 relative z-10">
        <div className="mb-12 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-white tracking-wider flex items-center justify-center gap-3 mb-2">
            <ImageIcon className="text-cyber-pink" size={28} />
            MEDIA.<span className="text-cyber-blue drop-shadow-[0_0_8px_rgba(0,245,255,0.8)]">GALLERY</span>
          </h2>
          <p className="text-gray-400 font-mono text-sm">
            Visual records of hackathons, awards, and milestones...
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {mediaData.map((media) => (
            <motion.div
              layoutId={`media-${media.id}`}
              key={media.id}
              className={`relative overflow-hidden rounded-xl cursor-pointer group glass-panel border-white/10 ${media.colSpan} ${media.rowSpan}`}
              onClick={() => setSelectedMedia(media)}
              whileHover={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-cyber-blue/20 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
              <img 
                src={media.image} 
                alt={media.caption} 
                loading="lazy"
                className="w-full h-full object-cover min-h-[250px] group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                <p className="text-white text-sm font-medium line-clamp-2">{media.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedMedia && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMedia(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            
            <motion.div
              layoutId={`media-${selectedMedia.id}`}
              className="relative w-full max-w-5xl max-h-[90vh] rounded-2xl overflow-hidden glass-panel border border-white/20 shadow-[0_0_30px_rgba(0,245,255,0.3)] z-10 flex flex-col"
            >
              <button
                onClick={() => setSelectedMedia(null)}
                aria-label="Close lightbox"
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:text-cyber-pink hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-cyber-pink transition-colors backdrop-blur-md"
              >
                <X size={24} />
              </button>
              
              <div className="relative flex-1 overflow-hidden bg-black/50 flex items-center justify-center">
                <img 
                  src={selectedMedia.image} 
                  alt={selectedMedia.caption} 
                  className="max-w-full max-h-[75vh] object-contain"
                />
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6 bg-black/80 border-t border-white/10"
              >
                <p className="text-white text-lg md:text-xl font-medium flex items-center gap-3">
                  <Star className="text-cyber-blue" size={20} />
                  {selectedMedia.caption}
                </p>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Achievements;
