import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HospitalRegistration = () => {
  const navigate = useNavigate();
  
  // State for loading and success notification
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Dummy form handler
  const handleRegister = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate Network Request
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccessToast(true);

      // Redirect to Login Page after 2 seconds
      setTimeout(() => {
        navigate('/hospital/login');
      }, 2000);
    }, 1500);
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-[#0d121b] dark:text-white min-h-screen flex flex-col font-inter relative">
      
      {/* SUCCESS TOAST NOTIFICATION */}
      {showSuccessToast && (
        <div className="fixed top-24 right-5 z-[100] animate-bounce-in">
          <div className="bg-white dark:bg-gray-800 border-l-4 border-green-500 shadow-xl rounded-r-lg p-6 flex items-start gap-4 min-w-[320px]">
            <div className="text-green-500 bg-green-50 dark:bg-green-900/30 p-2 rounded-full">
              <span className="material-symbols-outlined text-2xl">check_circle</span>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white text-lg">Success!</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">Hospital registered successfully.</p>
              <p className="text-xs text-gray-400 mt-2">Redirecting to login...</p>
            </div>
          </div>
        </div>
      )}

      {/* Top Navigation Bar */}
      <header className="w-full bg-white dark:bg-gray-900 border-b border-[#cfd7e7] dark:border-gray-800 sticky top-0 z-50">
        <div className="w-full px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="text-[#135bec] flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">medical_services</span>
            </div>
            <h2 className="text-[#135bec] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Healthcare</h2>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row w-full">
        
        {/* Left Branding Pane */}
        <div className="lg:w-[40%] bg-[#135bec]/5 dark:bg-[#135bec]/10 p-12 flex flex-col justify-center relative overflow-hidden min-h-[400px] lg:min-h-auto">
          <div className="relative z-10 space-y-6">
            <span className="inline-block px-3 py-1 bg-[#135bec]/10 text-[#135bec] text-xs font-bold rounded-full uppercase tracking-wider">
              Join our Network
            </span>
            <h1 className="text-4xl xl:text-5xl font-extrabold text-[#0d121b] dark:text-white leading-[1.1]">
              Empowering Healthcare Management
            </h1>
            <p className="text-lg text-[#4c669a] dark:text-gray-400 max-w-md">
              Connect your facility with the most advanced staff management system. Streamline workflows, improve patient care, and manage your medical teams with ease.
            </p>
            <div className="flex flex-col gap-4 mt-8">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#135bec] bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm">verified</span>
                <p className="text-sm font-medium">HIPAA Compliant & Secure</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#135bec] bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm">group</span>
                <p className="text-sm font-medium">Over 500+ Hospitals Registered</p>
              </div>
            </div>
          </div>
          
          {/* Decorative Background Pattern */}
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#135bec]/10 rounded-full blur-3xl"></div>
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#135bec]/5 rounded-full blur-3xl"></div>
        </div>

        {/* Right Form Pane */}
        <div className="lg:w-[60%] flex flex-col items-center justify-start py-12 px-6 lg:px-20 bg-white dark:bg-gray-900">
          <div className="w-full max-w-[640px]">
            {/* Header */}
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Register Your Hospital</h2>
            </div>
            
            {/* Registration Form */}
            <form className="space-y-6" onSubmit={handleRegister}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Hospital Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold">Hospital Name</label>
                  <div className="relative">
                    <input 
                      required
                      className="w-full h-12 px-4 rounded-lg border border-[#cfd7e7] dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-[#135bec] focus:border-transparent outline-none transition-all placeholder:text-gray-400" 
                      placeholder="e.g. Central Memorial Hospital" 
                      type="text" 
                    />
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-green-500 text-sm">check_circle</span>
                  </div>
                </div>

                {/* Registration Number */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold">Registration Number</label>
                  <input 
                    required
                    className="w-full h-12 px-4 rounded-lg border border-[#cfd7e7] dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-[#135bec] focus:border-transparent outline-none transition-all placeholder:text-gray-400" 
                    placeholder="e.g. REG-12345678" 
                    type="text" 
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold">Hospital Email</label>
                  <input 
                    required
                    className="w-full h-12 px-4 rounded-lg border border-[#cfd7e7] dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-[#135bec] focus:border-transparent outline-none transition-all placeholder:text-gray-400" 
                    placeholder="admin@hospital.com" 
                    type="email" 
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold">Phone Number</label>
                  <input 
                    required
                    className="w-full h-12 px-4 rounded-lg border border-[#cfd7e7] dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-[#135bec] focus:border-transparent outline-none transition-all placeholder:text-gray-400" 
                    placeholder="+1 (555) 000-0000" 
                    type="tel" 
                  />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold">Location</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">location_on</span>
                  <input 
                    required
                    className="w-full h-12 pl-10 pr-4 rounded-lg border border-[#cfd7e7] dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-[#135bec] focus:border-transparent outline-none transition-all placeholder:text-gray-400" 
                    placeholder="Street Address, City, Country" 
                    type="text" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-200 dark:border-gray-800">
                {/* Password */}
                <div className="space-y-2 relative">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-semibold">Password</label>
                    <div className="group relative cursor-help">
                      <span className="material-symbols-outlined text-gray-400 text-[18px]">info</span>
                      <div className="absolute bottom-full right-0 mb-2 w-56 p-3 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl">
                        <p className="font-bold mb-1">Requirements:</p>
                        <ul className="space-y-1 list-disc list-inside opacity-90">
                          <li>Min 8 characters</li>
                          <li>At least one number</li>
                          <li>One special character</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <input 
                    required
                    className="w-full h-12 px-4 rounded-lg border border-[#cfd7e7] dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-[#135bec] focus:border-transparent outline-none transition-all" 
                    placeholder="••••••••" 
                    type="password" 
                  />
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold">Confirm Password</label>
                  <input 
                    required
                    className="w-full h-12 px-4 rounded-lg border border-[#cfd7e7] dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-[#135bec] focus:border-transparent outline-none transition-all" 
                    placeholder="••••••••" 
                    type="password" 
                  />
                </div>
              </div>
             
              {/* Register Button with Loading State */}
              <button 
                disabled={isLoading}
                className="w-full h-14 bg-[#135bec] text-white font-bold rounded-xl shadow-lg shadow-[#135bec]/20 hover:bg-[#135bec]/90 hover:-translate-y-0.5 transition-all active:translate-y-0 cursor-pointer flex items-center justify-center gap-2" 
                type="submit"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor"></path>
                    </svg>
                    <span>Registering...</span>
                  </>
                ) : (
                  "Register"
                )}
              </button>
              
              <div className="text-center pt-4">
                <p className="text-sm text-gray-500">
                  Already have an account? 
                  <Link className="text-[#135bec] font-semibold hover:underline ml-1" to="/hospital/login">
                    Log in here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HospitalRegistration;