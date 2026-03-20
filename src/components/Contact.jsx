import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, ExternalLink, Send, Terminal, Loader } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate API call
    setTimeout(() => {
      setStatus('sent');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  const profiles = [
    { name: 'LinkedIn', url: 'https://linkedin.com/in/anas-f-a5a595320', color: 'hover:text-cyber-blue hover:border-cyber-blue hover:shadow-[0_0_15px_rgba(0,245,255,0.4)]' },
    { name: 'GitHub', url: 'https://github.com/ANASF1412', color: 'hover:text-white hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]' },
    { name: 'LeetCode', url: '#', color: 'hover:text-yellow-500 hover:border-yellow-500 hover:shadow-[0_0_15px_rgba(234,179,8,0.4)]' },
    { name: 'SkillRack', url: '#', color: 'hover:text-cyber-purple hover:border-cyber-purple hover:shadow-[0_0_15px_rgba(139,92,246,0.4)]' }
  ];

  return (
    <section id="contact" className="py-20 min-h-screen relative z-10 flex flex-col justify-center">
      <div className="mb-16 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-wider flex items-center justify-center gap-4 mb-2">
          <Terminal className="text-cyber-blue" size={32} />
          SYSTEM.<span className="text-cyber-blue drop-shadow-[0_0_8px_rgba(0,245,255,0.8)]">COMMUNICATION</span>
        </h2>
        <p className="text-gray-400 font-mono text-sm">
          Initialize secure connection protocol with admin...
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-6xl mx-auto">
        {/* Contact Info */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="glass-panel neon-border p-8 rounded-2xl relative overflow-hidden group">
            <h3 className="text-2xl font-bold text-white mb-6">Network Endpoints</h3>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 group/item">
                <div className="w-12 h-12 rounded-lg bg-cyber-blue/10 border border-cyber-blue/30 flex items-center justify-center text-cyber-blue group-hover/item:shadow-[0_0_15px_rgba(0,245,255,0.4)] transition-all">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm font-mono text-gray-400">VOICE_PROTOCOL</p>
                  <p className="text-lg text-gray-200">+91 8903430866</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group/item">
                <div className="w-12 h-12 rounded-lg bg-cyber-pink/10 border border-cyber-pink/30 flex items-center justify-center text-cyber-pink group-hover/item:shadow-[0_0_15px_rgba(255,0,255,0.4)] transition-all">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm font-mono text-gray-400">STMP_ADDRESS</p>
                  <a href="mailto:anas.f2024csbs@sece.ac.in" className="text-lg text-gray-200 hover:text-cyber-pink transition-colors">
                    anas.f2024csbs@sece.ac.in
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel border-white/10 p-8 rounded-2xl relative overflow-hidden">
            <h3 className="text-xl font-bold text-white mb-6">Coding Profiles / Nodes</h3>
            <div className="grid grid-cols-2 gap-4">
              {profiles.map((profile, idx) => (
                <a 
                  key={idx}
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5 text-gray-300 transition-all duration-300 group/link ${profile.color}`}
                >
                  <span className="font-medium">{profile.name}</span>
                  <ExternalLink size={16} className="opacity-50 group-hover/link:opacity-100 group-hover/link:-translate-y-1 group-hover/link:translate-x-1 transition-all" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="glass-panel border-white/10 p-8 rounded-2xl h-full flex flex-col">
            <h3 className="text-2xl font-bold text-white mb-6">Direct Terminal</h3>
            
            <div className="space-y-6 flex-grow">
              <div className="relative group">
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyber-blue focus:shadow-[0_0_10px_rgba(0,245,255,0.3)] transition-all peer"
                  placeholder=" "
                />
                <label className="absolute left-4 top-3 text-gray-400 transition-all pointer-events-none peer-focus:-top-2 peer-focus:text-xs peer-focus:text-cyber-blue peer-focus:bg-black peer-focus:px-1 peer-valid:-top-2 peer-valid:text-xs peer-valid:text-cyber-blue peer-valid:bg-black peer-valid:px-1">
                  guest_name
                </label>
              </div>

              <div className="relative group">
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyber-purple focus:shadow-[0_0_10px_rgba(139,92,246,0.3)] transition-all peer"
                  placeholder=" "
                />
                <label className="absolute left-4 top-3 text-gray-400 transition-all pointer-events-none peer-focus:-top-2 peer-focus:text-xs peer-focus:text-cyber-purple peer-focus:bg-black peer-focus:px-1 peer-valid:-top-2 peer-valid:text-xs peer-valid:text-cyber-purple peer-valid:bg-black peer-valid:px-1">
                  guest_email
                </label>
              </div>

              <div className="relative group h-full">
                <textarea 
                  required
                  rows="5"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyber-pink focus:shadow-[0_0_10px_rgba(255,0,255,0.3)] transition-all peer resize-none"
                  placeholder=" "
                />
                <label className="absolute left-4 top-3 text-gray-400 transition-all pointer-events-none peer-focus:-top-2 peer-focus:text-xs peer-focus:text-cyber-pink peer-focus:bg-black peer-focus:px-1 peer-valid:-top-2 peer-valid:text-xs peer-valid:text-cyber-pink peer-valid:bg-black peer-valid:px-1">
                  payload_message
                </label>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={status !== 'idle'}
              className="mt-6 w-full py-4 rounded-lg bg-cyber-blue/10 border border-cyber-blue text-cyber-blue font-bold tracking-widest uppercase hover:bg-cyber-blue hover:text-black hover:shadow-[0_0_20px_rgba(0,245,255,0.6)] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden relative"
            >
              <div className="absolute inset-0 w-full h-full bg-cyber-blue -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out z-0"></div>
              
              <span className="relative z-10 flex items-center gap-2">
                {status === 'idle' && <><Send size={18} /> TRANSMIT</>}
                {status === 'sending' && <><Loader className="animate-spin" size={18} /> ENCRYPTING...</>}
                {status === 'sent' && <>PACKET DELIVERED</>}
              </span>
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
