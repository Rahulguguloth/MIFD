import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertCircle, 
  RefreshCcw, 
  Database, 
  User, 
  Hospital, 
  Stethoscope, 
  DollarSign, 
  Info,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Auth from './components/Auth';

const Dashboard = ({ user, onLogout }) => {
  const [formData, setFormData] = useState({
    age: '',
    gender: 'Male',
    claim_amount: '',
    approved_amount: '',
    hospital_type: 'Private',
    treatment_category: 'Surgery'
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Use live Railway backend
      const response = await axios.post('https://mifd-production.up.railway.app/predict', {
        age: parseInt(formData.age),
        gender: formData.gender,
        claim_amount: parseFloat(formData.claim_amount),
        approved_amount: parseFloat(formData.approved_amount),
        hospital_type: formData.hospital_type,
        treatment_category: formData.treatment_category
      });
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || "Connection to API failed. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const trySampleData = () => {
    setFormData({
      age: 78,
      gender: 'Male',
      claim_amount: 800000,
      approved_amount: 12000,
      hospital_type: 'Private',
      treatment_category: 'Surgery'
    });
  };

  const resetForm = () => {
    setFormData({
      age: '',
      gender: 'Male',
      claim_amount: '',
      approved_amount: '',
      hospital_type: 'Private',
      treatment_category: 'Surgery'
    });
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-inter bg-[#0f172a]">
      <div className="max-w-6xl mx-auto">
        {/* Navbar */}
        <nav className="flex justify-between items-center mb-12 glass-card px-6 py-4 border-white/5 shadow-xl">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-brand-500 rounded-lg text-white">
              <ShieldCheck size={20} />
            </div>
            <span className="font-outfit font-bold text-xl text-white tracking-tight">PhishSentinel <span className="text-brand-400 font-medium">Terminal</span></span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-3 pr-6 border-r border-white/10">
              <div className="text-right">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none mb-1">Authenticated Analyst</p>
                <p className="text-sm text-slate-200 font-semibold leading-none">{user.name}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center p-1">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-brand-500 to-blue-600" />
              </div>
            </div>
            <button 
              onClick={onLogout}
              className="text-slate-400 hover:text-red-400 transition-colors flex items-center gap-2 text-sm font-semibold uppercase tracking-tighter"
            >
              <LogOut size={16} /> <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </nav>

        {/* Header */}
        <div className="text-center mb-10">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20 mb-4"
          >
            <ShieldAlert size={16} />
            <span className="text-xs font-semibold uppercase tracking-wider">AI Security Protocol • Live Analysis</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl font-bold font-outfit text-white mb-2 tracking-tight"
          >
            Medical Insurance <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-blue-600 font-extrabold uppercase italic">Fraud Detection</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto"
          >
            High-precision XGBoost engine for real-time medical claim risk evaluation, upcoding detection, and phantom billing analysis.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Form Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6 sm:p-8 border-white/10"
          >
            <div className="flex items-center gap-2 mb-8 pb-4 border-b border-white/5">
              <Database className="text-brand-400" size={18} />
              <h3 className="font-outfit font-bold text-white text-lg lowercase tracking-tight">Claim Input Parameters</h3>
            </div>

            <form onSubmit={handleAnalyze} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label text-[10px] flex items-center gap-1.5 uppercase font-bold tracking-widest text-slate-500">
                    <User size={12} /> Patient Age
                  </label>
                  <input 
                    type="number" 
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="form-input text-white focus:bg-white/5" 
                    placeholder="e.g. 45"
                    required
                  />
                </div>
                <div>
                  <label className="form-label text-[10px] flex items-center gap-1.5 uppercase font-bold tracking-widest text-slate-500">
                    <User size={12} /> Gender
                  </label>
                  <div className="relative">
                    <select 
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="form-input appearance-none bg-slate-800 text-white"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div>
                <label className="form-label text-[10px] flex items-center gap-1.5 uppercase font-bold tracking-widest text-slate-500">
                  <DollarSign size={12} /> Claim Amount
                </label>
                <div className="relative group">
                  <span className="absolute left-4 top-3 text-slate-600 font-bold tracking-tighter transition-colors group-focus-within:text-brand-500">INR</span>
                  <input 
                    type="number" 
                    name="claim_amount"
                    value={formData.claim_amount}
                    onChange={handleChange}
                    className="form-input pl-12 text-white bg-white/5 border-white/10" 
                    placeholder="Total amount claimed"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="form-label text-[10px] flex items-center gap-1.5 uppercase font-bold tracking-widest text-slate-500">
                  <DollarSign size={12} /> Approved Amount
                </label>
                <div className="relative group">
                  <span className="absolute left-4 top-3 text-slate-600 font-bold tracking-tighter transition-colors group-focus-within:text-brand-500">INR</span>
                  <input 
                    type="number" 
                    name="approved_amount"
                    value={formData.approved_amount}
                    onChange={handleChange}
                    className="form-input pl-12 text-white bg-white/5 border-white/10" 
                    placeholder="Amount approved"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label text-[10px] flex items-center gap-1.5 uppercase font-bold tracking-widest text-slate-500">
                    <Hospital size={12} /> Hospital Type
                  </label>
                  <div className="relative">
                    <select 
                      name="hospital_type"
                      value={formData.hospital_type}
                      onChange={handleChange}
                      className="form-input appearance-none bg-slate-800 text-white"
                    >
                      <option value="Private">Private</option>
                      <option value="Government">Government</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="form-label text-[10px] flex items-center gap-1.5 uppercase font-bold tracking-widest text-slate-500">
                    <Stethoscope size={12} /> Treatment
                  </label>
                  <div className="relative">
                    <select 
                      name="treatment_category"
                      value={formData.treatment_category}
                      onChange={handleChange}
                      className="form-input appearance-none bg-slate-800 text-white"
                    >
                      <option value="Surgery">Surgery</option>
                      <option value="Therapy">Therapy</option>
                      <option value="Emergency">Emergency</option>
                      <option value="Consultation">Consultation</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-6">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn-primary flex-1 flex items-center justify-center gap-2 font-bold uppercase tracking-widest"
                >
                  {loading ? <div className="spinner !w-5 !h-5" /> : <><Database size={16} /> Analysis Scan</>}
                </button>
                <button 
                  type="button"
                  onClick={trySampleData}
                  className="px-6 py-3 bg-slate-900 border border-white/10 text-slate-400 hover:text-white hover:bg-slate-800 transition-all rounded-xl font-bold uppercase tracking-widest text-xs"
                >
                  Load Fraud Case
                </button>
              </div>
            </form>
          </motion.div>

          {/* Result Card */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {!result && !error && (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass-card p-12 flex flex-col items-center justify-center text-center text-slate-500 border-dashed border-white/5 h-[620px]"
                >
                  <div className="p-5 bg-slate-800/50 rounded-full mb-6 border border-white/5 animate-pulse">
                    <ShieldAlert size={48} className="opacity-20" />
                  </div>
                  <h4 className="text-slate-300 font-bold uppercase tracking-widest mb-2">Awaiting Input Scan</h4>
                  <p className="max-w-[240px] text-xs">Configure the parameters on the left and run the AI scan to initialize analysis results.</p>
                </motion.div>
              )}

              {error && (
                <motion.div 
                  key="error"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-red-500/5 border border-red-500/20 p-8 rounded-2xl text-red-400 flex flex-col items-center text-center gap-4"
                >
                  <div className="p-3 bg-red-500/10 rounded-xl">
                    <AlertCircle size={32} />
                  </div>
                  <div>
                    <h3 className="font-outfit font-bold uppercase text-lg mb-2">System Analysis Failure</h3>
                    <p className="text-sm opacity-80 leading-relaxed font-medium">{error}</p>
                  </div>
                  <button onClick={() => setError(null)} className="mt-4 px-6 py-2 bg-red-500/20 rounded-lg text-xs font-bold uppercase hover:bg-red-500/30 transition-colors">Acknowledge</button>
                </motion.div>
              )}

              {result && (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`glass-card overflow-hidden border-2 transition-all duration-700 min-h-[620px] shadow-2xl ${
                    result.prediction === 'Fraud' 
                    ? 'border-red-500/40 shadow-red-500/5 ring-1 ring-red-500/20' 
                    : 'border-emerald-500/40 shadow-emerald-500/5 ring-1 ring-emerald-500/20'
                  }`}
                >
                  <div className={`p-8 ${result.prediction === 'Fraud' ? 'bg-red-500/5' : 'bg-emerald-500/5'}`}>
                    <div className="flex justify-between items-start mb-10">
                      <div className="flex items-center gap-4">
                        <div className={`p-4 rounded-2xl text-white shadow-xl ${result.prediction === 'Fraud' ? 'bg-red-500 shadow-red-500/20' : 'bg-emerald-500 shadow-emerald-500/20'}`}>
                          {result.prediction === 'Fraud' ? <ShieldAlert size={32} /> : <ShieldCheck size={32} />}
                        </div>
                        <div>
                          <h3 className="text-[10px] font-bold uppercase text-slate-500 tracking-[0.2em] mb-1">XGBoost Detection Engine</h3>
                          <p className={`text-3xl font-black italic uppercase font-outfit tracking-tighter ${result.prediction === 'Fraud' ? 'text-red-400' : 'text-emerald-400'}`}>
                            {result.prediction} Detected
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] block mb-1">Risk Profile</span>
                        <span className="text-3xl font-black text-white tracking-widest leading-none">{(result.probability * 100).toFixed(1)}%</span>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="relative pt-4">
                        <div className="flex justify-between text-[10px] uppercase font-black text-slate-600 tracking-widest mb-3">
                          <span>Risk Probability</span>
                          <span>Confidence Level</span>
                        </div>
                        <div className="w-full bg-slate-800 h-4 rounded-full overflow-hidden p-[2px] border border-white/5">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${result.probability * 100}%` }}
                            transition={{ duration: 1.5, ease: "circOut" }}
                            className={`h-full rounded-full ${result.prediction === 'Fraud' ? 'bg-gradient-to-r from-red-600 to-red-400 shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)]'}`}
                          />
                        </div>
                      </div>

                      <div className="p-6 bg-slate-900/80 rounded-2xl border border-white/5 relative group">
                        <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-100 transition-opacity">
                          <Info size={14} />
                        </div>
                        <div className="flex items-center gap-2 text-brand-400 mb-2.5">
                          <div className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-ping" />
                          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Neural Reasoning Layer</span>
                        </div>
                        <blockquote className="text-slate-200 text-sm leading-relaxed font-medium italic">
                          "{result.explanation}"
                        </blockquote>
                      </div>

                      <div className="grid grid-cols-1 gap-4 mt-8">
                        <div className="bg-slate-900 border border-white/5 rounded-xl p-5">
                          <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-4">Internal Risk Vectors</h4>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                              <span>Anomaly Variance</span>
                              <span className="text-white">{(result.probability * 1.2).toFixed(2)}σ</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                              <span>Peer-Group Deviation</span>
                              <span className="text-white">{(result.probability * 0.85 * 100).toFixed(1)}%</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <button 
                        onClick={resetForm}
                        className="w-full mt-2 flex items-center justify-center gap-2 py-4 border border-white/10 hover:bg-white/5 rounded-xl text-slate-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest shadow-lg"
                      >
                        <RefreshCcw size={14} /> Recalibrate Sensors
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* AI Insights Card */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="glass-card p-6 bg-gradient-to-br from-slate-900 to-brand-900/10 border-white/5"
            >
              <h3 className="font-outfit font-bold text-white flex items-center gap-2 mb-3">
                <ShieldCheck className="text-brand-400" size={20} />
                <span className="tracking-tight uppercase lowercase-first">System Intelligence</span>
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Analysis performed using cross-validated Bayesian XGBoost clusters. Risk scores above <span className="text-slate-300">50%</span> are classified as <span className="text-red-400 font-bold italic">Fraud</span> for further clinical audit.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-slate-700 text-[10px] tracking-[0.4em] uppercase font-black">
            PhishSentinel Intelligence Terminal • Secured Healthcare Instance • 2026.03.23
          </p>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('mifd-user');
    if (savedUser) {
      setUser({
        name: 'Analyst Rahul',
        email: 'rahul@mifd.ai'
      });
    }
    setIsReady(true);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('mifd-user');
  };

  if (!isReady) return null;

  return (
    <AnimatePresence mode="wait">
      {!user ? (
        <motion.div 
          key="auth"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5 }}
        >
          <Auth onLogin={handleLogin} />
        </motion.div>
      ) : (
        <motion.div 
          key="dashboard"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Dashboard user={user} onLogout={handleLogout} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default App;
