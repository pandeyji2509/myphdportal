import React, { useState } from "react";
import Form from "./form";
import LoginCard from "./LoginCard";
import Otp from "./otp";

function LandingPage() {
  const [showLogin, setShowLogin] = useState(true);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleSignUpClick = () => {
    setShowLogin(false);
  };

  const rightWidth = showLogin ? "w-2/5 md:w-2/5" : "w-1/2 md:w-1/2";
  const leftWidth = showLogin ? "w-3/5 md:w-3/5" : "w-1/2 md:w-1/2";
  const transition = showLogin
    ? "transition-all duration-500 ease-in-out"
    : "transition-all duration-500 ease-in-out";

  return (
    <div className="flex flex-wrap">
      <div className={`${leftWidth} bg-cover bg-center h-screen relative bg-[url('../public/gandhibhawan.jpg')] ${transition}`}>
        <div className="bg-black/[.5] h-full w-full absolute"></div>
      </div>
      <div className={`${rightWidth} p-0 ${transition}`}>
        <div className="h-screen overflow-y-auto">
          {showLogin ? (
            <LoginCard onSignUpClick={handleSignUpClick} />
          ) : (
            <Form onLoginClick={handleLoginClick} />
          )}
          {/* <Otp /> */}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
