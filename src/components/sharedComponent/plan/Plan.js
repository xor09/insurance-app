import React, { useEffect, useState } from 'react';
import './Plan.css'
import Scheme from '../../scheme/Scheme';
import { SCHEME_DETAILS } from '../../../assets/constants';
import SchemeDetail from '../../schemeDetail/SchemeDetail';

const Plan = (props) => {
    const planid = props.planid
    const user = props.user
    const [schemes, setSchemes] = useState([]);
    const [tabs, setTabs] =  useState(null);

    const fetchSchemeHandler = () =>{
        setTabs(null)
        console.log(planid)
    }
    
    useEffect(()=>{
        fetchSchemeHandler();
    },[planid])
    return (
        <div>
            {/* <div>planid: {planid}</div> */}
            <div className='scheme-wrapper mx-2'>
                {tabs===null &&
                    <>
                        <Scheme tabs={tabs} setTabs={setTabs}/>
                        <Scheme tabs={tabs} setTabs={setTabs}/>
                        <Scheme tabs={tabs} setTabs={setTabs}/>
                        <Scheme tabs={tabs} setTabs={setTabs}/>
                        <Scheme tabs={tabs} setTabs={setTabs}/>
                     </>
                }
                {
                 tabs===SCHEME_DETAILS && <SchemeDetail tabs={tabs} setTabs={setTabs} user={user}/>
                }
            </div>
        </div>
    );
}

export default Plan;
