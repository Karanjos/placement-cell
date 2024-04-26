import { useContext, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [FixedSalary, setFixedSalary] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [salaryType, setSalaryType] = useState("FixedSalary");
  const [jobType, setJobType] = useState("");
  const [jobCategory, setJobCategory] = useState("");
  const [jobQualification, setJobQualification] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [jobSkills, setJobSkills] = useState("");
  const [jobResponsibilities, setJobResponsibilities] = useState("");

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleJobPost = async (e) => {
    e.preventDefault();
    if (salaryType === "FixedSalary") {
      setSalaryFrom("");
      setSalaryTo("");
    } else {
      setFixedSalary("");
    }

    await axios
      .post(
        "http://localhost:8080/api/job/post",
        FixedSalary.length >= 4
          ? {
              title,
              company,
              description,
              country,
              city,
              location,
              FixedSalary,
              jobType,
              jobCategory,
              jobQualification,
              jobExperience,
              jobSkills,
              jobResponsibilities,
            }
          : {
              title,
              company,
              description,
              country,
              city,
              location,
              salaryFrom,
              salaryTo,
              jobType,
              jobCategory,
              jobQualification,
              jobExperience,
              jobSkills,
              jobResponsibilities,
            },
        { withCredentials: true },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        toast.success(res.data.message);
        setTitle("");
        setCompany("");
        setDescription("");

        setCountry("");
        setCity("");
        setLocation("");
        setFixedSalary("");
        setSalaryFrom("");
        setSalaryTo("");
        setSalaryType("FixedSalary");
        setJobType("");
        setJobCategory("");
        setJobQualification("");
        setJobExperience("");
        setJobSkills("");
        setJobResponsibilities("");
        navigateTo("/job/getall");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  if (!isAuthorized || (user && user.role !== "Admin")) {
    navigateTo("/");
  }

  return (
    <>
      <div className="job_post">
        <div className="container">
          <h3>Post new job</h3>
          <form action="" onSubmit={handleJobPost}>
            <div className="wrapper">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Job Title"
              />
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Company Name"
              />
            </div>
            <div className="wrapper">
              <select
                name="jobCategory"
                value={jobCategory}
                onChange={(e) => setJobCategory(e.target.value)}
              >
                <option value="">Select Job Category</option>
                <option value="IT">IT</option>
                <option value="Marketing">Marketing</option>
                <option value="Finance">Finance</option>
                <option value="HR">HR</option>
                <option value="Management">Management</option>
                <option value="Others">Others</option>
              </select>
              <select
                name="jobType"
                id="jobType"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
              >
                <option value="default">Select job type</option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div className="wrapper">
              <textarea
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
              ></textarea>
            </div>
            <div className="wrapper">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
              />

              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Country"
              />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
              />
            </div>
            <div className="wrapper">
              <select
                name="salaryType"
                id="salaryType"
                value={salaryType}
                onChange={(e) => setSalaryType(e.target.value)}
              >
                <option value="default">Select salary type</option>
                <option value="FixedSalary">Fixed Salary</option>
                <option value="RangedSalary">Ranged Salary</option>
              </select>
              <div>
                {salaryType === "default" ? (
                  <p>Please Provide Salary Type *</p>
                ) : salaryType === "FixedSalary" ? (
                  <input
                    type="number"
                    value={FixedSalary}
                    onChange={(e) => setFixedSalary(e.target.value)}
                    placeholder="Enter Fixed Salary"
                  />
                ) : (
                  <div className="ranged_salary">
                    <input
                      type="number"
                      value={salaryFrom}
                      onChange={(e) => setSalaryFrom(e.target.value)}
                      placeholder="Salary From"
                    />
                    <input
                      type="number"
                      value={salaryTo}
                      onChange={(e) => setSalaryTo(e.target.value)}
                      placeholder="Salary To"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="wrapper">
              <select
                name="experience"
                id="experience"
                value={jobExperience}
                onChange={(e) => setJobExperience(e.target.value)}
              >
                <option value="default">Select job experience</option>
                <option value="Fresher">Fresher(0-1 years)</option>
                <option value="1-2 years">1-2 years</option>
                <option value="3-5 years">3-5 years</option>
                <option value="6-10 years">6-10 years</option>
                <option value="10+ years">10+ years</option>
              </select>
              <input
                type="text"
                value={jobQualification}
                onChange={(e) => setJobQualification(e.target.value)}
                placeholder="Qualification"
              />
              <input
                type="text"
                value={jobSkills}
                onChange={(e) => setJobSkills(e.target.value)}
                placeholder="Skills"
              />
            </div>

            <textarea
              rows="3"
              value={jobResponsibilities}
              onChange={(e) => setJobResponsibilities(e.target.value)}
              placeholder="Responsibilities"
            ></textarea>
            <button type="submit">Post Job</button>
          </form>
        </div>
      </div>
    </>
  );
};
export default PostJob;
