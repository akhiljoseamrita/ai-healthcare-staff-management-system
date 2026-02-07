import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 overflow-x-hidden">
      {/* Top Header */}
      <div className="bg-brand-maroon text-white py-2 px-4 md:px-12 flex justify-between items-center text-xs md:text-sm">
        <div className="flex gap-4">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">call</span>
            +91 99000 00000
          </span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">mail</span>
            info@ajcomforts.in
          </span>
        </div>
        <div className="flex gap-3 items-center">
          <span className="material-symbols-outlined text-lg cursor-pointer hover:text-brand-gold transition">facebook</span>
          <span className="material-symbols-outlined text-lg cursor-pointer hover:text-brand-gold transition">public</span>
          <span className="material-symbols-outlined text-lg cursor-pointer hover:text-brand-gold transition">share</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm px-4 md:px-12 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
           <div className="bg-brand-maroon text-white p-1 rounded-full w-12 h-10 flex items-center justify-center font-serif font-bold text-[8px] text-center leading-none border-2 border-brand-gold">
             AJ Comforts
           </div>
           <span className="font-serif font-bold text-xl text-brand-maroon tracking-tight hidden sm:inline">AJ COMFORTS</span>
        </div>
        <div className="flex gap-4 md:gap-8 items-center font-bold text-xs md:text-sm uppercase tracking-wide">
          <a href="#" className="hover:text-brand-maroon transition hidden lg:inline">Home</a>
          <a href="#" className="hover:text-brand-maroon transition hidden lg:inline">About Us</a>
          <a href="#" className="hover:text-brand-maroon transition hidden lg:inline">Rooms</a>
          <a href="#" className="hover:text-brand-maroon transition hidden lg:inline">Services</a>
          <Link to="/staff/auth" className="text-brand-maroon font-black hover:text-brand-gold transition">STAFF PORTAL</Link>
          <Link to="/hospital/login" className="bg-brand-maroon text-white px-4 md:px-6 py-2 rounded font-black hover:bg-brand-gold transition">REGISTER</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[85vh] flex items-center justify-center text-center text-white">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=2000"
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 max-w-5xl px-4 flex flex-col items-center">
          <h4 className="font-serif italic text-lg md:text-2xl mb-4 text-white/90">The Best Place To Relax & Enjoy</h4>
          <h1 className="font-serif text-4xl md:text-7xl font-black mb-6 leading-tight max-w-4xl">Business Travelers' Haven Near Key Hubs.</h1>
          <p className="text-sm md:text-lg mb-8 max-w-2xl mx-auto text-white/80 font-light">
            Experience unparalleled hospitality and comfort at AJ Comforts, where every stay is meticulously crafted to exceed your expectations.
          </p>
          <button className="bg-brand-maroon text-white px-10 py-3 rounded font-black hover:bg-brand-gold transition tracking-widest text-sm">EXPLORE MORE</button>
        </div>
      </section>

      {/* Booking Bar */}
      <div className="max-w-6xl mx-auto -mt-10 md:-mt-16 relative z-30 bg-brand-maroon p-6 md:p-8 rounded shadow-2xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-6 items-end text-white text-[10px] font-bold tracking-widest">
         <div className="flex flex-col gap-2">
           <label>ROOMS</label>
           <select className="bg-transparent border-b border-white/50 p-2 outline-none cursor-pointer focus:border-white transition">
             <option className="text-black">Please Select</option>
             <option className="text-black">Deluxe Room</option>
             <option className="text-black">Suite Room</option>
           </select>
         </div>
         <div className="flex flex-col gap-2">
           <label>CHECK IN</label>
           <input type="date" className="bg-transparent border-b border-white/50 p-2 outline-none w-full cursor-pointer focus:border-white transition" />
         </div>
         <div className="flex flex-col gap-2">
           <label>CHECK OUT</label>
           <input type="date" className="bg-transparent border-b border-white/50 p-2 outline-none w-full cursor-pointer focus:border-white transition" />
         </div>
         <div className="flex flex-col gap-2">
           <label>ADULTS</label>
           <select className="bg-transparent border-b border-white/50 p-2 outline-none cursor-pointer focus:border-white transition">
             <option className="text-black">01</option>
             <option className="text-black">02</option>
           </select>
         </div>
         <div className="flex flex-col gap-2">
           <label>CHILDREN</label>
           <select className="bg-transparent border-b border-white/50 p-2 outline-none cursor-pointer focus:border-white transition">
             <option className="text-black">00</option>
             <option className="text-black">01</option>
           </select>
         </div>
         <button className="bg-white text-brand-maroon h-12 rounded font-black hover:bg-brand-gold hover:text-white transition shadow-lg">SEARCH</button>
      </div>

      {/* About Section */}
      <section className="py-24 px-4 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
        <div className="w-full md:w-1/2 relative">
          <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=1000" alt="Hospitality" className="rounded-lg shadow-2xl relative z-10" />
          <div className="absolute -top-6 -left-6 w-32 h-32 bg-brand-tan -z-0 rounded-lg"></div>
        </div>
        <div className="w-full md:w-1/2">
          <h4 className="text-brand-gold font-black tracking-[0.3em] text-[10px] mb-4 uppercase">AJ Comfort Since 2022</h4>
          <h2 className="font-serif text-4xl md:text-5xl font-black mb-8 text-brand-maroon leading-tight">Redefining Hospitality with Comfort & Ease</h2>
          <p className="text-gray-500 mb-8 leading-relaxed text-sm md:text-base italic">
            "At AJ Comforts, we believe that true luxury lies in the details. Our mission is to provide an oasis of calm and comfort for the modern traveler, combining traditional hospitality with contemporary excellence."
          </p>
          <button className="border-b-2 border-brand-maroon text-brand-maroon font-black pb-1 hover:text-brand-gold hover:border-brand-gold transition text-sm">READ MORE</button>

          <div className="flex items-center gap-6 mt-16 border-t border-gray-100 pt-10">
            <div className="text-6xl font-serif font-black text-brand-maroon">10</div>
            <div className="text-[10px] font-black uppercase tracking-widest leading-tight text-gray-400">
              Years of Excellence <br/> in Hospitality Services
            </div>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="bg-brand-tan/50 py-24 px-4 md:px-12">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <h4 className="text-brand-gold font-black tracking-[0.3em] text-[10px] mb-4 uppercase">Amenities</h4>
          <h2 className="font-serif text-4xl md:text-5xl font-black text-brand-maroon">Make Your Stay Memorable</h2>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            { icon: 'airport_shuttle', title: 'Pick Up & Drop', desc: 'Seamless transportation to ensure your journey is as comfortable as your stay.' },
            { icon: 'local_parking', title: 'Parking Space', desc: 'Secure and monitored parking facilities available around the clock for all guests.' },
            { icon: 'room_service', title: 'Room Service', desc: 'Exquisite culinary experiences delivered directly to your door at any hour.' },
            { icon: 'wifi', title: 'Free WIFI', desc: 'Stay connected with ultra-fast fiber-optic internet across our entire premises.' },
            { icon: 'free_breakfast', title: 'Free Breakfast', desc: 'Begin your morning with a curated selection of fresh, gourmet breakfast options.' },
            { icon: 'sanitizer', title: 'Clean and hygienic stay', desc: 'Rigorous sanitization protocols to ensure a safe and pristine environment for you.' },
          ].map((item, i) => (
            <div key={i} className="bg-white p-10 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
              <div className="bg-brand-tan w-20 h-20 flex items-center justify-center rounded-lg mb-8 group-hover:bg-brand-maroon group-hover:text-white transition-colors duration-300">
                <span className="material-symbols-outlined text-4xl">{item.icon}</span>
              </div>
              <h3 className="text-xl font-black mb-4 text-brand-maroon">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-16">
          <button className="bg-brand-maroon text-white px-12 py-4 rounded font-black hover:bg-brand-gold transition shadow-lg tracking-widest text-sm">VIEW ALL SERVICES</button>
        </div>
      </section>

      {/* Rooms Showcase */}
      <section className="py-24 px-4 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h4 className="text-brand-gold font-black tracking-[0.3em] text-[10px] mb-4 uppercase">Hotel Facilities</h4>
            <h2 className="font-serif text-4xl md:text-5xl font-black text-brand-maroon leading-tight">Best Rooms & Suites</h2>
          </div>
          <button className="border-2 border-brand-maroon text-brand-maroon px-8 py-3 rounded font-black hover:bg-brand-maroon hover:text-white transition tracking-widest text-sm">EXPLORE ALL ROOMS</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 h-[600px] relative rounded-2xl overflow-hidden group shadow-2xl">
            <img src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Fine Dine" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-10">
               <span className="text-brand-gold text-[10px] font-black tracking-widest mb-2 uppercase">Restaurant</span>
               <h3 className="text-white text-3xl font-black">Fine Dine</h3>
               <p className="text-white/60 text-sm mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Experience culinary excellence in an atmosphere of refined elegance.</p>
            </div>
          </div>
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
             {[
               { title: 'Suite Room', price: '₹4,999/Night', img: 'https://images.unsplash.com/photo-1591088398332-8a77d4972842?auto=format&fit=crop&q=80&w=800' },
               { title: 'Deluxe Room', price: '₹3,499/Night', img: 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&q=80&w=800' },
               { title: 'Presidential Suite', price: '₹8,999/Night', img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=800' },
               { title: 'Single Room', price: '₹1,999/Night', img: 'https://images.unsplash.com/photo-1505691938895-1758d7eaa511?auto=format&fit=crop&q=80&w=800' },
             ].map((room, i) => (
               <div key={i} className="h-[286px] relative rounded-2xl overflow-hidden group shadow-xl">
                 <img src={room.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={room.title} />
                 <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300"></div>
                 <div className="absolute bottom-8 left-8">
                   <span className="text-brand-gold text-[10px] font-black tracking-widest uppercase">{room.price}</span>
                   <h3 className="text-white text-2xl font-black mt-1">{room.title}</h3>
                   <button className="bg-white text-brand-maroon text-[10px] px-4 py-2 rounded mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 font-black uppercase tracking-widest">Book Now</button>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Promo Section */}
      <section className="bg-brand-maroon py-24 text-center text-white relative overflow-hidden">
         <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-32 -translate-y-32"></div>
         <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full translate-x-32 translate-y-32"></div>
         <div className="relative z-10 max-w-4xl mx-auto px-4">
           <h3 className="uppercase tracking-[0.4em] text-[10px] font-black mb-6 opacity-70">Special Offer</h3>
           <h2 className="text-7xl md:text-9xl font-serif font-black mb-6 flex items-center justify-center gap-4">
             20<span className="text-3xl md:text-5xl">%</span>
           </h2>
           <p className="uppercase tracking-[0.3em] font-black text-sm md:text-xl border-t border-b border-white/20 py-4 inline-block">Winter Best Promo Price</p>
           <div className="mt-12">
             <button className="bg-white text-brand-maroon px-10 py-3 rounded font-black hover:bg-brand-gold hover:text-white transition tracking-widest text-xs">RESERVE NOW</button>
           </div>
         </div>
      </section>

      {/* Local Food Section */}
      <section className="py-24 px-4 md:px-12 max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
        <div className="w-full lg:w-1/2 order-2 lg:order-1">
           <h4 className="text-brand-gold font-black tracking-[0.3em] text-[10px] mb-4 uppercase">Culinary Excellence</h4>
           <h2 className="font-serif text-4xl md:text-5xl font-black text-brand-maroon mb-8 leading-tight">Indulge in Exceptional & Local Food</h2>
           <p className="text-gray-500 mb-10 leading-relaxed text-sm md:text-base italic">
             "Our chefs specialize in blending traditional local flavors with modern gastronomic techniques to create a dining experience that is both authentic and innovative."
           </p>
           <div className="flex items-center gap-4 mb-10">
             <div className="w-12 h-[1px] bg-brand-gold"></div>
             <p className="font-black text-brand-maroon uppercase text-[10px] tracking-widest">OPEN 10 AM - 11 PM DAILY</p>
           </div>
           <button className="bg-brand-maroon text-white px-10 py-3 rounded font-black hover:bg-brand-gold transition tracking-widest text-xs shadow-lg">VIEW MENU</button>
        </div>
        <div className="w-full lg:w-1/2 grid grid-cols-2 gap-6 order-1 lg:order-2">
           <div className="space-y-6">
             <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=600" className="rounded-2xl shadow-xl w-full h-64 object-cover" alt="Food 1" />
             <img src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=600" className="rounded-2xl shadow-xl w-full h-80 object-cover" alt="Food 2" />
           </div>
           <div className="space-y-6 pt-12">
             <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=600" className="rounded-2xl shadow-xl w-full h-80 object-cover" alt="Food 3" />
             <img src="https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&q=80&w=600" className="rounded-2xl shadow-xl w-full h-64 object-cover" alt="Food 4" />
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-maroon text-white pt-24 pb-12 px-4 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 border-b border-white/10 pb-20">
          <div className="lg:col-span-1">
             <div className="flex items-center gap-2 mb-10">
                <div className="bg-white text-brand-maroon p-1 rounded-full w-12 h-10 flex items-center justify-center font-serif font-bold text-[8px] border-2 border-brand-gold">AJ Comforts</div>
                <span className="font-serif font-bold text-2xl tracking-tighter">AJ COMFORTS</span>
             </div>
             <p className="text-white/60 text-sm leading-relaxed mb-10 italic">
               Join our exclusive inner circle for the latest news and special member-only offers.
             </p>
             <div className="flex flex-col sm:flex-row gap-2">
                <input type="email" placeholder="Email Address" className="bg-white/5 border border-white/10 p-3 rounded flex-grow outline-none focus:bg-white/10 transition text-sm" />
                <button className="bg-white text-brand-maroon px-6 py-3 rounded font-black text-xs hover:bg-brand-gold hover:text-white transition shadow-xl">SIGN UP</button>
             </div>
          </div>

          <div>
            <h3 className="text-xl font-black mb-10 tracking-widest uppercase text-sm">Contact us</h3>
            <ul className="flex flex-col gap-6 text-white/60 text-sm">
               <li className="flex gap-4 items-start">
                 <span className="material-symbols-outlined text-brand-gold shrink-0">location_on</span>
                 <span>No. 12, High-End District, <br/>Kanakapura Road, Bangalore</span>
               </li>
               <li className="flex gap-4 items-center">
                 <span className="material-symbols-outlined text-brand-gold shrink-0">call</span>
                 <span>+91 99000 00000 / 01</span>
               </li>
               <li className="flex gap-4 items-center">
                 <span className="material-symbols-outlined text-brand-gold shrink-0">mail</span>
                 <span>info@ajcomforts.in</span>
               </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-black mb-10 tracking-widest uppercase text-sm">Useful links</h3>
            <ul className="grid grid-cols-2 gap-y-4 gap-x-8 text-white/60 text-sm font-bold">
               <li><a href="#" className="hover:text-brand-gold transition uppercase tracking-tighter">Home</a></li>
               <li><a href="#" className="hover:text-brand-gold transition uppercase tracking-tighter">About</a></li>
               <li><a href="#" className="hover:text-brand-gold transition uppercase tracking-tighter">Services</a></li>
               <li><a href="#" className="hover:text-brand-gold transition uppercase tracking-tighter">Suites</a></li>
               <li><a href="#" className="hover:text-brand-gold transition uppercase tracking-tighter">Blog</a></li>
               <li><a href="#" className="hover:text-brand-gold transition uppercase tracking-tighter">Careers</a></li>
               <li><a href="#" className="hover:text-brand-gold transition uppercase tracking-tighter">Privacy</a></li>
               <li><a href="#" className="hover:text-brand-gold transition uppercase tracking-tighter">FAQ</a></li>
            </ul>
          </div>

          <div className="flex flex-col lg:items-end">
             <h3 className="text-xl font-black mb-10 tracking-widest uppercase text-sm">Follow us</h3>
             <div className="flex gap-4">
                {['facebook', 'public', 'share', 'videocam'].map((icon, i) => (
                  <span key={i} className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-brand-maroon transition-all duration-300 cursor-pointer group shadow-xl">
                    <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">{icon}</span>
                  </span>
                ))}
             </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-[10px] text-white/40 font-black tracking-[0.2em] uppercase">
           <p>© 2022 AJ Comforts. All rights reserved.</p>
           <div className="flex gap-8 mt-4 md:mt-0">
             <p>Designed by AkhilJo</p>
             <p>Powered by AJ Comforts</p>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
