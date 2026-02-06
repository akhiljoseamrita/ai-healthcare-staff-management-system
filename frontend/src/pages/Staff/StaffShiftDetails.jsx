import React from 'react';

const StaffShiftDetails = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark text-[#131118] dark:text-white min-h-screen font-public-sans">
      <div className="relative flex min-h-screen w-full flex-col">
        {/* Top Navigation Bar */}
        <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-[#f2f0f4] dark:border-[#2d2a3d] bg-white dark:bg-[#1c1829] px-6 lg:px-10 py-3">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4 text-primary-deep">
              <div className="size-8">
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" fill="currentColor" fillRule="evenodd"></path>
                  <path clipRule="evenodd" d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z" fill="currentColor" fillRule="evenodd"></path>
                </svg>
              </div>
              <h2 className="text-[#131118] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Healthcare Portal</h2>
            </div>
            <label className="hidden md:flex flex-col min-w-40 !h-10 max-w-64">
              <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                <div className="text-[#6f6189] dark:text-gray-400 flex border-none bg-[#f2f0f4] dark:bg-[#2d2a3d] items-center justify-center pl-4 rounded-l-lg">
                  <span className="material-symbols-outlined">search</span>
                </div>
                <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#131118] dark:text-white focus:outline-0 focus:ring-0 border-none bg-[#f2f0f4] dark:bg-[#2d2a3d] h-full placeholder:text-[#6f6189] px-4 rounded-l-none pl-2 text-base font-normal" placeholder="Search shifts, facilities..." />
              </div>
            </label>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-[#f2f0f4] dark:bg-[#2d2a3d] text-[#131118] dark:text-white">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-[#f2f0f4] dark:bg-[#2d2a3d] text-[#131118] dark:text-white">
              <span className="material-symbols-outlined">help</span>
            </button>
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary-deep" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDLC95kqVLQDcc0Ffh6HFxKPHbsCTxwwMFdR0Xc5BPTk1Cq0vpOgsrrHQDPE9Z9jiwS8lIbI-xbT9DRXRU6vWpDjdqCuF9_HgKbpE2Dh75f4h3r-74zFqDTy-ncKUaoygHaFAebcD-8IGkDJaJQF8VaL4s7p1OV-R2YYQxh2F_SBei-b2sRqDdBpI2hBXWMfC05kRn_WF58a9frwx3sHNRz-OE67GEqF8B5-0ZC70Jl4MzGTKyf6EAKzyoRUK14ZTLRTKQWUKzAs5A')" }}></div>
          </div>
        </header>
        <div className="flex flex-1">
          {/* Side Navigation Bar */}
          <aside className="hidden lg:flex w-64 flex-col justify-between border-r border-[#f2f0f4] dark:border-[#2d2a3d] bg-white dark:bg-[#1c1829] p-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col mb-4 px-3">
                <h1 className="text-[#131118] dark:text-white text-base font-bold leading-normal">Sarah Jenkins, RN</h1>
                <p className="text-[#6f6189] dark:text-gray-400 text-sm font-normal">Registered Nurse - ER Specialist</p>
              </div>
              <nav className="flex flex-col gap-1">
                <a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#f2f0f4] dark:hover:bg-[#2d2a3d] transition-colors" href="#">
                  <span className="material-symbols-outlined text-[#131118] dark:text-white">dashboard</span>
                  <p className="text-[#131118] dark:text-white text-sm font-medium">Dashboard</p>
                </a>
                <a className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary-deep/10 text-primary-deep" href="#">
                  <span className="material-symbols-outlined material-symbols-fill">calendar_month</span>
                  <p className="text-sm font-bold">Shift Management</p>
                </a>
                <a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#f2f0f4] dark:hover:bg-[#2d2a3d] transition-colors" href="#">
                  <span className="material-symbols-outlined text-[#131118] dark:text-white">schedule</span>
                  <p className="text-[#131118] dark:text-white text-sm font-medium">My Schedule</p>
                </a>
                <a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#f2f0f4] dark:hover:bg-[#2d2a3d] transition-colors" href="#">
                  <span className="material-symbols-outlined text-[#131118] dark:text-white">payments</span>
                  <p className="text-[#131118] dark:text-white text-sm font-medium">Earnings</p>
                </a>
                <a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#f2f0f4] dark:hover:bg-[#2d2a3d] transition-colors" href="#">
                  <span className="material-symbols-outlined text-[#131118] dark:text-white">person</span>
                  <p className="text-[#131118] dark:text-white text-sm font-medium">Profile</p>
                </a>
              </nav>
            </div>
            <div className="px-3 py-4 border-t border-[#f2f0f4] dark:border-[#2d2a3d]">
              <button className="flex items-center gap-3 text-red-500 font-medium">
                <span className="material-symbols-outlined">logout</span>
                <span>Logout</span>
              </button>
            </div>
          </aside>
          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto pb-24">
            <div className="max-w-5xl mx-auto px-6 py-6 flex flex-col gap-6">
              {/* Breadcrumbs */}
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <a className="text-[#6f6189] dark:text-gray-400 font-medium hover:text-primary-deep" href="#">Shift Management</a>
                <span className="material-symbols-outlined text-[#6f6189] text-xs">chevron_right</span>
                <span className="text-[#131118] dark:text-white font-semibold">ER Nurse Details</span>
              </div>
              {/* Shift Header Card */}
              <div className="bg-white dark:bg-[#1c1829] rounded-xl shadow-sm border border-[#f2f0f4] dark:border-[#2d2a3d] overflow-hidden">
                <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6">
                  <div className="h-32 w-full md:w-48 bg-cover bg-center rounded-lg shrink-0" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC0uCRgQlkdkGHlSRK0edMDXA6d7thBPsMky49Nm80x4iD7OvErUlbxmi8wiy5YZhO90SJQeAqqxn1BxywO-wyKhpnhC3A9U7HBXMBfYtYMlBBCAXtZxaUVoJFBsXSq3x7xYSIek8H8CfaoM-7De97hYzkuox-8EQHDM1sIMtARMSZvj4P6UpD2rphMsa-75V9T0myY8d0946CbaX5Bm7g1ZS-BS06Q-pGpCJT583LBdP5HnVym0uihRxYaUO2QNo_D70G_HHOCOcA')" }}></div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
                      <span className="px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-wider">Urgent Fill</span>
                      <div className="flex items-center gap-1 text-primary-deep">
                        <span className="material-symbols-outlined text-sm material-symbols-fill">bolt</span>
                        <span className="text-sm font-bold">High Demand</span>
                      </div>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-[#131118] dark:text-white mb-2">Emergency Room Nurse</h1>
                    <p className="text-[#6f6189] dark:text-gray-400 flex items-center gap-2 mb-4">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      City General Hospital • Level 1 Trauma Center
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 border-t border-[#f2f0f4] dark:border-[#2d2a3d]">
                      <div className="flex flex-col">
                        <p className="text-xs uppercase text-[#6f6189] dark:text-gray-400 font-bold mb-1">Time & Date</p>
                        <p className="font-bold text-[#131118] dark:text-white">Friday, Oct 25th</p>
                        <p className="text-[#6f6189] dark:text-gray-400">07:00 - 19:00 (12 hrs)</p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-xs uppercase text-[#6f6189] dark:text-gray-400 font-bold mb-1">Pay Rate</p>
                        <p className="font-bold text-[#131118] dark:text-white text-xl">$75.00/hr</p>
                        <p className="text-[#6f6189] dark:text-gray-400">Est. Total: $900.00</p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-xs uppercase text-[#6f6189] dark:text-gray-400 font-bold mb-1">Unit</p>
                        <p className="font-bold text-[#131118] dark:text-white">Emergency Dept</p>
                        <p className="text-[#6f6189] dark:text-gray-400">Shift ID: #29402-A</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Details & Accordions */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                  {/* AI Match Card */}
                  <div className="bg-primary-deep/5 border border-primary-deep/20 rounded-xl p-5 flex items-start gap-4">
                    <div className="bg-primary-deep/20 p-2 rounded-lg text-primary-deep">
                      <span className="material-symbols-outlined material-symbols-fill">auto_awesome</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-primary-deep mb-1">AI Match Notes</h3>
                      <ul className="text-sm space-y-1 text-[#131118] dark:text-gray-200">
                        <li className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-xs text-green-500 material-symbols-fill">check_circle</span>
                          Matches your Friday availability
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-xs text-green-500 material-symbols-fill">check_circle</span>
                          Preferred facility (4.8★ your rating)
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-xs text-green-500 material-symbols-fill">check_circle</span>
                          Required: ACLS, BLS certificates on file
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* Requirements Accordions */}
                  <div className="flex flex-col gap-3">
                    <div className="bg-white dark:bg-[#1c1829] border border-[#f2f0f4] dark:border-[#2d2a3d] rounded-lg overflow-hidden">
                      <button className="w-full flex items-center justify-between p-4 text-left font-bold text-[#131118] dark:text-white">
                        <span className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-primary-deep">verified</span>
                          Skills & Certifications
                        </span>
                        <span className="material-symbols-outlined">expand_less</span>
                      </button>
                      <div className="px-4 pb-4 text-sm text-[#6f6189] dark:text-gray-400 flex flex-wrap gap-2">
                        <span className="bg-[#f2f0f4] dark:bg-[#2d2a3d] px-3 py-1 rounded-full">ACLS Certification</span>
                        <span className="bg-[#f2f0f4] dark:bg-[#2d2a3d] px-3 py-1 rounded-full">BLS</span>
                        <span className="bg-[#f2f0f4] dark:bg-[#2d2a3d] px-3 py-1 rounded-full">2+ Years ER Exp</span>
                        <span className="bg-[#f2f0f4] dark:bg-[#2d2a3d] px-3 py-1 rounded-full">Triage Certified</span>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-[#1c1829] border border-[#f2f0f4] dark:border-[#2d2a3d] rounded-lg overflow-hidden">
                      <button className="w-full flex items-center justify-between p-4 text-left font-bold text-[#131118] dark:text-white">
                        <span className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-primary-deep">checkroom</span>
                          Dress Code
                        </span>
                        <span className="material-symbols-outlined">expand_more</span>
                      </button>
                    </div>
                    <div className="bg-white dark:bg-[#1c1829] border border-[#f2f0f4] dark:border-[#2d2a3d] rounded-lg overflow-hidden">
                      <button className="w-full flex items-center justify-between p-4 text-left font-bold text-[#131118] dark:text-white">
                        <span className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-primary-deep">info</span>
                          Shift Instructions
                        </span>
                        <span className="material-symbols-outlined">expand_more</span>
                      </button>
                    </div>
                  </div>
                </div>
                {/* Right Column: Map & Facility */}
                <div className="flex flex-col gap-6">
                  <div className="bg-white dark:bg-[#1c1829] rounded-xl shadow-sm border border-[#f2f0f4] dark:border-[#2d2a3d] overflow-hidden">
                    <div className="p-4 border-b border-[#f2f0f4] dark:border-[#2d2a3d]">
                      <h3 className="font-bold text-[#131118] dark:text-white">Location</h3>
                    </div>
                    <div className="p-4">
                      <div className="w-full bg-cover bg-center aspect-video rounded-lg mb-4" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBMViio9TfecfSrb4j2SY1gPanGwc0Am1JlQbwpfBlh4jv-oNsnAj7sreVqajvT73F4-Z1lSGwloKq450FW5JJD7qLMtvxtQUm5rHHYZuoIe82kAta0H-T0CARp_gP96lvz2sDIfXQKaRmXEud8oAGtpGVKe9mrLnT3VQs4bBCctC9mpwlgaLx1igW4hEyAFrgggauiYwAmzffQbE06e3neK2sSuRooLmJRWr282SeguYOyy8h2AyGv993nNTIYrRE_zCm4tLgfhZY')" }}></div>
                      <div className="flex flex-col gap-1">
                        <p className="font-bold text-sm text-[#131118] dark:text-white">City General Hospital</p>
                        <p className="text-xs text-[#6f6189] dark:text-gray-400">123 Health Blvd, Metro City, NY 10001</p>
                        <div className="mt-3 flex gap-2">
                          <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-[#f2f0f4] dark:bg-[#2d2a3d] rounded-lg text-sm font-bold">
                            <span className="material-symbols-outlined text-sm">directions</span> Directions
                          </button>
                          <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-[#f2f0f4] dark:bg-[#2d2a3d] rounded-lg text-sm font-bold">
                            <span className="material-symbols-outlined text-sm">call</span> Contact
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-[#1c1829] rounded-xl shadow-sm border border-[#f2f0f4] dark:border-[#2d2a3d] p-5">
                    <h3 className="font-bold text-[#131118] dark:text-white mb-3">Facility Stats</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-[#6f6189] dark:text-gray-400">Nurse Rating</span>
                        <span className="text-sm font-bold text-[#131118] dark:text-white flex items-center gap-1">4.8 <span className="material-symbols-outlined text-yellow-500 text-xs material-symbols-fill">star</span></span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-[#6f6189] dark:text-gray-400">On-time Payment</span>
                        <span className="text-sm font-bold text-green-500">100%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-[#6f6189] dark:text-gray-400">Break Policy</span>
                        <span className="text-sm font-bold text-[#131118] dark:text-white">Guaranteed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
        {/* Sticky Footer Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 lg:left-64 z-40 bg-white/80 dark:bg-[#1c1829]/80 backdrop-blur-md border-t border-[#f2f0f4] dark:border-[#2d2a3d] p-4 flex items-center justify-between px-6 lg:px-10">
          <div className="hidden md:flex flex-col">
            <span className="text-xs uppercase text-[#6f6189] dark:text-gray-400 font-bold">Estimated Total</span>
            <span className="text-xl font-bold text-[#131118] dark:text-white leading-none">$900.00</span>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-6 py-3 bg-[#f2f0f4] dark:bg-[#2d2a3d] text-[#131118] dark:text-white font-bold rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              Save for Later
            </button>
            <button className="flex-1 md:flex-none px-12 py-3 bg-primary-deep text-white font-bold rounded-lg shadow-lg shadow-primary-deep/30 hover:bg-[#4d10c9] transition-all transform active:scale-95">
              Apply for Shift
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffShiftDetails;
