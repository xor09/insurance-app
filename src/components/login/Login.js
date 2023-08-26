import React, { useState } from 'react';
import '../../assets/css/Form.css'
import AleartBoxSuccess from '../sharedComponent/alertBoxSuccess/AleartBoxSuccess';
import AleartBox from '../sharedComponent/alertBox/AleartBox';
import { login } from '../../service/authorization';
import { useNavigate } from 'react-router-dom';
import { ROLE_ADMIN, ROLE_AGENT, ROLE_CUSTOMER, ROLE_EMPLOYEE } from '../../assets/constants';

const Login = () => {
    const navigation = useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState(null);
    const [alertSuccess, setAlertSuccess] = useState(null);

    const submitHandler = async (e) => {
        e.preventDefault();
        try{
            const response = await login(username, password)
            localStorage.setItem('auth', response.data.accesstoken);
            setAlertSuccess("Login Successful")
            const role = response.data.role;
            if(role === ROLE_ADMIN){
                navigation(`/admin/${username}`)
                return;
            }
            if(role === ROLE_EMPLOYEE){
                navigation(`/employee/${username}`)
                return;
            }
            if(role === ROLE_AGENT){
                navigation(`/agent/${username}`)
                return;
            }
            if(role === ROLE_CUSTOMER){
                navigation(`/customer/${username}`)
                return;
            }
            navigation(`/dashboard`)
            
        }catch(e){
            setAlert(e.response.data)
        }
        return;
    }

    return (
        <>
            {alertSuccess && <AleartBoxSuccess message={alertSuccess} setAlert={setAlertSuccess}/>}
            { alert && <AleartBox message={alert} setAlert={setAlert}/>}
            <div className='login-form-wrapper'>
                <h1>Login</h1>
                <form className='w-25 my-5 shadow p-3 mb-5 bg-body rounded p-4'> 
                    <div className="mb-3">
                        <label for="username" className="form-label">Username</label>
                        <input type="text" className="form-control" id="username" required
                        value={username} onChange={(e)=>setUsername(e.target.value.trim())}/>
                    </div>
                    <div className="mb-3">
                        <label for="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" required
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
    )
}

export default Login;
