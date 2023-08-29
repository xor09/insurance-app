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