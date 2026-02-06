import React from 'react';
import { Link } from 'react-router-dom';

const ResetSuccess = () => {
  return (
    <div className="bg-slate-50 dark:bg-gray-950 min-h-screen flex flex-col font-display">
      <div className="layout-container flex h-full grow flex-col">
        {/* Navigation Header Space (Optional, keeps layout consistent) */}
        <div className="px-4 lg:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            
            {/* Main Content Area */}
            <main className="flex flex-col items-center justify-center py-12 md:py-24">
              <div className="w-full max-w-[500px] p-4">
                <div className="flex flex-col items-center justify-center rounded-xl shadow-[0_4px_20px_rgba(19,91,236,0.08)] bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 p-8 md:p-12">
                  
                  {/* Success Icon Container - Updated to Blue Theme */}
                  <div className="mb-8 flex items-center justify-center size-24 rounded-full bg-[#135bec]/10">
                    <span className="material-symbols-outlined text-6xl text-[#135bec] font-bold">check_circle</span>
                  </div>
                  
                  <div className="flex w-full flex-col items-center justify-center gap-4 text-center">
                    <h1 className="text-slate-900 dark:text-white text-2xl md:text-3xl font-bold leading-tight tracking-[-0.015em]">
                      Password reset successful
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg font-normal leading-normal max-w-[320px]">
                      You can now log in with your new password. Your account security is our top priority.
                    </p>
                    
                    <div className="w-full pt-8">
                      <Link
                        to="/hospital/login"
                        className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-[#135bec] hover:bg-[#1151d3] text-white text-base font-bold leading-normal transition-colors shadow-sm"
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