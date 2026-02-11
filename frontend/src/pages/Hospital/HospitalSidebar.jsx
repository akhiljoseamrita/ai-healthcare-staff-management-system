import React from 'react';
import { useNavigate } from 'react-router-dom';
import { clearHospitalId, clearHospitalTokens } from '../../services/hospitalSession';

const HospitalSidebar = ({ activePage }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearHospitalTokens();
    clearHospitalId();
    navigate('/hospital/login');
  };

  // Helper classes for active/inactive links
  const baseLinkClass = "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors";
  const activeClass = "bg-[#135bec]/10 text-[#135bec]";
  const inactiveClass = "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800";

  return (
    <aside className="w-64 flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex-shrink-0">
      <div className="p-6 flex flex-col h-full">
        {/* Logo Section */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center gap-1">
            <div className="text-[#135bec] flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">medical_services</span>
            </div>
            <h2 className="text-[#135bec] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Healthcare</h2>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 flex-1">
          <a 
            href="/hospital/dashboard" 
            className={`${baseLinkClass} ${activePage === 'dashboard' ? activeClass : inactiveClass}`}
          >
            <span className="material-symbols-outlined text-[22px]">dashboard</span>
            <span className="text-sm font-medium">Dashboard</span>
          </a>

          <a 
            href="/hospital/post-shift" 
            className={`${baseLinkClass} ${activePage === 'staffing' ? activeClass : inactiveClass}`}
          >
            <span className="material-symbols-outlined text-[22px]">groups</span>
            <span className="text-sm font-medium">Staffing</span>
          </a>

         <a 
            href="/hospital/analytics" 
            className={`${baseLinkClass} ${activePage === 'recommendations' ? activeClass : inactiveClass}`}
          >
            <span className="material-symbols-outlined text-[22px]">auto_awesome</span>
            <span className="text-sm font-medium">AI Recommendations</span>
          </a>

          <a 
            href="/hospital/manage-shift" 
            className={`${baseLinkClass} ${activePage === 'manage-shift' ? activeClass : inactiveClass}`}
          >
            <span className="material-symbols-outlined text-[22px]">schedule</span>
            <span className="text-sm font-medium">Shift Management</span>
          </a>
          <a 
            href="/hospital/search" 
            className={`${baseLinkClass} ${activePage === 'directory-search' ? activeClass : inactiveClass}`}
          >
            <span className="material-symbols-outlined text-[22px]">manage_search</span>
            <span className="text-sm font-medium">Directory Search</span>
          </a>
          <a 
            href="/coming-soon" 
            className={`${baseLinkClass} ${activePage === 'settings' ? activeClass : inactiveClass}`}
          >
            <span className="material-symbols-outlined text-[22px]">settings</span>
            <span className="text-sm font-medium">Settings</span>
          </a>
        </nav>

        {/* Logout Button */}
        <div className="mt-auto pt-6">
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
  );
};

export default HospitalSidebar;
