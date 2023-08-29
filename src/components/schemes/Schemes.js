import React, { useEffect, useState } from 'react';
import { getAllSchemes } from '../../service/adminApis';
import AleartBox from '../sharedComponent/alertBox/AleartBox';
import AleartBoxSuccess from '../sharedComponent/alertBoxSuccess/AleartBoxSuccess';
import Table from '../sharedComponent/table/Table';

const Schemes = () => {
    const token = localStorage.getItem('auth')
    const [tableData, setTableData] = useState(null)
    const [alert, setAlert] = useState(null);
    const [alertSuccess, setAlertSuccess] = useState(null);
    const [currentpageno, setCurrentpageno] = useState(1);
    const [size, setSize] = useState(5);
    const [totalpages, setTotalpages] = useState(1);
    const tableHeaders = ['#', 'Scheme', 'Description', 'Amount', 'Time (in years)', 'Age', 'Profit Ratio', 'Status'];

    const fetchSchemesHandler = async () =>{
        try{
            const response = await getAllSchemes(currentpageno, size, token)

            setCurrentpageno(currentpageno);
            setTotalpages(response.data.totalPages);
            let arr = []
            response.data.content.map((scheme, index) => {
                let data = [index+1, 
                    scheme.schemeName,
                    scheme.schemeDetails.description,
                    scheme.schemeDetails.minAmount+" - "+scheme.schemeDetails.maxAmount,
                    scheme.schemeDetails.minInvestment + " - " +scheme.schemeDetails.maxInvestment,
                    scheme.schemeDetails.minAge +" - "+ scheme.schemeDetails.maxAge,
                    scheme.schemeDetails.profitRatio,
                    scheme.status,
                    // <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#updatePlanModal"
                    //     onClick={() => {
                    //     setPlanid(plan.planid);
                    //     setPlainname(plan.planname);
                    //     setPlanstatus(plan.status)
                    // }}
                    // >UPDATE</button>
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
        fetchSchemesHandler()
    },[])
    
    return (
        <>
            <div>
                {alert && <AleartBox message={alert} setAlert={setAlert}/>}
                {alertSuccess && <AleartBoxSuccess message={alertSuccess} setAlert={setAlertSuccess} />}
                {
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
        </>
    );
}

export default Schemes;
