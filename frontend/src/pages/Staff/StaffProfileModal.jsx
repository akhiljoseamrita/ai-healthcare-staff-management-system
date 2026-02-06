import React from 'react';

const StaffProfileModal = ({ staff, onClose }) => {
  if (!staff) return null;

  const {
    name = "Sarah Jenkins",
    role = "ICU Nurse • Registered Professional",
    status = "Available Today",
    age = "32 Years",
    location = "London, UK",
    country = "United Kingdom",
    experience = "8 Years",
    rating = 4.8,
    reviews = 24,
    avatar = "https://lh3.googleusercontent.com/aida-public/AB6AXuAZmGZqh14YOtO8XbxS5zDjT3F-6f4Px0IcMARwTFBhQ55ER0XK69-zy2mfnx3A6a4fQfDrCNul77UP7cxLeSiHjnWL0Rd0TkpgR9G7jLgRxL_40lXty7V3Op8xdr22Mrgd-l2BpzIW_Z6XcjcHn3w7beKy0-Zl2CmoxDYa1AxSVVuoxundsLJl4-DSAKAQgUR874S_ttb-3kt999pEd82fJtsKyqReOdpOYwzet3xms3E19h4nNwY8adDq8PNWjFwIWT-YUH0RuCo"
  } = staff;

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
      {/* Modal Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-0"
        onClick={onClose}
      ></div>

      {/* Centered Modal Card - Reduced max-width to 360px */}
      <div className="relative z-10 w-full max-w-[360px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header Actions */}
        <div className="absolute top-3 right-3 z-20">
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-500 dark:text-slate-400"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Profile Hero Section - Reduced padding and image size */}
        <div className="flex flex-col items-center pt-8 pb-4 px-4 text-center">
          <div className="relative mb-4">
            {/* Reduced size from size-32 to size-20 */}
            <div className="size-20 rounded-full border-3 border-white dark:border-slate-800 shadow-md overflow-hidden bg-slate-100">
              <img
                alt={`Profile of ${name}`}
                className="w-full h-full object-cover"
                src={avatar}
              />
            </div>
            {/* Status Dot */}
            <div className="absolute bottom-0 right-1 size-5 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center">
              <div className="size-3 bg-green-500 rounded-full border-2 border-white dark:border-slate-900"></div>
            </div>
          </div>
          
          {/* Reduced font sizes */}
          <h1 className="text-lg font-bold text-slate-900 dark:text-white mb-0.5">{name}</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-3">{role}</p>
          
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-semibold">
            <span className="material-symbols-outlined text-sm">check_circle</span>
            {status}
          </div>
        </div>

        {/* Divider */}
        <div className="px-5">
          <div className="h-px bg-slate-100 dark:bg-slate-800 w-full"></div>
        </div>

        {/* Information Grid - Reduced padding and gap */}
        <div className="p-5">
          <div className="grid grid-cols-2 gap-3">
            {/* Age Card */}
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex flex-col gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-[#135bec]">calendar_today</span>
              <div>
                <div className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Age</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">{age}</div>
              </div>
            </div>
            {/* Location Card */}
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex flex-col gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-[#135bec]">location_on</span>
              <div>
                <div className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Location</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white truncate">{location}</div>
              </div>
            </div>
            {/* Native Country Card */}
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex flex-col gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-[#135bec]">public</span>
              <div>
                <div className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Country</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white truncate">{country}</div>
              </div>
            </div>
            {/* Experience Card */}
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex flex-col gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-[#135bec]">work_history</span>
              <div>
                <div className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Exp.</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">{experience}</div>
              </div>
            </div>
          </div>

          {/* Rating Section - Compact */}
          <div className="mt-5 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-0.5">Rating</span>
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-400">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isFull = rating >= star;
                    const isHalf = !isFull && rating >= star - 0.5;
                    return (
                      <span
                        key={star}
                        className={`material-symbols-outlined text-base ${isFull ? 'material-symbols-fill' : ''}`}
                        style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 20" }}
                      >
                        {isFull ? 'star' : (isHalf ? 'star_half' : 'star')}
                      </span>
                    );
                  })}
                </div>
                <span className="text-sm font-bold text-slate-900 dark:text-white">{rating}</span>
              </div>
            </div>
            <div className="text-[10px] text-slate-400 dark:text-slate-500 italic mt-auto">({reviews} reviews)</div>
          </div>
        </div>

        {/* Footer Actions - Updated Color #135bec */}
        <div className="px-5 pb-5 pt-0">
          <button
            onClick={onClose}
            className="w-full bg-[#135bec] hover:bg-[#135bec]/90 text-white text-sm font-bold py-2.5 px-4 rounded-lg transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaffProfileModal;