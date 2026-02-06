import React, { useState } from 'react';
import Staff from './StaffSidebar';
import StaffHeader from './StaffHeader';

const StaffDashboard = () => {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="bg-background-light dark:bg-background-dark text-[#111318] dark:text-white min-h-screen font-public-sans">
      <div className="flex h-screen overflow-hidden">

        <Staff activePage="find-shifts" />

        <main className="flex-1 flex flex-col overflow-y-auto">
          {/* Top Header */}
          <StaffHeader />
          <div className="p-8 pb-32">

            {/* Discovery Grid */}
            <section>
              <div className="flex items-center justify-between mb-6 px-1">
                <h2 className="text-lg font-bold">Recommended Discoveries</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* Card 1 */}
                <div className="group bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-gray-100 dark:border-slate-800 hover:shadow-xl hover:border-primary-blue/30 transition-all">
                  <div className="h-32 bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="material-symbols-outlined text-gray-200 dark:text-slate-700 text-7xl select-none">domain</span>
                    </div>
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/90 dark:bg-slate-900/90 px-2 py-0.5 rounded text-[10px] font-bold">
                      <span className="material-symbols-outlined text-yellow-400 text-xs fill">star</span>
                      <span>4.8</span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col gap-4">
                    <div>
                      <h4 className="font-bold text-base leading-tight group-hover:text-primary-blue transition-colors">Surgical Nurse - Afternoon</h4>
                      <p className="text-gray-500 text-xs mt-1">Presbyterian Hospital • Oncology</p>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <span className="material-symbols-outlined text-sm">event</span>
                        <span>Thu, Oct 17 • 14:00 - 22:00</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <span className="material-symbols-outlined text-sm">payments</span>
                        <span className="font-bold text-primary-blue text-sm">$92.00/hr</span>
                      </div>
                    </div>
                    <button className="w-full py-2 bg-gray-50 dark:bg-slate-800 text-primary-blue font-bold text-sm rounded-lg hover:bg-primary-blue hover:text-white transition-all">Apply Now</button>
                  </div>
                </div>
                {/* Card 2 (Already Applied State) */}
                <div className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-gray-100 dark:border-slate-800 shadow-sm opacity-90">
                  <div className="h-32 bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="material-symbols-outlined text-gray-200 dark:text-slate-700 text-7xl select-none">home_health</span>
                    </div>
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/90 dark:bg-slate-900/90 px-2 py-0.5 rounded text-[10px] font-bold">
                      <span className="material-symbols-outlined text-yellow-400 text-xs fill">star</span>
                      <span>4.5</span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col gap-4">
                    <div>
                      <h4 className="font-bold text-base leading-tight">Home Care Visit - PT</h4>
                      <p className="text-gray-500 text-xs mt-1">City Health Alliance • Rehabilitation</p>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <span className="material-symbols-outlined text-sm">event</span>
                        <span>Fri, Oct 18 • 09:00 - 17:00</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <span className="material-symbols-outlined text-sm">payments</span>
                        <span className="font-bold text-primary-blue text-sm">$75.00/hr</span>
                      </div>
                    </div>
                    <button className="w-full py-2 bg-gray-100 dark:bg-slate-800 text-gray-400 font-bold text-sm rounded-lg cursor-not-allowed flex items-center justify-center gap-2" disabled>
                      <span className="material-symbols-outlined text-sm">check_circle</span>
                      Applied
                    </button>
                  </div>
                </div>
                {/* Card 3 */}
                <div className="group bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-gray-100 dark:border-slate-800 hover:shadow-xl transition-all">
                  <div className="h-32 bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="material-symbols-outlined text-gray-200 dark:text-slate-700 text-7xl select-none">emergency</span>
                    </div>
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/90 dark:bg-slate-900/90 px-2 py-0.5 rounded text-[10px] font-bold">
                      <span className="material-symbols-outlined text-yellow-400 text-xs fill">star</span>
                      <span>4.9</span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col gap-4">
                    <div>
                      <h4 className="font-bold text-base leading-tight group-hover:text-primary-blue transition-colors">Triage Specialist - ER</h4>
                      <p className="text-gray-500 text-xs mt-1">Valley Health System • Emergency</p>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <span className="material-symbols-outlined text-sm">event</span>
                        <span>Sat, Oct 19 • 20:00 - 06:00</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <span className="material-symbols-outlined text-sm">payments</span>
                        <span className="font-bold text-primary-blue text-sm">$120.00/hr</span>
                      </div>
                    </div>
                    <button className="w-full py-2 bg-gray-50 dark:bg-slate-800 text-primary-blue font-bold text-sm rounded-lg hover:bg-primary-blue hover:text-white transition-all">Apply Now</button>
                  </div>
                </div>
                {/* Card 4 */}
                <div className="group bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-gray-100 dark:border-slate-800 hover:shadow-xl transition-all">
                  <div className="h-32 bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="material-symbols-outlined text-gray-200 dark:text-slate-700 text-7xl select-none">medication_liquid</span>
                    </div>
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/90 dark:bg-slate-900/90 px-2 py-0.5 rounded text-[10px] font-bold">
                      <span className="material-symbols-outlined text-yellow-400 text-xs fill">star</span>
                      <span>4.2</span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col gap-4">
                    <div>
                      <h4 className="font-bold text-base leading-tight group-hover:text-primary-blue transition-colors">Pharmacy Support - Floater</h4>
                      <p className="text-gray-500 text-xs mt-1">Walgreens Community Clinic</p>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <span className="material-symbols-outlined text-sm">event</span>
                        <span>Mon, Oct 21 • 08:00 - 16:00</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <span className="material-symbols-outlined text-sm">payments</span>
                        <span className="font-bold text-primary-blue text-sm">$68.00/hr</span>
                      </div>
                    </div>
                    <button className="w-full py-2 bg-gray-50 dark:bg-slate-800 text-primary-blue font-bold text-sm rounded-lg hover:bg-primary-blue hover:text-white transition-all">Apply Now</button>
                  </div>
                </div>
                  {/* Card 1 */}
                <div className="group bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-gray-100 dark:border-slate-800 hover:shadow-xl hover:border-primary-blue/30 transition-all">
                  <div className="h-32 bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="material-symbols-outlined text-gray-200 dark:text-slate-700 text-7xl select-none">domain</span>
                    </div>
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/90 dark:bg-slate-900/90 px-2 py-0.5 rounded text-[10px] font-bold">
                      <span className="material-symbols-outlined text-yellow-400 text-xs fill">star</span>
                      <span>4.8</span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col gap-4">
                    <div>
                      <h4 className="font-bold text-base leading-tight group-hover:text-primary-blue transition-colors">Surgical Nurse - Afternoon</h4>
                      <p className="text-gray-500 text-xs mt-1">Presbyterian Hospital • Oncology</p>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <span className="material-symbols-outlined text-sm">event</span>
                        <span>Thu, Oct 17 • 14:00 - 22:00</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <span className="material-symbols-outlined text-sm">payments</span>
                        <span className="font-bold text-primary-blue text-sm">$92.00/hr</span>
                      </div>
                    </div>
                    <button className="w-full py-2 bg-gray-50 dark:bg-slate-800 text-primary-blue font-bold text-sm rounded-lg hover:bg-primary-blue hover:text-white transition-all">Apply Now</button>
                  </div>
                </div>
                {/* Card 2 (Already Applied State) */}
                <div className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-gray-100 dark:border-slate-800 shadow-sm opacity-90">
                  <div className="h-32 bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="material-symbols-outlined text-gray-200 dark:text-slate-700 text-7xl select-none">home_health</span>
                    </div>
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/90 dark:bg-slate-900/90 px-2 py-0.5 rounded text-[10px] font-bold">
                      <span className="material-symbols-outlined text-yellow-400 text-xs fill">star</span>
                      <span>4.5</span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col gap-4">
                    <div>
                      <h4 className="font-bold text-base leading-tight">Home Care Visit - PT</h4>
                      <p className="text-gray-500 text-xs mt-1">City Health Alliance • Rehabilitation</p>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <span className="material-symbols-outlined text-sm">event</span>
                        <span>Fri, Oct 18 • 09:00 - 17:00</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <span className="material-symbols-outlined text-sm">payments</span>
                        <span className="font-bold text-primary-blue text-sm">$75.00/hr</span>
                      </div>
                    </div>
                    <button className="w-full py-2 bg-gray-100 dark:bg-slate-800 text-gray-400 font-bold text-sm rounded-lg cursor-not-allowed flex items-center justify-center gap-2" disabled>
                      <span className="material-symbols-outlined text-sm">check_circle</span>
                      Applied
                    </button>
                  </div>
                </div>
                {/* Card 3 */}
                <div className="group bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-gray-100 dark:border-slate-800 hover:shadow-xl transition-all">
                  <div className="h-32 bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="material-symbols-outlined text-gray-200 dark:text-slate-700 text-7xl select-none">emergency</span>
                    </div>
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/90 dark:bg-slate-900/90 px-2 py-0.5 rounded text-[10px] font-bold">
                      <span className="material-symbols-outlined text-yellow-400 text-xs fill">star</span>
                      <span>4.9</span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col gap-4">
                    <div>
                      <h4 className="font-bold text-base leading-tight group-hover:text-primary-blue transition-colors">Triage Specialist - ER</h4>
                      <p className="text-gray-500 text-xs mt-1">Valley Health System • Emergency</p>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <span className="material-symbols-outlined text-sm">event</span>
                        <span>Sat, Oct 19 • 20:00 - 06:00</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <span className="material-symbols-outlined text-sm">payments</span>
                        <span className="font-bold text-primary-blue text-sm">$120.00/hr</span>
                      </div>
                    </div>
                    <button className="w-full py-2 bg-gray-50 dark:bg-slate-800 text-primary-blue font-bold text-sm rounded-lg hover:bg-primary-blue hover:text-white transition-all">Apply Now</button>
                  </div>
                </div>
                {/* Card 4 */}
                <div className="group bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-gray-100 dark:border-slate-800 hover:shadow-xl transition-all">
                  <div className="h-32 bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="material-symbols-outlined text-gray-200 dark:text-slate-700 text-7xl select-none">medication_liquid</span>
                    </div>
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/90 dark:bg-slate-900/90 px-2 py-0.5 rounded text-[10px] font-bold">
                      <span className="material-symbols-outlined text-yellow-400 text-xs fill">star</span>
                      <span>4.2</span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col gap-4">
                    <div>
                      <h4 className="font-bold text-base leading-tight group-hover:text-primary-blue transition-colors">Pharmacy Support - Floater</h4>
                      <p className="text-gray-500 text-xs mt-1">Walgreens Community Clinic</p>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <span className="material-symbols-outlined text-sm">event</span>
                        <span>Mon, Oct 21 • 08:00 - 16:00</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <span className="material-symbols-outlined text-sm">payments</span>
                        <span className="font-bold text-primary-blue text-sm">$68.00/hr</span>
                      </div>
                    </div>
                    <button className="w-full py-2 bg-gray-50 dark:bg-slate-800 text-primary-blue font-bold text-sm rounded-lg hover:bg-primary-blue hover:text-white transition-all">Apply Now</button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StaffDashboard;
