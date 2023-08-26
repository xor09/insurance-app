
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AdminRegistration from './components/adminRegistration/AdminRegistration';
import EmployeeRegistration from './components/employeeRegistration/EmployeeRegistration';
import Login from './components/login/Login';
import AgentRegistration from './components/agentRegistration/AgentRegistration';
import CustomerRegistration from './components/customerRegistration/CustomerRegistration';
import Scheme from './components/scheme/Scheme';
import Dashboard from './components/dashboard/Dashboard';
import CustomerDashboard from './components/customerDashboard/CustomerDashboard';
import AdminDashboard from './components/adminDashboard/AdminDashboard';
import EmployeeDashboard from './components/employeeDashboard/EmployeeDashboard';


function App() {
  return (
    <>
    <Routes>
      <Route path='/login' element={<Login />}/>
      <Route path='/adminregistration' element={<AdminRegistration />} />
      <Route path='/' element={<Dashboard />} />
      <Route path='/admin/:username' element={<AdminDashboard />} />
      <Route path='/employee/:username' element={<EmployeeDashboard />} />
      <Route path='/agent/:username' element={<Dashboard />} />
      <Route path='/customer/:username' element={<CustomerDashboard />} />
      <Route path='/scheme' element={<Scheme />} />
    </Routes>
    </>
  );
}

export default App;
