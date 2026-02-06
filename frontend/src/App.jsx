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
import LandingPage from './pages/LandingPage';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ResetSuccess from './pages/ResetSuccess';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<LandingPage />} />
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
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/reset-success" element={<ResetSuccess />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
