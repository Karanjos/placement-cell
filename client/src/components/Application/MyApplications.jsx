import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";
import { useContext, useEffect, useState } from "react";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");
  const { user, isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();
  useEffect(() => {
    try {
      if (user && user.role === "Admin") {
        axios
          .get(
            "http://localhost:8080/api/application/admin/getallapplications",
            { withCredentials: true }
          )
          .then((res) => {
            setApplications(res.data.applications);
          });
      } else {
        axios
          .get(
            "http://localhost:8080/api/application/student/getallapplications",
            { withCredentials: true }
          )
          .then((res) => {
            setApplications(res.data.applications);
          });
      }
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
    }
  }, [isAuthorized]);

  if (!isAuthorized) {
    navigateTo("/login");
  }

  const deleteApplication = async (id) => {
    try {
      axios
        .delete(`http://localhost:8080/api/application/student/delete/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setApplications(
            applications.filter((application) => application._id !== id)
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section
      className="applicationpage"
      style={{ margin: "100px 0", marginTop: "150px" }}
    >
      {user && user.role === "Student" ? (
        <div className="applicationcontainer" style={{ padding: "0 100px" }}>
          <h1>My Applications</h1>
          {applications.length <= 0 ? (
            <h4>No applications found</h4>
          ) : (
            applications.map((element) => {
              return (
                <StudentCard
                  element={element}
                  deleteApplication={deleteApplication}
                  openModal={openModal}
                  key={element._id}
                />
              );
            })
          )}
        </div>
      ) : (
        <div className="applicationcontainer" style={{ padding: "0 100px" }}>
          <h1>Aplications From Students</h1>
          {applications.length <= 0 ? (
            <h4>No applications found</h4>
          ) : (
            applications.map((element) => {
              return (
                <EmployerCard
                  element={element}
                  openModal={openModal}
                  key={element._id}
                />
              );
            })
          )}
        </div>
      )}
      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};
export default MyApplications;

const StudentCard = ({ element, deleteApplication, openModal }) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          <p>
            <span>Phone:</span> {element.phone}
          </p>
          <p>
            <span>Address:</span> {element.address}
          </p>
          <p>
            <span>CoverLetter:</span> {element.coverLetter}
          </p>
        </div>
        <div className="resume">
          <img
            src={element.resume.url}
            alt="resume"
            onClick={() => openModal(element.resume.url)}
          />
        </div>
        <div className="btn_area">
          <button onClick={() => deleteApplication(element._id)}>
            Delete Application
          </button>
        </div>
      </div>
    </>
  );
};

const EmployerCard = ({ element, openModal }) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          <p>
            <span>Phone:</span> {element.phone}
          </p>
          <p>
            <span>Address:</span> {element.address}
          </p>
          <p>
            <span>CoverLetter:</span> {element.coverLetter}
          </p>
        </div>
        <div className="resume">
          <img
            src={element.resume.url}
            alt="resume"
            onClick={() => openModal(element.resume.url)}
          />
        </div>
      </div>
    </>
  );
};
