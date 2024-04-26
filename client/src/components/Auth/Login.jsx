import axios from "axios";
import { useContext, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../../main";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8080/api/user/login",
        { email, password, role },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        if (response.status === 201) {
          toast.success(response.data.message);
          setEmail("");
          setPassword("");
          setRole("");
          setIsAuthorized(true);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.error(error);
      });
  };

  if (isAuthorized) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="authPage">
        <div className="container">
          <div className="header">
            <img src="/JobZeelogo.png" alt="logo" />
            <h3>Login to a your account</h3>
          </div>
          <form>
            <div className="inputTag">
              <label>Login As</label>
              <div>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Select Role</option>
                  <option value="Admin">Admin</option>
                  <option value="Student">Student</option>
                </select>
                <FaRegUser />
              </div>
            </div>
            <div className="inputTag">
              <label>Email</label>
              <div>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="karanjoshi@gmail.com"
                />
                <MdOutlineMailOutline />
              </div>
            </div>
            <div className="inputTag">
              <label>Password</label>
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="must contain atleast 8 charecters..."
                />
                <RiLock2Fill />
              </div>
            </div>
            <button onClick={handleLogin} type="submit">
              Login
            </button>
            <Link to="/register">Create a new account</Link>
          </form>
        </div>
        <div className="banner">
          <img src="/register.png" alt="register" />
        </div>
      </div>
    </>
  );
};

export default Login;
