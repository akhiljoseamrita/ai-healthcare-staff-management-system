import React from 'react';
import { Link } from 'react-router-dom';

const ResetSuccess = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display">
      <div className="layout-container flex h-full grow flex-col">
        {/* Navigation Header */}
        <div className="px-4 lg:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
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
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetSuccess;
