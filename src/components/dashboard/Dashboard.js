import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/Navbar';
import { useParams } from 'react-router-dom';
import { AGENT_REGISTRATION, CUSTOMER_REGISTRATION, HOME, LOGIN, PLAN } from '../../assets/constants';
import Scheme from '../scheme/Scheme';
import Login from '../login/Login';
import AgentRegistration from '../agentRegistration/AgentRegistration';
import CustomerRegistration from '../customerRegistration/CustomerRegistration';
import Plan from '../sharedComponent/plan/Plan';
import Home from '../home/Home';

const Dashboard = () => {
    const [component, setComponent] = useState(HOME)
    const [planid, setPlanid] = useState(null)
    localStorage.removeItem('auth')

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
