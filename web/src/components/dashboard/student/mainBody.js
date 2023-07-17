import React, { useContext } from 'react';
import { DarkModeContext } from '../../../context/DarkModeContext';
import NoticeBoard from '../student/NoticeBoard';

const MainBody = ({ onAddNew }) => {

    const { darkMode } = useContext(DarkModeContext);

    return ( 
        <div className={`w-full flex mb-4 h-fit`}>
            <div className={`${darkMode ? "bg-gray-800 text-white" : "bg-white  shadow-md"} w-1/2 rounded-md mr-4`}>
                <h2 className="text-xl font-bold px-4 py-3">Main Content</h2>
                <div className={`border-b ${darkMode ? "border-gray-500" : "border-gray-300"}`}>
                </div>
            </div>
            <div className="h-fit w-1/2">
                <NoticeBoard />
            </div>
            
            
        </div> 
     );
}
 
export default MainBody;