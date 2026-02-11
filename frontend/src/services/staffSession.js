const STAFF_ID_KEY = 'staff_id';
const STAFF_ACCESS_TOKEN_KEY = 'staff_access_token';
const STAFF_REFRESH_TOKEN_KEY = 'staff_refresh_token';
const STAFF_PROFILE_KEY = 'staff_profile';

export function setStaffId(staffId) {
  localStorage.setItem(STAFF_ID_KEY, String(staffId));
}

export function getStaffId() {
  return localStorage.getItem(STAFF_ID_KEY);
}

export function clearStaffId() {
  localStorage.removeItem(STAFF_ID_KEY);
}

export function setStaffProfile(profile) {
  if (!profile) return;
  localStorage.setItem(STAFF_PROFILE_KEY, JSON.stringify(profile));
}

export function getStaffProfile() {
  const raw = localStorage.getItem(STAFF_PROFILE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setStaffTokens({ accessToken, refreshToken }) {
  if (accessToken) {
    localStorage.setItem(STAFF_ACCESS_TOKEN_KEY, accessToken);
  }
  if (refreshToken) {
    localStorage.setItem(STAFF_REFRESH_TOKEN_KEY, refreshToken);
  }
}

export function getStaffAccessToken() {
  return localStorage.getItem(STAFF_ACCESS_TOKEN_KEY);
}

export function clearStaffTokens() {
  localStorage.removeItem(STAFF_ACCESS_TOKEN_KEY);
  localStorage.removeItem(STAFF_REFRESH_TOKEN_KEY);
  localStorage.removeItem(STAFF_PROFILE_KEY);
}
