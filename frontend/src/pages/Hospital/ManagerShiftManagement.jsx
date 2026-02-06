import React from 'react';

const ManagerShiftManagement = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-[#131118] dark:text-white min-h-screen">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="w-64 flex-shrink-0 border-r border-[#f2f0f4] dark:border-white/10 bg-white dark:bg-[#1c162e] hidden md:flex flex-col">
          <div className="p-6 flex flex-col h-full justify-between">
            <div className="space-y-6">
              {/* Brand */}
              <div className="flex items-center gap-3">
                <div className="bg-primary-deep/10 p-2 rounded-lg">
                  <span className="material-symbols-outlined text-primary-deep">local_hospital</span>
                </div>
                <div>
                  <h1 className="text-[#131118] dark:text-white text-base font-bold leading-tight">City Hospital</h1>
                  <p className="text-[#6f6189] dark:text-gray-400 text-xs font-normal">Dept Manager</p>
                </div>
              </div>
              {/* Nav Items */}
              <nav className="flex flex-col gap-1">
                <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#6f6189] dark:text-gray-400 hover:bg-[#f2f0f4] dark:hover:bg-white/5 transition-colors" href="#">
                  <span className="material-symbols-outlined">dashboard</span>
                  <span className="text-sm font-medium">Dashboard</span>
                </a>
                <a className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary-deep/10 text-primary-deep" href="#">
                  <span className="material-symbols-outlined material-symbols-fill">schedule</span>
                  <span className="text-sm font-medium">Shift Management</span>
                </a>
                <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#6f6189] dark:text-gray-400 hover:bg-[#f2f0f4] dark:hover:bg-white/5 transition-colors" href="#">
                  <span className="material-symbols-outlined">group</span>
                  <span className="text-sm font-medium">Staff Directory</span>
                </a>
                <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#6f6189] dark:text-gray-400 hover:bg-[#f2f0f4] dark:hover:bg-white/5 transition-colors" href="#">
                  <span className="material-symbols-outlined">bar_chart</span>
                  <span className="text-sm font-medium">Reports</span>
                </a>
                <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#6f6189] dark:text-gray-400 hover:bg-[#f2f0f4] dark:hover:bg-white/5 transition-colors" href="#">
                  <span className="material-symbols-outlined">settings</span>
                  <span className="text-sm font-medium">Settings</span>
                </a>
              </nav>
            </div>
            {/* Profile Mini */}
            <div className="border-t border-[#f2f0f4] dark:border-white/10 pt-4 flex items-center gap-3">
              <div className="size-10 rounded-full bg-cover bg-center bg-[#f2f0f4]" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB_SER6JBp7xaqffG3RgvHC_ZlWaLW5DQDbwhnGcVNflya2hwtxjCZUyssN3V-0Qe6bCeeoBb2Wk4t6voDMUFbWm7FmyeaTM0HjbHLOdIXifjKc0aXeoyN_OB0w9ewZDP-gSqfAGDGCVHjiLYCRfL4u2HRZpjC10Xs1L-Eqai9apBXWfwuAo7_Mq2H0SrDTFDi53fRIqAlmHmk7wc55wmg29j_4MTSLOCZqfpGygGKdbN4k4QESsi3tfDsnk9mc2VJjY4mvT1YtTy0')" }}></div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium truncate">Dr. Sarah Mitchell</p>
                <p className="text-xs text-[#6f6189] truncate">Chief of Cardiology</p>
              </div>
            </div>
          </div>
        </aside>
        {/* Main Content Area */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Top Navbar */}
          <header className="h-16 flex items-center justify-between px-8 border-b border-[#f2f0f4] dark:border-white/10 bg-white dark:bg-[#1c162e] z-10">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined md:hidden cursor-pointer">menu</span>
              <h2 className="text-lg font-bold tracking-tight">Shift Management</h2>
            </div>
            <div className="flex items-center gap-6">
              <div className="relative hidden sm:block">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#6f6189] text-xl">search</span>
                <input className="pl-10 pr-4 py-2 bg-background-light dark:bg-white/5 border-none rounded-lg text-sm w-64 focus:ring-2 focus:ring-primary-deep/50" placeholder="Search shifts or staff..." type="text" />
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg bg-[#f2f0f4] dark:bg-white/5 text-[#6f6189] dark:text-gray-400 relative">
                  <span className="material-symbols-outlined">notifications</span>
                  <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-[#1c162e]"></span>
                </button>
                <button className="p-2 rounded-lg bg-[#f2f0f4] dark:bg-white/5 text-[#6f6189] dark:text-gray-400">
                  <span className="material-symbols-outlined">help_outline</span>
                </button>
              </div>
            </div>
          </header>
          {/* Workspace Scrollable */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm">
              <a className="text-[#6f6189] dark:text-gray-400 hover:text-primary-deep transition-colors" href="#">Shift Management</a>
              <span className="material-symbols-outlined text-sm text-[#6f6189]">chevron_right</span>
              <span className="font-medium text-[#131118] dark:text-white">Shift Details - Registered Nurse (ICU)</span>
            </nav>
            {/* Page Header & Status */}
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-3xl font-black tracking-tight">Registered Nurse - ICU</h1>
                  <div className="flex h-7 shrink-0 items-center justify-center gap-x-1.5 rounded-full bg-primary-deep/10 px-3 border border-primary-deep/20">
                    <span className="size-1.5 rounded-full bg-primary-deep animate-pulse"></span>
                    <p className="text-primary-deep text-xs font-bold uppercase tracking-wider">Open - 1 spot left</p>
                  </div>
                </div>
                <p className="text-[#6f6189] dark:text-gray-400 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">location_on</span>
                  Cardiology Ward • Dec 24, 2023 • 07:00 - 19:00 (12h Shift)
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-5 py-2.5 rounded-lg bg-[#f2f0f4] dark:bg-white/5 font-bold text-sm hover:bg-[#e8e6eb] dark:hover:bg-white/10 transition-colors">
                  Manage Shift
                </button>
                <button className="px-5 py-2.5 rounded-lg bg-primary-deep text-white font-bold text-sm shadow-lg shadow-primary-deep/25 hover:bg-primary-deep/90 transition-all flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">person_add</span>
                  Invite Suggested Staff
                </button>
              </div>
            </div>
            {/* Main Layout Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Left: Staff Management */}
              <div className="xl:col-span-2 space-y-8">
                {/* Assigned Staff */}
                <section className="bg-white dark:bg-[#1c162e] rounded-xl border border-[#f2f0f4] dark:border-white/10 overflow-hidden">
                  <div className="p-6 border-b border-[#f2f0f4] dark:border-white/10 flex items-center justify-between">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary-deep">group</span>
                      Assigned Staff (1/2)
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between p-4 bg-background-light dark:bg-white/5 rounded-xl border border-transparent hover:border-primary-deep/20 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="size-12 rounded-full bg-cover bg-center border-2 border-primary-deep/20" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuArroFqpN6J1_O1buW7VNcL8DR-LIJmnB_WG87w9dx06XnFdKZuBO3JYUHyGdmQubTsHPz4Ergd1M6g_wWXtrCU-ih4XhTlriw7yHrbHPJhTd_EBnkwM_3Y4kwq3pIWLgW_kfGl3vTtMqeupTTUdHfuBjON_oTpVZNGcm5lCz5-kaCJ6_liEfyL3Hp86xaOcVMcyV7ExAKLu-TToaJa9zjJmV3A1bF42kBLo5uCNFc6ztgdEH0Lf_ve8KjUcB2IlmW5h__gLcHr55w')" }}></div>
                        <div>
                          <p className="font-bold text-sm">Alex Rivera</p>
                          <p className="text-xs text-[#6f6189] dark:text-gray-400">Senior Nurse • 8.5 Years Exp.</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right hidden sm:block">
                          <p className="text-xs font-bold text-green-500 uppercase">Confirmed</p>
                          <p className="text-[10px] text-[#6f6189]">Checked in: 06:45 AM</p>
                        </div>
                        <button className="p-2 rounded-lg text-[#6f6189] hover:bg-white dark:hover:bg-white/10">
                          <span className="material-symbols-outlined">more_vert</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
                {/* Manage Applicants */}
                <section className="bg-white dark:bg-[#1c162e] rounded-xl border border-[#f2f0f4] dark:border-white/10 overflow-hidden">
                  <div className="p-6 border-b border-[#f2f0f4] dark:border-white/10">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary-deep">pending_actions</span>
                      Pending Applicants (3)
                    </h3>
                  </div>
                  <div className="divide-y divide-[#f2f0f4] dark:divide-white/10">
                    {/* Applicant 1 */}
                    <div className="p-6 flex items-center justify-between hover:bg-background-light dark:hover:bg-white/5 transition-colors group">
                      <div className="flex items-center gap-4">
                        <div className="size-12 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCAdo-EEWb7jzSYjP2Eag_nZ7dciDgRqwBsD-es0VDfYPKvdEcelIh53VYrcgsQPExdYDrEZ1px62RObtS0Niw0NvuY1PzF_go2bkPgjYkJTOLqTr4AGRxyuWh5EBdUGFMPYlpRZoYhm4x0sjqKIjPK_IGSHKqxM24XDgIXqr9Fwl2_A3okMuGVsDtnuLDa-5_4cQXZG4dGMhJs0fZJeTWqGBiGkao7PSFSzr4C02G4AHYbs6zl7j0Hwxqgzv_lTpYrxc9ii_RD9g8')" }}></div>
                        <div>
                          <p className="font-bold text-sm">Elena Sofia</p>
                          <div className="flex items-center gap-2">
                            <div className="flex text-yellow-500">
                              <span className="material-symbols-outlined text-xs material-symbols-fill">star</span>
                              <span className="material-symbols-outlined text-xs material-symbols-fill">star</span>
                              <span className="material-symbols-outlined text-xs material-symbols-fill">star</span>
                              <span className="material-symbols-outlined text-xs material-symbols-fill">star</span>
                              <span className="material-symbols-outlined text-xs">star_half</span>
                            </div>
                            <span className="text-xs text-[#6f6189]">4.8 • 12 Shifts this month</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button className="px-4 py-2 rounded-lg bg-white dark:bg-[#2a2240] border border-[#f2f0f4] dark:border-white/10 text-sm font-bold hover:border-red-500/50 hover:text-red-500 transition-all">Decline</button>
                        <button className="px-4 py-2 rounded-lg bg-primary-deep text-white text-sm font-bold hover:shadow-lg hover:shadow-primary-deep/20 transition-all">Accept</button>
                      </div>
                    </div>
                    {/* Applicant 2 */}
                    <div className="p-6 flex items-center justify-between hover:bg-background-light dark:hover:bg-white/5 transition-colors group">
                      <div className="flex items-center gap-4">
                        <div className="size-12 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD_s1-RFSHPwTi2AAGOYL5cUSW1gwZ0W4IOOApRo5Vmk02WnNInlSFzR54vMPVPXf414k4DTzQDeG2zbjgQnKj9v2u9Zkh5DN0zKq2nVMEQbAXMHWRLNKY43N7OZIEewR3TEtLs0Xm-A-2GEtnA8rZccq5ca5pAAPxzuZvtOgxqCWsDPwIgVgJv-oLJGAw5Z_HBe5pKh12hUsTJlRUOgGNFEk4_MSonzoe_SNmX9vXgFb3apWPbjfB1Tmat-N20SYyl-rJbpb6CFBE')" }}></div>
                        <div>
                          <p className="font-bold text-sm">Jordan Wu</p>
                          <div className="flex items-center gap-2">
                            <div className="flex text-yellow-500">
                              <span className="material-symbols-outlined text-xs material-symbols-fill">star</span>
                              <span className="material-symbols-outlined text-xs material-symbols-fill">star</span>
                              <span className="material-symbols-outlined text-xs material-symbols-fill">star</span>
                              <span className="material-symbols-outlined text-xs material-symbols-fill">star</span>
                              <span className="material-symbols-outlined text-xs material-symbols-fill">star</span>
                            </div>
                            <span className="text-xs text-[#6f6189]">5.0 • First time applicant</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button className="px-4 py-2 rounded-lg bg-white dark:bg-[#2a2240] border border-[#f2f0f4] dark:border-white/10 text-sm font-bold hover:border-red-500/50 hover:text-red-500 transition-all">Decline</button>
                        <button className="px-4 py-2 rounded-lg bg-primary-deep text-white text-sm font-bold hover:shadow-lg hover:shadow-primary-deep/20 transition-all">Accept</button>
                      </div>
                    </div>
                    {/* Applicant 3 */}
                    <div className="p-6 flex items-center justify-between hover:bg-background-light dark:hover:bg-white/5 transition-colors group">
                      <div className="flex items-center gap-4">
                        <div className="size-12 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAGYMGQ1hGN-q11yDURJst4bL-eus2j0cqK-fN3JLpGiP5HpHTi0Gk9LRm0z2QVLfcpWkjePj2_Bx6ZHIrJksOe7A2sogAVbA-pFHcnY16cKTOCiy9Cle4gwdpKRe6cvf3bDqXcak_D1lacMREctjYyNI38HAT6UCrcwLqnqx4g2TkrT5uJ-wmhZePJ3NIVeU_SNsdYonrD9POKfVHzzH8AbEbihpa42ZaDb55k6n--lbmJwrNDSMaXS385y1gdKBRvafBWrcj3XwY')" }}></div>
                        <div>
                          <p className="font-bold text-sm">Sarah Jenkins</p>
                          <div className="flex items-center gap-2 text-xs text-[#6f6189]">
                            <span className="material-symbols-outlined text-xs">history</span>
                            Applied 2 hours ago
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button className="px-4 py-2 rounded-lg bg-white dark:bg-[#2a2240] border border-[#f2f0f4] dark:border-white/10 text-sm font-bold hover:border-red-500/50 hover:text-red-500 transition-all">Decline</button>
                        <button className="px-4 py-2 rounded-lg bg-primary-deep text-white text-sm font-bold hover:shadow-lg hover:shadow-primary-deep/20 transition-all">Accept</button>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              {/* Right: AI Recommendations */}
              <aside className="space-y-6">
                <section className="bg-primary-deep/5 dark:bg-primary-deep/10 rounded-2xl border-2 border-primary-deep/20 p-6 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary-deep rounded-lg text-white">
                      <span className="material-symbols-outlined">auto_awesome</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">AI Recommendations</h3>
                      <p className="text-xs text-[#6f6189] dark:text-gray-400">Best matches for this ward</p>
                    </div>
                  </div>
                  {/* Match Card 1 */}
                  <div className="bg-white dark:bg-[#1c162e] rounded-xl p-4 border border-primary-deep/20 space-y-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBn_GzINB0XBOdbCU48XqZRzvEL9VNKEdc88LZzNuQFidPisa8Zt6abzBcHKXtJk8W60wSYbkFrRA3CMJAzreuZ24-gfh3VEBv7F8jh3yoRPQDODcTJZyPJ21s0DqNACZ20swSJ_Uva_IAp78fhGVtftFFZyLFbjKHgM_9aHVAPyCvvq3chLvEq6g_qFGd9gpskjjNDELV66DSXHK7QwMhDiCBhdv65r8VIlR8Y1mnKY1xO_vZQplLCXPY-RdNuFDux-TfyBqhILJ0')" }}></div>
                        <div>
                          <p className="font-bold text-sm">Nurse Claire B.</p>
                          <p className="text-[10px] text-[#6f6189] uppercase tracking-wide">ICU Specialist</p>
                        </div>
                      </div>
                      <div className="text-primary-deep font-black text-lg italic">98%</div>
                    </div>
                    <div className="bg-primary-deep/5 dark:bg-white/5 rounded-lg p-3">
                      <p className="text-xs leading-relaxed italic text-[#131118] dark:text-gray-200">
                        "Highly rated in this ward (4.9⭐) + 5 years ICU experience at City Hospital. Preferred shift type."
                      </p>
                    </div>
                    <button className="w-full py-2 rounded-lg border border-primary-deep text-primary-deep text-xs font-bold hover:bg-primary-deep hover:text-white transition-all">
                      Invite to Shift
                    </button>
                  </div>
                  {/* Match Card 2 */}
                  <div className="bg-white dark:bg-[#1c162e] rounded-xl p-4 border border-[#f2f0f4] dark:border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCRFfIPMJ4pTwU0zPBWI89tOZygPvnlhnD77R-ikgPE0ZhDqO5MEzOd9bxzIU4Ga4Utao-itycpxDwsPMNcn86smEwxNrJnB-hBJwFDX5MF09OXmJhSUILlUcZ0nvrIJlinmTl6yyPBpLSeUz7xtU5cxOZms7Z2q19u_lXxBu3abzZWr2ATcGThzZUL3AWX_0jEbvvrKWdxMWXeDOgFjhHqaELhc3_ibDiJu4RM5jdilIHeegjb8y6_tP2ZMP_aipDmTLWqrIoR9uA')" }}></div>
                        <div>
                          <p className="font-bold text-sm">David Chen</p>
                          <p className="text-[10px] text-[#6f6189] uppercase tracking-wide">Emergency RN</p>
                        </div>
                      </div>
                      <div className="text-primary-deep/60 font-black text-lg italic">92%</div>
                    </div>
                    <div className="bg-primary-deep/5 dark:bg-white/5 rounded-lg p-3">
                      <p className="text-xs leading-relaxed italic text-[#131118] dark:text-gray-200">
                        "Matches core ICU competencies. Available immediately with no travel overlap."
                      </p>
                    </div>
                    <button className="w-full py-2 rounded-lg border border-[#f2f0f4] dark:border-white/10 text-[#6f6189] dark:text-gray-400 text-xs font-bold hover:bg-[#f2f0f4] dark:hover:bg-white/10 transition-all">
                      Invite to Shift
                    </button>
                  </div>
                  <a className="block text-center text-xs font-bold text-primary-deep hover:underline" href="#">View All Suggestions (12)</a>
                </section>
                {/* Quick Stats Card */}
                <div className="bg-white dark:bg-[#1c162e] rounded-xl border border-[#f2f0f4] dark:border-white/10 p-6 space-y-4">
                  <h4 className="text-sm font-bold">Vacancy Health</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#6f6189]">Response Rate</span>
                      <span className="font-bold text-green-500">High (+14%)</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#f2f0f4] dark:bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 w-[85%]"></div>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-[#6f6189]">Avg. Match Score</span>
                      <span className="font-bold">88.5%</span>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ManagerShiftManagement;
