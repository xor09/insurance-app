import React, { useEffect, useState } from 'react';
import { BUY_POLICY, REGULAR, SCHEME_DETAILS } from '../../assets/constants';
import PaymentGateway from '../paymentGateway/PaymentGateway';
import AleartBox from '../sharedComponent/alertBox/AleartBox';
import { calculateAgentCommission } from '../../service/calculator';
import { getActiveAgents, purchasePolicy } from '../../service/customerApis';
import AleartBoxSuccess from '../sharedComponent/alertBoxSuccess/AleartBoxSuccess';
import { useNavigate, useParams } from 'react-router-dom';

const BuyPolicy = (props) => {
    const tabs = props.tabs;
    const setTabs = props.setTabs;
    const user = props.user
    const scheme = props.scheme;
    const investmentDetail = props.investmentDetail;
    const username = useParams().username;
    const navigation = useNavigate()
    
    const token = localStorage.getItem('auth')
    const agentCommision = calculateAgentCommission(investmentDetail.investmentPerMonth, scheme.registrationCommission)

    const [agents, setAgents] = useState([])
    const [showGateway, setShowGateway] = useState(false);
    const [selectedAgent, setSelectedAgent] = useState(0);
    const [firstNominee, setFirstNominee] = useState('');
    const [firstNomineeRelation, setFirstNomineeRelation] = useState('');
    const [secondNominee, setSecondNominee] = useState('');
    const [secondNomineeRelation, setSecondNomineeRelation] = useState('');
    const [alert, setAlert] = useState(null);
    const [alertSuccess, setAlertSuccess] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState([]);


    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles(files);
      };

    const fetchAgents = async () => {
        try{
            const response = await getActiveAgents();
            setAgents(response.data)
        }catch(e){
            setAlert(e.response.data)
        }
        return;
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(firstNominee.trim().length===0 || firstNomineeRelation.trim().length===0){
            setAlert("First Nominee Required");
            return false;
        }
        if((secondNominee.trim().length!==0 && secondNomineeRelation.trim().length===0) 
        || (secondNominee.trim().length===0 && secondNomineeRelation.trim().length!==0)) {
            setAlert("Kindly fill all field for second nominee");
            return false;
        }

        
        let nominees = [{
            nomineeName: firstNominee,
            nomineeRelation: firstNomineeRelation
        }];
        if(secondNominee.trim().length!==0 && secondNomineeRelation.trim().length!==0){
            nominees = [...nominees, {nomineeName: secondNominee, nomineeRelation: secondNomineeRelation}]
        }
        investmentDetail.nominees = nominees
        investmentDetail.agentId = selectedAgent
        investmentDetail.premiumType = REGULAR
        try{
            const response = await purchasePolicy(investmentDetail, token);
            navigation(`/info/${username}/${response.data}`)
        }catch(e){
            setAlert(e.response.data)
        }
        return;
    }

    useEffect(()=>{
        fetchAgents()
    },[])
    
    return (
        <>
        {
            <div className='w-100 m-5'>
                {alert && <AleartBox message={alert} setAlert={setAlert}/>}
                {alertSuccess && <AleartBoxSuccess message={alertSuccess} setAlert={setAlertSuccess}/>}
                <div className='float-start'>
                    <button type="button" className="btn btn-outline-info text-end" onClick={()=>setTabs(SCHEME_DETAILS)}>🔙</button>
                </div>
                <h1 className='text-center'>BUY POLICY</h1>
                <div className="container mt-5">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={user.firstname+" "+user.lastname}
                            disabled
                        />
                    </div><br/>
                    <div className="form-group">
                        <label htmlFor="age">Age</label>
                        <input
                            type="number"
                            className="form-control"
                            id="age"
                            value={user.age}
                            disabled
                        />
                    </div><br/>
                    <div className="form-group">
                        <label htmlFor="investmentAmount">Investment Amount</label>
                        <input
                            type="number"
                            className="form-control"
                            id="investmentAmount"
                            value={investmentDetail.investAmount}
                            disabled
                        />
                    </div><br/>
                    <div className="form-group">
                        <label htmlFor="tenure">Tenure</label>
                        <input
                            type="number"
                            className="form-control"
                            id="tenure"
                            value={investmentDetail.tenure}
                            disabled
                        />
                    </div><br/>
                    <div className="form-group">
                        <label htmlFor="investmentPerMonth">Investment Per Month</label>
                        <input
                            type="number"
                            className="form-control"
                            id="investmentPerMonth"
                            value={investmentDetail.investmentPerMonth}
                            disabled
                        />
                    </div><br/>
                    <div className="form-group">
                        <label htmlFor="finalAmount">Final Amount</label>
                        <input
                            type="number"
                            className="form-control"
                            id="finalAmount"
                            value={investmentDetail.finalAmount}
                            disabled
                        />
                    </div><br/>
                    <div className="form-group">
                    <label htmlFor="selectOption">Select Your Agent (optional)</label>
                    <select
                        className="form-control"
                        id="selectOption"
                        value={selectedAgent}
                        onChange={(e)=>{setSelectedAgent(parseInt(e.target.value))}}
                    >
                            <option value={0} selected={selectedAgent === 0} >Select</option>
                        {
                            agents.map((agent, index)=>
                                <option key={index+1} value={agent.agentId}>{agent.firstname} {agent.lastname}</option>
                            )
                        }
                        
                    </select>
                    </div><br/>

                    <div className="form-group">
                        <label htmlFor="pdfFiles">Upload All required documents (only PDF)</label> &nbsp;
                        <input
                            type="file"
                            className="form-control-file"
                            id="pdfFiles"
                            multiple
                            accept=".pdf"
                            onChange={handleFileChange}
                        />
                    </div><br/>

                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-6">
                            <label htmlFor="firstNominee">First Nominee</label>
                            <input
                                type="text"
                                className="form-control"
                                id="firstNominee"
                                value={firstNominee}
                                onChange={(e) => {setFirstNominee(e.target.value)}}
                            />
                            </div>
                            <div className="col-md-6">
                            <label htmlFor="firstNomineeReation">Relationship</label>
                            <input
                                type="text"
                                className="form-control"
                                id="firstNomineeReation"
                                value={firstNomineeRelation}
                                onChange={(e) => {setFirstNomineeRelation(e.target.value)}}
                            />
                            </div>
                        </div>
                    </div><br/>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-6">
                            <label htmlFor="secondNominee">Second Nominee (optional)</label>
                            <input
                                type="text"
                                className="form-control"
                                id="secondNominee"
                                value={secondNominee}
                                onChange={(e) => {setSecondNominee(e.target.value)}}
                            />
                            </div>
                            <div className="col-md-6">
                            <label htmlFor="secondNomineeReation">Relationship</label>
                            <input
                                type="text"
                                className="form-control"
                                id="secondNomineeReation"
                                value={secondNomineeRelation}
                                onChange={(e) => {setSecondNomineeRelation(e.target.value)}}
                            />
                            </div>
                        </div>
                    </div><br/>
                    
                            <div className='d-flex justify-content-center'>
                                <button type="submit" className="btn btn-success text-center w-25">Submit</button>
                            </div>
                        
                </form>
            </div>
            </div>
            
                
                // <PaymentGateway 
                //     setShowGateway = {setShowGateway}
                //     investmentDetail = {investmentDetail}
                //     amount = {investmentDetail.investmentPerMonth}
                //     agentCommision = {agentCommision}
                //     agentId = {selectedAgent}
                // />
        }
            </>
    )
}

export default BuyPolicy;
