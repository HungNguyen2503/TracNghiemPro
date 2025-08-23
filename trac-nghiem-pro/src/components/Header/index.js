import { SiSololearn } from "react-icons/si";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { LOGOUT } from "../../actions/user";
import { FiLogOut } from "react-icons/fi";
import { FaBars } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

const Header = () => {
  const dispatch = useDispatch();
  const cookies = document.cookie.split(";");
  const [token] = [...cookies];
  const navigate = useNavigate();
  const [showBars, setshowBars] = useState(false);
  const navRef = useRef(null);
  const barsRef = useRef(null);

  const handleActive = (active) => {
    return `header__link ${active.isActive ? "header__link--active" : ""}`;
  };

  const handleLogout = () => {
    document.cookie = `${token}; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    navigate("/login");
    dispatch(LOGOUT());
  };

  const handleReload = () => {
    navigate("/home");
  };

  const handleBars = () => {
    setshowBars(!showBars);
  };

  const handleHideBars = () => setshowBars(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target) && !barsRef.current.contains(event.target)) {
        setshowBars(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navRef]);
  return (
    <header className="header">
      <div className="header__logo" onClick={handleReload}>
        <span className="header__logo-icon">
          <SiSololearn />
        </span>
        <span className="header__logo-name">Exam Pro</span>
      </div>     
      <nav className={`header__nav ${showBars ? "header__nav--active" : ""}`} ref={navRef}>
        <div
          className="header__nav-item"
          {...(token ? {} : { style: { display: "none" } })}
        >
          <NavLink to="/home" className={handleActive} onClick={handleHideBars}>
            Home
          </NavLink>
        </div>
        <div
          className="header__nav-item"
          {...(token ? {} : { style: { display: "none" } })}
        >
          <NavLink to="/topic" className={handleActive} onClick={handleHideBars}>
            Topic
          </NavLink>
        </div>
        <div
          className="header__nav-item"
          {...(token ? {} : { style: { display: "none" } })}
        >
          <NavLink to="/answer" className={handleActive} onClick={handleHideBars}>
            Answer
          </NavLink>
        </div>
        <div
          className="header__nav-item"
          {...(token ? { style: { display: "none" } } : {})}
        >
          <NavLink to="/login" className={handleActive} onClick={handleHideBars}>
            Login
          </NavLink>
        </div>
        <div
          className="header__nav-item"
          {...(token ? { style: { display: "none" } } : {})}
        >
          <NavLink to="/register" className={handleActive} onClick={handleHideBars}>
            Register
          </NavLink>
        </div>
        <div
          className="header__nav-item"
          {...(token ? {} : { style: { display: "none" } })}
        >
          <button onClick={handleLogout} className="header__logout">
            <FiLogOut />
          </button>
        </div>
      </nav>
      <nav className="header__navbars" onClick={handleBars} ref={barsRef}>
        <span className="header__sidebars">
          <FaBars />
        </span>
      </nav>
    </header>
  );
};

export default Header;
