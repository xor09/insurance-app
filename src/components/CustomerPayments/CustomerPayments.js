import React, { useEffect, useState } from "react";
import { getPaymentByPolicyNo } from "../../service/customerApis";
import Table from "../sharedComponent/table/Table";
import { CUSTOMER_PAYMENTS, PAYMENT_GATEWAY } from "../../assets/constants";
import PaymentGateway from "../paymentGateway/PaymentGateway";
import AleartBox from "../sharedComponent/alertBox/AleartBox";
import { calculateNextInstallmentDate } from "../../service/calculator";

const CustomerPayments = (props) => {
  const policyNo = props.policy.policyid;
  const issueDate = props.policy.issueDate;
  console.log(typeof issueDate)
  const agentid = props.policy.agent;
  const registrationCommission =
    props.policy.insuranceScheme.schemeDetails.registrationCommission;
  const installmentCommission =
    props.policy.insuranceScheme.schemeDetails.installmentCommission;
  const amount = props.policy.premiumAmount;
  const totalInstallment = props.policy.totalInstallment;
  const setTab = props.setTab;

  const [tableData, setTableData] = useState([]);
  const [currentpageno, setCurrentpageno] = useState(1);
  const [size, setSize] = useState(5);
  const [totalpages, setTotalpages] = useState(1);
  const [alert, setAlert] = useState(null);
  const [alertSuccess, setAlertSuccess] = useState(null);
  const [firstPayment, setFirstPayment] = useState(true);
  const [paymentGateway, setPaymentGateWay] = useState(null);

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
      const response = await getPaymentByPolicyNo(
        policyNo,
        currentpageno,
        size
      );
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

  useEffect(() => {
    fetchPaymentHandler();
  }, [currentpageno, size]);
  return (
    <>
    {alert && <AleartBox message={alert} setAlert={setAlert} />}
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
            {tableData.length === totalInstallment ? (
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
            )}
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
