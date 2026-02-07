import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display min-h-screen flex flex-col">
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#135bec]/10 dark:border-white/10 px-10 py-4 bg-white dark:bg-[#231830]">
        <div className="flex items-center gap-1">
          <div className="text-[#135bec] flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl">medical_services</span>
          </div>
          <h2 className="text-[#135bec] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Healthcare</h2>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-[960px] w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">

            <div className="bg-white dark:bg-[#231830] rounded-xl shadow-sm border border-[#135bec]/10 dark:border-white/5 flex flex-col overflow-hidden transition-transform hover:scale-[1.02] duration-300">
              <div
                className="w-full bg-center bg-no-repeat aspect-video bg-cover"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCp_tQH3YaDK43XrJOT3oCKSPYDKoKQPBpT7QQVc7Qdg9TVaHsNHavH1VYPhgbqdjpEcLoPgHktiYcQxoyX_qxXJnBVk-d60G1E-K-l4fYpXeTK4V8YK02GBEZl0XpLc9-YFISqU235EkONssLIIWzKssFeVcSvtrblDYakLqeaVStBSG6FBRkbrG6LN83WRIeWRRZBOgChsBaDpkjXXmBvYSdDcaoJDYxnAdXAhcX6By1OHJedOj64586STVTH7qq2KQ8H8iOPe9w")' }}
                aria-label="Modern minimalist hospital building"
              >
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-[#135bec] text-3xl">domain</span>
                  <h3 className="text-2xl font-bold text-[#000] dark:text-white">Hospital</h3>
                </div>
                <p className="text-[#000] dark:text-[#8aaef7] text-base mb-8 flex-grow">
                  Post and manage healthcare staff shifts, track performance, and streamline your facility's operations.
                </p>
                <Link to="/hospital/login" className="w-full cursor-pointer flex items-center justify-center rounded-lg h-14 bg-[#135bec] text-white text-lg font-bold tracking-[0.015em] hover:bg-[#135bec]/90 transition-colors">
                  Continue as Hospital
                </Link>
              </div>
            </div>

            <div className="bg-white dark:bg-[#231830] rounded-xl shadow-sm border border-[#135bec]/10 dark:border-white/5 flex flex-col overflow-hidden transition-transform hover:scale-[1.02] duration-300">
              <div
                className="w-full bg-center bg-no-repeat aspect-video bg-cover"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD-b7lVmyP98eyZyd7Sjkx3YPV1yMMkmAn9wRBbr3BorRPRDUuvfaxiib4Bk1DeB8UgUzsTyx5YdP7K1PGdimfBgRyvY6KYu2d8G-QXMaT8FlhirbHTMCQ-zkxE3svo_Xz4g3pSfV8vfI0AZzUnug0PO1w_TjQRbbWk_y6AjKanMrd6aPNjqSzHPJWiNknGw2s7wvcOYybZabCfBKx6BBkPO_5ANFS79yjYZZOHJoiTMJwxDNORDeJzNMlbw7pRYF7ek1tJr9TJ_qU")' }}
                aria-label="Healthcare professional in uniform"
              >
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-[#135bec] text-3xl">medical_information</span>
                  <h3 className="text-2xl font-bold text-[#000] dark:text-white">Staff</h3>
                </div>
                <p className="text-[#000] dark:text-[#8aaef7] text-base mb-8 flex-grow">
                  Find and apply for hospital shifts that fit your schedule. Take control of your career and work-life balance.
                </p>
                <Link to="/staff/auth" className="w-full cursor-pointer flex items-center justify-center rounded-lg h-14 bg-[#135bec] text-white text-lg font-bold tracking-[0.015em] hover:bg-[#135bec]/90 transition-colors">
                  Continue as Staff
                </Link>
              </div>
            </div>

          </div>
        </div>
      </main>

      <footer className="mt-auto py-8 border-t border-solid border-[#000]/10 dark:border-white/10 bg-white dark:bg-[#231830]">
        <div className="max-w-[960px] mx-auto px-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#000] dark:text-[#8aaef7] text-sm">© 2026 Health Management System. All rights reserved.</p>
          <div className="flex gap-6">
            <a className="text-[#000] dark:text-[#8aaef7] text-sm hover:opacity-80 transition-opacity" href="#">Privacy Policy</a>
            <a className="text-[#000] dark:text-[#8aaef7] text-sm hover:opacity-80 transition-opacity" href="#">Terms of Service</a>
            <a className="text-[#000] dark:text-[#8aaef7] text-sm hover:opacity-80 transition-opacity" href="#">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;