export const validatefirstname = (firstname) => {
    if(firstname.length === 0) return false;
    const regex = /^[A-Za-z]+$/;
    return regex.test(firstname);
}

export const validatelastname = (lastname) => {
    if(lastname.length === 0) return false;
    const regex = /^[A-Za-z]+$/;
    return regex.test(lastname);
}
export const validateusername = (username) => {
    return username.length >= 6;
}

export const validatepassword = (password) => {
    return password.length >= 6;
}

export const validateQualification = (qualification) => {
    qualification = qualification.trim();
    if(qualification.length === 0) return false;
    const regex = /^[a-zA-Z. ]+$/;
    return regex.test(qualification);
}

export const validateMobile = (mobile) => {
    const regex = /^\d{10}$/; //regex for mobile number
    return regex.test(mobile);
}

export const validateEmail  = (email) => {
    if(email.length === 0) return false;
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
}

export const validateState = (state) => {
    state = state.trim();
    return state.length > 0
}

export const validateCity = (city) => {
    city = city.trim();
    return city.length > 0
}
