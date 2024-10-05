import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import config from '../../config.js';

import profile from "../../Assets/profile.jpg";


const UserProfile = ({ user, onLogout }) => {
    const history = useHistory();
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const handleLogout = async () => {
     const logoutEventData = {
       userId: user.user.user_id,
       userFirstName: user.user.user_first_name,
       userLastName: user.user.user_last_name,
       userRole: user.user.user_role,
     };
     setIsButtonDisabled(true); 
     try {
       const response = await fetch(`${config.apiUrl}/user/logout`, {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(logoutEventData),
       });
 
       const result = await response.json();
 
       if (response.status === 200) {
         localStorage.removeItem("user");
         history.push("/");
         window.location.reload();
         setIsButtonDisabled(false); 
         onLogout();
       } else {
         console.error("Error logging logout event:", result.message);
       }
     } catch (error) {
       console.error("Error logging logout event:", error.message);
     }
   };
  
    // const handleLogout = () => {
    //   localStorage.removeItem("user");
    //   history.push("/");
    //   window.location.reload();
    //   onLogout();
    // };

  
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

  export default UserProfile;