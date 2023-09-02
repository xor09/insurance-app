import React, { useEffect, useState } from 'react';
import Table from '../sharedComponent/table/Table';
import AleartBox from '../sharedComponent/alertBox/AleartBox';
import { getClaimByStatus, updateClaimStatus } from '../../service/employeeApis';
import { downloadFiles } from '../../service/downloader';
import { getDocumentsByPolicyNoAndClaimId } from '../../service/userApis';

const APPLIED = process.env.REACT_APP_APPLIED;
const APPROVED = process.env.REACT_APP_APPROVED;
const REJECTED = process.env.REACT_APP_REJECTED;


const EmployeeClaim = () => {
    const token = localStorage.getItem('auth')
    const [currentpageno, setCurrentpageno] = useState(1);
    const [size, setSize] = useState(5);
    const [totalpages, setTotalpages] = useState(1);
    const [alert, setAlert] = useState(null);
    const [alertSuccess, setAlertSuccess] = useState(null);
    const [tableData, setTableData] = useState(null)
    const [selectedStatus, setSelectedStatus] = useState(APPLIED);
    const [selectedOption, setSelectedOption] = useState(APPLIED);

    const tableHeaders = ['#','Claim Id', 'Policy No', 'Account No', 'IFSC Code', 'Applied Date', 'Documents', 'Status'];

    const handleOptionChange = (event) => {
        setCurrentpageno(1);
        setSelectedOption(event.target.value);
        const status = 
        event.target.value===APPLIED ? APPLIED :
        event.target.value===APPROVED ? APPROVED : REJECTED;
        setSelectedStatus(status)
    };

    const handleStatusChange = async (claimId, status) => {
        try{
            const response = await updateClaimStatus(claimId, status, token);
            setSelectedStatus(selectedStatus);
            setAlertSuccess(response.data)
            fetchClaims()
        }catch(e){
            setAlert(e.response.data)
        }
    };

    const fetchFiles = async (policyNo, claimId) => {
        try{
            const response = await getDocumentsByPolicyNoAndClaimId(policyNo, claimId, token);
            downloadFiles(response.data)
        }catch(e){
            setAlert(e.response.data);
        }
    }


    const fetchClaims = async () => {
        try{
            const status = 
            selectedOption===APPLIED ? APPLIED :
            selectedOption===APPROVED ? APPROVED : REJECTED;

            const response = await getClaimByStatus(status, currentpageno, size, token);
            setCurrentpageno(currentpageno);
            setTotalpages(response.data.totalPages);

            let arr = []

            response.data.content.map((claims, index) => {
                let data = [index+1, 
                    claims.claimId,
                    claims.policyNumber,
                    claims.bankAccountNumber,
                    claims.bankIfscCode,
                    claims.date,
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={()=>fetchFiles(claims.policyNumber,claims.claimId)}
                        >
                        Download
                    </button>,
                    <select className="form-select" id="status" value={selectedStatus} 
                    onChange={(e) => handleStatusChange(claims.claimId, e.target.value)}>
                        <option value={APPROVED} selected={selectedStatus === APPROVED}>APPROVED</option>
                        <option value={APPLIED} selected={selectedStatus === APPLIED}>APPLIED</option>
                        <option value={REJECTED} selected={selectedStatus === REJECTED}>REJECTED</option>
                    </select>
                ]
                arr.push(data);
            })
            setTableData(arr);
        }catch(e){
            console.log(e)
            setAlert(e.response.data)
        }
        return;
    }

    useEffect(()=>{
        fetchClaims()
    },[selectedOption, selectedStatus, currentpageno, size])

    return (
        <div>
            {alert && <AleartBox message={alert} setAlert={setAlert} />}
            <h1 className="text-center mt-4">Claims</h1><br/>
            <div className='d-flex justify-content-evenly mt-4'>
                <label className="form-check-label">
                    <input
                    className="form-check-input"
                    type="radio"
                    name="options"
                    value= {APPLIED}
                    checked={selectedOption === APPLIED}
                    onChange={handleOptionChange}
                    />
                    Applied Claims
                </label>
                <label className="form-check-label">
                    <input 
                    className="form-check-input"
                    type="radio"
                    name="options"
                    value={APPROVED}
                    checked={selectedOption === APPROVED}
                    onChange={handleOptionChange}
                    />
                    Approved Claims
                </label>
                <label className="form-check-label">
                    <input
                    className="form-check-input"
                    type="radio"
                    name="options"
                    value={REJECTED}
                    checked={selectedOption === REJECTED}
                    onChange={handleOptionChange}
                    />
                    Rejected Claims
                </label>
            </div>
            <div className='mt-5'>
                <Table 
                    tableHeaders={tableHeaders} 
                    tableData={tableData}
                    currentpageno={currentpageno}
                    setCurrentpageno={setCurrentpageno}
                    totalpages={totalpages}
                    setSize={setSize}
                />
            </div>
        </div>
        );
}

export default EmployeeClaim;
