import { Link } from "react-router-dom";
const NavBar = () => {

  return (
      <div className="h-[12vh] font-['IBM_Plex_Sans'] bg-[#181c2c] flex">
        {/* FIRST HALF */}
        <div className="w-1/2 flex items-center">
          
          {/* LOGO */}
          <div className='mx-2 bg-[url("../public/pu-logodark.png")] bg-contain bg-no-repeat bg-center h-16 w-16'></div>

          {/* UNIVERSITY NAME */}
          <div>
            <div className="text-2xl text-white font-medium">PANJAB UNIVERSITY</div>
            <div className="text-white text-xs font-medium">Established under the Panjab University Act VII of 1947 </div>
            <div className="text-white text-xs font-medium">enacted by the Government of India</div>
          </div>

        </div>

        {/* SECOND HALF - NAV BUTTONS */}
        <div className="justify-end items-center text-md font-medium text-white w-1/2 flex">
          <Link to ="/"><div className="mx-4 hover:underline hover:underline-offset-4 p-2 px-4 rounded-md"> Home</div></Link>
          <Link to ="/"><div className="mx-4 hover:underline hover:underline-offset-4 p-2 px-4 rounded-md">About Us</div></Link>
          <Link to="/feeupload"><div className="mx-4 hover:underline hover:underline-offset-4 p-2 px-4 rounded-md">Upload Fee</div></Link>
          <Link to="/notice"><div className="mx-4 hover:underline hover:underline-offset-4 p-2 px-4 rounded-md">Notices</div></Link>
          <Link to ="/"><div className="mx-4 hover:underline hover:underline-offset-4 p-2 px-4 rounded-md">Contact</div></Link>
        </div>
      </div>
  );
};
 
export default NavBar;
