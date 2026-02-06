import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  return (
    <div className="bg-slate-50 dark:bg-gray-950 min-h-screen flex flex-col font-display">
      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-gray-800 px-6 md:px-10 py-4 bg-white dark:bg-gray-900">
        <div className="flex items-center gap-1">
          <div className="text-[#135bec] flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl">medical_services</span>
          </div>
          <h2 className="text-[#135bec] dark:text-blue-400 text-lg font-bold leading-tight tracking-[-0.015em]">Healthcare</h2>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-[480px] flex flex-col gap-6">
          
          {/* Main Content Card */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-[0_4px_20px_rgba(19,91,236,0.08)] overflow-hidden border border-slate-200 dark:border-gray-800">
            
            {/* Header Image/Gradient - Updated to Blue Theme */}
            <div 
              className="w-full bg-center bg-no-repeat aspect-[16/6] bg-cover" 
              style={{ backgroundImage: 'linear-gradient(135deg, #135bec 0%, #3b82f6 100%)' }}
            >
              <div className="w-full h-full flex items-center justify-center bg-black/10">
                <span className="material-symbols-outlined text-white text-5xl">lock_reset</span>
              </div>
            </div>

            <div className="p-8 flex flex-col gap-6">
              {/* Text Content */}
              <div className="flex flex-col gap-2">
                <h1 className="text-slate-900 dark:text-white text-2xl font-bold leading-tight tracking-[-0.015em]">Forgot Password?</h1>
                <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">
                  Enter your registered email address. We'll send you a link to reset your password.
                </p>
              </div>

              {/* Input Form */}
              <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                <label className="flex flex-col w-full">
                  <p className="text-slate-700 dark:text-slate-200 text-sm font-semibold leading-normal pb-2">Email Address</p>
                  <input
                    className="form-input flex w-full rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-[#135bec]/50 border border-slate-300 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 h-14 placeholder:text-slate-400 p-[15px] text-base font-normal leading-normal transition-all"
                    placeholder="e.g. staff@hospital.com"
                    type="email"
                  />
                </label>

                {/* Action Button */}
                <div className="pt-2">
                  <Link
                    to="/reset-password"
                    className="w-full flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-[#135bec] hover:bg-[#1151d3] text-white text-base font-bold leading-normal tracking-[0.015em] transition-colors"
                  >
                    <span className="truncate">Send Reset Link</span>
                  </Link>
                </div>
              </form>
            </div>
          </div>

          {/* Meta Text / Navigation */}
          <div className="text-center">
            <Link
              to="/hospital/login"
              className="inline-flex items-center gap-2 text-[#135bec] dark:text-blue-400 text-sm font-semibold leading-normal hover:underline transition-all"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Return to Login
            </Link>
          </div>
        </div>
      </main>

      {/* Footer Space */}
      <footer className="py-8 text-center text-slate-400 dark:text-slate-500 text-xs">
        © 2026 Healthcare Management System. All rights reserved.
      </footer>
    </div>
  );
};

export default ForgotPassword;