import React, { useEffect, useState } from 'react';
import StaffSidebar from './StaffSidebar';
import StaffHeader from './StaffHeader';

import { applyStaffJob, getStaffRecommendations } from '../../services/api';
import { getStaffId } from '../../services/staffSession';
import { useToast } from '../../components/toastContext';

const TAG_META = {
  profession_fit: { icon: 'medical_services', label: 'Skill Fit' },
  availability_fit: { icon: 'schedule', label: 'Availability' },
  hospital_history: { icon: 'work_history', label: 'History' },
  hospital_rating: { icon: 'star', label: 'Rating' },
};

const DEPARTMENT_OPTIONS = [
  { value: 'All', label: 'All Specialties (Best 6)' },
  { value: 'ICU', label: 'Intensive Care Unit (ICU)' },
  { value: 'Emergency', label: 'Emergency Room' },
  { value: 'Radiology', label: 'Radiology' },
];

const statusColorByMatch = (match) => {
  if (match >= 90) return 'bg-emerald-500';
  if (match >= 75) return 'bg-amber-500';
  return 'bg-slate-400';
};

const formatRecommendation = (item) => ({
  id: item.job_id,
  name: item.name,
  role: item.role,
  department: item.department,
  match: item.match,
  ai_score: item.ai_score,
  ai_reason_short: item.ai_reason_short,
  ai_reason_details: item.ai_reason_details || [],
  ai_confidence: item.ai_confidence,
  statusColor: statusColorByMatch(item.match),
  tags: (item.tags || []).map((tag) => {
    const meta = TAG_META[tag.key] || { icon: 'info', label: tag.key };
    return {
      icon: meta.icon,
      text: `${meta.label}: ${tag.value}`,
    };
  }),
});

const StaffAIRecommendations = () => {
  const toast = useToast();
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [aiRecommendations, setAiRecommendations] = useState([]);
  const [baselineRecommendations, setBaselineRecommendations] = useState([]);
  const [aiMeta, setAiMeta] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // CHANGED: Track specific loading ID and list of successful IDs
  const [applyingId, setApplyingId] = useState(null);
  const [appliedJobIds, setAppliedJobIds] = useState([]);

  const loadRecommendations = async (department = selectedDepartment) => {
    const staffId = getStaffId();
    if (!staffId) {
      const message = 'Please login as staff first to load recommendations.';
      toast.error(message);
      setAiRecommendations([]);
      setBaselineRecommendations([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await getStaffRecommendations({
        staffId,
        department,
        limit: 6,
      });
      const aiRows = (response.results || []).map(formatRecommendation);
      const baselineRows = (response.baseline_results || response.results || []).map(formatRecommendation);
      setAiRecommendations(aiRows);
      setBaselineRecommendations(baselineRows);
      setAiMeta(response.ai_meta || null);
    } catch (err) {
      const message = err.message || 'Unable to load recommendations right now.';
      toast.error(message);
      setAiRecommendations([]);
      setBaselineRecommendations([]);
      setAiMeta(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRecommendations('All');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterApply = () => {
    // Reset applied list when changing filters if you want, 
    // or keep it to remember applications across filters (keeping it is usually better).
    loadRecommendations(selectedDepartment);
  };

  const handleQuickApply = async (jobId) => {
    const staffId = getStaffId();
    if (!staffId) {
      toast.error('Please login as staff first to apply.');
      return;
    }

    // Set loading for this specific ID
    setApplyingId(jobId);

    try {
      await applyStaffJob({ jobId, staffId });
      
      // On success, add to the list of applied jobs
      setAppliedJobIds((prev) => [...prev, jobId]);
      toast.success('Application submitted successfully.');
    } catch (err) {
      const message = err.message || 'Unable to apply for this job.';
      toast.error(message);
    } finally {
      // Stop loading
      setApplyingId(null);
    }
  };

  const renderRecommendationCards = (
    rows,
    {
      showAiReason = false,
      showReasonText = true,
      reasonLabel = 'Why this is recommended',
    } = {}
  ) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {rows.map((hospital) => {
        const isProcessing = applyingId === hospital.id;
        const isApplied = appliedJobIds.includes(hospital.id);

        return (
          <div key={hospital.id} className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 group hover:border-[#135bec]/30 transition-all hover:shadow-md animate-in fade-in zoom-in duration-300">
            <div className="flex items-start gap-4 mb-5">
              <div className="relative">
                <div className="w-14 h-14 rounded-lg bg-[#135bec]/10 text-[#135bec] flex items-center justify-center text-lg font-bold ring-2 ring-transparent group-hover:ring-[#135bec]/20 transition-all">
                  {hospital.name.slice(0, 2).toUpperCase()}
                </div>
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${hospital.statusColor} border-2 border-white dark:border-slate-900 rounded-full`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-lg text-slate-900 dark:text-white truncate">{hospital.name}</h4>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 uppercase tracking-wide">{hospital.department}</span>
                </div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 truncate">{hospital.role}</p>
              </div>
            </div>

            <div className="mb-5">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#135bec]">Job Compatibility</span>
                <span className="text-sm font-bold text-[#135bec]">{hospital.match}%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#135bec] rounded-full transition-all duration-500"
                  style={{ width: `${hospital.match}%` }}
                />
              </div>
              {showReasonText && showAiReason && hospital.ai_score !== undefined && hospital.ai_score !== null ? (
                <div className="mt-2 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                  <p>
                    <span className="font-semibold">AI Score:</span> {hospital.ai_score}%
                  </p>
                  <p>
                    <span className="font-semibold">{reasonLabel}:</span>{' '}
                    {hospital.ai_reason_short || 'Based on skill fit, availability, hospital history, and rating.'}
                  </p>
                  {(hospital.ai_reason_details || []).length > 0 ? (
                    <p>
                      <span className="font-semibold">Factors:</span> {hospital.ai_reason_details.join(' | ')}
                    </p>
                  ) : null}
                </div>
              ) : showReasonText ? (
                <div className="mt-2 text-xs text-slate-600 dark:text-slate-300">
                  <span className="font-semibold">{reasonLabel}:</span>{' '}
                  {hospital.ai_reason_short || 'Based on skill fit, availability, hospital history, and rating.'}
                </div>
              ) : null}
            </div>

            <div className="flex flex-wrap gap-2 mb-6 min-h-[32px]">
              {hospital.tags.map((tag, index) => (
                <span key={index} className="px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[11px] font-bold rounded-lg flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px]">{tag.icon}</span> {tag.text}
                </span>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                disabled={isProcessing || isApplied}
                onClick={() => handleQuickApply(hospital.id)}
                className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all shadow-lg 
                  ${isApplied
                    ? 'bg-emerald-600 text-white cursor-default shadow-emerald-600/20'
                    : 'bg-[#135bec] hover:bg-[#135bec]/90 text-white cursor-pointer shadow-[#135bec]/20 disabled:bg-[#135bec]/60'
                  }`}
              >
                {isProcessing ? 'Applying...' : isApplied ? 'Applied' : 'Quick Apply'}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="bg-slate-50 dark:bg-slate-950 font-display text-slate-900 dark:text-slate-100 h-screen flex overflow-hidden">
      <StaffSidebar activePage="staff-recommendations" />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <StaffHeader />

        <main className="flex-1 overflow-y-auto p-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Smart Job Matches</h2>
              <p className="text-slate-500 text-sm mt-1">
                Showing the <strong>Top 6 Hospitals</strong> based on your profile & preferences.
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
                  className="pl-10 pr-8 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-[#135bec]/20 outline-none cursor-pointer appearance-none min-w-[200px]"
                >
                  {DEPARTMENT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xl">expand_more</span>
              </div>

              <button
                onClick={handleFilterApply}
                disabled={isLoading}
                className="px-5 py-2 bg-[#135bec] disabled:bg-[#135bec]/60 text-white text-sm font-bold rounded-lg hover:bg-[#135bec]/90 transition-all shadow-md shadow-[#135bec]/20 cursor-pointer flex items-center gap-1"
              >
                <span>{isLoading ? 'Loading' : 'Filter'}</span>
                <span className="material-symbols-outlined text-sm">check</span>
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20 text-slate-500 dark:text-slate-400">
              Loading recommendations...
            </div>
          ) : null}

          {!isLoading && aiRecommendations.length > 0 ? (
            <>
              <div className="mb-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">AI Recommendations</h3>
                <p className="text-sm text-slate-500">
                  Personalized matches with AI explanation and confidence.
                </p>
              </div>
              {renderRecommendationCards(aiRecommendations, {
                showAiReason: true,
                reasonLabel: 'Why this is recommended',
              })}

              <div className="mb-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Normal Recommendations</h3>
                <p className="text-sm text-slate-500">
                  Baseline ranking using normal scoring logic (profession, availability, history, rating).
                </p>
              </div>
              {renderRecommendationCards(baselineRecommendations, {
                showAiReason: false,
                showReasonText: false,
                reasonLabel: 'Why this is best for you',
              })}
            </>
          ) : null}

          {!isLoading && aiRecommendations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 border-dashed">
              <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-slate-400 text-3xl">domain_disabled</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">No jobs found</h3>
              <p className="text-slate-500 text-sm mt-1">Try selecting a different specialty.</p>
            </div>
          ) : null}
        </main>
      </div>
    </div>
  );
};

export default StaffAIRecommendations;
