import "./jobs.css";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/job/getall", {
          withCredentials: true,
        });
        setJobs(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false); // Set loading state to false after 2 seconds or after API request completes
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  if (!isAuthorized) {
    navigateTo("/login");
  }
  return (
    <>
      <section className="jobSection">
        <div className="jobContainer">
          <h1>All available jobs</h1>
          <div className="jobBanner">
            {isLoading ? (
              <div className="loader"></div>
            ) : (
              jobs.jobs &&
              jobs.jobs.map((job) => {
                return (
                  <div className="jobcard" key={job._id}>
                    <div className="align">
                      <span className="red"></span>
                      <span className="yellow"></span>
                      <span className="green"></span>
                    </div>

                    <h1>{job.title}</h1>

                    <div className="cardContent">
                      <p>{job.jobCategory}</p>
                      <p>{job.country}</p>
                      <Link to={`/job/${job._id}`}>Job details</Link>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </>
  );
};
export default Jobs;
