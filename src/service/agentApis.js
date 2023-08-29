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