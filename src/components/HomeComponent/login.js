import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import logoImage from "../../Assets/logo.jpg";

import config from '../../config.js';

const Login = () => {
  const history = useHistory();
  const [loginError, setLoginError] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null); 

  const [loginData, setLoginData] = useState({
    loginIdentifier: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${config.apiUrl}/user/login`,
        loginData
      );

      console.log(response.data);

      if (response.data.status === 200) {
        setAlertMessage("Login Successful!");

        setTimeout(() => {
          setAlertMessage(null);
          localStorage.setItem("user", JSON.stringify(response.data.data));

          const userRole = response.data.data.user.user_role;
          console.log(userRole);

          const redirectPath = getRedirectPathBasedOnRole(userRole);
          history.push(redirectPath);
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const errorMessage = error.response.data.message;
        setLoginError(errorMessage);

        setTimeout(() => {
          setLoginError(null);
        }, 2000);
      } else {
        setAlertMessage("An unexpected error occurred. Please try again.");
        setTimeout(() => {
          setAlertMessage(null);
        }, 2000);
      }
    }
  };



  const getRedirectPathBasedOnRole = (userRole) => {
    switch (userRole) {
      case "Billing Staff":
        return "/billing";
      case "PatientCare":
        return "/frontoffice";
      case "Purchase Staff":
        return "/purchasing";
      case "Pharmacy Staff":
        return "/pharmacy";
      case "Admin":
        return "/dashboard";
      case "Doctor":
          return "/doctor";
     case "OP Nurse":
        return "/dashboard";
      default:
        return "/homeapp";
    }
  };
  

  return (
    <div className="flex  bg-cover min-h-screen bg-no-repeat font-serif" style={{backgroundColor:'white'}}>
<div className="p-6 min-w-min max-w-md">

        <div className="text-center mb-4">
          <img
            src={logoImage}
            alt="Profile"
            className="w-60 h-30 mx-auto"
          />
<h1 className="font-bold text-3xl" style={{ background: 'linear-gradient(45deg, #3498db, #2ecc71)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
  Digital Hospital
</h1>
          {/* <h2 className="mt-1 mb-0 font-bold text-3xl">Log in to your account</h2> */}
          <p className="mt-5 text">Welcome back! Please enter your details</p>
        </div>
       

        <form onSubmit={handleLogin}>
          <div className="mb-3 ">
            <input
              type="text"
              id="loginIdentifier"
              name="loginIdentifier"
              placeholder="Email or Mobile Number"
              className="form-input border-b rounded-md w-500 py-2 px-3 ml-12"
              value={loginData.loginIdentifier}
              onChange={handleChange}
              required
            />
          </div>
         
          <div className="mb-3">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className="form-input border-b rounded-md w-500 py-2 px-3 ml-12"
              value={loginData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="text-center">
            <button type="submit" className="mt-3 btn bg-teal-500 rounded-md text-white py-2 px-3">
          Login
            </button>
          </div>
          <div className="mb-3 text-red-500">
            {loginError && <p>{loginError}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;