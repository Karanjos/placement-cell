import Navbar from "./components/navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Signup from "./components/Register/student/StudentSignup";
import Login from "./components/Register/student/StudentLogin";
import "./app.css";
import Footer from "./components/footer/Footer";
import Landing from "./components/landingPage/Landing";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
