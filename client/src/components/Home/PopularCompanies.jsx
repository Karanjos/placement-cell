import { FaMicrosoft, FaApple } from "react-icons/fa";
import { SiTesla } from "react-icons/si";

const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "Street 10 Karachi, Pakistan",
      openPositions: 10,
      icon: <FaMicrosoft />,
    },
    {
      id: 2,
      title: "Tesla",
      location: "Street 10 Karachi, Pakistan",
      openPositions: 5,
      icon: <SiTesla />,
    },
    {
      id: 3,
      title: "Apple",
      location: "Street 10 Karachi, Pakistan",
      openPositions: 20,
      icon: <FaApple />,
    },
  ];
  return (
    <div className="companies">
      <div className="container">
        <h3>Top Companies</h3>
        <div className="banner">
          {companies.map((company) => {
            return (
              <div className="card" key={company.id}>
                <div className="content">
                  <div className="icon">{company.icon}</div>
                  <div className="text">
                  <p>{company.title}</p>
                  <p>{company.location}</p>
                  </div>
                </div>
                <button>{company.openPositions} Open Positions</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default PopularCompanies;
