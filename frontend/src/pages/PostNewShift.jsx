import React from 'react';

const PostNewShift = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased min-h-screen font-inter">
      <div className="flex">
        <aside className="w-64 fixed h-screen bg-card-light dark:bg-card-dark border-r border-slate-200 dark:border-slate-800 flex flex-col z-20">
          <div className="p-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-purple rounded-xl flex items-center justify-center">
              <span className="material-icons-round text-white">medical_services</span>
            </div>
            <div>
              <h1 className="font-bold text-lg leading-none">MediCenter</h1>
              <span className="text-xs text-slate-500">Staff Management</span>
            </div>
          </div>
          <nav className="flex-1 px-4 mt-4 space-y-1 overflow-y-auto">
            <a className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors" href="#">
              <span className="material-icons-round text-xl">dashboard</span>
              <span className="font-medium">Dashboard</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 bg-purple-600/10 text-purple-600 rounded-lg transition-colors" href="#">
              <span className="material-icons-round text-xl text-primary-purple">groups</span>
              <span className="font-medium">Staffing</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors" href="#">
              <span className="material-icons-round text-xl">calendar_today</span>
              <span className="font-medium">Schedules</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors" href="#">
              <span className="material-icons-round text-xl">bar_chart</span>
              <span className="font-medium">Reports</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors" href="#">
              <span className="material-icons-round text-xl">settings</span>
              <span className="font-medium">Settings</span>
            </a>
          </nav>
          <div className="mt-auto p-4 border-t border-slate-200 dark:border-slate-800 bg-card-light dark:bg-card-dark">
            <button className="w-full bg-primary-purple hover:bg-opacity-90 text-white py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-semibold transition-all shadow-lg shadow-primary-purple/20">
              <span className="material-icons-round text-lg">person_add</span>
              Add New Staff
            </button>
          </div>
        </aside>
        <main className="flex-1 ml-64 min-h-screen">
          <header className="h-20 bg-card-light/80 dark:bg-card-dark/80 backdrop-blur-md sticky top-0 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 z-10">
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-xl w-96">
              <span className="material-icons-round text-slate-400">search</span>
              <input className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder-slate-400" placeholder="Search staff, shifts, or departments..." type="text" />
            </div>
            <div className="flex items-center gap-6">
              <button className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 relative">
                <span className="material-icons-round">notifications</span>
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-800"></span>
              </button>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-bold leading-none">Admin User</p>
                  <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Hospital Admin</p>
                </div>
                <img alt="Admin Profile" className="w-10 h-10 rounded-full object-cover ring-2 ring-primary-purple/20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlQ13rjH8MgSi1qDduXpNSvel4cu2LaIhSesyNUVL--LG6fqrFJsDIQtvJp0wKKzTvqvFfyZ3WKvnBaFWo1m9w7HLaOqp_zcJDCKJvtIoUYa9uRQWcPjh8wou5Jiz3obgapsdXAQS1aP2PMyJXNdUWMTwLPmTtZ8_wB9PmmKkC8a0WydeCwvhTubCiZteygLOHDZhvmrFKbgh6yVgMv4zkXcHMftQJQniMTP6vTcAZLpFUxl6CcJgLCcPtYv17flpgI3lm590AxHo" />
              </div>
            </div>
          </header>
          <div className="p-8 max-w-5xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
              <a className="hover:text-primary-purple" href="#">Staffing</a>
              <span className="material-icons-round text-xs">chevron_right</span>
              <span className="text-slate-900 dark:text-white font-medium">Post New Shift</span>
            </nav>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Post New Shift</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8">Fill in the details below to broadcast a new shift to qualified staff.</p>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <section className="bg-card-light dark:bg-card-dark rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <span className="material-icons-round">medical_information</span>
                  </div>
                  <h3 className="text-lg font-bold">Role & Department</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Role</label>
                    <div className="relative">
                      <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">medical_services</span>
                      <select className="w-full pl-11 pr-4 py-3 rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-primary-purple focus:border-primary-purple appearance-none">
                        <option>Registered Nurse (RN)</option>
                        <option>Doctor</option>
                        <option>Assistant</option>
                      </select>
                      <span className="material-icons-round absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Department</label>
                    <div className="relative">
                      <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">apartment</span>
                      <select className="w-full pl-11 pr-4 py-3 rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-primary-purple focus:border-primary-purple appearance-none">
                        <option>Emergency Room (ER)</option>
                        <option>ICU</option>
                        <option>Pediatrics</option>
                      </select>
                      <span className="material-icons-round absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Staff Count</label>
                    <div className="flex items-center justify-between w-full md:w-1/2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl">
                      <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 transition-colors" type="button">
                        <span className="material-icons-round">remove</span>
                      </button>
                      <span className="text-lg font-bold">2</span>
                      <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 transition-colors" type="button">
                        <span className="material-icons-round">add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </section>
              <section className="bg-card-light dark:bg-card-dark rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <span className="material-icons-round">schedule</span>
                  </div>
                  <h3 className="text-lg font-bold">Shift Timing</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Date</label>
                    <div className="relative">
                      <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">calendar_today</span>
                      <input className="w-full pl-11 pr-4 py-3 rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-primary-purple focus:border-primary-purple" type="text" defaultValue="Oct 24, 2024" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Start Time</label>
                    <div className="relative">
                      <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">access_time</span>
                      <input className="w-full pl-11 pr-4 py-3 rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-primary-purple focus:border-primary-purple" type="text" defaultValue="08:00 AM" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">End Time</label>
                    <div className="relative">
                      <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">history</span>
                      <input className="w-full pl-11 pr-4 py-3 rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-primary-purple focus:border-primary-purple" type="text" defaultValue="04:00 PM" />
                    </div>
                  </div>
                </div>
              </section>
              <section className="bg-card-light dark:bg-card-dark rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                    <span className="material-icons-round">assignment</span>
                  </div>
                  <h3 className="text-lg font-bold">Requirements</h3>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Description & Responsibilities</label>
                  <textarea className="w-full px-4 py-3 rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-primary-purple focus:border-primary-purple resize-none" placeholder="Detail any specific qualifications or duties for this shift..." rows="4"></textarea>
                </div>
              </section>
              <div className="flex items-center justify-end gap-4 pt-4 pb-12">
                <button className="px-8 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors" type="button">
                  Save as Draft
                </button>
                <button className="px-8 py-3 bg-primary-purple hover:bg-opacity-90 text-white font-semibold rounded-xl shadow-lg shadow-primary-purple/20 transition-all" type="submit">
                  Post New Shift
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PostNewShift;
