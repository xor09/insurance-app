import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRole, getUsername } from "../../service/authorization";
import {
  AGENT_POLICIES,
  AGENT_PROMOTION,
  AGENT_REGISTRATION,
  AGENT_WITHDRAW,
  CUSTOMER_REGISTRATION,
  HOME,
  PLAN,
  PROFILE,
  ROLE_AGENT,
} from "../../assets/constants";
import { getUser } from "../../service/userApis";
import AleartBox from "../sharedComponent/alertBox/AleartBox";
import Navbar from "../navbar/Navbar";
import Home from "../home/Home";
import AgentRegistration from "../agentRegistration/AgentRegistration";
import CustomerRegistration from "../customerRegistration/CustomerRegistration";
import Plan from "../sharedComponent/plan/Plan";
import SchemeRegistration from "../schemeRegistration/SchemeRegistration";
import AgentProfile from "../agentProfile/AgentProfile";
import AgentPolicies from "../agentPolicies/AgentPolicies";
import AgentWithdraws from "../agentWithdraws/AgentWithdraws";
import Promote from "../sharedComponent/Promote/Promote";

const AgentDashboard = () => {
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
    if (response1.data !== ROLE_AGENT) {
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
      {component === PLAN && <Plan planid={planid} />}
      {component === PROFILE && <AgentProfile user={user} />}
      {component === AGENT_POLICIES && <AgentPolicies user={user} />}
      {component === AGENT_WITHDRAW && <AgentWithdraws user={user} />}
      {component === AGENT_PROMOTION && <Promote user={user} />}
    </>
  );
};

export default AgentDashboard;
