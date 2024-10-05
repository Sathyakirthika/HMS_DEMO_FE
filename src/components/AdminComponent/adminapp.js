import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
  NavLink,
  Link,
  useRouteMatch,
} from "react-router-dom";
import logo from "../../Assets/logo.jpg";
import UserProfile from '../HomeComponent/user';
import Sidebar from "./sidebar";
import Adminhomepage from "./iconfolder";


function AdminApp() {
  // const { path, url } = useRouteMatch();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("user"));
  const [sidebarVisible, setSidebarVisible] = React.useState(false);


  const handleNavigation = (path) => {
    history.push(`${path}`);
    window.location.reload();
  };

  const handleToggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    history.push("/");
  };

  return (
    <Router>
      <div style={{fontFamily:'serif'}}>
        <header className="">
          <nav className="container-fluid flex justify-between items-center bg-light max-h-16 flex-shrink-0 bg-white">
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

        <div className="flex" style={{ height: "600px" }}>
      
            <Sidebar handleNavigation={handleNavigation} />
          

          <div className="w-full bg-sky-200" >
            <div>
              <p className="ml-2 text-2xl ">Dashboard</p>
            </div>
           <Adminhomepage/>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default AdminApp;
