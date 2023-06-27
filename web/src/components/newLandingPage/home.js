import React, { useState } from "react";
import NoticeBoard from "./noticeBoard";
import Instructions from "./instructions";
import AdminLogin from "./adminLogin";
import Announcement from "./announcement";
import LoginCard from "./LoginCard";
import { Link } from "react-router-dom";
const Home = () => {
    const [showStudentLogin, setShowStudentLogin] = useState(true);

    const handleStudentClick = () => {
        setShowStudentLogin(true);
    };

    const handleAdminClick = () => {
        setShowStudentLogin(false);
    };

    return (
    <div className="flex flex-grow h-full bg-[#f8f4fc]">

        {/* LEFT SECTION */}

        <div className={`w-8/12 bg-[#f8f4fc] p-8`}>
            <Announcement />
            <div className="flex">
                <div className="w-2/5 mr-4"> 
                    <NoticeBoard />  
                    <Link to="/newlanding/notice">
                        <div className="bg-blue-500 rounded-md shadow-sm text-white font-bold p-1 flex justify-center mt-2 cursor-pointer hover:bg-blue-600">View More</div>
                    </Link>
                </div>
                <div className="w-3/5"><Instructions /> </div>
            </div>
        </div>

        {/* RIGHT SECTION */}

        <div className={`w-4/12 bg-cover overflow-y-auto bg-center relative bg-[url('../public/gandhibhawan.jpg')]`}>
            <div className="bg-black/[.5] h-full w-full absolute"></div>
            <div className={`py-10 px-20 relative z-10`}>
            {showStudentLogin ? (
            <LoginCard onAdminClick={handleAdminClick}/>
            ) : (
            <AdminLogin onStudentClick={handleStudentClick}/>
            )}
            </div>
        </div>
    </div>
    );
  };
   
  export default Home;
  