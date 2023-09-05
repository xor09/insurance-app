import React, { useEffect, useState } from "react";
import { getPaymentByPolicyNo, getPaymentsByDate } from "../../service/customerApis";
import Table from "../sharedComponent/table/Table";
import PaymentGateway from "../paymentGateway/PaymentGateway";
import AleartBox from "../sharedComponent/alertBox/AleartBox";
import { calculateNextInstallmentDate } from "../../service/calculator";
import { getRole } from "../../service/authorization";

const PAYMENT_GATEWAY = process.env.REACT_APP_PAYMENT_GATEWAY;
const ROLE_CUSTOMER = process.env.REACT_APP_ROLE_CUSTOMER;

const CustomerPayments = (props) => {
  const policyNo = props.policy.policyid;
  const issueDate = props.policy.issueDate;
  const agentid = props.policy.agent;
  const registrationCommission =
    props.policy.insuranceScheme.schemeDetails.registrationCommission;
  const installmentCommission =
    props.policy.insuranceScheme.schemeDetails.installmentCommission;
  const amount = props.policy.premiumAmount;
  const totalInstallment = props.policy.totalInstallment;
  const setTab = props.setTab;

  const token = localStorage.getItem('auth');

  const [tableData, setTableData] = useState([]);
  const [currentpageno, setCurrentpageno] = useState(1);
  const [size, setSize] = useState(5);
  const [totalpages, setTotalpages] = useState(1);
  const [alert, setAlert] = useState(null);
  const [alertSuccess, setAlertSuccess] = useState(null);
  const [firstPayment, setFirstPayment] = useState(true);
  const [paymentGateway, setPaymentGateWay] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [role, setRole] = useState('');

  const tableHeaders = [
    "#",
    "Amount",
    "Tax(%)",
    "Total Payment",
    "Payment Type",
    "Date",
  ];

  const fetchPaymentHandler = async () => {
    try {
      let response = null
      if(!startDate || !endDate){
        response = await getPaymentByPolicyNo(policyNo,currentpageno,size);
      }else {
        response = await getPaymentsByDate(policyNo, startDate, endDate, currentpageno, size);
      }
      setCurrentpageno(currentpageno);
      setTotalpages(response.data.totalPages);
      let arr = [];
      response.data.content.map((payment, index) => {
        setFirstPayment(false);
        let data = [
          index + 1,
          payment.amount,
          payment.tax,
          payment.totalPayment,
          payment.paymentType,
          payment.date,
        ];
        arr.push(data);
      });
      setTableData(arr);
    } catch (e) {
      setAlert(e.response.data);
    }
    return;
  };

  const fetchRole = async () => {
    const role = await getRole(token);
    setRole(role.data);
  }

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  useEffect(() => {
    fetchRole();
    fetchPaymentHandler();
  }, [currentpageno, size]);
  return (
    <>
    {alert && <AleartBox message={alert} setAlert={setAlert} />}
      <h1 className="text-center mt-3">Customer Payments</h1><br/>
      {!paymentGateway && (
        <div className="px-3 py-4">
          <div className="float-start">
            <button
              type="button"
              className="btn btn-outline-info text-end"
              onClick={() => setTab(null)}
            >
              🔙
            </button>
          </div>
          <div>
            {role=== ROLE_CUSTOMER ? (tableData.length === totalInstallment ? (
              <div className="d-flex justify-content-center">
                <h4>No due Installment</h4>
              </div>
            ) : (
              <div className="d-flex justify-content-center mt-5 shadow-lg p-3 mb-5 bg-body-tertiary rounded
              border border-danger-subtle">
                <button
                  type="button"
                  className="btn btn-outline-success text-end"
                  onClick={() => setPaymentGateWay(PAYMENT_GATEWAY)}
                >
                  <span className="fw-bold">Pay Your #{!firstPayment ? tableData.length + 1 : "1st"}{" "}
                  installment</span> <span className="text-danger fw-bolder">(Due Date {calculateNextInstallmentDate(issueDate, 7, tableData.length)})</span>
                </button>
              </div>
            )) : 
            (tableData.length === totalInstallment ? (
              <div className="d-flex justify-content-center">
                <h4>No due Installment</h4>
              </div>
            ) :
            <div className="d-flex justify-content-center mt-5 shadow-lg p-3 mb-5 bg-body-tertiary rounded
              border border-danger-subtle">
                  <span className="fw-bold">Next installment </span> <span className="text-danger fw-bolder"> (Due Date {calculateNextInstallmentDate(issueDate, 7, tableData.length)})</span>
              </div>)}
          </div>
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
                            <button className="btn btn-primary w-25" onClick={fetchPaymentHandler}>
                                Search
                            </button>
                            </div>
                        </div>
                    </div>

          <Table
            tableHeaders={tableHeaders}
            tableData={tableData}
            currentpageno={currentpageno}
            setCurrentpageno={setCurrentpageno}
            totalpages={totalpages}
            setSize={setSize}
          />
        </div>
      )}

      {paymentGateway && paymentGateway === PAYMENT_GATEWAY && (
        <PaymentGateway
          setTab={setPaymentGateWay}
          policyNo={policyNo}
          amount={amount}
          agentid={agentid}
          agentCommission={
            firstPayment ? registrationCommission : installmentCommission
          }
        />
      )}
    </>
  );
};

export default CustomerPayments;
