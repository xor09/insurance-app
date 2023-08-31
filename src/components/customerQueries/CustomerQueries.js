import React, { useEffect, useState } from 'react';
import { getAllQueriesByCustomerId } from '../../service/customerApis';
import Table from '../sharedComponent/table/Table';

const CustomerQueries = (props) => {
    const customerid = props.user.id;
    const token = localStorage.getItem('auth')
    const [tableData, setTableData] = useState(null)
    const [alert, setAlert] = useState(null);
    const [alertSuccess, setAlertSuccess] = useState(null);
    const [currentpageno, setCurrentpageno] = useState(1);
    const [size, setSize] = useState(5);
    const [totalpages, setTotalpages] = useState(1);

    const tableHeaders = ['#', 'Subject', 'Question', 'Answer']

    const fetchQueriesHandler = async () => {
        try{
            const response = await getAllQueriesByCustomerId(customerid, currentpageno, size, token);
            setCurrentpageno(currentpageno);
            setTotalpages(response.data.totalPages);
            
            let arr = []

            response.data.content.map((query, index) => {
                let data = [index+1, 
                    query.subject,
                    query.question,
                    query.answer ? query.answer : "- Not respond yet -",
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
        fetchQueriesHandler()
    },[currentpageno, size])

    return (
        <div>
            <div className='d-flex justify-content-center mt-3'><h3>Your Queries</h3></div>
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

export default CustomerQueries;
