import React from 'react';
import { useNavigate } from 'react-router-dom';

const PostNewShift = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/hospital/login');
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">
      <div className="flex h-screen overflow-hidden">
        
        {/* SIDEBAR (Same as Dashboard) */}
        <aside className="w-64 flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800">
          <div className="p-6 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center gap-1">
                <div className="text-[#135bec] flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl">medical_services</span>
                </div>
                <h2 className="text-[#135bec] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Healthcare</h2>
              </div>
            </div>
            <nav className="flex flex-col gap-1 flex-1">
              <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" href="/hospital/dashboard">
                <span className="material-symbols-outlined text-[22px]">dashboard</span>
                <span className="text-sm font-medium">Dashboard</span>
              </a>
              <a className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#135bec]/10 text-[#135bec]" href="#">
                <span className="material-symbols-outlined text-[22px]">groups</span>
                <span className="text-sm font-semibold">Staffing</span>
              </a>
              <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" href="#">
                <span className="material-symbols-outlined text-[22px]">calendar_month</span>
                <span className="text-sm font-medium">Schedules</span>
              </a>
              <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" href="#">
                <span className="material-symbols-outlined text-[22px]">settings</span>
                <span className="text-sm font-medium">Settings</span>
              </a>
            </nav>
            <div className="mt-auto pt-6">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-red-600 py-2.5 text-white text-sm font-bold shadow-md hover:bg-red-700 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">logout</span>
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </aside>
        
        {/* MAIN CONTENT */}
        <main className="flex-1 flex flex-col overflow-y-auto">
          
          {/* NAVBAR (Same as Dashboard) */}
          <header className="sticky top-0 z-20 flex items-center justify-between bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-8 py-4">
            <div className="flex items-center gap-6 flex-1">
              <div className="relative w-full max-w-md">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
                <input className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-[#135bec]/20 placeholder:text-slate-500 outline-none" placeholder="Search staff, shifts, or departments..." type="text" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
              </button>
              <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>
              <div className="flex items-center gap-3 p-1 rounded-lg">
                <div className="text-right hidden md:block">
                  <p className="text-sm font-bold leading-none text-slate-900 dark:text-white">Admin User</p>
                  <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-wider">Hospital Admin</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-slate-200 bg-cover bg-center border border-slate-300" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDnVYnz6JIsW-VJwe5ZT1_Bq_-Rd6D9pZuKTa7dk9IQ54sFTPJLpZ-pppg5B7BAjTU4LtOpTcKaHs4hJjwHHNhwfHfj5eK1uZJvfVTa1WesNu-Z3J-NkGXVWRGL7w4pW3fpsn-uA3TnlhW1BuhdbxS6CF_UzMyEbCYcQJeWYnGcFW7FGjsMDRA_ZUl6MIb1RDiWa4ZVnwRhBhVF1FaIzjOhiqBFPo4BOTpAcXJAkAFGx4g3ujFU6j-p3TkT31lux8j6rm0ntnFZ3_I')" }}></div>
              </div>
            </div>
          </header>

          {/* CONTENT AREA */}
          <div className="p-8">
            
            {/* Header Section (Matched Dashboard Styles) */}
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Post New Shift</h2>
                <p className="text-slate-500 text-sm mt-1">Fill in the details below to broadcast a new shift to qualified staff.</p>
              </div>
            </div>
            
            <form className="space-y-6 max-w-5xl" onSubmit={(e) => e.preventDefault()}>
              
              {/* Role & Dept Section - (Padding reduced to p-6, Radius to rounded-xl to match dashboard cards) */}
              <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <span className="material-symbols-outlined">medical_information</span>
                  </div>
                  <h3 className="text-lg font-bold">Role & Department</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Role</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">medical_services</span>
                      <select className="w-full pl-10 pr-4 py-2.5 rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-[#135bec] focus:border-[#135bec] text-sm appearance-none outline-none">
                        <option>Registered Nurse (RN)</option>
                        <option>Doctor</option>
                        <option>Assistant</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[20px]">expand_more</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Department</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">apartment</span>
                      <select className="w-full pl-10 pr-4 py-2.5 rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-[#135bec] focus:border-[#135bec] text-sm appearance-none outline-none">
                        <option>Emergency Room (ER)</option>
                        <option>ICU</option>
                        <option>Pediatrics</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[20px]">expand_more</span>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Staff Count</label>
                    <div className="flex items-center justify-between w-full md:w-1/2 px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
                      <button className="w-8 h-8 flex items-center justify-center rounded bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 transition-colors shadow-sm cursor-pointer" type="button">
                        <span className="material-symbols-outlined text-sm">remove</span>
                      </button>
                      <span className="text-base font-bold">2</span>
                      <button className="w-8 h-8 flex items-center justify-center rounded bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 transition-colors shadow-sm cursor-pointer" type="button">
                        <span className="material-symbols-outlined text-sm">add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Shift Timing Section - (Matched Styles) */}
              <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <span className="material-symbols-outlined">schedule</span>
                  </div>
                  <h3 className="text-lg font-bold">Shift Timing</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Date</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">calendar_today</span>
                      <input className="w-full pl-10 pr-4 py-2.5 rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-[#135bec]/20 outline-none text-sm" type="text" defaultValue="Oct 24, 2024" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Start Time</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">access_time</span>
                      <input className="w-full pl-10 pr-4 py-2.5 rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-[#135bec]/20 outline-none text-sm" type="text" defaultValue="08:00 AM" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">End Time</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">history</span>
                      <input className="w-full pl-10 pr-4 py-2.5 rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-[#135bec]/20 outline-none text-sm" type="text" defaultValue="04:00 PM" />
                    </div>
                  </div>
                </div>
              </section>

              {/* Requirements Section - (Matched Styles) */}
              <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                    <span className="material-symbols-outlined">assignment</span>
                  </div>
                  <h3 className="text-lg font-bold">Requirements</h3>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Description & Responsibilities</label>
                  <textarea className="w-full px-4 py-2.5 rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-[#135bec]/20 resize-none outline-none text-sm" placeholder="Detail any specific qualifications or duties for this shift..." rows="4"></textarea>
                </div>
              </section>

              <div className="flex items-center justify-end gap-3 pt-2 pb-8">
                <button className="px-6 py-2.5 bg-[#135bec] hover:bg-[#135bec]/90 text-white font-bold rounded-lg shadow-lg shadow-[#135bec]/20 transition-all cursor-pointer text-sm" type="submit">
                  Post New Shift
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PostNewShift;