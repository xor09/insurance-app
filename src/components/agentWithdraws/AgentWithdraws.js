import React, { useEffect, useState } from 'react';
import { getAgentWithdraws } from '../../service/agentApis';
import Table from '../sharedComponent/table/Table';
import AleartBox from '../sharedComponent/alertBox/AleartBox';

const AgentWithdraws = (props) => {
    const agentid = props.user.id;

    const [tableData, setTableData] = useState(null)
    const [currentpageno, setCurrentpageno] = useState(1);
    const [size, setSize] = useState(5);
    const [totalpages, setTotalpages] = useState(1);
    const [alert, setAlert] = useState(null);
    const [alertSuccess, setAlertSuccess] = useState(null);

    const tableHeaders = ['#', 'Amount', 'Date'];

    const fetchWithdrawsHandler = async () =>{
        try{
            const response = await getAgentWithdraws(agentid, currentpageno, size);
            setCurrentpageno(currentpageno);
            setTotalpages(response.data.totalPages);

            let arr = []
            response.data.content.map((withdraw, index) => {
                let data = [index+1, 
                   withdraw.amount,
                   withdraw.date
                ]
                arr.push(data);
            })
            setTableData(arr);
        }catch(e){
            setAlert(e.response.data)
        }
        return;
    }

    useEffect(()=>{
        fetchWithdrawsHandler()
    },[currentpageno, size])

    return (
        <div>
            {alert && <AleartBox message={alert} setAlert={setAlert} />}
            <h1 className="text-center">Withdraws</h1><br/>
            {
                tableData && 
                <Table 
                    tableHeaders={tableHeaders} 
                    tableData={tableData}
                    currentpageno={currentpageno}
                    setCurrentpageno={setCurrentpageno}
                    totalpages={totalpages}
                    setSize={setSize}
                />
            }
        </div>
    );
}

export default AgentWithdraws;
