import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API = import.meta.env.VITE_API_URL || "https://api.vaidikpooja.in";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.message || 'Registration failed');
      }
      const data = await res.json();
      localStorage.setItem('user', JSON.stringify(data.user || data));
      window.location.href = '/';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center py-20 px-4 mt-20">
      <div className="absolute inset-0 bg-[#0a0502]/40 backdrop-blur-md -z-10" />

      <div className="w-full max-w-md bg-white z-10 rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up">
        <div className="relative h-32 bg-[#FF6F00] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-20 h-20 border-4 border-white rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-32 h-32 border-4 border-white rounded-full translate-x-1/2 translate-y-1/2" />
          </div>
          <h2 className="text-3xl font-bold text-white relative z-10">Create Account</h2>
        </div>

        <div className="p-8">
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Full Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6F00]/20 focus:border-[#FF6F00] transition-all"
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="email"
                placeholder="Email Address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6F00]/20 focus:border-[#FF6F00] transition-all"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6F00]/20 focus:border-[#FF6F00] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#FF6F00] transition-colors focus:outline-none"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FF6F00] hover:bg-[#FF9933] text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-orange-100 flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <span>{loading ? 'Processing...' : 'Sign Up'}</span>
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">Already have an account? <Link to="/login" className="ml-2 text-[#FF6F00] font-bold hover:underline">Login</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}
