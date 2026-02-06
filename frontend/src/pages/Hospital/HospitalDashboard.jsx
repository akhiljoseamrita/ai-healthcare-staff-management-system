import React from 'react'; // Removed useState as it's no longer needed for the dropdown
import { useNavigate } from 'react-router-dom';

const HospitalDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add any cleanup logic here (e.g., localStorage.removeItem('token'))
    navigate('/hospital/login');
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">
      <div className="flex h-screen overflow-hidden">
        {/* SideNavBar */}
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
              <a className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#135bec]/10 text-[#135bec]" href="#">
                <span className="material-symbols-outlined text-[22px]">dashboard</span>
                <span className="text-sm font-semibold">Dashboard</span>
              </a>
              <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" href="#">
                <span className="material-symbols-outlined text-[22px]">groups</span>
                <span className="text-sm font-medium"> <a href="/hospital/post-shift">Staffing</a></span>
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
              {/* UPDATED: Add Staff button changed to Sign Out button */}
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
        
        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-y-auto">
          {/* TopNavBar */}
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
              
              {/* UPDATED Profile Section: Dropdown Removed, just static display now */}
              <div className="flex items-center gap-3 p-1 rounded-lg">
                <div className="text-right hidden md:block">
                  <p className="text-sm font-bold leading-none text-slate-900 dark:text-white">Admin User</p>
                  <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-wider">Hospital Admin</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-slate-200 bg-cover bg-center border border-slate-300" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDnVYnz6JIsW-VJwe5ZT1_Bq_-Rd6D9pZuKTa7dk9IQ54sFTPJLpZ-pppg5B7BAjTU4LtOpTcKaHs4hJjwHHNhwfHfj5eK1uZJvfVTa1WesNu-Z3J-NkGXVWRGL7w4pW3fpsn-uA3TnlhW1BuhdbxS6CF_UzMyEbCYcQJeWYnGcFW7FGjsMDRA_ZUl6MIb1RDiWa4ZVnwRhBhVF1FaIzjOhiqBFPo4BOTpAcXJAkAFGx4g3ujFU6j-p3TkT31lux8j6rm0ntnFZ3_I')" }}></div>
              </div>
            </div>
          </header>
          
          <div className="p-8">            
            {/* SectionHeader */}
            <div className="flex items-end justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">At a Glance</h2>
                <p className="text-slate-500 text-sm mt-1">Real-time staffing metrics for the current cycle.</p>
              </div>
              <div className="text-xs font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full uppercase tracking-widest">
                Updated 2m ago
              </div>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <p className="text-slate-500 text-sm font-medium">Total Active Staff</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-2xl font-bold">1,248</span>
                  <span className="text-emerald-500 text-xs font-bold flex items-center"><span className="material-symbols-outlined text-xs">trending_up</span>+2%</span>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <p className="text-slate-500 text-sm font-medium">Open Shifts</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-2xl font-bold">42</span>
                  <span className="text-emerald-500 text-xs font-bold flex items-center"><span className="material-symbols-outlined text-xs">trending_up</span>+5%</span>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <p className="text-slate-500 text-sm font-medium">Staffing Ratio</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-2xl font-bold">94%</span>
                  <span className="text-rose-500 text-xs font-bold flex items-center"><span className="material-symbols-outlined text-xs">trending_down</span>-1%</span>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <p className="text-slate-500 text-sm font-medium">Pending Approvals</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-2xl font-bold">12</span>
                  <span className="text-rose-500 text-xs font-bold flex items-center"><span className="material-symbols-outlined text-xs">trending_down</span>-3%</span>
                </div>
              </div>
            </div>
            
            {/* AI Recommendations Section */}
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-[#135bec]">auto_awesome</span>
                <h2 className="text-lg font-bold">AI Recommended Candidates</h2>
                <span className="bg-[#135bec]/10 text-[#135bec] text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">Priority</span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recommendation Card 1 */}
                <div className="bg-gradient-to-br from-[#135bec]/5 to-transparent border border-[#135bec]/20 p-5 rounded-xl flex flex-col gap-4 relative overflow-hidden group">
                  <div className="absolute -right-4 -top-4 w-20 h-20 bg-[#135bec]/10 rounded-full blur-2xl group-hover:bg-[#135bec]/20 transition-all"></div>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-cover bg-center border-2 border-[#135bec]/20" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDnZdZzpTxVabHaI6PgEuEGWsG8DkDZ66hbPf0PcSjcFZY_9DGym_PO6UP3zlZjOAvdSPZd2KFusaUcsDMRqOQfLhnfuUTlJyte5yXJF1jSWsi12v8W45jEWynzDj3N2szXevxzxY_2SYAimpmk6SklVflpiVeuHFtYgqv46vxx7p0IfORQ8xppkW82NdyJYGBo_N9n0nSD7kcd1nvbbmJBYm9wOsG-ixbNWHV0djw3XrTeCs2GBf28S31-IhaZ57U3qK9uI3TXXNA')" }}></div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white">Dr. Sarah Smith</h3>
                      <p className="text-xs text-slate-500">Specialist, ER Department</p>
                    </div>
                    <div className="ml-auto text-[#135bec] font-bold text-sm bg-[#135bec]/10 px-2 py-1 rounded">98% Match</div>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">Ideal candidate for the upcoming ER night shift based on previous performance and proximity.</p>
                  <button className="w-full bg-[#135bec] py-2 rounded-lg text-white text-xs font-bold hover:bg-[#135bec]/90 transition-colors cursor-pointer">Quick Hire</button>
                </div>
                {/* Recommendation Card 2 */}
                <div className="bg-gradient-to-br from-[#135bec]/5 to-transparent border border-[#135bec]/20 p-5 rounded-xl flex flex-col gap-4 relative overflow-hidden group">
                  <div className="absolute -right-4 -top-4 w-20 h-20 bg-[#135bec]/10 rounded-full blur-2xl group-hover:bg-[#135bec]/20 transition-all"></div>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-cover bg-center border-2 border-[#135bec]/20" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDdfA4XmaA1h6cD6giF8STCfU8vAW8pNCXED-L4KHFi5lGcoiMQSEpN2sO6dwvXOVGX-LmBPqt7K2qKl7hCyQL4jLHw2Ya3Eh6kzKpb5SFe_Ruc4ZhhGJSH2p1J5QSOygSleXlf2h7zocV8v2qjdUMwVoB_elNldfmzZ_b7EGwX4bGSs_jTfF70VYWUVm2p9BsDOzUqBLUu_FnQVLzyLnZgF4Zio8MK4_LEnqs0fxvncb22UxT8NmiRBW2hx4YoTne06fnAsFDjP2s')" }}></div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white">James Wilson</h3>
                      <p className="text-xs text-slate-500">Senior Nurse, ICU</p>
                    </div>
                    <div className="ml-auto text-[#135bec] font-bold text-sm bg-[#135bec]/10 px-2 py-1 rounded">95% Match</div>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">Matches the critical staffing requirement in ICU Block B for the 08:00 shift.</p>
                  <button className="w-full bg-[#135bec] py-2 rounded-lg text-white text-xs font-bold hover:bg-[#135bec]/90 transition-colors cursor-pointer">Quick Hire</button>
                </div>
                {/* Recommendation Card 3 */}
                <div className="bg-gradient-to-br from-[#135bec]/5 to-transparent border border-[#135bec]/20 p-5 rounded-xl flex flex-col gap-4 relative overflow-hidden group">
                  <div className="absolute -right-4 -top-4 w-20 h-20 bg-[#135bec]/10 rounded-full blur-2xl group-hover:bg-[#135bec]/20 transition-all"></div>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-cover bg-center border-2 border-[#135bec]/20" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBPVQVjjihTW44_6vnK19E4UI3oZG0HwQgIkH3-m8NJnEWyiK1-ve0Yau9DNlo2z7Fk6WV8UD-B5Hqn8cGBc9q_PuZrRwZkft0YjW1H6khgIt2yXtus_9vqRRuDm7jTfBslI2UjRyi6Fjn93gr2h1AtGrcJST7KKiPIMiPeMCMTeWSm8nW_2LQwsJDJUwi_o7wbRa9SD-_gAVucGktIlQsw4aDpjzP9SpR2uYSNJfD-g2TwGOvrUPHWWc2OkWdWCzTAZV7YJsFj10w')" }}></div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white">Maria Garcia</h3>
                      <p className="text-xs text-slate-500">Cardiology Technician</p>
                    </div>
                    <div className="ml-auto text-[#135bec] font-bold text-sm bg-[#135bec]/10 px-2 py-1 rounded">92% Match</div>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">Highly experienced technician available for immediate rotation in Diagnostic Imaging.</p>
                  <button className="w-full bg-[#135bec] py-2 rounded-lg text-white text-xs font-bold hover:bg-[#135bec]/90 transition-colors cursor-pointer">Quick Hire</button>
                </div>
              </div>
            </div>
            
            {/* Data Table Section */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <h2 className="text-lg font-bold">Current Shifts</h2>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1 cursor-pointer">
                    <span className="material-symbols-outlined text-sm">filter_list</span>
                    Filter
                  </button>
                  <button className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1 cursor-pointer">
                    <span className="material-symbols-outlined text-sm">download</span>
                    Export
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 dark:bg-slate-800/50">
                    <tr>
                      <th className="px-6 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Department</th>
                      <th className="px-6 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Shift Time</th>
                      <th className="px-6 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Assigned Staff</th>
                      <th className="px-6 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold">Emergency Room</span>
                          <span className="text-xs text-slate-500">Block A, Level 1</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="material-symbols-outlined text-slate-400 text-base">schedule</span>
                          08:00 - 16:00
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex -space-x-2">
                          <div className="h-8 w-8 rounded-full border-2 border-white dark:border-slate-900 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAunZYpW9kh2sSkmZo6cimKeT1OGs0Z_-2Hg25gRI4m9rtLHBJC5WPbQopI12FyzgUZGLTwIEphs0hoAZ7vrfFl5MEmloBH4P6RR_6l2fGMwSU63KDJoXYIqTNO9zjcGz7k7_KxXKk1qZ2HWZPOghShWaV243hoJp6CWIZBcLL8m300ZZ_W0qzEwMM3ah7_uGEE_cdPjByZz5-6qyOsAQyle2tWuBPVrkP_jEZ541I0YrNiH2AvNlwSfIlC7awCx3KzKEzawjU9QjM')" }}></div>
                          <div className="h-8 w-8 rounded-full border-2 border-white dark:border-slate-900 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB_Qis2cKugIFdVt3nfAMTzM5eCb1jsBTnzDFiXTbei6sJc3TRaihxq4UGKeet8Urk9MIKiRs9cuKFK52BmoJkVVoenN0zhbE9CVTlLyFtdNI_3Ms5_PSeIwJJSg5u6teJJOav4kZP-7GFF4VdgDkewEQPmMvi7ScFAhjiSP57NXK0FtIuK36vs9Whhs4b51Bad2M6kJmJJtAA62IhGjG-0U19TrJiTlWy2xC-Cf2vCrJAlBZ7oR6gAzGHRnGS514Adtzu0ZiXOy3s')" }}></div>
                          <div className="h-8 w-8 rounded-full border-2 border-white dark:border-slate-900 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCwJxH8ut0zI1fvUf1UVSFcFkxgM3Fgi9ObGhmcFSnfFkyGBaUthfnqOBTZjkerj30Zvjvz-3gr3weGILSuxw6049I_JkuydjrG_IIUrbn3USAN4VJ4xLAp2MphFjD-luVl2KZ_Vf3mMvkyymYcIf13UWYVKqz22BGd212h2KlyoLdJUKv37zdRf-tLzR9Yed5w5x3DvQCG0SHqu2yFmfydtBCVaBZGjWC5tFBBnSuD1c2twKwtmxoVlS6rSChJyRY4qXKF6fzkQ-k')" }}></div>
                          <div className="h-8 w-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-100 flex items-center justify-center text-[10px] font-bold">+2</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-600 uppercase">Filled</span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-[#135bec] hover:underline text-sm font-bold cursor-pointer">Edit</button>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold">Intensive Care Unit</span>
                          <span className="text-xs text-slate-500">West Wing</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="material-symbols-outlined text-slate-400 text-base">schedule</span>
                          08:00 - 16:00
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex -space-x-2">
                          <div className="h-8 w-8 rounded-full border-2 border-white dark:border-slate-900 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC6stfn70wh72tqJOTKKmPCgOxQs65FhRXB3diBj6CnAbaBDOrO-ON3GvdO_3ypgwOUeVDSbfoyT0z0Md-IDpGjxtBMe72HOGw0AEQOrYe3sxJOqS_aF0gIU0YQs0AZZtNgeyRD5SemeuWCOkAWV049ymoLAGN_PIc2U24p6WY_1WlS3Tjs4em6VHiMxDT2kfMoPTlkq5f_E_YXswEDy2U4AGWyPZiEkgPTWdJqPBxQn-2NdbdspkxUm3Ry9f9Hucl4eD8cc9IgFPM')" }}></div>
                          <div className="h-8 w-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 flex items-center justify-center border-dashed"><span className="material-symbols-outlined text-slate-400 text-sm">add</span></div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-600 uppercase">Pending</span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-[#135bec] hover:underline text-sm font-bold cursor-pointer">Manage</button>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold">Pediatrics</span>
                          <span className="text-xs text-slate-500">North Block, Level 3</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="material-symbols-outlined text-slate-400 text-base">schedule</span>
                          22:00 - 06:00
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs text-rose-500 font-bold italic">No staff assigned</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-100 text-rose-600 uppercase">Urgent</span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-[#135bec] hover:underline text-sm font-bold cursor-pointer">Assign Now</button>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold">Radiology</span>
                          <span className="text-xs text-slate-500">Basement Wing</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="material-symbols-outlined text-slate-400 text-base">schedule</span>
                          16:00 - 00:00
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex -space-x-2">
                          <div className="h-8 w-8 rounded-full border-2 border-white dark:border-slate-900 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCO-2nhm3n8FUg9VbslMX-YrKfYe1h-pow4neiauRVpTBvPq1sNCx2XXA1H0TNDEwNVomvfzoRXPj-7F62VcXemquAkRLzM5NO8BbsYB1qRoO3DD5fwLqONVgg-zEIGBhsQAKdgeV52s8N2CRr9NVtMsaVfd039eHoKj6h10dnWm3drlAE1tXOT2KObEysiKPbJfcpGETtxPQD_4LD83R9rJEtQIOLuuC1uCIoYxbcbytFQuS3poqDSos5RYT5fmmGhU79uyBk7CEk')" }}></div>
                          <div className="h-8 w-8 rounded-full border-2 border-white dark:border-slate-900 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAHqzB3er9DWGmZsKHcIfoXv3QN0jih5dy7J1-JkCRzlB4ikjEhsw_VTOB38hiyVymj-amL9SXaR903gRXILzsaJq8AP4QSDNvUsQtawY47FzSyovladwmfOxCz00TXi1jATW6jQi3QJ6M-WLAMFDkdiST8AtVNSkNN-Qzqs9K-roKhXjXg9h_CQCBaMU5gxnVpj9rjsAQ0g2wZRuvsc9rgYY3unb59N2fJH-XRFK3IOA_xgUdYttDRw8zkTBvYNhj3xAcUYNo5NEg')" }}></div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-600 uppercase">Filled</span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-[#135bec] hover:underline text-sm font-bold cursor-pointer">Edit</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <p className="text-xs text-slate-500 font-medium">Showing 4 of 28 active shifts</p>
                <div className="flex gap-1">
                  <button className="p-1 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 disabled:opacity-50 cursor-pointer" disabled>
                    <span className="material-symbols-outlined text-sm">chevron_left</span>
                  </button>
                  <button className="p-1 rounded bg-[#135bec] text-white text-xs font-bold px-3 cursor-pointer">1</button>
                  <button className="p-1 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold px-3 hover:bg-slate-50 cursor-pointer">2</button>
                  <button className="p-1 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold px-3 hover:bg-slate-50 cursor-pointer">3</button>
                  <button className="p-1 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50 cursor-pointer">
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HospitalDashboard;