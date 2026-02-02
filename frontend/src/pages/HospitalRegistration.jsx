import React from 'react';

const HospitalRegistration = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark text-[#0d121b] dark:text-white min-h-screen flex flex-col font-inter">
      {/* Top Navigation Bar */}
      <header className="w-full bg-background-light dark:bg-background-dark border-b border-[#cfd7e7] dark:border-gray-800 sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-primary">
              <svg className="size-8" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 className="text-xl font-bold tracking-tight">HealSync Pro</h2>
          </div>
          <div className="flex items-center gap-8">
            <nav className="hidden md:flex items-center gap-6">
              <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Benefits</a>
              <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Support</a>
              <a className="text-sm font-medium hover:text-primary transition-colors" href="#">About Us</a>
            </nav>
            <div className="flex gap-3">
              <button className="bg-[#e7ebf3] dark:bg-gray-800 text-[#0d121b] dark:text-white px-4 py-2 rounded-lg text-sm font-bold transition-all hover:bg-gray-200">Login</button>
              <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold transition-all hover:bg-blue-700">Register</button>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 flex flex-col lg:flex-row max-w-[1440px] mx-auto w-full">
        {/* Left Branding Pane */}
        <div className="lg:w-[40%] bg-primary/5 dark:bg-primary/10 p-12 flex flex-col justify-center relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs font-bold rounded-full uppercase tracking-wider">Join our Network</span>
            <h1 className="text-4xl xl:text-5xl font-extrabold text-[#0d121b] dark:text-white leading-[1.1]">
              Empowering Healthcare Management
            </h1>
            <p className="text-lg text-[#4c669a] dark:text-gray-400 max-w-md">
              Connect your facility with the most advanced staff management system. Streamline workflows, improve patient care, and manage your medical teams with ease.
            </p>
            <div className="flex flex-col gap-4 mt-8">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm">verified</span>
                <p className="text-sm font-medium">HIPAA Compliant & Secure</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm">group</span>
                <p className="text-sm font-medium">Over 500+ Hospitals Registered</p>
              </div>
            </div>
          </div>
          {/* Decorative Background Pattern */}
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        </div>
        {/* Right Form Pane */}
        <div className="lg:w-[60%] flex flex-col items-center justify-start py-12 px-6 lg:px-20 bg-background-light dark:bg-background-dark">
          <div className="w-full max-w-[640px]">
            {/* Header & Progress */}
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-2">Register Your Hospital</h2>
              <p className="text-[#4c669a] dark:text-gray-400">Enter your facility details to join our healthcare network.</p>
            </div>
            <div className="mb-10">
              <div className="flex justify-between items-center mb-3 px-1">
                <span className="text-sm font-semibold text-primary">Facility Information</span>
                <span className="text-sm text-gray-500">Step 1 of 3</span>
              </div>
              <div className="h-2 w-full bg-[#cfd7e7] dark:bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: "33%" }}></div>
              </div>
              <p className="text-xs text-[#4c669a] mt-2 font-medium">Next: Security Credentials</p>
            </div>
            {/* Registration Form */}
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Hospital Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold">Hospital Name</label>
                  <div className="relative">
                    <input className="w-full h-12 px-4 rounded-lg border border-[#cfd7e7] dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-gray-400" placeholder="e.g. Central Memorial Hospital" type="text" />
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-green-500 text-sm">check_circle</span>
                  </div>
                </div>
                {/* Registration Number */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold">Registration Number</label>
                  <input className="w-full h-12 px-4 rounded-lg border border-[#cfd7e7] dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-gray-400" placeholder="e.g. REG-12345678" type="text" />
                </div>
                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold">Hospital Email</label>
                  <input className="w-full h-12 px-4 rounded-lg border border-[#cfd7e7] dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-gray-400" placeholder="admin@hospital.com" type="email" />
                </div>
                {/* Phone Number */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold">Phone Number</label>
                  <input className="w-full h-12 px-4 rounded-lg border border-[#cfd7e7] dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-gray-400" placeholder="+1 (555) 000-0000" type="tel" />
                </div>
              </div>
              {/* Location */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold">Location</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">location_on</span>
                  <input className="w-full h-12 pl-10 pr-4 rounded-lg border border-[#cfd7e7] dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-gray-400" placeholder="Street Address, City, Country" type="text" />
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
                  <input className="w-full h-12 px-4 rounded-lg border border-[#cfd7e7] dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="••••••••" type="password" />
                </div>
                {/* Confirm Password */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold">Confirm Password</label>
                  <input className="w-full h-12 px-4 rounded-lg border border-[#cfd7e7] dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="••••••••" type="password" />
                </div>
              </div>
              <div className="flex items-start gap-3 py-2">
                <input className="mt-1 size-4 rounded border-[#cfd7e7] text-primary focus:ring-primary" id="terms" type="checkbox" />
                <label className="text-sm text-gray-600 dark:text-gray-400 leading-tight" htmlFor="terms">
                  By registering, you agree to our <a className="text-primary hover:underline" href="#">Terms of Service</a> and <a className="text-primary hover:underline" href="#">Privacy Policy</a>.
                </label>
              </div>
              <button className="w-full h-14 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-blue-700 hover:-translate-y-0.5 transition-all active:translate-y-0" type="submit">
                Continue to Step 2
              </button>
              <div className="text-center pt-4">
                <p className="text-sm text-gray-500">Already have an account? <a className="text-primary font-semibold hover:underline" href="#">Log in here</a></p>
              </div>
            </form>
          </div>
        </div>
      </main>
      {/* Footer for visual balance */}
      <footer className="w-full py-8 px-6 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400 font-medium">
          <p>© 2024 HealSync Pro. All rights reserved.</p>
          <div className="flex gap-6">
            <a className="hover:text-primary transition-colors" href="#">Security</a>
            <a className="hover:text-primary transition-colors" href="#">Privacy</a>
            <a className="hover:text-primary transition-colors" href="#">Status</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HospitalRegistration;
