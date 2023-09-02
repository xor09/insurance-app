import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRole, getUsername } from "../../service/authorization";
import { getUser } from "../../service/userApis";
import AleartBox from "../sharedComponent/alertBox/AleartBox";
import Navbar from "../navbar/Navbar";
import Plans from "../plans/Plans";
import Plan from "../sharedComponent/plan/Plan";
import Home from "../home/Home";
import AgentRegistration from "../agentRegistration/AgentRegistration";
import CustomerRegistration from "../customerRegistration/CustomerRegistration";
import Employees from "../employees/Employees";
import SchemeRegistration from "../schemeRegistration/SchemeRegistration";
import Schemes from "../schemes/Schemes";
import Query from "../query/Query";

const ADD_SCHEME = process.env.REACT_APP_ADD_SCHEME;
const AGENT_REGISTRATION = process.env.REACT_APP_AGENT_REGISTRATION;
const ALL_EMPLOYEES = process.env.REACT_APP_ALL_EMPLOYEES;
const ALL_PLANS = process.env.REACT_APP_ALL_PLANS;
const ALL_SCHEME = process.env.REACT_APP_ALL_SCHEME;
const CUSTOMER_REGISTRATION = process.env.REACT_APP_CUSTOMER_REGISTRATION;
const HOME = process.env.REACT_APP_HOME;
const PLAN = process.env.REACT_APP_PLAN;
const QUERY = process.env.REACT_APP_QUERY;
const ROLE_ADMIN = process.env.REACT_APP_ROLE_ADMIN;


const AdminDashboard = () => {
  const navigation = useNavigate();
  const token = localStorage.getItem("auth");
  const username = useParams().username;
  const [component, setComponent] = useState(HOME);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState(null);
  const [alertSuccess, setAlertSuccess] = useState(null);
  const [planid, setPlanid] = useState(null);

  const validateUser = async () => {
    if (!token) {
      navigation("/");
      return;
    }

    const response1 = await getRole(token);
    if (response1.data !== "ROLE_ADMIN") {
      localStorage.removeItem("auth");
      navigation("/");
      return;
    }

    const response2 = await getUsername(token);
    if (response2.data !== username) {
      localStorage.removeItem("auth");
      navigation("/");
      return;
    }

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
      {component === ALL_EMPLOYEES && <Employees />}
      {component === ALL_PLANS && <Plans />}
      {component === PLAN && <Plan planid={planid} />}
      {component === ADD_SCHEME && <SchemeRegistration />}
      {component === ALL_SCHEME && <Schemes />}
      {component === QUERY && <Query /> }
    </>
  );
};

export default AdminDashboard;
