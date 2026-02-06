import React from 'react';

const StaffAuth = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen font-display">
      <div className="layout-container flex h-full grow flex-col">
        {/* Top Navigation Bar */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#dbdfe6] dark:border-gray-800 bg-white dark:bg-background-dark px-10 py-3">
          <div className="flex items-center gap-4 text-[#111318] dark:text-white">
            <div className="flex items-center justify-center size-8 bg-primary-alt rounded-lg text-white">
              <span className="material-symbols-outlined text-xl">medical_services</span>
            </div>
            <h2 className="text-[#111318] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Staff Portal</h2>
          </div>
          <button className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary-alt text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary-alt/90 transition-colors">
            <span className="truncate">Help Center</span>
          </button>
        </header>
        <main className="flex flex-1 flex-col items-center justify-center p-6 sm:p-10">
          {/* Central Auth Card */}
          <div className="w-full max-w-[520px] bg-white dark:bg-background-dark border border-[#dbdfe6] dark:border-gray-800 rounded-xl shadow-sm overflow-hidden">
            {/* Tab Switcher */}
            <div className="flex border-b border-[#dbdfe6] dark:border-gray-800">
              <a className="flex-1 flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[#616f89] hover:text-primary-alt pb-[13px] pt-5 transition-all" href="#">
                <p className="text-sm font-bold leading-normal tracking-[0.015em]">Login</p>
              </a>
              <a className="flex-1 flex flex-col items-center justify-center border-b-[3px] border-b-primary-alt text-primary-alt pb-[13px] pt-5 transition-all" href="#">
                <p className="text-sm font-bold leading-normal tracking-[0.015em]">Sign Up</p>
              </a>
            </div>
            <div className="p-8">
              {/* Headline & Body */}
              <div className="text-center mb-8">
                <h2 className="text-[#111318] dark:text-white tracking-tight text-2xl font-bold leading-tight mb-2">Join the Professional Network</h2>
                <p className="text-[#616f89] dark:text-gray-400 text-sm font-normal">Complete your professional profile to start accepting assignments.</p>
              </div>
              {/* Sign Up Form */}
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                {/* Full Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-[#111318] dark:text-white text-sm font-semibold leading-normal">Full Name</label>
                  <input className="form-input flex w-full rounded-lg text-[#111318] dark:text-white focus:outline-0 focus:ring-1 focus:ring-primary-alt border border-[#dbdfe6] dark:border-gray-700 bg-white dark:bg-gray-900 h-12 px-4 text-sm font-normal placeholder:text-[#616f89]" placeholder="e.g. Dr. Jane Smith" type="text" />
                </div>
                {/* Profession Dropdown */}
                <div className="flex flex-col gap-2">
                  <label className="text-[#111318] dark:text-white text-sm font-semibold leading-normal">Profession</label>
                  <div className="relative">
                    <select className="form-select flex w-full appearance-none rounded-lg text-[#111318] dark:text-white focus:outline-0 focus:ring-1 focus:ring-primary-alt border border-[#dbdfe6] dark:border-gray-700 bg-white dark:bg-gray-900 h-12 px-4 text-sm font-normal">
                      <option disabled defaultValue="" value="">Select your specialization</option>
                      <option>Physician</option>
                      <option>Registered Nurse</option>
                      <option>Physician Assistant</option>
                      <option>Nurse Practitioner</option>
                      <option>Surgeon</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#616f89]">
                      <span className="material-symbols-outlined">expand_more</span>
                    </div>
                  </div>
                </div>
                {/* License ID Upload */}
                <div className="flex flex-col gap-2">
                  <label className="text-[#111318] dark:text-white text-sm font-semibold leading-normal flex items-center justify-between">
                    License ID Verification
                    <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-green-600 font-bold">
                      <span className="material-symbols-outlined text-xs">lock</span> Encrypted
                    </span>
                  </label>
                  <div className="relative group cursor-pointer border-2 border-dashed border-[#dbdfe6] dark:border-gray-700 hover:border-primary-alt dark:hover:border-primary-alt rounded-xl bg-background-light dark:bg-gray-900/50 p-6 flex flex-col items-center justify-center transition-colors">
                    <input className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" type="file" />
                    <div className="size-10 bg-primary-alt/10 rounded-full flex items-center justify-center mb-3">
                      <span className="material-symbols-outlined text-primary-alt">cloud_upload</span>
                    </div>
                    <p className="text-sm font-semibold text-[#111318] dark:text-white mb-1">Upload License ID</p>
                    <p className="text-xs text-[#616f89]">PDF, JPG or PNG (Max 5MB)</p>
                  </div>
                </div>
                {/* Weekly Availability */}
                <div className="flex flex-col gap-3">
                  <label className="text-[#111318] dark:text-white text-sm font-semibold leading-normal">Weekly Availability</label>
                  <div className="flex justify-between items-center gap-2">
                    <button className="size-10 rounded-full flex items-center justify-center bg-primary-alt text-white text-xs font-bold transition-all shadow-sm" type="button">M</button>
                    <button className="size-10 rounded-full flex items-center justify-center bg-primary-alt text-white text-xs font-bold transition-all shadow-sm" type="button">T</button>
                    <button className="size-10 rounded-full flex items-center justify-center bg-primary-alt text-white text-xs font-bold transition-all shadow-sm" type="button">W</button>
                    <button className="size-10 rounded-full flex items-center justify-center bg-primary-alt text-white text-xs font-bold transition-all shadow-sm" type="button">T</button>
                    <button className="size-10 rounded-full flex items-center justify-center bg-primary-alt text-white text-xs font-bold transition-all shadow-sm" type="button">F</button>
                    <button className="size-10 rounded-full flex items-center justify-center bg-background-light dark:bg-gray-800 text-[#616f89] text-xs font-bold hover:bg-primary-alt/20 transition-all" type="button">S</button>
                    <button className="size-10 rounded-full flex items-center justify-center bg-background-light dark:bg-gray-800 text-[#616f89] text-xs font-bold hover:bg-primary-alt/20 transition-all" type="button">S</button>
                  </div>
                </div>
                {/* CTA */}
                <button className="w-full flex items-center justify-center rounded-lg h-14 bg-primary-alt text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary-alt/90 shadow-lg shadow-primary-alt/20 transition-all" type="submit">
                  Create Account
                </button>
              </form>
              {/* Footer */}
              <div className="mt-8 text-center border-t border-[#dbdfe6] dark:border-gray-800 pt-6">
                <p className="text-xs text-[#616f89] leading-relaxed">
                  By joining, you agree to our
                  <a className="text-primary-alt font-semibold underline underline-offset-2" href="#">Terms of Service</a> and
                  <a className="text-primary-alt font-semibold underline underline-offset-2" href="#">Privacy Policy</a>.
                </p>
              </div>
            </div>
          </div>
          {/* Bottom Branding/Logo */}
          <div className="mt-8 flex items-center gap-2 opacity-50 grayscale">
            <div className="size-4 bg-[#111318] dark:bg-white rounded-sm"></div>
            <span className="text-xs font-bold text-[#111318] dark:text-white uppercase tracking-widest">MedLink Enterprise</span>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StaffAuth;
