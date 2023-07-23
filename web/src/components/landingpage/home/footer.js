import React from "react";

const Footer = () => {

    return (
        // <div className="h-24 bg-[#0C1A4E] flex text-white text-center font-bold justify-center items-center">
        //  Copyright © 2023
        // </div>
         <div className="bg-[#181c2c] text-sm h-32 flex flex-row items-center">
            <div className='text-white ml-8'>
                <div className=" font-bold text-lg">Panjab University</div>
                <div className="">Chandigarh, India</div>
                <div>+91-(XXXXXXXXXX)</div>
            </div>
            <div className='flex space-x-36'>
                <div className='text-white flex flex-col ml-96'>
                    <div className='text-lg underline cursor'>Resources</div>
                    <div>PU News</div>
                    <div>RTI</div>
                    <div>University Forms</div>
                </div>
                <div className='text-white flex flex-col '>
                    <div className='text-lg underline cursor'>Support and Services</div>
                    <div>Public Relations</div>
                    <div>SAIF /CIL /UCIM</div>
                    <div>Publication Bureau</div>
                </div>  
                <div className='text-white flex flex-col '>
                    <div className='text-lg underline cursor'>Intranet</div>
                    <div>Campus Portal</div>
                    <div>Mail @ Campus</div>
                    <div>NetPortal(WiFi)</div>
                </div>
            </div>  
        </div>
    );
  };
   
  export default Footer;
  