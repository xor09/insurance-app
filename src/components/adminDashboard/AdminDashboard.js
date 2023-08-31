import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ADD_SCHEME,
  AGENT_REGISTRATION,
  ALL_EMPLOYEES,
  ALL_PLANS,
  ALL_SCHEME,
  CUSTOMER_REGISTRATION,
  HOME,
  PLAN,
  QUERY,
  ROLE_ADMIN,
  ROLE_CUSTOMER,
  SCHEMES,
} from "../../assets/constants";
import { getRole, getUsername } from "../../service/authorization";
import { getUser } from "../../service/userApis";
import AleartBox from "../sharedComponent/alertBox/AleartBox";
import Navbar from "../navbar/Navbar";
import Scheme from "../scheme/Scheme";
import Plans from "../plans/Plans";
import Plan from "../sharedComponent/plan/Plan";
import Home from "../home/Home";
import AgentRegistration from "../agentRegistration/AgentRegistration";
import CustomerRegistration from "../customerRegistration/CustomerRegistration";
import Employees from "../employees/Employees";
import SchemeRegistration from "../schemeRegistration/SchemeRegistration";
import Schemes from "../schemes/Schemes";
import Query from "../query/Query";

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
    if (response1.data !== ROLE_ADMIN) {
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
