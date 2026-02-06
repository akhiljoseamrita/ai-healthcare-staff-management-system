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
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display">
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#dbdfe6] dark:border-gray-800 bg-white dark:bg-gray-900 px-10 py-3">
          <div className="flex items-center gap-4 text-brand-dark dark:text-white">
            <div className="size-6 text-primary">
              <span className="material-symbols-outlined text-3xl">medical_services</span>
            </div>
            <h2 className="text-brand-dark dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">CareStaff Pro</h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              <a className="text-brand-dark dark:text-gray-300 text-sm font-medium leading-normal hover:text-primary transition-colors" href="#">Dashboard</a>
              <a className="text-brand-dark dark:text-gray-300 text-sm font-medium leading-normal hover:text-primary transition-colors" href="#">Staff Management</a>
            </div>
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-gray-200 dark:border-gray-700" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuARX4NO2UgUfOImFwNotDcIVc10AN6K12t2z_jCAFIjc0kS_isL5225HHboY4NH0ExFHMAZq1CNhNopgHfyjDzcxdF7S9WNJflCR5cxPQr5llwZ8P_4Fc7QZPVTJ9mYBDGl5AMoPgP4crXXVyY0FRZ5uKT_LMVWDJMaAPh0I4n-4ZaD2c6E7q6Y0KFwru2CVOw90bms9djMk0oftO057g6Q0QuE7VqiNPM8td9z3ODBn9c29XJQVWCw-CQtLsbeEBHvk8VNbSYhQUA")' }}></div>
          </div>
        </header>
        <main className="flex flex-1 items-center justify-center p-6">
          <div className="layout-content-container flex flex-col w-full max-w-[480px] bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-[#dbdfe6] dark:border-gray-800">
            <div className="bg-primary px-6 py-8 flex flex-col items-center justify-center text-white">
              <div className="bg-white/20 p-3 rounded-full mb-4">
                <span className="material-symbols-outlined text-4xl">lock_reset</span>
              </div>
              <h2 className="tracking-light text-2xl font-bold leading-tight text-center">Reset Password</h2>
              <p className="text-white/80 text-sm font-normal leading-normal text-center mt-2 px-4">Create a strong password to secure your staff account.</p>
            </div>
            <div className="px-8 py-8 flex flex-col gap-6">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="flex flex-col w-full">
                    <p className="text-brand-dark dark:text-gray-200 text-sm font-medium leading-normal pb-2">New Password</p>
                    <div className="flex w-full items-stretch rounded-lg">
                      <input
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-brand-dark dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbdfe6] dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-primary h-12 placeholder:text-gray-400 p-[15px] rounded-r-none border-r-0 text-base font-normal leading-normal"
                        placeholder="Enter new password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <div
                        className="text-gray-400 dark:text-gray-500 flex border border-[#dbdfe6] dark:border-gray-700 bg-white dark:bg-gray-800 items-center justify-center px-3 rounded-r-lg border-l-0 cursor-pointer hover:text-primary transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                      </div>
                    </div>
                  </label>
                  <div className="flex flex-col gap-1.5 mt-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Strength: {getStrengthText(strength)}</span>
                      <span className={`text-xs font-medium ${strength === 100 ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}`}>{strength}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div className={`h-full transition-all duration-300 ${getStrengthColor(strength)}`} style={{ width: `${strength}%` }}></div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="flex flex-col w-full">
                    <p className="text-brand-dark dark:text-gray-200 text-sm font-medium leading-normal pb-2">Confirm Password</p>
                    <div className="flex w-full items-stretch rounded-lg">
                      <input
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-brand-dark dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbdfe6] dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-primary h-12 placeholder:text-gray-400 p-[15px] rounded-r-none border-r-0 text-base font-normal leading-normal"
                        placeholder="Re-type new password"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <div
                        className="text-gray-400 dark:text-gray-500 flex border border-[#dbdfe6] dark:border-gray-700 bg-white dark:bg-gray-800 items-center justify-center px-3 rounded-r-lg border-l-0 cursor-pointer hover:text-primary transition-colors"
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
                <div className="pt-2">
                  <button
                    className={`w-full h-12 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 ${strength === 100 && passwordsMatch ? 'bg-primary hover:bg-primary/90' : 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'}`}
                    disabled={strength < 100 || !passwordsMatch}
                    type="submit"
                  >
                    <span>Reset Password</span>
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </button>
                  <Link
                    to="/hospital/login"
                    className="w-full mt-4 text-gray-500 dark:text-gray-400 text-sm font-medium hover:text-primary transition-colors block text-center"
                  >
                    Back to Login
                  </Link>
                </div>
              </form>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 px-8 py-4 border-t border-[#dbdfe6] dark:border-gray-800">
              <div className="flex flex-col gap-2">
                <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400 dark:text-gray-500">Requirements</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  <Requirement item="8+ Characters" satisfied={password.length >= 8} />
                  <Requirement item="1 Uppercase" satisfied={/[A-Z]/.test(password)} />
                  <Requirement item="1 Number" satisfied={/[0-9]/.test(password)} />
                  <Requirement item="1 Special char" satisfied={/[^A-Za-z0-9]/.test(password)} />
                </div>
              </div>
            </div>
          </div>
        </main>
        <footer className="p-6 text-center">
          <p className="text-gray-400 text-xs">© 2024 CareStaff Pro. All rights reserved. Secure Healthcare Management.</p>
        </footer>
      </div>
    </div>
  );
};

const Requirement = ({ item, satisfied }) => (
  <div className={`flex items-center gap-1.5 text-[11px] ${satisfied ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'}`}>
    <span className="material-symbols-outlined text-xs">{satisfied ? 'check' : 'circle'}</span>
    {item}
  </div>
);

export default ResetPassword;
