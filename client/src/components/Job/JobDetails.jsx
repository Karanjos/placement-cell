import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";
import axios from "axios";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();
  const { isAuthorized, user } = useContext(Context);
  console.log(user);

  useEffect(() => {
    try {
      axios
        .get(`http://localhost:8080/api/job/${id}`, { withCredentials: true })
        .then((res) => {
          setJob(res.data.job);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  if (!isAuthorized) {
    navigateTo("/login");
  }

  return (
    <>
      <div className="jobDetail page">
        <div className="container">
          <h3>Job Details</h3>
          <div className="banner">
            <p>
              Title: <span>{job.title}</span>
            </p>
            <p>
              Company: <span>{job.company}</span>
            </p>
            <p>
              Category: <span>{job.jobCategory}</span>
            </p>
            <p>
              Country: <span>{job.country}</span>
            </p>
            <p>
              City: <span>{job.city}</span>
            </p>
            <p>
              Location: <span>{job.location}</span>
            </p>
            <p>
              Description: <span>{job.description}</span>
            </p>
            <p>
              Job Post On: <span>{job.jobPostedOn}</span>
            </p>
            <p>
              Job Type: <span>{job.jobType}</span>
            </p>
            <p>
              Qualification: <span>{job.jobQualification}</span>
            </p>
            <p>
              Experience: <span>{job.jobExperience}</span>
            </p>
            <p>
              Skills: <span>{job.jobSkills}</span>
            </p>
            <p>
              Responsibilities: <span>{job.jobResponsibilities}</span>
            </p>
            <p>
              Salary:{" "}
              {job.FixedSalary ? (
                <span>{job.FixedSalary}</span>
              ) : (
                <span>
                  {job.salaryFrom} - {job.salaryTo}
                </span>
              )}
            </p>
            <p>
              {user && user.role === "Admin" ? (
                <>
                  <Link to={`/job/update/${job._id}`}>Edit</Link>
                  <Link to={`/job/delete/${job._id}`}>Delete</Link>
                </>
              ) : (
                <Link to={`/application/${job._id}`}>Apply Now</Link>
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default JobDetails;
