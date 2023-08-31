import axios from "axios"

export const getUser = async (username, token) => {
    const response = await axios.get(`http://localhost:8080/user/detail/${username}`,{
        headers:{
            'Authorization': `Bearer ${token}`
        }
    })

    return response
}

export const getAllActivePlans = async () => {
    const response = await axios.get(`http://localhost:8080/insurenceapp/getactiveinsuranceplans`);
    return response;
}


export const getAllActiveSchemes = (token) => {
    const response = axios.get(`http://localhost:8080/insurenceapp/getactiveschemesandplans`);
    return response;
}

export const getAllActiveSchemesByPlanId = (planid) => {
    const response = axios.get(`http://localhost:8080/insurenceapp/getactiveschemes/${planid}`);
    return response;
}

export const getAllQuery = (currentpageno, size, token) => {
    const response = axios.get(`http://localhost:8080/insurenceapp/getqueries`,{
        params: {
            pageno: currentpageno - 1,
            pagesize: size
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response
}

export const updateQueryResponse = (queryid, answer, token) =>{
    const response = axios.put(`http://localhost:8080/insurenceapp/updateresponse/${queryid}`,
    {
        answer: answer
    },
    {
        headers : {
            Authorization: `Bearer ${token}`
        }
    })
    return response
}

export const getDocumentsByPolicyNo = (policyNo, token) =>{
    const response = axios.get(`http://localhost:8080/insurenceapp/policy/documents/${policyNo}`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response
}

export const getDocumentsByPolicyNoAndClaimId = (policyNo, claimId, token) =>{
    const response = axios.get(`http://localhost:8080/insurenceapp/claim/documents/${policyNo}/${claimId}`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response
}