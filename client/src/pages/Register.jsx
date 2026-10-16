import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerAdmin } from '../services/api';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerAdmin({ name, email, password, role: 'Admin' });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-slate-900">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800">MERN Admin Panel</h2>
          <p className="text-sm text-slate-500 mt-1">Create a new admin account</p>
        </div>
        {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center">{error}</div>}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Full Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Admin User" 
              required 
              className="w-full border border-slate-300 px-3 py-2 rounded-lg text-sm outline-none focus:border-emerald-600" 
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="admin@example.com" 
              required 
              className="w-full border border-slate-300 px-3 py-2 rounded-lg text-sm outline-none focus:border-emerald-600" 
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••" 
              required 
              className="w-full border border-slate-300 px-3 py-2 rounded-lg text-sm outline-none focus:border-emerald-600" 
            />
          </div>
          <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded-lg transition text-sm">
            Register Account
          </button>
        </form>
        <p className="text-center text-sm text-slate-600">
          Already have an account? <Link to="/login" className="text-emerald-600 font-semibold hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
}