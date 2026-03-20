import React from 'react';
import { motion } from 'framer-motion';
import { TerminalSquare, Globe, Database, PenTool, LayoutTemplate } from 'lucide-react';

const skillCategories = [
  {
    title: "Core Programming",
    icon: <TerminalSquare size={20} />,
    borderColor: "bg-cyber-blue",
    textColor: "text-cyber-blue",
    bgColor: "bg-cyber-blue/10",
    borderClass: "border-cyber-blue/30",
    shadowClass: "group-hover:shadow-[0_0_10px_rgba(0,245,255,0.8)]",
    iconShadowClass: "group-hover:shadow-[0_0_10px_rgba(0,245,255,0.4)]",
    svgClass: "stroke-cyber-blue fill-cyber-blue",
    skills: [
      { name: "C++", level: 90 },
      { name: "Python", level: 85 },
      { name: "Java", level: 80 },
      { name: "C", level: 85 },
      { name: "Node.js", level: 75 }
    ]
  },
  {
    title: "Web Technologies",
    icon: <Globe size={20} />,
    borderColor: "bg-cyber-purple",
    textColor: "text-cyber-purple",
    bgColor: "bg-cyber-purple/10",
    borderClass: "border-cyber-purple/30",
    shadowClass: "group-hover:shadow-[0_0_10px_rgba(139,92,246,0.8)]",
    iconShadowClass: "group-hover:shadow-[0_0_10px_rgba(139,92,246,0.4)]",
    svgClass: "stroke-cyber-purple fill-cyber-purple",
    skills: [
      { name: "React", level: 85 },
      { name: "JavaScript", level: 85 },
      { name: "HTML5 / CSS3", level: 90 },
      { name: "Tailwind CSS", level: 85 },
      { name: "Express.js", level: 75 }
    ]
  },
  {
    title: "Databases & Cloud",
    icon: <Database size={20} />,
    borderColor: "bg-cyber-pink",
    textColor: "text-cyber-pink",
    bgColor: "bg-cyber-pink/10",
    borderClass: "border-cyber-pink/30",
    shadowClass: "group-hover:shadow-[0_0_10px_rgba(255,0,255,0.8)]",
    iconShadowClass: "group-hover:shadow-[0_0_10px_rgba(255,0,255,0.4)]",
    svgClass: "stroke-cyber-pink fill-cyber-pink",
    skills: [
      { name: "MongoDB", level: 80 },
      { name: "MySQL", level: 85 },
      { name: "Firebase", level: 70 },
      { name: "REST APIs", level: 85 }
    ]
  },
  {
    title: "Tools & Concepts",
    icon: <PenTool size={20} />,
    borderColor: "bg-cyber-blue",
    textColor: "text-cyber-blue",
    bgColor: "bg-cyber-blue/10",
    borderClass: "border-cyber-blue/30",
    shadowClass: "group-hover:shadow-[0_0_10px_rgba(0,245,255,0.8)]",
    iconShadowClass: "group-hover:shadow-[0_0_10px_rgba(0,245,255,0.4)]",
    svgClass: "stroke-cyber-blue fill-cyber-blue",
    skills: [
      { name: "Git & GitHub", level: 85 },
      { name: "Data Structures & Algorithms", level: 90 },
      { name: "Object Oriented Programming", level: 85 },
      { name: "Postman", level: 80 },
      { name: "PowerBI", level: 70 }
    ]
  }
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 min-h-screen relative z-10">
      <div className="mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-wider flex items-center gap-4 mb-2">
          <LayoutTemplate className="text-cyber-pink" size={32} />
          SYSTEM.<span className="text-cyber-pink drop-shadow-[0_0_8px_rgba(255,0,255,0.8)]">CAPABILITIES</span>
        </h2>
        <p className="text-gray-400 font-mono text-sm">
          Analyzing technical proficiencies and module integrations...
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {skillCategories.map((category, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className={`glass-panel p-6 md:p-8 rounded-2xl relative overflow-hidden group`}
          >
            {/* Dynamic border based on category color */}
            <div className={`absolute top-0 left-0 w-full h-1 ${category.borderColor} opacity-30 group-hover:opacity-100 ${category.shadowClass} transition-all duration-300`}></div>

            <div className="flex items-center gap-3 mb-8">
              <div className={`p-2 rounded ${category.bgColor} border ${category.borderClass} ${category.textColor} ${category.iconShadowClass} transition-shadow`}>
                {category.icon}
              </div>
              <h3 className="text-xl font-bold text-white tracking-wide">{category.title}</h3>
            </div>

            <div className="space-y-6">
              {category.skills.map((skill, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{skill.name}</span>
                    <span className={`text-xs font-mono ${category.textColor}`}>{skill.level}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-black/50 rounded-full overflow-hidden border border-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 + (i * 0.1) }}
                      className={`h-full ${category.borderColor} relative glow-element`}
                    >
                      {/* Pulse effect on the bar */}
                      <div className="absolute top-0 right-0 w-4 h-full bg-white opacity-50 blur-[2px]"></div>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Cyberpunk circuit visual accent */}
            <div className="absolute bottom-4 right-4 pointer-events-none opacity-20">
              <svg width="40" height="40" viewBox="0 0 100 100" className="fill-none" strokeWidth="2">
                <path d="M 0 50 L 30 50 L 50 30 L 100 30" className={category.textColor.replace('text-', 'stroke-')} />
                <circle cx="50" cy="30" r="4" className={category.textColor.replace('text-', 'fill-')} />
              </svg>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
