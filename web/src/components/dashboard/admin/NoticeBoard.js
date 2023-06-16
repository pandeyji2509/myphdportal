import React, { useContext } from 'react';
import { DarkModeContext } from '../../../context/DarkModeContext';
import { FaEdit} from "react-icons/fa";

const NoticeBoard = ({onAddNew}) => {
    const { darkMode } = useContext(DarkModeContext);

    return (
       
            <div className={`${darkMode ? "bg-gray-800 text-white" : "bg-white  shadow-md"} rounded-md`}>
                <h2 className="text-xl font-bold px-4 py-3">Notice</h2>
                <div className={`border-b ${darkMode ? "border-gray-500" : "border-gray-300"}`}>
                </div>
                <div className={`${darkMode ? "text-gray-300" : ""} w-full p-4 pb-0 text-justify text-md`}>
                    <div className={`w-full mb-2 flex`}>
                        <div className={`font-bold ${darkMode ? "text-blue-300 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"} cursor-pointer`}>
                            Extension of Synopsis Submission Deadline
                        </div>
                    </div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation <a href='/' className={`font-bold ${darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"} cursor-pointer`}>... Read more</a>
                    <div className={`w-full justify-end flex mt-3 mb-4`}>
                        <div className={`font-bold ${darkMode ? "text-red-400 hover:text-red-300" : "text-blue-600 hover:text-blue-700"} cursor-pointer flex items-center justify-center`}>
                            Edit
                            <FaEdit className="ml-2"/ >
                        </div>
                    </div>
                    <div className={`border-b ${darkMode ? "border-gray-500" : "border-gray-300"}`}></div>
                </div>
                <div className={`${darkMode ? "text-gray-300" : ""} w-full p-4 pb-0 text-justify text-md`}>
                    <div className={`w-full mb-2 flex`}>
                        <div className={`font-bold ${darkMode ? "text-blue-300 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"} cursor-pointer`}>
                            RAC Meeting Schedule
                        </div>
                    </div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea exercitation ullamco <a href='/' className={`font-bold ${darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"} cursor-pointer`}>... Read more</a>
                    <div className={`w-full justify-end flex mt-3 mb-4`}>
                        <div className={`font-bold ${darkMode ? "text-red-400 hover:text-red-300" : "text-blue-600 hover:text-blue-700"} cursor-pointer flex items-center justify-center`}>
                            Edit
                            <FaEdit className="ml-2"/ >
                        </div>
                    </div>
                    <div className={`border-b ${darkMode ? "border-gray-500" : "border-gray-300"}`}>
                    </div>
                </div>
                <div className="p-4">
                    <div className={`p-2 text-center rounded-md font-bold w-1/5 cursor-pointer ${darkMode ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-600 hover:bg-blue-500 text-white"}`} onClick={onAddNew}>ADD NEW</div>
                </div>
                
            </div>
        
     );
}
 

export default NoticeBoard;

