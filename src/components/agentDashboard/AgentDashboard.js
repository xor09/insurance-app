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
import AgentProfile from "../agentProfile/AgentProfile";
import AgentPolicies from "../agentPolicies/AgentPolicies";
import AgentWithdraws from "../agentWithdraws/AgentWithdraws";
import Promote from "../sharedComponent/Promote/Promote";

const AGENT_POLICIES = process.env.REACT_APP_AGENT_POLICIES;
const AGENT_PROMOTION = process.env.REACT_APP_AGENT_PROMOTION;
const AGENT_REGISTRATION = process.env.REACT_APP_AGENT_REGISTRATION; 
const AGENT_WITHDRAW = process.env.REACT_APP_AGENT_WITHDRAW;
const CUSTOMER_REGISTRATION = process.env.REACT_APP_CUSTOMER_REGISTRATION; 
const HOME = process.env.REACT_APP_HOME; 
const PLAN = process.env.REACT_APP_PLAN; 
const PROFILE = process.env.REACT_APP_PROFILE;
const ROLE_AGENT = process.env.REACT_APP_ROLE_AGENT;


const AgentDashboard = () => {
  const navigation = useNavigate();
  const token = localStorage.getItem("auth");
  const username = useParams().username;
  const [component, setComponent] = useState(HOME);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState(null);
  const [planid, setPlanid] = useState(null);
  const message = "Unauthorized access. Redirecting to home page..."

  const validateUser = async () => {
    const prevUsername = localStorage.getItem("prev-username")
    if (!token) {
      navigation("/");
      return;
    }

    const response1 = await getRole(token);
    if (response1.data !== ROLE_AGENT) {
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
      {component === PROFILE && <AgentProfile user={user} />}
      {component === AGENT_POLICIES && <AgentPolicies user={user} />}
      {component === AGENT_WITHDRAW && <AgentWithdraws user={user} />}
      {component === AGENT_PROMOTION && <Promote user={user} />}
    </>
  );
};

export default AgentDashboard;
