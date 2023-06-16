import React, { useContext } from 'react';
import { DarkModeContext } from '../../../context/DarkModeContext';

const FeePortal = () => {
    const { darkMode } = useContext(DarkModeContext);

    return (
        <div className="p-8">
             <div className={`${darkMode ? "bg-gray-800 text-white" : "bg-white  shadow-md"} rounded-md`}>
                <h2 className="text-xl font-bold px-4 py-3">FEE PORTAL</h2>
                <div className={`border-b ${darkMode ? "border-gray-500" : "border-gray-300"}`}>
                </div>
                <div className={`${darkMode ? "text-gray-300" : ""} w-full p-4 pb-0 text-justify text-md`}>
                </div>
                
            </div>
        </div>
           
        
     );
}
 

export default FeePortal;

