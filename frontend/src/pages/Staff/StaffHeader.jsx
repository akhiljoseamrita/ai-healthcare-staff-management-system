import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getStaffProfile } from '../../services/staffSession';

const initialNotifications = [
  { id: 1, title: 'New shift match available', detail: 'ICU day shift at City General Hospital', unread: true },
  { id: 2, title: 'Application shortlisted', detail: 'Emergency role moved to shortlist', unread: true },
  { id: 3, title: 'Profile reminder', detail: 'Update availability for weekend shifts', unread: false },
];

const StaffHeader = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(() => getStaffProfile());
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState(initialNotifications);
  const panelRef = useRef(null);

  useEffect(() => {
    const onStorage = () => setProfile(getStaffProfile());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  useEffect(() => {
    const onClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const unreadCount = useMemo(
    () => notifications.filter((item) => item.unread).length,
    [notifications]
  );

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, unread: false })));
  };

  const handleNotificationClick = (id) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, unread: false } : item))
    );
  };

  const displayName = profile?.fullName || 'Staff User';
  const displayProfession = profile?.profession || 'Staff';
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const q = searchTerm.trim();
    navigate(q ? `/staff/search?q=${encodeURIComponent(q)}` : '/staff/search');
  };

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-8 py-4">
      <div className="flex items-center gap-6 flex-1">
        <form onSubmit={handleSearchSubmit} className="relative w-full max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
          <input
            className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-[#135bec]/20 placeholder:text-slate-500 outline-none"
            placeholder="Search hospital , departments..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative" ref={panelRef}>
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="relative pt-[5px] pr-[5px] pb-[1px] pl-[5px] rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined">notifications</span>
            {unreadCount > 0 ? (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white dark:border-slate-900">
                {unreadCount}
              </span>
            ) : null}
          </button>

          {isOpen ? (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <p className="text-sm font-bold">Notifications</p>
                <button type="button" onClick={markAllAsRead} className="text-[11px] font-semibold text-[#135bec] hover:underline">
                  Mark all read
                </button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="px-4 py-6 text-sm text-slate-500">No notifications.</p>
                ) : (
                  notifications.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleNotificationClick(item.id)}
                      className="w-full text-left px-4 py-3 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <div className="flex items-start gap-2">
                        <span className={`mt-1 h-2 w-2 rounded-full ${item.unread ? 'bg-red-500' : 'bg-transparent'}`} />
                        <div>
                          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{item.title}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{item.detail}</p>
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          ) : null}
        </div>

        <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-2" />

        <div className="flex items-center gap-3 p-1 rounded-lg">
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold leading-none text-slate-900 dark:text-white">{displayName}</p>
            <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-wider">{displayProfession}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-[#135bec]/15 text-[#135bec] border border-[#135bec]/20 flex items-center justify-center text-sm font-bold">
            {displayName.slice(0, 2).toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
};

export default StaffHeader;
