import React from "react";
import NavBar from "../components/newLandingPage/navbar";
import Home from "../components/newLandingPage/home";
import Footer from "../components/newLandingPage/footer";
import FormPage from "../components/newLandingPage/formPage";
import NoticePage from "../components/newLandingPage/noticePage";
import { Routes, Route } from "react-router-dom";


function NewLandingPage() {
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


export default NewLandingPage;
