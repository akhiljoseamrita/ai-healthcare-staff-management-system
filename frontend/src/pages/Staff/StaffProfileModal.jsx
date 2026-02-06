import React from 'react';

const StaffProfileModal = ({ staff, onClose }) => {
  if (!staff) return null;

  // Default values based on design reference if specific fields are missing
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
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-0"
        onClick={onClose}
      ></div>

      {/* Centered Modal Card */}
      <div className="relative z-10 w-full max-w-[520px] bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header Actions */}
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-500 dark:text-slate-400"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Profile Hero Section */}
        <div className="flex flex-col items-center pt-12 pb-6 px-6 text-center">
          <div className="relative mb-6">
            <div className="size-32 rounded-full border-4 border-white dark:border-slate-800 shadow-lg overflow-hidden bg-slate-100">
              <img
                alt={`Profile of ${name}`}
                className="w-full h-full object-cover"
                src={avatar}
              />
            </div>
            {/* Status Dot */}
            <div className="absolute bottom-1 right-3 size-6 bg-white dark:bg-background-dark rounded-full flex items-center justify-center">
              <div className="size-4 bg-green-500 rounded-full border-2 border-white dark:border-background-dark"></div>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{name}</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium mb-4">{role}</p>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-semibold">
            <span className="material-symbols-outlined text-base">check_circle</span>
            {status}
          </div>
        </div>

        {/* Divider */}
        <div className="px-8">
          <div className="h-px bg-slate-100 dark:bg-slate-800 w-full"></div>
        </div>

        {/* Information Grid */}
        <div className="p-8">
          <div className="grid grid-cols-2 gap-4">
            {/* Age Card */}
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex flex-col gap-2">
              <span className="material-symbols-outlined text-primary">calendar_today</span>
              <div>
                <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Age</div>
                <div className="text-lg font-bold text-slate-900 dark:text-white">{age}</div>
              </div>
            </div>
            {/* Location Card */}
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex flex-col gap-2">
              <span className="material-symbols-outlined text-primary">location_on</span>
              <div>
                <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Location</div>
                <div className="text-lg font-bold text-slate-900 dark:text-white">{location}</div>
              </div>
            </div>
            {/* Native Country Card */}
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex flex-col gap-2">
              <span className="material-symbols-outlined text-primary">public</span>
              <div>
                <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Native Country</div>
                <div className="text-lg font-bold text-slate-900 dark:text-white">{country}</div>
              </div>
            </div>
            {/* Experience Card */}
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex flex-col gap-2">
              <span className="material-symbols-outlined text-primary">work_history</span>
              <div>
                <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Experience</div>
                <div className="text-lg font-bold text-slate-900 dark:text-white">{experience}</div>
              </div>
            </div>
          </div>

          {/* Rating Section */}
          <div className="mt-8 flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Professional Rating</span>
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isFull = rating >= star;
                    const isHalf = !isFull && rating >= star - 0.5;
                    return (
                      <span
                        key={star}
                        className={`material-symbols-outlined ${isFull ? 'material-symbols-fill' : ''}`}
                      >
                        {isFull ? 'star' : (isHalf ? 'star_half' : 'star')}
                      </span>
                    );
                  })}
                </div>
                <span className="font-bold text-slate-900 dark:text-white">{rating}/5</span>
              </div>
            </div>
            <div className="text-xs text-slate-400 dark:text-slate-500 italic">Based on {reviews} reviews</div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-8 pb-8 pt-2">
          <button
            onClick={onClose}
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 px-6 rounded-lg transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaffProfileModal;
