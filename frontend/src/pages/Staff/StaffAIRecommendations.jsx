import React from 'react';

const StaffAIRecommendations = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-[#131118] dark:text-white min-h-screen">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar Navigation (Main) */}
        <aside className="w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1c162d] flex flex-col">
          <div className="p-6">
            <div className="flex gap-3 mb-8">
              <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDetw53AbEARkj9YE2-fPFH2A3N3P08l9sQYaO_ByEF5O5kP3PLjIUMac_aRdaQnRKPJH-KxnRZRzsxJwHVS4vFe7d60Zp69Xb88jZiKqsztS6H7KwZ055q7Y71bkXxKxexbhofNjt6ZeCpSOa7PmVZMc4Pa-H93fs_e7fmdDlklxrQniLERaLRKlEQVgmsSWZfAxX6oPpUOHh-Ph8Wtk4Kh3mh35UuH8aD9gnfpxVIimp8PUq933xyc26EsCWDYrkGa7cAXHtFgBg')" }}></div>
              <div className="flex flex-col">
                <h1 className="text-[#131118] dark:text-white text-base font-bold leading-none">StaffPortal</h1>
                <p className="text-[#6f6189] dark:text-gray-400 text-xs font-normal">Medical Dashboard</p>
              </div>
            </div>
            <nav className="flex flex-col gap-2">
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                <span className="material-symbols-outlined text-gray-500">grid_view</span>
                <p className="text-sm font-medium">Dashboard</p>
              </div>
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                <span className="material-symbols-outlined text-gray-500">calendar_month</span>
                <p className="text-sm font-medium">Schedule</p>
              </div>
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary-blue/10 text-primary-blue">
                <span className="material-symbols-outlined material-symbols-fill text-primary-blue">auto_awesome</span>
                <p className="text-sm font-medium">AI Recommendations</p>
              </div>
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                <span className="material-symbols-outlined text-gray-500">mail</span>
                <p className="text-sm font-medium">Messages</p>
              </div>
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                <span className="material-symbols-outlined text-gray-500">person</span>
                <p className="text-sm font-medium">Profile</p>
              </div>
            </nav>
          </div>
          <div className="mt-auto p-6 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="flex flex-col">
                <p className="text-xs font-bold">Dr. Sarah Smith</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">RN Specialist</p>
              </div>
            </div>
          </div>
        </aside>
        {/* Main Content Area (Dashboard Mock) */}
        <main className="flex-1 overflow-y-auto p-8 bg-gray-50 dark:bg-background-dark">
          <header className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold">Good morning, Sarah</h2>
              <p className="text-gray-500">You have 3 high-confidence shift recommendations today.</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium bg-white dark:bg-[#1c162d]">View Full Schedule</button>
            </div>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-[#1c162d] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 h-64">
              <h3 className="font-bold mb-4">Upcoming Next</h3>
              <div className="flex items-center p-4 border border-primary-blue/20 bg-primary-blue/5 rounded-lg">
                <div className="flex-1">
                  <p className="text-xs text-primary-blue font-bold uppercase tracking-widest mb-1">Today • 08:00 PM</p>
                  <p className="font-bold">Saint Jude Medical Center</p>
                  <p className="text-sm text-gray-500">Pediatric Unit • 12hr Shift</p>
                </div>
                <span className="material-symbols-outlined text-primary-blue">chevron_right</span>
              </div>
            </div>
            <div className="bg-white dark:bg-[#1c162d] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 h-64">
              <h3 className="font-bold mb-4">Performance Insights</h3>
              <div className="flex justify-center items-center h-32">
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary-blue">98%</p>
                  <p className="text-xs text-gray-500 uppercase">Reliability Score</p>
                </div>
              </div>
            </div>
          </div>
        </main>
        {/* AI Recommendation Sidebar */}
        <aside className="w-96 border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1c162d] flex flex-col h-full">
          <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-blue material-symbols-fill">auto_awesome</span>
              <h2 className="text-lg font-bold">Top Shifts for You</h2>
            </div>
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <span className="material-symbols-outlined text-sm">settings</span>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
            {/* Recommendation Card 1 */}
            <div className="flex flex-col bg-white dark:bg-[#241d3b] rounded-xl border border-gray-100 dark:border-gray-700 shadow-md hover:shadow-lg transition-shadow overflow-hidden group">
              <div className="relative">
                <div className="w-full h-32 bg-center bg-no-repeat bg-cover" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDvFDKQbgrmmGinmy4a4o86QW74hMYVaFQp6sUOUnbvvWtL0syOB8kKMo6MU0SjHtOldh0xtDMq61e3pVCk2fI5a4ZOVxY5f8oEJiX6pVGOagiOAECdGhspT51C1Qe2K1eYjeZZ0JNQ7Kug3vCOZAItlc4LxzBI4VHYSfKPtgzBSPHSnj9DLwyA4sLM69nhn1i_ziLjLC5pyAjoN9g4CKib0HSRltmNSz3m7brnWWMbjFNaemSeJJdHrG-MlUu5v50z2n2nApqTQuI')" }}></div>
                <div className="absolute top-3 right-3">
                  <div className="relative inline-block">
                    <button className="size-8 bg-white/90 dark:bg-black/50 backdrop-blur rounded-full flex items-center justify-center text-gray-600 dark:text-white shadow-sm hover:bg-white transition-colors">
                      <span className="material-symbols-outlined text-base">more_vert</span>
                    </button>
                    {/* Tooltip mockup for feedback */}
                    <div className="hidden group-hover:block absolute top-10 right-0 w-48 bg-white dark:bg-gray-800 shadow-xl rounded-lg border border-gray-200 dark:border-gray-700 z-10 py-2">
                      <button className="w-full text-left px-4 py-2 text-xs hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2">
                        <span className="material-symbols-outlined text-xs">location_off</span> Location too far
                      </button>
                      <button className="w-full text-left px-4 py-2 text-xs hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 text-red-500">
                        <span className="material-symbols-outlined text-xs">block</span> Not interested
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-sm leading-tight">City General Hospital</h3>
                    <p className="text-xs text-gray-500">Emergency Room • Night Shift</p>
                  </div>
                </div>
                {/* Progress Bar Component */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-primary-blue uppercase tracking-wider">Match Confidence</span>
                    <span className="text-[10px] font-bold">95%</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-blue rounded-full" style={{ width: "95%" }}></div>
                  </div>
                </div>
                {/* Reasoning Chip */}
                <div className="flex items-center gap-2 py-1.5 px-2 bg-[#f2f0f4] dark:bg-white/5 rounded-lg">
                  <span className="material-symbols-outlined text-primary-blue text-sm">calendar_today</span>
                  <span className="text-xs font-medium text-[#131118] dark:text-gray-300">Fits your Monday schedule</span>
                </div>
                <div className="flex gap-2 mt-2">
                  <button className="flex-1 bg-primary-blue text-white text-xs font-bold py-2.5 rounded-lg hover:brightness-110 transition-all">Apply Now</button>
                  <button className="px-3 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <span className="material-symbols-outlined text-base py-1">bookmark</span>
                  </button>
                </div>
              </div>
            </div>
            {/* Recommendation Card 2 */}
            <div className="flex flex-col bg-white dark:bg-[#241d3b] rounded-xl border border-gray-100 dark:border-gray-700 shadow-md hover:shadow-lg transition-shadow overflow-hidden">
              <div className="w-full h-32 bg-center bg-no-repeat bg-cover" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBFGhS3QVcCZ2HQjjiGE0eiSCurAjSYrdQou5jSpy5hNfv9xYoxVyyxr_Uc4A6S37PJlAmAOYGKQuhQg8Euuow9K3yQZDCP7o2DDxLjq8drv_mTNHIaGho5W39puzVPF1HVlMLjJLTVqhvWsuwUYyt62rzxzJ9Olg3uKMRqM3jzv1qSZbo8e-j1v4zXvXAS4PvFo7L4HmJlt4uuqmKjMhPQnIACIMias4_TZOKEJjsl3Lgk52v58T7KQtqaiJD3AfFRqdC6pJDcI7c')" }}></div>
              <div className="p-4 flex flex-col gap-3">
                <div>
                  <h3 className="font-bold text-sm leading-tight">Westside Medical Clinic</h3>
                  <p className="text-xs text-gray-500">Outpatient Care • Morning</p>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-primary-blue uppercase tracking-wider">Match Confidence</span>
                    <span className="text-[10px] font-bold">89%</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-blue/70 rounded-full" style={{ width: "89%" }}></div>
                  </div>
                </div>
                <div className="flex items-center gap-2 py-1.5 px-2 bg-[#f2f0f4] dark:bg-white/5 rounded-lg">
                  <span className="material-symbols-outlined text-primary-blue text-sm">near_me</span>
                  <span className="text-xs font-medium text-[#131118] dark:text-gray-300">Preferred location (under 5 miles)</span>
                </div>
                <div className="flex gap-2 mt-2">
                  <button className="flex-1 bg-primary-blue text-white text-xs font-bold py-2.5 rounded-lg hover:brightness-110 transition-all">Apply Now</button>
                  <button className="px-3 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-lg">
                    <span className="material-symbols-outlined text-base py-1">bookmark</span>
                  </button>
                </div>
              </div>
            </div>
            {/* Recommendation Card 3 */}
            <div className="flex flex-col bg-white dark:bg-[#241d3b] rounded-xl border border-gray-100 dark:border-gray-700 shadow-md hover:shadow-lg transition-shadow overflow-hidden">
              <div className="w-full h-32 bg-center bg-no-repeat bg-cover" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDFOYlfAM7ldlLuBg7mVJt75Ga-2HbOpyb8tJgQs0UBg7iCENBSZrFDffWYpin5X18AfIoVOSdS9CG_RTq_y-1kGhwaEx5xqRJkmaS6ofNbBblozxacvoZ-DPWt7RrZfeK93MdQDQncf5G2nF2aQWgQe1w3KWmcKAJn-gbGofYY_lz_rDv8rR1lh5ctS-TCgII1aSPpWoixLGQMRlSrEeKqbOqFoiXQlaiaawkDdQaY66kVv_S128L1u_c2nRuLNwkDga2CrWKnfYU')" }}></div>
              <div className="p-4 flex flex-col gap-3">
                <div>
                  <h3 className="font-bold text-sm leading-tight">HealthFirst Specialist Center</h3>
                  <p className="text-xs text-gray-500">Surgical Wing • Weekend Shift</p>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-primary-blue uppercase tracking-wider">Match Confidence</span>
                    <span className="text-[10px] font-bold">82%</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-blue/50 rounded-full" style={{ width: "82%" }}></div>
                  </div>
                </div>
                <div className="flex items-center gap-2 py-1.5 px-2 bg-[#f2f0f4] dark:bg-white/5 rounded-lg">
                  <span className="material-symbols-outlined text-primary-blue text-sm">favorite</span>
                  <span className="text-xs font-medium text-[#131118] dark:text-gray-300">High culture-fit rating</span>
                </div>
                <div className="flex gap-2 mt-2">
                  <button className="flex-1 bg-primary-blue text-white text-xs font-bold py-2.5 rounded-lg hover:brightness-110 transition-all">Apply Now</button>
                  <button className="px-3 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-lg">
                    <span className="material-symbols-outlined text-base py-1">bookmark</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 bg-gray-50 dark:bg-[#131118] border-t border-gray-200 dark:border-gray-800">
            <button className="w-full text-center py-2 text-sm text-[#6f6189] hover:text-primary-blue font-medium transition-colors">
              Already contacted a hospital?
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default StaffAIRecommendations;
