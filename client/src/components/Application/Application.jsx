import { useContext, useState } from "react";
import { Context } from "../../main";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Application = () => {
  //  usestate variable from application schema
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [course, setCourse] = useState("");

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  // file input change

  const handleFileChange = (e) => {
    const resume = e.target.files[0];
    setResume(resume);
  };

  const { id } = useParams();
  const handleApplication = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("resume", resume);
    formData.append("coverLetter", coverLetter);
    formData.append("course", course);
    formData.append("jobID", id);

    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/application/post",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setResume(null);
      setCoverLetter("");
      setCourse("");
      toast.success(data.message);
      navigateTo("/job/getall");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  if (!isAuthorized || (user && user.role === "Admin")) navigateTo("/");

  return (
    <section className="application" >
      <div className="container">
        <h3>Application Form</h3>
        <form action="" onSubmit={handleApplication}>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Your phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="text"
            placeholder="Your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="Your course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />
          <textarea
            placeholder="Your cover letter"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
          />
          <div>
            <label
              htmlFor=""
              style={{ textAlign: "start", display: "block", fontSize: "20px" }}
            >
              Select Resume
            </label>
            <input
              type="file"
              accept=".jpg, .png, .webp"
              onChange={handleFileChange}
              style={{ width: "100%" }}
            />
          </div>
          <button type="submit">Apply</button>
        </form>
      </div>
    </section>
  );
};
export default Application;
