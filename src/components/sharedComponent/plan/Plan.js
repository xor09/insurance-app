import React, { useEffect, useState } from 'react';
import './Plan.css'
import Scheme from '../../scheme/Scheme';
import { BUY_POLICY, PAYMENT_GATEWAY, SCHEME_DETAILS } from '../../../assets/constants';
import SchemeDetail from '../../schemeDetail/SchemeDetail';
import AleartBoxSuccess from '../alertBoxSuccess/AleartBoxSuccess';
import AleartBox from '../alertBox/AleartBox';
import { getAllActiveSchemesByPlanId } from '../../../service/userApis';
import BuyPolicy from '../../buyPolicy/BuyPolicy';
import PaymentGateway from '../../paymentGateway/PaymentGateway';

const Plan = (props) => {
    const planid = props.planid
    const user = props.user
    const [schemes, setSchemes] = useState([]);
    const [tabs, setTabs] =  useState(null);
    const [scheme, setScheme] = useState(null)
    const [alert, setAlert] = useState(null);
    const [alertSuccess, setAlertSuccess] = useState(null);
    const [investmentDetail, setInvestmentDetail] = useState(null)

    const fetchSchemeHandler = async () =>{
        setTabs(null)
        setScheme(null)
        try{
            const response = await getAllActiveSchemesByPlanId(planid)
            setSchemes(response.data)
        }catch(e){
            setAlert(e.response.data)
        }
    }
    
    useEffect(()=>{
        fetchSchemeHandler();
    },[planid])
    return (
        <div>
            {alertSuccess && <AleartBoxSuccess message={alertSuccess} setAlert={setAlertSuccess}/>}
            { alert && <AleartBox message={alert} setAlert={setAlert}/>}
            <div className='scheme-wrapper mx-2'>
                {tabs===null &&
                    <>
                        { schemes.length===0 ? <h3 className='mt-4'>No Scheme found</h3> :
                        schemes.map((data, index)=>
                            <Scheme key={index+1} scheme={data} setScheme={setScheme} tabs={tabs} setTabs={setTabs}/>)}
                      
                     </>
                }
                {
                    tabs===SCHEME_DETAILS && 
                    <SchemeDetail tabs={tabs} setTabs={setTabs} user={user} scheme={scheme} setInvestmentDetail={setInvestmentDetail}/>
                } 
                {
                    tabs===BUY_POLICY && 
                    <BuyPolicy tabs={tabs} setTabs={setTabs} user={user} scheme={scheme} investmentDetail={investmentDetail}/>
                }
            </div>
        </div>
    );
}

export default Plan;
