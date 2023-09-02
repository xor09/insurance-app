import React, { useEffect, useState } from 'react';
import EmployeeRegistration from '../employeeRegistration/EmployeeRegistration';
import { deleteEmployee, getAllEmployees, updateEmployee } from '../../service/adminApis';
import AleartBox from '../sharedComponent/alertBox/AleartBox';
import Table from '../sharedComponent/table/Table';
import { validatefirstname, validatelastname } from '../../service/validation';
import AleartBoxSuccess from '../sharedComponent/alertBoxSuccess/AleartBoxSuccess';

const EMPLOYEE_REGISTRATION = process.env.REACT_APP_EMPLOYEE_REGISTRATION;


const Employees = () => {
    const token = localStorage.getItem('auth')
    const [tabs, setTabs] = useState(null);
    const [employeeid, setEmployeeid] = useState(null);
    const [firstname, setFirstname] = useState(null);
    const [lastname, setLastname] = useState(null);
    const [salary, setSalary] = useState(null);

    const [alert, setAlert] = useState(null);
    const [alertSuccess, setAlertSuccess] = useState(null);
    const [tableData, setTableData] = useState(null)
    const [currentpageno, setCurrentpageno] = useState(1);
    const [size, setSize] = useState(5);
    const [totalpages, setTotalpages] = useState(1);

    const tableHeaders = ['#', 'Employee Name', 'Salary', 'UPDATE', "DELETE"]

    const fetchEmployeesHandler = async () => {
        try{
            const response = await getAllEmployees(currentpageno, size, token)
            setCurrentpageno(currentpageno);
            setTotalpages(response.data.totalPages);

            let arr = []
            response.data.content.map((employee, index) => {
                let data = [index+1, 
                    employee.firstname +" " +employee.lastname,
                    employee.salary,
                    <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#updateEmployeeModal"
                        onClick={() => {
                        setEmployeeid(employee.employeeId)
                        setFirstname(employee.firstname)
                        setLastname(employee.lastname)
                        setSalary(employee.salary)
                    }}
                    >UPDATE</button>,
                    <button type="button" className="btn btn-danger" 
                        onClick={() => deleteEmployeeHandler(employee.employeeId)}
                    >DELETE</button>
                ]
                arr.push(data);
            })
            setTableData(arr);
        } catch(e){
            setAlert(e.response.data)
        }
    }

    const saveUpdateEmployeeHandler = async () => {
        if(!validatefirstname(firstname)){
            setAlert("Enter valid firstname");
            return;
        }
        if(!validatelastname(lastname)){
            setAlert("Enter valid lastname");
            return;
        }

        try{
            const response = await updateEmployee(employeeid, firstname, lastname, salary, token)
            setAlertSuccess(response.data)
        }catch(e){
            setAlert(e.response.data)
        }
        fetchEmployeesHandler();
        return;
    }

    const deleteEmployeeHandler = async (employeeid) => {
        const shouldDelete = window.confirm('Are you sure you want to detele an employee with id: ' + employeeid);
        if(!shouldDelete) return;
        try{
            const response = await deleteEmployee(employeeid, token)
            setAlertSuccess(response.data)
        }catch(e){
            setAlert(e.response.data)
        }
        fetchEmployeesHandler();
        return;
    }

    useEffect(()=>{
        fetchEmployeesHandler();
    },[tabs])
    return (
        <div className='p-4'>
            {alert && <AleartBox message={alert} setAlert={setAlert}/>}
            {alertSuccess && <AleartBoxSuccess message={alertSuccess} setAlert={setAlertSuccess}/>}
            { tabs===null &&
                <div>
                    <div className='float-end'>
                        <button type="button" class="btn btn-secondary text-end" onClick={()=>setTabs(EMPLOYEE_REGISTRATION)}>Add Employee</button>
                    </div><br />
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
            }
            {
                tabs===EMPLOYEE_REGISTRATION && <EmployeeRegistration setTabs={setTabs}/>
            }
            
            {/* modal for calculating investment */}
            <div className='mx-5 my-4' >
                    <div className="modal fade" id="updateEmployeeModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="updateEmployee">Update Employee</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                                </div>
                                <div className="modal-body">
                                <label htmlFor="firstname">Firstname:</label>
                                <input type="text" className="form-control"id="firstname"
                                placeholder="Enter firstname"
                                onChange={e => setFirstname(e.target.value)}
                                value={firstname}
                                required
                                /><br/>
                                <label htmlFor="lastname">Lastname:</label>
                                <input type="text" className="form-control"id="lastname"
                                placeholder="Enter lastname"
                                onChange={e => setLastname(e.target.value)}
                                value={lastname}
                                required
                                /><br/>
                                <label htmlFor="salary">Salary:</label>
                                <input type="number" className="form-control"id="salary"
                                placeholder="Enter salary"
                                onChange={e => setSalary(e.target.value)}
                                value={salary}
                                required
                                />
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-success" 
                                    data-bs-dismiss="modal"
                                    onClick={()=>saveUpdateEmployeeHandler()}>Save</button>
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" 
                                    >Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Employees;
