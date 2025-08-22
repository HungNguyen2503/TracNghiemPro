import { SiSololearn } from "react-icons/si";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { LOGOUT } from "../../actions/user";
import { FiLogOut } from "react-icons/fi";

const Header = ()=>{
  const dispatch = useDispatch();
  const cookies = document.cookie.split(";");
  const [token] = [...cookies]
  const navigate = useNavigate();
  
  const handleActive = (active) =>{
    return `header__link ${active.isActive ? "header__nav--active" : ""}`;
  }

  const handleLogout = ()=>{
    document.cookie =  `${token}; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    navigate('/login');
    dispatch(LOGOUT());
  }

  const handleReload = () => {
    navigate('/home');
  }

  return (
    <header className="header">
      <div className="header__logo" onClick={handleReload}>
        <span className="header__logo-icon">
          <SiSololearn />
        </span>
        <span>Exam Pro</span>
      </div>
      <nav className="header__nav">
        <NavLink to="/home" className={handleActive} {...(token ? {} : {style: {display: "none"}})}>
          Home
        </NavLink>
        <NavLink to="/topic" className={handleActive}  {...(token ? {} : {style: {display: "none"}})}>
          Topic
        </NavLink>
        <NavLink to="/answer" className={handleActive} {...(token ? {} : {style: {display: "none"}})}>
          Answer
        </NavLink>
        <NavLink to="/login" className={handleActive} {...(token ? {style: {display: "none"}} : {})}>
          Login
        </NavLink>
        <NavLink to="/register" className={handleActive} {...(token ? {style: {display: "none"}} : {})}>
          Register
        </NavLink>
        <button onClick={handleLogout} className="header__logout" {...(token ? {} : {style: {display: "none"}})}>
          <FiLogOut />
        </button>
      </nav>
    </header>
  );
}

export default Header;