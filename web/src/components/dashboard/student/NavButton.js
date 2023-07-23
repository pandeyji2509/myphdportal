import React, { useContext } from 'react';
import { DarkModeContext } from '../../../context/DarkModeContext';
import { NavLink } from 'react-router-dom';

const NavButton = ({ text, to, icon, active, onClick }) => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <NavLink to={to} onClick={onClick}>
      <li
        className={`my-1 p-2 py-4 ${darkMode ? `hover:bg-gray-700 ${active ? "rounded-tl-md rounded-bl-md bg-gradient-to-r from-gray-800 to-gray-900" : ""}` : `hover:bg-[#612416] ${active ? "rounded-tl-md rounded-bl-md bg-gradient-to-r from-[#81301e] to-[#F8F9FF]" : ""}`} hover:rounded-l-md cursor-pointer`}
      >
        <div className="flex items-center">
          {icon}
          <span className="ml-4">{text}</span>
        </div>
      </li>
    </NavLink>
  );
};

export default NavButton;