import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Brain, Cpu, Server, MapPin } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 min-h-screen flex flex-col justify-center relative z-10">
      <div className="mb-16">
        <div className="flex items-center gap-4 mb-2">
          <div className="h-px w-12 bg-cyber-blue"></div>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-wider">
            SYSTEM.<span className="text-cyber-blue drop-shadow-[0_0_8px_rgba(0,245,255,0.8)]">ABOUT</span>
          </h2>
        </div>
        <p className="text-gray-400 font-mono text-sm pl-16">Accessing biography database...</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Bio Track */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-panel neon-border p-8 rounded-2xl relative overflow-hidden"
        >
          {/* Decorative Code bg */}
          <div className="absolute top-0 right-0 p-4 opacity-5 text-xs font-mono whitespace-pre -z-10 pointer-events-none">
{`function initSystem() {
  const dev = new Developer('Anas F');
  dev.skills = ['DSA', 'MERN', 'AI/ML'];
  while(alive) {
    dev.code();
    dev.learn();
  }
}`}
          </div>

          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-lg bg-cyber-blue/20 flex items-center justify-center border border-cyber-blue/50 text-cyber-blue shrink-0">
              <Brain size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Neural Overview</h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                I am a passionate and driven B.Tech student specializing in Computer Science and Business Systems. 
                My development core is wired for problem-solving with a strong foundation in <span className="text-cyber-blue font-semibold">Data Structures & Algorithms</span>. 
                I actively architect scalable web solutions using the <span className="text-cyber-purple font-semibold">MERN stack</span> and integrate 
                cutting-edge <span className="text-cyber-pink font-semibold">AI/ML models</span> to build innovative digital products.
              </p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 mt-6">
            <h4 className="text-gray-400 font-mono text-sm mb-4 uppercase tracking-widest flex items-center gap-2">
              <Server size={14} className="text-cyber-blue" />
              Core Competencies
            </h4>
            <div className="flex flex-wrap gap-3">
              {['Data Structures & Algorithms', 'MERN Stack Development', 'Artificial Intelligence', 'Machine Learning', 'Problem Solving'].map((skill, index) => (
                <span key={index} className="px-3 py-1 text-sm rounded bg-white/5 border border-white/10 hover:border-cyber-blue hover:text-cyber-blue transition-colors cursor-crosshair">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Education Timeline */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="glass-panel p-8 rounded-2xl h-full border border-cyber-purple/30 group hover:neon-border-purple transition-all duration-300">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <GraduationCap className="text-cyber-purple drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]" /> 
              Training Module
            </h3>

            <div className="relative pl-8 border-l border-cyber-purple/30">
              {/* Timeline dot */}
              <div className="absolute top-0 -left-[9px] w-4 h-4 bg-black border-2 border-cyber-purple rounded-full shadow-[0_0_10px_rgba(139,92,246,0.8)]"></div>
              
              <div className="mb-2">
                <span className="px-2 py-1 text-xs font-mono text-cyber-purple bg-cyber-purple/10 rounded border border-cyber-purple/30 inline-block mb-3">
                  2024 - 2028
                </span>
                <h4 className="text-xl font-bold text-white">B.Tech - Computer Science & Business Systems</h4>
                <div className="flex items-center gap-2 text-gray-400 mt-2 mb-4">
                  <MapPin size={14} className="text-cyber-pink" />
                  <span className="text-sm">Sri Eshwar College of Engineering</span>
                </div>
                
                <p className="text-gray-300 text-sm">
                  Focusing on integrating business intelligence with core computer science principles. 
                  Active participant in technology symposiums and hackathons.
                </p>
                
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-black/50 border border-white/5 rounded-md text-sm cursor-default hover:bg-white/5 transition-colors">
                  <Cpu size={14} className="text-cyber-blue" />
                  <span className="text-gray-400">Current CGPA:</span>
                  <span className="text-cyber-blue font-mono font-bold">8.08</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
