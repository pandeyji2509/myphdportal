import React, { useContext, useState } from 'react';
import { DarkModeContext } from '../../../context/DarkModeContext';
import { FaHome, FaMoneyBillWave, FaEnvelope, FaFileAlt, FaUserAlt} from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import NavButton from '../NavButton';

const SideBarSuperAdmin = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [activeButton, setActiveButton] = useState("");

  const location = useLocation();
  const currentPath = location.pathname;

  const handleButtonClick = (text) => setActiveButton(text);

  return (
    <div className={`${darkMode ? "bg-gray-800 " : "bg-[#181c2c]"} w-1/6 h-full `}>
      <div className="flex items-center px-4 pl-6 h-16">
        <div className="bg-[url('../public/pu-logodark.png')] w-8 h-8 mr-2 bg-contain bg-center"></div>
        <div className={`${darkMode ? "text-white" : "text-white"} text-lg font-bold`}> Panjab University </div>
      </div>

      <ul className={`flex-1 text-md overflow-y-auto ${darkMode ? "text-gray-200" : "text-white"} p-4 pr-0`}>
        <NavButton
          text="Home"
          to="/admin"
          icon={<FaHome className="mr-4" />}
          onClick={() => {handleButtonClick("Home")}}
          active={currentPath === "/admin"}
        />
         <NavButton
          text="Add Department"
          to="/admin/AddDepartment"
          icon={<FaFileAlt className="mr-4" />}
          onClick={() => handleButtonClick("Add Department")}
          active={currentPath === "/admin/AddDepartment"}
        />
        <NavButton
          text="Fee Portal"
          to="/admin/FeePortal"
          icon={<FaMoneyBillWave className="mr-4" />}
          onClick={() => handleButtonClick("Fee Portal")}
          active={currentPath === "/admin/FeePortal"}
        />
        <NavButton
          text="Notice Board"
          to="/admin/NoticeBoard"
          icon={<FaEnvelope className="mr-4" />}
          onClick={() => handleButtonClick("Notice Board")}
          active={currentPath === "/admin/NoticeBoard"}
        />
        <NavButton
          text="Profile"
          to="/admin/Profile"
          icon={<FaFileAlt className="mr-4" />}
          onClick={() => handleButtonClick("Profile")}
          active={currentPath === "/admin/Profile"}
        />
        
      </ul>
    </div>
  );
}

export default SideBarSuperAdmin;
