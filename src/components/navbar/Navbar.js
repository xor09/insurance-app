import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { getAllActivePlans } from "../../service/userApis";
import AleartBox from "../sharedComponent/alertBox/AleartBox";

const ADD_SCHEME = process.env.REACT_APP_ADD_SCHEME;
const AGENTS = process.env.REACT_APP_AGENTS;
const AGENT_POLICIES = process.env.REACT_APP_AGENT_POLICIES;
const AGENT_PROMOTION = process.env.REACT_APP_AGENT_PROMOTION;
const AGENT_REGISTRATION = process.env.REACT_APP_AGENT_REGISTRATION;
const AGENT_WITHDRAW = process.env.REACT_APP_AGENT_WITHDRAW;
const ALL_EMPLOYEES = process.env.REACT_APP_ALL_EMPLOYEES;
const ALL_PLANS = process.env.REACT_APP_ALL_PLANS;
const ALL_SCHEME = process.env.REACT_APP_ALL_SCHEME;
const CUSTOMER_POLICIES = process.env.REACT_APP_CUSTOMER_POLICIES;
const CUSTOMER_QUERIES = process.env.REACT_APP_CUSTOMER_QUERIES;
const CUSTOMER_REGISTRATION = process.env.REACT_APP_CUSTOMER_REGISTRATION;
const EMPLOYEE_CLAIMS = process.env.REACT_APP_EMPLOYEE_CLAIMS;
const EMPLOYEE_POLICIES = process.env.REACT_APP_EMPLOYEE_POLICIES;
const HOME = process.env.REACT_APP_HOME;
const LOGIN = process.env.REACT_APP_LOGIN;
const PLAN = process.env.REACT_APP_PLAN;
const PROFILE = process.env.REACT_APP_PROFILE;
const QUERY = process.env.REACT_APP_QUERY;
const ROLE_ADMIN = process.env.REACT_APP_ROLE_ADMIN;
const ROLE_AGENT = process.env.REACT_APP_ROLE_AGENT;
const ROLE_CUSTOMER = process.env.REACT_APP_ROLE_CUSTOMER;
const ROLE_EMPLOYEE = process.env.REACT_APP_ROLE_EMPLOYEE;

const Navbar = (props) => {
  const token = localStorage.getItem("auth");
  const navigation = useNavigate();
  const setComponent = props.setComponent;
  const user = props.user;
  const setPlanid = props.setPlanid;
  const [alert, setAlert] = useState(null);
  const [plans, setPlans] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setComponent(HOME);
    navigation("/");
    return;
  };

  const fetchActivePlansHandler = async () => {
    try {
      const response = await getAllActivePlans();
      setPlans(response.data);
    } catch (e) {
      setAlert(e);
    }
  };

  useEffect(() => {
    fetchActivePlansHandler();
  }, []);

  return (
    <>
      {alert && <AleartBox message={alert} setAlert={setAlert} />}
      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container-fluid">
          {token && user && (
            <p className="navbar-brand">
              {user.firstname} {user.lastname}
            </p>
          )}
          <button
            className="navbar-toggler toogle-button-wrapper"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon toogle-button"></span>
            <span className="navbar-toggler-icon toogle-button"></span>
            <span className="navbar-toggler-icon toogle-button"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <p
                  className="nav-link"
                  aria-current="page"
                  onClick={() => setComponent(HOME)}
                >
                  Home
                </p>
              </li>
              {user && user.role === ROLE_ADMIN && (
                <li className="nav-item">
                  <p
                    className="nav-link"
                    aria-current="page"
                    onClick={() => setComponent(ALL_PLANS)}
                  >
                    All Plan
                  </p>
                </li>
              )}

              {user && user.role === ROLE_EMPLOYEE && (
                <>
                  <li className="nav-item">
                    <p
                      className="nav-link"
                      aria-current="page"
                      onClick={() => setComponent(AGENTS)}
                    >
                      Agents
                    </p>
                  </li>
                  <li className="nav-item">
                  <p
                    className="nav-link"
                    aria-current="page"
                    onClick={() => setComponent(EMPLOYEE_POLICIES)}
                  >
                    Policies
                  </p>
                </li>
                <li className="nav-item">
                  <p
                    className="nav-link"
                    aria-current="page"
                    onClick={() => setComponent(EMPLOYEE_CLAIMS)}
                  >
                    Claims
                  </p>
                </li>
              </>
              )}

              {
                <li className="nav-item dropdown">
                  <p
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Plans
                  </p>
                  <ul className="dropdown-menu custom-dropdown">
                    {plans.length === 0 ? (
                      <li>No Plan avaliable</li>
                    ) : (
                      plans.map((plan, index) => (
                        <li key={index + 1}>
                          <p
                            className="dropdown-item"
                            onClick={() => {
                              setComponent(PLAN);
                              setPlanid(plan.planid);
                            }}
                          >
                            {plan.planname}
                          </p>
                        </li>
                      ))
                    )}
                  </ul>
                </li>
              }

              {user && user.role === ROLE_ADMIN && (
                <li className="nav-item dropdown">
                  <p
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Schemes
                  </p>
                  <ul className="dropdown-menu custom-dropdown">
                    <li>
                      <p
                        className="dropdown-item"
                        onClick={() => {
                          setComponent(ADD_SCHEME);
                        }}
                      >
                        Add Scheme
                      </p>
                    </li>

                    <li>
                      <p
                        className="dropdown-item"
                        onClick={() => {
                          setComponent(ALL_SCHEME);
                        }}
                      >
                        ALL Scheme
                      </p>
                    </li>
                  </ul>
                </li>
              )}

              {user && user.role === ROLE_ADMIN && (
                <li className="nav-item">
                  <p
                    className="nav-link"
                    aria-current="page"
                    onClick={() => setComponent(ALL_EMPLOYEES)}
                  >
                    Employees
                  </p>
                </li>
              )}

              {user && user.role === ROLE_AGENT && (
                <>
                  <li className="nav-item">
                    <p
                      className="nav-link"
                      aria-current="page"
                      onClick={() => setComponent(PROFILE)}
                    >
                      Profile
                    </p>
                  </li>

                  <li className="nav-item">
                    <p
                      className="nav-link"
                      aria-current="page"
                      onClick={() => setComponent(AGENT_POLICIES)}
                    >
                      Policies
                    </p>
                  </li>
                  
                  <li className="nav-item">
                    <p
                      className="nav-link"
                      aria-current="page"
                      onClick={() => setComponent(AGENT_WITHDRAW)}
                    >
                      Withdraws
                    </p>
                  </li>

                  <li className="nav-item">
                    <p
                      className="nav-link"
                      aria-current="page"
                      onClick={() => setComponent(AGENT_PROMOTION)}
                    >
                      Promote
                    </p>
                  </li>
                </>
              )}

              {user && user.role === ROLE_CUSTOMER && (
                <>
                  <li className="nav-item">
                    <p
                      className="nav-link"
                      aria-current="page"
                      onClick={() => setComponent(CUSTOMER_POLICIES)}
                    >
                      Policies
                    </p>
                  </li>
                  <li className="nav-item">
                    <p
                      className="nav-link"
                      aria-current="page"
                      onClick={() => setComponent(CUSTOMER_QUERIES)}
                    >
                      Queries
                    </p>
                  </li>
                </>
              )}


            {user && (user.role === ROLE_ADMIN || user.role === ROLE_EMPLOYEE) && (
                <>
                  <li className="nav-item">
                    <p
                      className="nav-link"
                      aria-current="page"
                      onClick={() => setComponent(QUERY)}
                    >
                      Queries
                    </p>
                  </li>
                </>
              )}



              <li className="nav-item dropdown">
                <p
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Register
                </p>
                <ul className="dropdown-menu custom-dropdown">
                  <li>
                    <p
                      className="dropdown-item"
                      onClick={() => setComponent(AGENT_REGISTRATION)}
                    >
                      Agent Registration
                    </p>
                  </li>
                  <li>
                    <p
                      className="dropdown-item"
                      onClick={() => setComponent(CUSTOMER_REGISTRATION)}
                    >
                      Customer Registration
                    </p>
                  </li>
                </ul>
              </li>

              
              {token ? (
                <li className="nav-item">
                  <p className="nav-link" onClick={() => handleLogout()}>
                    Logout
                  </p>
                </li>
              ) : (
                <li className="nav-item">
                  <p className="nav-link" onClick={() => setComponent(LOGIN)}>
                    Login
                  </p>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
