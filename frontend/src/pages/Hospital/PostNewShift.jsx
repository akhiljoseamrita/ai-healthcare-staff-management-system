import React, { useEffect, useMemo, useState } from 'react';
import HospitalSidebar from '../Hospital/HospitalSidebar';
import HospitalHeader from '../Hospital/HospitalHeader';

import { createHospitalShift, getHospitalMetaOptions } from '../../services/api';
import { getHospitalId } from '../../services/hospitalSession';
import { useToast } from '../../components/toastContext';

const toIsoDateTime = (dateStr, timeStr) => {
  if (!dateStr || !timeStr) return null;
  return new Date(`${dateStr}T${timeStr}:00`).toISOString();
};

const PostNewShift = () => {
  const toast = useToast();
  const [departments, setDepartments] = useState([]);
  const [professions, setProfessions] = useState([]);
  const [isLoadingMeta, setIsLoadingMeta] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    professionId: '',
    departmentId: '',
    requiredStaffCount: 2,
    date: '',
    startTime: '08:00',
    endTime: '16:00',
    description: '',
  });

  useEffect(() => {
    const loadMeta = async () => {
      const hospitalId = getHospitalId();
      if (!hospitalId) {
        const message = 'Please login as hospital first.';
        toast.error(message);
        setIsLoadingMeta(false);
        return;
      }

      setIsLoadingMeta(true);
      try {
        const response = await getHospitalMetaOptions({ hospitalId });
        const deptRows = response.departments || [];
        const profRows = response.professions || [];
        setDepartments(deptRows);
        setProfessions(profRows);
        setForm((prev) => ({
          ...prev,
          departmentId: prev.departmentId || (deptRows[0]?.id ? String(deptRows[0].id) : ''),
          professionId: prev.professionId || (profRows[0]?.id ? String(profRows[0].id) : ''),
        }));
      } catch (err) {
        const message = err.message || 'Unable to load posting options.';
        toast.error(message);
      } finally {
        setIsLoadingMeta(false);
      }
    };

    loadMeta();
  }, [toast]);

  const canSubmit = useMemo(() => {
    return (
      form.professionId &&
      form.departmentId &&
      form.date &&
      form.startTime &&
      form.endTime &&
      Number(form.requiredStaffCount) > 0
    );
  }, [form]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCountChange = (delta) => {
    setForm((prev) => ({
      ...prev,
      requiredStaffCount: Math.max(1, Number(prev.requiredStaffCount) + delta),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hospitalId = getHospitalId();
    if (!hospitalId) {
      const message = 'Please login as hospital first.';
      toast.error(message);
      return;
    }

    const shiftStart = toIsoDateTime(form.date, form.startTime);
    const shiftEnd = toIsoDateTime(form.date, form.endTime);
    if (!shiftStart || !shiftEnd) {
      const message = 'Please provide valid date and shift times.';
      toast.error(message);
      return;
    }

    setIsSubmitting(true);
    try {
      await createHospitalShift({
        hospital_id: Number(hospitalId),
        department_id: Number(form.departmentId),
        profession_id: Number(form.professionId),
        required_staff_count: Number(form.requiredStaffCount),
        shift_start: shiftStart,
        shift_end: shiftEnd,
        description: form.description,
        hourly_rate: '60.00',
        currency: 'USD',
      });
      const message = 'Shift posted successfully.';
      toast.success(message);
      setForm((prev) => ({ ...prev, description: '' }));
    } catch (err) {
      const message = err.message || 'Could not post shift.';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">
      <div className="flex h-screen overflow-hidden">
        <HospitalSidebar activePage="staffing" />

        <main className="flex-1 flex flex-col overflow-y-auto">
          <HospitalHeader />

          <div className="p-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Post New Shift</h2>
                <p className="text-slate-500 text-sm mt-1">Fill in the details below to broadcast a new shift to qualified staff.</p>
              </div>
            </div>

            <form className="space-y-6 max-w-5xl" onSubmit={handleSubmit}>
              <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <span className="material-symbols-outlined">medical_information</span>
                  </div>
                  <h3 className="text-lg font-bold">Role & Department</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Role</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">medical_services</span>
                      <select
                        value={form.professionId}
                        onChange={(e) => handleChange('professionId', e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-[#135bec] focus:border-[#135bec] text-sm appearance-none outline-none"
                      >
                        {professions.map((item) => (
                          <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Department</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">apartment</span>
                      <select
                        value={form.departmentId}
                        onChange={(e) => handleChange('departmentId', e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-[#135bec] focus:border-[#135bec] text-sm appearance-none outline-none"
                      >
                        {departments.map((item) => (
                          <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Staff Count</label>
                    <div className="flex items-center justify-between w-full md:w-1/2 px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
                      <button className="w-8 h-8 flex items-center justify-center rounded bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 transition-colors shadow-sm cursor-pointer" type="button" onClick={() => handleCountChange(-1)}>
                        <span className="material-symbols-outlined text-sm">remove</span>
                      </button>
                      <span className="text-base font-bold">{form.requiredStaffCount}</span>
                      <button className="w-8 h-8 flex items-center justify-center rounded bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 transition-colors shadow-sm cursor-pointer" type="button" onClick={() => handleCountChange(1)}>
                        <span className="material-symbols-outlined text-sm">add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <span className="material-symbols-outlined">schedule</span>
                  </div>
                  <h3 className="text-lg font-bold">Shift Timing</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Date</label>
                    <input value={form.date} onChange={(e) => handleChange('date', e.target.value)} className="w-full px-3 py-2.5 rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none text-sm" type="date" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Start Time</label>
                    <input value={form.startTime} onChange={(e) => handleChange('startTime', e.target.value)} className="w-full px-3 py-2.5 rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none text-sm" type="time" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">End Time</label>
                    <input value={form.endTime} onChange={(e) => handleChange('endTime', e.target.value)} className="w-full px-3 py-2.5 rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none text-sm" type="time" />
                  </div>
                </div>
              </section>

              <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                    <span className="material-symbols-outlined">assignment</span>
                  </div>
                  <h3 className="text-lg font-bold">Requirements</h3>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Description & Responsibilities</label>
                  <textarea value={form.description} onChange={(e) => handleChange('description', e.target.value)} className="w-full px-4 py-2.5 rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 resize-none outline-none text-sm" placeholder="Detail any specific qualifications or duties for this shift..." rows="4"></textarea>
                </div>
              </section>

              <div className="flex items-center justify-end gap-3 pt-2 pb-8">
                <button disabled={!canSubmit || isLoadingMeta || isSubmitting} className="px-6 py-2.5 bg-[#135bec] disabled:bg-[#135bec]/60 hover:bg-[#135bec]/90 text-white font-bold rounded-lg shadow-lg shadow-[#135bec]/20 transition-all cursor-pointer text-sm" type="submit">
                  {isSubmitting ? 'Posting...' : 'Post New Shift'}
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
