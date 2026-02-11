const HOSPITAL_ID_KEY = 'hospital_id';
const HOSPITAL_ACCESS_TOKEN_KEY = 'hospital_access_token';
const HOSPITAL_REFRESH_TOKEN_KEY = 'hospital_refresh_token';
const HOSPITAL_PROFILE_KEY = 'hospital_profile';

export function setHospitalId(hospitalId) {
  localStorage.setItem(HOSPITAL_ID_KEY, String(hospitalId));
}

export function getHospitalId() {
  return localStorage.getItem(HOSPITAL_ID_KEY);
}

export function clearHospitalId() {
  localStorage.removeItem(HOSPITAL_ID_KEY);
}

export function setHospitalProfile(profile) {
  if (!profile) return;
  localStorage.setItem(HOSPITAL_PROFILE_KEY, JSON.stringify(profile));
}

export function getHospitalProfile() {
  const raw = localStorage.getItem(HOSPITAL_PROFILE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setHospitalTokens({ accessToken, refreshToken }) {
  if (accessToken) {
    localStorage.setItem(HOSPITAL_ACCESS_TOKEN_KEY, accessToken);
  }
  if (refreshToken) {
    localStorage.setItem(HOSPITAL_REFRESH_TOKEN_KEY, refreshToken);
  }
}

export function clearHospitalTokens() {
  localStorage.removeItem(HOSPITAL_ACCESS_TOKEN_KEY);
  localStorage.removeItem(HOSPITAL_REFRESH_TOKEN_KEY);
  localStorage.removeItem(HOSPITAL_PROFILE_KEY);
}
