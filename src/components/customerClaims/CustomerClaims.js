import React, { useEffect, useState } from 'react';
import AleartBox from '../sharedComponent/alertBox/AleartBox';
import { format } from 'date-fns';
import { applyClaim, getAllClaim, getClaimsByDate } from '../../service/customerApis';
import { useNavigate, useParams } from 'react-router-dom';
import Table from '../sharedComponent/table/Table';
import { getRole } from '../../service/authorization';

const APPLIED = process.env.REACT_APP_APPLIED;
const APPROVED = process.env.REACT_APP_APPROVED;
const ROLE_CUSTOMER = process.env.REACT_APP_ROLE_CUSTOMER;


const CustomerClaims = (props) => {
    const policyNo = props.policy.policyid;
    const token = localStorage.getItem('auth')
    const setTab = props.setTab;
    const username = useParams().username
    const navigation = useNavigate();

    const [bankAccountNumber, setBankAccountNumber] = useState('');
    const [bankIFSCCode, setBankIFSCCode] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [currentpageno, setCurrentpageno] = useState(1);
    const [size, setSize] = useState(5);
    const [totalpages, setTotalpages] = useState(1);
    const [alert, setAlert] = useState(null);
    const [alertSuccess, setAlertSuccess] = useState(null);
    const [tableData, setTableData] = useState(null)
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [role, setRole] = useState('');

    const tableHeaders = ['#', 'Account No', 'IFSC Code', 'Applied Date', 'Status'];

    const handleFileSelect = (event) => {
        const files = event.target.files;
        setSelectedFiles([...files]);
    };

    const fetchClaims = async () => {
        try{
            let response = null
            if(!startDate || !endDate) response = await getAllClaim(policyNo);
            else response = await getClaimsByDate(policyNo, startDate, endDate, currentpageno, size)

            setCurrentpageno(currentpageno);
            setTotalpages(response.data.totalPages);
            console.log(response.data)

            let arr = []
            response.data.content.map((claim, index) => {
                let data = [index+1, 
                    claim.bankAccountNumber,
                    claim.bankIfscCode,
                    claim.date,
                    <p className={claim.status === APPLIED ? 'text-warning':
                    claim.status === APPROVED ? 'text-success' : 'text-danger'}>{claim.status}</p>
                ]
                arr.push(data);
            })
            setTableData(arr);
        }catch(e){
            setAlert(e.response.data)
        }
        return;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!bankAccountNumber.trim()) {
          setAlert('Bank Account Number is required.');
          return;
        }
    
        if (!bankIFSCCode.trim()) {
          setAlert('Bank IFSC Code is required.');
          return;
        }
    
        if (selectedFiles.length === 0) {
          setAlert('Please select support documents.');
          return;
        }
    
        const formData = new FormData();
        const date = format(new Date(), 'yyyy-MM-dd');
        formData.append('bankAccountNumber', bankAccountNumber);
        formData.append('bankIfscCode', bankIFSCCode);
        formData.append('date', date);
        formData.append('policyNumber', policyNo);
        
        selectedFiles.forEach((file) => {
          formData.append('documentFiles', file);
        });
        
        try {
          const response = await applyClaim(formData, token); 
          const message = response.data;
          navigation(`/info/${username}/${message}`); 
        } catch (e) {
            console.log(e)
          setAlert(e.response.data);
        }
        return;
    };

    const onClose = () =>{
        setBankAccountNumber('');
        setBankIFSCCode('');
        setSelectedFiles([]);
    }

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
      };
    
      const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
      };


    const fetchRole = async () => {
        const role = await getRole(token);
        setRole(role.data);
      }

    useEffect(()=>{
        fetchRole()
        fetchClaims()
    },[currentpageno, size])

    return (
        <div>
            {alert && <AleartBox message={alert} setAlert={setAlert} />}
            <h1 className="text-center mt-3">Customer Claims</h1><br/>
            <button
              type="button"
              className="btn btn-outline-info text-end float-start mx-3"
              onClick={() => setTab(null)}
            >
              🔙
            </button>
            {
                role=== ROLE_CUSTOMER && 
                <button type="button" class="btn btn-success float-end mx-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Make a claim
                </button>
            }
            <div className="container mt-4">
                        <div className="row">
                            <div className="col-md-6">
                            <label htmlFor="start-date">Start Date:</label>
                            <input
                                type="date"
                                id="start-date"
                                className="form-control"
                                value={startDate}
                                onChange={handleStartDateChange}
                            />
                            </div>
                            <div className="col-md-6">
                            <label htmlFor="end-date">End Date:</label>
                            <input
                                type="date"
                                id="end-date"
                                className="form-control"
                                value={endDate}
                                onChange={handleEndDateChange}
                            />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-12 text-center">
                            <button className="btn btn-primary w-25" onClick={fetchClaims}>
                                Search
                            </button>
                            </div>
                        </div>
                    </div>
            <div className='mt-5'>
                <Table 
                    tableHeaders={tableHeaders} 
                    tableData={tableData}
                    currentpageno={currentpageno}
                    setCurrentpageno={setCurrentpageno}
                    totalpages={totalpages}
                    setSize={setSize}
                />
            </div>

            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Claim Details</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        onClick={()=>onClose()}></button>
                    </div>
                    <div class="modal-body">
                    <form>
                        <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="bankAccountNumber" className="form-label">Bank Account Number</label>
                            <input
                            type="text"
                            className="form-control"
                            id="bankAccountNumber"
                            value={bankAccountNumber}
                            onChange={(e) => setBankAccountNumber(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="bankIFSCCode" className="form-label">Bank IFSC Code</label>
                            <input
                            type="text"
                            className="form-control"
                            id="bankIFSCCode"
                            value={bankIFSCCode}
                            onChange={(e) => setBankIFSCCode(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="documentUpload" className="form-label">Upload Documents (PDF)</label>
                            <input
                            type="file"
                            className="form-control"
                            id="documentUpload"
                            accept="application/pdf"
                            multiple
                            onChange={handleFileSelect}
                            />
                        </div>
                        <div>
                            {selectedFiles.map((file, index) => (
                            <div key={index}>{file.name}</div>
                            ))}
                        </div>
                        </div>
                        <div className="modal-footer">
                        <button type="submit" className="btn btn-primary" onClick={(e)=>handleSubmit(e)}
                        data-bs-dismiss="modal" aria-label="Close"
                        >Submit</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" aria-label="Close" onClick={()=>onClose()}>Close</button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default CustomerClaims;
