import axios from "axios"

export const getAllPlans = (token) => {
    const response = axios.get(`http://localhost:8080/insurenceapp/getallinsurenceplans`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return response;
}

export const updatePlan = (planid, planname, planstatus, token) => {
    const response = axios.put(`http://localhost:8080/insurenceapp/updateinsuranceplan/${planid}`,{
        planname : planname,
        status : planstatus
    },{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return response;
}

export const addPlans = (addPlan, token) => {
    const response = axios.post(`http://localhost:8080/insurenceapp/addinsuranceplan`,{
        planname : addPlan,
    },{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return response;
}

export const getAllEmployees = (token) => {
    const response = axios.get(`http://localhost:8080/insurenceapp/getallemployees`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return response;
}

export const updateEmployee = (employeeid, firstname, lastname, salary, token) =>{
    const response = axios.put(`http://localhost:8080/insurenceapp/updateemployee/${employeeid}`,
    {
        firstname: firstname,
        lastname: lastname,
        salary: salary
    },
    {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return response;
}

export const deleteEmployee = (employeeid, token) => {
    const response = axios.delete(`http://localhost:8080/insurenceapp/deleteemployee/${employeeid}`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response
}