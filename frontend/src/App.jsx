import React, { useState } from 'react';
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
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const App = () => {
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
      const response = await axios.post('http://localhost:8000/predict', {
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
      age: 45,
      gender: 'Male',
      claim_amount: 500000,
      approved_amount: 50000,
      hospital_type: 'Private',
      treatment_category: 'Emergency'
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
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-inter">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20 mb-4"
          >
            <ShieldAlert size={16} />
            <span className="text-xs font-semibold uppercase tracking-wider">AI Security Protocol</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl font-bold font-outfit text-white mb-2 tracking-tight"
          >
            Medical Insurance <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-blue-600">Fraud Detection</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-slate-400 text-lg"
          >
            Advanced XGBoost analysis for real-time claim risk evaluation
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Form Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6 sm:p-8"
          >
            <form onSubmit={handleAnalyze} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label uppercase tracking-tighter flex items-center gap-1.5">
                    <User size={14} className="text-brand-400" /> Patient Age
                  </label>
                  <input 
                    type="number" 
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="form-input" 
                    placeholder="e.g. 45"
                    required
                  />
                </div>
                <div>
                  <label className="form-label uppercase tracking-tighter flex items-center gap-1.5">
                    <User size={14} className="text-brand-400" /> Gender
                  </label>
                  <select 
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="form-input appearance-none bg-slate-800"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="form-label uppercase tracking-tighter flex items-center gap-1.5">
                  <DollarSign size={14} className="text-brand-400" /> Claim Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-slate-500">₹</span>
                  <input 
                    type="number" 
                    name="claim_amount"
                    value={formData.claim_amount}
                    onChange={handleChange}
                    className="form-input pl-8" 
                    placeholder="Total amount claimed"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="form-label uppercase tracking-tighter flex items-center gap-1.5">
                  <DollarSign size={14} className="text-brand-400" /> Approved Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-slate-500">₹</span>
                  <input 
                    type="number" 
                    name="approved_amount"
                    value={formData.approved_amount}
                    onChange={handleChange}
                    className="form-input pl-8" 
                    placeholder="Amount approved by insurer"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="form-label uppercase tracking-tighter flex items-center gap-1.5">
                  <Hospital size={14} className="text-brand-400" /> Hospital Type
                </label>
                <select 
                  name="hospital_type"
                  value={formData.hospital_type}
                  onChange={handleChange}
                  className="form-input appearance-none"
                >
                  <option value="Private">Private Facility</option>
                  <option value="Government">Government Facility</option>
                </select>
              </div>

              <div>
                <label className="form-label uppercase tracking-tighter flex items-center gap-1.5">
                  <Stethoscope size={14} className="text-brand-400" /> Treatment Category
                </label>
                <select 
                  name="treatment_category"
                  value={formData.treatment_category}
                  onChange={handleChange}
                  className="form-input appearance-none"
                >
                  <option value="Surgery">Surgery</option>
                  <option value="Therapy">Therapy</option>
                  <option value="Emergency">Emergency</option>
                  <option value="Consultation">Consultation</option>
                </select>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn-primary flex-1 flex items-center justify-center gap-2"
                >
                  {loading ? <div className="spinner" /> : <><Database size={18} /> Analyze Claim</>}
                </button>
                <button 
                  type="button"
                  onClick={trySampleData}
                  className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-all border border-slate-700"
                >
                  Try Sample
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
                  className="glass-card p-12 flex flex-col items-center justify-center text-center text-slate-500 border-dashed"
                >
                  <ShieldAlert size={48} className="mb-4 opacity-20" />
                  <p>Enter claim details and click analyze to start the AI scan</p>
                </motion.div>
              )}

              {error && (
                <motion.div 
                  key="error"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl text-red-400 flex gap-4 items-start"
                >
                  <AlertCircle className="shrink-0" />
                  <div>
                    <h3 className="font-bold underline mb-1">Analysis Error</h3>
                    <p className="text-sm">{error}</p>
                  </div>
                </motion.div>
              )}

              {result && (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`glass-card overflow-hidden border-2 transition-colors duration-500 ${
                    result.prediction === 'Fraud' ? 'border-red-500/50 shadow-red-500/10' : 'border-emerald-500/50 shadow-emerald-500/10'
                  }`}
                >
                  <div className={`p-6 ${result.prediction === 'Fraud' ? 'bg-red-500/10' : 'bg-emerald-500/10'}`}>
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-3">
                        {result.prediction === 'Fraud' ? (
                          <div className="p-3 bg-red-500 rounded-2xl text-white">
                            <ShieldAlert size={28} />
                          </div>
                        ) : (
                          <div className="p-3 bg-emerald-500 rounded-2xl text-white">
                            <ShieldCheck size={28} />
                          </div>
                        )}
                        <div>
                          <h3 className="text-sm font-semibold uppercase text-slate-400 tracking-wider">Detection Result</h3>
                          <p className={`text-2xl font-bold ${result.prediction === 'Fraud' ? 'text-red-400' : 'text-emerald-400'}`}>
                            {result.prediction} Detected
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-slate-500 uppercase tracking-widest block mb-1">Confidence</span>
                        <span className="text-2xl font-mono font-bold text-white">{(result.probability * 100).toFixed(1)}%</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Progress Bar */}
                      <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${result.probability * 100}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`h-full ${result.prediction === 'Fraud' ? 'bg-red-500' : 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]'}`}
                        />
                      </div>

                      <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                        <div className="flex items-center gap-2 text-brand-400 mb-2">
                          <Info size={16} />
                          <span className="text-xs font-bold uppercase tracking-widest">AI Reasoning</span>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed italic">
                          "{result.explanation}"
                        </p>
                      </div>

                      <button 
                        onClick={resetForm}
                        className="w-full mt-4 flex items-center justify-center gap-2 py-3 border border-slate-700 hover:bg-slate-800 rounded-xl text-slate-400 transition-colors text-sm font-medium"
                      >
                        <RefreshCcw size={14} /> Reset Analysis
                      </button>
                    </div>
                  </div>
                  
                  {/* Top Features Panel */}
                  <div className="bg-slate-900/80 p-5 border-t border-slate-700/50">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Risk Factor Breakdown</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-400">Claim Ratio Velocity</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-slate-800 h-1.5 rounded-full">
                            <div className={`h-full rounded-full ${result.prediction === 'Fraud' ? 'bg-red-400 w-[80%]' : 'bg-emerald-400 w-[20%]'}`} />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-400">Provider Match Index</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-slate-800 h-1.5 rounded-full">
                            <div className={`h-full rounded-full bg-brand-400 w-[60%]`} />
                          </div>
                        </div>
                      </div>
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
              className="glass-card p-6 bg-gradient-to-br from-slate-900 to-brand-900/20"
            >
              <h3 className="font-outfit font-bold text-white flex items-center gap-2 mb-3">
                <ShieldCheck className="text-brand-400" size={20} />
                About PhishSentinel Engine
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                This system utilizes an XGBoost (Extreme Gradient Boosting) model trained on over 10,000 healthcare claims. 
                It evaluates features such as unapproved billing ratios, hospital stay durations, and categorical risk flags to identify potential patterns of "Phantom Billing" or Upcoding.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-slate-600 text-xs tracking-widest uppercase">
            Developed with Antigravity AI Engine v4.0 • Secured Healthcare Protocol
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
