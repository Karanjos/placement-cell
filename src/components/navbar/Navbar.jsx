import "./navbar.css";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { NavLink } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="container">
      <div className="title">
        <NavLink to={"/"} style={{ textDecoration: "none" }}>
          <h1 style={{color:"#7e1010", fontSize:"2.5rem"}}>Placement Cell</h1>
        </NavLink>
      </div>
      <div className="userType">
        <ul className="navMenu">
          <li
            onMouseEnter={() => setShowLogin(true)}
            onMouseLeave={() => setShowLogin(false)}
          >
            <button
              className="dropDownBtn"
              onClick={() => setShowLogin(!showLogin)}
            >
              <span>Login</span>
              <KeyboardArrowDownIcon
                style={{ fontSize: "1.5rem", position: "absolute", top: "5px" }}
              />
            </button>
            {showLogin && (
              <ul className="dropDown">
                <li>
                  <a href="/login">Admin Login</a>
                </li>
                <li>
                  <a href="/login">Student Login</a>
                </li>
                <li>
                  <a href="/login">Placement Cell Login</a>
                </li>
              </ul>
            )}
          </li>
          <li
            onMouseEnter={() => setShowRegister(true)}
            onMouseLeave={() => setShowRegister(false)}
          >
            <button
              className="dropDownBtn"
              onClick={() => setShowRegister(!showRegister)}
            >
              <span>Register</span>
              <KeyboardArrowDownIcon
                style={{ fontSize: "1.5rem", position: "absolute", top: "5px" }}
              />
            </button>
            {showRegister && (
              <ul className="dropDown">
                <li>
                  <a href="/signup">Student Signup</a>
                </li>
                <li>
                  <a href="/signup">Placement Cell Signup</a>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Navbar;
