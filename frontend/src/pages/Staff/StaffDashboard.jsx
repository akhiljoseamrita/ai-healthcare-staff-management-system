import React from 'react';
import Staff from './StaffSidebar';
import StaffHeader from './StaffHeader';

const StaffDashboard = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen font-public-sans transition-colors duration-300">
      <div className="flex h-screen overflow-hidden">

        <Staff activePage="dashboard" />

        <main className="flex-1 flex flex-col overflow-y-auto custom-scrollbar">
          {/* Top Header */}
          <StaffHeader />
          <div className="max-w-[1400px] mx-auto px-8 py-8 w-full">
            <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Good Morning, Dr. Alex.</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Thursday, October 24th • You have a shift starting in <span className="text-primary font-semibold">2 hours</span>.</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  <span className="material-symbols-outlined text-lg">calendar_today</span>
                  Calendar
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm">
                  <span className="material-symbols-outlined text-lg">add</span>
                  Find Shifts
                </button>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
              <div className="md:col-span-4 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm relative overflow-hidden group">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg text-orange-600 dark:text-orange-400">
                    <span className="material-symbols-outlined">pending_actions</span>
                  </div>
                  <span className="text-3xl font-bold">12</span>
                </div>
                <h3 className="font-semibold text-slate-700 dark:text-slate-200">Pending Applications</h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 uppercase tracking-wider">3 awaiting hospital review</p>
                <div className="mt-4 w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-orange-500 h-full w-[65%]"></div>
                </div>
              </div>
              <div className="md:col-span-4 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm relative overflow-hidden group">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400">
                    <span className="material-symbols-outlined">check_circle</span>
                  </div>
                  <span className="text-3xl font-bold">4</span>
                </div>
                <h3 className="font-semibold text-slate-700 dark:text-slate-200">Accepted Shifts</h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 uppercase tracking-wider">Confirmed for this week</p>
                <div className="mt-4 w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[40%]"></div>
                </div>
              </div>
              <div className="md:col-span-4 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm relative overflow-hidden group">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
                    <span className="material-symbols-outlined">assignment_turned_in</span>
                  </div>
                  <span className="text-3xl font-bold">28</span>
                </div>
                <h3 className="font-semibold text-slate-700 dark:text-slate-200">Completed Shifts</h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 uppercase tracking-wider">Total this month</p>
                <div className="mt-4 w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full w-[85%]"></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
              {/* Income Goal */}
              <div className="md:col-span-3 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
                <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-6">Income Goal</h3>
                <div className="flex flex-col items-center py-4">
                  <div className="relative w-40 h-40 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle className="text-slate-100 dark:text-slate-700" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" strokeWidth="8"></circle>
                      <circle className="text-primary" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" strokeDasharray="440" strokeDashoffset="70" strokeLinecap="round" strokeWidth="8"></circle>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold">84%</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium uppercase">Achieved</span>
                    </div>
                  </div>
                  <div className="mt-8 text-center">
                    <div className="text-2xl font-bold">$4,200 <span className="text-slate-400 dark:text-slate-500 text-sm font-normal">/ $5,000</span></div>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 px-4 leading-relaxed">You're $800 away from your monthly target</p>
                  </div>
                </div>
              </div>

              {/* Weekly Performance */}
              <div className="md:col-span-6 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-slate-100">Weekly Performance</h3>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Average: 8.4 hrs/day</p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md text-xs cursor-pointer">
                    This Week
                    <span className="material-symbols-outlined text-xs">expand_more</span>
                  </div>
                </div>
                <div className="flex-1 flex items-end justify-between px-2 gap-2 mt-4">
                  {[
                    { day: 'Mon', height: 'h-[60%]', active: false },
                    { day: 'Tue', height: 'h-[45%]', active: false },
                    { day: 'Wed', height: 'h-[75%]', active: false },
                    { day: 'Thu', height: 'h-[95%]', active: true },
                    { day: 'Fri', height: 'h-[55%]', active: false },
                    { day: 'Sat', height: 'h-[30%]', active: false },
                    { day: 'Sun', height: 'h-[20%]', active: false },
                  ].map((item, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full bg-slate-50 dark:bg-slate-700/50 rounded-t-lg h-32 relative group">
                        <div className={`absolute bottom-0 left-0 right-0 ${item.active ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-600 group-hover:bg-primary/40'} rounded-t-lg transition-all ${item.height}`}></div>
                      </div>
                      <span className={`text-[10px] font-bold ${item.active ? 'text-primary' : 'text-slate-400'} uppercase`}>{item.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Up Next */}
              <div className="md:col-span-3 flex flex-col gap-4">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm border-l-4 border-l-primary flex-1">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined">medical_services</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-primary font-bold uppercase tracking-wider">Up Next</span>
                        <h4 className="font-bold text-sm">St. Mary's Hospital</h4>
                      </div>
                    </div>
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                        <span className="material-symbols-outlined text-sm">schedule</span>
                        08:00 AM - 04:00 PM
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                        <span className="material-symbols-outlined text-sm">location_on</span>
                        San Francisco, CA
                      </div>
                      <div className="flex items-center gap-3 text-sm text-emerald-600 font-semibold">
                        <span className="material-symbols-outlined text-sm">payments</span>
                        $85.00/hr
                      </div>
                    </div>
                    <div className="mt-auto space-y-2">
                      <button className="w-full py-2.5 bg-primary text-white rounded-lg font-bold hover:opacity-90 transition-opacity">
                        Clock In
                      </button>
                      <button className="w-full py-2.5 bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-200 rounded-lg font-semibold text-sm hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors">
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-50 dark:border-slate-700 flex justify-between items-center">
                <h3 className="font-bold text-slate-800 dark:text-slate-100">Recent Activity</h3>
                <button className="text-xs font-bold text-primary uppercase tracking-widest hover:underline">View All Activity</button>
              </div>
              <div className="divide-y divide-slate-50 dark:divide-slate-700">
                {[
                  {
                    title: 'Application Rejected',
                    hospital: 'General Hospital - ICU Day Shift (Nov 02)',
                    status: 'Critical',
                    icon: 'cancel',
                    time: '1 hour ago',
                    iconBg: 'bg-rose-100 dark:bg-rose-900/30',
                    iconText: 'text-rose-600 dark:text-rose-400',
                    tagBg: 'bg-rose-50 dark:bg-rose-900/20',
                    tagText: 'text-rose-600 dark:text-rose-400'
                  },
                  {
                    title: 'Application Accepted',
                    hospital: 'Kaiser Permanente - Night Shift (Oct 28)',
                    status: 'Confirmed',
                    icon: 'check_circle',
                    time: '2 hours ago',
                    iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
                    iconText: 'text-emerald-600 dark:text-emerald-400',
                    tagBg: 'bg-emerald-50 dark:bg-emerald-900/20',
                    tagText: 'text-emerald-600 dark:text-emerald-400'
                  },
                  {
                    title: 'Pending Review',
                    hospital: "St. Mary's Hospital - Emergency Room (Nov 05)",
                    status: 'Under Review',
                    icon: 'history',
                    time: '4 hours ago',
                    iconBg: 'bg-amber-100 dark:bg-amber-900/30',
                    iconText: 'text-amber-600 dark:text-amber-400',
                    tagBg: 'bg-amber-50 dark:bg-amber-900/20',
                    tagText: 'text-amber-600 dark:text-amber-400'
                  }
                ].map((activity, idx) => (
                  <div key={idx} className="p-6 flex items-start justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className={`p-2 ${activity.iconBg} ${activity.iconText} rounded-full`}>
                        <span className="material-symbols-outlined text-sm">{activity.icon}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold">{activity.title}</h4>
                          <span className={`px-2 py-0.5 rounded-full ${activity.tagBg} ${activity.tagText} text-[10px] font-bold uppercase`}>
                            {activity.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{activity.hospital}</p>
                      </div>
                    </div>
                    <span className="text-xs text-slate-400 font-medium">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <footer className="mt-12 py-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-400 font-medium uppercase tracking-widest gap-4">
              <div>© 2024 StaffPortal Healthcare. All rights reserved.</div>
              <div className="flex items-center gap-6">
                <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
                <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
                <a className="hover:text-primary transition-colors" href="#">Support Center</a>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StaffDashboard;
