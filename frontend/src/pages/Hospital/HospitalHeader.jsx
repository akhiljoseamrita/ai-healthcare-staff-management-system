import React from 'react';

const HospitalHeader = () => {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-8 py-4">
      <div className="flex items-center gap-6 flex-1">
        <div className="relative w-full max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
          <input className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-[#135bec]/20 placeholder:text-slate-500 outline-none" placeholder="Search staff, shifts, or departments..." type="text" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
        </button>
        <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>
        
        {/* Static Profile Section */}
        <div className="flex items-center gap-3 p-1 rounded-lg">
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold leading-none text-slate-900 dark:text-white">Admin User</p>
            <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-wider">Hospital Admin</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-slate-200 bg-cover bg-center border border-slate-300" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDnVYnz6JIsW-VJwe5ZT1_Bq_-Rd6D9pZuKTa7dk9IQ54sFTPJLpZ-pppg5B7BAjTU4LtOpTcKaHs4hJjwHHNhwfHfj5eK1uZJvfVTa1WesNu-Z3J-NkGXVWRGL7w4pW3fpsn-uA3TnlhW1BuhdbxS6CF_UzMyEbCYcQJeWYnGcFW7FGjsMDRA_ZUl6MIb1RDiWa4ZVnwRhBhVF1FaIzjOhiqBFPo4BOTpAcXJAkAFGx4g3ujFU6j-p3TkT31lux8j6rm0ntnFZ3_I')" }}></div>
        </div>
      </div>
    </header>
  );
};

export default HospitalHeader;