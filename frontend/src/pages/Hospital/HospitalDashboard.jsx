import React from 'react';
import HospitalSidebar from '../Hospital/HospitalSidebar';
import HospitalHeader from '../Hospital/HospitalHeader';

const HospitalDashboard = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">
      <div className="flex h-screen overflow-hidden">
       {/* Pass 'dashboard' as the active page */}
        <HospitalSidebar activePage="dashboard" />
        
        <main className="flex-1 flex flex-col overflow-y-auto">
          <HospitalHeader />
          
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
            
            {/* Data Table Section */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <h2 className="text-lg font-bold">Current Shifts</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 dark:bg-slate-800/50">
                    <tr>
                      <th className="px-6 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Department</th>
                      <th className="px-6 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Shift Time</th>
                      <th className="px-6 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Assigned Staff</th>
                      <th className="px-6 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
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