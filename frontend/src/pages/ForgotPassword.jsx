import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display">
      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#e9e7f3] dark:border-gray-800 px-6 md:px-10 py-4 bg-white dark:bg-gray-900">
        <div className="flex items-center gap-4 text-brand-dark dark:text-white">
          <div className="size-6 text-primary">
            <span className="material-symbols-outlined text-3xl">medical_services</span>
          </div>
          <h2 className="text-brand-dark dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Healthcare Staff Management</h2>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-[480px] flex flex-col gap-6">
          {/* Main Content Card */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden border border-[#e9e7f3] dark:border-gray-800">
            {/* Header Image/Gradient */}
            <div className="w-full bg-center bg-no-repeat aspect-[16/6] bg-cover" style={{ backgroundImage: 'linear-gradient(135deg, #7f13ec 0%, #6318FF 100%)' }}>
              <div className="w-full h-full flex items-center justify-center bg-black/10">
                <span className="material-symbols-outlined text-white text-5xl">lock_reset</span>
              </div>
            </div>
            <div className="p-8 flex flex-col gap-6">
              {/* Text Content */}
              <div className="flex flex-col gap-2">
                <h1 className="text-brand-dark dark:text-white text-2xl font-bold leading-tight tracking-[-0.015em]">Forgot Password?</h1>
                <p className="text-brand-purple-muted dark:text-purple-200 text-base font-normal leading-normal">
                  Enter your registered email address. We'll send you a link to reset your password.
                </p>
              </div>
              {/* Input Form */}
              <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                <label className="flex flex-col w-full">
                  <p className="text-brand-dark dark:text-white text-sm font-semibold leading-normal pb-2">Email Address</p>
                  <input
                    className="form-input flex w-full rounded-lg text-brand-dark dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#d3cfe7] dark:border-gray-700 bg-[#f9f8fc] dark:bg-gray-800 h-14 placeholder:text-brand-purple-muted/60 p-[15px] text-base font-normal leading-normal transition-all"
                    placeholder="e.g. staff@hospital.com"
                    type="email"
                  />
                </label>
                {/* Action Button */}
                <div className="pt-2">
                  <Link
                    to="/reset-password"
                    className="w-full flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary hover:bg-primary/90 text-white text-base font-bold leading-normal tracking-[0.015em] transition-colors"
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
              className="inline-flex items-center gap-2 text-primary dark:text-primary-purple text-sm font-semibold leading-normal hover:underline transition-all"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Return to Login
            </Link>
          </div>
        </div>
      </main>
      {/* Footer Space */}
      <footer className="py-8 text-center text-brand-purple-muted dark:text-purple-300 text-xs">
        © 2024 Healthcare Staff Management System. All rights reserved.
      </footer>
    </div>
  );
};

export default ForgotPassword;
