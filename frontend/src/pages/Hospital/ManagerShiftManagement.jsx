import React, { useState } from 'react';
import HospitalSidebar from './HospitalSidebar'; 
import HospitalHeader from './HospitalHeader'; 
import StaffProfileModal from '../Staff/StaffProfileModal';

const ManagerShiftManagement = () => {
  
  // --- MOCK DATA ---
  const shiftsData = [
    {
      id: 1,
      title: "Registered Nurse - ICU",
      time: "15m ago",
      capacity: 2, 
      assigned: [
        { id: 101, name: "Alex Rivera", role: "Senior Nurse • 8.5 Years Exp.", avatar: "https://i.pravatar.cc/150?img=11", status: "Confirmed", time: "06:45 AM" }
      ],
      applicants: [
        { id: 201, name: "Elena Sofia", rating: 4.8, shifts: 12, avatar: "https://i.pravatar.cc/150?img=5" },
        { id: 202, name: "Jordan Wu", rating: 5.0, shifts: 0, avatar: "https://i.pravatar.cc/150?img=12" },
        { id: 203, name: "Sarah Jenkins", rating: 4.5, shifts: 3, avatar: "https://i.pravatar.cc/150?img=9" }
      ]
    },
    {
      id: 2,
      title: "ER Specialist",
      time: "2h ago",
      capacity: 5,
      assigned: [], 
      applicants: [
        { id: 301, name: "David Kim", rating: 4.9, shifts: 20, avatar: "https://i.pravatar.cc/150?img=60" },
        { id: 302, name: "Maria Garcia", rating: 4.7, shifts: 5, avatar: "https://i.pravatar.cc/150?img=44" },
        { id: 303, name: "James Smith", rating: 4.2, shifts: 2, avatar: "https://i.pravatar.cc/150?img=33" },
        { id: 304, name: "Linda Ray", rating: 5.0, shifts: 8, avatar: "https://i.pravatar.cc/150?img=21" },
        { id: 305, name: "Robert Fox", rating: 4.8, shifts: 15, avatar: "https://i.pravatar.cc/150?img=52" },
        { id: 306, name: "Jenny Wilson", rating: 4.6, shifts: 10, avatar: "https://i.pravatar.cc/150?img=10" },
        { id: 307, name: "Guy Hawkins", rating: 4.9, shifts: 3, avatar: "https://i.pravatar.cc/150?img=59" },
        { id: 308, name: "Albert Flores", rating: 4.1, shifts: 1, avatar: "https://i.pravatar.cc/150?img=51" },
        { id: 309, name: "Devon Lane", rating: 4.4, shifts: 6, avatar: "https://i.pravatar.cc/150?img=8" },
        { id: 310, name: "Jerome Bell", rating: 4.8, shifts: 9, avatar: "https://i.pravatar.cc/150?img=13" },
        { id: 311, name: "Arlene McCoy", rating: 4.7, shifts: 12, avatar: "https://i.pravatar.cc/150?img=35" },
        { id: 312, name: "Courtney Henry", rating: 4.3, shifts: 4, avatar: "https://i.pravatar.cc/150?img=38" }
      ]
    },
    {
      id: 3,
      title: "Pediatrics - Night",
      time: "4h ago",
      capacity: 3,
      assigned: [
        { id: 102, name: "Emily Blunt", role: "Pediatric Nurse", avatar: "https://i.pravatar.cc/150?img=24", status: "Confirmed", time: "08:00 PM" }
      ],
      applicants: [] 
    },
    {
      id: 4,
      title: "Surgical Technologist",
      time: "Yesterday",
      capacity: 4,
      assigned: [
        { id: 103, name: "Dr. House", role: "Surgeon Lead", avatar: "https://i.pravatar.cc/150?img=55", status: "Confirmed", time: "07:00 AM" },
        // CHANGED: Status updated to Confirmed
        { id: 104, name: "Wilson T.", role: "Assistant", avatar: "https://i.pravatar.cc/150?img=54", status: "Confirmed", time: "07:15 AM" }
      ],
      applicants: [
        { id: 401, name: "Greg Gregson", rating: 3.8, shifts: 1, avatar: "https://i.pravatar.cc/150?img=68" },
        { id: 402, name: "Martha S.", rating: 4.2, shifts: 4, avatar: "https://i.pravatar.cc/150?img=49" },
        { id: 403, name: "John Doe", rating: 4.0, shifts: 2, avatar: "https://i.pravatar.cc/150?img=69" },
        { id: 404, name: "Jane Doe", rating: 4.9, shifts: 10, avatar: "https://i.pravatar.cc/150?img=45" },
        { id: 405, name: "Bob Builder", rating: 5.0, shifts: 100, avatar: "https://i.pravatar.cc/150?img=14" }
      ]
    }
  ];

  // --- STATE ---
  // Default to the last shift (to match screenshot example with 2/4 assigned)
  const [currentShift, setCurrentShift] = useState(shiftsData[3]);
  const [selectedStaff, setSelectedStaff] = useState(null);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 font-display text-slate-900 dark:text-slate-100 h-screen flex overflow-hidden">

      {/* 1. Sidebar */}
      <HospitalSidebar activePage="manage-shift" />

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">

        {/* 2. Header */}
        <HospitalHeader />

        {/* 3. Main Workspace */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8">

          {/* Page Header & Status */}
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-8">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Staff Manage</h2>
                <p className="text-slate-500 text-sm mt-1">
                  Viewing details for: <span className="text-[#135bec] font-bold">{currentShift.title}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

            {/* LEFT COLUMN: Dynamic Content */}
            <div className="xl:col-span-2 space-y-8">

              {/* ----------------- ASSIGNED STAFF SECTION ----------------- */}
              <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                    <span className="material-symbols-outlined text-[#135bec]">group</span>
                    Assigned Staff ({currentShift.assigned.length}/{currentShift.capacity})
                  </h3>
                </div>
                <div className="p-6">
                  {currentShift.assigned.length > 0 ? (
                    currentShift.assigned.map((staff) => (
                      <div
                        key={staff.id}
                        className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-[#135bec]/30 transition-all mb-3 last:mb-0 cursor-pointer"
                        onClick={() => setSelectedStaff(staff)}
                      >
                        <div className="flex items-center gap-4">
                          <div className="size-12 rounded-full bg-cover bg-center border-2 border-[#135bec]/20" style={{ backgroundImage: `url('${staff.avatar}')` }}></div>
                          <div>
                            <p className="font-bold text-sm text-slate-900 dark:text-white">{staff.name}</p>
                            <p className="text-xs text-slate-500">{staff.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right hidden sm:block">
                            {/* CHANGED: Logic forces green 'Confirmed' style if status is Confirmed */}
                            <p className="text-xs font-bold uppercase text-emerald-500">{staff.status}</p>
                            <p className="text-[10px] text-slate-400">Time: {staff.time}</p>
                          </div>
                          <button className="p-2 rounded-lg text-slate-400 hover:bg-white dark:hover:bg-slate-700 transition-colors cursor-pointer">
                            <span className="material-symbols-outlined">more_vert</span>
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-slate-400 text-sm">
                      No staff assigned yet.
                    </div>
                  )}
                </div>
              </section>

              {/* ----------------- PENDING APPLICANTS SECTION ----------------- */}
              <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                  <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                    <span className="material-symbols-outlined text-[#135bec]">pending_actions</span>
                    Pending Applicants ({currentShift.applicants.length})
                  </h3>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800">

                  {currentShift.applicants.length > 0 ? (
                    currentShift.applicants.map((applicant) => (
                      <div
                        key={applicant.id}
                        className="p-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer"
                        onClick={() => setSelectedStaff(applicant)}
                      >
                        <div className="flex items-center gap-4">
                          <div className="size-12 rounded-full bg-cover bg-center" style={{ backgroundImage: `url('${applicant.avatar}')` }}></div>
                          <div>
                            <p className="font-bold text-sm text-slate-900 dark:text-white">{applicant.name}</p>
                            <div className="flex items-center gap-2">
                              <div className="flex text-amber-400">
                                <span className="material-symbols-outlined text-xs">star</span>
                                <span className="text-xs font-bold text-slate-600 dark:text-slate-400 ml-1">{applicant.rating}</span>
                              </div>
                              <span className="text-xs text-slate-500">• {applicant.shifts} Shifts</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button className="px-4 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-bold hover:border-red-500/50 hover:text-red-600 transition-all cursor-pointer">Decline</button>
                          <button className="px-4 py-2 rounded-lg bg-[#135bec] text-white text-sm font-bold hover:bg-[#135bec]/90 transition-all cursor-pointer shadow-md">Accept</button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10 text-slate-400 text-sm">
                      No pending applicants for this shift.
                    </div>
                  )}

                </div>
              </section>
            </div>

            {/* RIGHT COLUMN: Last Posted (Interactive Sidebar) */}
            <aside className="space-y-6">
              <section className="bg-[#135bec]/5 dark:bg-[#135bec]/10 rounded-2xl border-2 border-[#135bec]/20 p-6 space-y-6">
                <div className="flex items-center gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Last Posted</h3>
                  </div>
                </div>

                {/* Map through the shiftsData */}
                {shiftsData.map((shift) => (
                  <div 
                    key={shift.id}
                    onClick={() => setCurrentShift(shift)}
                    className={`shift-card relative group p-4 bg-white dark:bg-gray-900 border rounded-xl hover:shadow-md transition-all cursor-pointer ${currentShift.id === shift.id ? 'border-[#135bec] ring-1 ring-[#135bec]' : 'border-gray-100 dark:border-gray-800 hover:border-[#135bec]/30'}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${currentShift.id === shift.id ? 'bg-[#135bec]' : 'bg-green-500'}`}></span>
                        <h3 className="text-[#140d1b] dark:text-gray-100 text-[15px] font-bold leading-tight">{shift.title}</h3>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <div className="flex items-center gap-1 px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-md text-[11px] font-medium border border-gray-100 dark:border-gray-700">
                        <span className="material-symbols-outlined text-[14px]">schedule</span>
                        {shift.time}
                      </div>
                      
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium border ${shift.applicants.length > 0 ? 'bg-[#135bec]/5 text-[#135bec] border-[#135bec]/10' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                        <span className="material-symbols-outlined text-[14px]">group</span>
                        {shift.applicants.length} Applicants
                      </div>

                      {/* NEW: Vacancy Indicator */}
                      <div className="flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-md text-[11px] font-medium">
                        <span className="material-symbols-outlined text-[14px]">person_add</span>
                        {shift.assigned.length}/{shift.capacity} Filled
                      </div>
                    </div>

                    {/* REMOVED: View button removed as requested */}
                  </div>
                ))}

              </section>
            </aside>
          </div>
        </main>
      </div>

      {selectedStaff && (
        <StaffProfileModal
          staff={{
            ...selectedStaff,
            // Map shifts to reviews if reviews is missing
            reviews: selectedStaff.shifts || 24,
          }}
          onClose={() => setSelectedStaff(null)}
        />
      )}
    </div>
  );
};

export default ManagerShiftManagement;