import React, { useEffect, useState } from 'react';
import { ACTIVE, ACTIVE_POLICIES, INACTIVE, INACTIVE_POLICIES, NO_OPTION, PENDING, PENDING_POLICIES } from '../../assets/constants';
import AleartBox from '../sharedComponent/alertBox/AleartBox';
import AleartBoxSuccess from '../sharedComponent/alertBoxSuccess/AleartBoxSuccess';
import Table from '../sharedComponent/table/Table';
import { getPolicyByStatus, updatePolicyStatus } from '../../service/employeeApis';

const EmployeePolicies = () => {
    const token = localStorage.getItem('auth')
    const [selectedOption, setSelectedOption] = useState(ACTIVE_POLICIES);
    const [tableData, setTableData] = useState(null)
    const [policyid, setPolicyid] = useState(null)
    const [alert, setAlert] = useState(null);
    const [alertSuccess, setAlertSuccess] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(ACTIVE);
    const [currentpageno, setCurrentpageno] = useState(1);
    const [size, setSize] = useState(5);
    const [totalpages, setTotalpages] = useState(1);

    const tableHeaders = ['#', 'Policy No', 'Customer Id', 'Scheme Name', 'Invest Amount', 'Issue Date', 'Mature Date',"UPDATE STATUS"]

    const handleOptionChange = (event) => {
        setCurrentpageno(1);
        setSelectedOption(event.target.value);
        const status = 
        event.target.value===ACTIVE_POLICIES ? ACTIVE :
        event.target.value===INACTIVE_POLICIES ? INACTIVE : PENDING;
        setSelectedStatus(status)
    };

    const handleStatusChange = async (policyid, status) => {
        try{
            const response = await updatePolicyStatus(policyid, status, token)
            setSelectedStatus(selectedStatus);
            setAlertSuccess(response.data)
            fetchPolicies()
        }catch(e){
            setAlert(e.response.data)
        }
    };

    const fetchPolicies = async () =>{
        try{
            const status = 
                selectedOption===ACTIVE_POLICIES ? ACTIVE :
                    selectedOption===INACTIVE_POLICIES ? INACTIVE : PENDING;

            const response = await getPolicyByStatus(status, currentpageno, size, token);
            setCurrentpageno(currentpageno);
            setTotalpages(response.data.totalPages);

            let arr = []

            response.data.content.map((policy, index) => {
                let data = [index+1, 
                    policy.policyid,
                    policy.customer.customerId,
                    policy.insuranceScheme.schemeName,
                    policy.investAmount,
                    policy.issueDate,
                    policy.maturityDate,
                    <select className="form-select" id="status" value={selectedStatus} 
                    onChange={(e) => handleStatusChange(policy.policyid, e.target.value)}>
                        <option value={ACTIVE} selected={selectedStatus === ACTIVE}>ACTIVE</option>
                        <option value={INACTIVE} selected={selectedStatus === INACTIVE}>INACTIVE</option>
                        <option value={PENDING} selected={selectedStatus === PENDING}>PENDING</option>
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
        fetchPolicies()
    },[selectedOption, selectedStatus, currentpageno, size])


    return (
        <div>
             {alert && <AleartBox message={alert} setAlert={setAlert}/>}
             {alertSuccess && <AleartBoxSuccess message={alertSuccess} setAlert={setAlertSuccess}/>}
             <div className='d-flex justify-content-evenly mt-4'>
                <label className="form-check-label">
                    <input
                    className="form-check-input"
                    type="radio"
                    name="options"
                    value= {ACTIVE_POLICIES}
                    checked={selectedOption === ACTIVE_POLICIES}
                    onChange={handleOptionChange}
                    />
                    Active Policies
                </label>
                <label className="form-check-label">
                    <input 
                    className="form-check-input"
                    type="radio"
                    name="options"
                    value={INACTIVE_POLICIES}
                    checked={selectedOption === INACTIVE_POLICIES}
                    onChange={handleOptionChange}
                    />
                    Inactive Policies
                </label>
                <label className="form-check-label">
                    <input
                    className="form-check-input"
                    type="radio"
                    name="options"
                    value={PENDING_POLICIES}
                    checked={selectedOption === PENDING_POLICIES}
                    onChange={handleOptionChange}
                    />
                    Pending Policies
                </label>
            </div>

             {<Table 
                tableHeaders={tableHeaders} 
                tableData={tableData}
                currentpageno={currentpageno}
                setCurrentpageno={setCurrentpageno}
                totalpages={totalpages}
                setSize={setSize}
            /> }
        </div>
    );
}

export default EmployeePolicies;
