import React from "react";
import Instructions from './instructions';
import Login from '../login/Login';
import Announcement from "./announcement";
import NoticePage from "../notice/NoticePage";

const Home = () => {
    return (
    <div className="font-['IBM_Plex_Sans'] flex flex-grow h-[88vh] bg-[#f8f4fc]">

        {/* LEFT SECTION */}

        <div className={`w-8/12 bg-[#f8f4fc] p-8 h-full`}>
            <Announcement />
            <div className="flex h-[70%]">
                <div className="w-2/5 mr-4 h-full">
                    <div className="h-[10%] font-semibold items-center flex text-lg rounded-t-md px-4   bg-white border-b-2">Public Notice</div>
                    <div className="h-[90%] overflow-y-scroll text-gray-600 bg-white font-medium rounded-md shadow-sm pb-4 text-sm"> 
                        <NoticePage />
                    </div>
                </div>
                
    
                <div className="w-3/5 h-92"><Instructions /> </div>
            </div>
        </div>

        {/* RIGHT SECTION */}

        <div className={`w-4/12 bg-cover overflow-y-auto bg-center relative bg-[url('../public/gandhibhawan.jpg')]`}>
            <div className="bg-black/[.5] h-full w-full absolute"></div>
            <div className={`py-10 px-20 relative z-10`}>
                <Login />
            </div>
        </div>
    </div>
    );
  };
   
  export default Home;
  