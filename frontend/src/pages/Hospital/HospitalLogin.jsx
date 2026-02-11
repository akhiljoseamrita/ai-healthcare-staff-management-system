import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { loginHospital } from '../../services/api';
import { setHospitalId, setHospitalProfile, setHospitalTokens } from '../../services/hospitalSession';
import { useToast } from '../../components/toastContext';

const HospitalLogin = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await loginHospital({
        email: email.trim(),
        password,
      });
      setHospitalId(response.hospital_id);
      setHospitalTokens({
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
      });
      setHospitalProfile({
        fullName: response.hospital_name || 'Hospital Admin',
        profession: 'Hospital Admin',
      });
      toast.success('Logged in successfully.');
      navigate('/hospital/dashboard');
    } catch (err) {
      const message = err.message || 'Invalid email or password.';
      toast.error(message);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-inter">
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-gray-200 dark:border-b-gray-800 bg-white dark:bg-gray-900 px-6 md:px-10 py-3 w-full">
        <div className="flex items-center gap-1">
          <div className="text-[#135bec] flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl">medical_services</span>
          </div>
          <h2 className="text-[#135bec] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Healthcare</h2>
        </div>

        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-sm font-bold text-gray-600 dark:text-gray-400 hover:text-[#135bec] dark:hover:text-[#135bec] transition-colors cursor-pointer p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <span className="material-symbols-outlined text-[20px]">home</span>
          <span>Home</span>
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-[440px] flex flex-col gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center size-12 rounded-full bg-[#135bec]/10 mb-4">
                <span className="material-symbols-outlined text-[#135bec] text-3xl">local_hospital</span>
              </div>
              <h2 className="text-gray-900 dark:text-white tracking-tight text-2xl font-bold leading-tight">Hospital Portal Login</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">Please enter your credentials to access the system</p>
            </div>

            <form className="flex flex-col gap-4" onSubmit={handleLogin}>
              <div className="flex flex-col gap-2">
                <label className="text-gray-900 dark:text-white text-sm font-medium leading-normal">Email Address</label>
                <input
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input flex w-full rounded-lg text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 bg-transparent focus:border-[#135bec] focus:ring-1 focus:ring-[#135bec] h-12 placeholder:text-gray-400 p-4 text-sm font-normal outline-none transition-all"
                  placeholder="admin@hospital.com"
                  type="email"
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="text-gray-900 dark:text-white text-sm font-medium leading-normal">Password</label>
                  <a className="text-xs font-semibold text-[#135bec] hover:underline" href="/forgot-password">Forgot Password?</a>
                </div>
                <div className="relative">
                  <input
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input flex w-full rounded-lg text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 bg-transparent focus:border-[#135bec] focus:ring-1 focus:ring-[#135bec] h-12 placeholder:text-gray-400 p-4 pr-12 text-sm font-normal outline-none transition-all"
                    placeholder="••••••••"
                    type={showPassword ? 'text' : 'password'}
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </div>

              <button
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#135bec] text-white h-12 text-base font-bold hover:bg-[#135bec]/90 disabled:bg-[#135bec]/70 transition-colors shadow-md mt-2 cursor-pointer"
                type="submit"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor"></path>
                    </svg>
                    <span>Logging in...</span>
                  </>
                ) : (
                  <span>Login to Dashboard</span>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 text-center">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                New to the system?
                <a className="text-[#135bec] font-bold hover:underline ml-1" href="/hospital/register">Register Hospital</a>
              </p>
            </div>
          </div>

          <div className="flex justify-center items-center px-2">
            <div className="flex gap-4">
              <a className="text-[11px] text-gray-400 dark:text-gray-500 hover:text-[#135bec] transition-colors" href="#">Privacy Policy</a>
              <a className="text-[11px] text-gray-400 dark:text-gray-500 hover:text-[#135bec] transition-colors" href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </main>

      <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute -top-20 -right-20 size-[400px] rounded-full bg-[#135bec]/10 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 size-[400px] rounded-full bg-[#135bec]/5 blur-3xl"></div>
      </div>
    </div>
  );
};

export default HospitalLogin;
