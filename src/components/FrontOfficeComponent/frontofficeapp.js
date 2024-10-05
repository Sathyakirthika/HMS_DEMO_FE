import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory,NavLink,Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faFlask, faUserPlus, faSignOutAlt,faHospitalUser, faHome} from '@fortawesome/free-solid-svg-icons';
import CheckboxApp from './registration';


import logo from "../../Assets/logo.jpg";
import profile from "../../Assets/profile.jpg";
import Sidebar from '../AdminComponent/sidebar';



const UserProfile = ({ user, onLogout }) => {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("user");
    history.push("/");
    window.location.reload();
    onLogout();
  };

  return (
    <div className="flex-grow-0 font-serif">
      <div className="flex items-center">
        <div className="leading-5">
          <h6 className="font-bold">
            <p>{user ? ` ${user.user.user_role}` : "Guest"}</p>
          </h6>
          <p>{` ${user.user.user_first_name} ${user.user.user_last_name} `}</p>
          {/* <p className="text-sm">{user ? user.user.user_email : ""}</p> */}
        </div>
        <img
          src={profile}
          alt="Profile"
          className="w-14 h-14 mr-4 rounded-full "
        />
        <div className="mt-2">
          <button
            className="bg-transparent border-none focus:outline-none"
            onClick={handleLogout}
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
          </button>
        </div>
      </div>
    </div>
  );
};


function FrontOfficeApp() {

  const [role, setrole] =useState(null);
  const [selectedNav, setSelectedNav] = useState('');

  const user = JSON.parse(localStorage.getItem("user"));
  // console.log(user);

  useEffect(() => {
    // Set the role only once after the component has mounted
    const userrole = user.user.user_role;
    setrole(userrole);
  }, [user]);

  // console.log("role", role);

  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("user");
    history.push("/");
  };

  // const handleNavigation = (path) => {
  //   history.push(`/frontoffice${path}`);
  //   window.location.reload(); 

  // };

  const handleNavigation = (nav) => {
    setSelectedNav(nav);
    history.push(`${nav}`);
    window.location.reload(); 
  };

  let componentToRender;

  switch (selectedNav) {
    case 'registration':
      componentToRender = <CheckboxApp />;
      console.log("registration", componentToRender);
      break;
  
    
    default:
      componentToRender = null;
  }
  return (
    <Router >
      <div style={{fontFamily:'serif'}}>
      <header>
          <nav className="container-fluid flex justify-between items-center bg-light max-h-18 flex-shrink-0 bg-white">
            <NavLink
              to="/"
              className="navbar-brand flex-shrink-0 flex justify-between items-center"
            >
              <img
                src={logo}
                alt="Logo"
                style={{ width: "60px", height: "60px" }}
              />
              <h1
                className="font-bold text-3xl"
                style={{
                  background: "linear-gradient(45deg, #3498db, #2ecc71)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Digital Hospital
              </h1>
            </NavLink>
            <div className="mr-10">
              <UserProfile user={user} onLogout={handleLogout} />
            </div>
          </nav>
        </header>
        <div className="flex" style={{ height: '600px' }}>
        <Sidebar handleNavigation={handleNavigation} />



<div className="bg-sky-200 w-full p-2" style={{ display: 'flex', flexDirection: 'column', }}>
<aside className="p-2 bg-sky-500">
  <ul className="text-2xl" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: 'your-desired-color' }}>
    <li className={` ${selectedNav === 'registration' ? 'active' : ''} text-stone-50`} style={{ backgroundColor: selectedNav === 'registration' ? 'skyblue' : '' }}>
      <button onClick={() => handleNavigation('/frontoffice/registration')}>
        <FontAwesomeIcon icon={faHospitalUser} className="mr-2" />
        Registration
      </button>
    </li>
   
    
  </ul>
</aside>



  <main>
    <Switch>
      <Route path="/frontoffice/registration" component={CheckboxApp} />

   
    </Switch>
  </main>
</div>         
        </div>
      </div>
    </Router>
  );
}

export default FrontOfficeApp;