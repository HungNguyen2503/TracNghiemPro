import { Link, useNavigate } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import "./Login.scss";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { LOGIN } from './../../actions/user';
import { checkUserLogin } from "../../services/userService";
const Login = ()=>{
  const [userLogin, setUserLogin] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e)=>{
    e.preventDefault();
    if(!userLogin.email || !userLogin.password){
      console.log("Chưa nhập username password");
      return;
    }
    const checkUser = async ()=>{
      const data = await checkUserLogin(userLogin);

      if(data) {
        dispatch(LOGIN(data));
        const now = new Date();
        now.setTime(now.getTime() + (24 * 60 * 60 * 1000));
        document.cookie = `token=${data.token}; expires=${now.toUTCString()}; path=/`;
        navigate('/home');
      }
    }
    checkUser();
  }

  const handleChange = (e)=>{
    setUserLogin(
      {
        ...userLogin,
        [e.target.name]: e.target.value
      }
    );
  }

  
  return(
    <>
      <section className="login">
        <div className="login__left">
          <form className="login__form">
            <h2 className="login__title">Welcome Back</h2>
            <label htmlFor="email">Username:</label>
            <input name="email" id="email" type="text" onChange={handleChange}/>
            <label htmlFor="password">Password:</label>
            <input name="password" id="password" type="password" onChange={handleChange}/>
            <input name="login" id="login" type="submit" value={"Login"} className="login__submit" onClick={handleSubmit}/>
            <p>Don't have and account?<Link to={"/register"} >Register</Link></p>
            <div className="login__socials">
              <div className="login__icon"><FaFacebook /></div>
              <div className="login__icon"><FaGoogle /></div>
              <div className="login__icon"><FaGithub /></div>
            </div>
          </form>
        </div>
        <div className="login__logo">
          <img src="/assets/images/login_laptop.png" alt="Logo-Laptop" />
        </div>
        <div className="login__blob-shape"></div>
      </section>
    </>
  );
}

export default Login;