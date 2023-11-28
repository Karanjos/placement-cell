import "./landing.css";

const Landing = () => {
  return (
    <div className="mainContainer">
      <div className="mainComp">
        <div className="bodyImage">
          <img src="Images/banner.jpg" alt="" />
        </div>
        <div className="bodyText">
          <h1>Welcome to DGI Placement cell</h1>
          <h2>Made by Karan, Ankit, Akhil and Ayush.</h2>
        </div>
        <div className="gettingStarted">
          <h1>Start Your Journey With Us...</h1>

          <div className="gettingStartedButton">
            <button>Get Started</button>
          </div>
        </div>
      </div>
      <div className="portalInfo">
        <div className="card">
          <div className="card_left">
            <img
              src="Images/applicant-tracking-system.png"
              alt=""
             
            />
          </div>
          <div className="card_right">
            <h1>Placement Portal</h1>
            <p>
              The Placement Cell serves as a pivotal catalyst in connecting
              graduating undergraduates and postgraduates with lucrative job
              prospects, establishing and maintaining active engagement with
              esteemed firms and industrial entities. Operating throughout the
              year, the placement cell actively fosters connections between
              graduates and companies, contributing to a consistent upward
              trajectory in the number of students successfully placed through
              campus interviews.
            </p>
            <button>Learn More</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Landing;
