import axios from "axios"


export const getAllPlansWithoutPage = (token) => {
    const response = axios.get(`http://localhost:8080/insurenceapp/getallplans`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return response;
}

export const getAllPlans = (currentpageno, size, token) => {
    const response = axios.get(`http://localhost:8080/insurenceapp/getallinsurenceplans`,{
        params:{
            pageno : currentpageno-1,
            pagesize : size
        },
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

export const getAllEmployees = (currentpageno, size, token) => {
    const response = axios.get(`http://localhost:8080/insurenceapp/getemployees`,{
        params:{
            pageno : currentpageno-1,
            pagesize : size
        },
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

export const addScheme = (scheme , token) => {
    const response = axios.post(`http://localhost:8080/insurenceapp/addinsurencescheme`,scheme,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return response;
}

export const getAllSchemes = (currentpageno, size, token) => {
    const response = axios.get(`http://localhost:8080/insurenceapp/getinsurenceschemes`,{},{
        params:{
            pageno : currentpageno-1,
            pagesize : size
        },
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return response;
}