import React, { useEffect, useState } from 'react';
import './Navbar.css'
import { useNavigate } from 'react-router-dom';
import { AGENTS, AGENT_REGISTRATION, ALL_EMPLOYEES, ALL_PLANS, CUSTOMER_REGISTRATION, HOME, LOGIN, PLAN, ROLE_ADMIN, ROLE_EMPLOYEE, SCHEMES } from '../../assets/constants';
import { getAllActivePlans } from '../../service/userApis';
import AleartBox from '../sharedComponent/alertBox/AleartBox';

const Navbar = (props) => {
    const token = localStorage.getItem('auth')
    const navigation = useNavigate()
    const setComponent = props.setComponent;
    const user = props.user;
    const setPlanid = props.setPlanid
    const [alert, setAlert] = useState(null);
    const [plans, setPlans] = useState([]);

    const handleLogout = () => {
        localStorage.removeItem("auth")
        navigation('/')
        return;
    }

    const fetchActivePlansHandler = async () => {
        try{
            const response = await getAllActivePlans();
            setPlans(response.data);
        }catch(e){
            setAlert(e);
        }
    }

    useEffect(()=>{
        fetchActivePlansHandler()
    },[])
    return (
        <>
            {alert && <AleartBox message={alert} setAlert={setAlert}/>}
            <nav className="navbar navbar-expand-lg custom-navbar mb-2">
                <div className="container-fluid">
                    {token && user && <p className="navbar-brand">{user.firstname} {user.lastname}</p>}
                    <button className="navbar-toggler toogle-button-wrapper" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon toogle-button"></span>
                    <span className="navbar-toggler-icon toogle-button"></span>
                    <span className="navbar-toggler-icon toogle-button"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                        <p className="nav-link" aria-current="page"  onClick={()=>setComponent(HOME)}>Home</p>
                        </li>
                        {
                            user && user.role === ROLE_ADMIN &&
                            <li className="nav-item">
                                <p className="nav-link" aria-current="page"  onClick={()=>setComponent(ALL_PLANS)}>All Plan</p>
                            </li>
                        }

                        {
                            user && user.role === ROLE_EMPLOYEE &&
                            <li className="nav-item">
                                <p className="nav-link" aria-current="page"  onClick={()=>setComponent(AGENTS)}>Agents</p>
                            </li>
                        }

                        

                        {
                            <li className="nav-item dropdown">
                            <p className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Plans
                            </p>
                            <ul className="dropdown-menu custom-dropdown">
                                {
                                    plans.length===0 ? <li>No Plan avaliable</li> : plans.map((plan, index) => 
                                        <li key={index+1}><p className="dropdown-item" 
                                        onClick={()=>{
                                            setComponent(PLAN)
                                            setPlanid(plan.planid)
                                        }}>{plan.planname}</p></li>
                                    )
                                }
                                
                            </ul>
                            </li>
                        }

                        {
                             user && user.role === ROLE_ADMIN &&
                             <li className="nav-item">
                                 <p className="nav-link" aria-current="page"  onClick={()=>setComponent(ALL_EMPLOYEES)}>Employees</p>
                             </li>
                        }
                        
                        
                        <li className="nav-item dropdown">
                        <p className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Register
                        </p>
                        <ul className="dropdown-menu custom-dropdown">
                            <li><p className="dropdown-item" 
                            onClick={()=>setComponent(AGENT_REGISTRATION)}>Agent Registration</p></li>
                            <li><p className="dropdown-item" 
                            onClick={()=>setComponent(CUSTOMER_REGISTRATION)}>Customer Registration</p></li>
                        </ul>
                        </li>

                        {token 
                            ? 
                                <li className="nav-item">
                                <p className="nav-link" onClick={() => handleLogout()}>Logout</p>
                                </li>
                            :
                                <li className="nav-item">
                                <p className="nav-link" onClick={() => setComponent(LOGIN)} >Login</p>
                                </li> 
                        }

                        
                    </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
