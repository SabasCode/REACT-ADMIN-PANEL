import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginAdmin } from '../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginAdmin({ email, password });
      localStorage.setItem('adminToken', data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-slate-900">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800">MERN Admin Panel</h2>
          <p className="text-sm text-slate-500 mt-1">Sign in to your admin account</p>
        </div>
        {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-4">
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
            Sign In
          </button>
        </form>
        <p className="text-center text-sm text-slate-600">
          Don't have an account? <Link to="/register" className="text-emerald-600 font-semibold hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}