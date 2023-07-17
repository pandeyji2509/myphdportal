import React, { useContext, useState } from 'react';
import { DarkModeContext } from '../../../context/DarkModeContext';
import { FaHome, FaMoneyBillWave, FaEnvelope, FaFileAlt} from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import NavButton from './NavButton';

const SideBar = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [activeButton, setActiveButton] = useState("");

  const location = useLocation();
  const currentPath = location.pathname;

  const handleButtonClick = (text) => setActiveButton(text);

  return (
    <div className={`${darkMode ? "bg-gray-800 " : "bg-[#81301e]"} w-1/6 h-full `}>
      <div className="flex items-center px-4 pl-6 h-16">
        <div className="bg-[url('../public/pu-logodark.png')] w-8 h-8 mr-2 bg-contain bg-center"></div>
        <div className={`${darkMode ? "text-white" : "text-white"} text-lg font-bold`}> Panjab University </div>
      </div>

      <ul className={`flex-1 text-md overflow-y-auto ${darkMode ? "text-gray-200" : "text-white"} p-4 pr-0`}>
        <NavButton
          text="Home"
          to="/student"
          icon={<FaHome className="mr-4" />}
          onClick={() => {handleButtonClick("Home")}}
          active={currentPath === "/student"}
        />
        <NavButton
          text="Fee Portal"
          to="/student/FeePortal"
          icon={<FaMoneyBillWave className="mr-4" />}
          onClick={() => handleButtonClick("Fee Portal")}
          active={currentPath === "/student/FeePortal"}
        />
        <NavButton
          text="Notice Board"
          to="/student/NoticeBoard"
          icon={<FaEnvelope className="mr-4" />}
          onClick={() => handleButtonClick("Notice Board")}
          active={currentPath === "/student/NoticeBoard"}
        />
        <NavButton
          text="Profile"
          to="/student/Profile"
          icon={<FaFileAlt className="mr-4" />}
          onClick={() => handleButtonClick("Profile")}
          active={currentPath === "/student/Profile"}
        />
        
      </ul>
    </div>
  );
}

export default SideBar;
