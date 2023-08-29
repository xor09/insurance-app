import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PaymentInfo = () => {
    const navigation = useNavigate();
    const username = useParams().username;
    const message = useParams().message;

    const redirect = () => {
        setTimeout(() => {
            navigation(`/customer/${username}`);
            return;
        }, 5000); 
    };

    useEffect(()=>{
        redirect()
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

export default PaymentInfo;
