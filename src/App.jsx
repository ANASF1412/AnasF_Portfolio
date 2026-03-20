import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import CursorGlow from './components/CursorGlow';
import AIOrb from './components/AIOrb';

function App() {
  const [activeSection, setActiveSection] = useState('hero');

  // Simple scroll spy logic
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'projects', 'skills', 'achievements', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && el.offsetTop <= scrollPosition && el.offsetTop + el.offsetHeight > scrollPosition) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-cyber-black text-gray-200 min-h-screen font-sans selection:bg-cyber-pink/30 selection:text-white relative">
      <CursorGlow />
      <AIOrb />

      {/* Cyber Grid Background */}
      <div className="fixed inset-0 bg-cyber-grid bg-cyber-grid z-0 opacity-20 pointer-events-none"></div>

      {/* Futuristic Background Blur */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-cyber-blue/10 blur-[150px] rounded-full pointer-events-none z-0 mix-blend-screen animate-pulse duration-10000"></div>
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-cyber-purple/10 blur-[150px] rounded-full pointer-events-none z-0 mix-blend-screen"></div>

      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <Navbar />

      <main className="ml-16 md:ml-20 lg:ml-64 px-6 md:px-12 lg:px-24">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Achievements />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="ml-16 md:ml-20 lg:ml-64 px-6 md:px-12 border-t border-white/10 py-8 relative z-10 text-center text-sm font-mono text-gray-500">
        <p>System initialized by Anas F &copy; {new Date().getFullYear()}</p>
        <p className="mt-2 text-cyber-blue">Designed with React + Tailwind + Frame Motion</p>
      </footer>
    </div>
  );
}

export default App;
