import axios from "axios";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { user, isAuthorized } = useContext(Context);


  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8080/api/job/getmyjobs",
          { withCredentials: true }
        );
        setMyJobs(data.myJobs);
        
      } catch (error) {
        console.error("Error fetching user:", error);
        toast.error(error.response.data.message);
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, []);

  if (!isAuthorized || (user && user.role !== "Admin")) {
    navigateTo("/");
  }

  // function for enabling editing mode
  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };

  // function for disabling editing mode
  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  // function for updating job

  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    await axios
      .put(`http://localhost:8080/api/job/update/${jobId}`, updatedJob, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setEditingMode(null);
      })
      .catch((error) => {
        console.error("Error updating job:", error);
        toast.error(error.response.data.message);
      });
  };

  // function for deleting job
  const handleDeleteJob = async (jobId) => {
    await axios
      .delete(`http://localhost:8080/api/job/delete/${jobId}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setMyJobs(myJobs.filter((job) => job._id !== jobId));
      })
      .catch((error) => {
        console.error("Error deleting job:", error);
        toast.error(error.response.data.message);
      });
  };

  // handle input change

  const handleInputChange = (jobId, field, value) => {
    setMyJobs(
      myJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  return (
    <div className="myJobs page">
      <div className="container">
        <h3>Your posted jobs</h3>
        {myJobs && myJobs.length > 0 ? (
          <div className="banner">
            {myJobs.map((element) => (
              <div className="card" key={element._id}>
                <div className="content">
                  <div className="short_fields">
                    <div>
                      <span>Title:</span>
                      <input
                        type="text"
                        value={element.title}
                        onChange={(e) =>
                          handleInputChange(
                            element._id,
                            "title",
                            e.target.value
                          )
                        }
                        disabled={editingMode !== element._id ? true : false}
                      />
                    </div>
                    <div>
                      <span>Company:</span>
                      <input
                        type="text"
                        value={element.company}
                        onChange={(e) =>
                          handleInputChange(
                            element._id,
                            "company",
                            e.target.value
                          )
                        }
                        disabled={editingMode !== element._id ? true : false}
                      />
                    </div>
                    <div>
                      <span>Country:</span>
                      <input
                        type="text"
                        value={element.country}
                        onChange={(e) =>
                          handleInputChange(
                            element._id,
                            "country",
                            e.target.value
                          )
                        }
                        disabled={editingMode !== element._id ? true : false}
                      />
                    </div>
                    <div>
                      <span>City:</span>
                      <input
                        type="text"
                        value={element.city}
                        onChange={(e) =>
                          handleInputChange(element._id, "city", e.target.value)
                        }
                        disabled={editingMode !== element._id ? true : false}
                      />
                    </div>
                    <div>
                      <span>Category:</span>
                      <select
                        value={element.jobCategory}
                        onChange={(e) =>
                          handleInputChange(
                            element._id,
                            "jobCategory",
                            e.target.value
                          )
                        }
                        disabled={editingMode !== element._id ? true : false}
                      >
                        <option value="">Select Category</option>
                        <option value="IT">IT</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Finance">Finance</option>
                        <option value="HR">HR</option>
                        <option value="Management">Management</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>
                    <div>
                      <span>Job Type:</span>
                      <select
                        value={element.jobType}
                        onChange={(e) =>
                          handleInputChange(
                            element._id,
                            "jobType",
                            e.target.value
                          )
                        }
                        disabled={editingMode !== element._id ? true : false}
                      >
                        <option value="">Select Job Type</option>
                        <option value="Full Time">Full Time</option>
                        <option value="Part Time">Part Time</option>
                        <option value="Internship">Internship</option>
                      </select>
                    </div>
                    <div>
                      <span>
                        Salary Type:{" "}
                        {element.fixedSalary ? (
                          <input
                            type="number"
                            value={element.fixedSalary}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "fixedSalary",
                                e.target.value
                              )
                            }
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                          />
                        ) : (
                          <div>
                            <input
                              type="number"
                              value={element.salaryFrom}
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "salaryFrom",
                                  e.target.value
                                )
                              }
                              disabled={
                                editingMode !== element._id ? true : false
                              }
                            />
                            <input
                              type="number"
                              value={element.salaryTo}
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "salaryTo",
                                  e.target.value
                                )
                              }
                              disabled={
                                editingMode !== element._id ? true : false
                              }
                            />
                          </div>
                        )}
                      </span>
                    </div>
                    <div>
                      <span>Expired</span>
                      <select
                        value={element.expired}
                        onChange={(e) =>
                          handleInputChange(
                            element._id,
                            "expired",
                            e.target.value
                          )
                        }
                        disabled={editingMode !== element._id ? true : false}
                      >
                        <option value="false">False</option>
                        <option value="true">True</option>
                      </select>
                    </div>
                  </div>
                  <div className="long_field">
                    <div>
                      <span>Description:</span>
                      <textarea
                        rows="3"
                        value={element.description}
                        onChange={(e) =>
                          handleInputChange(
                            element._id,
                            "description",
                            e.target.value
                          )
                        }
                        disabled={editingMode !== element._id ? true : false}
                      ></textarea>
                    </div>
                    <div>
                      <span>Location:</span>
                      <textarea
                        rows="3"
                        value={element.location}
                        onChange={(e) =>
                          handleInputChange(
                            element._id,
                            "location",
                            e.target.value
                          )
                        }
                        disabled={editingMode !== element._id ? true : false}
                      ></textarea>
                    </div>
                    <div>
                      <span>Qualification: </span>

                      <input
                        type="text"
                        value={element.jobQualification}
                        onChange={(e) =>
                          handleInputChange(
                            element._id,
                            "jobQualification",
                            e.target.value
                          )
                        }
                        disabled={editingMode !== element._id ? true : false}
                      />
                    </div>
                    <div>
                      <span>Experience: </span>
                      <select
                        value={element.jobExperience}
                        onChange={(e) =>
                          handleInputChange(
                            element._id,
                            "jobExperience",
                            e.target.value
                          )
                        }
                        disabled={editingMode !== element._id ? true : false}
                      >
                        <option value="">Select Experience</option>
                        <option value="Fresher">Fresher</option>
                        <option value="1-2 years">1-2 years</option>
                        <option value="3-5 years">3-5 years</option>
                        <option value="6-10 years">6-10 years</option>
                        <option value="10+ years">10+ years</option>
                      </select>
                    </div>
                    <div>
                      <span>Skills: </span>
                      <input
                        type="text"
                        value={element.jobSkills}
                        onChange={(e) =>
                          handleInputChange(
                            element._id,
                            "jobSkills",
                            e.target.value
                          )
                        }
                        disabled={editingMode !== element._id ? true : false}
                      />
                    </div>
                  </div>
                </div>
                <div className="button_wrapper">
                  <div className="edit_btn_wrapper">
                    {editingMode === element._id ? (
                      <>
                        <button
                          onClick={() => handleUpdateJob(element._id)}
                          className="check_btn"
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={() => handleDisableEdit()}
                          className="cross_btn"
                        >
                          <RxCross1 />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleEnableEdit(element._id)}
                        className="edit_btn"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteJob(element._id)}
                    className="delete_btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No jobs found</p>
        )}
      </div>
    </div>
  );
};

export default MyJobs;

{
  /* <>
      <div className="myjobs page">
        <div className="container">
          <h3>Your posted jobs</h3>
          {myJobs && myJobs.length > 0 ? (
            <div className="banner">
              {myJobs.map((job) => {
                return (
                  <div className="card" key={job._id}>
                    <div className="content">
                      <div className="short_fields">
                        <div>
                          <span>Title: </span>
                          <input
                            type="text"
                            value={job.title}
                            onChange={(e) =>
                              handleInputChange(
                                job._id,
                                "title",
                                e.target.value
                              )
                            }
                            disabled={editingMode !== job._id ? true : false}
                          />
                        </div>
                        <div>
                          <span>Company: </span>
                          <input
                            type="text"
                            value={job.company}
                            onChange={(e) =>
                              handleInputChange(
                                job._id,
                                "company",
                                e.target.value
                              )
                            }
                            disabled={editingMode !== job._id ? true : false}
                          />
                        </div>
                        <div>
                          <span>Country: </span>
                          <input
                            type="text"
                            value={job.country}
                            onChange={(e) =>
                              handleInputChange(
                                job._id,
                                "country",
                                e.target.value
                              )
                            }
                            disabled={editingMode !== job._id ? true : false}
                          />
                        </div>
                        <div>
                          <span>City: </span>
                          <input
                            type="text"
                            value={job.city}
                            onChange={(e) =>
                              handleInputChange(job._id, "city", e.target.value)
                            }
                            disabled={editingMode !== job._id ? true : false}
                          />
                        </div>
                        <div>
                          <span>Location: </span>
                          <input
                            type="text"
                            value={job.location}
                            onChange={(e) =>
                              handleInputChange(
                                job._id,
                                "location",
                                e.target.value
                              )
                            }
                            disabled={editingMode !== job._id ? true : false}
                          />
                        </div>
                        <div>
                          <span>Category: </span>
                          <select
                            value={job.jobCategory}
                            onChange={(e) =>
                              handleInputChange(
                                job._id,
                                "jobCategory",
                                e.target.value
                              )
                            }
                            disabled={editingMode !== job._id ? true : false}
                          >
                            <option value="">Select Category</option>
                            <option value="IT">IT</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Finance">Finance</option>
                            <option value="HR">HR</option>
                            <option value="Management">Management</option>
                            <option value="Others">Others</option>
                          </select>
                        </div>
                        <div>
                          <span>Job Type: </span>
                          <select
                            value={job.jobType}
                            onChange={(e) =>
                              handleInputChange(
                                job._id,
                                "jobType",
                                e.target.value
                              )
                            }
                            disabled={editingMode !== job._id ? true : false}
                          >
                            <option value="">Select Job Type</option>
                            <option value="Full Time">Full Time</option>
                            <option value="Part Time">Part Time</option>
                            <option value="Internship">Internship</option>
                          </select>
                        </div>
                        <div>
                          <span>Salary Type: </span>
                          <select
                            value={job.salaryType}
                            onChange={(e) =>
                              handleInputChange(
                                job._id,
                                "salaryType",
                                e.target.value
                              )
                            }
                            disabled={editingMode !== job._id ? true : false}
                          >
                            <option value="">Select Salary Type</option>
                            <option value="Fixed">Fixed</option>
                            <option value="Range">Range</option>
                          </select>
                        </div>
                        <div>
                          <span>
                            Salary:
                            {job.salaryType === "Fixed" ? (
                              <input
                                type="number"
                                value={job.FixedSalary}
                                onChange={(e) =>
                                  handleInputChange(
                                    job._id,
                                    "FixedSalary",
                                    e.target.value
                                  )
                                }
                                disabled={
                                  editingMode !== job._id ? true : false
                                }
                              />
                            ) : (
                              <>
                                <input
                                  type="number"
                                  value={job.salaryFrom}
                                  onChange={(e) =>
                                    handleInputChange(
                                      job._id,
                                      "salaryFrom",
                                      e.target.value
                                    )
                                  }
                                  disabled={
                                    editingMode !== job._id ? true : false
                                  }
                                />
                                <input
                                  type="number"
                                  value={job.salaryTo}
                                  onChange={(e) =>
                                    handleInputChange(
                                      job._id,
                                      "salaryTo",
                                      e.target.value
                                    )
                                  }
                                  disabled={
                                    editingMode !== job._id ? true : false
                                  }
                                />
                              </>
                            )}
                          </span>
                        </div>
                        <div>
                          <span>Expired</span>
                          <select
                            value={job.expired}
                            onChange={(e) =>
                              handleInputChange(
                                job._id,
                                "expired",
                                e.target.value
                              )
                            }
                            disabled={editingMode !== job._id ? true : false}
                          >
                            <option value="false">False</option>
                            <option value="true">True</option>
                          </select>
                        </div>
                        <div>
                          <span>Qualification: </span>

                          <input
                            type="text"
                            value={job.jobQualification}
                            onChange={(e) =>
                              handleInputChange(
                                job._id,
                                "jobQualification",
                                e.target.value
                              )
                            }
                            disabled={editingMode !== job._id ? true : false}
                          />
                        </div>
                        <div>
                          <span>Experience: </span>
                          <select
                            value={job.jobExperience}
                            onChange={(e) =>
                              handleInputChange(
                                job._id,
                                "jobExperience",
                                e.target.value
                              )
                            }
                            disabled={editingMode !== job._id ? true : false}
                          >
                            <option value="">Select Experience</option>
                            <option value="Fresher">Fresher</option>
                            <option value="1-2 years">1-2 years</option>
                            <option value="3-5 years">3-5 years</option>
                            <option value="6-10 years">6-10 years</option>
                            <option value="10+ years">10+ years</option>
                          </select>
                        </div>
                        <div>
                          <span>Skills: </span>
                          <input
                            type="text"
                            value={job.jobSkills}
                            onChange={(e) =>
                              handleInputChange(
                                job._id,
                                "jobSkills",
                                e.target.value
                              )
                            }
                            disabled={editingMode !== job._id ? true : false}
                          />
                        </div>
                        {/* <div>
                        <span>Job Posted On: </span>
                        <input
                          type="date"
                          value={job.jobPostedOn}
                          onChange={(e) =>
                            handleInputChange(
                              job._id,
                              "jobPostedOn",
                              e.target.value
                            )
                          }
                          disabled={editingMode !== job._id ? true : false}
                        />
                      </div> */
}
{
  /* <div>
                        <span>Posted By: </span>
                        <input
                          type="text"
                          value={job.postedBy}
                          onChange={(e) =>
                            handleInputChange(
                              job._id,
                              "postedBy",
                              e.target.value
                            )
                          }
                          disabled={editingMode !== job._id ? true : false}
                        />
                      </div> */
}
//                   </div>
//                   <div className="long_field">
//                     <div>
//                       <span>Description: </span>
//                       <textarea
//                         rows="3"
//                         value={job.description}
//                         onChange={(e) =>
//                           handleInputChange(
//                             job._id,
//                             "description",
//                             e.target.value
//                           )
//                         }
//                         disabled={editingMode !== job._id ? true : false}
//                       ></textarea>
//                     </div>
//                     <div>
//                       <span>Responsibilities: </span>
//                       <textarea
//                         rows="3"
//                         value={job.jobResponsibilities}
//                         onChange={(e) =>
//                           handleInputChange(
//                             job._id,
//                             "jobResponsibilities",
//                             e.target.value
//                           )
//                         }
//                         disabled={editingMode !== job._id ? true : false}
//                       ></textarea>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="button_wrapper">
//                   <div className="edit_btn_wrapper">
//                     {editingMode === job._id ? (
//                       <>
//                         <button
//                           onClick={() => handleUpdateJob(job._id)}
//                           className="check_btn"
//                         >
//                           <FaCheck />
//                         </button>
//                         <button
//                           onClick={() => handleDisableEdit()}
//                           className="cross_btn"
//                         >
//                           <RxCross1 />
//                         </button>
//                       </>
//                     ) : (
//                       <>
//                         <button
//                           onClick={() => handleEnableEdit(job._id)}
//                           className="edit_btn"
//                         >
//                           Edit
//                         </button>
//                       </>
//                     )}
//                   </div>
//                   <button
//                     onClick={() => handleDeleteJob(job._id)}
//                     className="delete_btn"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       ) : (
//         <p>No jobs found</p>
//       )}
//     </div>
//   </div>
// </> */}
