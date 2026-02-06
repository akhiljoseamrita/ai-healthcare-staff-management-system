import React, { useState } from 'react';
import StaffSidebar from './StaffSidebar'; // Assuming you have this from previous steps
import StaffHeader from './StaffHeader';   // Assuming you have a header component

// 2. LARGE DATASET (HOSPITALS/JOBS instead of People)
const allHospitals = [
  // --- ICU OPPORTUNITIES ---
  { id: 1, name: "City General Hospital", role: "Senior ICU Nurse - Night Shift", department: "ICU", match: 99, avatar: "https://ui-avatars.com/api/?name=City+General&background=135bec&color=fff", statusColor: "bg-emerald-500", tags: [{ icon: "payments", text: "$65/hr" }, { icon: "bolt", text: "Urgent" }] },
  { id: 2, name: "St. Mary's Medical", role: "ICU Specialist", department: "ICU", match: 97, avatar: "https://ui-avatars.com/api/?name=St+Marys&background=0f172a&color=fff", statusColor: "bg-emerald-500", tags: [{ icon: "verified", text: "Top Tier" }, { icon: "domain", text: "Teaching" }] },
  { id: 3, name: "Royal London Health", role: "ICU Registered Nurse", department: "ICU", match: 95, avatar: "https://ui-avatars.com/api/?name=Royal+London&background=eab308&color=fff", statusColor: "bg-emerald-500", tags: [{ icon: "schedule", text: "Flexible" }] },
  { id: 4, name: "Northside Clinic", role: "ICU Assistant", department: "ICU", match: 91, avatar: "https://ui-avatars.com/api/?name=North+Side&background=64748b&color=fff", statusColor: "bg-amber-500", tags: [{ icon: "school", text: "Mentorship" }] },
  { id: 5, name: "Metropolitan Care", role: "Head ICU Nurse", department: "ICU", match: 89, avatar: "https://ui-avatars.com/api/?name=Metro+Care&background=135bec&color=fff", statusColor: "bg-emerald-500", tags: [{ icon: "star", text: "High Pay" }] },
  { id: 6, name: "Hope Valley Hospital", role: "ICU Tech", department: "ICU", match: 88, avatar: "https://ui-avatars.com/api/?name=Hope+Valley&background=135bec&color=fff", statusColor: "bg-amber-500", tags: [{ icon: "timer", text: "On Call" }] },
  { id: 7, name: "Small Town Clinic", role: "ICU Backup", department: "ICU", match: 75, avatar: "https://ui-avatars.com/api/?name=Small+Town&background=64748b&color=fff", statusColor: "bg-slate-400", tags: [{ icon: "group", text: "Casual" }] },

  // --- EMERGENCY OPPORTUNITIES ---
  { id: 8, name: "Trauma Center One", role: "ER Specialist", department: "Emergency", match: 98, avatar: "https://ui-avatars.com/api/?name=Trauma+One&background=ef4444&color=fff", statusColor: "bg-emerald-500", tags: [{ icon: "local_shipping", text: "Travel" }] },
  { id: 9, name: "Community Health", role: "Trauma Nurse", department: "Emergency", match: 96, avatar: "https://ui-avatars.com/api/?name=Comm+Health&background=135bec&color=fff", statusColor: "bg-emerald-500", tags: [{ icon: "medical_services", text: "Benefits" }] },
  { id: 10, name: "Westside Urgent Care", role: "ER Doctor Assistant", department: "Emergency", match: 94, avatar: "https://ui-avatars.com/api/?name=West+Side&background=f97316&color=fff", statusColor: "bg-emerald-500", tags: [{ icon: "star", text: "Bonus" }] },
  { id: 11, name: "Prime Healthcare", role: "ER Nurse", department: "Emergency", match: 93, avatar: "https://ui-avatars.com/api/?name=Prime+Health&background=135bec&color=fff", statusColor: "bg-emerald-500", tags: [{ icon: "near_me", text: "Near You" }] },
  { id: 12, name: "City ER Dept", role: "ER Tech", department: "Emergency", match: 90, avatar: "https://ui-avatars.com/api/?name=City+ER&background=135bec&color=fff", statusColor: "bg-amber-500", tags: [{ icon: "schedule", text: "Weekends" }] },
  { id: 13, name: "Regional Hospital", role: "ER Support", department: "Emergency", match: 88, avatar: "https://ui-avatars.com/api/?name=Regional&background=64748b&color=fff", statusColor: "bg-amber-500", tags: [{ icon: "check", text: "Verified" }] },
  
  // --- RADIOLOGY OPPORTUNITIES ---
  { id: 15, name: "Advanced Imaging Co", role: "Radiology Tech", department: "Radiology", match: 97, avatar: "https://ui-avatars.com/api/?name=Advanced+Img&background=8b5cf6&color=fff", statusColor: "bg-emerald-500", tags: [{ icon: "settings", text: "New Tech" }] },
  { id: 16, name: "Stark Diagnostics", role: "MRI Specialist", department: "Radiology", match: 95, avatar: "https://ui-avatars.com/api/?name=Stark+Diag&background=135bec&color=fff", statusColor: "bg-emerald-500", tags: [{ icon: "science", text: "Research" }] },
  { id: 17, name: "Banner Labs", role: "Lab Tech", department: "Radiology", match: 92, avatar: "https://ui-avatars.com/api/?name=Banner+Labs&background=10b981&color=fff", statusColor: "bg-emerald-500", tags: [{ icon: "biotech", text: "Full Time" }] },
  { id: 18, name: "Quick Scan Center", role: "Scan Tech", department: "Radiology", match: 89, avatar: "https://ui-avatars.com/api/?name=Quick+Scan&background=f59e0b&color=fff", statusColor: "bg-amber-500", tags: [{ icon: "timer", text: "Part Time" }] },
];

const StaffAIRecommendations = () => {
  // 1. STATE
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  
  const [filteredHospitals, setFilteredHospitals] = useState(() => {
    const result = [...allHospitals].sort((a, b) => b.match - a.match);
    return result.slice(0, 6);
  });

  // 3. LOGIC: Filter, Sort by Match, Slice Top 6
  const handleFilterApply = () => {
    let result = [];

    // Step A: Filter by Department
    if (selectedDepartment === 'All') {
      result = [...allHospitals];
    } else {
      result = allHospitals.filter(h => h.department === selectedDepartment);
    }

    // Step B: Sort by Match Score (Highest to Lowest)
    result.sort((a, b) => b.match - a.match);

    // Step C: Take only the top 6
    const bestSix = result.slice(0, 6);

    setFilteredHospitals(bestSix);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 font-display text-slate-900 dark:text-slate-100 h-screen flex overflow-hidden">
      
      {/* 1. Sidebar */}
      <StaffSidebar activePage="staff-recommendations" />

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
            <StaffHeader />

        {/* Main Body */}
        <main className="flex-1 overflow-y-auto p-8">
            
            {/* Page Header & Filter */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Smart Job Matches</h2>
                <p className="text-slate-500 text-sm mt-1">
                  Showing the <strong>Top 6 Hospitals</strong> based on your profile & preferences.
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
                    <option value="All">All Specialties (Best 6)</option>
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
            {filteredHospitals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {filteredHospitals.map((hospital) => (
                  <div key={hospital.id} className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 group hover:border-[#135bec]/30 transition-all hover:shadow-md animate-in fade-in zoom-in duration-300">
                      {/* Header */}
                      <div className="flex items-start gap-4 mb-5">
                        <div className="relative">
                          <img 
                            alt="Hospital Logo" 
                            className="w-14 h-14 rounded-lg object-cover ring-2 ring-transparent group-hover:ring-[#135bec]/20 transition-all" 
                            src={hospital.avatar} 
                          />
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${hospital.statusColor} border-2 border-white dark:border-slate-900 rounded-full`}></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                             <h4 className="font-bold text-lg text-slate-900 dark:text-white truncate">{hospital.name}</h4>
                             {/* Dept Badge */}
                             <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 uppercase tracking-wide">{hospital.department}</span>
                          </div>
                          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 truncate">{hospital.role}</p>
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="mb-5">
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#135bec]">Job Compatibility</span>
                          <span className="text-sm font-bold text-[#135bec]">{hospital.match}%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#135bec] rounded-full transition-all duration-500" 
                            style={{ width: `${hospital.match}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6 min-h-[32px]">
                        {hospital.tags.map((tag, index) => (
                          <span key={index} className="px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[11px] font-bold rounded-lg flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[14px]">{tag.icon}</span> {tag.text}
                          </span>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3">
                        <button className="flex-1 py-2.5 bg-[#135bec] text-white text-sm font-bold rounded-xl hover:bg-[#135bec]/90 transition-colors cursor-pointer shadow-lg shadow-[#135bec]/20">
                          Quick Apply
                        </button>
                      </div>
                  </div>
                ))}
              </div>
            ) : (
              // Empty State
              <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 border-dashed">
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-slate-400 text-3xl">domain_disabled</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">No jobs found</h3>
                <p className="text-slate-500 text-sm mt-1">Try selecting a different specialty.</p>
              </div>
            )}
        </main>
      </div>
    </div>
  );
};

export default StaffAIRecommendations;
