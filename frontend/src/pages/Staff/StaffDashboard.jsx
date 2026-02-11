import React, { useEffect, useMemo, useState } from 'react';
import StaffSidebar from './StaffSidebar';
import StaffHeader from './StaffHeader';

import { getStaffDashboard } from '../../services/api';
import { getStaffId } from '../../services/staffSession';
import { useToast } from '../../components/toastContext';

const dayOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const StaffDashboard = () => {
  const toast = useToast();
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const staffId = getStaffId();
      if (!staffId) {
        const message = 'Please login as staff first.';
        toast.error(message);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const response = await getStaffDashboard({ staffId });
        setSummary(response);
      } catch (err) {
        const message = err.message || 'Unable to load dashboard.';
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [toast]);

  const weeklyHours = useMemo(() => {
    const values = summary?.weekly_performance_hours || {};
    return dayOrder.map((day) => ({
      day,
      hours: Number(values[day] || 0),
    }));
  }, [summary]);

  const maxHours = Math.max(...weeklyHours.map((d) => d.hours), 1);

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen font-public-sans transition-colors duration-300">
      <div className="flex h-screen overflow-hidden">
        <StaffSidebar activePage="dashboard" />

        <main className="flex-1 flex flex-col overflow-y-auto custom-scrollbar">
          <StaffHeader />
          <div className="max-w-[1400px] mx-auto px-8 py-8 w-full">
            <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  {summary?.greeting_name ? `Welcome, ${summary.greeting_name}` : 'Welcome'}
                </h1>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
                <p className="text-slate-500 text-sm font-medium">Pending Applications</p>
                <p className="text-3xl font-bold mt-2">{summary?.pending_applications ?? 0}</p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
                <p className="text-slate-500 text-sm font-medium">Accepted Shifts</p>
                <p className="text-3xl font-bold mt-2">{summary?.accepted_shifts ?? 0}</p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
                <p className="text-slate-500 text-sm font-medium">Completed Shifts</p>
                <p className="text-3xl font-bold mt-2">{summary?.completed_shifts ?? 0}</p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm mb-8">
              <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4">Weekly Performance (Hours)</h3>
              <div className="flex items-end justify-between gap-2 h-40">
                {weeklyHours.map((item) => {
                  const height = Math.max((item.hours / maxHours) * 100, 4);
                  return (
                    <div key={item.day} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full h-28 bg-slate-100 dark:bg-slate-700/50 rounded-t-lg relative overflow-hidden">
                        <div
                          className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-lg"
                          style={{ height: `${height}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-bold text-slate-500">{item.day}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-50 dark:border-slate-700 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-100">Recent Activity</h3>
                </div>
              </div>

              <div className="divide-y divide-slate-50 dark:divide-slate-700">
                {isLoading ? (
                  <div className="p-6 text-sm text-slate-500">Loading...</div>
                ) : (summary?.recent_activity || []).length === 0 ? (
                  <div className="p-6 text-sm text-slate-500">No recent activity found.</div>
                ) : (
                  summary.recent_activity.map((activity) => (
                    <div key={activity.application_id} className="p-6 flex items-start justify-between gap-4">
                      <div>
                        <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200">{activity.title}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          {activity.hospital} • {activity.department}
                        </p>
                      </div>
                      <span className="text-xs text-slate-400 font-medium whitespace-nowrap">{activity.time}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StaffDashboard;
