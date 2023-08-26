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
    return response;;
}