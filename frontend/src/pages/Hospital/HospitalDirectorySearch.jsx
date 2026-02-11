import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import HospitalHeader from './HospitalHeader';
import HospitalSidebar from './HospitalSidebar';
import { useToast } from '../../components/toastContext';
import { searchHospitalDirectory } from '../../services/api';
import { getHospitalId } from '../../services/hospitalSession';

const HospitalDirectorySearch = () => {
  const toast = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get('q') || '');
  const [isLoading, setIsLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [staffProfiles, setStaffProfiles] = useState([]);

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  useEffect(() => {
    const hospitalId = getHospitalId();
    if (!hospitalId) {
      toast.error('Please login as hospital first.');
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await searchHospitalDirectory({
          hospitalId,
          q: query.trim(),
        });
        setDepartments(response.departments || []);
        setStaffProfiles(response.staff_profiles || []);
      } catch (err) {
        toast.error(err.message || 'Unable to search hospital directory.');
        setDepartments([]);
        setStaffProfiles([]);
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
      <HospitalSidebar activePage="directory-search" />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <HospitalHeader />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight">Hospital Directory Search</h2>
            <p className="text-slate-500 text-sm mt-1">
              Search by <strong>Department Name</strong> or <strong>Staff Name</strong>.
            </p>
          </div>

          <div className="relative mb-8 max-w-xl">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
            <input
              type="text"
              value={query}
              onChange={handleSearchInput}
              placeholder="Type department or staff name..."
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#135bec]/20"
            />
          </div>

          {isLoading ? <p className="text-sm text-slate-500">Searching...</p> : null}

          {!isLoading && departments.length === 0 && staffProfiles.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 text-sm text-slate-500">
              No matching departments or staff profiles found.
            </div>
          ) : null}

          {!isLoading && departments.length > 0 ? (
            <section className="mb-8">
              <h3 className="text-lg font-bold mb-4">Departments ({departments.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {departments.map((dept) => (
                  <div key={dept.id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4">
                    <p className="font-bold">{dept.name}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {!isLoading && staffProfiles.length > 0 ? (
            <section>
              <h3 className="text-lg font-bold mb-4">Staff Profiles ({staffProfiles.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {staffProfiles.map((staff) => (
                  <div key={staff.id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4">
                    <p className="font-bold">{staff.full_name}</p>
                    <p className="text-sm text-slate-500 mt-1">{staff.profession}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Rating: {staff.rating_avg} | Completed shifts: {staff.total_completed_shifts}
                    </p>
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

export default HospitalDirectorySearch;
