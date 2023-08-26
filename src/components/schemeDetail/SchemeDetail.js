import React, { useState } from 'react';
import { investmentCalculator } from '../../service/calculator';
import schemeimage from '../../assets/images/Life-Insurance.jpg'
import AleartBox from '../sharedComponent/alertBox/AleartBox';
import { ROLE_CUSTOMER } from '../../assets/constants';

const SchemeDetail = (props) => {
    const tabs = props.tabs;
    const setTabs = props.setTabs;
    const user = props.user
    const token = localStorage.getItem('auth')
    const [showModal, setShowModal] = useState(false);
    const [initialAmount, setInitialAmount] = useState(null);
    const [currentAge, setCurrentAge] = useState(null);
    const [tillAge, setTillAge] = useState(null);
    const [profitratio, setProfitratio] = useState(10)
    const [years, setYears] = useState(0);
    const [investmentPerMonth, setInvestmentPerMonth] = useState(0);
    const [finalAmount, setFinalAmount] = useState(0)
    const [alert, setAlert] = useState(null);

    const scheme = {
        schemename: 'Sample Scheme',
        schemeimage: schemeimage,
        description: 'This is a sample scheme description.',
        minamount: 100000,
        maxamount: 500000,
        mininvestment: 50000,
        maxinvestment: 100000,
        minage: 18,
        maxage: 60,
        profitratio: 10,
    };

    const calculateHelper = () => {
        if(!initialAmount || !currentAge || !tillAge){
            setAlert("All fields are required")
            return;
        }
        
        //pending:- handling amount, minInvestment, maxinvestment

        const [years, investmentPerMonth, finalAmount] = investmentCalculator(initialAmount, currentAge, tillAge, profitratio);
        setYears(years);
        setInvestmentPerMonth(investmentPerMonth);
        setFinalAmount(finalAmount)
        
    }

    const onPurchaseHandler = () => {
        if(!token){
            setAlert('Please login to purchase');
            return;
        }
        if(!user || user.role !== ROLE_CUSTOMER){
            setAlert('Please login with a customer account');
            return;
        }
        if(user.age < scheme.minage || user.age > scheme.maxage){
            setAlert('You are not eligible for this scheme');
            return;
        }

        return
    }

    return (
        <div className='w-100'>
            {alert && <AleartBox message={alert} setAlert={setAlert}/>}
            <div className='float-start'>
                <button type="button" class="btn btn-secondary text-end" onClick={()=>setTabs(null)}>Back</button>
            </div>
            <br/>
            <div className='mt-5'>
                <p>Scheme info</p>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#calculate">Calculate Investment</button> 
                <br/>

                <button type="button" class="btn btn-success" onClick={()=>onPurchaseHandler()}>Purchase</button>

                {/* modal for calculating investment */}
                <div className='mx-5 my-4' >
                    <div className="modal fade" id="calculate" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog my-5">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Calculate</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                                </div>
                                <div className="modal-body">
                                <label htmlFor="investmentAmount">Enter Investment Amount:</label>
                                <input type="number" className="form-control"id="investmentAmount"
                                placeholder="Enter amount"
                                onChange={e => setInitialAmount(e.target.value)}
                                value={initialAmount}
                                required
                                /><br/>
                                <label htmlFor="currentage">Enter Current Age:</label>
                                <input type="number" className="form-control"id="currentage"
                                placeholder="Enter Current Age" min={scheme.minage} max={scheme.maxage}
                                onChange={e => setCurrentAge(e.target.value)}
                                value={currentAge}
                                required
                                /><br/>
                                <label htmlFor="tillage">Enter Current Age:</label>
                                <input type="number" className="form-control"id="tillage"
                                placeholder="Enter Till Age" min={scheme.minage} max={scheme.maxage}
                                onChange={e => setTillAge(e.target.value)}
                                value={tillAge}
                                required
                                />
                                </div>
                                {years && investmentPerMonth && finalAmount ?
                                    <div className='d-flex w-10 justify-content-center m-2'>
                                        <div className="card bg-danger w-100" style={{width: "18rem"}}>
                                            <ul className="list-group list-group-flush d-flex justify-content-center">
                                                <li className="list-group-item">Tenure: {years} years</li>
                                                <li className="list-group-item">Investment: {investmentPerMonth}/month</li>
                                                <li className="list-group-item">Final Amount: {finalAmount}</li>
                                            </ul>
                                        </div>
                                    </div> : null
                                }
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-success" onClick={()=>calculateHelper()}>Calculate</button>
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" 
                                    >Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SchemeDetail;
