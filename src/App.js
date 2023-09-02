
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AdminRegistration from './components/adminRegistration/AdminRegistration';
import Dashboard from './components/dashboard/Dashboard';
import CustomerDashboard from './components/customerDashboard/CustomerDashboard';
import AdminDashboard from './components/adminDashboard/AdminDashboard';
import EmployeeDashboard from './components/employeeDashboard/EmployeeDashboard';
import AgentDashboard from './components/agentDashboard/AgentDashboard';
import Info from './components/Info/Info';
import Promote from './components/sharedComponent/Promote/Promote';


function App() {
  return (
    <>
    <Routes>
      <Route path='/adminregistration' element={<AdminRegistration />} />
      <Route path='/' element={<Dashboard />} />
      <Route path='/admin/:username' element={<AdminDashboard />} />
      <Route path='/employee/:username' element={<EmployeeDashboard />} />
      <Route path='/agent/:username' element={<AgentDashboard/>} />
      <Route path='/customer/:username' element={<CustomerDashboard />} />
      <Route path='/info/:username/:message' element={<Info />} />
    </Routes>
    </>
  );
}

export default App;
