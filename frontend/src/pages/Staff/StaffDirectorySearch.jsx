import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import StaffHeader from './StaffHeader';
import StaffSidebar from './StaffSidebar';
import { useToast } from '../../components/toastContext';
import { searchStaffDirectory } from '../../services/api';
import { getStaffId } from '../../services/staffSession';

const StaffDirectorySearch = () => {
  const toast = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get('q') || '');
  const [isLoading, setIsLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  useEffect(() => {
    const staffId = getStaffId();
    if (!staffId) {
      toast.error('Please login as staff first.');
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await searchStaffDirectory({
          staffId,
          q: query.trim(),
        });
        setDepartments(response.departments || []);
        setHospitals(response.hospitals || []);
      } catch (err) {
        toast.error(err.message || 'Unable to search staff directory.');
        setDepartments([]);
        setHospitals([]);
      } finally {
        setIsLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query, toast]);

  const handleSearchInput = (e) => {
    const next = e.target.value;
    setQuery(next);
    const params = new URLSearchParams(searchParams);
    if (next.trim()) {
      params.set('q', next);
    } else {
      params.delete('q');
    }
    setSearchParams(params, { replace: true });
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 font-display text-slate-900 dark:text-slate-100 h-screen flex overflow-hidden">
      <StaffSidebar activePage="directory-search" />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <StaffHeader />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight">Staff Directory Search</h2>
            <p className="text-slate-500 text-sm mt-1">
              Search by <strong>Department Name</strong> or <strong>Hospital Name</strong>.
            </p>
          </div>

          <div className="relative mb-8 max-w-xl">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
            <input
              type="text"
              value={query}
              onChange={handleSearchInput}
              placeholder="Type department or hospital name..."
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#135bec]/20"
            />
          </div>

          {isLoading ? <p className="text-sm text-slate-500">Searching...</p> : null}

          {!isLoading && departments.length === 0 && hospitals.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 text-sm text-slate-500">
              No matching departments or hospitals found.
            </div>
          ) : null}

          {!isLoading && departments.length > 0 ? (
            <section className="mb-8">
              <h3 className="text-lg font-bold mb-4">Departments ({departments.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {departments.map((dept) => (
                  <div key={dept.id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4">
                    <p className="font-bold">{dept.name}</p>
                    <p className="text-sm text-slate-500 mt-1">{dept.hospital__name}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {!isLoading && hospitals.length > 0 ? (
            <section>
              <h3 className="text-lg font-bold mb-4">Hospitals ({hospitals.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {hospitals.map((hospital) => (
                  <div key={hospital.id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4">
                    <p className="font-bold">{hospital.name}</p>
                    <p className="text-sm text-slate-500 mt-1">
                      {[hospital.city, hospital.state, hospital.country].filter(Boolean).join(', ') || 'Location unavailable'}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">Open shifts: {hospital.open_shift_count}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </main>
      </div>
    </div>
  );
};

export default StaffDirectorySearch;
