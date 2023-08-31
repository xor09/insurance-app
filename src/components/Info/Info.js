import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getRole } from '../../service/authorization';
import { ROLE_ADMIN, ROLE_AGENT, ROLE_CUSTOMER, ROLE_EMPLOYEE } from '../../assets/constants';

const Info = () => {
    const navigation = useNavigate();
    const username = useParams().username;
    const message = useParams().message;
    const token = localStorage.getItem('auth')
    
    const fetchRoleAndRedirect = async () => {
        try {
            const role = await getRole(token);
            if (role.data) {
                setTimeout(() => {
                    if (role.data === ROLE_ADMIN) navigation(`/admin/${username}`);
                    else if (role.data === ROLE_EMPLOYEE) navigation(`/employee/${username}`);
                    else if (role.data === ROLE_AGENT) navigation(`/agent/${username}`);
                    else if (role.data === ROLE_CUSTOMER) navigation(`/customer/${username}`);
                    else navigation(`/`)
                }, 5000);
            }
        } catch (error) {
            console.error('Error fetching role:', error);
            navigation(`/`)
        }
    };

    useEffect(()=>{
        fetchRoleAndRedirect();
    },[])
    return (
        <div>
            <div className="container mt-4">
                <div className="alert alert-success" role="alert">
                    {message}
                </div>
                <p>Redirecting in 5 seconds...</p>
            </div>
        </div>
    );
}

export default Info;
