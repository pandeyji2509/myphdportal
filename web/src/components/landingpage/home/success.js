import React from "react";

const Success = () => {
    return (
    <div className="font-['IBM_Plex_Sans'] bg-[#f8f4fc] h-[88vh] px-20 py-8 overflow-y-scroll">
        <div className="font-semibold text-3xl mb-8">Congratulations! Your registration is successful!</div>
        <div className="text-2xl">Thank you for applying for the degree of Doctor of Philosophy. We have received your application and will review it shortly.     </div>
        <div className="flex justify-center">
            <div className="h-[30rem] w-[35rem]">
                <img src="success.png" alt="success" />
            </div>
        </div>
        
    </div>
    );
  };
   
  export default Success;
  