import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/Navbar';
import Login from '../login/Login';
import AgentRegistration from '../agentRegistration/AgentRegistration';
import CustomerRegistration from '../customerRegistration/CustomerRegistration';
import Plan from '../sharedComponent/plan/Plan';
import Home from '../home/Home';

const HOME = process.env.REACT_APP_HOME;
const LOGIN = process.env.REACT_APP_LOGIN;
const AGENT_REGISTRATION = process.env.REACT_APP_AGENT_REGISTRATION;
const CUSTOMER_REGISTRATION = process.env.REACT_APP_CUSTOMER_REGISTRATION;
const PLAN = process.env.REACT_APP_PLAN;

const Dashboard = () => {
    const [component, setComponent] = useState(HOME)
    const [planid, setPlanid] = useState(null)
    
    useEffect(()=>{
        localStorage.removeItem('auth')
    },[])

    return (
        <>
            <Navbar setComponent={setComponent} setPlanid={setPlanid}/>
            {component===HOME && <Home />}
            {component===LOGIN && <Login />}
            {component===AGENT_REGISTRATION && <AgentRegistration />}
            {component===CUSTOMER_REGISTRATION && <CustomerRegistration/>}
            {component===PLAN && <Plan planid={planid}/>}
          
        </>
    );
}

export default Dashboard;
