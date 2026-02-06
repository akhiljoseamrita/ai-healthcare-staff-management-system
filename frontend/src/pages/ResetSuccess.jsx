import React from 'react';
import { Link } from 'react-router-dom';

const ResetSuccess = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display">
      <div className="layout-container flex h-full grow flex-col">
        {/* Navigation Header */}
        <div className="px-4 lg:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-100 dark:border-gray-800 px-4 py-3">
              <div className="flex items-center gap-4 text-brand-dark dark:text-white">
                <div className="size-6 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl">medical_services</span>
                </div>
                <h2 className="text-brand-dark dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">HealthStaff Portal</h2>
              </div>
              <div className="flex flex-1 justify-end gap-8">
                <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-gray-200 dark:border-gray-700" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAVTvFjSCYV1BO31iv_HLNNMcgE67Auz0Q3ROqjJGLcbryjXSymzD4SulRRMggV_60klunSDwHrAf8vJvF9rR7SaHy0-wKHodF5hzGOu11Wy9ibHFNX0xzyqtD4MHi4rNCH9kMToDo2rwxoR3MT4oj32U9-2lAQNLX-ZNuFjDLx4TAHyHB_3dnKm2jjMX5zfHT9If9LsS4tEC8uG8V3hN7ZJbiU5MB8fgCH2WQboOoUG4qAZWJinnlrb_q8hrHsBnEQfE80bmNvRUc")' }}>
                </div>
              </div>
            </header>
            {/* Main Content Area */}
            <main className="flex flex-col items-center justify-center py-12 md:py-24">
              <div className="w-full max-w-[500px] p-4">
                <div className="flex flex-col items-center justify-center rounded-xl shadow-lg bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-8 md:p-12">
                  {/* Success Icon Container */}
                  <div className="mb-8 flex items-center justify-center size-24 rounded-full bg-primary/10">
                    <span className="material-symbols-outlined text-6xl text-primary font-bold">check_circle</span>
                  </div>
                  <div className="flex w-full flex-col items-center justify-center gap-4 text-center">
                    <h1 className="text-brand-dark dark:text-white text-2xl md:text-3xl font-bold leading-tight tracking-[-0.015em]">
                      Password reset successful
                    </h1>
                    <p className="text-brand-purple-muted dark:text-purple-300 text-base md:text-lg font-normal leading-normal max-w-[320px]">
                      You can now log in with your new password. Your account security is our top priority.
                    </p>
                    <div className="w-full pt-8">
                      <Link
                        to="/hospital/login"
                        className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-base font-bold leading-normal hover:opacity-90 transition-opacity"
                      >
                        <span className="truncate">Return to Login</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* Footer Link */}
              <div className="mt-6">
                <p className="text-brand-purple-muted dark:text-purple-400 text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center underline cursor-pointer hover:text-primary transition-colors">
                  Need help? Contact support
                </p>
              </div>
            </main>
            {/* Bottom Branding Decoration */}
            <div className="flex justify-center mt-auto py-10 opacity-30">
              <div className="h-1 w-24 rounded-full bg-primary/20 dark:bg-primary/40"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetSuccess;
