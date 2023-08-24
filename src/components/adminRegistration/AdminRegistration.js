import React, { useState } from 'react';
import '../../assets/css/Form.css'
import { adminRegistartion } from '../../service/authorization';
import { validatefirstname, validatelastname, validatepassword, validateusername } from '../../service/validation';
import AleartBox from '../sharedComponent/alertBox/AleartBox';
import AleartBoxSuccess from '../sharedComponent/alertBoxSuccess/AleartBoxSuccess';

const AdminRegistration = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
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
        try{
            const response = await adminRegistartion(firstname, lastname, username, password);
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

export default AdminRegistration;
