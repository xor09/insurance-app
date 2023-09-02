import React, { useEffect, useState } from 'react';
import AleartBox from '../sharedComponent/alertBox/AleartBox';
import AleartBoxSuccess from '../sharedComponent/alertBoxSuccess/AleartBoxSuccess';
import Table from '../sharedComponent/table/Table';
import { getSchemeByStatus, updateSchemeStatus } from '../../service/employeeApis';

const ACTIVE = process.env.REACT_APP_ACTIVE;
const INACTIVE = process.env.REACT_APP_INACTIVE;


const Schemes = () => {
    const token = localStorage.getItem('auth')
    const [selectedOption, setSelectedOption] = useState(ACTIVE);
    const [tableData, setTableData] = useState(null)
    const [alert, setAlert] = useState(null);
    const [alertSuccess, setAlertSuccess] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(ACTIVE);
    const [currentpageno, setCurrentpageno] = useState(1);
    const [size, setSize] = useState(5);
    const [totalpages, setTotalpages] = useState(1);
    const tableHeaders = ['#', 'Scheme', 'Description', 'Amount', 'Time (in years)', 'Age', 'Profit Ratio', 'Status'];

    const handleOptionChange = (event) => {
        setCurrentpageno(1);
        setSelectedOption(event.target.value);
        const status = event.target.value===ACTIVE ? ACTIVE : INACTIVE;
        setSelectedStatus(status)
    };

    const handleStatusChange = async (schemeid, status) => {
        try{
            const response = await updateSchemeStatus(schemeid, status, token)
            setSelectedStatus(selectedStatus);
            setAlertSuccess(response.data)
            fetchSchemesHandler()
        }catch(e){
            setAlert(e.response.data)
        }
    };

    const fetchSchemesHandler = async () =>{
        try{
            const status = selectedOption === ACTIVE ? ACTIVE : INACTIVE;
            const response = await getSchemeByStatus(status, currentpageno, size, token)

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
                    <select className="form-select" id="status" value={selectedStatus} 
                    onChange={(e) => handleStatusChange(scheme.schemeId, e.target.value)}>
                        <option value={ACTIVE} selected={selectedStatus === ACTIVE}>ACTIVE</option>
                        <option value={INACTIVE} selected={selectedStatus === INACTIVE}>INACTIVE</option>
                    </select>
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
    },[selectedOption, selectedStatus, currentpageno, size])
    
    return (
        <>
            <div>
                {alert && <AleartBox message={alert} setAlert={setAlert}/>}
                {alertSuccess && <AleartBoxSuccess message={alertSuccess} setAlert={setAlertSuccess} />}

                <h1 className="text-center mt-4">Schemes</h1><br/>
                <div className='d-flex justify-content-evenly mt-4'>
                    <label className="form-check-label">
                        <input
                        className="form-check-input"
                        type="radio"
                        name="options"
                        value= {ACTIVE}
                        checked={selectedOption === ACTIVE}
                        onChange={handleOptionChange}
                        />
                        Active Schemes
                    </label>
                    <label className="form-check-label">
                        <input 
                        className="form-check-input"
                        type="radio"
                        name="options"
                        value={INACTIVE}
                        checked={selectedOption === INACTIVE}
                        onChange={handleOptionChange}
                        />
                        Inactive Schemes
                    </label>
                </div>

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
