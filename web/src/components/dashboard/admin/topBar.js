import React, { useContext, useState } from 'react';
import {DarkModeContext} from '../../../context/DarkModeContext';
import { FaSearch, FaUser, FaMoon, FaSun} from "react-icons/fa";
import {message} from 'antd';
import {  useNavigate } from "react-router-dom";
import { useAppContext } from '../../../context/context';
import {useDispatch} from 'react-redux';
import { setUser } from '../../../redux/features/userSlice';

const TopBar = () => {
    const dispatchUser = useDispatch();
    const {logout} = useAppContext();
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        dispatchUser(setUser(null));
        message.success("Logout Successfully");
        navigate("/");
      };

    return ( 
        <div className={`flex w-full items-center border-b-2 py-2 h-12 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white  border-gray-200"}`}>
                <div className="flex w-1/2 h-full px-4">
                    <div className={`flex items-center rounded-lg px-2 py-1 ${darkMode ? "bg-gray-700 text-white" : "bg-gray-100"}`}>
                        <input
                            type="text"
                            placeholder="Search"
                            className={`${darkMode ? "bg-gray-700" : "bg-gray-100"} w-60 focus:outline-none`}
                        />
                        <FaSearch className={`${darkMode ? "" : "text-gray-500"} ml-2`} />
                    </div>
                </div>

                <div className="flex w-1/2 justify-end px-4 h-full items-center">
                    <button className="text-md h-full" onClick={toggleDarkMode}>
                    {darkMode ? <FaSun className="w-full h-full hover:bg-gray-700 p-2 rounded-md text-gray-400" /> : <FaMoon className="w-full h-full hover:bg-gray-100 p-2 rounded-md text-gray-500"/>}
                    </button>

                    <div className="relative ml-4">
                        <FaUser className={`text-xl ${darkMode ? "text-gray-400" : "text-gray-500"} cursor-pointer`} onClick={() => setDropdownOpen(!dropdownOpen)}/>
                        {dropdownOpen && (
                        <div className={`absolute right-0 mt-2 w-48 ${darkMode ? "bg-gray-700 text-gray-300 border-none" : "bg-white"} border rounded-lg shadow-lg z-10`}>
                            <a href="/" className={`block px-4 py-2 ${darkMode ? "hover:bg-gray-600 hover:rounded-t-lg" : "hover:bg-gray-100"} `}>
                            Profile
                            </a>
                            <a href="/" className={`block px-4 py-2 ${darkMode ? "hover:bg-gray-600" : "hover:bg-gray-100"} `}>
                            Settings
                            </a>
                            <div className={`block cursor-pointer px-4 py-2 ${darkMode ? "hover:bg-gray-600 hover:rounded-b-lg" : "hover:bg-gray-100"} `} onClick={handleLogout}>
                            Logout
                            </div>
                        </div>
                        )}
                    </div>
                </div>
            </div>
     );
}
 
export default TopBar;