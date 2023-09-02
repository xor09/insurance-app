import React, { useEffect, useState } from 'react';
import './Scheme.css'
import 'rc-slider/assets/index.css'; 
import AleartBox from '../sharedComponent/alertBox/AleartBox';

const SCHEME_DETAILS = process.env.REACT_APP_SCHEME_DETAILS;



const Scheme = (props) => {
    const token = localStorage.getItem('auth')
    const setTabs = props.setTabs;
    const setScheme = props.setScheme
    const scheme = props.scheme
    const [alert, setAlert] = useState(null);


    return (
        <>  
            {alert && <AleartBox message = {alert} setAlert={setAlert}/>}
            {
            <div className='card-wrapper'>
                <div className="card">
                    <img src={`data:image/jpeg;base64,${scheme.schemeDetails.image}`} className="card-img-top card-image" alt={scheme.schemeName} />

                    <div className="card-body">
                        <h5 className="card-title">{scheme.schemeName}</h5>
                        {/* <p className="card-text">{scheme.schemeDetails.description}</p> */}
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><strong>Amount Range:</strong> Rs.{scheme.schemeDetails.minAmount} - Rs.{scheme.schemeDetails.maxAmount}</li>
                            <li className="list-group-item"><strong>Investment Range (Years): </strong>{scheme.schemeDetails.minInvestment} - {scheme.schemeDetails.maxInvestment}</li>
                            <li className="list-group-item"><strong>Age Range:</strong> {scheme.schemeDetails.minAge} - {scheme.schemeDetails.maxAge}</li>
                            <li className="list-group-item"><strong>Profit Ratio:</strong> {scheme.schemeDetails.profitRatio}%</li>
                            <button type="button" class="btn btn-primary" onClick={()=>{
                                setTabs(SCHEME_DETAILS)
                                setScheme(scheme)
                            }} >MORE!</button>
                        </ul>
                    </div>
                </div>
            </div> 
        }
        </>
    );
}

export default Scheme;
