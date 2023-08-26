import React, { useState } from 'react';
import '../../assets/css/Form.css'
import { validateCity, validateEmail, validateMobile, validateState, validateage, validatefirstname, validatelastname, validatepassword, validateusername } from '../../service/validation';
import AleartBoxSuccess from '../sharedComponent/alertBoxSuccess/AleartBoxSuccess';
import AleartBox from '../sharedComponent/alertBox/AleartBox';
import { customerRegistration } from '../../service/authorization';

const CustomerRegistration = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [age, setAge] = useState(0)
    const [alert, setAlert] = useState(null);
    const [alertSuccess, setAlertSuccess] = useState(null);

    const submitHandler = async (e) => {
        e.preventDefault();
        if(!validatefirstname(firstname)){
            setAlert("write a valid firstname");
            return;
        }
        if(!validatelastname(lastname)){
            setAlert("write a valid lastname");
            return;
        }
        if(!validateage(age)){
            setAlert("Enter a valid age");
            return;
        }
        if(!validateusername(username)){
            setAlert("username should have atleast 6 character");
            return;
        }
        if(!validatepassword(password)){
            setAlert("password should have atleast 6 character");
            return;
        }
        if(!validateMobile(mobile)){
            setAlert("mobile number should be of 10 digits");
            return;
        }
        if(!validateEmail(email)){
            setAlert("enter a valid email");
            return;
        }
        if(!validateState(state)){
            setAlert("Enter a valid state name");
            return;
        }
        if(!validateCity(city)){
            setAlert("Enter a valid city name");
            return;
        }
        try{
            const response = await customerRegistration(firstname, lastname, age, username, password, mobile, email, state, city);
            console.log(response)
            setAlertSuccess(response.data)
        }catch(e){
            console.log(e)
            setAlert(e.response.data)
        }
        return;
    }

    return (
        <>
            {alertSuccess && <AleartBoxSuccess message={alertSuccess} setAlert={setAlertSuccess}/>}
            { alert && <AleartBox message={alert} setAlert={setAlert}/>}
            <div className='registartion-form-wrapper'>
                <h1>Customer Registration</h1>
                <form className='w-50 my-5 shadow p-3 mb-5 bg-body rounded p-4'> 
                    <div className="mb-3">
                        <label for="firstname" className="form-label">Firstname</label>
                        <input type="text" className="form-control" id="firstname" 
                        placeholder='example: Jhon'
                        value={firstname} onChange={(e)=>setFirstname(e.target.value.trim()) }
                        required
                        />
                    </div>
                    <div className="mb-3">
                        <label for="lastname" className="form-label">Lastname</label>
                        <input type="text" className="form-control" id="lastname" required
                        placeholder='example: Doe'
                        value={lastname} onChange={(e)=>setLastname(e.target.value.trim())}/>
                    </div>
                    <div className="mb-3">
                        <label for="age" className="form-label">Age</label>
                        <input type="number" className="form-control" id="age" required
                        placeholder='example: 20'
                        value={age} onChange={(e)=>setAge(parseInt(e.target.value.trim()))}/>
                    </div>
                    <div className="mb-3">
                        <label for="username" className="form-label">Username</label>
                        <input type="text" className="form-control" id="username" required
                        placeholder='example: jhon@123'
                        value={username} onChange={(e)=>setUsername(e.target.value.trim())}/>
                    </div>
                    <div className="mb-3">
                        <label for="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" required
                        placeholder='example: jhon@123'
                        value={password} onChange={(e)=>setPassword(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label for="mobile" className="form-label">Mobile Number</label>
                        <input type="text" className="form-control" id="mobile" 
                        placeholder='example: 9876543210'value={mobile} 
                        onChange={(e)=>setMobile(e.target.value.trim())} required/>
                    </div>
                    <div className="mb-3">
                        <label for="email" className="form-label">Email</label>
                        <input type="text" className="form-control" id="email" 
                        placeholder='example: jhon@xyz.com'value={email} 
                        onChange={(e)=>setEmail(e.target.value.trim())} required/>
                    </div>
                    <div className="mb-3">
                        <label for="state" className="form-label">State</label>
                        <input type="text" className="form-control" id="state" 
                        placeholder='example: Gujarat'value={state} 
                        onChange={(e)=>setState(e.target.value)} required/>
                    </div>
                    <div className="mb-3">
                        <label for="city" className="form-label">City</label>
                        <input type="text" className="form-control" id="city" 
                        placeholder='example: Vapi'value={city} 
                        onChange={(e)=>setCity(e.target.value)} required/>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <button type="submit" className="btn btn-success w-50"
                            onClick={(e)=>submitHandler(e)}
                            >Submit</button>
                    </div>
                            
                </form>
            </div>
        </>
    )
}

export default CustomerRegistration;
