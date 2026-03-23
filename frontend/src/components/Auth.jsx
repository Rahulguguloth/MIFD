import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Mail, Lock, User, ArrowRight, ShieldAlert } from 'lucide-react';

const Auth = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: 'admin@mifd.ai',
    password: 'password123'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      onLogin({
        name: formData.name || 'Insurance Analyst',
        email: formData.email
      });
      localStorage.setItem('mifd-user', 'true');
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] p-4 font-inter">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1e293b,0%,#0f172a_100%)]" />
      
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-600/10 rounded-full blur-[128px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px] animate-pulse delay-1000" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative"
      >
        <div className="glass-card p-8 sm:p-10 border-white/10 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center p-3 bg-brand-500 rounded-2xl text-white mb-4 shadow-lg shadow-brand-500/30">
              <ShieldCheck size={32} />
            </div>
            <h2 className="text-3xl font-bold font-outfit text-white mb-2">
              Phish<span className="text-brand-400">Sentinel</span>
            </h2>
            <p className="text-slate-400 text-sm">
              {isLogin ? 'Access the AI Fraud Detection Terminal' : 'Register for an analyst account'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className="form-label uppercase tracking-tighter text-[10px] ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                    <input 
                      type="text" 
                      name="name"
                      onChange={handleChange}
                      className="form-input !pl-12 !bg-white/5 border-white/10 focus:border-brand-500" 
                      placeholder="Dr. Rahul Guguloth" 
                      required
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="form-label uppercase tracking-tighter text-[10px] ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input !pl-12 !bg-white/5 border-white/10 focus:border-brand-500" 
                  placeholder="analyst@healthcare.org" 
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5 ml-1">
                <label className="form-label uppercase tracking-tighter text-[10px] m-0">Password</label>
                {isLogin && <a href="#" className="text-[10px] text-brand-400 hover:text-brand-300 font-bold uppercase tracking-tighter transition-colors">Forgot?</a>}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input !pl-12 !bg-white/5 border-white/10 focus:border-brand-500" 
                  placeholder="••••••••" 
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary w-full mt-4 flex items-center justify-center gap-2 relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-brand-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center gap-2">
                {loading ? <div className="spinner !w-5 !h-5" /> : (isLogin ? 'Initialize Session' : 'Create Account')}
                {!loading && <ArrowRight size={18} />}
              </span>
            </button>
          </form>

          {/* Social / Alternative */}
          <div className="mt-10 py-4 border-t border-white/5 text-center">
            <p className="text-slate-500 text-xs">
              {isLogin ? "Don't have an authentication key?" : "Already have access code?"}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-brand-400 hover:text-brand-300 font-bold uppercase tracking-tighter transition-colors"
                type="button"
              >
                {isLogin ? 'Request Access' : 'Secure Login'}
              </button>
            </p>
          </div>

          <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-slate-600 uppercase tracking-widest font-bold">
            <ShieldAlert size={10} />
            <span>End-to-End Encryption Enabled</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
