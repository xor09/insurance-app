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


export const getPolicyByStatus = (status, currentpageno, size, token) => {
    const response = axios.get(`http://localhost:8080/insurenceapp/status/${status}`,{
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

export const updatePolicyStatus = (policyid, status, token) => {
    const response = axios.put(`http://localhost:8080/insurenceapp/updatestatus/${policyid}/${status}`,{},
    {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return response;
}

export const getClaimByStatus = (status, currentpageno, size, token) => {
    const response = axios.get(`http://localhost:8080/insurenceapp/claimsbystatus`,
    {
        params:{
            status: status,
            pageno : currentpageno-1,
            pagesize : size
        },
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return response;
}

export const updateClaimStatus = (claimId, status, token) => {
    const response = axios.put(`http://localhost:8080/insurenceapp/updateclaimstatus/${claimId}`,{},
    {
        params:{
            status: status
        },
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return response;
}


export const getSchemeByStatus = (status, currentpageno, size, token) => {
    const response = axios.get(`http://localhost:8080/insurenceapp/schemebystatus`,
    {
        params:{
            status: status,
            pageno : currentpageno-1,
            pagesize : size
        },
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return response;
}

export const updateSchemeStatus = (schemeId, status, token) => {
    const response = axios.put(`http://localhost:8080/insurenceapp/updateschemestatus/${schemeId}`,{},
    {
        params:{
            status: status
        },
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return response;
}

export const getAllCustomers = (pageno, pagesize, token) => {
    const response = axios.get(`http://localhost:8080/insurenceapp/getcustomers`,
    {
        params:{
            pageno: pageno - 1,
            pagesize: pagesize
        },
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return response;
}

export const getCustomerSearch = (keyword, pageno, pagesize) => {
    const response = axios.get(`http://localhost:8080/insurenceapp/searchcustomer`,
    {
        params:{
            pageno: pageno - 1,
            pagesize: pagesize,
            keyword : keyword
        }
    })
    return response;
}