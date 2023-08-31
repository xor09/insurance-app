import React, { useEffect, useState } from "react";
import "../../assets/css/Form.css";
import {
  validateCity,
  validateEmail,
  validateMobile,
  validateSchemeName,
  validateState,
  validateage,
  validatefirstname,
  validatelastname,
  validatepassword,
  validateusername,
} from "../../service/validation";
import AleartBoxSuccess from "../sharedComponent/alertBoxSuccess/AleartBoxSuccess";
import AleartBox from "../sharedComponent/alertBox/AleartBox";
import { ACTIVE, INACTIVE } from "../../assets/constants";
import {
  addScheme,
  getAllPlans,
  getAllPlansWithoutPage,
} from "../../service/adminApis";

const SchemeRegistration = () => {
  const token = localStorage.getItem("auth");
  const [schemeName, setSchemeName] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [minAmount, setMinAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);
  const [minInvestment, setMinInvestment] = useState(0);
  const [maxInvestment, setMaxInvestment] = useState(0);
  const [minAge, setMinAge] = useState(0);
  const [maxAge, setMaxAge] = useState(0);
  const [profitRatio, setProfitRatio] = useState(0);
  const [registrationCommission, setRegistrationCommission] = useState(0);
  const [installmentCommission, setInstallmentCommission] = useState(0);
  const [planid, setPlanid] = useState(0);
  const [alert, setAlert] = useState(null);
  const [alertSuccess, setAlertSuccess] = useState(null);
  const [status, setStatus] = useState("");
  const [plans, setPlans] = useState([]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAddScheme = async (e) => {
    e.preventDefault();
    if (!planid || planid === 0) {
      setAlert("Select a plan");
      return;
    }
    if (
      !schemeName ||
      !image ||
      !description ||
      minAmount <= 0 ||
      maxAmount <= 0 ||
      minInvestment <= 0 ||
      maxInvestment <= 0 ||
      minAge <= 0 ||
      maxAge <= 0 ||
      profitRatio < 0 ||
      registrationCommission < 0 ||
      installmentCommission < 0 ||
      !status
    ) {
      setAlert("Invalid input. Please check your input fields.");
      return;
    }

    const schemename = validateSchemeName(schemeName);
    if(!schemename){
        setAlert("Invalid schemename name.");
        return;
    }

    const formData = new FormData();
    formData.append("schemeName", schemeName);
    formData.append("image", image);
    formData.append("description", description);
    formData.append("minAmount", minAmount);
    formData.append("maxAmount", maxAmount);
    formData.append("minInvestment", minInvestment);
    formData.append("maxInvestment", maxInvestment);
    formData.append("minAge", minAge);
    formData.append("maxAge", maxAge);
    formData.append("profitRatio", profitRatio);
    formData.append("registrationCommission", registrationCommission);
    formData.append("installmentCommission", installmentCommission);
    formData.append("status", status);
    formData.append("planId", planid);

    try {
      const response = await addScheme(formData, token);
      setAlertSuccess(response.data);
    } catch (e) {
      setAlert(e.response.data);
    }
    return;
  };

  const fetchAllPlan = async () => {
    try {
      const response = await getAllPlansWithoutPage(token);
      setPlans(response.data);
    } catch (e) {
      setAlert(e.response.data);
    }
  };

  useEffect(() => {
    fetchAllPlan();
  }, []);

  return (
    <>
      {alertSuccess && (
        <AleartBoxSuccess message={alertSuccess} setAlert={setAlertSuccess} />
      )}
      {alert && <AleartBox message={alert} setAlert={setAlert} />}
      <div className="container">
        <h2 className="mb-4 text-center">Add Insurance Scheme</h2>
        <form>
          <div className="mb-3">
            <select
              className="form-select"
              id="plan"
              value={planid}
              onChange={(e) => {
                setPlanid(parseInt(e.target.value));
              }}
            >
              <option value={0} selected={planid === 0}>
                Select Plan
              </option>

              {plans.map((plan, index) => (
                <option key={index + 1} value={plan.planid}>
                  {plan.planname} ({plan.status})
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Scheme Name"
              value={schemeName}
              onChange={(e) => setSchemeName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="row mb-3">
            <div className="col">
              <input
                type="number"
                className="form-control"
                placeholder="Minimum Amount"
                onChange={(e) => setMinAmount(e.target.value)}
                required
              />
            </div>
            <div className="col">
              <input
                type="number"
                className="form-control"
                placeholder="Maximum Amount"
                onChange={(e) => setMaxAmount(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <input
                type="number"
                className="form-control"
                placeholder="Minimum Investment Time (in years)"
                onChange={(e) => setMinInvestment(e.target.value)}
                required
              />
            </div>
            <div className="col">
              <input
                type="number"
                className="form-control"
                placeholder="Maximum Investment Time (in years)"
                onChange={(e) => setMaxInvestment(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <input
                type="number"
                className="form-control"
                placeholder="Minimum Age"
                onChange={(e) => setMinAge(e.target.value)}
                required
              />
            </div>
            <div className="col">
              <input
                type="number"
                className="form-control"
                placeholder="Maximum Age"
                onChange={(e) => setMaxAge(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Profit Ratio"
              onChange={(e) => setProfitRatio(e.target.value)}
              required
            />
          </div>
          <div className="row mb-3">
            <div className="col">
              <input
                type="number"
                className="form-control"
                placeholder="Registration Commission (in %)"
                onChange={(e) => setRegistrationCommission(e.target.value)}
                required
              />
            </div>
            <div className="col">
              <input
                type="number"
                className="form-control"
                placeholder="Installment Commission (in %)"
                onChange={(e) => setInstallmentCommission(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <select
              className="form-select"
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Select Status</option>
              <option value={ACTIVE}>Active</option>
              <option value={INACTIVE}>Inactive</option>
            </select>
          </div>
          <div className="d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-primary w-25"
              onClick={handleAddScheme}
            >
              Add Scheme
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SchemeRegistration;
