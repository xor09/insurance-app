import React from 'react';

const AleartBoxSuccess = (props) => {
    const message = props.message
    const setAlert = props.setAlert
    return (
        <div className="alert alert-success d-flex align-items-center justify-content-center position-fixed top-0 start-50 translate-middle-x" role="alert" style={{ zIndex: 1000}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi check-circle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
            </svg>
            <div>{message}</div>
            <button type="button" className="btn-close mx-2" aria-label="Close"
                onClick={()=>setAlert(null)}
            ></button>
        </div>
    );
}

export default AleartBoxSuccess;
