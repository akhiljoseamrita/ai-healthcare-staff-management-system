import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HospitalDashboard from './pages/HospitalDashboard';
import HospitalRegistration from './pages/HospitalRegistration';
import PostNewShift from './pages/PostNewShift';
import StaffDashboard from './pages/StaffDashboard';
import StaffShiftDetails from './pages/StaffShiftDetails';
import StaffAIRecommendations from './pages/StaffAIRecommendations';
import HospitalLogin from './pages/HospitalLogin';
import HospitalAnalytics from './pages/HospitalAnalytics';
import ManagerShiftManagement from './pages/ManagerShiftManagement';
import StaffAuth from './pages/StaffAuth';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        {/* Navigation for development purposes */}
        <nav className="bg-slate-800 text-white p-2 text-xs flex flex-wrap gap-2 sticky top-0 z-[100] opacity-50 hover:opacity-100 transition-opacity">
          <Link to="/hospital/dashboard">H-Dashboard</Link>
          <Link to="/hospital/register">H-Register</Link>
          <Link to="/hospital/login">H-Login</Link>
          <Link to="/hospital/post-shift">H-PostShift</Link>
          <Link to="/hospital/analytics">H-Analytics</Link>
          <Link to="/hospital/manage-shift">H-ManageShift</Link>
          <Link to="/staff/dashboard">S-Dashboard</Link>
          <Link to="/staff/shift-details">S-Details</Link>
          <Link to="/staff/recommendations">S-AI</Link>
          <Link to="/staff/auth">S-Auth</Link>
          <button onClick={() => document.documentElement.classList.toggle('dark')} className="ml-auto bg-slate-600 px-2 rounded">Toggle Dark Mode</button>
        </nav>

        <Routes>
          <Route path="/" element={<HospitalDashboard />} />
          <Route path="/hospital/dashboard" element={<HospitalDashboard />} />
          <Route path="/hospital/register" element={<HospitalRegistration />} />
          <Route path="/hospital/login" element={<HospitalLogin />} />
          <Route path="/hospital/post-shift" element={<PostNewShift />} />
          <Route path="/hospital/analytics" element={<HospitalAnalytics />} />
          <Route path="/hospital/manage-shift" element={<ManagerShiftManagement />} />
          <Route path="/staff/dashboard" element={<StaffDashboard />} />
          <Route path="/staff/shift-details" element={<StaffShiftDetails />} />
          <Route path="/staff/recommendations" element={<StaffAIRecommendations />} />
          <Route path="/staff/auth" element={<StaffAuth />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
