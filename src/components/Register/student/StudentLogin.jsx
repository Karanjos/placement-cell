import "./studentRegister.css";

const Login = () => {
  return (
    <div className="formContainer">
      <form>
        <div className="header">
          <h1>Login Your Account</h1>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" placeholder="Email" id="email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="Password" id="password" />
        </div>
        <div className="form-group">
          <button type="submit">Login</button>
        </div>
        <div className="form-group">
          <span>
            Don't have an account? <a href="/signup" style={{textDecoration:"none"}}>Register...</a>
          </span>
        </div>
      </form>
    </div>
  );
};
export default Login;
