import React from "react";
import NavBar from '../components/landingpage/home/navbar';
import Home from '../components/landingpage/home/home';
import Footer from "../components/landingpage/home/footer";
import FormPage from "../components/landingpage/registration/formPage";
import NoticePage from "../components/landingpage/notice/NoticePage";
import { Routes, Route } from "react-router-dom";


function LandingPage() {
  return (
    <>
        <div className="flex flex-col h-screen bg-[#f8f4fc]">
          <NavBar />
          <Routes>
            <Route path="/" element = {<Home />} />
            <Route path="/form" element = {<FormPage />} />
            <Route path="/notice" element = {<NoticePage />} />
          </Routes>
        </div>
        <Footer />
    </>
   
    
  );
}


export default LandingPage;
