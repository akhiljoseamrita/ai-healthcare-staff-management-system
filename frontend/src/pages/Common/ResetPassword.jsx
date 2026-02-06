import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const calculateStrength = (pwd) => {
    let strength = 0;
    if (pwd.length >= 8) strength += 25;
    if (/[A-Z]/.test(pwd)) strength += 25;
    if (/[0-9]/.test(pwd)) strength += 25;
    if (/[^A-Za-z0-9]/.test(pwd)) strength += 25;
    return strength;
  };

  const strength = calculateStrength(password);
  const passwordsMatch = password && password === confirmPassword;

  const getStrengthColor = (s) => {
    if (s <= 25) return 'bg-red-500';
    if (s <= 50) return 'bg-orange-500';
    if (s <= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthText = (s) => {
    if (s <= 25) return 'Weak';
    if (s <= 50) return 'Fair';
    if (s <= 75) return 'Good';
    return 'Strong';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (strength === 100 && passwordsMatch) {
      navigate('/reset-success');
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-gray-950 min-h-screen flex flex-col font-display">
      <div className="layout-container flex h-full grow flex-col">
        {/* Top Header */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 md:px-10 py-4">
          <div className="flex items-center gap-1">
            <div className="text-[#135bec] flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">medical_services</span>
            </div>
            <h2 className="text-[#135bec] dark:text-blue-400 text-lg font-bold leading-tight tracking-[-0.015em]">Healthcare</h2>
          </div>
        </header>

        <main className="flex flex-1 items-center justify-center p-6">
          <div className="layout-content-container flex flex-col w-full max-w-[480px] bg-white dark:bg-gray-900 rounded-xl shadow-[0_4px_20px_rgba(19,91,236,0.08)] overflow-hidden border border-slate-200 dark:border-gray-800">
            
            {/* Blue Gradient Header */}
            <div className="px-6 py-8 flex flex-col items-center justify-center text-white" style={{ backgroundImage: 'linear-gradient(135deg, #135bec 0%, #3b82f6 100%)' }}>
              <div className="bg-white/20 p-3 rounded-full mb-4 backdrop-blur-sm">
                <span className="material-symbols-outlined text-4xl">lock_reset</span>
              </div>
              <h2 className="tracking-light text-2xl font-bold leading-tight text-center">Reset Password</h2>
              <p className="text-white/90 text-sm font-normal leading-normal text-center mt-2 px-4">Create a strong password to secure your staff account.</p>
            </div>

            <div className="px-8 py-8 flex flex-col gap-6">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                {/* New Password Field */}
                <div className="flex flex-col gap-2">
                  <label className="flex flex-col w-full">
                    <p className="text-slate-700 dark:text-slate-200 text-sm font-semibold leading-normal pb-2">New Password</p>
                    <div className="flex w-full items-stretch rounded-lg group">
                      <input
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-l-lg text-slate-900 dark:text-white focus:outline-0 focus:z-10 focus:ring-2 focus:ring-[#135bec]/50 border border-slate-300 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 h-12 placeholder:text-slate-400 p-[15px] border-r-0 text-base font-normal leading-normal transition-all"
                        placeholder="Enter new password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <div
                        className="text-slate-400 dark:text-gray-500 flex border border-slate-300 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 items-center justify-center px-3 rounded-r-lg border-l-0 cursor-pointer hover:text-[#135bec] transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                      </div>
                    </div>
                  </label>
                  
                  {/* Strength Meter */}
                  <div className="flex flex-col gap-1.5 mt-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Strength: {getStrengthText(strength)}</span>
                      <span className={`text-xs font-medium ${strength === 100 ? 'text-green-600 dark:text-green-400' : 'text-slate-500'}`}>{strength}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className={`h-full transition-all duration-300 ${getStrengthColor(strength)}`} style={{ width: `${strength}%` }}></div>
                    </div>
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div className="flex flex-col gap-2">
                  <label className="flex flex-col w-full">
                    <p className="text-slate-700 dark:text-slate-200 text-sm font-semibold leading-normal pb-2">Confirm Password</p>
                    <div className="flex w-full items-stretch rounded-lg group">
                      <input
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-l-lg text-slate-900 dark:text-white focus:outline-0 focus:z-10 focus:ring-2 focus:ring-[#135bec]/50 border border-slate-300 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 h-12 placeholder:text-slate-400 p-[15px] border-r-0 text-base font-normal leading-normal transition-all"
                        placeholder="Re-type new password"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <div
                        className="text-slate-400 dark:text-gray-500 flex border border-slate-300 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 items-center justify-center px-3 rounded-r-lg border-l-0 cursor-pointer hover:text-[#135bec] transition-colors"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        <span className="material-symbols-outlined">{showConfirmPassword ? 'visibility_off' : 'visibility'}</span>
                      </div>
                    </div>
                  </label>
                  {passwordsMatch && (
                    <div className="flex items-center gap-2 mt-1">
                      <span className="material-symbols-outlined text-green-500 text-sm">check_circle</span>
                      <span className="text-xs text-green-600 dark:text-green-400 font-medium">Passwords match</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="pt-2">
                  <button
                    className={`w-full h-12 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 ${strength === 100 && passwordsMatch ? 'bg-[#135bec] hover:bg-[#1151d3] shadow-md' : 'bg-slate-300 dark:bg-slate-800 cursor-not-allowed text-slate-500 dark:text-slate-600'}`}
                    disabled={strength < 100 || !passwordsMatch}
                    type="submit"
                  >
                    <span>Reset Password</span>
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </button>
                  <Link
                    to="/hospital/login"
                    className="w-full mt-5 text-slate-500 dark:text-slate-400 text-sm font-medium hover:text-[#135bec] dark:hover:text-blue-400 transition-colors block text-center"
                  >
                    Back to Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </main>
        
        {/* Footer */}
        <footer className="p-6 text-center">
          <p className="text-slate-400 dark:text-slate-500 text-xs">© 2026 CareStaff Pro. All rights reserved. Secure Healthcare Management.</p>
        </footer>
      </div>
    </div>
  );
};

export default ResetPassword;