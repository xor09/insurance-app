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
    const [totalWithdrawl, getTotalWithdrawl] = useState(null);
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
                if(totalWithdrawl===null) getTotalWithdrawl(withdraw.totalWithdrawAmount);
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
            <h1 className="text-center mt-4">Withdraws</h1><br/>
            {
                totalWithdrawl!==null && 
                <div className="d-flex justify-content-center mt-5 shadow-lg p-3 mb-4 bg-body-tertiary rounded
                border border-danger-subtle">
                  <p className='fs-5'>Total Withdrawal Amount: <span><b>{totalWithdrawl}</b></span></p>
                </div>
            }
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
