import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import {
  ADD_SCHEME,
  AGENTS,
  AGENT_POLICIES,
  AGENT_PROMOTION,
  AGENT_REGISTRATION,
  AGENT_WITHDRAW,
  ALL_EMPLOYEES,
  ALL_PLANS,
  ALL_SCHEME,
  CUSTOMER_POLICIES,
  CUSTOMER_QUERIES,
  CUSTOMER_REGISTRATION,
  EMPLOYEE_CLAIMS,
  EMPLOYEE_POLICIES,
  HOME,
  LOGIN,
  PLAN,
  PROFILE,
  QUERY,
  ROLE_ADMIN,
  ROLE_AGENT,
  ROLE_CUSTOMER,
  ROLE_EMPLOYEE,
  SCHEMES,
} from "../../assets/constants";
import { getAllActivePlans } from "../../service/userApis";
import AleartBox from "../sharedComponent/alertBox/AleartBox";
import Query from "../query/Query";

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
