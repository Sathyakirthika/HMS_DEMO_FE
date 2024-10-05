import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    useHistory,
    NavLink,
    Link,
    useRouteMatch,
  } from "react-router-dom";

import purchase from "../../Assets/gjh.png";
import Registration from "../../Assets/mm.jpeg";
import doctor from "../../Assets/doctor.jpg"
import Emergency from "../../Assets/emr.jpg";
import Procedure from "../../Assets/procedure.jpg";
import OT from "../../Assets/operation.png";
import IP from "../../Assets/in-patient.webp";
import NS from "../../Assets/nuhui.png";
import MH from "../../Assets/jvjb.jpeg";
import AC from "../../Assets/jhl.jpg";
import Billing from "../../Assets/bill.jpeg";
import Insurance from "../../Assets/jbmn.jpg";
import lab from "../../Assets/lab.png";
import BB from "../../Assets/blood.jpg";
import Radiology from "../../Assets/radiology.png";
import Laundry from "../../Assets/ljjk.webp";
import DS from "../../Assets/discharge su.png";
import MM from "../../Assets/gbn.jpg";
import Pharmacy from "../../Assets/pharmacy.jpg";
import MRD from "../../Assets/mrd.jpg";
import TC from "../../Assets/tele call.jpg";
import IT from "../../Assets/it.png";
import audit from "../../Assets/audit.webp";
import sec from "../../Assets/seee.jpg";
import HR from "../../Assets/hrrr.jpg";
import MIS from "../../Assets/mis.jpeg";

const Adminhomepage = () => {
    const history = useHistory();

    const handleNavigation = (path) => {
        history.push(`${path}`);
        window.location.reload();
      };

  return (
            <div className="ml-2 mr-2 bg-gray-100">
      <main
                className="pt-5 pl-7 pb-28"
                style={{ display: "flex", flexWrap: "wrap" }}
              >
                <div
                  className="mb-10"
                  style={{
                    width: "80px",
                    height: "80px",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    marginRight: "20px",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <NavLink to=""                 
                    onClick={() => handleNavigation("/frontoffice/registration")}
                    className="navbar-brand mb-5"
                    >                      
                    <img
                      src={Registration}
                      alt="Logo"
                      style={{ borderRadius: "50%", padding: "10px" }}
                      
                    />
                    <p className="ml-3">Patient</p>
                  </NavLink>
                  <p>Registration</p>
                </div>
                <NavLink to=""                  
                 onClick={() => handleNavigation("/billing/registration")}
 className="navbar-brand ml-5 mb-5"
 onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
 onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      backgroundColor: "white",
                      borderRadius: "50%",
                    marginRight: "40px",
                    }}
                  >
                    <img
                      src={Billing}
                      alt="Logo"
                      style={{
                        padding: "10px",
                        borderRadius: "50%",
                      marginRight: "40px",
                      }}
                    />
                   <p className="ml-3">Accounts </p>
                  </div>
                  <br/>
                 <p>& Revenue</p>

                </NavLink>
              
                <NavLink to=""                   
                onClick={() => handleNavigation("/outpatient/op")}
 className="navbar-brand mb-5"
 onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
 onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
                  <div
                    style={{
                      backgroundColor: "white",
                      borderRadius: "50%",
                    marginRight: "40px",
                    }}
                  >
                    <img
                      src={NS}
                      alt="Logo"
                      style={{
                        width: "80px",
                        height: "80px",
                        padding: "10px",
                        borderRadius: "50%",
                      }}
                    />
                  </div>
                  <p>Nurse Station</p>
                </NavLink>
                <NavLink to=""                  
                 onClick={() => handleNavigation("/doctor/pres")}
                //  onClick={() => handleNavigation("/doctor/alldoctor")}

                 
 className="navbar-brand mb-5"
 onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
 onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      backgroundColor: "white",
                      borderRadius: "50%",
                    marginRight: "40px",
                    }}
                  >
                    <img
                      src={doctor}
                      alt="Logo"
                      style={{
                        borderRadius: "50%",
                      marginRight: "40px",
                      }}
                    />
                    <p className="ml-3">Doctor</p>
                  </div>
                </NavLink>
                <NavLink to=""                   
                onClick={() => handleNavigation("/pharmacy")}
 className="navbar-brand mb-5"
 onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
 onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      backgroundColor: "white",
                      borderRadius: "50%",
                    marginRight: "40px",
                    }}
                  >
                    <img
                      src={Pharmacy}
                      alt="Logo"
                      style={{
                        padding: "10px",
                        borderRadius: "50%",
                      marginRight: "40px",
                      }}
                    />
                  </div>
                 <p>Pharmacy</p>
                </NavLink>
                <NavLink to=""                  
                 onClick={() => handleNavigation("/purchasing")}
 className="navbar-brand mb-5"
 onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
 onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      backgroundColor: "white",
                      borderRadius: "50%",
                    marginRight: "40px",
                    }}
                  >
                    <img
                      src={purchase}
                      alt="Logo"
                      style={{
                        borderRadius: "50%",
                      marginRight: "40px",
                      padding:'10px'
                      }}
                    />
                    <p className="ml-3">Purchase</p>
                  </div>
                </NavLink>

                <NavLink to=""                  
                 onClick={() => handleNavigation("/dashboard")}
 className="navbar-brand mb-10">
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      backgroundColor: "white",
                      borderRadius: "50%",
                    marginRight: "40px",
                    
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  >
                    <img
                      src={Emergency}
                      alt="Logo"
                      style={{
                        padding: "10px",
                        borderRadius: "50%",
                      }}
                    />
                    <p >Emergency</p>
                  </div>
                </NavLink>
                <NavLink to=""                  
                 onClick={() => handleNavigation("/dashboard")}
 className="navbar-brand mb-5">
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      backgroundColor: "white",
                      borderRadius: "50%",
                    marginRight: "40px",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  >
                    <img
                      src={Procedure}
                      alt="Logo"
                      style={{
                        borderRadius: "50%",
                        padding: "10px",
                      marginRight: "40px",
                      }}
                    />
                    <p>Procedure Room</p>
                  </div>
                  <br />
                  <p></p>
                </NavLink>
                <NavLink to=""                   
                onClick={() => handleNavigation("/dashboard")}
 className="navbar-brand ">
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      backgroundColor: "white",
                      borderRadius: "50%",
                    marginRight: "40px",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  >
                    <img
                      src={OT}
                      alt="Logo"
                      style={{ padding: "10px", borderRadius: "50%" }}
                    />
                   <p>Operation Threatre</p>
                  </div>
                  <br />
                  <p></p>
                </NavLink>
                <NavLink to=""                   
                onClick={() => handleNavigation("/dashboard")}
 className="navbar-brand "
 onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
 onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      backgroundColor: "white",
                      borderRadius: "50%",
                    marginRight: "40px",
                    }}
                    className="hover:bg-gray-200" 
                  >
                    <img
                      src={IP}
                      alt="Logo"
                      style={{
                        padding: "10px",
                        borderRadius: "50%",
                      marginRight: "40px",
                      }}
                    />
                    <p>InPatient Management</p>
                  </div>
                </NavLink>
               
                <NavLink to=""                   
                onClick={() => handleNavigation("/dashboard")}
 className="navbar-brand mb-5"
 onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
 onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
                  <div
                    style={{
                      backgroundColor: "white",
                      borderRadius: "50%",
                    marginRight: "40px",
                    }}
                  >
                    <img
                      src={MH}
                      alt="Logo"
                      style={{
                        padding: "10px",
                        borderRadius: "50%",
                        width: "80px",
                        height: "80px",
                      }}
                    />
                  </div>
                  <p>Mental Health</p>
                </NavLink>

                <NavLink to=""                  
                 onClick={() => handleNavigation("/dashboard")}
 className="navbar-brand mb-5"
 onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
 onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      backgroundColor: "white",
                      borderRadius: "50%",
                    marginRight: "40px",
                    }}
                  >
                    <img
                      src={AC}
                      alt="Logo"
                      style={{
                        padding: "10px",
                        borderRadius: "50%",
                      marginRight: "40px",
                      }}
                    />
                  </div>
                  <p>Antenatal Care</p>
                </NavLink>             
                
                <NavLink to=""                 
                  onClick={() => handleNavigation("/dashboard")}
 className="navbar-brand mb-5"
 onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
 onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
                  <div
                    style={{
                      borderRadius: "50%",
                    marginRight: "40px",
                      width: "80px",
                      height: "80px",
                      backgroundColor: "white",
                    }}
                  >
                    <img
                      src={lab}
                      alt="Logo"
                      style={{
                        width: "80px",
                        height: "80px",
                        padding: "10px",
                        borderRadius: "50%",
                      marginRight: "40px",
                      }}
                    />
                    <p>Laboratory</p>
                  </div>
                </NavLink>
                <NavLink to=""                
                   onClick={() => handleNavigation("/dashboard")}
 className="navbar-brand mb-5"
 onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
 onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      backgroundColor: "white",
                      borderRadius: "50%",
                    marginRight: "40px",
                    }}
                  >
                    <img
                      src={BB}
                      alt="Logo"
                      style={{
                        padding: "10px",
                        borderRadius: "50%",
                      marginRight: "40px",
                      }}
                    />
                  </div>
                  <p>Blood Bank</p>
                </NavLink>
                <NavLink to=""                   
                onClick={() => handleNavigation("/dashboard")}
 className="navbar-brand mb-5"
 onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
 onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      backgroundColor: "white",
                      borderRadius: "50%",
                    marginRight: "40px",
                    }}
                  >
                    <img
                      src={Radiology}
                      alt="Logo"
                      style={{
                        padding: "10px",
                        borderRadius: "50%",
                      marginRight: "40px",
                      }}
                    />
                    <p>Radiology</p>
                  </div>
                </NavLink>
              
                <NavLink to=""                   
                onClick={() => handleNavigation("/dashboard")}
 className="navbar-brand mb-5"
 onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
 onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      backgroundColor: "white",
                      borderRadius: "50%",
                    marginRight: "40px",
                    }}
                  >
                    <img
                      src={MRD}
                      alt="Logo"
                      style={{
                        padding: "10px",
                        borderRadius: "50%",
                      marginRight: "40px",
                      }}
                    />
                  </div>
                  <p className="ml-5">MRD</p>
                </NavLink>
                <NavLink to=""                 
                  onClick={() => handleNavigation("/dashboard")}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
>
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      backgroundColor: "white",
                      borderRadius: "50%",
                    marginRight: "40px",
                    }}
                  >
                    <img
                      src={TC}
                      alt="Logo"
                      style={{
                        padding: "10px",
                        borderRadius: "50%",
                      marginRight: "40px",
                      }}
                    />
                  </div>
                  <p>Tele Calling</p>
                </NavLink>
                <NavLink to=""                  
                 onClick={() => handleNavigation("/dashboard")}
 onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
 onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      backgroundColor: "white",
                      borderRadius: "50%",
                    marginRight: "40px",
                    }}
                  >
                    <img
                      src={IT}
                      alt="Logo"
                      style={{
                        padding: "10px",
                        borderRadius: "50%",
                      marginRight: "40px",
                      }}
                    />
                  </div>
                  <p>IT Department</p>
                </NavLink>

                <NavLink to=""                   
                onClick={() => handleNavigation("/dashboard")}
 onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
 onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      backgroundColor: "white",
                      borderRadius: "50%",
                    marginRight: "40px",
                    }}
                  >
                    <img
                      src={sec}
                      alt="Logo"
                      style={{
                        padding: "10px",
                        borderRadius: "50%",
                      marginRight: "40px",
                      }}
                    />
                    <p>Security Department</p>
                  </div>
                </NavLink>
                <NavLink to=""                   
                onClick={() => handleNavigation("/dashboard")}
 onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
 onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      backgroundColor: "white",
                      borderRadius: "50%",
                    marginRight: "40px",
                    }}
                  >
                    <img
                      src={MIS}
                      alt="Logo"
                      style={{
                        padding: "10px",
                        borderRadius: "50%",
                      marginRight: "40px",
                      }}
                    />
                  </div>
                  <p>MIS Report</p>
                </NavLink>
                <NavLink 
                  to="/HR"                  
                onClick={() => handleNavigation("/HR/register")}
 onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
 onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      backgroundColor: "white",
                      borderRadius: "50%",
                    marginRight: "40px",
                    }}
                  >
                    <img
                      src={HR}
                      alt="Logo"
                      style={{
                        padding: "10px",
                        borderRadius: "50%",
                      marginRight: "40px",
                      }}
                    />
                  </div>
                  <p>HR Management</p>
                </NavLink>

                <NavLink to=""                   
                onClick={() => handleNavigation("/dashboard")}
 onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
 onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      backgroundColor: "white",
                      borderRadius: "50%",
                    marginRight: "40px",
                    }}
                  >
                    <img
                      src={audit}
                      alt="Logo"
                      style={{
                        padding: "10px",
                        borderRadius: "50%",
                      marginRight: "40px",
                      }}
                    />
                    <p>Accounts </p>
                  </div>
                  <br />
                  <p>(Audit Office)</p>
                </NavLink>
                <NavLink to=""                   onClick={() => handleNavigation("/dashboard")}
 className="navbar-brand mb-5"
 onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
 onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      backgroundColor: "white",
                      borderRadius: "50%",
                    marginRight: "40px",
                    }}
                  >
                    <img
                      src={Laundry}
                      alt="Logo"
                      style={{
                        padding: "10px",
                        borderRadius: "50%",
                      marginRight: "40px",
                      }}
                    />
                    <p>Linen and Laundry</p>
                  </div>
                </NavLink>
                <NavLink to=""                   onClick={() => handleNavigation("/dashboard")}
 className="navbar-brand mb-5"
 onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
 onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      backgroundColor: "white",
                      borderRadius: "50%",
                    marginRight: "40px",
                    }}
                  >
                    <img
                      src={DS}
                      alt="Logo"
                      style={{
                        padding: "10px",
                        borderRadius: "50%",
                      marginRight: "40px",
                      }}
                    />
                    <p>Discharge Summary</p>
                  </div>
                </NavLink>
              
                <NavLink to=""                   onClick={() => handleNavigation("/dashboard")}
 className="navbar-brand mr-5  mb-5"
 onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
 onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
                  <div
                    style={{
                      backgroundColor: "white",
                      borderRadius: "50%",
                      width: "80px",
                        height: "80px",
                    }}
                  >
                    <img
                      src={MM}
                      alt="Logo"
                      style={{
                        padding: "10px",
                        borderRadius: "50%",
                        width: "80px",
                        height: "80px",
                      }}
                    />
                    <p>Mortaury Management</p>
                  </div>
                </NavLink>
                <NavLink to=""                 
                  onClick={() => handleNavigation("/dashboard")}
 className="navbar-brand ml-5 mb-5"
 onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
 onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      backgroundColor: "white",
                      borderRadius: "50%",
                    marginRight: "40px",
                    }}
                  >
                    <img
                      src={Insurance}
                      alt="Logo"
                      style={{
                        padding: "10px",
                        borderRadius: "50%",
                      marginRight: "40px",
                      }}
                    />
                  </div>
                  <p>Insurance & Eclaim</p>
                </NavLink>
                
    </main>
    </div>
  );
};

export default Adminhomepage;