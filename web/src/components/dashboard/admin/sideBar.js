import React, { useContext, useState } from 'react';
import { DarkModeContext } from '../../../context/DarkModeContext';
import { FaHome, FaMoneyBillWave, FaEnvelope, FaFileAlt, FaUserAlt} from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import NavButton from '../NavButton';

const SideBar = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [activeButton, setActiveButton] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [showSubButtons, setShowSubButtons] = useState(false);

  const location = useLocation();
  const currentPath = location.pathname;

  const handleButtonClick = (text) => {
    if (text === "Registrations") {
      setActiveButton(activeButton === "New Registrations" ? "" : "New Registrations");
      setShowSubButtons(!showSubButtons);
    } else {
      setActiveButton(text);
      setShowSubButtons(false);
    }
  };
  
  

  const handleSubButtonClick = (text) => {
    setActiveButton(text);
  };

  return (
    <div className={`${darkMode ? "bg-gray-800 " : "bg-[#181c2c]"} w-1/6 h-full `}>
      <div className="flex items-center px-4 pl-6 h-16">
        <div className="bg-[url('../public/pu-logodark.png')] w-8 h-8 mr-2 bg-contain bg-center"></div>
        <div className={`${darkMode ? "text-white" : "text-white"} text-lg font-bold`}> Panjab University </div>
      </div>

      <ul className={`flex-1 ${(isActive)? "bg-white" : ""} text-md overflow-y-auto ${darkMode ? "text-gray-200" : "text-white"} p-4 pr-0`}>
        <NavButton
          text="Home"
          to="/dashboard"
          icon={<FaHome className="mr-4" />}
          onClick={() => {handleButtonClick("Home") && setIsActive(true)}}
          active={currentPath === "/dashboard"}
        />
        <NavButton
          text="Registrations"
          to="/dashboard/students"
          icon={<FaUserAlt className="mr-4" />}
          onClick={() => handleButtonClick("Registrations")}
          active={currentPath === "/dashboard/students" && (activeButton === "Registrations")}

          showSubButtons={showSubButtons}
        />
        {showSubButtons && (
          <div className="pl-8 text-sm">
            <NavButton
              text="New Registrations"
              to="/dashboard/students"
              onClick={() => handleSubButtonClick("New Registrations")}
              active={currentPath === "/dashboard/students" && activeButton === "New Registrations"}
            />
            <NavButton
              text="Approved Students"
              to="/dashboard/approved"
              onClick={() => handleSubButtonClick("Approved Students")}
              active={currentPath === "/dashboard/approved" && activeButton === "Approved Students"}
            />
          </div>
        )}
        <NavButton
          text="Fee Portal"
          to="/dashboard/FeePortal"
          icon={<FaMoneyBillWave className="mr-4" />}
          onClick={() => handleButtonClick("Fee Portal")}
          active={currentPath === "/dashboard/FeePortal"}
        />
        <NavButton
          text="Notice Board"
          to="/dashboard/NoticeBoard"
          icon={<FaEnvelope className="mr-4" />}
          onClick={() => handleButtonClick("Notice Board")}
          active={currentPath === "/dashboard/NoticeBoard"}
        />
        <NavButton
          text="Profile"
          to="/dashboard/Profile"
          icon={<FaFileAlt className="mr-4" />}
          onClick={() => handleButtonClick("Profile")}
          active={currentPath === "/dashboard/Profile"}
        />
      </ul>
    </div>
  );
}

export default SideBar;
