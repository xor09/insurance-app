import React, { useState } from 'react';
import './Scheme.css'
import schemeimage from '../../assets/images/Life-Insurance.jpg'
import 'rc-slider/assets/index.css'; // Import slider CSS
import Slider from 'rc-slider'; // Import the slider component
import { investmentCalculator } from '../../service/calculator';
import AleartBox from '../sharedComponent/alertBox/AleartBox';
import { SCHEME_DETAILS } from '../../assets/constants';
import SchemeDetail from '../schemeDetail/SchemeDetail';

const Scheme = (props) => {
    const setTabs = props.setTabs;
    const [alert, setAlert] = useState(null);
    

    const scheme = {
        schemename: 'Sample Scheme',
        schemeimage: schemeimage,
        description: 'This is a sample scheme description.',
        minamount: 100000,
        maxamount: 500000,
        mininvestment: 50000,
        maxinvestment: 100000,
        minage: 18,
        maxage: 60,
        profitratio: 10,
    };


    return (
        <>  
            {alert && <AleartBox message = {alert} setAlert={setAlert}/>}
            <div className='card-wrapper'>
                <div className="card">
                    <img src={scheme.schemeimage} className="card-img-top card-image" alt={scheme.schemename} />
                    <div className="card-body">
                        <h5 className="card-title">{scheme.schemename}</h5>
                        <p className="card-text">{scheme.description}</p>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><strong>Amount Range:</strong> Rs.{scheme.minamount} - Rs.{scheme.maxamount}</li>
                            <li className="list-group-item"><strong>Investment Range:</strong> Rs.{scheme.mininvestment} - Rs.{scheme.maxinvestment}</li>
                            <li className="list-group-item"><strong>Age Range:</strong> {scheme.minage} - {scheme.maxage}</li>
                            <li className="list-group-item"><strong>Profit Ratio:</strong> {scheme.profitratio}%</li>
                            <button type="button" class="btn btn-primary" onClick={()=>setTabs(SCHEME_DETAILS)} >MORE!</button>
                        </ul>
                    </div>
                </div>
            </div> 
        </>
    );
}

export default Scheme;
