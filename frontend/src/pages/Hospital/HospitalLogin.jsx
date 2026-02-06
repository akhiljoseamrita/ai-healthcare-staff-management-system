import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HospitalLogin = () => {
  const navigate = useNavigate();
  
  // State for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // State for UI feedback
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate Network Request
    setTimeout(() => {
      // DUMMY CREDENTIALS CHECK
      if (email === 'admin@hospital.com' && password === 'password123') {
        // Successful Login
        navigate('/hospital/dashboard');
      } else {
        // Failed Login
        setError('Invalid email or password. Try admin@hospital.com / password123');
        setIsLoading(false);
      }
    }, 1500); // 1.5 second delay to show loading spinner
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-inter">
      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-gray-200 dark:border-b-gray-800 bg-white dark:bg-gray-900 px-6 md:px-10 py-3 w-full">
        {/* Left Side: Logo */}
        <div className="flex items-center gap-1">
          <div className="text-[#135bec] flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl">medical_services</span>
          </div>
          <h2 className="text-[#135bec] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Healthcare</h2>
        </div>

        {/* Right Side: Home Link */}
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center gap-2 text-sm font-bold text-gray-600 dark:text-gray-400 hover:text-[#135bec] dark:hover:text-[#135bec] transition-colors cursor-pointer p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <span className="material-symbols-outlined text-[20px]">home</span>
          <span>Home</span>
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-[440px] flex flex-col gap-6">
          
          {/* Login Card */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-8">
            
            {/* Headline */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center size-12 rounded-full bg-[#135bec]/10 mb-4">
                <span className="material-symbols-outlined text-[#135bec] text-3xl">local_hospital</span>
              </div>
              <h2 className="text-gray-900 dark:text-white tracking-tight text-2xl font-bold leading-tight">Hospital Portal Login</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">Please enter your credentials to access the system</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 animate-pulse">
                <div className="flex flex-col items-start justify-between gap-3 rounded-lg border border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800 p-4">
                  <div className="flex gap-3 ">
                    <span className="material-symbols-outlined text-red-600 dark:text-red-400">error</span>
                    <div className="flex flex-col gap-1">
                      <p className="text-red-800 dark:text-red-300 text-sm font-bold leading-tight">Authentication failed</p>
                      <p className="text-red-700 dark:text-red-400 text-sm font-normal leading-normal">{error}</p>
                    </div>
                  </div>
                  <button onClick={() => setError('')} className="text-xs font-bold leading-normal tracking-[0.015em] flex items-center gap-1 text-red-800 dark:text-red-300 ml-9 uppercase cursor-pointer">
                    Dismiss
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                </div>
              </div>
            )}

            {/* Login Form */}
            <form className="flex flex-col gap-4" onSubmit={handleLogin}>
              
              {/* Email Field */}
              <div className="flex flex-col gap-2">
                <label className="text-gray-900 dark:text-white text-sm font-medium leading-normal">Email Address</label>
                <input 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input flex w-full rounded-lg text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 bg-transparent focus:border-[#135bec] focus:ring-1 focus:ring-[#135bec] h-12 placeholder:text-gray-400 p-4 text-sm font-normal outline-none transition-all" 
                  placeholder="admin@hospital.com" 
                  type="email" 
                />
              </div>

              {/* Password Field */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="text-gray-900 dark:text-white text-sm font-medium leading-normal">Password</label>
                  <a className="text-xs font-semibold text-[#135bec] hover:underline" href="/forgot-password">Forgot Password?</a>
                </div>
                <div className="relative">
                  <input 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input flex w-full rounded-lg text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 bg-transparent focus:border-[#135bec] focus:ring-1 focus:ring-[#135bec] h-12 placeholder:text-gray-400 p-4 pr-12 text-sm font-normal outline-none transition-all" 
                    placeholder="password123" 
                    type={showPassword ? "text" : "password"} 
                  />
                  <button 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer" 
                    type="button"
                  >
                    <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button 
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#135bec] text-white h-12 text-base font-bold hover:bg-[#135bec]/90 disabled:bg-[#135bec]/70 transition-colors shadow-md mt-2 cursor-pointer" 
                type="submit"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor"></path>
                    </svg>
                    <span>Logging in...</span>
                  </>
                ) : (
                  <span>Login to Dashboard</span>
                )}
              </button>
            </form>

            {/* Footer Links */}
            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 text-center">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                New to the system?
                <a className="text-[#135bec] font-bold hover:underline ml-1" href="/hospital/register">Register Hospital</a>
              </p>
            </div>
          </div>

          {/* Footer Small Print */}
          <div className="flex justify-center items-center px-2">
            <div className="flex gap-4">
              <a className="text-[11px] text-gray-400 dark:text-gray-500 hover:text-[#135bec] transition-colors" href="#">Privacy Policy</a>
              <a className="text-[11px] text-gray-400 dark:text-gray-500 hover:text-[#135bec] transition-colors" href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </main>

      {/* Visual Polish: Abstract Shapes in Background */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute -top-20 -right-20 size-[400px] rounded-full bg-[#135bec]/10 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 size-[400px] rounded-full bg-[#135bec]/5 blur-3xl"></div>
      </div>
    </div>
  );
};

export default HospitalLogin;