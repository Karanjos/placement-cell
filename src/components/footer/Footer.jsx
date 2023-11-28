import "./footer.css";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="footer">
      <footer>
        <span>© {year} - Made by AAKA</span>
        <FavoriteIcon style={{ fontSize: "medium", margin:"0 5px"}} />
        <span>Jay Hind Jay Bharat</span>
      </footer>
    </div>
  );
};
export default Footer;
