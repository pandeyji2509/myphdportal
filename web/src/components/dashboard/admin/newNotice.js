import React, { useContext } from 'react';
import { DarkModeContext } from '../../../context/DarkModeContext';
import { AiFillCloseCircle} from "react-icons/ai";
import { IoMdArrowDropdown } from "react-icons/io";
import { BsTypeBold, BsTypeItalic, BsTypeUnderline } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";

const NewNotice = ({ show, onClose }) => {

    const { darkMode } = useContext(DarkModeContext);
    if (!show) {
        return null; // Return null if the notice should not be displayed
    }
    

    return ( 
        <div>
            {/* {showOverlay && ( */}
                <div className="fixed z-50 inset-0 bg-black opacity-50"></div>
            {/* )}
            {showOverlay && ( */}
                <div className="fixed z-50 inset-0 flex items-center justify-center ">
                <div className="bg-white w-1/2 rounded-md">
                    <div className="bg-[#081A51] px-4 py-2 text-lg font-semibold rounded-t-md text-white flex">
                        <div className="w-1/2 pl-2">
                            New Notice
                        </div>
                        <div className="w-1/2 justify-end flex items-center">
                            <AiFillCloseCircle className="text-xl cursor-pointer hover:text-blue-300" onClick={onClose}/>
                        </div>
                    </div>
                    
                    <div className="px-4 pt-4 text-lg font-semibold flex">
                        <div className="m-2 w-1/4 pl-4 py-1 bg-gray-200 flex items-center cursor-pointer rounded-md hover:bg-gray-300">
                            Department
                            <IoMdArrowDropdown className="ml-4"/>
                        </div>
                        <div className="w-3/4 justify-end flex items-center">
                        </div>
                    </div>
                    <div className={`mx-6 border-b ${darkMode ? "border-gray-500" : "border-gray-300"}`}></div>
                    <div className="px-4 text-lg text-gray-300 flex">
                        <div className="w-full pl-2 flex items-center cursor-pointer rounded-md">
                        <input
                        type="text"
                        placeholder="Title"
                        className=" w-full border-none py-2"
                        />
                        </div>
                    </div>
                    <div className={`mx-6 border-b ${darkMode ? "border-gray-500" : "border-gray-300"}`}></div>
                    <div className="bg-gray-200 m-6 h-56 mb-4 rounded-sm"></div>

                    <div className="px-6 text-lg font-semibold flex mb-4">
                        <div className="w-1/2 items-center justify-center">
                            <div className="p-2 rounded-md shadow-lg flex w-fit">
                                <BsTypeBold className = "mr-2 text-xl"/>
                                <BsTypeItalic className = "mr-2 text-xl" />
                                <BsTypeUnderline className = "mr-8 text-xl" />
                                <ImAttachment className = "mr-2 text-lg" />
                            </div>
                        </div>
                        <div className="w-1/2 justify-end flex items-right">
                                <button
                            onClick={onClose}
                            className="bg-blue-500 shadow-md text-white py-1 px-4 rounded-md"
                            >
                            Submit
                            </button>
                        </div>
                    </div>                    
                </div>
                </div>
            {/* )} */}
        </div>
     );
}
 
export default NewNotice;