import React, { useState } from 'react';
import '../../assets/css/Form.css'
import AleartBoxSuccess from '../sharedComponent/alertBoxSuccess/AleartBoxSuccess';
import AleartBox from '../sharedComponent/alertBox/AleartBox';
import { validateQualification, validatefirstname, validatelastname, validatepassword, validateusername } from '../../service/validation';
import { agentRegistration } from '../../service/authorization';

const AgentRegistration = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [qualification, setQualification] = useState('')
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
        if(!validateusername(username)){
            setAlert("username should have atleast 6 character");
            return;
        }
        if(!validatepassword(password)){
            setAlert("password should have atleast 6 character");
            return;
        }
        if(!validateQualification(qualification)){
            setAlert("enter proper name like B.Tech, BBA, etc");
            return;
        }
        try{
            const response = await agentRegistration(firstname, lastname, username, password, qualification);
            setAlertSuccess(response.data)
        }catch(e){
            setAlert(e.response.data)
        }
        return;
    }

    return (
        <>
            {alertSuccess && <AleartBoxSuccess message={alertSuccess} setAlert={setAlertSuccess}/>}
            { alert && <AleartBox message={alert} setAlert={setAlert}/>}
            <div className='registartion-form-wrapper'>
                <h1>Admin Registration</h1>
                <form className='w-25 my-5 shadow p-3 mb-5 bg-body rounded p-4'> 
                    <div className="mb-3">
                        <label for="firstname" className="form-label">Firstname</label>
                        <input type="text" className="form-control" id="firstname" 
                        placeholder='example: John'
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
                        <label for="qualification" className="form-label">Qualification</label>
                        <input type="text" className="form-control" id="qualification" required
                        placeholder='example: B.Tech'
                        value={qualification} onChange={(e)=>setQualification(e.target.value)}/>
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
                    <div className='d-flex justify-content-center'>
                        <button type="submit" className="btn btn-success w-50"
                            onClick={(e)=>submitHandler(e)}
                            >Submit</button>
                    </div>
                            
                </form>
            </div>
        </>
    );
}

export default AgentRegistration;
