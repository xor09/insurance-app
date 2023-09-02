import React, { useEffect, useState } from 'react';
import './Plans.css'
import { addPlans, getAllPlans, updatePlan } from '../../service/adminApis';
import AleartBox from '../sharedComponent/alertBox/AleartBox';
import Table from '../sharedComponent/table/Table';
import AleartBoxSuccess from '../sharedComponent/alertBoxSuccess/AleartBoxSuccess';
import { ACTIVE, INACTIVE } from '../../assets/constants';

const Plans = () => {
    const token = localStorage.getItem('auth')
    const [tableData, setTableData] = useState(null)
    const [planid, setPlanid] = useState(null)
    const [planname, setPlainname] = useState(null)
    const [planstatus, setPlanstatus] = useState(null)
    const [alert, setAlert] = useState(null);
    const [alertSuccess, setAlertSuccess] = useState(null);
    const [addPlan, setAddPlan] = useState(null)
    const [currentpageno, setCurrentpageno] = useState(1);
    const [size, setSize] = useState(5);
    const [totalpages, setTotalpages] = useState(1);

    const tableHeaders = ['#', 'Plan Name', 'Status', 'UPDATE'];

    const fetchPlansHandler = async() =>{
        try{
            const response = await getAllPlans(currentpageno, size, token)
            setCurrentpageno(currentpageno);
            setTotalpages(response.data.totalPages);

            let arr = []
            response.data.content.map((plan, index) => {
                let data = [index+1, 
                    plan.planname,
                    plan.status,
                    <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#updatePlanModal"
                        onClick={() => {
                        setPlanid(plan.planid);
                        setPlainname(plan.planname);
                        setPlanstatus(plan.status)
                    }}
                    >UPDATE</button>
                ]
                arr.push(data);
            })
            setTableData(arr);
        }catch(e){
            setAlert(e.response.data)
        }
        return;
    }

    const saveUpdatePlanHandler = async () => {
        if(planname.length === 0){
            setAlert("Please enter valid Plan name");
            return;
        }
        try{
            const response = await updatePlan(planid, planname, planstatus, token)
            setAlertSuccess(response.data)
        }catch(e){
            setAlert(e.response.data)
        }
        fetchPlansHandler();
        return;
    }

    const saveAddPlanHandler = async () => {
        if(!addPlan || addPlan.length===0){
            setAlert("Please enter valid Plan name");
            return;
        }
        try{
            const response = await addPlans(addPlan, token)
            setAlertSuccess(response.data)
        }catch(e){
            setAlert(e.response.data)
        }
        fetchPlansHandler();
        return;
    }

    useEffect(()=>{
        fetchPlansHandler()
    },[currentpageno, size])

    return (
        <div>
             {alert && <AleartBox message={alert} setAlert={setAlert}/>}
             {alertSuccess && <AleartBoxSuccess message={alertSuccess} setAlert={setAlertSuccess} />}
                <div className='add-plan-wrapper'>
                    <div className='add-plan shadow p-3 mb-5 bg-body-tertiary rounded '>
                        <h2>Add Insurance Plan</h2><br/>
                        <input type="text" className="form-control" id="planname" 
                        onChange={(e) => setAddPlan(e.target.value)}
                        value={addPlan}
                        placeholder='Enter plan name'
                        required
                        /><br/>
                        <button type="button" className="btn btn-success w-25"
                        onClick={() => saveAddPlanHandler()}
                        >Add Plan</button>
                    </div>
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

            {/* update Insurance Plan modal */}
                <div className='mx-3 my-4'>
                    <div className="modal fade" id="updatePlanModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Update Insurance Plan</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <label htmlFor="planname">Plan Name:</label>
                                    <input type="text" className="form-control" id="planname" 
                                    onChange={(e) => setPlainname(e.target.value)}
                                    value={planname}
                                    required
                                    />
                                </div>
                                <div className="modal-body">
                                    <label htmlFor="planstatus">Plan Status:</label><br/>
                                    <select className="custom-select" id="planstatus" onChange={(e) => setPlanstatus(e.target.value)}>
                                        <option value="ACTIVE" selected={planstatus === ACTIVE}>ACTIVE</option> 
                                        <option value="INACTIVE" selected={planstatus === INACTIVE}>INACTIVE</option> 
                                    </select>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                    onClick={saveUpdatePlanHandler}
                                    >Update Plan</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
        </div>
    );
}

export default Plans;
