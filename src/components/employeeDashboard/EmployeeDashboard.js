import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRole, getUsername } from "../../service/authorization";
import { getUser } from "../../service/userApis";
import AleartBox from "../sharedComponent/alertBox/AleartBox";
import Navbar from "../navbar/Navbar";
import Home from "../home/Home";
import AgentRegistration from "../agentRegistration/AgentRegistration";
import CustomerRegistration from "../customerRegistration/CustomerRegistration";
import Plan from "../sharedComponent/plan/Plan";
import Employees from "../employees/Employees";
import Agents from "../agents/Agents";
import EmployeePolicies from "../employeePolicies/EmployeePolicies";
import Query from "../query/Query";
import EmployeeClaim from "../employeeClaim/EmployeeClaim";
import EmployeeCustomers from "../employeeCustomers/EmployeeCustomers";

const AGENTS = process.env.REACT_APP_AGENTS;
const AGENT_REGISTRATION = process.env.REACT_APP_AGENT_REGISTRATION;
const CUSTOMER_REGISTRATION = process.env.REACT_APP_CUSTOMER_REGISTRATION; 
const EMPLOYEE_CLAIMS = process.env.REACT_APP_EMPLOYEE_CLAIMS;
const EMPLOYEE_POLICIES = process.env.REACT_APP_EMPLOYEE_POLICIES;
const HOME = process.env.REACT_APP_HOME; 
const PLAN = process.env.REACT_APP_PLAN; 
const QUERY = process.env.REACT_APP_QUERY;
const ROLE_EMPLOYEE = process.env.REACT_APP_ROLE_EMPLOYEE;
const EMPLOYEE_CUSTOMERS = process.env.REACT_APP_EMPLOYEE_CUSTOMERS;


const EmployeeDashboard = () => {
  const navigation = useNavigate();
  const token = localStorage.getItem("auth");
  const username = useParams().username;
  const [component, setComponent] = useState(HOME);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState(null);
  const [alertSuccess, setAlertSuccess] = useState(null);
  const [planid, setPlanid] = useState(null);
  const message = "Unauthorized access. Redirecting to home page..."


  const validateUser = async () => {
    const prevUsername = localStorage.getItem("prev-username")
    if (!token) {
      navigation("/");
      return;
    }

    const response1 = await getRole(token);
    if (response1.data !== ROLE_EMPLOYEE) {
      navigation(`/info/${prevUsername}/${message}`);
      return;
    }

    const response2 = await getUsername(token);
    if (response2.data !== username) {
      navigation(`/info/${prevUsername}/${message}`);
      return;
    }

    localStorage.setItem("prev-username", username);
    fetchUser();
    return;
  };

  const fetchUser = async () => {
    try {
      const response = await getUser(username, token);
      setUser(response.data);
    } catch (e) {
      setAlert(e.response.data);
    }
  };

  useEffect(() => {
    validateUser();
  }, []);


  return (
    <>
      {alert && <AleartBox message={alert} setAlert={setAlert} />}
      {user && (
        <Navbar setComponent={setComponent} user={user} setPlanid={setPlanid} />
      )}
      {component === HOME && <Home />}
      {component === AGENT_REGISTRATION && <AgentRegistration />}
      {component === CUSTOMER_REGISTRATION && <CustomerRegistration />}
      {component === PLAN && <Plan planid={planid} />}
      {component === AGENTS && <Agents />}
      {component === EMPLOYEE_CUSTOMERS && <EmployeeCustomers />}
      {component === EMPLOYEE_POLICIES && <EmployeePolicies />}
      {component === EMPLOYEE_CLAIMS && <EmployeeClaim />}
      {component === QUERY && <Query /> }

    </>
  );
};

export default EmployeeDashboard;
