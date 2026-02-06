import React from 'react';
import { useNavigate } from 'react-router-dom';

const ComingSoon = () => {
  const navigate = useNavigate();

  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-[#141118] dark:text-white transition-colors duration-300 min-h-screen flex flex-col">
      {/* Top Navigation */}
      <header className="flex items-center justify-between border-b border-solid border-[#f2f0f4] dark:border-[#2d2438] px-6 md:px-10 py-4 bg-white dark:bg-[#1f162a]">
        <div className="flex items-center gap-3">
          <div className="text-primary">
            <svg className="size-8" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_6_330)">
                <path clipRule="evenodd" d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z" fill="currentColor" fillRule="evenodd"></path>
              </g>
              <defs>
                <clipPath id="clip0_6_330"><rect fill="white" height="48" width="48"></rect></clipPath>
              </defs>
            </svg>
          </div>
          <h2 className="text-[#141118] dark:text-white text-lg font-bold leading-tight tracking-tight">StaffSync Pro</h2>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 text-[#141118] dark:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 ring-2 ring-primary/20" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAmxdylFPKvpWqHy9LMmB0ESK6-53yAgL0M4Qm_SPpbo0m_wJETcapk5YNvk4k2QIYPZWwhvEuuyfZol8F0tGQHnqB8KLtD7E923Zo3yxxxePDaVM6KFDxVoZXVl1X7hqaqVIWxT778zwU7g4rWX4H6lQVfB0iKhlhR-nEOI6Q2FUQy58OpP2wcX0cF1PLFa7QkJmlGQj0B92F3zhbv9JeTigzhMctLfmdodSDwJBcv26ZuiDpcClTFolfNATthDnnDa8vIIv8HHFo')"}}></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-20">
        <div className="max-w-[640px] w-full text-center">
          {/* Illustration Container */}
          <div className="relative mb-12 flex justify-center">
            <div className="relative w-64 h-64 flex items-center justify-center">
              {/* Abstract Background Decoration */}
              <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>
              {/* Illustration Mockup: Construction Cone + Stethoscope */}
              <div className="relative z-10 flex items-center justify-center">
                <div className="bg-white dark:bg-[#251b33] p-10 rounded-3xl shadow-xl border border-[#f2f0f4] dark:border-[#352a45]">
                  <div className="relative w-32 h-32 flex items-center justify-center">
                    {/* Construction Cone Shape */}
                    <svg className="w-24 h-24 text-primary fill-current" viewBox="0 0 100 100">
                      <path d="M50 5 L85 85 L15 85 Z"></path>
                      <rect height="10" rx="2" width="80" x="10" y="85"></rect>
                      <rect fill="white" height="8" opacity="0.3" width="50" x="25" y="45"></rect>
                    </svg>
                    {/* Stethoscope Wrapped Around */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary text-[100px] opacity-90" style={{fontVariationSettings: "'wght' 200"}}>
                        stethoscope
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating Accent Icons */}
              <div className="absolute -top-4 -right-4 bg-primary text-white p-3 rounded-xl shadow-lg">
                <span className="material-symbols-outlined">engineering</span>
              </div>
              <div className="absolute -bottom-2 -left-6 bg-white dark:bg-[#1f162a] text-primary p-3 rounded-xl shadow-md border border-[#f2f0f4] dark:border-[#352a45]">
                <span className="material-symbols-outlined">medical_services</span>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-4 mb-10">
            <h1 className="text-[#141118] dark:text-white text-4xl md:text-5xl font-bold tracking-tight">
              Coming Soon
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl font-normal leading-relaxed max-w-md mx-auto">
              We’re working on something great. This feature will be available to help streamline your healthcare workflow soon.
            </p>
          </div>

          {/* Action Button */}
          <div className="flex justify-center">
            <button
              onClick={() => navigate(-1)}
              className="group flex items-center gap-2 min-w-[200px] cursor-pointer justify-center overflow-hidden rounded-xl h-14 px-8 bg-primary hover:bg-primary/90 text-white text-lg font-bold transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40"
            >
              <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">arrow_back</span>
              <span className="truncate">Back to Dashboard</span>
            </button>
          </div>

          {/* Progress Indicator (Minimalist) */}
          <div className="mt-16 max-w-xs mx-auto">
            <div className="flex justify-between text-xs font-semibold text-primary mb-2 uppercase tracking-widest">
              <span>Development Progress</span>
              <span>75%</span>
            </div>
            <div className="w-full h-2 bg-primary/10 dark:bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{width: '75%'}}></div>
            </div>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="py-8 px-6 text-center border-t border-[#f2f0f4] dark:border-[#2d2438]">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          © 2024 StaffSync Pro Healthcare Management Systems. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default ComingSoon;
