import React, { useState } from 'react';
import { investmentCalculator } from '../../service/calculator';
import schemeimage from '../../assets/images/Life-Insurance.jpg'
import AleartBox from '../sharedComponent/alertBox/AleartBox';
import { ACTIVE, BUY_POLICY, PENDING, ROLE_CUSTOMER, SCHEME_DETAILS } from '../../assets/constants';
import PaymentGateway from '../paymentGateway/PaymentGateway';
import BuyPolicy from '../buyPolicy/BuyPolicy';
import { addYears, format } from 'date-fns';

const SchemeDetail = (props) => {
    const tabs = props.tabs;
    const setTabs = props.setTabs;
    const user = props.user
    const scheme = props.scheme;
    const setInvestmentDetail = props.setInvestmentDetail;

    const token = localStorage.getItem('auth')
    const [initialAmount, setInitialAmount] = useState(scheme.schemeDetails.minAmount);
    const [tenure, setTenure] = useState(scheme.schemeDetails.minInvestment);
    const [profitratio, setProfitratio] = useState(10)
    const [totalInstallment, setTotalInstallment] = useState(0);
    const [investmentPerMonth, setInvestmentPerMonth] = useState(0);
    const [finalAmount, setFinalAmount] = useState(0)
    const [alert, setAlert] = useState(null);

    const calculateHelper = () => {
        if(!initialAmount || !tenure){
            setAlert("All fields are required")
            return;
        }
        if(initialAmount < scheme.schemeDetails.minAmount){
            setAlert(`Minimum amount should be ${scheme.schemeDetails.minAmount}`)
            return;
        }
        if(initialAmount > scheme.schemeDetails.maxAmount){
            setAlert(`Maximum amount should be ${scheme.schemeDetails.maxAmount}`)
            return;
        }
        if(tenure < scheme.schemeDetails.minInvestment){
            setAlert(`Minimum tenure should be ${scheme.schemeDetails.minInvestment} years`)
            return;
        }
        if(tenure > scheme.schemeDetails.maxInvestment){
            setAlert(`Maximum tenure should be ${scheme.schemeDetails.maxInvestment} years`)
            return;
        }

        const [investmentPerMonth, finalAmount, noOfInstallment] = investmentCalculator(initialAmount, tenure, profitratio);
        setInvestmentPerMonth(investmentPerMonth);
        setFinalAmount(finalAmount)
        setTotalInstallment(noOfInstallment)
    }

    const getDates = (tenure) => {
        const currentDate = new Date();
        const issueDate = format(currentDate, 'yyyy-MM-dd');
        const futureDate = addYears(currentDate, +tenure);
        const maturityDate = format(futureDate, 'yyyy-MM-dd');
        return [issueDate, maturityDate]
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
        if(user.age < scheme.schemeDetails.minAage || user.age > scheme.schemeDetails.maxAge){
            setAlert('You are not eligible for this scheme');
            return;
        }

        const [issueDate, maturityDate] = getDates(tenure)

        const investment = {
            investAmount : parseFloat(initialAmount),
            totalInstallment : parseInt(totalInstallment),
            tenure : parseInt(tenure),
            investmentPerMonth : parseFloat(investmentPerMonth),
            finalAmount : parseFloat(finalAmount),
            customerid : user.id,
            schemeid : scheme.schemeId,
            issueDate : issueDate,
            maturityDate : maturityDate,
            status : PENDING
        }

        setInvestmentDetail(investment)
        setTabs(BUY_POLICY)
        return;
    }

    return (
        <>
            <div className='w-100 mt-3'>
                {alert && <AleartBox message={alert} setAlert={setAlert}/>}
                <div className='float-start'>
                    <button type="button" class="btn btn-secondary text-end" onClick={()=>setTabs(null)}>Back</button>
                </div>
                <br/>
                <div className='mt-5 d-flex justify-content-center align-items-center flex-column'>
                    <div className='d-flex'>
                        <div className="container">
                            <h1 className="mt-5">{scheme.schemeName}</h1>
                            <div className="row mt-4">
                                <div className="">
                                    <img src={`data:image/jpeg;base64,${scheme.schemeDetails.image}`} alt={scheme.schemeName} className="img-fluid" />
                                </div>
                                <div className="">
                                    <h2>Description</h2>
                                    <p>{scheme.schemeDetails.description}</p>
                                    <h2>Details</h2>
                                    <p>Minimum Amount: {scheme.schemeDetails.minAmount}</p>
                                    <p>Maximum Amount: {scheme.schemeDetails.maxAmount}</p>
                                    <p>Minimum Tenure: {scheme.schemeDetails.minInvestment}</p>
                                    <p>Maximum Tenure: {scheme.schemeDetails.maxInvestment}</p>
                                    <p>Minimum Age: {scheme.schemeDetails.minAge}</p>
                                    <p>Maximum Age: {scheme.schemeDetails.maxAge}</p>
                                    <p>Profit Ratio: {scheme.schemeDetails.profitRatio}%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                

                    <button type="button" class="btn btn-primary w-25" data-bs-toggle="modal" data-bs-target="#calculate">Calculate Investment</button> 
                    <br/>


                    {/* modal for calculating investment */}
                    <div className='mx-5 my-4' >
                        <div className="modal fade" id="calculate" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Calculate</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                                    </div>
                                    <div className="modal-body">
                                    <label htmlFor="investmentAmount">Enter Investment Amount:</label>
                                    <input type="number" className="form-control"id="investmentAmount"
                                    placeholder="Enter amount"
                                    onChange={e => {
                                        setInitialAmount(e.target.value)
                                        setFinalAmount(0)
                                    }}
                                    value ={initialAmount}
                                    required
                                    /><br/>
                                    <label htmlFor="timeline">Years of Investment</label>
                                    <input type="number" className="form-control"id="timeline"
                                    placeholder="Enter Investment time"
                                    onChange={e => {
                                        setTenure(e.target.value)
                                        setFinalAmount(0)
                                    }}
                                    value={tenure}
                                    required
                                    /><br/>
                                    </div>
                                    {tenure && investmentPerMonth && finalAmount ?
                                        <div className='d-flex w-10 justify-content-center m-2'>
                                            <div className="card bg-danger w-100" style={{width: "18rem"}}>
                                                <ul className="list-group list-group-flush d-flex justify-content-center">
                                                    <li className="list-group-item">Tenure: {tenure} years</li>
                                                    <li className="list-group-item">Investment: {investmentPerMonth}/month</li>
                                                    {/* <li className="list-group-item">No. of Installment: {totalInstallment}</li> */}
                                                    <li className="list-group-item">Final Amount: {finalAmount}</li>
                                                    <li><button type="button" class="btn btn-success w-100" data-bs-dismiss="modal"  onClick={()=>onPurchaseHandler()}>Purchase</button></li>
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
        </>
    );
}

export default SchemeDetail;
