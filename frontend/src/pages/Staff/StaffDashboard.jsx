import React, { useState } from 'react';
import StaffProfileModal from './StaffProfileModal';

const StaffDashboard = () => {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="bg-background-light dark:bg-background-dark text-[#111318] dark:text-white min-h-screen font-public-sans">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="w-64 flex-shrink-0 bg-white dark:bg-slate-900 border-r border-[#f0f2f4] dark:border-slate-800 flex flex-col justify-between p-4">
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-3 px-2">
              <div className="size-8 text-primary-blue">
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z" fill="currentColor" fillRule="evenodd"></path>
                </svg>
              </div>
              <span className="text-lg font-bold tracking-tight">StaffPortal</span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-blue-600/10 text-primary-blue">
                <span className="material-symbols-outlined">dashboard</span>
                <p className="text-sm font-semibold">Dashboard</p>
              </div>
              <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-600 dark:text-gray-400 cursor-pointer">
                <span className="material-symbols-outlined">calendar_today</span>
                <p className="text-sm font-medium">Schedule</p>
              </div>
              <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-600 dark:text-gray-400 cursor-pointer">
                <span className="material-symbols-outlined">assignment_turned_in</span>
                <p className="text-sm font-medium">My Applications</p>
              </div>
              <div
                onClick={() => setShowProfile(true)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-600 dark:text-gray-400 cursor-pointer"
              >
                <span className="material-symbols-outlined">person</span>
                <p className="text-sm font-medium">Profile</p>
              </div>
              <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-600 dark:text-gray-400 cursor-pointer">
                <span className="material-symbols-outlined">settings</span>
                <p className="text-sm font-medium">Settings</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-slate-800/50 rounded-lg">
              <div className="size-10 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDRIxvjEEJj5ZI3fCuPkrcgSz7OYh_ErKWL_exVkB5goGj8a_Gb0Z2ffrVSzDybVG0ttwB_i0_q1OUsur-Twt3RW2gM2pWWtTxwQXUMRo3hmUDcgHxLMNIx7MVzSTmUD9GxIHo-CeYKu7dJU0O-qv51sC7XpK1DBbyI2MTlGF4XjLlY4Dt6HCD5vyUYUsvsK1iiEsjpCKweD86nczrj3nYhHo_KQnxhJH59Z8QEI1igItOBF19nTT49dD-5VZuACAvusbdKBwi7dyM')" }}></div>
              <div className="flex flex-col">
                <p className="text-xs font-bold">Dr. Alex Smith</p>
                <p className="text-[10px] text-gray-500">Staff Physician</p>
              </div>
            </div>
            <button className="w-full py-2 bg-gray-100 dark:bg-slate-800 text-sm font-bold rounded-lg hover:bg-gray-200 transition-colors">Logout</button>
          </div>
        </aside>
        {/* Main Content Area */}
        <main className="flex-1 flex flex-col overflow-y-auto relative bg-background-light dark:bg-background-dark">
          {/* Top Header */}
          <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-[#f0f2f4] dark:border-slate-800 px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold tracking-tight">Available Shifts</h1>
              <div className="h-6 w-[1px] bg-gray-300 dark:bg-slate-700 mx-2"></div>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-white border border-gray-200 dark:bg-slate-800 dark:border-slate-700 rounded-full text-xs font-medium cursor-pointer">ER Specialist</span>
                <span className="px-3 py-1 bg-white border border-gray-200 dark:bg-slate-800 dark:border-slate-700 rounded-full text-xs font-medium cursor-pointer">Night Shifts</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative min-w-[300px]">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl">search</span>
                <input className="w-full pl-10 pr-4 py-2 bg-[#f0f2f4] dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary-blue/50" placeholder="Search hospitals or departments..." type="text" />
              </div>
              <button className="p-2 rounded-lg bg-[#f0f2f4] dark:bg-slate-800 text-gray-600 dark:text-gray-300 relative">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
              </button>
            </div>
          </header>
          <div className="p-8 pb-32">
            {/* Suggested Ribbon */}
            <section className="mb-10">
              <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary-blue">auto_awesome</span>
                  <h2 className="text-lg font-bold">Suggested for You</h2>
                </div>
                <button className="text-primary-blue text-sm font-semibold hover:underline">View all matches</button>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                <div className="flex-shrink-0 w-80 bg-white dark:bg-slate-900 rounded-xl border border-primary-blue/20 shadow-sm p-5 flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div className="size-12 rounded-lg bg-gray-50 dark:bg-slate-800 p-2 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary-blue text-3xl">local_hospital</span>
                    </div>
                    <span className="bg-primary-blue/10 text-primary-blue text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">High Match</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">ICU Night Shift</h3>
                    <p className="text-gray-500 text-sm">St. Jude Medical Center</p>
                  </div>
                  <div className="flex items-center gap-2 text-primary-blue font-bold text-xl">
                    $95.00 <span className="text-xs font-normal text-gray-400">/ hr</span>
                  </div>
                  <button className="w-full py-2.5 bg-primary-blue text-white font-bold rounded-lg hover:opacity-90 transition-opacity">Apply Now</button>
                </div>
                <div className="flex-shrink-0 w-80 bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm p-5 flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div className="size-12 rounded-lg bg-gray-50 dark:bg-slate-800 p-2 flex items-center justify-center">
                      <span className="material-symbols-outlined text-emerald-500 text-3xl">emergency</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">ER Trauma Unit</h3>
                    <p className="text-gray-500 text-sm">Metro General Hospital</p>
                  </div>
                  <div className="flex items-center gap-2 text-primary-blue font-bold text-xl">
                    $110.00 <span className="text-xs font-normal text-gray-400">/ hr</span>
                  </div>
                  <button className="w-full py-2.5 bg-primary-blue text-white font-bold rounded-lg hover:opacity-90 transition-opacity">Apply Now</button>
                </div>
                <div className="flex-shrink-0 w-80 bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm p-5 flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div className="size-12 rounded-lg bg-gray-50 dark:bg-slate-800 p-2 flex items-center justify-center">
                      <span className="material-symbols-outlined text-orange-400 text-3xl">child_care</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Pediatric Care</h3>
                    <p className="text-gray-500 text-sm">Mercy Children's</p>
                  </div>
                  <div className="flex items-center gap-2 text-primary-blue font-bold text-xl">
                    $88.00 <span className="text-xs font-normal text-gray-400">/ hr</span>
                  </div>
                  <button className="w-full py-2.5 bg-primary-blue text-white font-bold rounded-lg hover:opacity-90 transition-opacity">Apply Now</button>
                </div>
              </div>
            </section>
            {/* Discovery Grid */}
            <section>
              <div className="flex items-center justify-between mb-6 px-1">
                <h2 className="text-lg font-bold">Recommended Discoveries</h2>
                <div className="flex gap-2">
                  <button className="p-2 border border-gray-200 dark:border-slate-800 rounded-lg hover:bg-white dark:hover:bg-slate-800">
                    <span className="material-symbols-outlined text-sm">filter_list</span>
                  </button>
                  <button className="p-2 border border-gray-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-800">
                    <span className="material-symbols-outlined text-sm">grid_view</span>
                  </button>
                </div>
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
              </div>
            </section>
          </div>
          {/* Hospital Reviews Module (Docked Bottom) */}
          <div className="fixed bottom-0 right-0 left-64 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-t border-gray-200 dark:border-slate-800 px-8 py-3 flex items-center justify-between z-20 shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
            <div className="flex items-center gap-6">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">forum</span>
                Recent Facility Reviews
              </p>
              <div className="flex items-center gap-4 border-l border-gray-200 dark:border-slate-700 pl-6 overflow-hidden max-w-2xl">
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-yellow-500 font-bold text-xs flex items-center gap-0.5">5.0 <span className="material-symbols-outlined text-[10px] fill">star</span></span>
                  <span className="text-xs italic text-gray-500 truncate w-48">"Great staff-to-patient ratio at St. Jude..."</span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-yellow-500 font-bold text-xs flex items-center gap-0.5">4.0 <span className="material-symbols-outlined text-[10px] fill">star</span></span>
                  <span className="text-xs italic text-gray-500 truncate w-48">"Clean facilities, modern equipment..."</span>
                </div>
              </div>
            </div>
            <button className="flex items-center gap-1 text-primary-blue text-sm font-bold">
              Read all reviews
              <span className="material-symbols-outlined text-sm">expand_less</span>
            </button>
          </div>
          {/* Floating Snackbar Alert */}
          <div className="fixed bottom-16 right-8 flex flex-col gap-3 z-30">
            <div className="bg-slate-900 dark:bg-primary-blue text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-4 animate-in slide-in-from-right-10 duration-500">
              <div className="size-8 rounded-full bg-green-500 flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-lg">done_all</span>
              </div>
              <div>
                <p className="text-sm font-bold">Accepted!</p>
                <p className="text-[10px] opacity-80">Shift for Metro General Hospital confirmed.</p>
              </div>
              <button className="ml-4 opacity-50 hover:opacity-100">
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
          </div>
        </main>
      </div>

      {showProfile && (
        <StaffProfileModal
          staff={{
            name: "Sarah Jenkins",
            role: "ICU Nurse • Registered Professional",
            status: "Available Today",
            age: "32 Years",
            location: "London, UK",
            country: "United Kingdom",
            experience: "8 Years",
            rating: 4.8,
            reviews: 24,
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZmGZqh14YOtO8XbxS5zDjT3F-6f4Px0IcMARwTFBhQ55ER0XK69-zy2mfnx3A6a4fQfDrCNul77UP7cxLeSiHjnWL0Rd0TkpgR9G7jLgRxL_40lXty7V3Op8xdr22Mrgd-l2BpzIW_Z6XcjcHn3w7beKy0-Zl2CmoxDYa1AxSVVuoxundsLJl4-DSAKAQgUR874S_ttb-3kt999pEd82fJtsKyqReOdpOYwzet3xms3E19h4nNwY8adDq8PNWjFwIWT-YUH0RuCo"
          }}
          onClose={() => setShowProfile(false)}
        />
      )}
    </div>
  );
};

export default StaffDashboard;
