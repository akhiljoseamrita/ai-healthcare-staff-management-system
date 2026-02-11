import React, { useEffect, useMemo, useState } from 'react';
import HospitalSidebar from './HospitalSidebar';
import HospitalHeader from './HospitalHeader';
import StaffProfileModal from '../Staff/StaffProfileModal';

import {
  assignHospitalShift,
  decideHospitalApplication,
  getHospitalShiftDetail,
  getHospitalShiftSummary,
} from '../../services/api';
import { getHospitalId } from '../../services/hospitalSession';
import { useToast } from '../../components/toastContext';

const toShiftCard = (item) => ({
  id: item.id,
  title: item.title,
  time: item.time,
  capacity: item.capacity,
  assigned: item.assigned || [],
  applicants: item.applicants || [],
});

const ManagerShiftManagement = () => {
  const toast = useToast();
  const [shiftsData, setShiftsData] = useState([]);
  const [currentShiftId, setCurrentShiftId] = useState(null);
  const [currentShiftDetail, setCurrentShiftDetail] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);

  const currentShift = useMemo(() => {
    return shiftsData.find((s) => s.id === currentShiftId) || shiftsData[0] || null;
  }, [shiftsData, currentShiftId]);

  const loadSummary = async () => {
    const hospitalId = getHospitalId();
    if (!hospitalId) {
      const message = 'Please login as hospital first.';
      toast.error(message);
      setIsLoading(false);
      return;
    }

    const response = await getHospitalShiftSummary({ hospitalId });
    const rows = (response.results || []).map(toShiftCard);
    setShiftsData(rows);
    if (!currentShiftId && rows.length > 0) {
      setCurrentShiftId(rows[0].id);
    }
  };

  const loadShiftDetail = async (jobId) => {
    if (!jobId) return;
    const response = await getHospitalShiftDetail(jobId);
    setCurrentShiftDetail(response);
  };

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        await loadSummary();
      } catch (err) {
        const message = err.message || 'Unable to load shifts.';
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    };

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast]);

  useEffect(() => {
    if (!currentShiftId) return;
    const load = async () => {
      try {
        await loadShiftDetail(currentShiftId);
      } catch (err) {
        const message = err.message || 'Unable to load shift detail.';
        toast.error(message);
      }
    };
    load();
  }, [currentShiftId, toast]);

  const handleDecline = async (applicationId) => {
    setIsActionLoading(true);
    try {
      await decideHospitalApplication({ applicationId, status: 'REJECTED' });
      await loadShiftDetail(currentShiftId);
      await loadSummary();
      toast.success('Application declined.');
    } catch (err) {
      const message = err.message || 'Unable to decline application.';
      toast.error(message);
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleAccept = async (application) => {
    setIsActionLoading(true);
    try {
      await decideHospitalApplication({ applicationId: application.application_id, status: 'ACCEPTED' });
      const targetStaffId = application.staff_id || application.id;
      if (!targetStaffId) {
        throw new Error('Applicant payload missing staff id.');
      }
      await assignHospitalShift({
        jobId: currentShiftId,
        staffId: targetStaffId,
        assignedByUserId: null,
      });
      await loadShiftDetail(currentShiftId);
      await loadSummary();
      toast.success('Applicant accepted and assigned.');
    } catch (err) {
      const message = err.message || 'Unable to accept and assign applicant.';
      toast.error(message);
    } finally {
      setIsActionLoading(false);
    }
  };

  const assignedRows = currentShiftDetail?.assigned || currentShift?.assigned || [];
  const applicantRows = currentShiftDetail?.applicants || currentShift?.applicants || [];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 font-display text-slate-900 dark:text-slate-100 h-screen flex overflow-hidden">
      <HospitalSidebar activePage="manage-shift" />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <HospitalHeader />

        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-8">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Staff Manage</h2>
                <p className="text-slate-500 text-sm mt-1">
                  Viewing details for: <span className="text-[#135bec] font-bold">{currentShift?.title || 'N/A'}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2 space-y-8">
              <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                    <span className="material-symbols-outlined text-[#135bec]">group</span>
                    Assigned Staff ({assignedRows.length}/{currentShift?.capacity || 0})
                  </h3>
                </div>
                <div className="p-6">
                  {isLoading ? (
                    <div className="text-center py-8 text-slate-400 text-sm">Loading...</div>
                  ) : assignedRows.length > 0 ? (
                    assignedRows.map((staff) => (
                      <div
                        key={staff.id}
                        className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-[#135bec]/30 transition-all mb-3 last:mb-0 cursor-pointer"
                        onClick={() => setSelectedStaff(staff)}
                      >
                        <div className="flex items-center gap-4">
                          <div className="size-12 rounded-full bg-[#135bec]/15 flex items-center justify-center font-bold text-[#135bec]">
                            {(staff.name || 'NA').slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-sm text-slate-900 dark:text-white">{staff.name}</p>
                            <p className="text-xs text-slate-500">{staff.role}</p>
                          </div>
                        </div>
                        <div className="text-right hidden sm:block">
                          <p className="text-xs font-bold uppercase text-emerald-500">{staff.status}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-slate-400 text-sm">
                      No staff assigned yet.
                    </div>
                  )}
                </div>
              </section>

              <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                  <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                    <span className="material-symbols-outlined text-[#135bec]">pending_actions</span>
                    Pending Applicants ({applicantRows.length})
                  </h3>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {applicantRows.length > 0 ? (
                    applicantRows.map((applicant) => (
                      <div
                        key={applicant.application_id || applicant.id}
                        className="p-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer"
                        onClick={() => setSelectedStaff(applicant)}
                      >
                        <div className="flex items-center gap-4">
                          <div className="size-12 rounded-full bg-[#135bec]/15 flex items-center justify-center font-bold text-[#135bec]">
                            {(applicant.name || 'NA').slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-sm text-slate-900 dark:text-white">{applicant.name}</p>
                            <div className="flex items-center gap-2">
                              <div className="flex text-amber-400">
                                <span className="material-symbols-outlined text-xs">star</span>
                                <span className="text-xs font-bold text-slate-600 dark:text-slate-400 ml-1">{applicant.rating ?? 'N/A'}</span>
                              </div>
                              <span className="text-xs text-slate-500">• {applicant.shifts ?? 0} Shifts</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            disabled={isActionLoading}
                            className="px-4 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-bold hover:border-red-500/50 hover:text-red-600 transition-all cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDecline(applicant.application_id);
                            }}
                          >
                            Decline
                          </button>
                          <button
                            disabled={isActionLoading}
                            className="px-4 py-2 rounded-lg bg-[#135bec] text-white text-sm font-bold hover:bg-[#135bec]/90 transition-all cursor-pointer shadow-md"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAccept(applicant);
                            }}
                          >
                            Accept
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10 text-slate-400 text-sm">
                      No pending applicants for this shift.
                    </div>
                  )}
                </div>
              </section>
            </div>

            <aside className="space-y-6">
              <section className="bg-[#135bec]/5 dark:bg-[#135bec]/10 rounded-2xl border-2 border-[#135bec]/20 p-6 space-y-6">
                <div className="flex items-center gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Last Posted</h3>
                  </div>
                </div>

                {shiftsData.map((shift) => (
                  <div
                    key={shift.id}
                    onClick={() => setCurrentShiftId(shift.id)}
                    className={`shift-card relative group p-4 bg-white dark:bg-gray-900 border rounded-xl hover:shadow-md transition-all cursor-pointer ${currentShift?.id === shift.id ? 'border-[#135bec] ring-1 ring-[#135bec]' : 'border-gray-100 dark:border-gray-800 hover:border-[#135bec]/30'}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${currentShift?.id === shift.id ? 'bg-[#135bec]' : 'bg-green-500'}`}></span>
                        <h3 className="text-[#140d1b] dark:text-gray-100 text-[15px] font-bold leading-tight">{shift.title}</h3>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <div className="flex items-center gap-1 px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-md text-[11px] font-medium border border-gray-100 dark:border-gray-700">
                        <span className="material-symbols-outlined text-[14px]">schedule</span>
                        {shift.time}
                      </div>

                      <div className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium border ${shift.applicants.length > 0 ? 'bg-[#135bec]/5 text-[#135bec] border-[#135bec]/10' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                        <span className="material-symbols-outlined text-[14px]">group</span>
                        {shift.applicants.length} Applicants
                      </div>

                      <div className="flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-md text-[11px] font-medium">
                        <span className="material-symbols-outlined text-[14px]">person_add</span>
                        {shift.assigned.length}/{shift.capacity} Filled
                      </div>
                    </div>
                  </div>
                ))}
              </section>
            </aside>
          </div>
        </main>
      </div>

      {selectedStaff && (
        <StaffProfileModal
          staff={{
            ...selectedStaff,
            reviews: selectedStaff.shifts || 24,
          }}
          onClose={() => setSelectedStaff(null)}
        />
      )}
    </div>
  );
};

export default ManagerShiftManagement;
