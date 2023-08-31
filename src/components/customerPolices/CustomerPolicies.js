import React, { useEffect, useState } from 'react';
import AleartBox from '../sharedComponent/alertBox/AleartBox';
import AleartBoxSuccess from '../sharedComponent/alertBoxSuccess/AleartBoxSuccess';
import { getPolicies } from '../../service/customerApis';
import Table from '../sharedComponent/table/Table';
import { ACTIVE, CUSTOMER_CLAIMS, CUSTOMER_PAYMENTS, INACTIVE, PENDING } from '../../assets/constants';
import CustomerPayments from '../CustomerPayments/CustomerPayments';
import CustomerClaims from '../customerClaims/CustomerClaims';

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


    const tableHeaders = ['#', 'Policy No', 'Invest Amount', 'Issue Date', 'Mature Amount' ,'Maturity Date', 'status', 'Payments', 'Claims'];


    const fetchPoliciesHandler = async () => {
        try{
            const response = await getPolicies(customerid, currentpageno, size, token);
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

    useEffect(()=>{
        fetchPoliciesHandler();
    },[currentpageno, size])

    return (
        <div>
            {alert && <AleartBox message={alert} setAlert={setAlert}/>}
            {alertSuccess && <AleartBoxSuccess message={alertSuccess} setAlert={setAlertSuccess} />}
            {
                !tab &&(<>
                    <h1 className="text-center mt-5">Customer Claims</h1><br/>
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
