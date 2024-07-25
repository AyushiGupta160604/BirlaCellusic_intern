import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginSelection from './components/LoginSelection';
import UserLogin from './components/UserLogin';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import Setup from './components/Setup';
import AdminRequest from './components/Adminrequest';
import NewRequest from './components/NewRequest';
import HouseMaster from './components/House';
import ColonyMaster from './components/Colony';
import AgencyTable from './components/Agency';
import RequestStatus from './components/JobRequestStatus';
import ReportMenu from './components/ReportMenu';
import RequestDetail from './components/RequestDetail';
import AgencyReport from './components/AgencyReport';
import BlockReport from './components/BlockReport';
import HouseReport from './components/HouseWiseReport';
import History from './components/userHistory';
import FeedbackForm from './components/FeedbackForm';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<LoginSelection />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/admin-login" exact element={<AdminLogin />} />
        <Route path="/admin-dashboard" exact element={<AdminDashboard />} />
        <Route path="/user-dashboard" exact element={<UserDashboard />} />
        <Route path="/setup" exact element={<Setup />} />
        <Route path="/AdminRequest" exact element={<AdminRequest />} />
        <Route path="/new-request" exact element={<NewRequest />} />
        <Route path="/agency" exact element={<AgencyTable />} />
        <Route path="/house" exact element={<HouseMaster />} />
        <Route path="/colony" exact element={<ColonyMaster />} />
        <Route path="/request-status" exact element={<RequestStatus />} />
        <Route path="/menu" exact element={<ReportMenu />} />
        <Route path="/agency-report" exact element={<AgencyReport />} />
        <Route path="/block-report" exact element={<BlockReport />} />
        <Route path="/house-report" exact element={<HouseReport />} />
        <Route path="/requests/:requestId" element={<RequestDetail />} />
        <Route path="/history" exact element={<History />} />
        <Route path="/feedback" exact element={<FeedbackForm />} />
      </Routes>
    </Router>
  );
}

export default App;