import React from 'react';
import { useNavigate } from 'react-router-dom';

const ComingSoon = () => {
  const navigate = useNavigate();

  return (
    <div className="font-display bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-20">
        <div className="max-w-[640px] w-full text-center">
          
          {/* Illustration Container */}
          <div className="relative mb-12 flex justify-center">
            <div className="relative w-64 h-64 flex items-center justify-center">
              {/* Abstract Background Decoration */}
              <div className="absolute inset-0 bg-[#135bec]/5 dark:bg-[#135bec]/10 rounded-full blur-3xl"></div>
              
              {/* Illustration Mockup */}
              <div className="relative z-10 flex items-center justify-center">
                <div className="bg-white dark:bg-slate-900 p-10 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800">
                  <div className="relative w-32 h-32 flex items-center justify-center">
                    {/* Construction Cone Shape */}
                    <svg className="w-24 h-24 text-[#135bec] fill-current" viewBox="0 0 100 100">
                      <path d="M50 5 L85 85 L15 85 Z"></path>
                      <rect height="10" rx="2" width="80" x="10" y="85"></rect>
                      <rect fill="white" height="8" opacity="0.3" width="50" x="25" y="45"></rect>
                    </svg>
                    {/* Stethoscope Wrapped Around */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#135bec] text-[100px] opacity-90" style={{fontVariationSettings: "'wght' 200"}}>
                        stethoscope
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Accent Icons */}
              <div className="absolute -top-4 -right-4 bg-[#135bec] text-white p-3 rounded-xl shadow-lg shadow-[#135bec]/30 rotate-12">
                <span className="material-symbols-outlined text-xl">engineering</span>
              </div>
              <div className="absolute -bottom-2 -left-6 bg-white dark:bg-slate-800 text-[#135bec] p-3 rounded-xl shadow-md border border-slate-100 dark:border-slate-700 -rotate-12">
                <span className="material-symbols-outlined text-xl">medical_services</span>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-4 mb-10">
            <h1 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-bold tracking-tight">
              Coming Soon
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg font-normal leading-relaxed max-w-md mx-auto">
              We’re working on something great. This feature will be available to help streamline your healthcare workflow soon.
            </p>
          </div>

          {/* Action Button */}
          <div className="flex justify-center">
            <button
              onClick={() => navigate(-1)}
              className="group flex items-center gap-2 min-w-[200px] cursor-pointer justify-center overflow-hidden rounded-xl h-12 px-8 bg-[#135bec] hover:bg-[#135bec]/90 text-white text-sm font-bold transition-all shadow-lg shadow-[#135bec]/20 hover:shadow-[#135bec]/40"
            >
              <span className="material-symbols-outlined text-lg transition-transform group-hover:-translate-x-1">arrow_back</span>
              <span className="truncate">Back</span>
            </button>
          </div>

          {/* Progress Indicator (Minimalist) */}
          <div className="mt-16 max-w-xs mx-auto">
            <div className="flex justify-between text-xs font-bold text-[#135bec] mb-2 uppercase tracking-widest">
              <span>Development Progress</span>
              <span>75%</span>
            </div>
            <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-[#135bec] rounded-full shadow-[0_0_10px_#135bec]" style={{width: '75%'}}></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ComingSoon;