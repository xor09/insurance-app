import axios from "axios"

export const getRole = async (token) => {
    const response = await axios.post(`http://localhost:8080/api/auth/getrole`,{},{
        params: {
            token: token
        },
    });
    return response;
}

export const getUsername = async (token) => {
    const response = await axios.post(`http://localhost:8080/api/auth/getusername`, {},{
        params: {
            token: token
        },
    });
    return response;
}

export const login = async (username, password) => {
    const response = await axios.post(`http://localhost:8080/api/auth/login`,{
        username: username,
        password: password
    })
    return response
}

export const adminRegistartion = async (firstname, lastname, username, password) => {
    const response = await axios.post(`http://localhost:8080/api/auth/adminregister`,{
        firstname : firstname ,
        lastname : lastname,
        username : username,
        password : password,
        roleid : 1
    });
    return response
}

export const employeeRegistration = async (firstname, lastname, username, password, salary, token) => {
    const response = await axios.post("http://localhost:8080/api/auth/employeeregister",{
        firstname : firstname ,
        lastname : lastname,
        username : username,
        password : password,
        salary: salary,
        roleid : 2
    },{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return response
}

export const agentRegistration = async (firstname, lastname, username, password, qualification) => {
    const response = await axios.post('http://localhost:8080/api/auth/agentregister',{
        firstname : firstname ,
        lastname : lastname,
        username : username,
        password : password,
        qualification : qualification,
        roleid: 3
    })
    return response
}

export const customerRegistration = async (firstname, lastname, age, username, password, mobile, email, state, city) => {
    const response = await axios.post('http://localhost:8080/api/auth/customerregister',{
        firstname : firstname,
        lastname : lastname,
        age : age,
        username : username,
        password : password,
        mobileNo : mobile,
        email : email,
        state : state,
        city : city,
        roleid : 4
    })
    return response
}

