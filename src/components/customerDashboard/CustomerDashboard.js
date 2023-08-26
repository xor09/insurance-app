import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/Navbar';
import { AGENT_REGISTRATION, CUSTOMER_REGISTRATION, HOME, PLAN, ROLE_CUSTOMER } from '../../assets/constants';
import { useNavigate, useParams } from 'react-router-dom';
import AleartBox from '../sharedComponent/alertBox/AleartBox';
import { getUser } from '../../service/userApis';
import Scheme from '../scheme/Scheme';
import { getRole, getUsername } from '../../service/authorization';
import Home from '../home/Home';
import AgentRegistration from '../agentRegistration/AgentRegistration';
import CustomerRegistration from '../customerRegistration/CustomerRegistration';
import Plan from '../sharedComponent/plan/Plan';

const CustomerDashboard = () => {
    const navigation = useNavigate();
    const token = localStorage.getItem('auth')
    const username = useParams().username
    const [component, setComponent] = useState(HOME)
    const [user, setUser] = useState(null);
    const [alert, setAlert] = useState(null);
    const [alertSuccess, setAlertSuccess] = useState(null);
    const [planid, setPlanid] = useState(null)


    const validateUser = async () => {
        if(!token){
            navigation('/');
            return;
        }

        const response1 = await getRole(token);
        if(response1.data !== ROLE_CUSTOMER){
            navigation('/');
            return;
        }

        const response2 = await getUsername(token);
        if(response2.data !== username){
            navigation('/');
            return;
        }

        fetchUser();
        return;
    }

    const fetchUser = async () => {
        try{
            const response = await getUser(username, token);
            console.log(response.data)
            setUser(response.data)
        }catch(e){
            setAlert(e.response.data)
        }
    }

    useEffect(()=>{
        validateUser()
    },[])

    return (
        <>  
            {alert && <AleartBox message={alert} setAlert={setAlert}/>}
            {user && <Navbar setComponent={setComponent} user={user} setPlanid={setPlanid}/>}
            {component === HOME  && <Home />}
            {component===AGENT_REGISTRATION && <AgentRegistration />}
            {component===CUSTOMER_REGISTRATION && <CustomerRegistration/>}
            {component===PLAN && <Plan planid={planid} user={user}/>}
        </>
    );
}

export default CustomerDashboard;
