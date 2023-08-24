
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AdminRegistration from './components/adminRegistration/AdminRegistration';
import EmployeeRegistration from './components/employeeRegistration/EmployeeRegistration';
import Login from './components/login/Login';
import AgentRegistration from './components/agentRegistration/AgentRegistration';
import CustomerRegistration from './components/customerRegistration/CustomerRegistration';


function App() {
  return (
    <>
    <Routes>
      <Route path='/login' element={<Login />}/>
      <Route path='/adminregistration' element={<AdminRegistration />} />
      <Route path='/employeeregistration' element={<EmployeeRegistration />} />
      <Route path='/agentregistration' element={<AgentRegistration />} />
      <Route path='/customerregistration' element={<CustomerRegistration />} />
    </Routes>
    </>
  );
}

export default App;
