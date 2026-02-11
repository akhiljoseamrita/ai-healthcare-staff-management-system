import React, { useEffect, useMemo, useState } from 'react';
import HospitalSidebar from '../Hospital/HospitalSidebar';
import HospitalHeader from '../Hospital/HospitalHeader';

import { getHospitalShiftSummary } from '../../services/api';
import { getHospitalId } from '../../services/hospitalSession';
import { useToast } from '../../components/toastContext';

const HospitalDashboard = () => {
  const toast = useToast();
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const hospitalId = getHospitalId();
      if (!hospitalId) {
        const message = 'Please login as hospital first.';
        toast.error(message);
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const response = await getHospitalShiftSummary({ hospitalId });
        setRows(response.results || []);
      } catch (err) {
        const message = err.message || 'Unable to load dashboard data.';
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [toast]);

  const metrics = useMemo(() => {
    const openShifts = rows.filter((item) => item.status === 'OPEN').length;
    const totalApplicants = rows.reduce((sum, item) => sum + (item.applicant_count || 0), 0);
    const totalAssignments = rows.reduce((sum, item) => sum + (item.assigned_count || 0), 0);
    const fillRatio = rows.length
      ? Math.round(
          (rows.reduce((sum, item) => sum + (item.assigned_count || 0), 0) /
            Math.max(rows.reduce((sum, item) => sum + (item.capacity || 0), 0), 1)) *
            100
        )
      : 0;

    return {
      totalActiveStaff: totalAssignments,
      openShifts,
      staffingRatio: fillRatio,
      pendingApprovals: totalApplicants,
    };
  }, [rows]);

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">
      <div className="flex h-screen overflow-hidden">
        <HospitalSidebar activePage="dashboard" />

        <main className="flex-1 flex flex-col overflow-y-auto">
          <HospitalHeader />

          <div className="p-8">
            <div className="flex items-end justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">At a Glance</h2>
                <p className="text-slate-500 text-sm mt-1">Real-time staffing metrics for the current cycle.</p>
              </div>
              <div className="text-xs font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full uppercase tracking-widest">
                Updated now
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <p className="text-slate-500 text-sm font-medium">Total Active Staff</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-2xl font-bold">{metrics.totalActiveStaff}</span>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <p className="text-slate-500 text-sm font-medium">Open Shifts</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-2xl font-bold">{metrics.openShifts}</span>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <p className="text-slate-500 text-sm font-medium">Staffing Ratio</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-2xl font-bold">{metrics.staffingRatio}%</span>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <p className="text-slate-500 text-sm font-medium">Pending Approvals</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-2xl font-bold">{metrics.pendingApprovals}</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <h2 className="text-lg font-bold">Current Shifts</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 dark:bg-slate-800/50">
                    <tr>
                      <th className="px-6 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Shift</th>
                      <th className="px-6 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Posted</th>
                      <th className="px-6 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Assigned</th>
                      <th className="px-6 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {isLoading ? (
                      <tr>
                        <td className="px-6 py-4 text-sm text-slate-500" colSpan={4}>Loading...</td>
                      </tr>
                    ) : rows.length === 0 ? (
                      <tr>
                        <td className="px-6 py-4 text-sm text-slate-500" colSpan={4}>No shifts found.</td>
                      </tr>
                    ) : (
                      rows.slice(0, 12).map((row) => (
                        <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="text-sm font-bold">{row.title}</span>
                              <span className="text-xs text-slate-500">Applicants: {row.applicant_count}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm">{row.time}</td>
                          <td className="px-6 py-4 text-sm">{row.assigned_count}/{row.capacity}</td>
                          <td className="px-6 py-4">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-600 uppercase">
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HospitalDashboard;
