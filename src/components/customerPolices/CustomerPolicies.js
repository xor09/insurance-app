import React, { useEffect, useState } from 'react';
import AleartBox from '../sharedComponent/alertBox/AleartBox';
import AleartBoxSuccess from '../sharedComponent/alertBoxSuccess/AleartBoxSuccess';
import { getPolicies, getPoliciesByDate } from '../../service/customerApis';
import Table from '../sharedComponent/table/Table';
import CustomerPayments from '../CustomerPayments/CustomerPayments';
import CustomerClaims from '../customerClaims/CustomerClaims';
import { getRole } from '../../service/authorization';

const ACTIVE = process.env.REACT_APP_ACTIVE;
const CUSTOMER_CLAIMS = process.env.REACT_APP_CUSTOMER_CLAIMS;
const CUSTOMER_PAYMENTS = process.env.REACT_APP_CUSTOMER_PAYMENTS;
const INACTIVE = process.env.REACT_APP_INACTIVE;
const PENDING = process.env.REACT_APP_PENDING;
const ROLE_CUSTOMER = process.env.REACT_APP_ROLE_CUSTOMER;


const CustomerPolicies = (props) => {
    const customerid = props.user.id;
    const token = localStorage.getItem('auth')

    const [tableData, setTableData] = useState(null)
    const [currentpageno, setCurrentpageno] = useState(1);
    const [size, setSize] = useState(5);
    const [totalpages, setTotalpages] = useState(1);
    const [alert, setAlert] = useState(null);
    const [alertSuccess, setAlertSuccess] = useState(null);
    const [policy, setPolicy] = useState({});
    const [tab, setTab] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [dateType, setDateType] = useState('issueDate');
    const [role, setRole] = useState('');


    const tableHeaders = ['#', 'Policy No', 'Invest Amount', 'Issue Date', 'Mature Amount' ,'Maturity Date', 'status', 'Payments', 'Claims'];


    const fetchPoliciesHandler = async () => {
        try{
            let response = null;
            if(startDate && endDate){
                response = await getPoliciesByDate(customerid, dateType, startDate, endDate, currentpageno, size);
            }else{ 
                response = await getPolicies(customerid, currentpageno, size, token);
            }
            setCurrentpageno(currentpageno);
            setTotalpages(response.data.totalPages);

            let arr = []
            response.data.content.map((policy, index) => {
                let data = [index+1, 
                    policy.policyid,
                    policy.investAmount,
                    policy.issueDate,
                    policy.sumAssured,
                    policy.maturityDate,
                    <p className={policy.status === PENDING ? 'text-warning':
                    policy.status === ACTIVE ? 'text-success' : 'text-danger'}>{policy.status}</p>,
                    <button type="button" className={`btn btn-warning 
                    ${policy.status===PENDING ||  policy.status===INACTIVE ? 'disabled' : ''}`}
                    onClick={()=>{
                        setPolicy(policy)
                        setTab(CUSTOMER_PAYMENTS) 
                    }}
                    >Payments</button>,
                    
                    <button type="button" className={`btn btn-warning 
                    ${policy.status===PENDING ||  policy.status===INACTIVE ? 'disabled' : ''}`}
                    onClick={()=>{
                        setPolicy(policy)
                        setTab(CUSTOMER_CLAIMS) 
                    }}
                    >Claim</button>
                ]
                arr.push(data);
            })
            setTableData(arr);
        }catch(e){
            setAlert(e.resposne.data);
        }
        return;
    }

      const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
      };
    
      const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
      };

      const handleDateTypeChange = (e) => {
        setDateType(e.target.value);
      };
    
    const fetchRole = async () => {
        const role = await getRole(token);
        setRole(role.data);
    }

    useEffect(()=>{
        fetchRole()
        fetchPoliciesHandler();
    },[currentpageno, size])

    return (
        <div>
            {alert && <AleartBox message={alert} setAlert={setAlert}/>}
            {alertSuccess && <AleartBoxSuccess message={alertSuccess} setAlert={setAlertSuccess} />}
            {
                !tab &&(<>
                    {role !== ROLE_CUSTOMER && 
                        <div className="float-start m-3">
                            <button
                            type="button"
                            className="btn btn-outline-info text-end"
                            onClick={() => props.setUser(null)}
                            >
                            🔙
                            </button>
                        </div>
                    }
                    <h1 className="text-center mt-5">Customer Policies</h1><br/>
                    <div className="container mt-4">
                        <div className="row">
                            <div className="col-md-4">
                            <label htmlFor="date-type">Select Date Type:</label>
                            <select
                                id="date-type"
                                className="form-control"
                                value={dateType}
                                onChange={handleDateTypeChange}
                            >
                                <option value="issueDate">Issue Date</option>
                                <option value="maturityDate">Maturity Date</option>
                            </select>
                            </div>
                            <div className="col-md-4">
                            <label htmlFor="start-date">Start Date:</label>
                            <input
                                type="date"
                                id="start-date"
                                className="form-control"
                                value={startDate}
                                onChange={handleStartDateChange}
                            />
                            </div>
                            <div className="col-md-4">
                            <label htmlFor="end-date">End Date:</label>
                            <input
                                type="date"
                                id="end-date"
                                className="form-control"
                                value={endDate}
                                onChange={handleEndDateChange}
                            />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-12 text-center">
                            <button className="btn btn-primary w-25" onClick={fetchPoliciesHandler}>
                                Search
                            </button>
                            </div>
                        </div>
                    </div>
                    <Table 
                        tableHeaders={tableHeaders} 
                        tableData={tableData}
                        currentpageno={currentpageno}
                        setCurrentpageno={setCurrentpageno}
                        totalpages={totalpages}
                        setSize={setSize}
                    />
                </>
                )
            }
            {
                tab && tab === CUSTOMER_PAYMENTS && 
                <CustomerPayments 
                    policy={policy} 
                    tab={tab} 
                    setTab={setTab}
                />
            }
            {
                tab && tab === CUSTOMER_CLAIMS && 
                <CustomerClaims 
                    policy={policy} 
                    tab={tab} 
                    setTab={setTab}
                />
            }
        </div>
    );
}

export default CustomerPolicies;
