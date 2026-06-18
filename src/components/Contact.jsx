import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, ExternalLink, Send, Terminal, Loader } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'sent' | 'error'

  const validateForm = () => {
    const tempErrors = {};
    
    if (!formData.name.trim()) {
      tempErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      tempErrors.name = 'Name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      tempErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      tempErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      tempErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus('sending');

    try {
      // PROD READY: Replace with your actual serverless API endpoint (e.g. /api/contact or Formspree)
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });
      // if (!response.ok) throw new Error('Network response was not ok');

      // Simulating API call for presentation / static builds
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setStatus('sent');
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const profiles = [
    { name: 'LinkedIn', url: 'https://linkedin.com/in/anas-f-a5a595320', color: 'hover:text-cyber-blue hover:border-cyber-blue hover:shadow-[0_0_15px_rgba(0,245,255,0.4)]' },
    { name: 'GitHub', url: 'https://github.com/ANASF1412', color: 'hover:text-white hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]' },
    { name: 'LeetCode', url: 'https://leetcode.com/u/ANASF1412/', color: 'hover:text-yellow-500 hover:border-yellow-500 hover:shadow-[0_0_15px_rgba(234,179,8,0.4)]' },
    { name: 'SkillRack', url: 'https://www.skillrack.com/profile/ANASF1412', color: 'hover:text-cyber-purple hover:border-cyber-purple hover:shadow-[0_0_15px_rgba(139,92,246,0.4)]' }
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
          <form onSubmit={handleSubmit} className="glass-panel border-white/10 p-8 rounded-2xl h-full flex flex-col" noValidate>
            <h3 className="text-2xl font-bold text-white mb-6">Direct Terminal</h3>
            
            <div className="space-y-6 flex-grow">
              <div className="relative group">
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({...formData, name: e.target.value});
                    if (errors.name) setErrors({...errors, name: null});
                  }}
                  className={`w-full bg-black/50 border rounded-lg px-4 py-3 text-white focus:outline-none transition-all peer ${
                    errors.name ? 'border-red-500/50 focus:border-red-500 focus:shadow-[0_0_10px_rgba(239,68,68,0.3)]' : 'border-white/20 focus:border-cyber-blue focus:shadow-[0_0_10px_rgba(0,245,255,0.3)]'
                  }`}
                  placeholder=" "
                />
                <label className={`absolute left-4 top-3 text-gray-400 transition-all pointer-events-none peer-focus:-top-2 peer-focus:text-xs peer-focus:bg-black peer-focus:px-1 peer-valid:-top-2 peer-valid:text-xs peer-valid:bg-black peer-valid:px-1 ${
                  errors.name ? 'text-red-400 peer-focus:text-red-400' : 'peer-focus:text-cyber-blue peer-valid:text-cyber-blue'
                }`}>
                  guest_name
                </label>
                {errors.name && <p className="text-red-400 text-xs mt-1.5 font-mono pl-1">{errors.name}</p>}
              </div>

              <div className="relative group">
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({...formData, email: e.target.value});
                    if (errors.email) setErrors({...errors, email: null});
                  }}
                  className={`w-full bg-black/50 border rounded-lg px-4 py-3 text-white focus:outline-none transition-all peer ${
                    errors.email ? 'border-red-500/50 focus:border-red-500 focus:shadow-[0_0_10px_rgba(239,68,68,0.3)]' : 'border-white/20 focus:border-cyber-purple focus:shadow-[0_0_10px_rgba(139,92,246,0.3)]'
                  }`}
                  placeholder=" "
                />
                <label className={`absolute left-4 top-3 text-gray-400 transition-all pointer-events-none peer-focus:-top-2 peer-focus:text-xs peer-focus:bg-black peer-focus:px-1 peer-valid:-top-2 peer-valid:text-xs peer-valid:bg-black peer-valid:px-1 ${
                  errors.email ? 'text-red-400 peer-focus:text-red-400' : 'peer-focus:text-cyber-purple peer-valid:text-cyber-purple'
                }`}>
                  guest_email
                </label>
                {errors.email && <p className="text-red-400 text-xs mt-1.5 font-mono pl-1">{errors.email}</p>}
              </div>

              <div className="relative group">
                <textarea 
                  required
                  rows="5"
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({...formData, message: e.target.value});
                    if (errors.message) setErrors({...errors, message: null});
                  }}
                  className={`w-full bg-black/50 border rounded-lg px-4 py-3 text-white focus:outline-none transition-all peer resize-none ${
                    errors.message ? 'border-red-500/50 focus:border-red-500 focus:shadow-[0_0_10px_rgba(239,68,68,0.3)]' : 'border-white/20 focus:border-cyber-pink focus:shadow-[0_0_10px_rgba(255,0,255,0.3)]'
                  }`}
                  placeholder=" "
                />
                <label className={`absolute left-4 top-3 text-gray-400 transition-all pointer-events-none peer-focus:-top-2 peer-focus:text-xs peer-focus:bg-black peer-focus:px-1 peer-valid:-top-2 peer-valid:text-xs peer-valid:bg-black peer-valid:px-1 ${
                  errors.message ? 'text-red-400 peer-focus:text-red-400' : 'peer-focus:text-cyber-pink peer-valid:text-cyber-pink'
                }`}>
                  payload_message
                </label>
                {errors.message && <p className="text-red-400 text-xs mt-1.5 font-mono pl-1">{errors.message}</p>}
              </div>
            </div>

            <button 
              type="submit" 
              disabled={status === 'sending'}
              className="mt-6 w-full py-4 rounded-lg bg-cyber-blue/10 border border-cyber-blue text-cyber-blue font-bold tracking-widest uppercase hover:bg-cyber-blue hover:text-black hover:shadow-[0_0_20px_rgba(0,245,255,0.6)] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden relative"
            >
              <div className="absolute inset-0 w-full h-full bg-cyber-blue -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out z-0"></div>
              
              <span className="relative z-10 flex items-center gap-2">
                {status === 'idle' && <><Send size={18} /> TRANSMIT</>}
                {status === 'sending' && <><Loader className="animate-spin" size={18} /> ENCRYPTING...</>}
                {status === 'sent' && <>PACKET DELIVERED</>}
                {status === 'error' && <>TRANSMISSION FAILED</>}
              </span>
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;

