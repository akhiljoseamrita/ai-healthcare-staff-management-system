import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StaffAuth = () => {
   const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');

  // State for availability
  const [selectedDays, setSelectedDays] = useState([0, 1, 2, 3, 4]);

  // Handle Login Submit -> Redirect
  const handleLogin = (e) => {
    e.preventDefault();
    // Redirects the browser to the dashboard route
    window.location.href = '/staff/dashboard';
  };

  const toggleDay = (index) => {
    if (selectedDays.includes(index)) {
      setSelectedDays(selectedDays.filter((i) => i !== index));
    } else {
      setSelectedDays([...selectedDays, index]);
    }
  };

  const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    // Added a subtle gradient background for a more premium look
    <div className="min-h-screen font-sans bg-slate-50 dark:bg-[#0f1115] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-slate-50 to-slate-100 dark:from-slate-900 dark:via-[#0f1115] dark:to-[#0f1115]">

      <div className="flex h-full grow flex-col">
        {/* Top Navigation Bar - Made Sticky with Backdrop Blur */}
        <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-white/80 dark:bg-[#15171e]/80 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-800">
          <div className="flex items-center gap-1">
            <div className="text-[#135bec] flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">medical_services</span>
            </div>
            <h2 className="text-[#135bec] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Healthcare</h2>
          </div>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm font-bold text-gray-600 dark:text-gray-400 hover:text-[#135bec] dark:hover:text-[#135bec] transition-colors cursor-pointer p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <span className="material-symbols-outlined text-[20px]">home</span>
            <span>Home</span>
          </button>
        </header>

        <main className="flex flex-1 flex-col items-center justify-center p-4 sm:p-6 lg:p-10">
          {/* Central Auth Card */}
          <div className="w-full max-w-[480px] bg-white dark:bg-[#15171e] rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-300">

            {/* Header Section */}
            <div className="px-8 pt-8 pb-6 text-center">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                {activeTab === 'login' ? 'Welcome Back' : 'Join Our Team'}
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                {activeTab === 'login'
                  ? 'Enter your credentials to access your dashboard.'
                  : 'Create your professional profile in minutes.'}
              </p>
            </div>

            {/* Tab Switcher - Pill Style for cleaner look */}
            <div className="px-8 mb-6">
              <div className="flex p-1 bg-slate-100 dark:bg-slate-800/50 rounded-xl">
                <button
                  onClick={() => setActiveTab('login')}
                  className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${activeTab === 'login'
                      ? 'bg-white dark:bg-slate-700 text-[#135bec] dark:text-white shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                    }`}
                >
                  Log In
                </button>
                <button
                  onClick={() => setActiveTab('signup')}
                  className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${activeTab === 'signup'
                      ? 'bg-white dark:bg-slate-700 text-[#135bec] dark:text-white shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                    }`}
                >
                  Sign Up
                </button>
              </div>
            </div>

            <div className="px-8 pb-10">
              {/* LOGIN FORM */}
              {activeTab === 'login' && (
                <form className="space-y-5" onSubmit={handleLogin}>
                  <div className="space-y-1.5">
                    <label className="text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wide">
                      Email Address
                    </label>
                    <div className="relative group">
                      <span className="absolute left-4 top-3.5 text-slate-400 material-symbols-outlined text-[20px]">mail</span>
                      <input
                        required
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-11 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-900 focus:border-[#135bec] focus:ring-4 focus:ring-[#135bec]/10 transition-all outline-none"
                        placeholder="name@hospital.com"
                        type="email"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wide">
                      Password
                    </label>
                    <div className="relative group">
                      <span className="absolute left-4 top-3.5 text-slate-400 material-symbols-outlined text-[20px]">lock</span>
                      <input
                        required
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-11 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-900 focus:border-[#135bec] focus:ring-4 focus:ring-[#135bec]/10 transition-all outline-none"
                        placeholder="••••••••"
                        type="password"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-1">
                    <a href="/forgot-password" className="text-xs font-semibold text-[#135bec] hover:text-[#135bec]/80 transition-colors">
                      Forgot Password?
                    </a>
                  </div>

                  <button
                    className="w-full bg-[#135bec] hover:bg-[#104bc2] text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-[#135bec]/25 active:scale-[0.98] mt-2 flex items-center justify-center gap-2"
                    type="submit"
                  >
                    <span>Sign In</span>
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </button>
                </form>
              )}

              {/* SIGN UP FORM */}
              {activeTab === 'signup' && (
                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5 col-span-2">
                      <label className="text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wide">
                        Full Name
                      </label>
                      <input
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-900 focus:border-[#135bec] focus:ring-4 focus:ring-[#135bec]/10 transition-all outline-none"
                        placeholder="Dr. Jane Smith"
                        type="text"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wide">
                      Email Address
                    </label>
                    <input
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-900 focus:border-[#135bec] focus:ring-4 focus:ring-[#135bec]/10 transition-all outline-none"
                      placeholder="name@hospital.com"
                      type="email"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wide">
                      Create Password
                    </label>
                    <input
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-900 focus:border-[#135bec] focus:ring-4 focus:ring-[#135bec]/10 transition-all outline-none"
                      placeholder="Min. 8 characters"
                      type="password"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wide">
                      Profession
                    </label>
                    <div className="relative">
                      <select className="w-full appearance-none bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:border-[#135bec] focus:ring-4 focus:ring-[#135bec]/10 transition-all outline-none">
                        <option disabled defaultValue="" value="">Select specialization</option>
                        <option>Physician</option>
                        <option>Registered Nurse</option>
                        <option>Physician Assistant</option>
                        <option>Nurse Practitioner</option>
                        <option>Surgeon</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wide">
                      Weekly Availability
                    </label>
                    <div className="flex justify-between items-center gap-1">
                      {daysOfWeek.map((day, index) => {
                        const isSelected = selectedDays.includes(index);
                        return (
                          <button
                            key={index}
                            onClick={() => toggleDay(index)}
                            type="button"
                            className={`size-10 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 ${isSelected
                                ? "bg-[#135bec] text-white shadow-md shadow-[#135bec]/30 scale-105"
                                : "bg-slate-100 dark:bg-slate-800 text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                              }`}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                    <p className="text-[10px] text-slate-400 text-right pr-1 pt-1">Tap to toggle availability</p>
                  </div>

                  <button
                    className="w-full bg-[#135bec] hover:bg-[#104bc2] text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-[#135bec]/25 active:scale-[0.98] mt-2"
                    type="submit"
                  >
                    Create Account
                  </button>
                </form>
              )}

              {/* Footer Terms */}
              <div className="mt-8 text-center">
                <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
                  By continuing, you agree to our{' '}
                  <a className="text-[#135bec] font-semibold hover:underline" href="#">Terms</a>
                  {' '}and{' '}
                  <a className="text-[#135bec] font-semibold hover:underline" href="#">Privacy Policy</a>.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StaffAuth;