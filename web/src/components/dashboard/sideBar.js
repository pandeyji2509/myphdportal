import React, { useContext } from 'react';
import { DarkModeContext } from '../../context/DarkModeContext';
import { useLocation } from 'react-router-dom';
import NavButton from './NavButton';

const SideBar = ({data}) => {
  const { darkMode } = useContext(DarkModeContext);
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className={`${darkMode ? "bg-gray-800 " : "bg-[#181c2c]"} w-1/6 h-full `}>
      <div className="flex items-center px-4 pl-6 h-16">
        <div className="bg-[url('../public/pu-logodark.png')] w-8 h-8 mr-2 bg-contain bg-center"></div>
        <div className={`${darkMode ? "text-white" : "text-white"} text-lg font-bold`}> Panjab University </div>
      </div>

      <ul className={`flex-1 text-md overflow-y-auto ${darkMode ? "text-gray-200" : "text-white"} p-4 pr-0`}>
        {data.map((button, index) => (
          <NavButton
            key={index}
            text={button.text}
            to={button.path}
            icon={button.icon}
            active={currentPath === button.path}
          />
        ))}
      </ul>
    </div>
  );
}

export default SideBar;
