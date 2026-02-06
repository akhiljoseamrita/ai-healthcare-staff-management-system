import React, { useState } from 'react';
import HospitalSidebar from './HospitalSidebar'; 
import HospitalHeader from './HospitalHeader'; 

// 2. LARGE DATASET (To demonstrate filtering "Best 6" per department)
const allCandidates = [
  // --- ICU CANDIDATES ---
  { id: 1, name: "Sarah Jenkins", role: "Senior ICU Nurse", department: "ICU", match: 99, avatar: "https://i.pravatar.cc/150?img=1", statusColor: "bg-emerald-500", tags: [{ icon: "star", text: "Top Rated" }] },
  { id: 2, name: "Mike Ross", role: "ICU Specialist", department: "ICU", match: 97, avatar: "https://i.pravatar.cc/150?img=11", statusColor: "bg-emerald-500", tags: [{ icon: "verified", text: "Certified" }] },
  { id: 3, name: "Jenny Kim", role: "ICU Nurse", department: "ICU", match: 95, avatar: "https://i.pravatar.cc/150?img=5", statusColor: "bg-emerald-500", tags: [{ icon: "schedule", text: "Available" }] },
  { id: 4, name: "Tom Hardy", role: "ICU Assistant", department: "ICU", match: 91, avatar: "https://i.pravatar.cc/150?img=12", statusColor: "bg-amber-500", tags: [{ icon: "school", text: "Training" }] },
  { id: 5, name: "Lisa Ann", role: "Senior ICU Nurse", department: "ICU", match: 89, avatar: "https://i.pravatar.cc/150?img=9", statusColor: "bg-emerald-500", tags: [{ icon: "star", text: "Expert" }] },
  { id: 6, name: "Robert De", role: "ICU Tech", department: "ICU", match: 88, avatar: "https://i.pravatar.cc/150?img=13", statusColor: "bg-amber-500", tags: [{ icon: "timer", text: "On Call" }] },
  { id: 7, name: "Bonny Wright", role: "ICU Nurse", department: "ICU", match: 75, avatar: "https://i.pravatar.cc/150?img=20", statusColor: "bg-slate-400", tags: [{ icon: "group", text: "Backup" }] },

  // --- EMERGENCY CANDIDATES ---
  { id: 8, name: "Marcus Thorne", role: "ER Specialist", department: "Emergency", match: 98, avatar: "https://i.pravatar.cc/150?img=14", statusColor: "bg-emerald-500", tags: [{ icon: "bolt", text: "Fast Response" }] },
  { id: 9, name: "Emily Blunt", role: "Trauma Nurse", department: "Emergency", match: 96, avatar: "https://i.pravatar.cc/150?img=16", statusColor: "bg-emerald-500", tags: [{ icon: "medical_services", text: "Trauma Cert" }] },
  { id: 10, name: "John Wick", role: "ER Doctor", department: "Emergency", match: 94, avatar: "https://i.pravatar.cc/150?img=3", statusColor: "bg-emerald-500", tags: [{ icon: "star", text: "Night Shift" }] },
  { id: 11, name: "Sarah Connor", role: "ER Nurse", department: "Emergency", match: 93, avatar: "https://i.pravatar.cc/150?img=24", statusColor: "bg-emerald-500", tags: [{ icon: "local_shipping", text: "Near" }] },
  { id: 12, name: "Kyle Reese", role: "ER Tech", department: "Emergency", match: 90, avatar: "https://i.pravatar.cc/150?img=55", statusColor: "bg-amber-500", tags: [{ icon: "schedule", text: "Flexible" }] },
  { id: 13, name: "Ripley A.", role: "ER Assistant", department: "Emergency", match: 88, avatar: "https://i.pravatar.cc/150?img=32", statusColor: "bg-amber-500", tags: [{ icon: "check", text: "Verified" }] },
  { id: 14, name: "New Guy", role: "ER Intern", department: "Emergency", match: 60, avatar: "https://i.pravatar.cc/150?img=60", statusColor: "bg-slate-400", tags: [{ icon: "school", text: "Intern" }] },

  // --- RADIOLOGY CANDIDATES ---
  { id: 15, name: "Elena Rodriguez", role: "Radiology Tech", department: "Radiology", match: 97, avatar: "https://i.pravatar.cc/150?img=22", statusColor: "bg-emerald-500", tags: [{ icon: "settings_accessibility", text: "X-Ray Expert" }] },
  { id: 16, name: "Tony Stark", role: "MRI Specialist", department: "Radiology", match: 95, avatar: "https://i.pravatar.cc/150?img=18", statusColor: "bg-emerald-500", tags: [{ icon: "science", text: "Tech Savvy" }] },
  { id: 17, name: "Bruce Banner", role: "Lab Tech", department: "Radiology", match: 92, avatar: "https://i.pravatar.cc/150?img=8", statusColor: "bg-emerald-500", tags: [{ icon: "biotech", text: "Research" }] },
  { id: 18, name: "Natasha R.", role: "Scan Tech", department: "Radiology", match: 89, avatar: "https://i.pravatar.cc/150?img=44", statusColor: "bg-amber-500", tags: [{ icon: "timer", text: "Avail 2h" }] },
  { id: 19, name: "Clint B.", role: "Radiologist", department: "Radiology", match: 85, avatar: "https://i.pravatar.cc/150?img=52", statusColor: "bg-amber-500", tags: [{ icon: "visibility", text: "Precision" }] },
  { id: 20, name: "Wanda M.", role: "Assistant", department: "Radiology", match: 84, avatar: "https://i.pravatar.cc/150?img=41", statusColor: "bg-amber-500", tags: [{ icon: "favorite", text: "Care" }] }
];

const HospitalAnalytics = () => {
  // 1. STATE
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  
  const [filteredCandidates, setFilteredCandidates] = useState(() => {
    const result = [...allCandidates].sort((a, b) => b.match - a.match);
    return result.slice(0, 6);
  });

  // 3. LOGIC: Filter, Sort by Match, Slice Top 6
  const handleFilterApply = () => {
    let result = [];

    // Step A: Filter by Department
    if (selectedDepartment === 'All') {
      result = [...allCandidates];
    } else {
      result = allCandidates.filter(c => c.department === selectedDepartment);
    }

    // Step B: Sort by Match Score (Highest to Lowest)
    result.sort((a, b) => b.match - a.match);

    // Step C: Take only the top 6
    const bestSix = result.slice(0, 6);

    setFilteredCandidates(bestSix);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 font-display text-slate-900 dark:text-slate-100 h-screen flex overflow-hidden">
      
      {/* 1. Sidebar */}
      <HospitalSidebar activePage="Recommendations" />

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* 2. Header */}
        <HospitalHeader />

        {/* Main Body */}
        <main className="flex-1 overflow-y-auto p-8">
            
            {/* Page Header & Filter */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Smart Staff Matches</h2>
                <p className="text-slate-500 text-sm mt-1">
                  Showing the <strong>Top 6 Candidates</strong> based on your selection.
                </p>
              </div>

              {/* FILTER CONTROLS */}
              <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">filter_alt</span>
                  <select 
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="pl-10 pr-8 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-[#135bec]/20 outline-none cursor-pointer appearance-none min-w-[200px]"
                  >
                    <option value="All">All Departments (Best 6)</option>
                    <option value="ICU">Intensive Care Unit (ICU)</option>
                    <option value="Emergency">Emergency Room</option>
                    <option value="Radiology">Radiology</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xl">expand_more</span>
                </div>
                
                <button 
                  onClick={handleFilterApply}
                  className="px-5 py-2 bg-[#135bec] text-white text-sm font-bold rounded-lg hover:bg-[#135bec]/90 transition-all shadow-md shadow-[#135bec]/20 cursor-pointer flex items-center gap-1"
                >
                  <span>Apply</span>
                  <span className="material-symbols-outlined text-sm">check</span>
                </button>
              </div>
            </div>

            {/* Smart Matches Grid */}
            {filteredCandidates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {filteredCandidates.map((candidate) => (
                  <div key={candidate.id} className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 group hover:border-[#135bec]/30 transition-all hover:shadow-md animate-in fade-in zoom-in duration-300">
                      {/* Header */}
                      <div className="flex items-start gap-4 mb-5">
                        <div className="relative">
                          <img 
                            alt="Staff Avatar" 
                            className="w-14 h-14 rounded-full object-cover ring-2 ring-transparent group-hover:ring-[#135bec]/20 transition-all" 
                            src={candidate.avatar} 
                          />
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${candidate.statusColor} border-2 border-white dark:border-slate-900 rounded-full`}></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                             <h4 className="font-bold text-lg text-slate-900 dark:text-white truncate">{candidate.name}</h4>
                             {/* Dept Badge */}
                             <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 uppercase tracking-wide">{candidate.department}</span>
                          </div>
                          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{candidate.role}</p>
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="mb-5">
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#135bec]">Match Confidence</span>
                          <span className="text-sm font-bold text-[#135bec]">{candidate.match}%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#135bec] rounded-full transition-all duration-500" 
                            style={{ width: `${candidate.match}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6 min-h-[32px]">
                        {candidate.tags.map((tag, index) => (
                          <span key={index} className="px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[11px] font-bold rounded-lg flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[14px]">{tag.icon}</span> {tag.text}
                          </span>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3">
                        <button className="flex-1 py-2.5 bg-[#135bec] text-white text-sm font-bold rounded-xl hover:bg-[#135bec]/90 transition-colors cursor-pointer shadow-lg shadow-[#135bec]/20">
                          Quick Invite
                        </button>
                      </div>
                  </div>
                ))}
              </div>
            ) : (
              // Empty State
              <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 border-dashed">
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-slate-400 text-3xl">search_off</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">No matches found</h3>
                <p className="text-slate-500 text-sm mt-1">Try selecting a different department.</p>
              </div>
            )}
        </main>
      </div>
    </div>
  );
};

export default HospitalAnalytics;