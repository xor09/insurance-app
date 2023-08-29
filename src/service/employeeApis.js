import axios from "axios";

export const getActiveAgents = (currentpageno, size, token) => {
    const response = axios.get(`http://localhost:8080/insurenceapp/activeagents`,{
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

export const getInactiveAgents = (currentpageno, size, token) => {
    const response = axios.get(`http://localhost:8080/insurenceapp/inactiveagents`,{
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
export const getPendingAgents = (currentpageno, size, token) => {
    const response = axios.get(`http://localhost:8080/insurenceapp/pendingagents`,{
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

export const updateAgent = (agentid, status, token) => {
    const response = axios.put(`http://localhost:8080/insurenceapp/updateagentstatus/${agentid}`,
    {},
    {
        params: {
            status: status
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response
}