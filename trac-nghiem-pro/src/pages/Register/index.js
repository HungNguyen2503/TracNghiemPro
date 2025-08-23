import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import './Register.scss';

const Register = ()=>{
  return(
    <>
      <section className="register">
        <div className="register__left">
          <div className="register__blob-shape">
            <img src="/assets/images/register_iMac.png" alt="logo_iMac" />
          </div>
        </div>
        <div className="register__right">
          <form className="register__form">
            <h2 className="register__title">Please Fill out form to Register</h2>
            <label htmlFor="fullname">Fullname:</label>
            <input name="fullname" id="fullname" type="text"/>
            {/* <label htmlFor="username">Username:</label>
            <input name="username" id="username" type="text"/> */}
            <label htmlFor="email">Email:</label>
            <input name="email" id="email" type="email"/>
            <label htmlFor="password">Password:</label>
            <input name="password" id="password" type="password"/>
            <label htmlFor="repassword">Confirm Password:</label>
            <input name="repassword" id="repassword" type="password"/>

            <input name="register" id="register" type="submit" value={"Register"} className="register__submit"/>
            <p>Yes I have an account?<Link to={"/login"}>Login</Link></p>
            <div className="register__socials">
              <div className="register__icon"><FaFacebook /></div>
              <div className="register__icon"><FaGoogle /></div>
              <div className="register__icon"><FaGithub /></div>
            </div>
          </form>
        </div>
        
      </section>
    </>
  );
}

export default Register;