import "./studentRegister.css";

const Signup = () => {
  return (
    <div className="formContainer">
      <form>
        <div className="header">
          <h1>Create Your Account</h1>
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" placeholder="Name" id="name" />
        </div>
        <div className="form-group">
          <label htmlFor="officialEmail">Official Email</label>
          <input
            type="OfficialEmail"
            placeholder="Official Email"
            id="officialEmail"
          />
        </div>
        <div className="form-group">
          <label htmlFor="personalEmail">Personal Email</label>
          <input
            type="personalEmail"
            placeholder="Personal Email"
            id="personalEmail"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Atleast 6 characters..."
            id="password"
          />
        </div>
        <div className="form-group">
          <button type="submit">Signup</button>
        </div>
        <div className="form-group">
          <span>
            Already have an account? <a href="/login" style={{textDecoration:"none"}}>Login</a>
          </span>
        </div>
      </form>
    </div>
  );
};
export default Signup;
