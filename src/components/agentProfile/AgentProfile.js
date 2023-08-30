import React, { useEffect, useState } from 'react';
import { getAgent, withdrawCommission } from '../../service/agentApis';
import AleartBox from '../sharedComponent/alertBox/AleartBox';
import './AgentProfile.css'
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const AgentProfile = (props) => {
    const {id, username} = props.user;
    const navigation = useNavigate()
    const token = localStorage.getItem('auth')

    const [profile, setProfile] = useState({})
    const [alert, setAlert] = useState(null);
    const [amount, setAmount] = useState(0.0);
    const [showform, setShowForm] = useState(false);

    const fetchAgentHandle = async () => {
        try{
            const response = await getAgent(id);
            setProfile(response.data);
        }catch(e){
            setAlert(e.response.data)
        }
    }

    const handleWithdraw = async () => {
        if(!amount || amount===0){
            setAlert("Please enter some amount");
            return;
        }
        if(amount > parseFloat(profile.commissionEarn)){
            setAlert("Insufficient Balance.");
            return;
        }

        try{
            const currentDate = new Date();
            const date = format(currentDate, 'yyyy-MM-dd');
            const response = await withdrawCommission(id, amount, date, token);
            const message = response.data;
            navigation(`/info/${username}/${message}`)
        }catch(e){
            setAlert(e.response.data)
        }
        return
    };

    useEffect(()=>{
        fetchAgentHandle();
    },[])
    return (
        <div>
            {alert && <AleartBox message={alert} setAlert={setAlert}/>}
            <div className="d-flex justify-content-center align-items-center my-5">
                <div class="card user-card">
                    <h5 class="card-header">{username}</h5>
                    <div class="card-body">
                        <h5 class="card-title">{profile.firstname} {profile.lastname}</h5>
                        <div className='d-flex flex-row justify-content-start gap-4'>
                            <p class="card-text">Qualification: {profile.qualification}</p>
                            <p class="card-text">Commission Earned: {profile.commissionEarn}</p>
                        </div>
                        <div className='d-flex justify-content-center mt-4'>
                            <button class="btn btn-warning" onClick={() => setShowForm(true)} >Withdraw Some Amount</button>
                        </div>
                    </div>
                </div>
            </div>
            {
                showform && 
                <div className="update-form withdraw-form">
                    <div className='shadow p-3 mb-5 bg-body-tertiary rounded mx-5 w-50'>
                        <div><h4 className='text-center'>Withdraw Form</h4></div>
                        <div className="mb-3">
                            <label htmlFor="firstname" className="form-label">Amount</label>
                            <input
                            type="number"
                            className="form-control"
                            id="amount"
                            placeholder='Enter withdraw amount'
                            onChange={(e) => setAmount(parseFloat(e.target.value))}
                            />
                        </div>
                        <div className='d-flex justify-content-center'>
                            <button className="btn btn-success w-50" onClick={handleWithdraw}>Withdraw</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default AgentProfile;
