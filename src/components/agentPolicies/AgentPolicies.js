import React, { useEffect, useState } from 'react';
import AleartBox from '../sharedComponent/alertBox/AleartBox';
import { getPoliciesByAgent } from '../../service/agentApis';
import Table from '../sharedComponent/table/Table';

const AgentPolicies = (props) => {
    const {id:agentid, username} = props.user;
    const token = localStorage.getItem('auth');
    const [policies, setPolicies] = useState([]);
    const [alert, setAlert] = useState(null);
    const [currentpageno, setCurrentpageno] = useState(1);
    const [size, setSize] = useState(5);
    const [totalpages, setTotalpages] = useState(1);
    const [tableData, setTableData] = useState(null)


    const tableHeaders = ['#', 'Policy No', 'Customer Id', 'Customer name', ' Invest Amount', 'Issue Date', 'Mature Date', "Policy Status"]
    
    
    const fetchPolicies = async () => {
        try{
            const response = await getPoliciesByAgent(agentid, currentpageno, size, token);
            setCurrentpageno(currentpageno);
            setTotalpages(response.data.totalPages);
            
            let arr = []

            response.data.content.map((policy, index) => {
                let data = [index+1, 
                    policy.policyid,
                    policy.customer.customerId,
                    policy.customer.firstname + " "+ policy.customer.lastname,
                    policy.investAmount,
                    policy.issueDate,
                    policy.maturityDate,
                    policy.status 
                ]
                arr.push(data);
            })
            setTableData(arr);
        }catch(e){
            setAlert(e.response.data);
        }
    }

    useEffect(()=>{
        fetchPolicies();
    },[currentpageno, size])
    return (
        <div>
            {alert && <AleartBox message={alert} setAlert={setAlert}/>}
            <h1 className='text-center mt-5'>Policies</h1>
            <Table 
                tableHeaders={tableHeaders} 
                tableData={tableData}
                currentpageno={currentpageno}
                setCurrentpageno={setCurrentpageno}
                totalpages={totalpages}
                setSize={setSize}
            />
        </div>
    );
}

export default AgentPolicies;
