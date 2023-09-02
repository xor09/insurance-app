import React, { useEffect, useState } from 'react';
import { getActiveAgents, getInactiveAgents, getPendingAgents, updateAgent } from '../../service/employeeApis';
import Table from '../sharedComponent/table/Table';
import AleartBox from '../sharedComponent/alertBox/AleartBox';
import AleartBoxSuccess from '../sharedComponent/alertBoxSuccess/AleartBoxSuccess';

const ACTIVE = process.env.REACT_APP_ACTIVE;
const ACTIVE_AGENTS = process.env.REACT_APP_ACTIVE_AGENTS;
const INACTIVE_AGENTS = process.env.REACT_APP_INACTIVE_AGENTS;
const INACTIVE = process.env.REACT_APP_INACTIVE;
const NO_OPTION = process.env.REACT_APP_NO_OPTION;
const PENDING = process.env.REACT_APP_PENDING;
const PENDING_AGENTS = process.env.REACT_APP_PENDING_AGENTS;


const Agents = () => {
    const token = localStorage.getItem('auth')
    const [selectedOption, setSelectedOption] = useState(ACTIVE_AGENTS);
    const [agentid, setAgentid] = useState(null) 
    const [tableData, setTableData] = useState(null)
    const [alert, setAlert] = useState(null);
    const [alertSuccess, setAlertSuccess] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(ACTIVE);
    const [currentpageno, setCurrentpageno] = useState(1);
    const [size, setSize] = useState(5);
    const [totalpages, setTotalpages] = useState(1);

    const tableHeaders = ['#', 'Firstname', 'Lastname', 'Qualifiaction', "UPDATE STATUS"]

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleStatusChange = async (agentid, status) => {
        try{
            const response = await updateAgent(agentid, status, token)
            setSelectedStatus(NO_OPTION);
            setAlertSuccess(response.data)
            fetchAgents()
        }catch(e){
            setAlert(e.response.data)
        }
    };

    const fetchAgents = async () =>{
        let response;
        try{
            if(selectedOption === ACTIVE_AGENTS){
                response = await getActiveAgents(currentpageno, size, token)
                setCurrentpageno(currentpageno);
                setTotalpages(response.data.totalPages);
            }
            if(selectedOption === INACTIVE_AGENTS){
                response = await getInactiveAgents(currentpageno, size, token) 
                setCurrentpageno(currentpageno);
                setTotalpages(response.data.totalPages);
            }
            if(selectedOption === PENDING_AGENTS){
                response = await getPendingAgents(currentpageno, size, token)
                setCurrentpageno(currentpageno);
                setTotalpages(response.data.totalPages);
            }
            let arr = []

            response.data.content.map((agent, index) => {
                let data = [index+1, 
                    agent.firstname,
                    agent.lastname,
                    agent.qualification,
                    <select className="form-select" id="status" value={selectedStatus} 
                    onChange={(e) => handleStatusChange(agent.agentId, e.target.value)}>
                        <option value={ACTIVE} selected={selectedStatus === NO_OPTION}>SELECT</option>
                        <option value={ACTIVE}>ACTIVE</option>
                        <option value={INACTIVE}>INACTIVE</option>
                        <option value={PENDING}>PENDING</option>
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
        fetchAgents()
    },[selectedOption, selectedStatus, currentpageno, size])

    return (
        <div>
             {alert && <AleartBox message={alert} setAlert={setAlert}/>}
             {alertSuccess && <AleartBoxSuccess message={alertSuccess} setAlert={setAlertSuccess}/>}
             <h1 className="text-center mt-4">Agents</h1><br/>
             <div className='d-flex justify-content-evenly mt-4'>
                <label className="form-check-label">
                    <input
                    className="form-check-input"
                    type="radio"
                    name="options"
                    value= {ACTIVE_AGENTS}
                    checked={selectedOption === ACTIVE_AGENTS}
                    onChange={handleOptionChange}
                    />
                    Active Agents
                </label>
                <label className="form-check-label">
                    <input 
                    className="form-check-input"
                    type="radio"
                    name="options"
                    value={INACTIVE_AGENTS}
                    checked={selectedOption === INACTIVE_AGENTS}
                    onChange={handleOptionChange}
                    />
                    Inactive Agents
                </label>
                <label className="form-check-label">
                    <input
                    className="form-check-input"
                    type="radio"
                    name="options"
                    value={PENDING_AGENTS}
                    checked={selectedOption === PENDING_AGENTS}
                    onChange={handleOptionChange}
                    />
                    Pending Agents
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

export default Agents;
