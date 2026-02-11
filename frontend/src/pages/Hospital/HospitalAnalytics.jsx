import React, { useEffect, useMemo, useState } from 'react';
import HospitalSidebar from './HospitalSidebar';
import HospitalHeader from './HospitalHeader';

import { assignHospitalShift, getHospitalMetaOptions, getHospitalRecommendations } from '../../services/api';
import { getHospitalId } from '../../services/hospitalSession';
import { useToast } from '../../components/toastContext';

const tagMeta = {
  skill_match: { icon: 'medical_services', label: 'Skill' },
  availability_fit: { icon: 'schedule', label: 'Availability' },
  past_shift_history: { icon: 'work_history', label: 'History' },
  staff_reliability: { icon: 'verified', label: 'Reliability' },
};

const HospitalAnalytics = () => {
  const toast = useToast();
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [departmentGroups, setDepartmentGroups] = useState([]);
  const [aiMeta, setAiMeta] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [invitingKey, setInvitingKey] = useState(null);
  const [invitedKeys, setInvitedKeys] = useState([]);

  const hasAnyResults = useMemo(
    () => departmentGroups.some((group) => (group.results || []).length > 0),
    [departmentGroups]
  );

  const loadDepartmentOptions = async (hospitalId) => {
    const response = await getHospitalMetaOptions({ hospitalId });
    const rows = response.departments || [];
    setDepartmentOptions(rows);
  };

  const loadRecommendations = async (hospitalId, department = selectedDepartment) => {
    const response = await getHospitalRecommendations({
      hospitalId,
      department,
      limit: 6,
    });
    setDepartmentGroups(response.results || []);
    setAiMeta(response.ai_meta || null);
  };

  useEffect(() => {
    const load = async () => {
      const hospitalId = getHospitalId();
      if (!hospitalId) {
        toast.error('Please login as hospital first.');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        await loadDepartmentOptions(hospitalId);
        await loadRecommendations(hospitalId, 'All');
      } catch (err) {
        toast.error(err.message || 'Unable to load department recommendations.');
      } finally {
        setIsLoading(false);
      }
    };

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterApply = async () => {
    const hospitalId = getHospitalId();
    if (!hospitalId) {
      toast.error('Please login as hospital first.');
      return;
    }

    setIsLoading(true);
    setInvitedKeys([]);
    try {
      await loadRecommendations(hospitalId, selectedDepartment);
    } catch (err) {
      toast.error(err.message || 'Unable to load recommendations.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInvite = async (jobId, staffId) => {
    const key = `${jobId}-${staffId}`;
    setInvitingKey(key);
    try {
      await assignHospitalShift({
        jobId,
        staffId,
        assignedByUserId: null,
      });
      setInvitedKeys((prev) => [...prev, key]);
      toast.success('Staff invited successfully.');
    } catch (err) {
      toast.error(err.message || 'Could not invite staff.');
    } finally {
      setInvitingKey(null);
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 font-display text-slate-900 dark:text-slate-100 h-screen flex overflow-hidden">
      <HospitalSidebar activePage="recommendations" />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <HospitalHeader />

        <main className="flex-1 overflow-y-auto p-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Department Smart Matches</h2>
              <p className="text-slate-500 text-sm mt-1">
                Hospital side shows <strong>Top 6 Staff</strong> for each department.
              </p>
              {aiMeta?.applied ? (
                <p className="text-xs text-emerald-600 font-semibold mt-1">
                  AI enhanced ranking active ({aiMeta.model}).
                </p>
              ) : null}
            </div>

            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">filter_alt</span>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="pl-10 pr-8 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-[#135bec]/20 outline-none cursor-pointer appearance-none min-w-[220px]"
                >
                  <option value="All">All Departments</option>
                  {departmentOptions.map((dept) => (
                    <option key={dept.id} value={dept.name}>{dept.name}</option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xl">expand_more</span>
              </div>

              <button
                onClick={handleFilterApply}
                disabled={isLoading}
                className="px-5 py-2 bg-[#135bec] disabled:bg-[#135bec]/60 text-white text-sm font-bold rounded-lg hover:bg-[#135bec]/90 transition-all shadow-md shadow-[#135bec]/20 cursor-pointer flex items-center gap-1"
              >
                <span>{isLoading ? 'Loading' : 'Apply'}</span>
                <span className="material-symbols-outlined text-sm">check</span>
              </button>
            </div>
          </div>

          {isLoading ? <p className="text-sm text-slate-500">Loading...</p> : null}

          {!isLoading && hasAnyResults ? (
            <div className="space-y-10">
              {departmentGroups.map((group) => (
                <section key={`${group.department}-${group.job_id}`}>
                  <h3 className="text-lg font-bold mb-4">{group.department} - Top 6 Staff</h3>
                  {(group.results || []).length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {(group.results || []).map((candidate) => {
                      const inviteKey = `${group.job_id}-${candidate.staff_id}`;
                      const isProcessing = invitingKey === inviteKey;
                      const isInvited = invitedKeys.includes(inviteKey);
                      return (
                        <div key={`${group.department}-${candidate.staff_id}`} className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 group hover:border-[#135bec]/30 transition-all hover:shadow-md">
                          <div className="flex items-start gap-4 mb-5">
                            <div className="relative">
                              <div className="w-14 h-14 rounded-full bg-[#135bec]/15 text-[#135bec] font-bold flex items-center justify-center ring-2 ring-transparent group-hover:ring-[#135bec]/20 transition-all">
                                {candidate.name.slice(0, 2).toUpperCase()}
                              </div>
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-lg text-slate-900 dark:text-white truncate">{candidate.name}</h4>
                              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{candidate.role}</p>
                            </div>
                          </div>

                          <div className="mb-5">
                            <div className="flex justify-between items-center mb-1.5">
                              <span className="text-[11px] font-bold uppercase tracking-wider text-[#135bec]">Match Confidence</span>
                              <span className="text-sm font-bold text-[#135bec]">{candidate.match}%</span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                              <div className="h-full bg-[#135bec] rounded-full transition-all duration-500" style={{ width: `${candidate.match}%` }} />
                            </div>
                            <div className="mt-2 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                              {candidate.ai_score !== undefined && candidate.ai_score !== null ? (
                                <p>
                                  <span className="font-semibold">AI Score:</span> {candidate.ai_score}%
                                </p>
                              ) : null}
                              <p>
                                <span className="font-semibold">Why AI picked this staff:</span>{' '}
                                {candidate.ai_reason_short || 'Strong role match, schedule fit, and reliable shift history.'}
                              </p>
                              {(candidate.ai_reason_details || []).length > 0 ? (
                                <p>
                                  <span className="font-semibold">Factors:</span> {(candidate.ai_reason_details || []).join(' | ')}
                                </p>
                              ) : null}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-6 min-h-[32px]">
                            {(candidate.tags || []).map((tag, index) => (
                              <span key={`${candidate.staff_id}-${index}`} className="px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[11px] font-bold rounded-lg flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-[14px]">{tagMeta[tag.key]?.icon || 'info'}</span>
                                {tagMeta[tag.key]?.label || tag.key}: {tag.value}
                              </span>
                            ))}
                          </div>

                          <button
                            disabled={isProcessing || isInvited}
                            onClick={() => handleInvite(group.job_id, candidate.staff_id)}
                            className={`w-full py-2.5 text-sm font-bold rounded-xl transition-all shadow-lg ${
                              isInvited
                                ? 'bg-emerald-600 text-white cursor-default shadow-emerald-600/20'
                                : 'bg-[#135bec] text-white hover:bg-[#135bec]/90 cursor-pointer shadow-[#135bec]/20 disabled:bg-[#135bec]/60'
                            }`}
                          >
                            {isProcessing ? 'Inviting...' : isInvited ? 'Invited' : 'Quick Invite'}
                          </button>
                        </div>
                      );
                      })}
                    </div>
                  ) : (
                    <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 text-sm text-slate-500">
                      {group.job_id ? 'No matching staff found for this department.' : 'No open shift in this department yet. Create one to get top 6 staff.'}
                    </div>
                  )}
                </section>
              ))}
            </div>
          ) : null}

          {!isLoading && !hasAnyResults ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 border-dashed">
              <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-slate-400 text-3xl">search_off</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">No department recommendations</h3>
              <p className="text-slate-500 text-sm mt-1">Create open shifts in departments to generate top staff lists.</p>
            </div>
          ) : null}
        </main>
      </div>
    </div>
  );
};

export default HospitalAnalytics;
