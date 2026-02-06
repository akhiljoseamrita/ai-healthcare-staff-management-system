import React from 'react';

const ActiveShiftSidebarV2 = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display min-h-screen flex justify-end">
      {/* Active Shift Sidebar V2 */}
      <aside className="w-[360px] h-screen bg-white dark:bg-background-dark border-l border-gray-200 dark:border-gray-800 flex flex-col shadow-xl">
        {/* Header Section */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-[#140d1b] dark:text-white text-lg font-bold tracking-tight">Active Shift Posts</h2>
            <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full">12</span>
          </div>
          <button className="text-gray-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-xl">more_horiz</span>
          </button>
        </div>

        {/* Filter/Quick Actions */}
        <div className="px-6 py-4 flex gap-2 overflow-x-auto no-scrollbar border-b border-gray-50 dark:border-gray-800/50">
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-medium shrink-0">
            All Shifts
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-lg text-xs font-medium shrink-0 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            ICU
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-lg text-xs font-medium shrink-0 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            ER
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-lg text-xs font-medium shrink-0 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            Pediatrics
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col gap-3">
          {/* Shift Card 1 */}
          <div className="shift-card relative group p-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl hover:border-primary/30 hover:shadow-md transition-all cursor-pointer">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                <h3 className="text-[#140d1b] dark:text-gray-100 text-[15px] font-bold leading-tight">Registered Nurse - ICU</h3>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-1 px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-md text-[11px] font-medium border border-gray-100 dark:border-gray-700">
                <span className="material-symbols-outlined text-[14px]">schedule</span>
                15m ago
              </div>
              <div className="flex items-center gap-1 px-2 py-1 bg-primary/5 text-primary rounded-md text-[11px] font-medium border border-primary/10">
                <span className="material-symbols-outlined text-[14px]">group</span>
                3 Applicants
              </div>
            </div>
            <div className="view-button absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 text-primary text-xs font-bold bg-white dark:bg-gray-900 pl-4 py-2">
              <span>VIEW</span>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </div>
          </div>

          {/* Shift Card 2 */}
          <div className="shift-card relative group p-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl hover:border-primary/30 hover:shadow-md transition-all cursor-pointer">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                <h3 className="text-[#140d1b] dark:text-gray-100 text-[15px] font-bold leading-tight">ER Specialist</h3>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-1 px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-md text-[11px] font-medium border border-gray-100 dark:border-gray-700">
                <span className="material-symbols-outlined text-[14px]">schedule</span>
                2h ago
              </div>
              <div className="flex items-center gap-1 px-2 py-1 bg-primary/5 text-primary rounded-md text-[11px] font-medium border border-primary/10">
                <span className="material-symbols-outlined text-[14px]">group</span>
                12 Applicants
              </div>
            </div>
            <div className="view-button absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 text-primary text-xs font-bold bg-white dark:bg-gray-900 pl-4 py-2">
              <span>VIEW</span>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </div>
          </div>

          {/* Shift Card 3 */}
          <div className="shift-card relative group p-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl hover:border-primary/30 hover:shadow-md transition-all cursor-pointer">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                <h3 className="text-[#140d1b] dark:text-gray-100 text-[15px] font-bold leading-tight">Pediatrics - Night</h3>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-1 px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-md text-[11px] font-medium border border-gray-100 dark:border-gray-700">
                <span className="material-symbols-outlined text-[14px]">schedule</span>
                4h ago
              </div>
              <div className="flex items-center gap-1 px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-md text-[11px] font-medium border border-gray-100 dark:border-gray-700">
                <span className="material-symbols-outlined text-[14px]">group</span>
                0 Applicants
              </div>
            </div>
            <div className="view-button absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 text-primary text-xs font-bold bg-white dark:bg-gray-900 pl-4 py-2">
              <span>VIEW</span>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </div>
          </div>

          {/* Shift Card 4 */}
          <div className="shift-card relative group p-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl hover:border-primary/30 hover:shadow-md transition-all cursor-pointer">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                <h3 className="text-[#140d1b] dark:text-gray-100 text-[15px] font-bold leading-tight">Surgical Technologist</h3>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-1 px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-md text-[11px] font-medium border border-gray-100 dark:border-gray-700">
                <span className="material-symbols-outlined text-[14px]">schedule</span>
                Yesterday
              </div>
              <div className="flex items-center gap-1 px-2 py-1 bg-primary/5 text-primary rounded-md text-[11px] font-medium border border-primary/10">
                <span className="material-symbols-outlined text-[14px]">group</span>
                5 Applicants
              </div>
            </div>
            <div className="view-button absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 text-primary text-xs font-bold bg-white dark:bg-gray-900 pl-4 py-2">
              <span>VIEW</span>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </div>
          </div>

          {/* Shift Card 5 */}
          <div className="shift-card relative group p-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl hover:border-primary/30 hover:shadow-md transition-all cursor-pointer">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                <h3 className="text-[#140d1b] dark:text-gray-100 text-[15px] font-bold leading-tight">Senior Resident - ER</h3>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-1 px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-md text-[11px] font-medium border border-gray-100 dark:border-gray-700">
                <span className="material-symbols-outlined text-[14px]">schedule</span>
                Yesterday
              </div>
              <div className="flex items-center gap-1 px-2 py-1 bg-primary/5 text-primary rounded-md text-[11px] font-medium border border-primary/10">
                <span className="material-symbols-outlined text-[14px]">group</span>
                2 Applicants
              </div>
            </div>
            <div className="view-button absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 text-primary text-xs font-bold bg-white dark:bg-gray-900 pl-4 py-2">
              <span>VIEW</span>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </div>
          </div>
        </div>

        {/* Footer / Global Stats */}
        <div className="p-6 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wider">Unit Capacity</span>
            <span className="text-primary text-xs font-bold">84%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden mb-6">
            <div className="bg-primary h-full w-[84%]"></div>
          </div>
          <button className="w-full py-3 bg-primary text-white rounded-lg font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-lg">add</span>
            Post New Shift
          </button>
        </div>
      </aside>

      {/* Background Content Mockup (to show positioning) */}
      <main className="flex-1 p-10 opacity-30 select-none pointer-events-none hidden lg:block">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 h-64 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700"></div>
          <div className="h-64 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700"></div>
          <div className="col-span-3 h-96 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700"></div>
        </div>
      </main>
    </div>
  );
};

export default ActiveShiftSidebarV2;
