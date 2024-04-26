import { useState } from "react";
import { Context } from "../../main";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  console.log(user);

  const handleLogout = async () => {
    console.log(isAuthorized);
    try {
      const response = await axios.get(
        "http://localhost:8080/api/user/logout",
        { withCredentials: true }
      );
      if (response.status === 201) {
        toast.success(response.data.message);
        setIsAuthorized(false);
        navigateTo("/login");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
      <div className="container">
        <div className="logo">
          <img src="../../../public/JobZee-logos__white.png" alt="logo" />
        </div>
        <ul className={!show ? "menu" : "show-menu menu"}>
          <li>
            <Link to={"/"} onClick={() => setShow(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to={"/job/getall"} onClick={() => setShow(false)}>
              Jobs
            </Link>
          </li>
          <li>
            <Link to={"/chatwithai"} onClick={() => setShow(false)}>
              Chat With AI
            </Link>
          </li>
          <li>
            <Link
              to={"/application/my-applications"}
              onClick={() => setShow(false)}
            >
              {user && user.role === "Admin"
                ? "Applicant's Applications"
                : "My Applications"}
            </Link>
          </li>
          {user && user.role === "Admin" ? (
            <>
              <li>
                <Link to={"/job/post-job"} onClick={() => setShow(false)}>
                  Post Job
                </Link>
              </li>
              <li>
                <Link to={"/job/my-jobs"} onClick={() => setShow(false)}>
                  My Jobs
                </Link>
              </li>
            </>
          ) : (
            <></>
          )}
          <button onClick={handleLogout}>Log Out</button>
        </ul>
        <div className="hamburger">
          <GiHamburgerMenu onClick={() => setShow(!show)} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
