import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HospitalDashboard from './pages/Hospital/HospitalDashboard';
import HospitalRegistration from './pages/Hospital/HospitalRegistration';
import PostNewShift from './pages/Hospital/PostNewShift';
import StaffDashboard from './pages/Staff/StaffDashboard';
import StaffShiftDetails from './pages/Staff/StaffShiftDetails';
import StaffAIRecommendations from './pages/Staff/StaffAIRecommendations';
import HospitalLogin from './pages/Hospital/HospitalLogin';
import HospitalAnalytics from './pages/Hospital/HospitalAnalytics';
import ManagerShiftManagement from './pages/Hospital/ManagerShiftManagement';
import StaffAuth from './pages/Staff/StaffAuth';
import HospitalDirectorySearch from './pages/Hospital/HospitalDirectorySearch';
import StaffDirectorySearch from './pages/Staff/StaffDirectorySearch';
import LandingPage from './pages/Common/LandingPage';
import ForgotPassword from './pages/Common/ForgotPassword';
import ResetPassword from './pages/Common/ResetPassword';
import ResetSuccess from './pages/Common/ResetSuccess';
import ComingSoon from './pages/Common/ComingSoon';

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
          <Route path="/hospital/search" element={<HospitalDirectorySearch />} />
          <Route path="/staff/dashboard" element={<StaffDashboard />} />
          <Route path="/staff/shift-details" element={<StaffShiftDetails />} />
          <Route path="/staff/recommendations" element={<StaffAIRecommendations />} />
          <Route path="/staff/search" element={<StaffDirectorySearch />} />
          <Route path="/staff/auth" element={<StaffAuth />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/reset-success" element={<ResetSuccess />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
