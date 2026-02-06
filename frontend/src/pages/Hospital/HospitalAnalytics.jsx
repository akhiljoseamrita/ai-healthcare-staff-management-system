import React from 'react';

const HospitalAnalytics = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-200 min-h-screen flex overflow-hidden font-inter">
      <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col shrink-0">
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-blue rounded-xl flex items-center justify-center text-white">
              <span className="material-symbols-rounded">medical_services</span>
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">CareSync</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Hospital Admin</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-4 space-y-1 mt-4">
          <a className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" href="#">
            <span className="material-symbols-rounded text-xl">dashboard</span>
            <span className="font-medium">Dashboard</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" href="#">
            <span className="material-symbols-rounded text-xl">group</span>
            <span className="font-medium">Staff Directory</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" href="#">
            <span className="material-symbols-rounded text-xl">calendar_today</span>
            <span className="font-medium">Shift Schedule</span>
          </a>
          <a className="bg-purple-600/10 text-purple-600 rounded-xl flex items-center gap-3 px-4 py-3 transition-colors" href="#">
            <span className="material-symbols-rounded text-xl">auto_awesome</span>
            <span className="font-medium">AI Recommendations</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" href="#">
            <span className="material-symbols-rounded text-xl">insights</span>
            <span className="font-medium">Analytics</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" href="#">
            <span className="material-symbols-rounded text-xl">settings</span>
            <span className="font-medium">Settings</span>
          </a>
        </nav>
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <img alt="Admin Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLkRCRVlZETuWMPFuk44Vl8XPz1c0sX3JhSosMtawjcED3NN9WbPqOZPPkHWPSajAChkF8v2T0QCaUWLDf4qO11YE-19yOoZr5bUwk4sIkPqJrF1kusKiWHwgl_SR_EHdwkPIPcMHJWDDyzVh93bPia38Ph8wAne8jIhCNIkFd3BIv3n1mcZD275zypio-BiEkmnjmlJnQpIBBRqXv8NluggaCz2Dz6SvulBEX6dWGmLlD8eVlTwRSPhjgocknHGWHH-9i4XtkqiA" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">Dr. Julian Vance</p>
              <p className="text-xs text-slate-500 truncate">Chief Administrator</p>
            </div>
          </div>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto p-8 lg:p-12">
        <header className="flex justify-between items-start mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Good morning, Julian</h2>
            <p className="text-slate-500 dark:text-slate-400">You have 12 critical shifts that need staffing today.</p>
          </div>
          <button className="px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold shadow-sm hover:shadow-md transition-all">
            Create New Shift
          </button>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-slate-800 dark:text-white">Staffing Needs</h3>
              <span className="text-xs font-medium text-primary-blue bg-blue-50 dark:bg-blue-900/20 px-2.5 py-1 rounded-full">Weekly View</span>
            </div>
            <div className="flex items-end gap-2 h-32 mb-4">
              <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-t-lg h-[60%]"></div>
              <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-t-lg h-[80%]"></div>
              <div className="flex-1 bg-primary-blue rounded-t-lg h-[100%]"></div>
              <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-t-lg h-[45%]"></div>
              <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-t-lg h-[70%]"></div>
              <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-t-lg h-[90%]"></div>
              <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-t-lg h-[55%]"></div>
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 uppercase tracking-wider">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-slate-800 dark:text-white">Unit Efficiency</h3>
              <span className="material-symbols-rounded text-slate-400">more_horiz</span>
            </div>
            <div className="flex items-center justify-center py-4">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full transform -rotate-90">
                  <circle className="text-slate-100 dark:text-slate-800" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeWidth="8"></circle>
                  <circle className="text-primary-blue" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeDasharray="364.4" strokeDashoffset="20" strokeWidth="8"></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold">94%</span>
                  <span className="text-[10px] text-slate-500 uppercase">Optimal</span>
                </div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-slate-500">Efficiency is 4% higher than last week</p>
            </div>
          </div>
        </div>
        <section>
          <h4 className="text-lg font-semibold mb-4">Pending Requests</h4>
          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <span className="material-symbols-rounded">medical_information</span>
                </div>
                <div>
                  <p className="font-medium">ICU - Night Shift (12h)</p>
                  <p className="text-xs text-slate-500">Requested 2h ago • Urgency: High</p>
                </div>
              </div>
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200"></div>
                <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-300"></div>
                <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-primary-blue flex items-center justify-center text-[10px] text-white">+5</div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <span className="material-symbols-rounded">emergency</span>
                </div>
                <div>
                  <p className="font-medium">ER - Swing Shift (8h)</p>
                  <p className="text-xs text-slate-500">Requested 4h ago • Urgency: Normal</p>
                </div>
              </div>
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200"></div>
                <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-primary-blue flex items-center justify-center text-[10px] text-white">+2</div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <aside className="w-[400px] border-l border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-col shrink-0">
        <div className="p-6 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex items-center gap-2">
            <span className="material-symbols-rounded text-primary-blue">auto_awesome</span>
            <h3 className="font-bold text-slate-800 dark:text-white">Smart Staff Matches</h3>
          </div>
          <button className="text-slate-400 hover:text-slate-600 transition-colors">
            <span className="material-symbols-rounded">settings</span>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-5">
              <div className="flex items-start gap-4 mb-4">
                <div className="relative">
                  <img alt="Staff Avatar" className="w-14 h-14 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCG92Q8fO3IQ0fvFM89kytl71mPrrIPfZ_T0T7V1Ut7CqlcAs_KEQ3GdHtlCUGTzZEL6ujwBXi8_QFF7vBzgea2b2eRSOWKCjEBICVP9A4ZOex-XQNJtvkBNjDQ-MXW9Husztq4BKTAospyaQk25qX8lusb_wssS-EpOkYuuJLhnBQR6ckma9T8nxoyxRrN8fTZn2CgZHSCSP4KidfzK0Cd9rHmXmiJl8aZjkPNaLWbHrib5nEpYd_9WsPJo8EfoU5ixNT-IYZtZZo" />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-slate-900 dark:text-white">Sarah Jenkins</h4>
                    <span className="material-symbols-rounded text-slate-300 text-sm">more_vert</span>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Senior ICU Nurse</p>
                </div>
              </div>
              <div className="mb-5">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-primary-blue">Match Confidence</span>
                  <span className="text-xs font-bold text-primary-blue">98%</span>
                </div>
                <div className="h-2 w-full bg-purple-100 dark:bg-purple-900/30 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-blue rounded-full w-[98%]"></div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-2.5 py-1 bg-purple-50 dark:bg-purple-900/20 text-primary-blue text-[11px] font-semibold rounded-lg flex items-center gap-1">
                  <span className="material-symbols-rounded text-[14px]">star</span> 100% Skill Match
                </span>
                <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[11px] font-semibold rounded-lg flex items-center gap-1">
                  <span className="material-symbols-rounded text-[14px]">favorite</span> Top rated in ICU
                </span>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-2.5 bg-primary-blue text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity">
                  Quick Invite
                </button>
                <button className="px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <span className="material-symbols-rounded">chat_bubble</span>
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-5">
              <div className="flex items-start gap-4 mb-4">
                <div className="relative">
                  <img alt="Staff Avatar" className="w-14 h-14 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoK_pAuakPftPthWnx2ZAa1wPmZVy1RWuU4liYCfyxiQTQAMFOy9kFqynwuvgFKeMngZn8bqaFzEOrEuFJroK8lXZueWfXR9swP2_SjwuzRdTZUQ17TO7dSVlvDvvfzQxCms2My3naFPogLwtsTmyi9z2uNtVSQXwEg1x6I-JOJZ-BiHnG6wFIGLojueokoYiEnWU4picOHKeeLJeRUp2QIoz9bT4Y0-fAzEcYZz1XgOLyr1fkAReFLSm1SDEleBI9MuO_iw_zzhc" />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-slate-900 dark:text-white">Marcus Thorne</h4>
                    <span className="material-symbols-rounded text-slate-300 text-sm">more_vert</span>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">ER Specialist</p>
                </div>
              </div>
              <div className="mb-5">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-primary-blue">Match Confidence</span>
                  <span className="text-xs font-bold text-primary-blue">92%</span>
                </div>
                <div className="h-2 w-full bg-purple-100 dark:bg-purple-900/30 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-blue rounded-full w-[92%]"></div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-2.5 py-1 bg-purple-50 dark:bg-purple-900/20 text-primary-blue text-[11px] font-semibold rounded-lg flex items-center gap-1">
                  <span className="material-symbols-rounded text-[14px]">local_shipping</span> Preferred Distance
                </span>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-2.5 bg-primary-blue text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity">
                  Quick Invite
                </button>
                <button className="px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <span className="material-symbols-rounded">chat_bubble</span>
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden opacity-80">
            <div className="p-5">
              <div className="flex items-start gap-4 mb-4">
                <div className="relative">
                  <img alt="Staff Avatar" className="w-14 h-14 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvo7MuBq1akATewIDKlEB524erQwRNQF2wdKa-oACSTW72DwTO-hOFCDdrYVJAGBn3Fbnj6ikMEOCl-preiYGY0s2bJMgxCzdAHlCCvbFBtLUNkh_mr1ccTvUoWDc1UyWjcrZp8pIs9wrnseuorxu4eOVIOAKn2qjB_P60DByZbBPVZ_cMELoubUEasjo5HZUXuNS9rucB-1U7mb2uYKU1ZVxkUvevX7w9dqzNpL46SLHH9thsEyUHv5vIJfI1xjepGovZiyjmRl8" />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-amber-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-slate-900 dark:text-white">Elena Rodriguez</h4>
                    <span className="material-symbols-rounded text-slate-300 text-sm">more_vert</span>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Radiology Tech</p>
                </div>
              </div>
              <div className="mb-5">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-primary-blue">Match Confidence</span>
                  <span className="text-xs font-bold text-primary-blue">85%</span>
                </div>
                <div className="h-2 w-full bg-purple-100 dark:bg-purple-900/30 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-blue rounded-full w-[85%]"></div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[11px] font-semibold rounded-lg flex items-center gap-1">
                  <span className="material-symbols-rounded text-[14px]">timer</span> Avail. in 2h
                </span>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-2.5 bg-primary-blue text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity">
                  Quick Invite
                </button>
                <button className="px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <span className="material-symbols-rounded">chat_bubble</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <button className="w-full text-center text-sm font-semibold text-slate-500 hover:text-primary-blue transition-colors">
            View All Recommendations
          </button>
        </div>
      </aside>
    </div>
  );
};

export default HospitalAnalytics;
