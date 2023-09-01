import React, { useEffect, useState } from 'react';
import Table from '../sharedComponent/table/Table';
import { getAllQuery, updateQueryResponse } from '../../service/userApis';
import AleartBox from '../sharedComponent/alertBox/AleartBox';
import AleartBoxSuccess from '../sharedComponent/alertBoxSuccess/AleartBoxSuccess';

const Query = () => {
    const token = localStorage.getItem('auth')
    const [tableData, setTableData] = useState(null)
    const [alert, setAlert] = useState(null);
    const [alertSuccess, setAlertSuccess] = useState(null);
    const [currentpageno, setCurrentpageno] = useState(1);
    const [size, setSize] = useState(5);
    const [totalpages, setTotalpages] = useState(1);
    const [answer, setAnswer] = useState('');
    const [queryid, setQueryid] = useState(null);
    const [question, setQusestion] = useState(null)

    const tableHeaders = ['#', 'Subject', 'Question', 'Answer', 'Response']

    const fetchQueriesHandler = async () => {
        try{
            const response = await getAllQuery(currentpageno, size, token);
            setCurrentpageno(currentpageno);
            setTotalpages(response.data.totalPages);
            
            let arr = []

            response.data.content.map((query, index) => {
                let data = [index+1, 
                    query.subject,
                    query.question,
                    query.answer ? query.answer : "",
                    <button type="button" className="btn btn-outline-dark w-100" data-bs-toggle="modal" data-bs-target="#queryResponseModal"
                        onClick={() => {
                            setQueryid(query.queryId)
                            setQusestion(query.question)
                            setAnswer(query.answer ? query.answer : "")
                    }}
                    >{query.answer ? "Edit" : "Respond"}</button>
                ]
                arr.push(data);
            })
            setTableData(arr);
        }catch(e){
            setAlert(e.response.data)
        }
        return;
    }

    const saveResponseHandler = async () =>{
        if(!answer || answer.trim().length===0){
            setAlert("Kindly add a response");
            return;
        }

        try{
            const response = await updateQueryResponse(queryid, answer, token);
            setAlertSuccess(response.data)
        }catch(e){
            setAlert(e.response.data)
        }
        fetchQueriesHandler();
    }

    useEffect(()=>{
        fetchQueriesHandler()
    },[currentpageno, size])

    return (

        <div>
            {alert && <AleartBox message={alert} setAlert={setAlert}/>}
            {alertSuccess && <AleartBoxSuccess message={alertSuccess} setAlert={setAlertSuccess} />}
            <div className='d-flex justify-content-center mt-3'><h3>All Queries</h3></div>
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

                {/* response model  */}
                <div className='mx-3 my-4'>
                    <div className="modal fade" id="queryResponseModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Query Response</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <label htmlFor="question">Question:</label>
                                    <input type="text" className="form-control" id="question" 
                                    onChange={(e) => setAnswer(e.target.value)}
                                    value={question}
                                    disabled
                                    /><br/>
                                    <label htmlFor="answer">Answer:</label>
                                    <textarea type="text" className="form-control" id="answer" 
                                    onChange={(e) => setAnswer(e.target.value)}
                                    value={answer}
                                    rows={5}
                                    required
                                    />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-success" 
                                    onClick={() => saveResponseHandler()}
                                    data-bs-toggle="modal" data-bs-target="#queryResponseModal"
                                    >Save Response</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default Query;
