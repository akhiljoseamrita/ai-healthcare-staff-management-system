import React from 'react';
import HospitalSidebar from './HospitalSidebar'; // Adjust path if needed
import HospitalHeader from './HospitalHeader';   // Adjust path if needed

const ManagerShiftManagement = () => {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 font-display text-slate-900 dark:text-slate-100 h-screen flex overflow-hidden">

      {/* 1. Your Sidebar (Active page set to 'schedules' or 'staffing') */}
      <HospitalSidebar activePage="manage-shift" />

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">

        {/* 2. Your Header */}
        <HospitalHeader />

        {/* 3. Main Workspace */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8">



          {/* Page Header & Status */}
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-8">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Staff Manage</h2>
                <p className="text-slate-500 text-sm mt-1">Manage staff assignments and shifts</p>
              </div>
            </div>

          </div>

          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

            {/* LEFT COLUMN: Staff Management */}
            <div className="xl:col-span-2 space-y-8">

              {/* Assigned Staff */}
              <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                    <span className="material-symbols-outlined text-[#135bec]">group</span>
                    Assigned Staff (1/2)
                  </h3>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-[#135bec]/30 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="size-12 rounded-full bg-cover bg-center border-2 border-[#135bec]/20" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuArroFqpN6J1_O1buW7VNcL8DR-LIJmnB_WG87w9dx06XnFdKZuBO3JYUHyGdmQubTsHPz4Ergd1M6g_wWXtrCU-ih4XhTlriw7yHrbHPJhTd_EBnkwM_3Y4kwq3pIWLgW_kfGl3vTtMqeupTTUdHfuBjON_oTpVZNGcm5lCz5-kaCJ6_liEfyL3Hp86xaOcVMcyV7ExAKLu-TToaJa9zjJmV3A1bF42kBLo5uCNFc6ztgdEH0Lf_ve8KjUcB2IlmW5h__gLcHr55w')" }}></div>
                      <div>
                        <p className="font-bold text-sm text-slate-900 dark:text-white">Alex Rivera</p>
                        <p className="text-xs text-slate-500">Senior Nurse • 8.5 Years Exp.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right hidden sm:block">
                        <p className="text-xs font-bold text-emerald-500 uppercase">Confirmed</p>
                        <p className="text-[10px] text-slate-400">Checked in: 06:45 AM</p>
                      </div>
                      <button className="p-2 rounded-lg text-slate-400 hover:bg-white dark:hover:bg-slate-700 transition-colors cursor-pointer">
                        <span className="material-symbols-outlined">more_vert</span>
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Manage Applicants */}
              <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                  <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                    <span className="material-symbols-outlined text-[#135bec]">pending_actions</span>
                    Pending Applicants (3)
                  </h3>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800">

                  {/* Applicant 1 */}
                  <div className="p-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="size-12 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCAdo-EEWb7jzSYjP2Eag_nZ7dciDgRqwBsD-es0VDfYPKvdEcelIh53VYrcgsQPExdYDrEZ1px62RObtS0Niw0NvuY1PzF_go2bkPgjYkJTOLqTr4AGRxyuWh5EBdUGFMPYlpRZoYhm4x0sjqKIjPK_IGSHKqxM24XDgIXqr9Fwl2_A3okMuGVsDtnuLDa-5_4cQXZG4dGMhJs0fZJeTWqGBiGkao7PSFSzr4C02G4AHYbs6zl7j0Hwxqgzv_lTpYrxc9ii_RD9g8')" }}></div>
                      <div>
                        <p className="font-bold text-sm text-slate-900 dark:text-white">Elena Sofia</p>
                        <div className="flex items-center gap-2">
                          <div className="flex text-amber-400">
                            <span className="material-symbols-outlined text-xs">star</span>
                            <span className="material-symbols-outlined text-xs">star</span>
                            <span className="material-symbols-outlined text-xs">star</span>
                            <span className="material-symbols-outlined text-xs">star</span>
                            <span className="material-symbols-outlined text-xs">star_half</span>
                          </div>
                          <span className="text-xs text-slate-500">4.8 • 12 Shifts this month</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="px-4 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-bold hover:border-red-500/50 hover:text-red-600 transition-all cursor-pointer">Decline</button>
                      <button className="px-4 py-2 rounded-lg bg-[#135bec] text-white text-sm font-bold hover:bg-[#135bec]/90 transition-all cursor-pointer shadow-md">Accept</button>
                    </div>
                  </div>

                  {/* Applicant 2 */}
                  <div className="p-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="size-12 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD_s1-RFSHPwTi2AAGOYL5cUSW1gwZ0W4IOOApRo5Vmk02WnNInlSFzR54vMPVPXf414k4DTzQDeG2zbjgQnKj9v2u9Zkh5DN0zKq2nVMEQbAXMHWRLNKY43N7OZIEewR3TEtLs0Xm-A-2GEtnA8rZccq5ca5pAAPxzuZvtOgxqCWsDPwIgVgJv-oLJGAw5Z_HBe5pKh12hUsTJlRUOgGNFEk4_MSonzoe_SNmX9vXgFb3apWPbjfB1Tmat-N20SYyl-rJbpb6CFBE')" }}></div>
                      <div>
                        <p className="font-bold text-sm text-slate-900 dark:text-white">Jordan Wu</p>
                        <div className="flex items-center gap-2">
                          <div className="flex text-amber-400">
                            <span className="material-symbols-outlined text-xs">star</span>
                            <span className="material-symbols-outlined text-xs">star</span>
                            <span className="material-symbols-outlined text-xs">star</span>
                            <span className="material-symbols-outlined text-xs">star</span>
                            <span className="material-symbols-outlined text-xs">star</span>
                          </div>
                          <span className="text-xs text-slate-500">5.0 • First time applicant</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="px-4 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-bold hover:border-red-500/50 hover:text-red-600 transition-all cursor-pointer">Decline</button>
                      <button className="px-4 py-2 rounded-lg bg-[#135bec] text-white text-sm font-bold hover:bg-[#135bec]/90 transition-all cursor-pointer shadow-md">Accept</button>
                    </div>
                  </div>

                  {/* Applicant 3 */}
                  <div className="p-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="size-12 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAGYMGQ1hGN-q11yDURJst4bL-eus2j0cqK-fN3JLpGiP5HpHTi0Gk9LRm0z2QVLfcpWkjePj2_Bx6ZHIrJksOe7A2sogAVbA-pFHcnY16cKTOCiy9Cle4gwdpKRe6cvf3bDqXcak_D1lacMREctjYyNI38HAT6UCrcwLqnqx4g2TkrT5uJ-wmhZePJ3NIVeU_SNsdYonrD9POKfVHzzH8AbEbihpa42ZaDb55k6n--lbmJwrNDSMaXS385y1gdKBRvafBWrcj3XwY')" }}></div>
                      <div>
                        <p className="font-bold text-sm text-slate-900 dark:text-white">Sarah Jenkins</p>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <span className="material-symbols-outlined text-xs">history</span>
                          Applied 2 hours ago
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="px-4 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-bold hover:border-red-500/50 hover:text-red-600 transition-all cursor-pointer">Decline</button>
                      <button className="px-4 py-2 rounded-lg bg-[#135bec] text-white text-sm font-bold hover:bg-[#135bec]/90 transition-all cursor-pointer shadow-md">Accept</button>
                    </div>
                  </div>

                </div>
              </section>
            </div>

            {/* RIGHT COLUMN: AI Recommendations */}
            <aside className="space-y-6">
              <section className="bg-[#135bec]/5 dark:bg-[#135bec]/10 rounded-2xl border-2 border-[#135bec]/20 p-6 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#135bec] rounded-lg text-white">
                    <span className="material-symbols-outlined">auto_awesome</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">AI Recommendations</h3>
                    <p className="text-xs text-slate-500">Best matches for this ward</p>
                  </div>
                </div>

                {/* Match Card 1 */}
                <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-[#135bec]/20 space-y-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBn_GzINB0XBOdbCU48XqZRzvEL9VNKEdc88LZzNuQFidPisa8Zt6abzBcHKXtJk8W60wSYbkFrRA3CMJAzreuZ24-gfh3VEBv7F8jh3yoRPQDODcTJZyPJ21s0DqNACZ20swSJ_Uva_IAp78fhGVtftFFZyLFbjKHgM_9aHVAPyCvvq3chLvEq6g_qFGd9gpskjjNDELV66DSXHK7QwMhDiCBhdv65r8VIlR8Y1mnKY1xO_vZQplLCXPY-RdNuFDux-TfyBqhILJ0')" }}></div>
                      <div>
                        <p className="font-bold text-sm text-slate-900 dark:text-white">Nurse Claire B.</p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wide">ICU Specialist</p>
                      </div>
                    </div>
                    <div className="text-[#135bec] font-black text-lg italic">98%</div>
                  </div>
                  <div className="bg-[#135bec]/5 dark:bg-slate-800 rounded-lg p-3">
                    <p className="text-xs leading-relaxed italic text-slate-700 dark:text-slate-300">
                      "Highly rated in this ward (4.9⭐) + 5 years ICU experience at City Hospital. Preferred shift type."
                    </p>
                  </div>
                  <button className="w-full py-2 rounded-lg border border-[#135bec] text-[#135bec] text-xs font-bold hover:bg-[#135bec] hover:text-white transition-all cursor-pointer">
                    Invite to Shift
                  </button>
                </div>

                {/* Match Card 2 */}
                <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCRFfIPMJ4pTwU0zPBWI89tOZygPvnlhnD77R-ikgPE0ZhDqO5MEzOd9bxzIU4Ga4Utao-itycpxDwsPMNcn86smEwxNrJnB-hBJwFDX5MF09OXmJhSUILlUcZ0nvrIJlinmTl6yyPBpLSeUz7xtU5cxOZms7Z2q19u_lXxBu3abzZWr2ATcGThzZUL3AWX_0jEbvvrKWdxMWXeDOgFjhHqaELhc3_ibDiJu4RM5jdilIHeegjb8y6_tP2ZMP_aipDmTLWqrIoR9uA')" }}></div>
                      <div>
                        <p className="font-bold text-sm text-slate-900 dark:text-white">David Chen</p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wide">Emergency RN</p>
                      </div>
                    </div>
                    <div className="text-[#135bec]/60 font-black text-lg italic">92%</div>
                  </div>
                  <div className="bg-[#135bec]/5 dark:bg-slate-800 rounded-lg p-3">
                    <p className="text-xs leading-relaxed italic text-slate-700 dark:text-slate-300">
                      "Matches core ICU competencies. Available immediately with no travel overlap."
                    </p>
                  </div>
                  <button className="w-full py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer">
                    Invite to Shift
                  </button>
                </div>

                <a className="block text-center text-xs font-bold text-[#135bec] hover:underline cursor-pointer" href="#">View All Suggestions (12)</a>
              </section>

              {/* Quick Stats Card */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-sm">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Vacancy Health</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Response Rate</span>
                    <span className="font-bold text-emerald-500">High (+14%)</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[85%]"></div>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Avg. Match Score</span>
                    <span className="font-bold text-slate-900 dark:text-white">88.5%</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ManagerShiftManagement;