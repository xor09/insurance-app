import React, { useEffect, useState } from 'react';
import { getAllCustomers, getCustomerSearch } from '../../service/employeeApis';
import AleartBox from '../sharedComponent/alertBox/AleartBox';
import Table from '../sharedComponent/table/Table';
import CustomerPolicies from '../customerPolices/CustomerPolicies';

const EmployeeCustomers = () => {
    const token = localStorage.getItem('auth')
    const [alert, setAlert] = useState(null);
    const [alertSuccess, setAlertSuccess] = useState(null);
    const [tableData, setTableData] = useState([])
    const [currentpageno, setCurrentpageno] = useState(1);
    const [size, setSize] = useState(5);
    const [totalpages, setTotalpages] = useState(1);
    const [user, setUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const tableHeaders = ['#', 'Customer Id', 'Name', 'Email', "Mobile No", "State", "City", "No of Policies", "Policy"]

    const fetchCustomersHandler = async (e) => {
        try{
            let response = null;
            if(!searchTerm){
                response = await getAllCustomers(currentpageno, size, token);
            }else{
                response = await getCustomerSearch(searchTerm, currentpageno, size);
            }
            setCurrentpageno(currentpageno);
            setTotalpages(response.data.totalPages);

            let arr = []
            response.data.content.map((customer, index) => {
                let data = [index+1,
                    customer.customerId, 
                    customer.firstname +" " +customer.lastname,
                    customer.email,
                    customer.mobileNo,
                    customer.state,
                    customer.city,
                    customer.numberOfPolicies,
                    <button type="button" className="btn btn-danger" 
                        onClick={() => 
                                setUser({id: customer.customerId}
                            )}
                    >Policies</button>
                ]
                arr.push(data);
            })
            setTableData(arr);
        } catch(e){
            setAlert(e.response.data)
        }
    }

    useEffect(() => {
        fetchCustomersHandler()
    }, [searchTerm, currentpageno, size]);

    return (
        <div>
            {alert && <AleartBox message={alert} setAlert={setAlert}/>}
           
            {user ? <CustomerPolicies user = {user} setUser = {setUser}/> : 
                <>
                    <h1 className="text-center mt-5">Customers</h1><br/>
                    <div className="mb-3 d-flex justify-content-center">
                       <div className='w-50'> 
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => {
                                setSearchTerm(e.target.value);
                                }}
                            />
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
            }
        </div>
    );
}

export default EmployeeCustomers;
