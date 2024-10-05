import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import bimagic from '../../Assets/bgimage1.jpg';
import logo from '../../Assets/logo.jpg';
import Login from "./login";

const HomePage = () => {
  return (
    <div className="container-fluid flex" style={{ minHeight: "100vh" }}>
      <div className="flex-initial">
        <div className="container p-4">
          <Login />
        </div>
      </div>

      <div className="flex-1" style={{ backgroundImage: `url(${bimagic})`, backgroundSize: "100% 100%" }}>
        <header className="ml-10">
          <nav className="container flex justify-between items-center bg-light py-3 px-8 max-h-18 flex-shrink-0">
            <NavLink to="/" className="navbar-brand flex-shrink-0">
              <img src={logo} alt="Logo" style={{ width: "100px", height: "100px", borderRadius: '50%' }} />
            </NavLink>
          </nav>
        </header>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#00f', WebkitTextStroke: '2px white', display: 'inline-block', marginLeft: '', width: '60%', paddingLeft: '3%' }}>
            Digital Hospital
          </h1>
          <br />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
