import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import AleartBox from "../sharedComponent/alertBox/AleartBox";
import { getUser } from "../../service/userApis";
import { getRole, getUsername } from "../../service/authorization";
import Home from "../home/Home";
import AgentRegistration from "../agentRegistration/AgentRegistration";
import CustomerRegistration from "../customerRegistration/CustomerRegistration";
import Plan from "../sharedComponent/plan/Plan";
import QueryAsking from "../queryAsking/QueryAsking";
import CustomerPolicies from "../customerPolices/CustomerPolicies";
import CustomerQueries from "../customerQueries/CustomerQueries";

const AGENT_REGISTRATION = process.env.REACT_APP_AGENT_REGISTRATION; 
const CUSTOMER_POLICIES = process.env.REACT_APP_CUSTOMER_POLICIES;
const CUSTOMER_QUERIES = process.env.REACT_APP_CUSTOMER_QUERIES;
const CUSTOMER_REGISTRATION = process.env.REACT_APP_CUSTOMER_REGISTRATION; 
const HOME = process.env.REACT_APP_HOME; 
const PLAN = process.env.REACT_APP_PLAN; 
const ROLE_CUSTOMER = process.env.REACT_APP_ROLE_CUSTOMER;



const CustomerDashboard = () => {
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
    if (response1.data !== ROLE_CUSTOMER) {
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
        <>
          <Navbar setComponent={setComponent} user={user} setPlanid={setPlanid} />
        </>
      )}
      {component === HOME && <Home />}
      {component === AGENT_REGISTRATION && <AgentRegistration />}
      {component === CUSTOMER_REGISTRATION && <CustomerRegistration />}
      {component === PLAN && <Plan planid={planid} user={user} />}
      {component === CUSTOMER_POLICIES && <CustomerPolicies user={user}/>}
      {component === CUSTOMER_QUERIES && <CustomerQueries user={user} />}
      {user && <QueryAsking  user={user}/>}
    </>
  );
};

export default CustomerDashboard;
