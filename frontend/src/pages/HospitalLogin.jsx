import React from 'react';

const HospitalLogin = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-inter">
      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-gray-200 dark:border-b-gray-800 bg-white dark:bg-gray-900 px-6 md:px-10 py-3 w-full">
        <div className="flex items-center gap-4 text-gray-900 dark:text-white">
          <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
            <span className="material-symbols-outlined">health_and_safety</span>
          </div>
          <h2 className="text-gray-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Healthcare Management System</h2>
        </div>
        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-blue-700 transition-colors">
          <span className="truncate">Support</span>
        </button>
      </header>
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-[440px] flex flex-col gap-6">
          {/* Login Card */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-8">
            {/* Headline */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center size-12 rounded-full bg-primary/10 mb-4">
                <span className="material-symbols-outlined text-primary text-3xl">local_hospital</span>
              </div>
              <h2 className="text-gray-900 dark:text-white tracking-tight text-2xl font-bold leading-tight">Staff Portal Login</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">Please enter your credentials to access the system</p>
            </div>
            {/* Error Message (ActionPanel style) */}
            <div className="mb-6">
              <div className="flex flex-col items-start justify-between gap-3 rounded-lg border border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800 p-4">
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-red-600 dark:text-red-400">error</span>
                  <div className="flex flex-col gap-1">
                    <p className="text-red-800 dark:text-red-300 text-sm font-bold leading-tight">Authentication failed</p>
                    <p className="text-red-700 dark:text-red-400 text-sm font-normal leading-normal">Incorrect password. Please try again.</p>
                  </div>
                </div>
                <a className="text-xs font-bold leading-normal tracking-[0.015em] flex items-center gap-1 text-red-800 dark:text-red-300 ml-9 uppercase" href="#">
                  Dismiss
                  <span className="material-symbols-outlined text-sm">close</span>
                </a>
              </div>
            </div>
            {/* Login Form */}
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              {/* Email Field */}
              <div className="flex flex-col gap-2">
                <label className="text-gray-900 dark:text-white text-sm font-medium leading-normal">Email Address</label>
                <input className="form-input flex w-full rounded-lg text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 bg-transparent focus:border-primary focus:ring-1 focus:ring-primary h-12 placeholder:text-gray-400 p-4 text-sm font-normal" placeholder="e.g. name@hospital.com" type="email" />
              </div>
              {/* Password Field */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="text-gray-900 dark:text-white text-sm font-medium leading-normal">Password</label>
                  <a className="text-xs font-semibold text-primary hover:underline" href="#">Forgot Password?</a>
                </div>
                <div className="relative">
                  <input className="form-input flex w-full rounded-lg text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 bg-transparent focus:border-primary focus:ring-1 focus:ring-primary h-12 placeholder:text-gray-400 p-4 pr-12 text-sm font-normal" placeholder="••••••••" type="password" />
                  <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" type="button">
                    <span className="material-symbols-outlined">visibility</span>
                  </button>
                </div>
              </div>
              {/* Remember Me */}
              <div className="flex items-center gap-2 py-2">
                <input className="rounded border-gray-300 dark:border-gray-700 text-primary focus:ring-primary size-4" id="remember" type="checkbox" />
                <label className="text-sm text-gray-600 dark:text-gray-400 select-none cursor-pointer font-medium" htmlFor="remember">Remember me on this device</label>
              </div>
              {/* Submit Button */}
              <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary text-white h-12 text-base font-bold hover:bg-blue-700 transition-colors shadow-md mt-2" type="submit">
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor"></path>
                </svg>
                <span>Login to Dashboard</span>
              </button>
            </form>
            {/* Footer Links */}
            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 text-center">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                New to the system?
                <a className="text-primary font-bold hover:underline ml-1" href="#">Register Hospital</a>
              </p>
            </div>
          </div>
          {/* Footer Small Print */}
          <div className="flex justify-between items-center px-2">
            <p className="text-[11px] text-gray-400 dark:text-gray-500 uppercase tracking-widest font-semibold">Hospital Login Variant 1</p>
            <div className="flex gap-4">
              <a className="text-[11px] text-gray-400 dark:text-gray-500 hover:text-primary transition-colors" href="#">Privacy Policy</a>
              <a className="text-[11px] text-gray-400 dark:text-gray-500 hover:text-primary transition-colors" href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </main>
      {/* Visual Polish: Abstract Shapes in Background */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute -top-20 -right-20 size-[400px] rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 size-[400px] rounded-full bg-primary/5 blur-3xl"></div>
      </div>
    </div>
  );
};

export default HospitalLogin;
