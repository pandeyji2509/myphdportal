import React, { useContext } from 'react';
import { DarkModeContext } from '../../../context/DarkModeContext';
import { useSelector } from "react-redux";

const Profile = () => {
    const { darkMode } = useContext(DarkModeContext);
    const {user} = useSelector(state => state.user);
    var data = null;
    if(user){
        data = user;
    }
    return ( 
        <div className='p-8'>
            <div className={`w-full flex mb-4`}>
                <div className={`${darkMode ? "bg-gray-800 text-white" : "bg-white  shadow-md"} p-8 w-2/5 rounded-md mr-4 h-fit`}>
                    <div className='bg-[url("../public/profile.png")] bg-contain bg-no-repeat bg-center h-40 mb-4'></div>
                    <h2 className="text-2xl font-bold mb-4 justify-center text-center">{data.firstName + " " + data.lastName }</h2>
                    <StudentDetail heading={"Department"} text={data.department} />
                    <StudentDetail heading={"Subject"} text={data.subject} />
                    <StudentDetail heading={"Faculty"} text={data.faculty} />
                    <StudentDetail heading={"Mobile Number"} text={data.mobile} />
                    <StudentDetail heading={"E-Mail ID"} text={data.email} />
                </div>
                <div className={`${darkMode ? "bg-gray-800 text-white" : "bg-white  shadow-md"} h-fit w-3/5 rounded-md pb-4`}>
                    <h2 className="text-xl font-bold px-8 py-4">Personal Details</h2>
                    <div className={`border-b ${darkMode ? "border-gray-600" : "border-gray-300"} mb-4`}>
                    </div>
                    <PersonalDetail heading={"Father's Name"} text={data.fatherName} />
                    <PersonalDetail heading={"Mother's Name"} text={data.motherName} />
                    <PersonalDetail heading={"Gender"} text={data.gender} />
                    <PersonalDetail heading={"Address"} text={data.permaddress} />
                    <PersonalDetail heading={"State"} text={data.state} />
                    <PersonalDetail heading={"Aadhar"} text={data.aadhar} />
                </div>
            </div>

            <div className={`w-full flex mb-4`}>
                <div className={`${darkMode ? "bg-gray-800 text-white" : "bg-white  shadow-md"} w-2/5 rounded-md mr-4 h-fit`}>
                    <h2 className="text-xl font-bold p-4 text-center">Academic Details</h2>
                    <div className={`border-b ${darkMode ? "border-gray-600" : "border-gray-300"} mb-4`}>
                    </div>
                </div>
                
            </div>  
            
        </div>
        
     );
}
 
const PersonalDetail = ({heading, text}) => {
    const { darkMode } = useContext(DarkModeContext);
    return (
        <div className="w-full flex px-8">
            <div className="w-2/5 font-semibold flex items-center text-blue-300 ">{heading}</div>
            <div className={`w-3/5 p-2  ${darkMode ? "text-gray-300" : ""}`}>{text}</div>
        </div>
    );
  };

const StudentDetail = ({heading, text}) => {
    const { darkMode } = useContext(DarkModeContext);
    return (
        <div className="w-full flex">
            <div className="flex w-1/2 items-center font-semibold p-2 text-blue-300">{heading}</div>
            <div className={`w-1/2 p-2  ${darkMode ? "text-gray-300" : ""}`}>{text}</div>
        </div>
    );
  };

export default Profile;

