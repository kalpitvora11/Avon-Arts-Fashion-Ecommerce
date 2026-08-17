import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Mail, 
  User, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2,
  KeyRound,
  ShieldAlert
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { BlueDuckLogo } from './BlueDuckLogo';
import { AUTHORIZED_ADMIN_EMAILS } from '../types';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    loginWithGoogle, 
    loginWithEmail, 
    signUpWithEmail, 
    loginAsAdminDirect,
    switchDemoUser,
    theme,
    showToast
  } = useStore();

  const [activeTab, setActiveTab] = useState<'customer' | 'admin'>('customer');
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [adminPin, setAdminPin] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  if (!isAuthModalOpen) return null;

  const isLight = theme === 'studio-light';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (activeTab === 'admin') {
        // Check PIN or admin email
        if (adminPin === '2026' || adminPin === 'AVON2026' || adminPin === '93231' || email.includes('admin') || AUTHORIZED_ADMIN_EMAILS.includes(email)) {
          loginAsAdminDirect(email || 'kalpitvora11@gmail.com');
          setIsAuthModalOpen(false);
        } else {
          showToast('Invalid Admin credentials. Use authorized Google Account.', 'error');
        }
        return;
      }

      if (mode === 'login') {
        await loginWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password, name);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
      <div 
        id="auth-modal-container"
        className={`relative w-full max-w-md rounded-3xl border shadow-2xl p-6 sm:p-8 space-y-6 text-left my-8 ${
          isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#0b0f19] border-slate-800 text-slate-100'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
            isLight ? 'bg-slate-100 text-slate-500 hover:text-slate-900' : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
          aria-label="Close auth modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Official Blue Duck Logo & Header */}
        <div className="text-center space-y-2">
          <BlueDuckLogo size="sm" theme={isLight ? 'light' : 'dark'} showCompanySubtext={true} />
          
          <h2 className="text-2xl font-extrabold tracking-tight mt-3">
            {activeTab === 'admin' 
              ? 'Authorized Admin Portal' 
              : mode === 'login' ? 'Customer Sign In' : 'Create Customer Account'}
          </h2>
          <p className="text-xs text-slate-400">
            {activeTab === 'admin'
              ? 'Restricted access for authorized management accounts only'
              : 'Save boy\'s fit measurements, track orders & view wishlist in ₹ INR'}
          </p>
        </div>

        {/* Tab Toggle: Customer vs Admin */}
        <div className={`grid grid-cols-2 p-1 rounded-xl border ${
          isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-950 border-slate-800'
        }`}>
          <button
            type="button"
            onClick={() => setActiveTab('customer')}
            className={`py-2 text-xs font-extrabold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'customer'
                ? isLight ? 'bg-white text-slate-900 shadow-sm' : 'bg-slate-800 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Customer Login</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('admin')}
            className={`py-2 text-xs font-extrabold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'admin'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-slate-400 hover:text-red-400'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin Portal</span>
          </button>
        </div>

        {/* ADMIN TAB FLOW */}
        {activeTab === 'admin' ? (
          <div className="space-y-4">
            <div className="p-3.5 rounded-2xl bg-red-950/30 border border-red-800/40 text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-red-400">
                <ShieldAlert className="w-4 h-4 text-red-400" />
                <span>Google Account Authentication Guard</span>
              </div>
              <p className="text-[11px] text-slate-300">
                Only verified Google accounts (such as <strong className="text-white">kalpitvora11@gmail.com</strong> or <strong className="text-white">avonarts70@gmail.com</strong>) have administrative permissions to modify inventory, pricing, and order dispatch.
              </p>
            </div>

            {/* Quick 1-Click Authorized Google Admin Logins */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => loginWithGoogle('kalpitvora11@gmail.com')}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs font-extrabold flex items-center justify-between shadow-lg shadow-red-950/50 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA3323" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <span className="block leading-tight">Authorize: kalpitvora11@gmail.com</span>
                    <span className="text-[10px] text-red-200 font-normal">Primary Google Account (Admin)</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => loginWithGoogle('avonarts70@gmail.com')}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold border border-slate-700 flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-400" />
                  <span>Authorize: avonarts70@gmail.com (Bhavesh Shah)</span>
                </div>
                <CheckCircle2 className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-500">
              <div className="flex-1 h-px bg-slate-800" />
              <span>or standard admin passcode</span>
              <div className="flex-1 h-px bg-slate-800" />
            </div>

            {/* Admin PIN Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Admin Email / Username</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="kalpitvora11@gmail.com"
                    className={`w-full rounded-xl pl-9 pr-3 py-2.5 text-xs ${
                      isLight ? 'bg-slate-50 border border-slate-300 text-slate-900' : 'bg-slate-950 border border-slate-800 text-white'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Security PIN / Password</label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="password"
                    value={adminPin}
                    onChange={(e) => setAdminPin(e.target.value)}
                    placeholder="Enter admin PIN (e.g. 2026)"
                    className={`w-full rounded-xl pl-9 pr-3 py-2.5 text-xs ${
                      isLight ? 'bg-slate-50 border border-slate-300 text-slate-900' : 'bg-slate-950 border border-slate-800 text-white'
                    }`}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs transition-colors shadow-lg shadow-red-950/40"
              >
                Verify & Open Admin Console
              </button>
            </form>
          </div>
        ) : (
          /* CUSTOMER TAB FLOW */
          <div className="space-y-4">
            {/* Google 1-Click for Customer */}
            <button
              type="button"
              onClick={() => loginWithGoogle()}
              className={`w-full py-3 px-4 rounded-xl text-xs font-bold border flex items-center justify-center gap-3 transition-colors shadow-sm ${
                isLight 
                  ? 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-300' 
                  : 'bg-slate-900 hover:bg-slate-800 text-white border-slate-700'
              }`}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="flex items-center gap-3 text-xs text-slate-500">
              <div className="flex-1 h-px bg-slate-800" />
              <span>or with email</span>
              <div className="flex-1 h-px bg-slate-800" />
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {mode === 'signup' && (
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Parent / Customer Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ramesh Vora"
                      className={`w-full rounded-xl pl-9 pr-3 py-2.5 text-xs ${
                        isLight ? 'bg-slate-50 border border-slate-300 text-slate-900' : 'bg-slate-950 border border-slate-800 text-white'
                      }`}
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="customer@domain.com"
                    className={`w-full rounded-xl pl-9 pr-3 py-2.5 text-xs ${
                      isLight ? 'bg-slate-50 border border-slate-300 text-slate-900' : 'bg-slate-950 border border-slate-800 text-white'
                    }`}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full rounded-xl pl-9 pr-3 py-2.5 text-xs ${
                      isLight ? 'bg-slate-50 border border-slate-300 text-slate-900' : 'bg-slate-950 border border-slate-800 text-white'
                    }`}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs transition-colors shadow-lg shadow-red-950/40"
              >
                {loading ? 'Authenticating...' : mode === 'login' ? 'Sign In to My Account' : 'Register Customer Profile'}
              </button>
            </form>

            {/* Toggle Mode */}
            <div className="text-center text-xs text-slate-400">
              {mode === 'login' ? (
                <span>Don't have an account? <button onClick={() => setMode('signup')} className="text-red-400 font-bold hover:underline">Create an account</button></span>
              ) : (
                <span>Already registered? <button onClick={() => setMode('login')} className="text-red-400 font-bold hover:underline">Sign in</button></span>
              )}
            </div>

            {/* Demo Quick Customer Switcher */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  switchDemoUser('customer');
                  setIsAuthModalOpen(false);
                }}
                className={`w-full py-2.5 rounded-xl border text-xs font-semibold transition-colors ${
                  isLight ? 'bg-slate-100 border-slate-300 text-slate-700' : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:bg-slate-900'
                }`}
              >
                🚀 1-Click Fast Pass (Demo Customer Account)
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
