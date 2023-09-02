import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getRole } from '../../service/authorization';

const ROLE_ADMIN = process.env.REACT_APP_ROLE_ADMIN;
const ROLE_AGENT = process.env.REACT_APP_ROLE_AGENT;
const ROLE_CUSTOMER = process.env.REACT_APP_ROLE_CUSTOMER;
const ROLE_EMPLOYEE = process.env.REACT_APP_ROLE_EMPLOYEE;


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
                }, 3000);
            }
        } catch (error) {
            console.error('Error fetching role:', error);
            setTimeout(() => {
                navigation(`/`)
            }, 3000);
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
                <p>Redirecting in 3 seconds...</p>
            </div>
        </div>
    );
}

export default Info;
