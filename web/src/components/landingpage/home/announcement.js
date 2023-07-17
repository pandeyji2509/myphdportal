import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";

const Announcement = () => {

    return (
        <div className="font-['IBM_Plex_Sans'] bg-white w-full rounded-md shadow-sm mb-8">
            <div className="bg-[#BE2A38] w-full justify-center items-center flex font-bold text-white text-xl tracking-widest rounded-t-md p-2">Ph.D ADMISSIONS</div>
            
            <div className="">
                <div className="">
                    <div className="font-bold text-lg py-2 px-4">Ph.D Registration for 2023 has started!</div>
                    <div className="flex">
                        <div className="font-semibold items-center flex text-blue-400 w-1/2 text-lg p-1 px-4">Last Date of Application : 25 June 2023</div>
                         <div className="flex justify-center items-center w-1/2 p-1">
                            <Link to="/form"><Button color="green" className="text-lg bg-[#08cc8c] py-1 shadow-none font-bold hover:bg-green-600">Register Here</Button></Link>
                            </div>
                    </div>
                    
                </div>
                
            </div>
        </div>
        
    );
  };
   
  export default Announcement;
  