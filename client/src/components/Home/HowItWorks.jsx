import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <div className="howitworks">
      <div className="container">
        <h3>How JobZee Works</h3>
        <div className="banner">
          <div className="card">
            <FaUserPlus />
            <p>Create Account</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex
              molestias commodi, quaerat illo magni, ut accusantium vel quidem
              aliquid placeat odit minus assumenda nostrum. Minima libero ut
              unde nobis doloremque.
            </p>
          </div>
          <div className="card">
            <MdFindInPage />
            <p>Find a job/pot a job</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex
              molestias commodi, quaerat illo magni, ut accusantium vel quidem
              aliquid placeat odit minus assumenda nostrum. Minima libero ut
              unde nobis doloremque.
            </p>
          </div>
          <div className="card">
            <IoMdSend />
            <p>Find a job/pot a job</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex
              molestias commodi, quaerat illo magni, ut accusantium vel quidem
              aliquid placeat odit minus assumenda nostrum. Minima libero ut
              unde nobis doloremque.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HowItWorks;
