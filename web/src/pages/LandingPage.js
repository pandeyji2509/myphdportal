import React from "react";
import NavBar from '../components/landingpage/home/navbar';
import Home from '../components/landingpage/home/home';
import Footer from "../components/landingpage/home/footer";
import FormPage from "../components/landingpage/registration/formPage";
import NoticePage from "../components/landingpage/notice/NoticePage";
import { Routes, Route } from "react-router-dom";
import Success from "../components/landingpage/home/success";
import FeeUpload from "../components/landingpage/feeupload";


function LandingPage() {
  return (
    <>  
        <NavBar />
          <Routes>
            <Route path="/" element = {<Home />} />
            <Route path="/form" element = {<FormPage />} />
            <Route path="/notice" element = {<NoticePage />} />
            <Route path="/feeupload" element = {< FeeUpload />} />
            <Route path="/success" element = {<Success />} />
          </Routes>

        <Footer />
    </>
   
    
  );
}


export default LandingPage;
