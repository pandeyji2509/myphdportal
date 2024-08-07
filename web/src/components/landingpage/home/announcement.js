import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";

const Announcement = () => {

    return (
        <div className="font-['IBM_Plex_Sans'] w-full rounded-md mb-8">
            <Link to="/form"><div className="bg-[#BE2A38] w-full justify-center items-center flex font-bold text-white text-xl tracking-widest rounded-md p-2 hover:bg-[#832f37]">Ph.D ADMISSIONS - Click here to REGISTER</div></Link>
            
            <div className="font-bold text-lg py-2 px-4 text-center">Ph.D Registration for 2023 has started!</div>
            <div className="font-semibold text-center text-blue-400 text-lg p-1 px-4">Last Date of Application : 25 June 2023</div>
        </div>
        
    );
  };
   
  export default Announcement;
  