const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

function buildUrl(path) {
  if (/^https?:\/\//.test(path)) {
    return path;
  }
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return API_BASE_URL ? `${API_BASE_URL}${normalizedPath}` : normalizedPath;
}

async function requestJson(path, options = {}) {
  const response = await fetch(buildUrl(path), {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    const message = payload?.error || payload?.message || `Request failed (${response.status})`;
    throw new Error(message);
  }

  return payload;
}

export async function registerStaff(payload) {
  return requestJson('/api/staff/auth/register/', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function loginStaff(payload) {
  return requestJson('/api/staff/auth/login/', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function getStaffRecommendations({ staffId, department = 'All', limit = 6 }) {
  const params = new URLSearchParams({
    staff_id: String(staffId),
    department,
    limit: String(limit),
  });
  return requestJson(`/api/staff/recommendations/?${params.toString()}`);
}

export async function getStaffDashboard({ staffId }) {
  const params = new URLSearchParams({ staff_id: String(staffId) });
  return requestJson(`/api/staff/dashboard/?${params.toString()}`);
}

export async function getStaffSchedule({ staffId }) {
  const params = new URLSearchParams({ staff_id: String(staffId) });
  return requestJson(`/api/staff/schedule/?${params.toString()}`);
}

export async function applyStaffJob({ jobId, staffId }) {
  return requestJson(`/api/staff/jobs/${jobId}/apply/`, {
    method: 'POST',
    body: JSON.stringify({ staff_id: staffId }),
  });
}

export async function withdrawStaffApplication({ applicationId, staffId }) {
  return requestJson(`/api/staff/applications/${applicationId}/withdraw/`, {
    method: 'POST',
    body: JSON.stringify({ staff_id: staffId }),
  });
}

export async function approveStaffApplication({ applicationId, staffId }) {
  return requestJson(`/api/staff/applications/${applicationId}/approve/`, {
    method: 'POST',
    body: JSON.stringify({ staff_id: staffId }),
  });
}

export async function registerHospital(payload) {
  return requestJson('/api/hospital/auth/register/', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function loginHospital(payload) {
  return requestJson('/api/hospital/auth/login/', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function getHospitalMetaOptions({ hospitalId }) {
  const params = new URLSearchParams({ hospital_id: String(hospitalId) });
  return requestJson(`/api/hospital/meta/options/?${params.toString()}`);
}

export async function getHospitalShiftSummary({ hospitalId }) {
  const params = new URLSearchParams({ hospital_id: String(hospitalId) });
  return requestJson(`/api/hospital/shifts/summary/?${params.toString()}`);
}

export async function getHospitalShiftDetail(jobId) {
  return requestJson(`/api/hospital/shifts/${jobId}/manage/`);
}

export async function createHospitalShift(payload) {
  return requestJson('/api/hospital/shifts/', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function decideHospitalApplication({ applicationId, status, note }) {
  return requestJson(`/api/hospital/applications/${applicationId}/decision/`, {
    method: 'POST',
    body: JSON.stringify({ status, note }),
  });
}

export async function assignHospitalShift({ jobId, staffId, assignedByUserId }) {
  return requestJson(`/api/hospital/shifts/${jobId}/assign/`, {
    method: 'POST',
    body: JSON.stringify({
      staff_id: staffId,
      assigned_by_user_id: assignedByUserId,
    }),
  });
}

export async function getHospitalRecommendations({ jobId, hospitalId, department = 'All', limit = 6 }) {
  const params = new URLSearchParams({ limit: String(limit) });
  if (jobId !== undefined && jobId !== null && String(jobId) !== '') {
    params.set('job_id', String(jobId));
  }
  if (hospitalId !== undefined && hospitalId !== null && String(hospitalId) !== '') {
    params.set('hospital_id', String(hospitalId));
  }
  if (department) {
    params.set('department', department);
  }
  return requestJson(`/api/hospital/recommendations/?${params.toString()}`);
}

export async function searchHospitalDirectory({ hospitalId, q = '' }) {
  const params = new URLSearchParams({
    hospital_id: String(hospitalId),
    q,
  });
  return requestJson(`/api/hospital/search/directory/?${params.toString()}`);
}

export async function searchStaffDirectory({ staffId, q = '' }) {
  const params = new URLSearchParams({
    staff_id: String(staffId),
    q,
  });
  return requestJson(`/api/staff/search/directory/?${params.toString()}`);
}
