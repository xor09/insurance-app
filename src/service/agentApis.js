import axios from "axios";

export const getAgent = (agentid) => {
    const response = axios.get(`http://localhost:8080/insurenceapp/getagentbyid/${agentid}`)
    return response;
}

export const getPoliciesByAgent = (agentid, currentpageno, pagesize, token) => {
    const response = axios.get(`http://localhost:8080/insurenceapp/getpolicies/${agentid}`,{
        params:{
            pageno: currentpageno - 1,
            pagesize: pagesize
        },
        headers:{
            Authorization : `Bearer ${token}`
        }
    })
    return response;
}

export const addCommission = (agentid, amount) => {
    const response = axios.post(`http://localhost:8080/insurenceapp/commission/${agentid}`,{
        amount : amount
    });
    return response
}

export const withdrawCommission = (agentid, amount, date, token) => {
    const response = axios.post('http://localhost:8080/insurenceapp/withdrawcommision',{
        agentId : agentid,
        amount : amount,
        date : date
    },
    {
        headers : {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}