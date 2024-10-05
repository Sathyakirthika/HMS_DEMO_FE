import React from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserPlus } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ handleNavigation }) => { // Receive handleNavigation as a prop
  const [activeIcon, setActiveIcon] = useState(null);

  const handleIconHover = (icon) => {
    setActiveIcon(icon);
  };

  const handleIconLeave = () => {
    setActiveIcon(null);
  };

  return (
    <div className="flex flex-col w-[50px] h-screen bg-sky-100 text-black">
      <Icon
        icon={faHome}
        content="Home"
        active={activeIcon === "home"}
        onMouseEnter={() => handleIconHover("home")}
        onMouseLeave={handleIconLeave}
        onClick={() => handleNavigation("/dashboard")} // Pass handleNavigation to Icon
      />
      <Icon
        icon={faUserPlus}
        content="Dashboard"
        active={activeIcon === "dashboard"}
        onMouseEnter={() => handleIconHover("dashboard")}
        onMouseLeave={handleIconLeave}
        onClick={() => handleNavigation("/dashboard")} // Pass handleNavigation to Icon
      />
      {/* Add more icons as needed */}
    </div>
  );
};

const Icon = ({ icon, content, active, onMouseEnter, onMouseLeave, onClick }) => {
  return (
    <div
      className={`p-4 ${active ? 'transform scale-150' : 'transform scale-100'} transition-transform flex items-center justify-center relative`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick} // Use onClick prop
      style={{ zIndex: 2 }} 
    >
      <FontAwesomeIcon icon={icon} className="w-6 h-6" />
      {active && (
        <div className="absolute left-12 top-4 bg-sky-100 p-1 text-xs  text-black  rounded-md">
          {content}
        </div>
      )}
    </div>
  );
};

export default Sidebar;