import React, { useEffect, useState } from 'react';
import AleartBox from '../sharedComponent/alertBox/AleartBox';
import { payInstallment } from '../../service/customerApis';
import { calculateAgentCommission, calculatePayAmount } from '../../service/calculator';
import { format } from 'date-fns';
import { useNavigate, useParams } from 'react-router-dom';
import { addCommission } from '../../service/agentApis';

const CREDIT_CARD = process.env.REACT_APP_CREDIT_CARD;
const DEBIT_CARD = process.env.REACT_APP_DEBIT_CARD;


const PaymentGateway = (props) => {
    const token = localStorage.getItem('auth')
    const setTab = props.setTab;
    const agentCommission = props.agentCommission //in percentage
    const agentid = props.agentid

    const policyNo = props.policyNo
    const amount = props.amount
    const tax = 5; //in percentage (fixed)

    const username = useParams().username;
    const navigation = useNavigate()
    const [cardType, setCardType] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cvv, setCvv] = useState('');
    const [alert, setAlert] = useState(null);
    const [finalAmount, setFinalAmount] = useState(0.0);
    const [commissionAmount, setCommissionAmount] = useState(0.0)
    
    const handleCardTypeChange = (event) => {
      setCardType(event.target.value);
    };
  
    const handleCardNumberChange = (event) => {
      setCardNumber(event.target.value);
    };
  
    const handleCvvChange = (event) => {
      setCvv(event.target.value);
    };

    const addCommissionHandler = async () => {
        try{
            const response = await addCommission(agentid, commissionAmount);
        }catch(e){
            setAlert(e.response.data);

        }
        return;
    }
  
    const handleSubmit = async(event) => {
      event.preventDefault();
        if(!cardType || cardType.length === 0){
            setAlert("Please select a Card type");
            return;
        }
        if(!cardNumber || cardNumber.trim().length !== 16){
            setAlert("Please enter a valid card number");
            return;
        }
        if(!cvv || cvv.trim().length !== 3){
            setAlert("Please enter a valid CVV number");
            return;
        }
        try{
            const currentDate = new Date();
            const date = format(currentDate, 'yyyy-MM-dd');
 
            //payment
            const response = await payInstallment(policyNo, date, cardType, amount, tax, finalAmount, token);
            const message = response.data
            if(agentid && agentid>0){ 
                addCommissionHandler()
            }
            //agent commission
            navigation(`/info/${username}/${message}`)
            return;
        }catch(e){
            setAlert(e.response.data)
        }
      
    };

    const calculateFinalAmountHandler = () => {
        const finalAmount = calculatePayAmount(amount, tax);
        setFinalAmount(parseFloat(finalAmount))
    }

    const calculateAgentCommissionHandler = () => {
        const commissionAmount = calculateAgentCommission(amount, agentCommission);
        setCommissionAmount(parseFloat(commissionAmount));
    }

    useEffect(()=>{
        calculateFinalAmountHandler();
        calculateAgentCommissionHandler()
    },[])
  
    return (
        <div className='d-flex flex-column w-100'>
            {alert && <AleartBox message={alert} setAlert={setAlert}/>}
            <div className='float-start my-2 mx-5'>
                    <button type="button" className="btn btn-outline-info text-end" onClick={()=>setTab(null)}>🔙</button>
            </div>
            <div className='d-flex'>
                <div className="container mt-4 shadow p-3 mb-5 bg-body-tertiary rounded w-50 border-5">
                    <h4 className='text-center'>Make Payment</h4>
                    <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="cardType">Card Type</label>
                        <select
                        className="form-control"
                        id="cardType"
                        value={cardType}
                        onChange={handleCardTypeChange}
                        >
                        <option value="">Select Card Type</option>
                        <option value={CREDIT_CARD}>Credit Card</option>
                        <option value={DEBIT_CARD}>Debit Card</option>
                        </select>
                    </div><br/>
                    <div className="form-group">
                        <div className="form-group row">
                            <div className="col-md-6">
                                <label>Card Number</label>
                                <input
                                type="text"
                                className="form-control"
                                value={cardNumber}
                                onChange={handleCardNumberChange}
                                />
                            </div>
                            <div className="col-md-6">
                                <label>CVV</label>
                                <input
                                type="text"
                                className="form-control"
                                value={cvv}
                                onChange={handleCvvChange}
                                />
                            </div>
                        </div>
                    </div><br/>
                    <div className="form-group">
                        <div className="form-group row">
                            <div className="col-md-12">
                                <label>Amount (with tax: {tax}%)</label>
                                <input
                                type="number"
                                className="form-control"
                                value={finalAmount}
                                disabled
                                />
                            </div>
                        </div>
                    </div><br/>
                    <div className='d-flex justify-content-center'>
                        <button type="submit" className="btn btn-success w-25">Submit</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PaymentGateway;
