import React, { useState } from 'react';
import StaffSidebar from './StaffSidebar'; 
import StaffHeader from './StaffHeader'; 
import StaffProfileModal from './StaffProfileModal'; 

const StaffShiftDetails = () => {
  
  // --- MOCK DATA (Staff Perspective) ---
  const jobGroups = [
    {
      id: 1,
      title: "ICU / Critical Care",
      lastActivity: "Updated 15m ago",
      totalActive: 3, 
      confirmedShifts: [
        { id: 101, name: "City General Hospital", role: "Senior ICU Nurse", avatar: "https://ui-avatars.com/api/?name=City+General&background=135bec&color=fff", status: "Confirmed", time: "07:00 AM - 07:00 PM", date: "Tomorrow" }
      ],
      pendingApplications: [
        { id: 201, name: "St. Mary's Medical", rating: 4.8, pay: "$65/hr", avatar: "https://ui-avatars.com/api/?name=St+Marys&background=0f172a&color=fff" },
        { id: 202, name: "Royal London Health", rating: 4.5, pay: "$62/hr", avatar: "https://ui-avatars.com/api/?name=Royal+London&background=eab308&color=fff" }
      ]
    },
    {
      id: 2,
      title: "Emergency Room (ER)",
      lastActivity: "Updated 2h ago",
      totalActive: 5,
      confirmedShifts: [], 
      pendingApplications: [
        { id: 301, name: "Trauma Center One", rating: 4.9, pay: "$70/hr", avatar: "https://ui-avatars.com/api/?name=Trauma+One&background=ef4444&color=fff" },
        { id: 302, name: "Community Health", rating: 4.7, pay: "$55/hr", avatar: "https://ui-avatars.com/api/?name=Comm+Health&background=135bec&color=fff" },
        { id: 303, name: "Westside Urgent Care", rating: 4.2, pay: "$58/hr", avatar: "https://ui-avatars.com/api/?name=West+Side&background=f97316&color=fff" },
        { id: 304, name: "Prime Healthcare", rating: 5.0, pay: "$60/hr", avatar: "https://ui-avatars.com/api/?name=Prime+Health&background=135bec&color=fff" },
        { id: 305, name: "Regional Hospital", rating: 4.8, pay: "$59/hr", avatar: "https://ui-avatars.com/api/?name=Regional&background=64748b&color=fff" }
      ]
    },
    {
      id: 3,
      title: "Pediatrics - Weekend",
      lastActivity: "Updated 4h ago",
      totalActive: 1,
      confirmedShifts: [
        { id: 102, name: "Children's Hope Hospital", role: "Pediatric Nurse", avatar: "https://ui-avatars.com/api/?name=Childrens+Hope&background=10b981&color=fff", status: "Confirmed", time: "08:00 AM - 04:00 PM", date: "Sat, Oct 28" }
      ],
      pendingApplications: [] 
    },
    {
      id: 4,
      title: "Surgical Assistant",
      lastActivity: "Yesterday",
      totalActive: 4,
      confirmedShifts: [
        { id: 103, name: "Metropolitan Care", role: "Surgeon Assistant", avatar: "https://ui-avatars.com/api/?name=Metro+Care&background=135bec&color=fff", status: "Confirmed", time: "06:00 AM", date: "Mon, Oct 30" },
        { id: 104, name: "Hope Valley Hospital", role: "Scrub Tech", avatar: "https://ui-avatars.com/api/?name=Hope+Valley&background=8b5cf6&color=fff", status: "Confirmed", time: "02:00 PM", date: "Tue, Oct 31" }
      ],
      pendingApplications: [
        { id: 401, name: "Advanced Imaging Co", rating: 3.8, pay: "$45/hr", avatar: "https://ui-avatars.com/api/?name=Advanced+Img&background=64748b&color=fff" },
        { id: 402, name: "Stark Diagnostics", rating: 4.2, pay: "$50/hr", avatar: "https://ui-avatars.com/api/?name=Stark+Diag&background=135bec&color=fff" }
      ]
    }
  ];

  // --- STATE ---
  const [currentGroup, setCurrentGroup] = useState(jobGroups[0]);
  const [selectedHospital, setSelectedHospital] = useState(null);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 font-display text-slate-900 dark:text-slate-100 h-screen flex overflow-hidden">

      {/* 1. Sidebar (STAFF SIDEBAR) */}
      <StaffSidebar activePage="shift-details" />

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">

        {/* 2. Header (STAFF HEADER) */}
        <StaffHeader />

        {/* 3. Main Workspace */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8">

          {/* Page Header & Status */}
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-8">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">My Schedule</h2>
                <p className="text-slate-500 text-sm mt-1">
                  Viewing jobs for: <span className="text-[#135bec] font-bold">{currentGroup.title}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

            {/* LEFT COLUMN: Dynamic Content */}
            <div className="xl:col-span-2 space-y-8">

              {/* ----------------- CONFIRMED SHIFTS SECTION ----------------- */}
              <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                    <span className="material-symbols-outlined text-emerald-500">check_circle</span>
                    Confirmed Shifts ({currentGroup.confirmedShifts.length})
                  </h3>
                </div>
                <div className="p-6">
                  {currentGroup.confirmedShifts.length > 0 ? (
                    currentGroup.confirmedShifts.map((hospital) => (
                      <div
                        key={hospital.id}
                        className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-[#135bec]/30 transition-all mb-3 last:mb-0 cursor-pointer"
                        onClick={() => {}} 
                      >
                        <div className="flex items-center gap-4">
                          <div className="size-12 rounded-lg bg-cover bg-center border border-slate-200 dark:border-slate-700" style={{ backgroundImage: `url('${hospital.avatar}')` }}></div>
                          <div>
                            <p className="font-bold text-sm text-slate-900 dark:text-white">{hospital.name}</p>
                            <p className="text-xs text-slate-500">{hospital.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right hidden sm:block">
                            <p className="text-xs font-bold uppercase text-emerald-500">{hospital.status}</p>
                            <p className="text-[10px] text-slate-400">{hospital.date} • {hospital.time}</p>
                          </div>
                          <button className="p-2 rounded-lg text-slate-400 hover:bg-white dark:hover:bg-slate-700 transition-colors cursor-pointer">
                            <span className="material-symbols-outlined">map</span>
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-slate-400 text-sm">
                      No confirmed shifts in this category yet.
                    </div>
                  )}
                </div>
              </section>

              {/* ----------------- PENDING APPLICATIONS SECTION ----------------- */}
              <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                  <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                    <span className="material-symbols-outlined text-amber-500">hourglass_top</span>
                    Pending Applications ({currentGroup.pendingApplications.length})
                  </h3>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800">

                  {currentGroup.pendingApplications.length > 0 ? (
                    currentGroup.pendingApplications.map((hospital) => (
                      <div
                        key={hospital.id}
                        className="p-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer"
                        onClick={() => setSelectedHospital(hospital)}
                      >
                        <div className="flex items-center gap-4">
                          <div className="size-12 rounded-lg bg-cover bg-center" style={{ backgroundImage: `url('${hospital.avatar}')` }}></div>
                          <div>
                            <p className="font-bold text-sm text-slate-900 dark:text-white">{hospital.name}</p>
                            <div className="flex items-center gap-2">
                              <div className="flex text-amber-400">
                                <span className="material-symbols-outlined text-xs">star</span>
                                <span className="text-xs font-bold text-slate-600 dark:text-slate-400 ml-1">{hospital.rating}</span>
                              </div>
                              <span className="text-xs text-slate-500 font-bold bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-1.5 py-0.5 rounded">{hospital.pay}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button className="px-4 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-bold hover:border-red-500/50 hover:text-red-600 transition-all cursor-pointer">
                            Withdraw
                          </button>
                          
                          {/* CHANGED: View Job button -> Applied disabled button */}
                          <button 
                            disabled 
                            className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 text-sm font-bold border border-slate-200 dark:border-slate-700 cursor-not-allowed flex items-center gap-1 shadow-none"
                          >
                            <span className="material-symbols-outlined text-[16px]">check</span>
                            Applied
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10 text-slate-400 text-sm">
                      No pending applications.
                    </div>
                  )}

                </div>
              </section>
            </div>

            {/* RIGHT COLUMN: My Job Groups */}
            <aside className="space-y-6">
              <section className="bg-[#135bec]/5 dark:bg-[#135bec]/10 rounded-2xl border-2 border-[#135bec]/20 p-6 space-y-6">
                <div className="flex items-center gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">My Job Groups</h3>
                    <p className="text-xs text-slate-500">Filter by category</p>
                  </div>
                </div>

                {/* Map through the Job Groups */}
                {jobGroups.map((group) => (
                  <div 
                    key={group.id}
                    onClick={() => setCurrentGroup(group)}
                    className={`shift-card relative group p-4 bg-white dark:bg-gray-900 border rounded-xl hover:shadow-md transition-all cursor-pointer ${currentGroup.id === group.id ? 'border-[#135bec] ring-1 ring-[#135bec]' : 'border-gray-100 dark:border-gray-800 hover:border-[#135bec]/30'}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${currentGroup.id === group.id ? 'bg-[#135bec]' : 'bg-slate-300'}`}></span>
                        <h3 className="text-[#140d1b] dark:text-gray-100 text-[15px] font-bold leading-tight">{group.title}</h3>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <div className="flex items-center gap-1 px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-md text-[11px] font-medium border border-gray-100 dark:border-gray-700">
                        <span className="material-symbols-outlined text-[14px]">history</span>
                        {group.lastActivity}
                      </div>
                      
                      {/* Active Counts */}
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium border ${group.confirmedShifts.length > 0 ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                        <span className="material-symbols-outlined text-[14px]">check_circle</span>
                        {group.confirmedShifts.length}
                      </div>
                      
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium border ${group.pendingApplications.length > 0 ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                        <span className="material-symbols-outlined text-[14px]">hourglass_top</span>
                        {group.pendingApplications.length}
                      </div>
                    </div>
                  </div>
                ))}
              </section>
            </aside>
          </div>
        </main>
      </div>

      {/* Modal */}
      {selectedHospital && (
        <StaffProfileModal
          staff={{
            name: selectedHospital.name,
            role: "Hospital • " + selectedHospital.pay,
            rating: selectedHospital.rating,
            reviews: 120,
            avatar: selectedHospital.avatar,
            status: "Hiring Now",
            age: "Level 1 Trauma", 
            location: "5mi away",
            country: "USA",
            experience: "Certified"
          }}
          onClose={() => setSelectedHospital(null)}
        />
      )}
    </div>
  );
};

export default StaffShiftDetails;