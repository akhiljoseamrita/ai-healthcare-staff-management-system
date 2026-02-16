import React, { useEffect, useMemo, useState } from 'react';
import StaffSidebar from './StaffSidebar';
import StaffHeader from './StaffHeader';
import StaffProfileModal from './StaffProfileModal';

import { approveStaffApplication, getStaffSchedule, withdrawStaffApplication } from '../../services/api';
import { getStaffId } from '../../services/staffSession';
import { useToast } from '../../components/toastContext';

const StaffShiftDetails = () => {
  const toast = useToast();
  const [groups, setGroups] = useState([]);
  const [currentGroupId, setCurrentGroupId] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [isApproving, setIsApproving] = useState(false);

  const currentGroup = useMemo(() => {
    return groups.find((item) => item.id === currentGroupId) || groups[0] || null;
  }, [groups, currentGroupId]);

  const loadSchedule = async () => {
    const staffId = getStaffId();
    if (!staffId) {
      const message = 'Please login as staff first.';
      toast.error(message);
      setIsLoading(false);
      return;
    }

    const response = await getStaffSchedule({ staffId });
    const rows = response.results || [];
    setGroups(rows);
    if (!currentGroupId && rows.length > 0) {
      setCurrentGroupId(rows[0].id);
    }
  };

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        await loadSchedule();
      } catch (err) {
        const message = err.message || 'Unable to load schedule.';
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleWithdraw = async (applicationId) => {
    const staffId = getStaffId();
    if (!staffId) {
      const message = 'Please login as staff first.';
      toast.error(message);
      return;
    }

    setIsWithdrawing(true);
    try {
      await withdrawStaffApplication({ applicationId, staffId });
      await loadSchedule();
      toast.success('Application withdrawn successfully.');
    } catch (err) {
      const message = err.message || 'Unable to withdraw application.';
      toast.error(message);
    } finally {
      setIsWithdrawing(false);
    }
  };

  const handleApprove = async (applicationId) => {
    const staffId = getStaffId();
    if (!staffId) {
      const message = 'Please login as staff first.';
      toast.error(message);
      return;
    }

    setIsApproving(true);
    try {
      await approveStaffApplication({ applicationId, staffId });
      await loadSchedule();
      toast.success('Invitation approved. Shift confirmed.');
    } catch (err) {
      const message = err.message || 'Unable to approve invitation.';
      toast.error(message);
    } finally {
      setIsApproving(false);
    }
  };

  const confirmedShifts = currentGroup?.confirmed_shifts || [];
  const pendingApplications = currentGroup?.pending_applications || [];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 font-display text-slate-900 dark:text-slate-100 h-screen flex overflow-hidden">
      <StaffSidebar activePage="shift-details" />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <StaffHeader />

        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">My Schedule</h2>
              <p className="text-slate-500 text-sm mt-1">
                Viewing jobs for: <span className="text-[#135bec] font-bold">{currentGroup?.title || 'N/A'}</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2 space-y-8">
              <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                    <span className="material-symbols-outlined text-emerald-500">check_circle</span>
                    Confirmed Shifts ({confirmedShifts.length})
                  </h3>
                </div>
                <div className="p-6">
                  {isLoading ? (
                    <div className="text-center py-8 text-slate-400 text-sm">Loading...</div>
                  ) : confirmedShifts.length > 0 ? (
                    confirmedShifts.map((shift) => (
                      <div key={shift.assignment_id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 mb-3 last:mb-0">
                        <div>
                          <p className="font-bold text-sm text-slate-900 dark:text-white">{shift.name}</p>
                          <p className="text-xs text-slate-500">{shift.role}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-bold uppercase text-emerald-500">{shift.status}</p>
                          <p className="text-[10px] text-slate-400">{shift.date} • {shift.time}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-slate-400 text-sm">No confirmed shifts in this category yet.</div>
                  )}
                </div>
              </section>

              <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                  <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                    <span className="material-symbols-outlined text-amber-500">hourglass_top</span>
                    Pending Applications ({pendingApplications.length})
                  </h3>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {pendingApplications.length > 0 ? (
                    pendingApplications.map((hospital) => (
                      <div key={hospital.application_id} className="p-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                        <div className="flex items-center gap-4 cursor-pointer" onClick={() => setSelectedHospital(hospital)}>
                          <div>
                            <p className="font-bold text-sm text-slate-900 dark:text-white">{hospital.name}</p>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-slate-500 font-bold bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-1.5 py-0.5 rounded">{hospital.pay}</span>
                              <span className="text-xs text-slate-400">{hospital.status}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            disabled={isWithdrawing}
                            className="px-4 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-bold hover:border-red-500/50 hover:text-red-600 transition-all cursor-pointer"
                            onClick={() => handleWithdraw(hospital.application_id)}
                          >
                            {isWithdrawing ? 'Withdrawing...' : 'Withdraw'}
                          </button>
                          {hospital.status === 'SHORTLISTED' ? (
                            <button
                              disabled={isApproving}
                              className="px-4 py-2 rounded-lg bg-[#135bec] text-white text-sm font-bold hover:bg-[#135bec]/90 transition-all cursor-pointer shadow-md disabled:bg-[#135bec]/60"
                              onClick={() => handleApprove(hospital.application_id)}
                            >
                              {isApproving ? 'Approving...' : 'Approve'}
                            </button>
                          ) : (
                            <button disabled className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 text-sm font-bold border border-slate-200 dark:border-slate-700 cursor-not-allowed">
                              Applied
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10 text-slate-400 text-sm">No pending applications.</div>
                  )}
                </div>
              </section>
            </div>

            <aside className="space-y-6">
              <section className="bg-[#135bec]/5 dark:bg-[#135bec]/10 rounded-2xl border-2 border-[#135bec]/20 p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">My Job Groups</h3>
                  <p className="text-xs text-slate-500">Filter by category</p>
                </div>

                {groups.map((group) => (
                  <div
                    key={group.id}
                    onClick={() => setCurrentGroupId(group.id)}
                    className={`p-4 bg-white dark:bg-gray-900 border rounded-xl hover:shadow-md transition-all cursor-pointer ${currentGroup?.id === group.id ? 'border-[#135bec] ring-1 ring-[#135bec]' : 'border-gray-100 dark:border-gray-800 hover:border-[#135bec]/30'}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${currentGroup?.id === group.id ? 'bg-[#135bec]' : 'bg-slate-300'}`} />
                        <h3 className="text-[#140d1b] dark:text-gray-100 text-[15px] font-bold leading-tight">{group.title}</h3>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <div className="flex items-center gap-1 px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-md text-[11px] font-medium border border-gray-100 dark:border-gray-700">
                        <span className="material-symbols-outlined text-[14px]">history</span>
                        {group.last_activity || 'Updated'}
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium border bg-emerald-50 text-emerald-600 border-emerald-100">
                        <span className="material-symbols-outlined text-[14px]">check_circle</span>
                        {group.confirmed_shifts.length}
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium border bg-amber-50 text-amber-600 border-amber-100">
                        <span className="material-symbols-outlined text-[14px]">hourglass_top</span>
                        {group.pending_applications.length}
                      </div>
                    </div>
                  </div>
                ))}
              </section>
            </aside>
          </div>
        </main>
      </div>

      {selectedHospital ? (
        <StaffProfileModal
          staff={{
            name: selectedHospital.name,
            role: `Hospital • ${selectedHospital.pay}`,
            rating: selectedHospital.rating || 4.5,
            reviews: 100,
            status: selectedHospital.status || 'Open',
            location: 'N/A',
            country: 'N/A',
            experience: 'N/A',
          }}
          onClose={() => setSelectedHospital(null)}
        />
      ) : null}
    </div>
  );
};

export default StaffShiftDetails;
